import m from 'mithril';
import { FormGroup, FormLabel, Icon, Icons, Input } from 'construct-ui';

function Recipient() {
    return {
        view: function () {
            return m(FormGroup, [
                m(FormLabel, 'Holder:'),
                m(Input, {
                    contentLeft: m(Icon, { name: Icons.HASH }),
                    fluid: true,
                    type: 'text',
                    placeholder: 'EyR75fE1ZmuCSfDwKPfbLowUWLqqi0ZX4502DLIo857Q',
                }),
            ]);
        },
    };
}

module.exports = Recipient;
