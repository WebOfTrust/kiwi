import m from 'mithril';
import {
    Button,
    Card,
    Classes,
    Dialog,
    Form,
    FormGroup,
    FormLabel,
    Icon,
    Icons,
    Input,
    Intent,
    ListItem,
} from 'construct-ui';
import { AddressBook, CredentialNames, UserTypes } from '../../helpers';

function Credential() {
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
                    [m(FormLabel, {}, 'To:'), m('div', AddressBook[vnode.attrs.cred.sad.d.si])]
                ),
                m(
                    FormGroup,
                    {
                        span: 6,
                    },
                    [m(FormLabel, {}, 'Credential:'), m('div', CredentialNames[vnode.attrs.cred.sad.x])]
                ),
                m(
                    FormGroup,
                    {
                        span: 6,
                    },
                    [m(FormLabel, {}, 'LEI:'), m('div', vnode.attrs.cred.sad.d.LEI)]
                ),
            ];

            if (vnode.attrs.cred.sad.d.type[1] === 'LegalEntityOfficialOrganizationalRolevLEICredential') {
                fields = fields.concat([
                    m(
                        FormGroup,
                        {
                            span: 6,
                        },
                        [m(FormLabel, {}, ''), m('div', '')]
                    ),
                    m(
                        FormGroup,
                        {
                            span: 6,
                        },
                        [m(FormLabel, {}, 'Legal Name:'), m('div', vnode.attrs.cred.d.personLegalName)]
                    ),
                    m(
                        FormGroup,
                        {
                            span: 6,
                        },
                        [m(FormLabel, {}, 'Official Role:'), m('div', vnode.attrs.cred.d.officialRole)]
                    ),
                ]);
            } else if (vnode.attrs.cred.sad.d.type[1] === 'LegalEntityEngagementContextRolevLEICredential') {
                fields = fields.concat([
                    m(
                        FormGroup,
                        {
                            span: 6,
                        },
                        [m(FormLabel, {}, ''), m('div', '')]
                    ),
                    m(
                        FormGroup,
                        {
                            span: 6,
                        },
                        [m(FormLabel, {}, 'Legal Name:'), m('div', vnode.attrs.cred.d.personLegalName)]
                    ),
                    m(
                        FormGroup,
                        {
                            span: 6,
                        },
                        [m(FormLabel, {}, 'Engagement Role:'), m('div', vnode.attrs.cred.d.engagementContextRole)]
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
                                intent: Intent.NEGATIVE,
                            }),
                        ]
                    )
                );
            }

            return m(
                Card,
                {
                    fluid: true,
                    style: {
                        marginBottom: '16px',
                    },
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
