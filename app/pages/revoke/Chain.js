import m from 'mithril';
import {Button, Card, Classes, Form, FormGroup, Icon, Icons, Intent, List, ListItem, Tag} from 'construct-ui';
import {AddressBook, CredentialNames, UserTypes} from '../../helpers';

function Chain() {

    return {
        view: function (vnode) {
            return m(ListItem, {
                contentLeft: [
                    m(
                        'div',
                        {style: 'vertical-align: text-top;'},
                        CredentialNames[vnode.attrs.cred.sad.s]
                    ),
                    m(
                        'div',
                        'Issued By: ' + AddressBook.get(vnode.attrs.cred.sad.i)
                    ),
                    m('div', 'Credential SAID: ' + vnode.attrs.cred.sad.d),
                    vnode.attrs.cred.chains.map((p, index) => [
                            m(Icon, {
                                name: Icons.LINK,
                                class: "chain-link",
                                style:{paddingTop: "10px", svg: {transform: "rotate(135deg)"}}
                            }),
                            m(Chain, {
                                cred: p,
                            })]
                    )
                ],
            })
        },
    };
}

module.exports = Chain;
