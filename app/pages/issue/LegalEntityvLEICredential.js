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
import UserTypes from '../../helpers/user-types';

function LegalEntityvLEICredential() {
    const schemaSAID = 'EJEY6JAAVfAh8-yBTV37rHaJ9b_VKvkZunz_oJupzsvQ';
    let recipient = 'EJ89uFMBC9r0S4Lrkj8NmbRx5Cz1ApXa47PJ_23Bz4h0';
    let lei = '506700GE1G29325QX363';

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
                credentialData: {
                    LEI: lei,
                },
                source: [
                    {
                        qualifiedvLEIIssuervLEICredential: {
                            d: qualifiedvLEIIssuerCred.sad.d,
                            i: qualifiedvLEIIssuerCred.sad.i,
                        },
                    },
                ],
                schema: schemaSAID,
                type: 'LegalEntityvLEICredential',
                registry: UserTypes.getUserType(),
                recipient,
            })
            .then((res) => {
                isSubmitting = false;
                toaster.success('LegalEntityvLEICredential issued');
                closePreview();
            })
            .catch((err) => {
                isSubmitting = false;
                console.log('caught', err);
                toaster.error('Failed to issue LegalEntityvLEICredential');
            });
    }

    return {
        handleSubmit,
        view: function (vnode) {
            let issuerPrefix = '';
            let isIssuer = vnode.attrs.qualifiedvLEIIssuerCred !== undefined;
            if (isIssuer) {
                issuerPrefix = vnode.attrs.qualifiedvLEIIssuerCred.sad.d;
            }
            return m(Container, { style: { padding: '16px' } }, [
                m(Dialog, {
                    isOpen: previewOpen,
                    onClose: () => closePreview(),
                    title: 'Issue Legal Entity vLEI Credential',
                    content: [
                        m('p', 'This Legal Entity vLEI Credential will be issued to the following entity:'),
                        m(Card, { fluid: true }, [
                            m(Form, [
                                m(FormGroup, [
                                    m(FormLabel, 'Entity'),
                                    m('p', `${AddressBook.get(recipient)} (${recipient})`),
                                ]),
                                m(FormGroup, [m(FormLabel, 'LEI'), m('p', lei)]),
                                m(FormGroup, [
                                    m(FormLabel, 'Authorizing Qualified vLEI Issuer vLEI Credential'),
                                    m('p', issuerPrefix),
                                ]),
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
                    content: 'A vLEI Credential issued by a Qualified vLEI issuer to a Legal Entity',
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
                            options: Object.keys(AddressBook.book).map((key) => {
                                return {
                                    label: `${AddressBook.get(key)} (${key})`,
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
                    m(FormGroup, { class: Classes.ALIGN_RIGHT }, [
                        m(Button, {
                            type: 'button',
                            label: 'Issue',
                            intent: 'primary',
                            title: isIssuer ? 'Issue Credential' : 'Qualified vLEI Issuer vLEI Credential Required',
                            disabled: !isIssuer,
                            onclick: (e) => openPreview(),
                        }),
                    ])
                ),
            ]);
        },
    };
}

module.exports = LegalEntityvLEICredential;
