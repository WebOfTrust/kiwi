import "construct-ui/lib/index.css";
import m from 'mithril';
import * as Header from './components/Header'
import * as Footer from './components/Footer'
import {Colors, Icon, Icons, TabItem, Tabs} from "construct-ui";

import Issue from './pages/Issue';
import Revoke from './pages/Revoke';
import Verify from './pages/Verify';

let root = document.body;

function Layout() {

    return {
        view: vnode => {
            return m("main", [
                m(Header, [
                    m("h1", {style: {color: Colors.WHITE}}, "GACC"),
                    m("p", "GLEIF Admin Console for vLEI Credentials"),
                ]),
                m("div", {style: {background: Colors.GREY50}},
                    m(Tabs, {fluid: true, align: 'left', bordered: true, size: 'lg', ...vnode.attrs,},
                        m(m.route.Link, {"href": "issue"}, m(TabItem, {
                            label: [m(Icon, {
                                name: Icons.ARROW_RIGHT_CIRCLE,
                                style: 'margin-right: 10px'
                            }), "Issue"]
                        })),
                        m(m.route.Link, {"href": "revoke"}, m(TabItem, {
                            label: [m(Icon, {
                                name: Icons.MINUS_CIRCLE,
                                style: 'margin-right: 10px'
                            }), "Revoke"]
                        })),
                        m(m.route.Link, {"href": "verify"}, m(TabItem, {
                            label: [m(Icon, {
                                name: Icons.CHECK_CIRCLE,
                                style: 'margin-right: 10px'
                            }), "Verify"]
                        }))
                    )
                ),
                m("section", vnode.children),
                m(Footer, "GLEIF Demo")
            ])
        }
    }
}

m.route(root, "/issue", {
    "/issue": {
        render: vnode => {
            return m(Layout, m(Issue, vnode.attrs))
        }
    },
    "/revoke": {
        render: vnode => {
            return m(Layout, m(Revoke, vnode.attrs))
        }
    },
    "/verify": {
        render: vnode => {
            return m(Layout, m(Verify, vnode.attrs))
        }
    },
})
