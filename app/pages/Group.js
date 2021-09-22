import m from 'mithril';
import { Col, Grid, Intent } from 'construct-ui';
import { Container, Tile } from '../components';
import { GroupList } from './group';
import { storing, xhring } from '../helpers';

class Group {
    constructor() {
        this.gridAttrs = { gutter: { xs: 0, sm: 8, md: 16, lg: 32, xl: 32 } };
        this.colAttrs = { span: 8, style: { margin: '16px 0' } };
        this.groups = [];
    }

    loadGroups() {
        xhring
            .multisig()
            .then((res) => {
                this.groups = res;
            })
            .catch((err) => {
                console.log('caught', err);
            });
        m.redraw();
    }

    oninit() {
        this.loadGroups();
    }

    view() {
        return m(
            Container,
            m(Grid, this.gridAttrs, [
                m(
                    Col,
                    this.colAttrs,
                    m(
                        Tile,
                        {
                            title: 'Group Identifier',
                            intent: Intent.PRIMARY,
                        },
                        m(GroupList, {
                            groups: this.groups,
                            emptyStateHeader: 'No Group Identifiers',
                        })
                    )
                ),
            ])
        );
    }
}

module.exports = Group;
