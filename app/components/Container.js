import m from 'mithril';

function Container() {
    return {
        view: function (vnode) {
            return m(
                'div',
                {
                    style: {
                        paddingLeft: '16px',
                        paddingRight: '16px',
                        ...vnode.attrs.style,
                    },
                },
                vnode.children
            );
        },
    };
}

module.exports = Container;
