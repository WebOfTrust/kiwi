import m from 'mithril';
import { Button, Colors, Icon, Icons, Input, Intent, Select, TabItem, Tabs } from 'construct-ui';

import { Header, Footer } from './components';
import { Issue, Revoke, Verify, Group, Mailbox, Settings } from './pages';
import { mailbox, toaster, UserTypes, xhring } from './helpers';

import 'construct-ui/lib/index.css';

let root = document.body;

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
                    m('div', { style: { marginBottom: '1rem' } }, [m(UserTypeInput)]),
                    m('div', [
                        m(Mailbox, {
                            port: xhring.port,
                        }),
                        m(PortInput),
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
                          )
                        : null,
                    UserTypes.userTypeIn(['developer', 'gleif', 'qvi', 'legal-entity', 'person'])
                        ? m(
                              m.route.Link,
                              { href: 'revoke' },
                              m(TabItem, {
                                  label: [
                                      m(Icon, {
                                          name: Icons.MINUS_CIRCLE,
                                          style: 'margin-right: 10px',
                                      }),
                                      UserTypes.userTypeIn(['developer', 'gleif', 'qvi', 'legal-entity'])
                                          ? 'Revoke'
                                          : 'Wallet',
                                  ],
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
                              })
                          )
                        : null,
                    UserTypes.userTypeIn(['developer'])
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
                              })
                          )
                        : null,
                    UserTypes.userTypeIn(['developer'])
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
            return '/issue';
        case 'person':
            return '/revoke';
        case 'lei-data-user':
            return '/verify';
    }
};

m.route(root, defaultRouteForUserType(), {
    '/issue': {
        render: (vnode) => {
            if (UserTypes.userTypeIn(['person', 'lei-data-user'])) {
                m.route.set(defaultRouteForUserType());
                return;
            }
            return m(Layout, m(Issue, vnode.attrs));
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
            if (!UserTypes.userTypeIn(['developer'])) {
                m.route.set(defaultRouteForUserType());
                return;
            }
            return m(Layout, m(Group, vnode.attrs));
        },
    },
    '/settings': {
        render: (vnode) => {
            if (!UserTypes.userTypeIn(['developer'])) {
                m.route.set(defaultRouteForUserType());
                return;
            }
            return m(Layout, m(Settings, vnode.attrs));
        },
    },
});
