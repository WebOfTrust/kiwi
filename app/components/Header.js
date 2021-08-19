import m from 'mithril';
import { Colors } from 'construct-ui';
import Container from './Container';

function Header() {
    return {
        view: function (vnode) {
            return m(
                'div',
                {
                    style: {
                        'background': Colors.INDIGO400,
                        'color': Colors.WHITE,
                        'padding-top': '16px',
                        'padding-bottom': '16px',
                    },
                },
                m(Container, vnode.children)
            );
        },
    };
}

module.exports = Header;
