import m from 'mithril';
import {
    Button,
    Callout,
    Card,
    Classes,
    Colors,
    Dialog,
    Form,
    FormGroup,
    FormLabel,
    Icon,
    Icons,
    Input,
    Select,
} from 'construct-ui';
import { Container } from '../../components';
import { AddressBook, toaster, xhring } from '../../helpers';

function LegalEntityOfficialOrganizationalRolevLEICredential() {
    const schemaSAID = 'E3n2Od38xMVDoM6Km-Awse_Cw9z0RtUJN-j0MQo642xw';
    let recipient = 'EpXprWFWmvJx4dP7CqDyXRgoigTVFwEUh6i-6jUCcoU8';
    let lei = '506700GE1G29325QX363';
    let personLegalName = '';
    let officialRole = '';

    let isSubmitting = false;
    let previewOpen = false;

    function openPreview() {
        previewOpen = true;
    }

    function closePreview() {
        previewOpen = false;
    }

    function handleSubmit(e = null, qualifiedvLEIIssuerCred) {
        if (e) {
            e.preventDefault();
        }
        isSubmitting = true;
        xhring
            .exnRequest({
                schema: schemaSAID,
                credentialData: {
                    LEI: lei,
                    personLegalName: personLegalName,
                    officialRole: officialRole,
                },
                source: [
                    {
                        "qualifiedvLEIIssuervLEICredential": {
                            d:qualifiedvLEIIssuerCred.sad.d,
                            i:qualifiedvLEIIssuerCred.sad.i,
                        }
                    }
                ],
                type: 'LegalEntityOfficialOrganizationalRolevLEICredential',
                registry: 'gleif',
                recipient,
            })
            .then((res) => {
                isSubmitting = false;
                toaster.success('LegalEntityOfficialOrganizationalRolevLEICredential issued');
                closePreview();
            })
            .catch((err) => {
                isSubmitting = false;
                console.log('caught', err);
                toaster.error('Failed to issue LegalEntityOfficialOrganizationalRolevLEICredential');
            });
    }

    return {
        handleSubmit,
        view: function (vnode) {
            let issuerPrefix = ""
            let isIssuer = vnode.attrs.qualifiedvLEIIssuerCred !== undefined
            if (isIssuer) {
                issuerPrefix = vnode.attrs.qualifiedvLEIIssuerCred.sad.d
            }
            return m(Container, { style: { padding: '16px' } }, [
                m(Dialog, {
                    isOpen: previewOpen,
                    onClose: () => closePreview(),
                    title: 'Issue Legal Entity Offical Organizational Role vLEI Credential',
                    content: [
                        m(
                            'p',
                            'This Legal Entity Offical Organizational Role vLEI Credential will be issued to the following entity:'
                        ),
                        m(Card, { fluid: true }, [
                            m(Form, [
                                m(FormGroup, [
                                    m(FormLabel, 'Entity'),
                                    m('p', `${AddressBook[recipient].name} (${recipient})`),
                                ]),
                                m(FormGroup, [m(FormLabel, 'LEI'), m('p', lei)]),
                                m(FormGroup, [m(FormLabel, 'Legal Name'), m('p', personLegalName)]),
                                m(FormGroup, [m(FormLabel, 'Official Role'), m('p', officialRole)]),
                                m(FormGroup, [m(FormLabel, 'Authorizing Qualified vLEI Issuer Credential'), m('p', issuerPrefix)]),
                            ]),
                        ]),
                        m(
                            'p',
                            { style: { color: Colors.RED700, marginTop: '1rem' } },
                            'Verify that the information above is correct before issuing!'
                        ),
                    ],
                    footer: m(`.${Classes.ALIGN_RIGHT}`, [
                        m(Button, {
                            label: 'Close',
                            onclick: (e) => closePreview(),
                        }),
                        m(Button, {
                            iconRight: Icons.CHEVRON_RIGHT,
                            loading: isSubmitting,
                            label: 'Confirm',
                            intent: 'primary',
                            onclick: (e) => handleSubmit(e, vnode.attrs.qualifiedvLEIIssuerCred),
                        }),
                    ]),
                }),
                m(Callout, {
                    content:
                        'A vLEI Role Credential issued by a Qualified vLEI issuer to official representatives of a Legal Entity',
                }),
                m(
                    Form,
                    {
                        gutter: 16,
                        style: { marginTop: '16px' },
                    },
                    m(
                        FormGroup,
                        m(FormLabel, { for: 'entity' }, 'Entity'),
                        m(Select, {
                            contentLeft: m(Icon, { name: Icons.USER }),
                            id: 'entity',
                            name: 'entity',
                            fluid: true,
                            options: Object.keys(AddressBook).map((key) => {
                                return {
                                    label: `${AddressBook[key].name} (${key})`,
                                    value: key,
                                };
                            }),
                            defaultValue: recipient,
                            onchange: (e) => {
                                recipient = e.target.value;
                            },
                        })
                    ),
                    m(
                        FormGroup,
                        m(FormLabel, { for: 'lei' }, 'LEI'),
                        m(Input, {
                            contentLeft: m(Icon, { name: Icons.HASH }),
                            id: 'lei',
                            name: 'LEI',
                            fluid: true,
                            defaultValue: lei,
                            oninput: (e) => {
                                lei = e.target.value;
                            },
                        })
                    ),
                    m(
                        FormGroup,
                        m(FormLabel, { for: 'personLegalName' }, 'Person Legal name'),
                        m(Input, {
                            contentLeft: m(Icon, { name: Icons.USER }),
                            id: 'personLegalName',
                            name: 'personLegalName',
                            placeholder: '',
                            fluid: true,
                            oninput: (e) => {
                                personLegalName = e.target.value;
                            },
                        })
                    ),
                    m(
                        FormGroup,
                        m(FormLabel, { for: 'officialRole' }, 'Official Role'),
                        m(Input, {
                            contentLeft: m(Icon, { name: Icons.GLOBE }),
                            id: 'officialRole',
                            name: 'officialRole',
                            placeholder: '',
                            fluid: true,
                            oninput: (e) => {
                                officialRole = e.target.value;
                            },
                        })
                    ),
                    m(FormGroup, { class: Classes.ALIGN_RIGHT }, [
                        m(Button, {
                            type: 'button',
                            label: 'Issue',
                            intent: 'primary',
                            title: isIssuer ? 'Issue Credential' : 'Qualified vLEI Issuer Credential Required',
                            disabled: !isIssuer,
                            onclick: (e) => openPreview(),
                        }),
                    ])
                ),
            ]);
        },
    };
}

module.exports = LegalEntityOfficialOrganizationalRolevLEICredential;
