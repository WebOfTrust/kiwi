import m from 'mithril';
import {Colors} from "construct-ui";
import Container from './Container'

let Footer = {
    view: function (vnode) {
        return m("div", {
            style: {
                "background": Colors.INDIGO400,
                "color": Colors.WHITE,
                "padding-top": "16px",
                "padding-bottom": "16px"
            }
        }, m(Container, vnode.children))
    }
}

module.exports = Footer;