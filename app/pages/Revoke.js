import m from 'mithril';
import { Col, Grid, Intent } from 'construct-ui';
import { Container, Tile } from '../components';
import { CredentialNames, storing, toaster, xhring } from '../helpers';
import { CredentialList } from './revoke';

function Revoke() {
    const gridAttrs = { gutter: { xs: 0, sm: 8, md: 16, lg: 32, xl: 32 } };
    const colAttrs = { span: { xs: 12, md: 6 }, style: { margin: '16px 0' } };

    let issued = [];
    let revoked = [];

    function loadCreds() {
        issued = [];
        revoked = [];
        xhring
            .credentials()
            .then((credentials) => {
                credentials.map((cred) => {
                    if (cred.status === 'issued') {
                        issued.unshift(cred);
                    } else {
                        revoked.unshift(cred);
                    }
                });
            })
            .catch((err) => {
                console.log('caught', err);
            });
        m.redraw();
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
                                title: 'Issued Credentials',
                                intent: Intent.PRIMARY,
                            },
                            m(CredentialList, {
                                credentials: issued,
                                isRevoked: false,
                                revokeCredential: revokeCredential,
                                emptyStateHeader: 'No Issued Credentials',
                            })
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
                            m(CredentialList, {
                                credentials: revoked,
                                isRevoked: true,
                                revokeCredential: null,
                                emptyStateHeader: 'No Revoked Credentials',
                            })
                        )
                    ),
                ])
            );
        },
    };
}

module.exports = Revoke;
