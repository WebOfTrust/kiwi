import m from 'mithril';
import {
    Card,
    Form,
    Button,
    Intent,
    Classes,
    Icon,
    Icons,
    FormGroup,
    FormLabel,
    ListItem,
    Dialog,
    Input,
    List,
    Size,
} from 'construct-ui';
import { AddressBook, xhring } from '../../helpers';

function Identifier() {
    let isSubmitting = false;
    let isOpen = false;
    let isith = 3;
    let count = 3;
    let toad = 3;

    let witness = '';
    let witnesses = [];

    return {
        oninit: function (vnode) {
            isith = vnode.attrs.identifier.isith;
            count = vnode.attrs.identifier.public_keys.length;
            toad = vnode.attrs.identifier.toad;

            witnesses = vnode.attrs.identifier.witnesses.slice();
        },
        view: function (vnode) {
            if (!vnode.attrs.identifier) {
                return null;
            }

            let close = () => {
                isOpen = false;
                isSubmitting = false;
            };

            let submit = (e) => {
                e.preventDefault();
                isSubmitting = true;
                xhring
                    .rotatePost({
                        wits: witnesses,
                        count: count,
                        toad: toad,
                        isith: isith,
                    })
                    .then((res) => {
                        isOpen = false;
                        isSubmitting = false;
                        vnode.attrs.loadIdentifiers();
                    })
                    .catch((err) => {
                        console.log('caught', err);
                    });
            };

            let delegator = vnode.attrs.identifier.delegated
                ? m(
                      FormGroup,
                      {
                          span: 6,
                      },
                      [
                          m(FormLabel, {}, 'Delegator:'),
                          m(
                              'div',
                              AddressBook.get(vnode.attrs.identifier.delegator) +
                                  ' (' +
                                  vnode.attrs.identifier.delegator +
                                  ')'
                          ),
                      ]
                  )
                : m(FormGroup, {
                      span: 6,
                  });

            let fields = [
                m(
                    Form,
                    {
                        gutter: 16,
                        onsubmit: (e) => {
                            e.preventDefault();
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
                                    vnode.attrs.identifier.delegated ? 'Delegated Identifier' : 'Identifier:'
                                ),
                                m('div', vnode.attrs.identifier.name),
                            ]
                        ),
                        m(
                            FormGroup,
                            {
                                span: 6,
                            },
                            [m(FormLabel, {}, 'Event Sequence No:'), m('div', vnode.attrs.identifier.seq_no)]
                        ),
                        m(
                            FormGroup,
                            {
                                span: 6,
                            },
                            [m(FormLabel, {}, 'Prefix:'), m('div', vnode.attrs.identifier.prefix)]
                        ),
                        delegator,
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
                                    vnode.attrs.identifier.public_keys.map((key, index) =>
                                        m(ListItem, { label: index + 1 + '.  ' + key })
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
                                        vnode.attrs.identifier.toad +
                                        '  /  Current Receipts: ' +
                                        vnode.attrs.identifier.receipts +
                                        ')'
                                ),
                                m(
                                    'List',
                                    {
                                        interactive: true,
                                        size: 5,
                                    },
                                    vnode.attrs.identifier.witnesses.map((wit) => m(ListItem, { label: wit }))
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
                                    label: vnode.attrs.identifier.delegated ? 'Request Rotation' : 'Rotate',
                                    type: 'submit',
                                    intent: Intent.PRIMARY,
                                    onclick: () => {
                                        isOpen = !isOpen;
                                        console.log(isOpen);
                                    },
                                }),
                                m(Dialog, {
                                    isOpen: isOpen,
                                    onClose: close,
                                    title: vnode.attrs.identifier.delegated
                                        ? 'Identifier Rotation Request'
                                        : 'Rotate Identifier',
                                    content: [
                                        m(Form, { gutter: 16 }, [
                                            m(FormGroup, [
                                                m(FormLabel, { for: 'witness' }, 'Witnesses'),
                                                m(Input, {
                                                    disabled: true,
                                                    contentLeft: m(Icon, { name: Icons.CROSSHAIR }),
                                                    contentRight: m(Button, {
                                                        iconLeft: Icons.PLUS_CIRCLE,
                                                        label: 'Add',
                                                        onclick: (e) => {
                                                            witnesses.push(witness);
                                                            witness = '';
                                                        },
                                                    }),
                                                    style: {
                                                        marginBottom: '1rem',
                                                    },
                                                    id: 'witness',
                                                    placeholder: 'Witness identifier...',
                                                    oninput: (e) => {
                                                        witness = e.target.value;
                                                    },
                                                    value: witness,
                                                }),
                                                m(
                                                    List,
                                                    {
                                                        interactive: true,
                                                        size: Size.XS,
                                                    },
                                                    witnesses.map((wit, index) =>
                                                        m(ListItem, {
                                                            contentRight: m(Icon, {
                                                                name: Icons.X,
                                                                onclick: (e) => {
                                                                    //TODO:  re-enable after pilot
                                                                    //witnesses.splice(index, 1);
                                                                },
                                                            }),
                                                            label: index + 1 + '.  ' + wit,
                                                        })
                                                    )
                                                ),
                                            ]),

                                            m(FormGroup, { span: { xs: 12, sm: 12, md: 6, lg: 4 } }, [
                                                m(FormLabel, { for: 'count' }, 'Next Number of Keys'),
                                                m(Input, {
                                                    contentLeft: m(Icon, { name: Icons.HASH }),
                                                    id: 'count',
                                                    name: 'count',
                                                    type: 'number',
                                                    value: count,
                                                    onchange: (e) => {
                                                        count = e.target.value;
                                                    },
                                                    oninput: (e) => {
                                                        count = e.target.value;
                                                    },
                                                }),
                                            ]),
                                            m(FormGroup, { span: { xs: 12, sm: 12, md: 6, lg: 4 } }, [
                                                m(FormLabel, { for: 'toad' }, 'Withness Threshold'),
                                                m(Input, {
                                                    contentLeft: m(Icon, { name: Icons.USERS }),
                                                    id: 'toad',
                                                    name: 'toad',
                                                    type: 'number',
                                                    value: toad,
                                                    onchange: (e) => {
                                                        toad = e.target.value;
                                                    },
                                                    oninput: (e) => {
                                                        toad = e.target.value;
                                                    },
                                                }),
                                            ]),
                                            m(FormGroup, { span: { xs: 12, sm: 12, md: 6, lg: 4 } }, [
                                                m(FormLabel, { for: 'isith' }, 'Next Signature Threshold'),
                                                m(Input, {
                                                    contentLeft: m(Icon, { name: Icons.USERS }),
                                                    id: 'isith',
                                                    name: 'isith',
                                                    type: 'number',
                                                    value: isith,
                                                    onchange: (e) => {
                                                        isith = e.target.value;
                                                    },
                                                    oninput: (e) => {
                                                        isith = e.target.value;
                                                    },
                                                }),
                                            ]),
                                        ]),
                                    ],
                                    footer: m(`.${Classes.ALIGN_RIGHT}`, [
                                        m(Button, {
                                            label: 'Close',
                                            onclick: close,
                                        }),
                                        m(Button, {
                                            loading: isSubmitting,
                                            label: 'Submit',
                                            intent: 'primary',
                                            onclick: submit,
                                        }),
                                    ]),
                                }),
                            ]
                        ),
                    ]
                ),
            ];

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

module.exports = Identifier;
