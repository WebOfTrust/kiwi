import m from 'mithril';
import Container from '../components/Container';
import Tile from '../components/Tile';
import { Col, Grid, Intent } from 'construct-ui';
import * as partials from './Revoke/Partials';

function Verify() {
    const gridAttrs = { gutter: { xs: 0, sm: 10, md: 20, lg: 30, xl: 40 } };
    const colAttrs = { span: 6, style: { 'margin-top': '16px', 'margin-bottom': '16px' } };
    const cardAttrs = { fluid: true };
    const cell = '.cui-example-grid-col';

    return {
        view: function () {
            return m(
                Container,
                {},
                m(Grid, gridAttrs, [
                    m(
                        Col,
                        colAttrs,
                        m(
                            cell,
                            m(
                                Tile,
                                {
                                    title: 'Presentation Request',
                                    intent: Intent.PRIMARY,
                                    ...cardAttrs,
                                },
                                m(partials.IssuedCredentials)
                            )
                        )
                    ),
                    m(
                        Col,
                        colAttrs,
                        m(
                            cell,
                            m(
                                Tile,
                                {
                                    title: 'Mailbox',
                                    intent: Intent.PRIMARY,
                                    ...cardAttrs,
                                },
                                m(partials.RevokedCredentials)
                            )
                        )
                    ),
                ])
            );
        },
    };
}

module.exports = Verify;
