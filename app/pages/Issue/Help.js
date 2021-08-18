import m from 'mithril';
import {List, ListItem} from "construct-ui";

function Help() {
    const schema = [
        {
            title: 'GLEIF vLEI Credential',
            link: 'https://github.com/WebOfTrust/vLEI/blob/main/schema/acdc/gleif-vLEI-credential.json'
        },
        {
            title: 'Qualified vLEI Issuer Credential',
            link: 'https://github.com/WebOfTrust/vLEI/blob/main/schema/acdc/qualified-vLEI-issuer-vLEI-credential.json'
        },
        {
            title: 'Legal Entity vLEI Credential',
            link: 'https://github.com/WebOfTrust/vLEI/blob/main/schema/acdc/legal-entity-vLEI-credential.json'
        },
        {
            title: 'Legal Entity Official Organizational Role vLEI Credential',
            link: 'https://github.com/WebOfTrust/vLEI/blob/main/schema/acdc/legal-entity-official-organizational-role-vLEI-credential.json'
        },
        {
            title: 'Legal Entity Engagement Context Role vLEI Credential',
            link: 'https://github.com/WebOfTrust/vLEI/blob/main/schema/acdc/legal-entity-engagement-context-role-vLEI-credential.json'
        },
    ];

    return {
        view: function () {
            return m(List, schema.map(
                s => m(ListItem, { style: {paddingLeft: "16px"},
                    label: `${s.title}`
                })
            ));
        }
    };
}

module.exports = Help;
