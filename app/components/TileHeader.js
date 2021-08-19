import m from 'mithril';
import {Colors, Intent} from "construct-ui";

function TileHeader() {
    return {
        view: function (vnode) {
            return m('.tileHeader', {
                style: {
                    background: vnode.attrs.intent === Intent.PRIMARY ? Colors.INDIGO400 : Colors.GREY200,
                    color: vnode.attrs.intent === Intent.PRIMARY ? Colors.WHITE : Colors.INDIGO400,
                    padding: "16px",
                }
            }, vnode.attrs.title)
        }
    };
}

module.exports = TileHeader;
