import m from 'mithril';
import { Button, Colors, Icon, Icons, Input, Intent, TabItem, Tabs } from 'construct-ui';

import { Header, Footer } from './components';
import { Issue, Revoke, Verify, Group, Mailbox, Settings } from './pages';
import { mailbox, toaster, xhring } from './helpers';

import 'construct-ui/lib/index.css';

let root = document.body;

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

function Layout() {
    return {
        view: (vnode) => {
            return m('main', [
                m(toaster.AppToaster, {
                    clearOnEscapeKey: true,
                    inline: false,
                    position: 'top-end',
                }),
                m(Header, [
                    m('h1', { style: { color: Colors.WHITE } }, 'KIWI'),
                    m('p', 'KERI Interactive Web Interface'),
                    m(Mailbox, {
                        port: xhring.port,
                    }),
                    m(PortInput),
                ]),
                m(
                    Tabs,
                    {
                        fluid: false,
                        align: 'left',
                        bordered: true,
                        size: 'lg',
                        style: { background: Colors.GREY50, overflowX: 'auto' },
                    },
                    m(
                        m.route.Link,
                        { href: 'issue' },
                        m(TabItem, {
                            label: [
                                m(Icon, {
                                    name: Icons.ARROW_RIGHT_CIRCLE,
                                    style: 'margin-right: 10px',
                                }),
                                'Issue',
                            ],
                        })
                    ),
                    m(
                        m.route.Link,
                        { href: 'revoke' },
                        m(TabItem, {
                            label: [
                                m(Icon, {
                                    name: Icons.MINUS_CIRCLE,
                                    style: 'margin-right: 10px',
                                }),
                                'Revoke',
                            ],
                        })
                    ),
                    m(
                        m.route.Link,
                        { href: 'verify' },
                        m(TabItem, {
                            label: [
                                m(Icon, {
                                    name: Icons.CHECK_CIRCLE,
                                    style: 'margin-right: 10px',
                                }),
                                'Verify',
                            ],
                        })
                    ),
                    m(
                        m.route.Link,
                        { href: 'group' },
                        m(TabItem, {
                            label: [
                                m(Icon, {
                                    name: Icons.USERS,
                                    style: 'margin-right: 10px',
                                }),
                                'Group Identifier',
                            ],
                        })
                    ),
                    m(
                        m.route.Link,
                        {
                            href: 'settings',
                            style: "margin-left: auto",
                        },
                        m(TabItem, {
                            label: [
                                m(Icon, {
                                    name: Icons.SETTINGS,
                                    style: 'margin-right: 10px',
                                }),
                                'Settings',
                            ],
                        })
                    )
                ),
                m('section', vnode.children),
                m(Footer, 'GLEIF Demo'),
            ]);
        },
    };
}

m.route(root, '/issue', {
    '/issue': {
        render: (vnode) => {
            return m(Layout, m(Issue, vnode.attrs));
        },
    },
    '/revoke': {
        render: (vnode) => {
            return m(Layout, m(Revoke, vnode.attrs));
        },
    },
    '/verify': {
        render: (vnode) => {
            return m(Layout, m(Verify, vnode.attrs));
        },
    },
    '/group': {
        render: (vnode) => {
            return m(Layout, m(Group, vnode.attrs));
        },
    },
    '/settings': {
        render: (vnode) => {
            return m(Layout, m(Settings, vnode.attrs));
        },
    },
});
