import m from 'mithril';
import { Container, Tile } from '../components';
import { Col, Grid, Intent } from 'construct-ui';
import {
    Help,
    GLEIFvLEICredential,
    QualifiedvLEIIssuervLEICredential,
    LegalEntityvLEICredential,
    LegalEntityOfficialOrganizationalRolevLEICredential,
    LegalEntityEngagementContextRolevLEICredential,
} from './issue';

function Issue() {
    const gridAttrs = { gutter: { xs: 0, sm: 10, md: 20, lg: 30, xl: 40 } };
    const colAttrs = { span: { xs: 12, md: 4 }, style: { 'margin-top': '16px', 'margin-bottom': '16px' } };
    const cardAttrs = { fluid: true };
    const cell = '.cui-example-grid-col';

    return {
        view: function () {
            return m(
                Container,
                {},
                m(Grid, gridAttrs, [
                    m(Col, colAttrs, m(cell, m(Tile, { title: 'Credential Schema', ...cardAttrs }, m(Help)))),
                    m(
                        Col,
                        colAttrs,
                        m(
                            cell,
                            m(
                                Tile,
                                {
                                    title: 'GLEIF vLEI Credential',
                                    intent: Intent.PRIMARY,
                                    ...cardAttrs,
                                },
                                m(GLEIFvLEICredential)
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
                                    title: 'Qualified vLEI Issuer vLEI Credential',
                                    intent: Intent.PRIMARY,
                                    ...cardAttrs,
                                },
                                m(QualifiedvLEIIssuervLEICredential)
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
                                    title: 'Legal Entity vLEI Credential',
                                    intent: Intent.PRIMARY,
                                    ...cardAttrs,
                                },
                                m(LegalEntityvLEICredential)
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
                                    title: 'Legal Entity Official Organizational Role vLEI Credential',
                                    intent: Intent.PRIMARY,
                                    ...cardAttrs,
                                },
                                m(LegalEntityOfficialOrganizationalRolevLEICredential)
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
                                    title: 'Legal Entity Engagement Context Role vLEI Credential',
                                    intent: Intent.PRIMARY,
                                    ...cardAttrs,
                                },
                                m(LegalEntityEngagementContextRolevLEICredential)
                            )
                        )
                    ),
                ])
            );
        },
    };
}

module.exports = Issue;
