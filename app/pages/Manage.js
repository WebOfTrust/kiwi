import m from 'mithril';
import {
    Button,
    Card,
    Classes,
    Col,
    Colors,
    Dialog,
    Form,
    FormGroup,
    FormLabel,
    Grid,
    Icon,
    Icons,
    Input,
    Intent,
    Select,
} from 'construct-ui';
import { Container, Tile } from '../components';
import { AddressBook, CredentialNames, storing, toaster, UserTypes, xhring } from '../helpers';
import { CredentialList } from './revoke';

function Manage() {
    let recipient = Object.keys(AddressBook.book).find((key) => {
        return AddressBook.get(key) === 'ACME Corp. (Legal Entity)';
    });
    let lei = '506700GE1G29325QX363';
    let personLegalName = '';
    let officialRole = '';
    let engagementContextRole = '';
    let issuer = Object.keys(AddressBook.book).find((key) => {
        return AddressBook.get(key) === 'GLEIF';
    });

    const gridAttrs = { gutter: { xs: 0, sm: 8, md: 16, lg: 32, xl: 32 } };
    const colAttrs = { span: { xs: 12, md: 6 }, style: { margin: '16px 0' } };

    let CredentialTypes = {
        GLEIFvLEICredential: {
            label: 'GLEIF vLEI Credential',
            schema: 'ES63gXI-FmM6yQ7ISVIH__hOEhyE6W6-Ev0cArldsxuc',
            defaultRecipient: issuer,
            credData: () => {
                return {
                    LEI: lei,
                };
            },
            source: () => {},
        },
        QualifiedvLEIIssuervLEICredential: {
            label: 'Qualified vLEI Issuer vLEI Credential',
            schema: 'E-_XCbf1LJ0v9CR7g-_gOknf5dpoZROgF7qG5T8mXCv8',
            defaultRecipient: 'EyR75fE1ZmuCSfDwKPfbLowUWLqqi0ZX4502DLIo857Q',
            credData: () => {
                return {
                    LEI: lei,
                };
            },
            source: () => {},
        },
        LegalEntityvLEICredential: {
            label: 'Legal Entity vLEI Credential',
            schema: 'EC9rQ-xi_3cRrjANStL6tn6Kn4Z444r9rvTr_Vfi-750',
            defaultRecipient: 'EJ89uFMBC9r0S4Lrkj8NmbRx5Cz1ApXa47PJ_23Bz4h0',
            credData: () => {
                return {
                    LEI: lei,
                };
            },
            source: () => {
                return [
                    {
                        qualifiedvLEIIssuervLEICredential: {
                            d: qualifiedvLEIIssuerCred.sad.d,
                            i: qualifiedvLEIIssuerCred.sad.i,
                        },
                    },
                ];
            },
        },
        LegalEntityOfficialOrganizationalRolevLEICredential: {
            label: 'Legal Entity Official Organizational Role vLEI Credential',
            schema: 'EFBMQwQ1fv_bEBpqrom0EHLytFZiP5tWAs5HUpaa-WUg',
            defaultRecipient: 'EJ89uFMBC9r0S4Lrkj8NmbRx5Cz1ApXa47PJ_23Bz4h0',
            credData: () => {
                return {
                    LEI: lei,
                    personLegalName: personLegalName,
                    officialRole: officialRole,
                };
            },
            source: () => {
                return [
                    {
                        legalEntityvLEICredential: {
                            d: legalEntityCred.sad.d,
                            i: legalEntityCred.sad.i,
                        },
                    },
                ];
            },
        },
        LegalEntityEngagementContextRolevLEICredential: {
            label: 'Legal Entity Engagement Context Role vLEI Credential',
            schema: 'EMNumLS-O9ScGskk8h4xHvoiAeQf-CDW6KU3LoDUiz3o',
            defaultRecipient: 'EJ89uFMBC9r0S4Lrkj8NmbRx5Cz1ApXa47PJ_23Bz4h0',
            credData: () => {
                return {
                    LEI: lei,
                    personLegalName: personLegalName,
                    engagementContextRole: engagementContextRole,
                };
            },
            source: () => {
                return [
                    {
                        legalEntityvLEICredential: {
                            d: legalEntityCred.sad.d,
                            i: legalEntityCred.sad.i,
                        },
                    },
                ];
            },
        },
    };

    let CredentialOptions = {
        [UserTypes.DEVELOPER]: {
            GLEIFvLEICredential: CredentialTypes.GLEIFvLEICredential,
            QualifiedvLEIIssuervLEICredential: CredentialTypes.QualifiedvLEIIssuervLEICredential,
            LegalEntityvLEICredential: CredentialTypes.LegalEntityvLEICredential,
            LegalEntityOfficialOrganizationalRolevLEICredential:
                CredentialTypes.LegalEntityOfficialOrganizationalRolevLEICredential,
            LegalEntityEngagementContextRolevLEICredential:
                CredentialTypes.LegalEntityEngagementContextRolevLEICredential,
        },
        [UserTypes.GLEIF]: {
            GLEIFvLEICredential: CredentialTypes.GLEIFvLEICredential,
            QualifiedvLEIIssuervLEICredential: CredentialTypes.QualifiedvLEIIssuervLEICredential,
        },
        [UserTypes.QVI]: {
            LegalEntityvLEICredential: CredentialTypes.LegalEntityvLEICredential,
            LegalEntityOfficialOrganizationalRolevLEICredential:
                CredentialTypes.LegalEntityOfficialOrganizationalRolevLEICredential,
            LegalEntityEngagementContextRolevLEICredential:
                CredentialTypes.LegalEntityEngagementContextRolevLEICredential,
        },
        [UserTypes.LEGAL_ENTITY]: {},
        [UserTypes.PERSON]: {},
        [UserTypes.LEI_DATA_USER]: {},
    };

    let credentialType =
        UserTypes.getUserType() === UserTypes.GLEIF ? 'GLEIFvLEICredential' : 'LegalEntityvLEICredential';
    let wallet = [];
    let qualifiedvLEIIssuerCred = undefined;
    let legalEntityCred = undefined;

    let issued = [];

    let isSubmitting = false;
    let previewOpen = false;

    function openPreview() {
        previewOpen = true;
    }

    function closePreview() {
        previewOpen = false;
    }

    function loadCreds() {
        wallet = [];
        issued = [];
        xhring
            .credentials('received')
            .then((credentials) => {
                credentials.map((cred) => {
                    wallet.unshift(cred);
                });
                qualifiedvLEIIssuerCred = wallet.find((c) => c.sad.a.t.includes('QualifiedvLEIIssuervLEICredential'));
                m.redraw();
            })
            .catch((err) => {
                console.log('caught', err);
            });
        xhring
            .credentials('issued')
            .then((credentials) => {
                credentials.map((cred) => {
                    issued.unshift(cred);
                });
                legalEntityCred = issued.find((c) => c.sad.a.t.includes('LegalEntityvLEICredential'));
                m.redraw();
            })
            .catch((err) => {
                console.log('caught', err);
            });
    }

    function handleSubmit(e = null) {
        if (e) {
            e.preventDefault();
        }
        isSubmitting = true;
        if (
            (credentialType === 'LegalEntityEngagementContextRolevLEICredential' ||
                credentialType === 'LegalEntityOfficialOrganizationalRolevLEICredential') &&
            legalEntityCred === undefined
        ) {
            toaster.error(`You must issue a Legal Entity vLEI before this credential`);
            isSubmitting = false;
            return;
        }

        xhring
            .exnRequest({
                credentialData: CredentialTypes[credentialType].credData(),
                schema: CredentialTypes[credentialType].schema,
                type: credentialType,
                registry: UserTypes.getUserType(),
                source: CredentialTypes[credentialType].source(),
                recipient,
            })
            .then((res) => {
                isSubmitting = false;
                toaster.success(`${CredentialTypes[credentialType].label} issued.`);
                closePreview();
            })
            .catch((err) => {
                isSubmitting = false;
                console.log('caught', err);
                toaster.error(`Failed to issue ${CredentialTypes[credentialType].label}`);
            });
    }

    function revokeCredential(cred) {
        xhring
            .revokeRequest({
                said: cred.sad.d,
                registry: UserTypes.getUserType(),
            })
            .then((res) => {
                toaster.success(`Revoked ${CredentialNames[cred.sad.s]}`);
                loadCreds();
                m.redraw();
            })
            .catch(() => {
                toaster.error(`Failed to revoke ${CredentialNames[cred.sad.s]}`);
                console.log(e);
            });
    }

    return {
        oninit: function () {
            loadCreds();
        },
        view: function () {
            let issuerCredentialIdentifier = '';
            let isIssuer = UserTypes.getUserType() === UserTypes.GLEIF || qualifiedvLEIIssuerCred !== undefined;
            if (qualifiedvLEIIssuerCred !== undefined) {
                issuerCredentialIdentifier = qualifiedvLEIIssuerCred.sad.d;
            }
            let legalEntityCredIdentifier = '';
            if (legalEntityCred !== undefined) {
                legalEntityCredIdentifier = legalEntityCred.sad.d;
            }

            let chain = m('p');
            if (credentialType === 'LegalEntityvLEICredential') {
                chain = m(FormGroup, [
                    m(FormLabel, 'Authorizing Qualified vLEI Issuer vLEI Credential'),
                    m('p', issuerCredentialIdentifier),
                ]);
            } else if (
                credentialType === 'LegalEntityEngagementContextRolevLEICredential' ||
                credentialType === 'LegalEntityOfficialOrganizationalRolevLEICredential'
            ) {
                chain = m(FormGroup, [
                    m(FormLabel, 'Authorizing Legal Entity vLEI Credential'),
                    m('p', legalEntityCredIdentifier),
                ]);
            }

            return m(
                Container,
                m(Grid, gridAttrs, [
                    m(
                        Col,
                        colAttrs,
                        m(
                            Tile,
                            {
                                title: 'Issue Credentials',
                                intent: Intent.PRIMARY,
                            },
                            m(Container, { style: { padding: '16px' } }, [
                                m(
                                    Form,
                                    {
                                        gutter: 16,
                                        style: { marginTop: '16px' },
                                    },
                                    m(
                                        FormGroup,
                                        m(FormLabel, { for: 'type' }, 'Credential'),
                                        m(Select, {
                                            contentLeft: m(Icon, { name: Icons.FILE }),
                                            id: 'typ',
                                            name: 'typ',
                                            fluid: true,
                                            options: Object.keys(CredentialOptions[UserTypes.getUserType()]).map(
                                                (key) => {
                                                    return {
                                                        value: `${key}`,
                                                        label: CredentialTypes[key].label,
                                                    };
                                                }
                                            ),
                                            defaultValue: credentialType,
                                            onchange: (e) => {
                                                credentialType = e.target.value;
                                            },
                                        })
                                    ),
                                    m(
                                        FormGroup,
                                        m(FormLabel, { for: 'entity' }, 'Entity'),
                                        m(Select, {
                                            contentLeft: m(Icon, { name: Icons.USER }),
                                            id: 'entity',
                                            name: 'entity',
                                            fluid: true,
                                            options: Object.keys(AddressBook.book).map((key) => {
                                                console.log(key);
                                                return {
                                                    label: `${AddressBook.get(key)}`,
                                                    value: key,
                                                };
                                            }),
                                            defaultValue: recipient,
                                            onchange: (e) => {
                                                recipient = e.target.value;
                                                personLegalName = AddressBook.get(recipient).replace('(Person)', '').trim();
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
                                            readOnly: false,
                                            defaultValue: lei,
                                            oninput: (e) => {
                                                lei = e.target.value;
                                            },
                                        })
                                    ),
                                    m(
                                        FormGroup,
                                        {
                                            style: `display:${
                                                credentialType ===
                                                    'LegalEntityOfficialOrganizationalRolevLEICredential' ||
                                                credentialType === 'LegalEntityEngagementContextRolevLEICredential'
                                                    ? 'inline'
                                                    : 'none'
                                            }`,
                                        },
                                        m(FormLabel, 'Legal Name'),
                                        m(
                                            'p',
                                            m(Input, {
                                                contentLeft: m(Icon, { name: Icons.USER }),
                                                id: 'personLegalName',
                                                name: 'personLegalName',
                                                placeholder: personLegalName,
                                                fluid: true,
                                                disabled: true,
                                            })
                                        )
                                    ),
                                    m(
                                        FormGroup,
                                        {
                                            style: `display:${
                                                credentialType === 'LegalEntityOfficialOrganizationalRolevLEICredential'
                                                    ? 'inline'
                                                    : 'none'
                                            }`,
                                        },
                                        [
                                            m(FormLabel, 'Official Organizational Role'),
                                            m(
                                                'p',
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
                                        ]
                                    ),
                                    m(
                                        FormGroup,
                                        {
                                            style: `display:${
                                                credentialType === 'LegalEntityEngagementContextRolevLEICredential'
                                                    ? 'inline'
                                                    : 'none'
                                            }`,
                                        },
                                        [
                                            m(FormLabel, 'Engagement Context Role'),
                                            m(
                                                'p',
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
                                        ]
                                    ),
                                    m(FormGroup, { class: Classes.ALIGN_RIGHT }, [
                                        m(Button, {
                                            type: 'button',
                                            label: 'Issue',
                                            title: isIssuer
                                                ? 'Issue Credential'
                                                : 'Qualified vLEI Issuer vLEI Credential Required',
                                            disabled: !isIssuer,
                                            intent: 'primary',
                                            onclick: (e) => openPreview(),
                                        }),
                                    ])
                                ),
                                m(Dialog, {
                                    isOpen: previewOpen,
                                    onClose: () => closePreview(),
                                    title: `Issue ${CredentialTypes[credentialType].label}`,
                                    content: [
                                        m(
                                            'p',
                                            `This ${CredentialTypes[credentialType].label} will be issued to the following entity:`
                                        ),
                                        m(Card, { fluid: true }, [
                                            m(Form, [
                                                m(FormGroup, [
                                                    m(FormLabel, 'Entity'),
                                                    m('p', `${AddressBook.get(recipient)}`),
                                                ]),
                                                m(FormGroup, [m(FormLabel, 'LEI'), m('p', lei)]),
                                                chain,
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
                            ])
                        )
                    ),
                    m(
                        Col,
                        colAttrs,
                        m(
                            Tile,
                            {
                                title: 'Issued Credentials',
                                intent: Intent.PRIMARY,
                            },
                            m(CredentialList, {
                                credentials: issued,
                                revokeCredential: revokeCredential,
                                emptyStateHeader: 'No Issued Credentials',
                            })
                        )
                    ),
                ])
            );
        },
    };
}

module.exports = Manage;
