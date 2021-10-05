import m from 'mithril';
import {Button, Card, Classes, Form, FormGroup, FormLabel, Icons, Intent, ListItem} from 'construct-ui';
import {AddressBook, xhring} from '../../helpers';

function Group() {
    return {
        view: function (vnode) {
            if (!vnode.attrs.group) {
                return null;
            }

            let delegator = vnode.attrs.group.delegated ?
                m(
                    FormGroup,
                    {
                        span: 6,
                    },
                    [
                        m(
                            FormLabel,
                            {},
                            'Delegator:'
                        ),
                        m('div', AddressBook[vnode.attrs.group.delegator].name + " (" + vnode.attrs.group.delegator + ")"),
                    ]
                )
                :
                m(FormGroup, {
                    span: 6,
                });


            let fields = [
                m(
                    Form,
                    {
                        gutter: 16,
                        onsubmit: (e) => {
                            e.preventDefault();
                            xhring
                                .multisigRotatePost({
                                    group: vnode.attrs.group.name,
                                })
                                .then((res) => {
                                })
                                .catch((err) => {
                                    console.log('caught', err);
                                });
                        },
                    },
                    [
                        m(
                            FormGroup,
                            {
                                span: 6,
                            },
                            [
                                m(
                                    FormLabel,
                                    {},
                                    vnode.attrs.group.delegated ? 'Delegated Identifier' : 'Identifier:'
                                ),
                                m('div', vnode.attrs.group.prefix),
                            ]
                        ),
                        m(
                            FormGroup,
                            {
                                span: 6,
                            },
                            [m(FormLabel, {}, 'Event Sequence No:'), m('div', vnode.attrs.group.seq_no)]
                        ),
                        delegator,
                        m(FormGroup, {
                            span: 6,
                        }),
                        m(
                            FormGroup,
                            {
                                span: 6,
                            },
                            [
                                m(FormLabel, {}, 'Participants:'),
                                m(
                                    'List',
                                    {
                                        interactive: true,
                                        size: 5,
                                    },
                                    vnode.attrs.group.aids.map((aid, index) =>
                                        m(ListItem, {label: index + 1 + '.  ' + aid})
                                    )
                                ),
                            ]
                        ),
                        m(FormGroup, {
                            span: 6,
                        }),
                        m(
                            FormGroup,
                            {
                                span: 6,
                            },
                            [
                                m(FormLabel, {}, 'Public Keys:'),
                                m(
                                    'List',
                                    {
                                        interactive: true,
                                        size: 5,
                                    },
                                    vnode.attrs.group.public_keys.map((key, index) =>
                                        m(ListItem, {label: index + 1 + '.  ' + key})
                                    )
                                ),
                            ]
                        ),
                        m(FormGroup, {
                            span: 6,
                        }),
                        m(
                            FormGroup,
                            {
                                span: 6,
                            },
                            [
                                m(
                                    FormLabel,
                                    {},
                                    'Witnesses: (Threshold: ' +
                                    vnode.attrs.group.toad +
                                    '  /  Current Receipts: ' +
                                    vnode.attrs.group.receipts +
                                    ')'
                                ),
                                m(
                                    'List',
                                    {
                                        interactive: true,
                                        size: 5,
                                    },
                                    vnode.attrs.group.witnesses.map((wit) => m(ListItem, {label: wit}))
                                ),
                            ]
                        ),
                        m(
                            FormGroup,
                            {
                                class: Classes.ALIGN_RIGHT,
                            },
                            [
                                m(Button, {
                                    iconLeft: Icons.ROTATE_CW,
                                    label: 'Rotate',
                                    type: 'submit',
                                    intent: Intent.PRIMARY,
                                }),
                            ]
                        ),
                    ]
                ),
            ]

            return m(
                Card,
                {
                    fluid: true,
                    style: {
                        marginBottom: '16px',
                    },
                },
                fields
            );
        },
    };
}

module.exports = Group;
