import m from 'mithril';
import { Col, Grid, Intent } from 'construct-ui';
import { Container, Tile } from '../components';
import { CredentialNames, storing, toaster, UserTypes, xhring } from '../helpers';
import {
    GLEIFvLEICredential,
    LegalEntityEngagementContextRolevLEICredential,
    LegalEntityOfficialOrganizationalRolevLEICredential,
    LegalEntityvLEICredential,
    QualifiedvLEIIssuervLEICredential,
} from './issue';
import { CredentialList } from './revoke';

function Manage() {
    const gridAttrs = { gutter: { xs: 0, sm: 8, md: 16, lg: 32, xl: 32 } };
    const colAttrs = { span: { xs: 12, md: 6 }, style: { margin: '16px 0' } };

    let wallet = [];
    let qualifiedvLEIIssuerCred = undefined;

    let issued = [];
    let revoked = [];

    function loadCreds() {
        wallet = [];
        xhring
            .credentials('received')
            .then((credentials) => {
                credentials.map((cred) => {
                    wallet.unshift(cred);
                });
                qualifiedvLEIIssuerCred = wallet.find((c) => c.sad.a.t.includes('QualifiedvLEIIssuervLEICredential'));
                m.redraw();
            })
            .catch((err) => {
                console.log('caught', err);
            });
        xhring
            .credentials('issued')
            .then((credentials) => {
                credentials.map((cred) => {
                    if (cred.status === 'issued') {
                        issued.unshift(cred);
                    } else {
                        revoked.unshift(cred);
                    }
                });
                m.redraw();
            })
            .catch((err) => {
                console.log('caught', err);
            });
    }

    function revokeCredential(cred) {
        xhring
            .revokeRequest({
                said: cred.d,
                registry: 'gleif',
            })
            .then((res) => {
                storing.revokeCredential(cred.d);
                toaster.success(`Revoked ${CredentialNames[cred.s]}`);
                loadCreds();
                m.redraw();
            })
            .catch(() => {
                toaster.error(`Failed to revoke ${CredentialNames[cred.s]}`);
                console.log(e);
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
                    m(
                        Col,
                        colAttrs,
                        m(
                            Tile,
                            {
                                title: 'Issue Credentials',
                                intent: Intent.PRIMARY,
                            },
                            m('div', [
                                UserTypes.userTypeIn(['developer', 'gleif'])
                                    ? m(
                                          Tile,
                                          {
                                              title: 'GLEIF vLEI Credential',
                                          },
                                          m(GLEIFvLEICredential)
                                      )
                                    : null,
                                UserTypes.userTypeIn(['developer', 'gleif'])
                                    ? m(
                                          Tile,
                                          {
                                              title: 'Qualified vLEI Issuer vLEI Credential',
                                          },
                                          m(QualifiedvLEIIssuervLEICredential)
                                      )
                                    : null,
                                UserTypes.userTypeIn(['developer', 'qvi'])
                                    ? m(
                                          Tile,
                                          {
                                              title: 'Legal Entity vLEI Credential',
                                          },
                                          m(LegalEntityvLEICredential, { qualifiedvLEIIssuerCred })
                                      )
                                    : null,
                                UserTypes.userTypeIn(['developer', 'qvi'])
                                    ? m(
                                          Tile,
                                          {
                                              title: 'Legal Entity Official Organizational Role vLEI Credential',
                                          },
                                          m(LegalEntityOfficialOrganizationalRolevLEICredential, {
                                              qualifiedvLEIIssuerCred,
                                          })
                                      )
                                    : null,
                                UserTypes.userTypeIn(['developer', 'qvi', 'legal-entity'])
                                    ? m(
                                          Tile,
                                          {
                                              title: 'Legal Entity Engagement Context Role vLEI Credential',
                                          },
                                          m(LegalEntityEngagementContextRolevLEICredential, { qualifiedvLEIIssuerCred })
                                      )
                                    : null,
                            ])
                        )
                    ),
                    m(
                        Col,
                        colAttrs,
                        m(
                            Tile,
                            {
                                title: 'Issued Credentials',
                                intent: Intent.PRIMARY,
                            },
                            m(CredentialList, {
                                credentials: issued,
                                revokeCredential: revokeCredential,
                                emptyStateHeader: 'No Issued Credentials',
                            })
                        )
                    ),
                ])
            );
        },
    };
}

module.exports = Manage;
