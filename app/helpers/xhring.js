import m from 'mithril';
import { UserTypes } from '../helpers';

export default class xhring {
    static port = process.env.CONTROLLER_PORT;

    static exnRequest(body) {
        return m
            .request({
                method: 'POST',
                url: `/credential/issue`,
                body,
            })
            .catch(function (e) {
                console.log('gaccRequest error: ', e);
            });
    }

    static revokeRequest(body) {
        return m
            .request({
                method: 'POST',
                url: `/credential/revoke`,
                body,
            })
            .catch(function (e) {
                console.log('revokeRequest error: ', e);
            });
    }

    static presentationRequest(body) {
        return m
            .request({
                method: 'POST',
                url: `/presentation/request`,
                body,
            })
            .catch(function (e) {
                console.log('presentationRequest error: ', e);
            });
    }
    static rotatePost(body) {
        return m
            .request({
                method: 'POST',
                url: `/rotate`,
                headers: {
                    'Signature': 'no-sig',
                    'Content-Type': 'application/json',
                },
                body,
            })
            .catch(function (e) {
                console.log('multisigInceptPost error: ', e);
            });
    }
    static multisigInceptPost(body) {
        return m
            .request({
                method: 'POST',
                url: `/multisig/incept`,
                headers: {
                    'Signature': 'no-sig',
                    'Content-Type': 'application/json',
                },
                body,
            })
            .catch(function (e) {
                console.log('multisigInceptPost error: ', e);
            });
    }

    static multisigRotatePost(body) {
        return m
            .request({
                method: 'POST',
                url: `/multisig/rotate`,
                headers: {
                    'Signature': 'no-sig',
                    'Content-Type': 'application/json',
                },
                body,
            })
            .catch(function (e) {
                console.log('multisigRotatePost error: ', e);
            });
    }

    static identifiers() {
        return m
            .request({
                method: 'GET',
                url: `/id`,
                headers: {
                    'Signature': 'no-sig',
                    'Content-Type': 'application/json',
                },
            })
            .catch(function (e) {
                console.log('identifiers error: ', e);
            });
    }

    static credentials(type) {
        let userType = UserTypes.getUserType();
        let registry = 'gleif';
        if (userType === 'gleif') {
            registry = 'root';
        }
        return m
            .request({
                method: 'GET',
                url: `/credentials/` + type + `?registry=` + registry,
                headers: {
                    'Signature': 'no-sig',
                    'Content-Type': 'application/json',
                },
            })
            .catch(function (e) {
                console.log('credentials error: ', e);
            });
    }

    static multisig() {
        return m
            .request({
                method: 'GET',
                url: `/multisig`,
                headers: {
                    'Signature': 'no-sig',
                    'Content-Type': 'application/json',
                },
            })
            .catch(function (e) {
                console.log('multisig error: ', e);
            });
    }

    static apply(body) {
        return m
            .request({
                method: 'POST',
                url: `/credential/apply`,
                headers: {
                    'Signature': 'no-sig',
                    'Content-Type': 'application/json',
                },
                body,
            })
            .catch(function (e) {
                console.log('apply error: ', e);
            });
    }
}
