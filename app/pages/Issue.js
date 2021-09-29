import m from 'mithril';
import { Col, Grid, Intent } from 'construct-ui';
import { Container, Tile } from '../components';
import {UserTypes, xhring} from '../helpers';
import {
    Help,
    GLEIFvLEICredential,
    QualifiedvLEIIssuervLEICredential,
    LegalEntityvLEICredential,
    LegalEntityOfficialOrganizationalRolevLEICredential,
    LegalEntityEngagementContextRolevLEICredential,
} from './issue';

function Issue() {
    const gridAttrs = { gutter: { xs: 0, sm: 8, md: 16, lg: 32, xl: 32 } };
    const colAttrs = { span: { xs: 12, md: 4 }, style: { margin: '16px 0' } };

    let wallet = [];
    let qualifiedvLEIIssuerCred = undefined

    function loadCreds() {
        wallet = [];
        xhring
            .credentials("received")
            .then((credentials) => {
                credentials.map((cred) => {
                    wallet.unshift(cred);
                });
                qualifiedvLEIIssuerCred = wallet.find(c => c.sad.a.t.includes("QualifiedvLEIIssuervLEICredential"));
                m.redraw();
            })
            .catch((err) => {
                console.log('caught', err);
            });
    }

    return {
        oninit: function () {
            loadCreds();
        },
        view: function () {
            return m(
                Container,
                m(Grid, gridAttrs, [
                    UserTypes.userTypeIn(['developer'])
                        ? m(Col, colAttrs, m(Tile, { title: 'Credential Schema' }, m(Help)))
                        : null,
                    UserTypes.userTypeIn(['developer', 'gleif'])
                        ? m(
                              Col,
                              colAttrs,
                              m(
                                  Tile,
                                  {
                                      title: 'GLEIF vLEI Credential',
                                      intent: Intent.PRIMARY,
                                  },
                                  m(GLEIFvLEICredential)
                              )
                          )
                        : null,
                    UserTypes.userTypeIn(['developer', 'gleif'])
                        ? m(
                              Col,
                              colAttrs,
                              m(
                                  Tile,
                                  {
                                      title: 'Qualified vLEI Issuer vLEI Credential',
                                      intent: Intent.PRIMARY,
                                  },
                                  m(QualifiedvLEIIssuervLEICredential)
                              )
                          )
                        : null,
                    UserTypes.userTypeIn(['developer', 'qvi'])
                        ? m(
                              Col,
                              colAttrs,
                              m(
                                  Tile,
                                  {
                                      title: 'Legal Entity vLEI Credential',
                                      intent: Intent.PRIMARY,
                                  },
                                  m(LegalEntityvLEICredential, {qualifiedvLEIIssuerCred})
                              )
                          )
                        : null,
                    UserTypes.userTypeIn(['developer', 'qvi'])
                        ? m(
                              Col,
                              colAttrs,
                              m(
                                  Tile,
                                  {
                                      title: 'Legal Entity Official Organizational Role vLEI Credential',
                                      intent: Intent.PRIMARY,
                                  },
                                  m(LegalEntityOfficialOrganizationalRolevLEICredential, {qualifiedvLEIIssuerCred})
                              )
                          )
                        : null,
                    UserTypes.userTypeIn(['developer', 'qvi', 'legal-entity'])
                        ? m(
                              Col,
                              colAttrs,
                              m(
                                  Tile,
                                  {
                                      title: 'Legal Entity Engagement Context Role vLEI Credential',
                                      intent: Intent.PRIMARY,
                                  },
                                  m(LegalEntityEngagementContextRolevLEICredential, {qualifiedvLEIIssuerCred})
                              )
                          )
                        : null,
                ])
            );
        },
    };
}

module.exports = Issue;
