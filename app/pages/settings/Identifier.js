import m from 'mithril';
import { Card, Form, FormGroup, FormLabel, ListItem } from 'construct-ui';

function Identifier() {
    return {
        view: function (vnode) {
            if (!vnode.attrs.identifier) {
                return null;
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
                            },
                        },
                        [
                            m(
                                FormGroup,
                                {
                                    span: 6,
                                },
                                [
                                    m(FormLabel, {}, vnode.attrs.identifier.delegated ? "Delegated Identifier" : 'Identifier:'),
                                    m('div', vnode.attrs.identifier.name)
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
                        ]
                    ),
                ]
            );
        },
    };
}

module.exports = Identifier;
