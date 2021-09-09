import m from 'mithril';
import { Button, Card, Classes, Dialog, Form, FormGroup, FormLabel, Icon, Icons, Input, Intent } from 'construct-ui';
import { CredentialNames, storing } from '../../helpers';

const AddressBook = {
    'EpXprWFWmvJx4dP7CqDyXRgoigTVFwEUh6i-6jUCcoU8': 'Jordan Price',
};

function Credential() {
    return {
        view: function (vnode) {
            let fields = [
                m(
                    FormGroup,
                    {
                        span: 6,
                    },
                    [m(FormLabel, {}, 'To:'), m('div', AddressBook[vnode.attrs.cred.d.si])]
                ),
                m(
                    FormGroup,
                    {
                        span: 6,
                    },
                    [m(FormLabel, {}, 'Credential:'), m('div', CredentialNames[vnode.attrs.cred.x])]
                ),
                m(
                    FormGroup,
                    {
                        span: 6,
                    },
                    [m(FormLabel, {}, 'LEI:'), m('div', vnode.attrs.cred.d.LEI)]
                ),
            ];

            if (vnode.attrs.cred.d.type[1] === 'LegalEntityOfficialOrganizationalRolevLEICredential') {
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
            } else if (vnode.attrs.cred.d.type[1] === 'LegalEntityEngagementContextRolevLEICredential') {
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

            if (!vnode.attrs.isRevoked) {
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
