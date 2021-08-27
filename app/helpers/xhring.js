import m from 'mithril';

export default class xhring {
    static exnRequest(body) {
        return m
            .request({
                method: 'POST',
                url: process.env.CONTROLLER_URL + '/credential/issue',
                body: body,
            })
            .catch(function (e) {
                console.log('gaccRequest error: ', e);
            });
    }

    static agentPost(date, attachment, body) {
        return m
            .request({
                method: 'POST',
                url: process.env.CONTROLLER_URL + '/exn/cmd/credential/issue',
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
}
