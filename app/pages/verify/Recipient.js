import m from 'mithril';
import { FormGroup, FormLabel, Icon, Icons, Input } from 'construct-ui';

function Recipient() {
    return {
        view: function () {
            return m(FormGroup, [
                m(FormLabel, 'Holder: (Jordan Price)'),
                m(Input, {
                    contentLeft: m(Icon, { name: Icons.HASH }),
                    fluid: true,
                    readOnly: true,
                    type: 'text',
                    value: 'EpXprWFWmvJx4dP7CqDyXRgoigTVFwEUh6i-6jUCcoU8',
                }),
            ]);
        },
    };
}

module.exports = Recipient;
