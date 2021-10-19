import m from 'mithril';
import { toaster, xhring } from '../helpers';
import UserTypes from './user-types';

export default class mailbox {
    static MINSNIFFSIZE = 30;
    static _port = process.env.CONTROLLER_PORT;

    static groupName = '';
    static messages = [];
    static presentations = [];
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

    static displayDelegateNotices = (e) => {
        let size = this.sniff(e.data);

        let evt = e.data.slice(0, size);
        let ked = JSON.parse(evt);

        this.messages.unshift(ked);
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

    static displayPresentation = (e) => {
        let size = this.sniff(e.data);

        let evt = e.data.slice(0, size);
        let ked = JSON.parse(evt);
        this.presentations.unshift(ked['d']);
        m.redraw();
    };

    static initEventSource = () => {
        this.source = new EventSource(
            '/qry/mbx?s=0&i=E4Zq5dxbnWKq5K-Bssn4g_qhBbSwNSI2MH4QYnkEUFDM&topics=/credential%3D0&topics=/multisig%3D0&topics=/delegate%3D0&topics=/presentation%3D0'
        );
        this.source.addEventListener('/credential', this.displayData, false);
        this.source.addEventListener('/presentation', this.displayPresentation, false);
        this.source.addEventListener('/multisig', this.displayMultisig, false);
        this.source.addEventListener('/delegate', this.displayDelegateNotices, false);
    };

    static closeEventSource = () => {
        this.messages = [];
        this.source.removeEventListener('/credential', this.displayData, false);
        this.source.removeEventListener('/presentation', this.displayPresentation, false);
        this.source.removeEventListener('/multisig', this.displayMultisig, false);
        this.source.removeEventListener('/delegate', this.displayDelegateNotices, false);
        this.source.close();
        this.source = null;
    };

    static joinGroup = (msg) => {
        xhring
            .multisigInceptPost({
                group: this.groupName,
                aids: msg.aids,
                witnesses: msg.witnesses,
                toad: msg.toad,
                isith: msg.isith,
                nsith: msg.nsith,
                notify: false,
            })
            .then((res) => {
                alert('Multisig Group Join Initiated');
            })
            .catch((err) => {
                console.log('caught', err);
            });
    };

    static joinIssue = (schema, data, typ, recipient, source) => {
        xhring
            .exnRequest({
                credentialData: data,
                schema: schema,
                type: typ,
                registry: UserTypes.getUserType(),
                recipient: recipient,
                source: source,
                notify: false,
            })
            .then((res) => {
                toaster.success(typ + ' signed and submitted');
            })
            .catch((err) => {
                console.log('caught', err);
                toaster.error('Failed to issue ' + typ);
            });
    };

    static rotateGroup = (group) => {
        xhring
            .multisigRotatePost({
                group: group,
            })
            .then((res) => {})
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
