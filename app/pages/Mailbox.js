import m from 'mithril';
import { Button, Card, EmptyState, Icons, Input, Popover } from 'construct-ui';
import { Container } from '../components';
import { AddressBook, CredentialNames, mailbox } from '../helpers';

const DelegationTypes = {
    drt: 'Delegated Rotation',
};

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
                          return m(Card, cardOptions, m('h3', 'Group Membership Request'), [
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
                          return m(Card, cardOptions, m('h3', 'Group Key Rotation Request'), [
                              m(Button, {
                                  iconLeft: Icons.USER_PLUS,
                                  label: 'Accept Rotation',
                                  type: 'submit',
                                  intent: 'primary',
                                  onclick: () => {
                                      mailbox.rotateGroup(msg['name']);
                                      let idx = mailbox.messages.indexOf(msg);
                                      mailbox.messages.splice(idx, 1);
                                  },
                              }),
                          ]);
                      } else if (msg.r === '/delegate') {
                          return m(Card, cardOptions, m('h3', 'Delegator Approval'), [
                              m('div', [
                                  m('span', m('b', 'Delegator: ')),
                                  m('span', AddressBook.get(msg.d.delegator)),
                              ]),
                              m('br'),
                              m('div', [m('span', m('b', 'Operation: ')), m('span', DelegationTypes[msg.d.t])]),
                              m('div', [m('span', m('b', 'Seq No: ')), m('span', msg.d.s)]),
                              m('div', [m('span', m('b', 'At: ')), m('span', msg.d.dt)]),

                              m('br'),
                              m(Button, {
                                  iconLeft: Icons.CHECK_CIRCLE,
                                  label: 'Ok',
                                  type: 'submit',
                                  intent: 'primary',
                                  onclick: () => {
                                      let idx = mailbox.messages.indexOf(msg);
                                      mailbox.messages.splice(idx, 1);
                                  },
                              }),
                          ]);
                      } else if (msg.r === '/issue') {
                          return m(Card, cardOptions, m('h3', 'Group Credential Issuance Proposal'), [
                              m('div', [m('span', m('b', 'To: ')), m('span', AddressBook.get(msg.data.si))]),
                              m('div', [m('span', m('b', 'Credential: ')), m('span', CredentialNames[msg.schema])]),
                              m('br'),
                              m('div', [m('span', m('b', 'LEI: ')), m('span', msg.data.LEI)]),
                              m('br'),
                              m(Button, {
                                  iconLeft: Icons.CHECK_CIRCLE,
                                  label: 'Sign Credential',
                                  type: 'submit',
                                  intent: 'primary',
                                  onclick: () => {
                                      mailbox.joinIssue(msg.schema, msg.data, msg.typ, msg.recipient, msg.source);

                                      let idx = mailbox.messages.indexOf(msg);
                                      mailbox.messages.splice(idx, 1);
                                  },
                              }),
                          ]);
                      } else {
                          console.log('Unhandled mail', msg);
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
