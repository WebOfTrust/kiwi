import m from 'mithril';
import {Colors, Icon, Icons, TabItem, Tabs} from 'construct-ui';

import {Footer, Header, PortInput, UserTypeInput} from './components';
import {toaster, UserTypes, xhring} from './helpers';

import 'construct-ui/lib/index.css';
import {GetStarted, Group, Mailbox, Manage, Settings, Verify, Wallet} from './pages';

let root = document.body;

console.log({
    CONTROLLER_URL: process.env.CONTROLLER_URL,
    CONTROLLER_PORT: process.env.CONTROLLER_PORT,
    USER_TYPE: process.env.USER_TYPE,
    PRIMARY_COLOR: process.env.PRIMARY_COLOR,
});

function Layout() {
    let active = 'Manage';

    return {
        oninit: () => {
            if (UserTypes.userTypeIn(['developer', 'qvi'])) {
                active = 'Get Started';
            }
        },
        view: (vnode) => {
            return m('main', [
                m(toaster.AppToaster, {
                    clearOnEscapeKey: true,
                    inline: false,
                    position: 'top-end',
                }),
                m(Header, [
                    m('h1', {style: {color: Colors.WHITE}}, 'KIWI'),
                    m('p', 'KERI Interactive Web Interface'),
                    process.env.USER_TYPE === 'developer'
                        ? m('div', {style: {marginBottom: '1rem'}}, [
                            m(UserTypeInput, {
                                defaultRoute: defaultRouteForUserType(),
                            }),
                        ])
                        : null,
                    m('div', [
                        m(Mailbox, {
                            port: xhring.port,
                        }),
                        process.env.USER_TYPE === 'developer' ? m(PortInput) : null,
                    ]),
                ]),
                m(
                    Tabs,
                    {
                        fluid: false,
                        align: 'left',
                        bordered: true,
                        size: 'lg',
                        style: {background: Colors.GREY50, overflowX: 'auto'},
                    },
                    UserTypes.userTypeIn(['developer', 'qvi'])
                        ? m(
                            m.route.Link,
                            {
                                href: 'get-started',
                                outline: 'none',
                            },
                            m(TabItem, {
                                label: [
                                    m(Icon, {
                                        name: Icons.FAST_FORWARD,
                                        style: 'margin-right: 10px',
                                    }),
                                    'Get Started',
                                ],
                                active: active === 'Get Started',
                                onclick: () => (active = 'Get Started'),
                            })
                        )
                        : null,
                    UserTypes.userTypeIn(['developer', 'gleif', 'qvi'])
                        ? m(
                            m.route.Link,
                            {
                                href: 'manage',
                                outline: 'none',
                            },
                            m(TabItem, {
                                label: [
                                    m(Icon, {
                                        name: Icons.LAYERS,
                                        style: 'margin-right: 10px',
                                    }),
                                    'Manage',
                                ],
                                active: active === 'Manage',
                                onclick: () => (active = 'Manage'),
                            })
                        )
                        : null,
                    UserTypes.userTypeIn(['developer', 'gleif', 'qvi', 'legal-entity', 'person'])
                        ? m(
                            m.route.Link,
                            {
                                href: 'wallet',
                                outline: 'none',
                            },
                            m(TabItem, {
                                label: [
                                    m(Icon, {
                                        name: Icons.BOOK_OPEN,
                                        style: 'margin-right: 10px',
                                    }),
                                    'Wallet',
                                ],
                                active: active === 'Wallet',
                                onclick: () => (active = 'Wallet'),
                            })
                        )
                        : null,
                    UserTypes.userTypeIn(['developer', 'qvi', 'legal-entity', 'lei-data-user'])
                        ? m(
                            m.route.Link,
                            {href: 'verify'},
                            m(TabItem, {
                                label: [
                                    m(Icon, {
                                        name: Icons.CHECK_CIRCLE,
                                        style: 'margin-right: 10px',
                                    }),
                                    'Verify',
                                ],
                                active: active === 'Verify',
                                onclick: () => (active = 'Verify'),
                            })
                        )
                        : null,
                    UserTypes.userTypeIn(['developer', 'gleif', 'qvi'])
                        ? m(
                            m.route.Link,
                            {href: 'group'},
                            m(TabItem, {
                                label: [
                                    m(Icon, {
                                        name: Icons.USERS,
                                        style: 'margin-right: 10px',
                                    }),
                                    'Group Identifier',
                                ],
                                active: active === 'Group Identifier',
                                onclick: () => (active = 'Group Identifier'),
                            })
                        )
                        : null,
                    m(
                        m.route.Link,
                        {
                            href: 'settings',
                            style: 'margin-left: auto',
                        },
                        m(TabItem, {
                            label: [
                                m(Icon, {
                                    name: Icons.SETTINGS,
                                    style: 'margin-right: 10px',
                                }),
                                'Settings',
                            ],
                            active: active === 'Settings',
                            onclick: () => (active = 'Settings'),
                        })
                    )
                ),
                m('section', vnode.children),
                m(Footer, 'GLEIF Demo'),
            ]);
        },
    };
}

let defaultRouteForUserType = () => {
    switch (UserTypes.selectedType) {
        case 'developer':
        case 'gleif':
        case 'legal-entity':
            return '/wallet';
        case 'qvi':
            return '/get-started';
        case 'person':
            return '/wallet';
        case 'lei-data-user':
            return '/verify';
        default:
            return '/manage';
    }
};

m.route(root, defaultRouteForUserType(), {
    '/get-started': {
        render: (vnode) => {
            if (!UserTypes.userTypeIn(['developer', 'qvi'])) {
                m.route.set(defaultRouteForUserType());
                return;
            }
            return m(Layout, m(GetStarted, vnode.attrs));
        },
    },
    '/manage': {
        render: (vnode) => {
            if (UserTypes.userTypeIn(['person', 'lei-data-user'])) {
                m.route.set(defaultRouteForUserType());
                return;
            }
            return m(Layout, m(Manage, vnode.attrs));
        },
    },
    '/wallet': {
        render: (vnode) => {
            return m(Layout, m(Wallet, vnode.attrs));
        },
    },
    '/verify': {
        render: (vnode) => {
            if (UserTypes.userTypeIn(['gleif', 'person', 'lei-data-user'])) {
                m.route.set(defaultRouteForUserType());
                return;
            }
            return m(Layout, m(Verify, vnode.attrs));
        },
    },
    '/group': {
        render: (vnode) => {
            if (!UserTypes.userTypeIn(['developer', 'gleif', 'qvi'])) {
                m.route.set(defaultRouteForUserType());
                return;
            }
            return m(Layout, m(Group, vnode.attrs));
        },
    },
    '/settings': {
        render: (vnode) => {
            return m(Layout, m(Settings, vnode.attrs));
        },
    },
});
