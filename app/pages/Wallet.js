import m from 'mithril';
import {Col, Grid, Intent} from 'construct-ui';
import {Container, Tile} from '../components';
import {xhring} from '../helpers';
import {CredentialList} from './revoke';

function Wallet() {
    const gridAttrs = {gutter: {xs: 0, sm: 8, md: 16, lg: 32, xl: 32}};
    const colAttrs = {span: {xs: 12, md: 6}, style: {margin: '16px 0'}};

    let issued = [];
    let revoked = [];

    function loadCreds() {
        issued = [];
        xhring
            .credentials("received")
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
                                title: 'My Credentials',
                                intent: Intent.PRIMARY,
                            },
                            m(CredentialList, {
                                credentials: issued,
                                emptyStateHeader: 'No Credentials',
                                isWallet: true,
                            })
                        )
                    ),
                ])
            );
        },
    };
}

module.exports = Wallet;
