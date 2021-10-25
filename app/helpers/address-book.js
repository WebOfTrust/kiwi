import m from 'mithril';

export default class AddressBook {
    static book = {};

    static portMap = new Map(
        Object.entries({
            'QVI, Inc (Qualified vLEI Issuer)': 5623,
            'ACME Corp. (Legal Entity)': 5223,
            'DataTech (External Verifier)': 5123,
            'Jane Smith (Person)': 5823,
            'John Doe (Person)': 5023,
        })
    );

    static get = (identifier) => {
        let addy = this.book[identifier];
        if (addy === undefined) {
            return identifier;
        }

        return addy.name;
    };

    static initAddressBook = () => {
        this.book[process.env.GLEIF_IDENTIFIER] = { name: 'GLEIF' };
        let addressBook = this.book;
        this.portMap.forEach(function (port, name) {
            m.request({
                method: 'GET',
                url: `http://localhost:` + port + `/id`,
                headers: {
                    'Signature': 'no-sig',
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => {
                    addressBook[res[0].prefix] = { name: name };
                })
                .catch(function (e) {
                    console.log('identifiers error: ', e);
                });
        });
    };
}
