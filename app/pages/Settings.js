import m from 'mithril';
import { Col, Grid, Intent } from 'construct-ui';
import { Container, Tile } from '../components';
import { IdentifierList } from './settings';
import { xhring } from '../helpers';

class Settings {
    constructor() {
        this.gridAttrs = { gutter: { xs: 0, sm: 8, md: 16, lg: 32, xl: 32 } };
        this.colAttrs = { span: 8, style: { margin: '16px 0' } };
        this.identifiers = [];
    }

    loadIdentifiers() {
        xhring
            .identifiers()
            .then((res) => {
                this.identifiers = res;
            })
            .catch((err) => {
                console.log('caught', err);
            });
        m.redraw();
    }

    oninit() {
        this.loadIdentifiers();
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
                            title: 'Identifier',
                            intent: Intent.PRIMARY,
                        },
                        m(IdentifierList, {
                            identifiers: this.identifiers,
                            emptyStateHeader: 'No Identifiers',
                        })
                    )
                ),
            ])
        );
    }
}

module.exports = Settings;
