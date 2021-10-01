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
                        background: process.env.PRIMARY_COLOR,
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

module.exports = Header;
