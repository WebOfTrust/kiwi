import m from 'mithril';

export default class AddressBook {
    static book = {
        'EeS834LMlGVEOGR8WU3rzZ9M6HUv_vtF32pSXQXKP7jg': {
            name: 'GLEIF',
        },
    }

    static portMap = new Map(Object.entries({
        "Qualified vLEI Issuer": 5623,
        "Legal Entity": 5223,
        "External Verifier": 5123,
    }))

    static get = (identifier) => {
        let addy = this.book[identifier]
        if (addy === undefined) {
            return identifier
        }

        return addy.name;
    }

    static initAddressBook = () => {
        let addressBook = this.book
        this.portMap.forEach(function (port, name) {
            m.request({
                method: 'GET',
                url: `http://localhost:` +port+ `/id`,
                headers: {
                    'Signature': 'no-sig',
                    'Content-Type': 'application/json',
                },

            }).then((res) => {
                addressBook[res[0].prefix] = {name: name}
            }).catch(function (e) {
                console.log('identifiers error: ', e);
            });

        });
    }


};
