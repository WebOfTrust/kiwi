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
import {Container, Tile} from '../components';
import {AddressBook, CredentialNames, storing, toaster, UserTypes, xhring} from '../helpers';
import {CredentialList} from './revoke';

function Manage() {
    let recipient = 'EJ89uFMBC9r0S4Lrkj8NmbRx5Cz1ApXa47PJ_23Bz4h0';
    let lei = '506700GE1G29325QX363';
    let personLegalName = '';
    let officialRole = '';
    let engagementContextRole = '';

    const gridAttrs = {gutter: {xs: 0, sm: 8, md: 16, lg: 32, xl: 32}};
    const colAttrs = {span: {xs: 12, md: 6}, style: {margin: '16px 0'}};

    let CredentialTypes = {
        GLEIFvLEICredential: {
            label: 'GLEIF vLEI Credential',
            schema: 'ES63gXI-FmM6yQ7ISVIH__hOEhyE6W6-Ev0cArldsxuc',
            defaultRecipient: 'EZNNZO-Sa41t-ps_jwOeeDmo2x_nPNavwOEl1QbN7O7s',
            credData: () => {
                return {
                    LEI: lei,
                };
            },
            source: () => {
            },
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
            source: () => {
            },
        },
        LegalEntityvLEICredential: {
            label: 'Legal Entity vLEI Credential',
            schema: 'EJEY6JAAVfAh8-yBTV37rHaJ9b_VKvkZunz_oJupzsvQ',
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
            schema: 'E3n2Od38xMVDoM6Km-Awse_Cw9z0RtUJN-j0MQo642xw',
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
                        qualifiedvLEIIssuervLEICredential: {
                            d: qualifiedvLEIIssuerCred.sad.d,
                            i: qualifiedvLEIIssuerCred.sad.i,
                        },
                    },
                ];
            },
        },
        LegalEntityEngagementContextRolevLEICredential: {
            label: 'Legal Entity Engagement Context Role vLEI Credential',
            schema: 'EmaEqu_zIkxXKsrNJFTJq_s2c96McS8yzHhcvYDW8u5A',
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
                        qualifiedvLEIIssuervLEICredential: {
                            d: qualifiedvLEIIssuerCred.sad.d,
                            i: qualifiedvLEIIssuerCred.sad.i,
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

    let issued = [];
    let revoked = [];

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
                    if (cred.status === 'issued') {
                        issued.unshift(cred);
                    } else {
                        revoked.unshift(cred);
                    }
                });
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
                toaster.success(`${CredentialOptions[UserTypes.getUserType()].label} issued.`);
                closePreview();
            })
            .catch((err) => {
                isSubmitting = false;
                console.log('caught', err);
                toaster.error('Failed to issue GLEIFvLEICredential');
            });
    }

    function revokeCredential(cred) {
        xhring
            .revokeRequest({
                said: cred.sad.d,
                registry: UserTypes.getUserType(),
            })
            .then((res) => {
                storing.revokeCredential(cred.sad.d);
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
                            m(Container, {style: {padding: '16px'}}, [
                                m(
                                    Form,
                                    {
                                        gutter: 16,
                                        style: {marginTop: '16px'},
                                    },
                                    m(
                                        FormGroup,
                                        m(FormLabel, {for: 'type'}, 'Credential'),
                                        m(Select, {
                                            contentLeft: m(Icon, {name: Icons.FILE}),
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
                                        m(FormLabel, {for: 'entity'}, 'Entity'),
                                        m(Select, {
                                            contentLeft: m(Icon, {name: Icons.USER}),
                                            id: 'entity',
                                            name: 'entity',
                                            fluid: true,
                                            options: Object.keys(AddressBook).map((key) => {
                                                return {
                                                    label: `${AddressBook[key].name} (${key})`,
                                                    value: key,
                                                };
                                            }),
                                            defaultValue: CredentialTypes[credentialType].defaultRecipient,
                                            onchange: (e) => {
                                                recipient = e.target.value;
                                            },
                                        })
                                    ),
                                    m(
                                        FormGroup,
                                        m(FormLabel, {for: 'lei'}, 'LEI'),
                                        m(Input, {
                                            contentLeft: m(Icon, {name: Icons.HASH}),
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
                                        [
                                            m(FormLabel, 'Legal Name'),
                                            m(
                                                'p',
                                                m(Input, {
                                                    contentLeft: m(Icon, {name: Icons.USER}),
                                                    id: 'personLegalName',
                                                    name: 'personLegalName',
                                                    placeholder: '',
                                                    fluid: true,
                                                    oninput: (e) => {
                                                        personLegalName = e.target.value;
                                                    },
                                                })
                                            ),
                                        ]
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
                                            m(FormLabel, 'Official Role'),
                                            m(
                                                'p',
                                                m(Input, {
                                                    contentLeft: m(Icon, {name: Icons.GLOBE}),
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
                                                    contentLeft: m(Icon, {name: Icons.TAG}),
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
                                    m(FormGroup, {class: Classes.ALIGN_RIGHT}, [
                                        m(Button, {
                                            type: 'button',
                                            label: 'Issue',
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
                                        m(Card, {fluid: true}, [
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
                                            {style: {color: Colors.RED700, marginTop: '1rem'}},
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
