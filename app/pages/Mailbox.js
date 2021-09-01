import m from 'mithril';
import { Button, Card, EmptyState, Icons, Input, Popover } from 'construct-ui';
import { Container } from '../components';
import { mailbox, xhring } from '../helpers';

function Mailbox() {
    let cardOptions = {
        elevation: 1,
        fluid: true,
        style: {
            margin: '0 0 1rem 0',
        },
    };

    let content = function () {
        return m(
            Container,
            {
                style: {
                    position: 'relative',
                    maxHeight: '600px',
                    minHeight: '150px',
                    minWidth: '400px',
                    overflowY: 'auto',
                    padding: '0',
                },
            },
            mailbox.messages && mailbox.messages.length > 0
                ? mailbox.messages.map((msg) => {
                      if (msg.r === '/incept') {
                          return m(Card, cardOptions, m('h3', 'MultiSig Group Request'), [
                              m(Input, {
                                  autofocus: true,
                                  fluid: true,
                                  placeholder: 'Local name...',
                                  oninput: (e) => {
                                      mailbox.groupName = e.target.value;
                                  },
                              }),
                              m(Button, {
                                  iconLeft: Icons.USER_PLUS,
                                  label: 'Join',
                                  type: 'submit',
                                  intent: 'primary',
                                  onclick: () => {
                                      mailbox.joinGroup(msg);
                                      let idx = mailbox.messages.indexOf(msg);
                                      mailbox.messages.splice(idx, 1);
                                  },
                              }),
                          ]);
                      } else if (msg.r === '/rotate') {
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
    };

    return {
        oncreate: function () {
            mailbox.initEventSource();
        },
        onremove: function () {
            mailbox.closeEventSource();
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
                    label: 'Mailbox (' + mailbox.messages.length + ' unread)',
                    intent: 'primary',
                }),
            });
        },
    };
}

module.exports = Mailbox;
