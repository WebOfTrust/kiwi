import m from 'mithril';
import { Colors } from 'construct-ui';
import Container from './Container';

function Footer() {
    return {
        view: function (vnode) {
            return m(
                'div',
                {
                    style: {
                        background: Colors.INDIGO400,
                        color: Colors.WHITE,
                        paddingTop: '16px',
                        paddingBottom: '16px',
                    },
                },
                m(Container, vnode.children)
            );
        },
    };
}

module.exports = Footer;
