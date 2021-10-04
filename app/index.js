import m from 'mithril';
import { Button, Colors, Icon, Icons, Input, Intent, Select, TabItem, Tabs } from 'construct-ui';

import { Footer, Header } from './components';
import { Group, Mailbox, Manage, Revoke, Settings, Verify, Wallet } from './pages';
import { mailbox, toaster, UserTypes, xhring } from './helpers';

import 'construct-ui/lib/index.css';

let root = document.body;

console.log('CONTROLLER_URL   =', process.env.CONTROLLER_URL);
console.log('CONTROLLER_PORT  =', process.env.CONTROLLER_PORT);
console.log('USER_TYPE        =', process.env.USER_TYPE);
console.log('PRIMARY_COLOR    =', process.env.PRIMARY_COLOR);

function UserTypeInput() {
    return {
        view: (vnode) => {
            return m(Select, {
                options: UserTypes.USER_TYPES.map((type) => {
                    return {
                        label: `${UserTypes.toDisplay(type)}`,
                        value: type,
                    };
                }),
                defaultValue: UserTypes.selectedType,
                onchange: (e) => {
                    let newType = e.currentTarget.value;
                    UserTypes.setUserType(newType);
                    m.route.set(defaultRouteForUserType());
                },
            });
        },
    };
}

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
    let active = 'Manage';

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
                    // m('div', { style: { marginBottom: '1rem' } }, [m(UserTypeInput)]),
                    m('div', [
                        m(Mailbox, {
                            port: xhring.port,
                        }),
                        // m(PortInput),
                    ]),
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
                    UserTypes.userTypeIn(['developer', 'gleif', 'qvi', 'legal-entity'])
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
                              { href: 'verify' },
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
                              { href: 'group' },
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
                    UserTypes.userTypeIn(['developer', 'gleif', 'qvi'])
                        ? m(
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
                        : null
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
        case 'qvi':
        case 'legal-entity':
            return '/manage';
        case 'person':
            return '/revoke';
        case 'lei-data-user':
            return '/verify';
    }
};

m.route(root, defaultRouteForUserType(), {
    '/manage': {
        render: (vnode) => {
            if (UserTypes.userTypeIn(['person', 'lei-data-user'])) {
                m.route.set(defaultRouteForUserType());
                return;
            }
            return m(Layout, m(Manage, vnode.attrs));
        },
    },
    '/revoke': {
        render: (vnode) => {
            if (UserTypes.userTypeIn(['lei-data-user'])) {
                m.route.set(defaultRouteForUserType());
                return;
            }
            return m(Layout, m(Revoke, vnode.attrs));
        },
    },
    '/wallet': {
        render: (vnode) => {
            return m(Layout, m(Wallet, vnode.attrs));
        },
    },
    '/verify': {
        render: (vnode) => {
            if (UserTypes.userTypeIn(['gleif', 'person'])) {
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
            if (!UserTypes.userTypeIn(['developer', 'gleif', 'qvi'])) {
                m.route.set(defaultRouteForUserType());
                return;
            }
            return m(Layout, m(Settings, vnode.attrs));
        },
    },
});
