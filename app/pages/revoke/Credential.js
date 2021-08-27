import m from 'mithril';
import { Button, Card, Classes, Dialog, Form, FormGroup, FormLabel, Icon, Icons, Input, Intent } from 'construct-ui';
import { storing } from '../../helpers';

function Credential() {
    return {
        view: function (vnode) {
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
                        [
                            m(
                                FormGroup,
                                {
                                    span: 6,
                                },
                                [m(FormLabel, {}, 'To:'), m('div', vnode.attrs.cred.d.recipient)]
                            ),
                            m(
                                FormGroup,
                                {
                                    span: 6,
                                },
                                [m(FormLabel, {}, 'Credential:'), m('div', vnode.attrs.cred.i)]
                            ),
                            m(
                                FormGroup,
                                {
                                    span: 6,
                                },
                                [m(FormLabel, {}, 'LEI:'), m('div', vnode.attrs.cred.d.data?.LEI)]
                            ),
                            !vnode.attrs.isRevoked
                                ? m(
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
                                : null,
                        ]
                    ),
                ]
            );
        },
    };
}

module.exports = Credential;
