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

function LegalEntityEngagementContextRolevLEICredential() {
    const schemaSAID = 'EmaEqu_zIkxXKsrNJFTJq_s2c96McS8yzHhcvYDW8u5A';
    let recipient = 'EpXprWFWmvJx4dP7CqDyXRgoigTVFwEUh6i-6jUCcoU8';
    let lei = '506700GE1G29325QX363';
    let personLegalName = '';
    let engagementContextRole = '';

    let isSubmitting = false;
    let previewOpen = false;

    function openPreview() {
        previewOpen = true;
    }

    function closePreview() {
        previewOpen = false;
    }

    function handleSubmit(e = null) {
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
                    engagementContextRole: engagementContextRole,
                },
                type: 'LegalEntityEngagementContextRolevLEICredential',
                registry: 'gleif',
                recipient,
            })
            .then((res) => {
                isSubmitting = false;
                toaster.success('LegalEntityEngagementContextRolevLEICredential issued');
                closePreview();
            })
            .catch((err) => {
                isSubmitting = false;
                console.log('caught', err);
                toaster.error('Failed to issue LegalEntityEngagementContextRolevLEICredential');
            });
    }

    return {
        handleSubmit,
        view: function () {
            return m(Container, { style: { padding: '16px' } }, [
                m(Dialog, {
                    isOpen: previewOpen,
                    onClose: () => closePreview(),
                    title: 'Issue Legal Entity Engagement Context Role vLEI Credential',
                    content: [
                        m(
                            'p',
                            'This Legal Entity Engagement Context Role vLEI Credential will be issued to the following entity:'
                        ),
                        m(Card, { fluid: true }, [
                            m(Form, [
                                m(FormGroup, [
                                    m(FormLabel, 'Entity'),
                                    m('p', `${AddressBook[recipient].name} (${recipient})`),
                                ]),
                                m(FormGroup, [m(FormLabel, 'LEI'), m('p', lei)]),
                                m(FormGroup, [m(FormLabel, 'Legal Name'), m('p', personLegalName)]),
                                m(FormGroup, [m(FormLabel, 'Engagement Context Role'), m('p', engagementContextRole)]),
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
                            label: 'Issue',
                            intent: 'primary',
                            onclick: (e) => handleSubmit(e),
                        }),
                    ]),
                }),
                m(Callout, {
                    content:
                        'A vLEI Role Credential issued to representatives of a Legal Entity in other than official roles but in functional or other context of engagement',
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
                        m(FormLabel, { for: 'engagementContextRole' }, 'Engagement Context Role'),
                        m(Input, {
                            contentLeft: m(Icon, { name: Icons.TAG }),
                            id: 'engagementContextRole',
                            name: 'engagementContextRole',
                            placeholder: '',
                            fluid: true,
                            oninput: (e) => {
                                engagementContextRole = e.target.value;
                            },
                        })
                    ),
                    m(FormGroup, { class: Classes.ALIGN_RIGHT }, [
                        m(Button, {
                            type: 'button',
                            label: 'Preview',
                            intent: 'primary',
                            onclick: (e) => openPreview(),
                        }),
                    ])
                ),
            ]);
        },
    };
}

module.exports = LegalEntityEngagementContextRolevLEICredential;
