import m from 'mithril';
import { Colors, List, ListItem } from 'construct-ui';

function RevokedCredentials() {
    let revoked = [{ title: 'baz' }];
    return {
        view: function () {
            return m(
                '',
                { style: { background: Colors.WHITE } },
                m(
                    List,
                    revoked.map((s) =>
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

module.exports = RevokedCredentials;
