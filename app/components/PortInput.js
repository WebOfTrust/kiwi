import m from 'mithril';
import { Button, Input, Intent } from 'construct-ui';

import { mailbox, xhring } from '../helpers';

function PortInput() {
    let inputValue = xhring.port;

    return {
        view: (vnode) => {
            return m(Input, {
                contentRight: m(Button, {
                    label: 'Set Port',
                    intent: Intent.PRIMARY,
                    onclick: (e) => {
                        xhring.port = parseInt(inputValue);
                        mailbox.port = parseInt(inputValue);
                    },
                }),
                defaultValue: inputValue,
                style: {
                    marginLeft: '1rem',
                },
                type: 'number',
                onchange: (e) => {
                    inputValue = e.target.value;
                },
            });
        },
    };
}

module.exports = PortInput;
