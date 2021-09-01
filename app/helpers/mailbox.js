import m from 'mithril';
import { xhring } from '../helpers';

export default class mailbox {
    static MINSNIFFSIZE = 30;
    static _port = 5623;

    static groupName = '';
    static messages = [];
    static source = null;

    static sniff = (raw) => {
        let size = '';
        if (raw.length < this.MINSNIFFSIZE) {
            throw new Error('"Need more bytes."');
        }

        const versionPattern = Buffer.from(
            'KERI(?<major>[0-9a-f])(?<minor>[0-9a-f])(?<kind>[A-Z]{4})(?<size>[0-9a-f]{6})_',
            'binary'
        );
        const regex = RegExp(versionPattern);
        const response = regex.exec(raw);

        if (!response || response.kind > 12) throw new Error(`Invalid version string in raw = ${raw}`);
        size = response.groups.size;

        return parseInt(size, 16);
    };

    static displayMultisig = (e) => {
        let data = JSON.parse(e.data);
        this.messages.unshift(data);
        m.redraw();
    };

    static displayData = (e) => {
        let size = this.sniff(e.data);

        let evt = e.data.slice(0, size);
        let ked = JSON.parse(evt);
        this.messages.unshift(ked['d']);
        this.messages = this.messages.filter(
            (msg, index, self) => index === self.findIndex((m) => m.vc.i === msg.vc.i && m.status === msg.status)
        );
        m.redraw();
    };

    static initEventSource = () => {
        this.source = new EventSource(
            process.env.CONTROLLER_URL +
                ':' +
                this.port +
                '/req/mbx?s=0&i=E4Zq5dxbnWKq5K-Bssn4g_qhBbSwNSI2MH4QYnkEUFDM&topics=/credential%3D0&topics=/multisig%3D0&topics=/delegate%3D0'
        );
        this.source.addEventListener('/credential', this.displayData, false);
        this.source.addEventListener('/multisig', this.displayMultisig, false);
    };

    static closeEventSource = () => {
        this.messages = [];
        this.source.removeEventListener('/credential', this.displayData, false);
        this.source.removeEventListener('/multisig', this.displayMultisig, false);
        this.source.close();
        this.source = null;
    };

    static joinGroup = (msg) => {
        xhring
            .multisigInceptPost({
                group: groupName,
                aids: msg.aids,
                witnesses: msg.witnesses,
                toad: msg.toad,
                sith: msg.sith,
                nsith: msg.nsith,
            })
            .then((res) => {
                alert('Multisig Group Join Initiated');
            })
            .catch((err) => {
                console.log('caught', err);
            });
    };

    static get port() {
        return this._port;
    }

    static set port(port) {
        this._port = port;
        this.closeEventSource();
        this.initEventSource();
    }
}
