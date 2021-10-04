import m from 'mithril';
import { Card } from 'construct-ui';

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
            if (vnode.attrs.msg.vc.d.type[1] === 'LegalEntityEngagementContextRolevLEICredential') {
                return m(Card, cardOptions, m('h3', 'Proof Received'), [
                    m('div', [m('span', m('b', 'From: ')), m('span', vnode.attrs.msg.vc.ti)]),
                    m('div', [m('span', m('b', 'To: ')), m('span', vnode.attrs.msg.vc.d.si)]),
                    m('div', [m('span', m('b', 'Credential: ')), m('span', vnode.attrs.msg.vc.i)]),
                    m('div', m('b', 'Status: '), m('span', vnode.attrs.msg.status ? 'Issued' : 'Revoked')),
                    m('br'),
                    m('div', [m('span', m('b', 'LEI: ')), m('span', vnode.attrs.msg.vc.d.LEI)]),
                    m('div', [m('span', m('b', 'Legal Name: ')), m('span', vnode.attrs.msg.vc.d.personLegalName)]),
                    m('div', [
                        m('span', m('b', 'Context Role: ')),
                        m('span', vnode.attrs.msg.vc.d.engagementContextRole),
                    ]),
                    m('div', [m('span', m('b', 'Type: ')), m('span', vnode.attrs.msg.vc.d.type[1])]),
                ]);
            } else if (vnode.attrs.msg.vc.d.type[1] === 'LegalEntityOfficialOrganizationalRolevLEICredential') {
                return m(Card, cardOptions, m('span', m('h3', 'Proof Received')), [
                    m('div', [m('span', m('b', 'From: ')), m('span', vnode.attrs.msg.vc.ti)]),
                    m('div', [m('span', m('b', 'To: ')), m('span', vnode.attrs.msg.vc.d.si)]),
                    m('div', [m('span', m('b', 'Credential: ')), m('span', vnode.attrs.msg.vc.i)]),
                    m('div', m('b', 'Status: '), m('span', vnode.attrs.msg.status ? 'Issued' : 'Revoked')),
                    m('br'),
                    m('div', [m('span', m('b', 'LEI: ')), m('span', vnode.attrs.msg.vc.d.LEI)]),
                    m('div', [m('span', m('b', 'Legal Name: ')), m('span', vnode.attrs.msg.vc.d.personLegalName)]),
                    m('div', [m('span', m('b', 'Official Role: ')), m('span', vnode.attrs.msg.vc.d.officialRole)]),
                    m('div', [m('span', m('b', 'Type: ')), m('span', vnode.attrs.msg.vc.d.type[1])]),
                ]);
            } else {
                return m(Card, cardOptions, m('h3', 'Proof Received'), [
                    m('div', m('b', 'From: '), m('span', vnode.attrs.msg.vc.ti)),
                    m('div', m('b', 'To: '), m('span', vnode.attrs.msg.vc.d.si)),
                    m('div', m('b', 'Credential: '), m('span', vnode.attrs.msg.vc.i)),
                    m('div', m('b', 'Status: '), m('span', vnode.attrs.msg.status ? 'Issued' : 'Revoked')),
                    m('br'),
                    m('div', m('b', 'LEI: '), m('span', vnode.attrs.msg.vc.d.LEI)),
                    m('div', m('b', 'Type: '), m('span', vnode.attrs.msg.vc.d.type[1])),
                ]);
            }
        },
    };
}

module.exports = PresentationRequest;
