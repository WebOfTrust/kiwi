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

function QualifiedvLEIIssuervLEICredential() {
    const schemaSAID = 'E-_XCbf1LJ0v9CR7g-_gOknf5dpoZROgF7qG5T8mXCv8';
    let recipient = 'EfgJrn1lbMu5c728soUqOzVbC7XmdfHvYdSJl8jyDroQ';
    let lei = '254900OPPU84GM83MG36';

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
                credentialData: {
                    LEI: lei,
                },
                schema: schemaSAID,
                type: 'QualifiedvLEIIssuervLEICredential',
                registry: 'root',
                recipient,
            })
            .then((res) => {
                isSubmitting = false;
                toaster.success('QualifiedvLEIIssuervLEICredential issued');
                closePreview();
            })
            .catch((err) => {
                isSubmitting = false;
                console.log('caught', err);
                toaster.error('Failed to issue QualifiedvLEIIssuervLEICredential');
            });
    }

    return {
        handleSubmit,
        view: function () {
            return m(Container, { style: { padding: '16px' } }, [
                m(Dialog, {
                    isOpen: previewOpen,
                    onClose: () => closePreview(),
                    title: 'Issue Qualified vLEI Issuer vLEI Credential',
                    content: [
                        m('p', 'This Qualified vLEI Issuer vLEI Credential will be issued to the following entity:'),
                        m(Card, { fluid: true }, [
                            m(Form, [
                                m(FormGroup, [
                                    m(FormLabel, 'Entity'),
                                    m('p', `${AddressBook[recipient].name} (${recipient})`),
                                ]),
                                m(FormGroup, [m(FormLabel, 'LEI'), m('p', lei)]),
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
                            onclick: (e) => handleSubmit(e),
                        }),
                    ]),
                }),
                m(Callout, {
                    content:
                        'A vLEI Credential issued by GLEIF to Qualified vLEI Issuers which allows the Qualified vLEI Issuers to issue, verify and revoke Legal Entity vLEI Credentials and Legal Entity Official Organizational Role vLEI Credentials',
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
                            name: 'lei',
                            fluid: true,
                            readOnly: true,
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
                            onclick: (e) => openPreview(),
                        }),
                    ])
                ),
            ]);
        },
    };
}

module.exports = QualifiedvLEIIssuervLEICredential;
