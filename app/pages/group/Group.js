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
    List,
    ListItem,
} from 'construct-ui';
import { storing } from '../../helpers';

function Group() {
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
                                vnode.attrs.revokeCredential(vnode.attrs.group);
                            },
                        },
                        [
                            m(
                                FormGroup,
                                {
                                    span: 6,
                                },
                                [m(FormLabel, {}, 'Group:'), m('div', vnode.attrs.group.name)]
                            ),
                            m(
                                FormGroup,
                                {
                                    span: 6,
                                },
                                [m(FormLabel, {}, 'Event Sequence No:'), m('div', vnode.attrs.group.seq_no)]
                            ),
                            m(
                                FormGroup,
                                {
                                    span: 6,
                                },
                                [m(FormLabel, {}, 'Identifier:'), m('div', vnode.attrs.group.prefix)]
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
                                    m(FormLabel, {}, 'Participants:'),
                                    m(
                                        'List',
                                        {
                                            interactive: true,
                                            size: 5,
                                        },
                                        vnode.attrs.group.aids.map((aid, index) =>
                                            m(ListItem, { label: index + 1 + '.  ' + aid })
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
                                        vnode.attrs.group.witnesses.map((wit) => m(ListItem, { label: wit }))
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
            );
        },
    };
}

module.exports = Group;
