import m from 'mithril';
import { Card, Colors, EmptyState, Icons, List, ListItem } from 'construct-ui';
import { Container } from '../../components';

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

function Mailbox() {
    let messages = [];
    let source;
    let cardOptions = {
        elevation: 1,
        fluid: true,
        style: {
            margin: '0 0 1rem 0',
        },
    };

    function displayData(e) {
        size = sniff(e.data);

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
            source.addEventListener('data', this.displayData, false);
        },
        oninit: function () {
            messages = [];
            source = new EventSource(
                process.env.CONTROLLER_URL + '/req/mbx?s=0&i=E4Zq5dxbnWKq5K-Bssn4g_qhBbSwNSI2MH4QYnkEUFDM'
            );
        },
        view: function () {
            return m(
                Container,
                {
                    style: {
                        position: 'relative',
                        minHeight: '150px',
                        padding: '1rem',
                    },
                },
                messages && messages.length > 0
                    ? messages.map((msg) => {
                          if (msg.vc.d.type[1] === 'LegalEntityEngagementContextRolevLEICredential') {
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
        },
    };
}

module.exports = Mailbox;
