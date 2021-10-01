import m from 'mithril';
import { UserTypes } from '../helpers';

export default class xhring {
    static port = process.env.CONTROLLER_PORT;

    static exnRequest(body) {
        return m
            .request({
                method: 'POST',
                url: `${process.env.CONTROLLER_URL}:${this.port}/credential/issue`,
                body: body,
            })
            .catch(function (e) {
                console.log('gaccRequest error: ', e);
            });
    }

    static revokeRequest(body) {
        return m
            .request({
                method: 'POST',
                url: `${process.env.CONTROLLER_URL}:${this.port}/credential/revoke`,
                body: body,
            })
            .catch(function (e) {
                console.log('revokeRequest error: ', e);
            });
    }

    static presentationRequest(body) {
        return m
            .request({
                method: 'POST',
                url: `${process.env.CONTROLLER_URL}:${this.port}/presentation/request`,
                body: body,
            })
            .catch(function (e) {
                console.log('presentationRequest error: ', e);
            });
    }
    static multisigInceptPost(body) {
        return m
            .request({
                method: 'POST',
                url: `${process.env.CONTROLLER_URL}:${this.port}/multisig/incept`,
                headers: {
                    'Signature': 'no-sig',
                    'Content-Type': 'application/json',
                },
                body: body,
            })
            .catch(function (e) {
                console.log('multisigInceptPost error: ', e);
            });
    }

    static multisigRotatePost(body) {
        return m
            .request({
                method: 'POST',
                url: `${process.env.CONTROLLER_URL}:${this.port}/multisig/rotate`,
                headers: {
                    'Signature': 'no-sig',
                    'Content-Type': 'application/json',
                },
                body: body,
            })
            .catch(function (e) {
                console.log('multisigRotatePost error: ', e);
            });
    }

    static identifiers() {
        return m
            .request({
                method: 'GET',
                url: `${process.env.CONTROLLER_URL}:${this.port}/id`,
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
                url: `${process.env.CONTROLLER_URL}:${this.port}/credentials/` + type + `?registry=` + registry,
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
                url: `${process.env.CONTROLLER_URL}:${this.port}/multisig`,
                headers: {
                    'Signature': 'no-sig',
                    'Content-Type': 'application/json',
                },
            })
            .catch(function (e) {
                console.log('multisig error: ', e);
            });
    }
}
