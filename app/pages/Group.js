import m from 'mithril';
import {Col, Grid, Intent} from 'construct-ui';
import {Container, Tile} from '../components';
import {GroupList} from "./group";

function Group() {
    const gridAttrs = {gutter: {xs: 0, sm: 8, md: 16, lg: 32, xl: 32}};
    const colAttrs = {span: 10, style: {margin: '16px 0'}};

    let groups = [];


    function loadGroups() {
        groups = []
        // groups = [{
        //     name: "Multisig Group 1",
        //     prefix: "Ep4WexrfQvQjblYg9ti12cr7NpKWaXLNP5CXmq_4Zhng",
        //     seq_no: 1,
        //     aids: [
        //         "Eu_se69BU6tYdF2o-YD411OzwbvImOfu1m023Bu8FM_I",
        //         "EEWuHgyO9iTgfz43mtY1IaRH-TrmV-YpcbpPoKKSpz8U",
        //         "E5JuUB6iOaKV5-0EeADj0S3KCvvkUZDnuLw8VPK8Qang"
        //     ],
        //     witnesses: [
        //         "BGKVzj4ve0VSd8z_AmvhLg4lqcC_9WYX90k03q-R_Ydo",
        //         "BuyRFMideczFZoapylLIyCjSdhtqVb31wZkRKvPfNqkw",
        //         "Bgoq68HCmYNUDgOz4Skvlu306o_NY-NrYuKAVhk3Zh9c"
        //     ],
        //     public_keys: [
        //         "DzdcRVb7NBbJmuYAUwZNBbPxdQaa0YZLc1RGD7pEiTcs",
        //         "D3wfVD4-D2drglhNiqU_-ijc5mxNFGt3RVVtxkordE-4",
        //         "DWJDGe64yZ6Vpu9flOvZab8RFg7Cd1XV563KmLr-BT2w",
        //     ],
        //     toad: 3,
        //     isith: 3,
        //     receipts: 3,
        // }];

        m.redraw();
    }


    function rotateGroup(group) {
    }

    return {
        oninit: function () {
            loadGroups();
        },
        view: function () {
            return m(
                Container,
                m(Grid, gridAttrs, [
                    m(
                        Col,
                        colAttrs,
                        m(
                            Tile,
                            {
                                title: 'Group Multisig Identifier',
                                intent: Intent.PRIMARY,
                            },
                            m(GroupList, {
                                groups: groups,
                                rotateGroup: rotateGroup,
                                emptyStateHeader: 'No Group Multisig Identifiers',
                            })
                        )
                    )
                ])
            );
        },
    };
}

module.exports = Group;
