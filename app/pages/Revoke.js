import m from 'mithril';
import { Col, Grid, Intent } from 'construct-ui';
import { Container, Tile } from '../components';
import { storing } from '../helpers';
import { CredentialList } from './revoke';

function Revoke() {
    const gridAttrs = { gutter: { xs: 0, sm: 8, md: 16, lg: 32, xl: 32 } };
    const colAttrs = { span: 6, style: { margin: '16px 0' } };

    let issued = [];
    let revoked = [];

    function loadCredsFromStorage() {
        issued = [];
        revoked = [];
        Object.keys(localStorage)
            .filter(function (key) {
                return key.includes('credential.');
            })
            .map(function (key) {
                if (key.includes('revoked.')) {
                    revoked.unshift(JSON.parse(localStorage.getItem(key)));
                } else {
                    issued.unshift(JSON.parse(localStorage.getItem(key)));
                }
            });
        m.redraw();
    }

    function revokeCredential(cred) {
        // TODO: Move to helpers/xhring
        m.request({
            method: 'POST',
            url: process.env.CONTROLLER_URL + '/credential/revoke',
            body: { said: cred.i, registry: 'gleif' },
        })
            .then((res) => {
                storing.revokeCredential(cred.i);
                loadCredsFromStorage();
                m.redraw();
            })
            .catch((e) => {
                console.log(e);
            });
    }

    return {
        oninit: function () {
            loadCredsFromStorage();
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
