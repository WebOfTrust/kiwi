import m from 'mithril';
import { Container, Tile } from '../components';
import { Col, Grid, Intent } from 'construct-ui';
import { IssuedCredentials, RevokedCredentials } from './Revoke';

function Revoke() {
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
                                    title: 'Issued Credentials',
                                    intent: Intent.PRIMARY,
                                    ...cardAttrs,
                                },
                                m(IssuedCredentials)
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
                                    title: 'Revoked Credentials',
                                    intent: Intent.PRIMARY,
                                    ...cardAttrs,
                                },
                                m(RevokedCredentials)
                            )
                        )
                    ),
                ])
            );
        },
    };
}

module.exports = Revoke;
