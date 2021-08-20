import m from 'mithril';

function Container() {
    return {
        view: function (vnode) {
            let style = {
                'padding-left': '16px',
                'padding-right': '16px',
                ...vnode.attrs.style,
            };
            return m('div', { style }, vnode.children);
        },
    };
}

module.exports = Container;
