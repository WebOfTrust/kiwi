import m from 'mithril';
import { Col, Grid, Intent } from 'construct-ui';
import { Container, Tile } from '../components';
import { IdentifierList } from './settings';
import { xhring } from '../helpers';

function Settings() {
    const gridAttrs = { gutter: { xs: 0, sm: 8, md: 16, lg: 32, xl: 32 } };
    const colAttrs = { span: 8, style: { margin: '16px 0' } };
    let identifiers = [];

    function loadIdentifiers() {
        xhring
            .identifiers()
            .then((res) => {
                identifiers = res;
            })
            .catch((err) => {
                console.log('caught', err);
            });
        m.redraw();
    }

    return {
        oninit: function () {
            loadIdentifiers();
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
                                title: 'Identifier',
                                intent: Intent.PRIMARY,
                            },
                            m(IdentifierList, {
                                identifiers: identifiers,
                                loadIdentifiers: loadIdentifiers,
                                emptyStateHeader: 'No Identifiers',
                            })
                        )
                    ),
                ])
            );
        },
    };
}

module.exports = Settings;
