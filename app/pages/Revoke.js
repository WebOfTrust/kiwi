import m from 'mithril';
import { Col, Grid, Intent } from 'construct-ui';
import { Container, Tile } from '../components';
import { IssuedCredentials, RevokedCredentials } from './revoke';

function Revoke() {
    const gridAttrs = { gutter: { xs: 0, sm: 8, md: 16, lg: 32, xl: 32 } };
    const colAttrs = { span: 6, style: { margin: '16px 0' } };

    return {
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
                                title: 'Issued Credentials',
                                intent: Intent.PRIMARY,
                            },
                            m(IssuedCredentials)
                        )
                    ),
                    m(
                        Col,
                        colAttrs,
                        m(
                            Tile,
                            {
                                title: 'Revoked Credentials',
                                intent: Intent.PRIMARY,
                            },
                            m(RevokedCredentials)
                        )
                    ),
                ])
            );
        },
    };
}

module.exports = Revoke;
