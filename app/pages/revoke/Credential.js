import m from 'mithril';
import { Button, Card, Classes, Form, FormGroup, FormLabel, Icons, Intent, List, ListItem, Tag } from 'construct-ui';
import { AddressBook, CredentialNames, UserTypes } from '../../helpers';
import { Chain } from './index';

function Credential() {
    function holderName(cred) {
        if (
            cred.sad.a.t[1] === 'LegalEntityOfficialOrganizationalRolevLEICredential' ||
            cred.sad.a.t[1] === 'LegalEntityEngagementContextRolevLEICredential'
        ) {
            return cred.sad.a.personLegalName;
        }
        return AddressBook.get(cred.sad.a.i);
    }

    return {
        view: function (vnode) {
            if (!vnode.attrs.cred) {
                return;
            }
            let fields = [
                m(
                    FormGroup,
                    {
                        span: 6,
                    },
                    [m(FormLabel, {}, 'Holder:'), m('div', holderName(vnode.attrs.cred))]
                ),
                m(
                    FormGroup,
                    {
                        span: 6,
                    },
                    [m(FormLabel, {}, 'Credential:'), m('div', CredentialNames[vnode.attrs.cred.sad.s])]
                ),
                m(
                    FormGroup,
                    {
                        span: 6,
                    },
                    [m(FormLabel, {}, 'LEI:'), m('div', vnode.attrs.cred.sad.a.LEI)]
                ),
                m(
                    FormGroup,
                    {
                        span: 6,
                        color: 'red',
                    },
                    [
                        m(FormLabel, {}, 'Status:'),
                        m('div', [
                            m(Tag, {
                                label: vnode.attrs.cred.status === 'revoked' ? 'Revoked' : 'Valid',
                                intent: vnode.attrs.cred.status === 'revoked' ? Intent.NEGATIVE : Intent.POSITIVE,
                                rounded: false,
                                onRemove: undefined,
                                style: 'padding-left: 10px',
                            }),
                        ]),
                    ]
                ),
            ];

            if (vnode.attrs.cred.sad.a.t[1] === 'LegalEntityOfficialOrganizationalRolevLEICredential') {
                fields = fields.concat([
                    m(
                        FormGroup,
                        {
                            span: 12,
                        },
                        [m(FormLabel, {}, 'Legal Name:'), m('div', vnode.attrs.cred.sad.a.personLegalName)]
                    ),
                    m(
                        FormGroup,
                        {
                            span: 12,
                        },
                        [
                            m(FormLabel, {}, 'Official Organizational Role:'),
                            m('div', vnode.attrs.cred.sad.a.officialRole),
                        ]
                    ),
                ]);
            } else if (vnode.attrs.cred.sad.a.t[1] === 'LegalEntityEngagementContextRolevLEICredential') {
                fields = fields.concat([
                    m(
                        FormGroup,
                        {
                            span: 12,
                        },
                        [m(FormLabel, {}, 'Legal Name:'), m('div', vnode.attrs.cred.sad.a.personLegalName)]
                    ),
                    m(
                        FormGroup,
                        {
                            span: 12,
                        },
                        [
                            m(FormLabel, {}, 'Engagement Context Role:'),
                            m('div', vnode.attrs.cred.sad.a.engagementContextRole),
                        ]
                    ),
                ]);
            }

            fields = fields.concat([
                m(
                    FormGroup,
                    {
                        span: 12,
                    },
                    [
                        m(FormLabel, {}, 'Verified Signatures:'),
                        m(
                            'List',
                            {
                                interactive: true,
                                size: 5,
                                style: 'font-size: 14px',
                            },
                            vnode.attrs.cred.sigers.map((key, index) => m(ListItem, { label: index + 1 + '.  ' + key }))
                        ),
                    ]
                ),
            ]);

            if (vnode.attrs.cred.chains.length > 0) {
                fields.push(
                    m(
                        FormGroup,
                        {
                            span: 12,
                        },
                        [
                            m(FormLabel, { style: 'margin-bottom: 0px' }, 'Credential Provenance Chain:'),
                            m(
                                List,
                                {
                                    interactive: true,
                                    size: 5,
                                    style: 'font-size: 14px; background: "transparent"',
                                },
                                vnode.attrs.cred.chains.map((p, index) =>
                                    m(Chain, {
                                        cred: p,
                                    })
                                )
                            ),
                        ]
                    )
                );
            }

            if (!vnode.attrs.isWallet) {
                if (!vnode.attrs.isRevoked && !UserTypes.userTypeIn(['person', 'lei-data-user'])) {
                    fields.push(
                        m(
                            FormGroup,
                            {
                                class: Classes.ALIGN_RIGHT,
                            },
                            [
                                m(Button, {
                                    iconLeft: Icons.X_CIRCLE,
                                    label: 'Revoke',
                                    type: 'submit',
                                    disabled: vnode.attrs.cred.status === 'revoked',
                                    title: vnode.attrs.cred.status === 'revoked' ? 'Already Revoked' : '',
                                    intent: Intent.NEGATIVE,
                                }),
                            ]
                        )
                    );
                }
            }

            let style = {
                marginBottom: '16px',
            };

            return m(
                Card,
                {
                    fluid: true,
                    style: style,
                    disabled: vnode.attrs.cred.status === 'revoked',
                },
                [
                    m(
                        Form,
                        {
                            gutter: 16,
                            onsubmit: (e) => {
                                e.preventDefault();
                                vnode.attrs.revokeCredential(vnode.attrs.cred);
                            },
                        },
                        fields
                    ),
                ]
            );
        },
    };
}

module.exports = Credential;
