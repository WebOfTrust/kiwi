import m from 'mithril';
import { Colors, List, ListItem } from 'construct-ui';

function PresentationRequest() {
    let creds = [{ title: 'foo' }, { title: 'bar' }];

    return {
        view: function () {
            return m(
                '',
                { style: { background: Colors.WHITE } },
                m(
                    List,
                    { interactive: this.interactive, size: this.size },
                    creds.map((s) =>
                        m(ListItem, {
                            style: { paddingLeft: '16px' },
                            label: `${s.title}`,
                        })
                    )
                )
            );
        },
    };
}

module.exports = PresentationRequest;
