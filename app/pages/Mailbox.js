import m from 'mithril';
import {Button, Card, EmptyState, Icons, Input, Popover} from 'construct-ui';
import {Container} from '../components';
import {xhring} from "../helpers";

// import mockMessages from '../../tests/pages/verify/mock/mock-messages';

let MINSNIFFSIZE = 30;

let sniff = (raw) => {
    let size = '';
    if (raw.length < MINSNIFFSIZE) {
        throw new Error('"Need more bytes."');
    }

    const versionPattern = Buffer.from(
        'KERI(?<major>[0-9a-f])(?<minor>[0-9a-f])(?<kind>[A-Z]{4})(?<size>[0-9a-f]{6})_',
        'binary'
    );
    const regex = RegExp(versionPattern);
    const response = regex.exec(raw);

    if (!response || response.kind > 12) throw new Error(`Invalid version string in raw = ${raw}`);
    size = response.groups.size;

    return parseInt(size, 16);
};


let groupName = '';
let messages = [];

function Mailbox() {
    // let messages = mockMessages;
    let source = new EventSource(
        process.env.CONTROLLER_URL + '/req/mbx?s=0&i=E4Zq5dxbnWKq5K-Bssn4g_qhBbSwNSI2MH4QYnkEUFDM&topics=/credential%3D0&topics=/multisig%3D0&topics=/delegate%3D0'
    );
    let cardOptions = {
        elevation: 1,
        fluid: true,
        style: {
            margin: '0 0 1rem 0',
        },
    };

    let joinGroup = (msg) => {
        xhring
            .multisigInceptPost({
                group: groupName,
                aids: msg.aids,
                witnesses: msg.witnesses,
                toad: msg.toad,
                sith: msg.sith,
                nsith: msg.nsith,
            })
            .then((res) => {
                alert("Multisig Group Join Initiated")
            })
            .catch((err) => {
                console.log('caught', err);
            });
    }


    let content = function () {
        return m(
            Container,
            {
                style: {
                    position: 'relative',
                    minHeight: '150px',
                    minWidth: '400px',
                    padding: '1rem',
                    margin: '10px'
                },
            },
            messages && messages.length > 0
                ? messages.map((msg) => {
                    if (msg.r === "/incept") {
                        return m(Card, cardOptions, m('h3', 'MultiSig Group Request'), [
                            m(Input, {
                                autofocus: true,
                                fluid: true,
                                placeholder:"Local name..." ,
                                oninput: (e) => {
                                    groupName = e.target.value;
                                },

                            }),
                            m(Button, {
                                iconLeft: Icons.USER_PLUS,
                                label: 'Join',
                                type: 'submit',
                                intent: 'primary',
                                onclick: () => {
                                    joinGroup(msg);
                                    let idx = messages.indexOf(msg)
                                    messages.splice(idx, 1);
                                }
                            })

                        ]);
                    } else if (msg.r === "/rotate") {
                        return m(Card, cardOptions, m('h3', 'MultiSig Group Rotate Request'), []);

                    } else if (msg.vc.d.type[1] === 'LegalEntityEngagementContextRolevLEICredential') {
                        return m(Card, cardOptions, m('h3', 'Proof Recieved'), [
                            m('div', [m('span', m('b', 'From: ')), m('span', msg.vc.ti)]),
                            m('div', [m('span', m('b', 'To: ')), m('span', msg.vc.d.si)]),
                            m('div', [m('span', m('b', 'Credential: ')), m('span', msg.vc.i)]),
                            m('div', m('b', 'Status: '), m('span', msg.status ? 'Issued' : 'Revoked')),
                            m('br'),
                            m('div', [m('span', m('b', 'LEI: ')), m('span', msg.vc.d.LEI)]),
                            m('div', [m('span', m('b', 'Legal Name: ')), m('span', msg.vc.d.personLegalName)]),
                            m('div', [
                                m('span', m('b', 'Context Role: ')),
                                m('span', msg.vc.d.engagementContextRole),
                            ]),
                            m('div', [m('span', m('b', 'Type: ')), m('span', msg.vc.d.type[1])]),
                        ]);
                    } else if (msg.vc.d.type[1] === 'LegalEntityOfficialOrganizationalRolevLEICredential') {
                        return m(Card, cardOptions, m('span', m('h3', 'Proof Received')), [
                            m('div', [m('span', m('b', 'From: ')), m('span', msg.vc.ti)]),
                            m('div', [m('span', m('b', 'To: ')), m('span', msg.vc.d.si)]),
                            m('div', [m('span', m('b', 'Credential: ')), m('span', msg.vc.i)]),
                            m('div', m('b', 'Status: '), m('span', msg.status ? 'Issued' : 'Revoked')),
                            m('br'),
                            m('div', [m('span', m('b', 'LEI: ')), m('span', msg.vc.d.LEI)]),
                            m('div', [m('span', m('b', 'Legal Name: ')), m('span', msg.vc.d.personLegalName)]),
                            m('div', [m('span', m('b', 'Official Role: ')), m('span', msg.vc.d.officialRole)]),
                            m('div', [m('span', m('b', 'Type: ')), m('span', msg.vc.d.type[1])]),
                        ]);
                    } else {
                        return m(Card, cardOptions, m('h3', 'Proof Received'), [
                            m('div', m('b', 'From: '), m('span', msg.vc.ti)),
                            m('div', m('b', 'To: '), m('span', msg.vc.d.si)),
                            m('div', m('b', 'Credential: '), m('span', msg.vc.i)),
                            m('div', m('b', 'Status: '), m('span', msg.status ? 'Issued' : 'Revoked')),
                            m('br'),
                            m('div', m('b', 'LEI: '), m('span', msg.vc.d.LEI)),
                            m('div', m('b', 'Type: '), m('span', msg.vc.d.type[1])),
                        ]);
                    }
                })
                : m(EmptyState, {
                    icon: Icons.MESSAGE_CIRCLE,
                    header: 'No messages',
                    fill: true,
                })
        );
    }


    function displayMultisig(e) {
        let data = JSON.parse(e.data);
        messages.unshift(data)
        m.redraw()
    }

    function displayData(e) {
        let size = sniff(e.data);

        let evt = e.data.slice(0, size);
        let ked = JSON.parse(evt);
        messages.unshift(ked['d']);
        messages = messages.filter(
            (msg, index, self) => index === self.findIndex((m) => m.vc.i === msg.vc.i && m.status === msg.status)
        );
        m.redraw();
    }

    return {
        oncreate: function () {
            source.addEventListener('/credential', displayData, false);
            source.addEventListener('/multisig', displayMultisig, false);
        },
        onremove: function () {
            // source.removeEventListener('data', displayData, false);
            // source.removeEventListener('/multisig', displayMultisig, false);
        },
        view: function () {
            return m(Popover, {
                closeOnEscapeKey: true,
                closeOnContentClick: false,
                content: content(),
                hasArrow: true,
                hasBackdrop: false,
                inline: false,
                interactionType: 'click',
                openOnTriggerFocus: true,
                position: 'bottom-end',
                trigger: m(Button, {
                    label: 'Mailbox (' + messages.length + ' unread)',
                    intent: 'primary'
                })
            })
        },
    };
}


module.exports = Mailbox;
