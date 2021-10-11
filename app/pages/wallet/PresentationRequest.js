import m from 'mithril';
import { Card } from 'construct-ui';
import Credential from '../revoke/Credential';

function PresentationRequest() {
    let cardOptions = {
        elevation: 1,
        fluid: true,
        style: {
            margin: '0 0 1rem 0',
        },
    };

    return {
        view: function (vnode) {
            console.log(vnode.attrs.msg);
            console.log(vnode.attrs);
            return m(Card, cardOptions, m('h3', 'Proof Received'), [
                m(Credential, {
                    cred: vnode.attrs.msg,
                    isWallet: true,
                }),
            ]);
        },
    };
}

module.exports = PresentationRequest;
