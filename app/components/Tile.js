import m from 'mithril';
import TileHeader from './TileHeader'
import {Colors} from "construct-ui";

function Tile() {
    return {
        view: function (vnode) {
            return m('', {
                    style: {
                        background: Colors.WHITE,
                        boxShadow: "0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)",
                    }
                },
                m(TileHeader, {...vnode.attrs}),
                vnode.children
            )
        }
    };
}

module.exports = Tile;
