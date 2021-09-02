import m from 'mithril';
import { Col, Grid, Intent } from 'construct-ui';
import { Container, Tile } from '../components';
import { GroupList } from './group';
import {storing, xhring} from "../helpers";

function Group() {
    const gridAttrs = { gutter: { xs: 0, sm: 8, md: 16, lg: 32, xl: 32 } };
    const colAttrs = { span: 10, style: { margin: '16px 0' } };

    let groups = [];

    function loadGroups() {
        xhring
            .multisig()
            .then((res) => {
                console.log(res)
                groups = res
            })
            .catch((err) => {
                console.log('caught', err);
            });
        m.redraw();
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
                                title: 'Group Identifier',
                                intent: Intent.PRIMARY,
                            },
                            m(GroupList, {
                                groups: groups,
                                emptyStateHeader: 'No Group Identifiers',
                            })
                        )
                    ),
                ])
            );
        },
    };
}

module.exports = Group;
