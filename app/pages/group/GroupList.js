import m from 'mithril';
import {
    EmptyState,
    Button,
    Icon,
    Icons,
    Intent,
    Dialog,
    Input,
    Classes,
    Form,
    FormGroup,
    FormLabel,
    ControlGroup,
    List,
    ListItem,
    Size,
} from 'construct-ui';
import { Container } from '../../components';
import Group from './Group';
import { storing, xhring } from '../../helpers';

function GroupList() {
    let isOpen = false;
    let isSubmitting = false;

    let groupName = '';
let isith = 3;
    let nsith = 3;
    let toad = 3;

    let witness = '';
    let witnesses = [
        'BGKVzj4ve0VSd8z_AmvhLg4lqcC_9WYX90k03q-R_Ydo',
        'BuyRFMideczFZoapylLIyCjSdhtqVb31wZkRKvPfNqkw',
        'Bgoq68HCmYNUDgOz4Skvlu306o_NY-NrYuKAVhk3Zh9c',
    ];

    let participant = '';
    let participants = [
        'Eu_se69BU6tYdF2o-YD411OzwbvImOfu1m023Bu8FM_I',
        'EEWuHgyO9iTgfz43mtY1IaRH-TrmV-YpcbpPoKKSpz8U',
        'E5JuUB6iOaKV5-0EeADj0S3KCvvkUZDnuLw8VPK8Qang',
    ];

    return {
        view: function (vnode) {
            if (!vnode.attrs.groups) {
                return null;
            }
            let close = () => {
                isOpen = false;
                isSubmitting = false;
            };

            let submit = (e) => {
                isSubmitting = true;
                e.preventDefault();
                xhring
                    .multisigInceptPost({
                        group: groupName,
                        aids: participants,
                        witnesses: witnesses,
                        toad: toad,
                        isith: isith,
                        nsith: nsith,
                    })
                    .then((res) => {})
                    .catch((err) => {
                        console.log('caught', err);
                    });
            };

            return m(
                Container,
                {
                    style: {
                        padding: '16px',
                        position: 'relative',
                        minHeight: '150px',
                    },
                },
                vnode.attrs.groups.length > 0
                    ? vnode.attrs.groups.map((group) =>
                          m(Group, {
                              group,
                              rotateGroup: vnode.attrs.rotateGroup,
                          })
                      )
                    : m(EmptyState, {
                          header: vnode.attrs.emptyStateHeader,
                          fill: true,
                          icon: Icons.USERS,
                          content: [
                              m(Button, {
                                  iconLeft: Icons.USER_PLUS,
                                  label: 'Join',
                                  type: 'submit',
                                  intent: Intent.PRIMARY,
                                  onclick: () => {
                                      isOpen = !isOpen;
                                  },
                              }),
                              m(Dialog, {
                                  isOpen: isOpen,
                                  onClose: close,
                                  title: 'Join Multisig Group',
                                  content: [
                                      m(Form, { gutter: 16 }, [
                                          m(FormGroup, [
                                              m(FormLabel, { for: 'groupname' }, 'Group Name'),
                                              m(Input, {
                                                  contentLeft: m(Icon, { name: Icons.USERS }),
                                                  name: 'groupname',
                                                  placeholder: 'Group name...',
                                                  oninput: (e) => {
                                                      groupName = e.target.value;
                                                  },
                                              }),
                                          ]),
                                          m(FormGroup, [
                                              m(FormLabel, { for: 'participant' }, 'Participants'),
                                              m(Input, {
                                                  contentLeft: m(Icon, { name: Icons.USER }),
                                                  contentRight: m(Button, {
                                                      iconLeft: Icons.PLUS_CIRCLE,
                                                      label: 'Add',
                                                      onclick: (e) => {
                                                          participants.push(participant);
                                                          participant = '';
                                                      },
                                                  }),
                                                  style: {
                                                      marginBottom: '1rem',
                                                  },
                                                  id: 'participant',
                                                  placeholder: 'Participant identifier...',
                                                  oninput: (e) => {
                                                      participant = e.target.value;
                                                  },
                                                  value: participant,
                                              }),
                                              m(
                                                  List,
                                                  {
                                                      interactive: false,
                                                      size: Size.XS,
                                                  },
                                                  participants.map((aid, index) =>
                                                      m(ListItem, {
                                                          contentRight: m(Icon, {
                                                              name: Icons.X,
                                                              onclick: (e) => {
                                                                  participants.splice(index, 1);
                                                              },
                                                          }),
                                                          label: index + 1 + '.  ' + aid,
                                                      })
                                                  )
                                              ),
                                          ]),
                                          m(FormGroup, [
                                              m(FormLabel, { for: 'witness' }, 'Witnesses'),
                                              m(Input, {
                                                  contentLeft: m(Icon, { name: Icons.CROSSHAIR }),
                                                  contentRight: m(Button, {
                                                      iconLeft: Icons.PLUS_CIRCLE,
                                                      label: 'Add',
                                                      onclick: (e) => {
                                                          witnesses.push(witness);
                                                          witness = '';
                                                      },
                                                  }),
                                                  style: {
                                                      marginBottom: '1rem',
                                                  },
                                                  id: 'witness',
                                                  placeholder: 'Witness identifier...',
                                                  oninput: (e) => {
                                                      witness = e.target.value;
                                                  },
                                                  value: witness,
                                              }),
                                              m(
                                                  List,
                                                  {
                                                      interactive: true,
                                                      size: Size.XS,
                                                  },
                                                  witnesses.map((wit, index) =>
                                                      m(ListItem, {
                                                          contentRight: m(Icon, {
                                                              name: Icons.X,
                                                              onclick: (e) => {
                                                                  witnesses.splice(index, 1);
                                                              },
                                                          }),
                                                          label: index + 1 + '.  ' + wit,
                                                      })
                                                  )
                                              ),
                                          ]),
                                          m(FormGroup, { span: { xs: 12, sm: 12, md: 6, lg: 4 } }, [
                                              m(FormLabel, { for: 'toad' }, 'Withness Threshold'),
                                              m(Input, {
                                                  contentLeft: m(Icon, { name: Icons.USERS }),
                                                  id: 'toad',
                                                  name: 'toad',
                                                  type: 'number',
                                                  value: toad,
                                              }),
                                          ]),
                                          m(FormGroup, { span: { xs: 12, sm: 12, md: 6, lg: 4 } }, [
                                              m(FormLabel, { for: 'isith' }, 'Signature Threshold'),
                                              m(Input, {
                                                  contentLeft: m(Icon, { name: Icons.USERS }),
                                                  id: 'isith',
                                                  name: 'isith',
                                                  type: 'number',
                                                  value: isith,
                                              }),
                                          ]),
                                          m(FormGroup, { span: { xs: 12, sm: 12, md: 6, lg: 4 } }, [
                                              m(FormLabel, { for: 'nsith' }, 'Next Signature Threshold'),
                                              m(Input, {
                                                  contentLeft: m(Icon, { name: Icons.USERS }),
                                                  id: 'nsith',
                                                  name: 'nsith',
                                                  type: 'number',
                                                  value: nsith,
                                              }),
                                          ]),
                                      ]),
                                  ],
                                  footer: m(`.${Classes.ALIGN_RIGHT}`, [
                                      m(Button, {
                                          label: 'Close',
                                          onclick: close,
                                      }),
                                      m(Button, {
                                          loading: isSubmitting,
                                          label: 'Submit',
                                          intent: 'primary',
                                          onclick: submit,
                                      }),
                                  ]),
                              }),
                          ],
                      })
            );
        },
    };
}

module.exports = GroupList;
