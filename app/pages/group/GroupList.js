import m from 'mithril';
import {
    EmptyState, Button, Icon, Icons, Intent, Dialog, Input, Classes, Form, FormGroup, FormLabel,
    ControlGroup, ListItem
} from 'construct-ui';
import {Container} from '../../components';
import Group from './Group';
import {storing, xhring} from "../../helpers";


let autofocus = true;
let basic = false;
let closeOnEscapeKey = true;
let closeOnOutsideClick = true;
let hasBackdrop = true;
let inline = false;
let isOpen = false;
let transition = true;
let isSubmitting = false;

let groupName = "";
let sith = 3;
let nsith = 3;
let toad = 3;

let witness = '';
let witnesses = [];

let participant = '';
let participants = [];

const span = {
    xs: 12,
    sm: 12,
    md: 8
};


function GroupList() {
    return {
        view: function (vnode) {
            let close = () => {
                isOpen = false;
                isSubmitting = false;
            }

            let submit = (e) => {
                isSubmitting = true;
                e.preventDefault();
                xhring
                    .multisigInceptPost({
                        group: groupName,
                        aids: participants,
                        witnesses: witnesses,
                        toad: toad,
                        sith: sith,
                        nsith: nsith,

                    })
                    .then((res) => {
                        alert("Multisig Group Initiated")
                    })
                    .catch((err) => {
                        console.log('caught', err);
                    });
            }

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
                            content: [m(Button, {
                                iconLeft: Icons.USER_PLUS,
                                label: 'Join',
                                type: 'submit',
                                intent: Intent.PRIMARY,
                                onclick: () => {
                                    console.log(isOpen);
                                    isOpen = !isOpen
                                }
                            }),

                                m(Dialog, {
                                    autofocus: autofocus,
                                    basic: basic,
                                    closeOnEscapeKey: closeOnEscapeKey,
                                    closeOnOutsideClick: closeOnOutsideClick,
                                    content: [
                                        m(Form, {gutter: 15}, [
                                            m(FormGroup, {span}, [
                                                m(FormLabel, {for: 'groupname'}, 'Group Name'),
                                                m(Input, {
                                                    contentLeft: m(Icon, {name: Icons.USERS}),
                                                    name: 'groupname',
                                                    placeholder: 'Group name...',
                                                    oninput: (e) => {
                                                        groupName = e.target.value;
                                                    },

                                                }),
                                            ]),

                                            m(FormGroup, {span}, [
                                                m(FormLabel, {for: 'participant'}, 'Participants'),

                                                m(Input, {
                                                    contentLeft: m(Icon, {name: Icons.USER}),
                                                    placeholder: 'Participant identifier...',
                                                    oninput: (e) => {
                                                        participant = e.target.value;
                                                    },
                                                    value:participant

                                                }),
                                                m(Button, {
                                                    iconLeft: Icons.PLUS_CIRCLE,
                                                    label: 'Add',
                                                    onclick: (e) => {
                                                        participants.push(participant);
                                                        participant = '';
                                                    }
                                                }),
                                                m('List', {
                                                    interactive: true,
                                                    size: 5
                                                }, participants.map((aid, index) => m(ListItem, {label: (index+1) + ".  " + aid}))),

                                            ]),


                                            m(FormGroup, {span}, [
                                                m(FormLabel, {for: 'witness'}, 'Witnesses'),

                                                m(Input, {
                                                    contentLeft: m(Icon, {name: Icons.CROSSHAIR}),
                                                    id: "witness",
                                                    placeholder: 'Witness identifier...',
                                                    oninput: (e) => {
                                                        witness = e.target.value;
                                                    },
                                                    value:witness

                                                }),
                                                m(Button, {
                                                    iconLeft: Icons.PLUS_CIRCLE,
                                                    label: 'Add',
                                                    onclick: (e) => {
                                                        witnesses.push(witness);
                                                        witness = '';
                                                    }
                                                }),
                                                m('List', {
                                                    interactive: true,
                                                    size: 5
                                                }, witnesses.map((wit, index) => m(ListItem, {label: (index+1) + ".  " + wit}))),

                                            ]),

                                            m(FormGroup, {span}, [
                                                m(FormLabel, {for: 'toad'}, 'Withness Threshold'),
                                                m(Input, {
                                                    contentLeft: m(Icon, {name: Icons.USERS}),
                                                    id: 'toad',
                                                    name: 'toad',
                                                    placeholder: 'Number...'
                                                }),
                                            ]),

                                            m(FormGroup, {span}, [
                                                m(FormLabel, {for: 'sith'}, 'Signature Threshold'),
                                                m(Input, {
                                                    contentLeft: m(Icon, {name: Icons.USERS}),
                                                    id: 'sith',
                                                    name: 'sith',
                                                    placeholder: 'Number...'
                                                }),
                                            ]),

                                            m(FormGroup, {span}, [
                                                m(FormLabel, {for: 'sith'}, 'Next Signature Threshold'),
                                                m(Input, {
                                                    contentLeft: m(Icon, {name: Icons.USERS}),
                                                    id: 'nsith',
                                                    name: 'nsith',
                                                    placeholder: 'Number...'
                                                }),
                                            ]),


                                        ])
                                    ],
                                    hasBackdrop: hasBackdrop,
                                    isOpen: isOpen,
                                    inline: inline,
                                    onClose: close,
                                    title: 'Join Multisig Group',
                                    transitionDuration: transition ? 200 : 0,
                                    footer: m(`.${Classes.ALIGN_RIGHT}`, [
                                        m(Button, {
                                            label: 'Close',
                                            onclick: close
                                        }),
                                        m(Button, {
                                            loading: isSubmitting,
                                            label: 'Submit',
                                            intent: 'primary',
                                            onclick: submit
                                        })
                                    ])
                                })

                            ],

                        },
                    )
            );
        },
    };
}

module.exports = GroupList;
