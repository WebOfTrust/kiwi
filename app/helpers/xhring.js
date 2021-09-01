import m from 'mithril';

export default class xhring {
    static port = 5623;

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

    static agentPost(date, attachment, body) {
        return m
            .request({
                method: 'POST',
                url: `${process.env.CONTROLLER_URL}:${this.port}/exn/cmd/credential/issue`,
                headers: {
                    'CESR-DATE': date,
                    'CESR-ATTACHMENT': attachment,
                    'Content-Type': 'application/cesr+json',
                },
                body: body,
            })
            .catch(function (e) {
                console.log('agentPost error: ', e);
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
                console.log('agentPost error: ', e);
            });
    }
}
