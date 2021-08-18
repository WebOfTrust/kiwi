import m from 'mithril';

function Container() {
    return {
        view: function (vnode) {
            return m("div", {"style": {"padding-left": "16px", "padding-right": "16px"}}, vnode.children)
        }
    };
}

module.exports = Container;
