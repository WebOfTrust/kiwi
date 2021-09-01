import m from 'mithril';
import { Button, Callout, Classes, Colors, Form, FormGroup, FormLabel, Icon, Icons, Input } from 'construct-ui';
import { Container } from '../../components';
import { storing, xhring } from '../../helpers';

function LegalEntityEngagementContextRolevLEICredential() {
    const schemaSAID = 'EWPMkW-_BU6gh1Y8kizXHchFdmvu_i1wYlYbAC3aJABk';
    let isSubmitting = false;
    let lei = '';
    let personLegalName = '';
    let engagementContextRole = '';

    function handleSubmit(e) {
        e.preventDefault();
        xhring
            .exnRequest({
                schema: schemaSAID,
                LEI: lei,
                personLegalName: personLegalName,
                engagementContextRole: engagementContextRole,
                type: 'LegalEntityEngagementContextRolevLEICredential',
                registry: "gleif",
                recipient: "EpXprWFWmvJx4dP7CqDyXRgoigTVFwEUh6i-6jUCcoU8"
            })
            .then((res) => {
                xhring.agentPost(res['date'], res['attachment'], res['d']);
                storing.addCredential(res['said'], JSON.stringify(res));
            })
            .catch((err) => {
                console.log('caught', err);
            });
    }

    return {
        view: function () {
            return m(Container, { style: { padding: '16px' } }, [
                m(Callout, {
                    content:
                        'A vLEI Role Credential issued to representatives of a Legal Entity in other than official roles but in functional or other context of engagement',
                }),
                m(
                    Form,
                    {
                        gutter: 16,
                        onsubmit: handleSubmit,
                        style: { marginTop: '16px' },
                    },
                    m(
                        FormGroup,
                        m(FormLabel, { for: 'lei' }, 'LEI'),
                        m(Input, {
                            contentLeft: m(Icon, { name: Icons.HASH }),
                            id: 'lei',
                            name: 'LEI',
                            placeholder: '506700GE1G29325QX363',
                            fluid: true,
                            oninput: (e) => {
                                lei = e.target.value;
                            },
                        })
                    ),
                    m(
                        FormGroup,
                        m(FormLabel, { for: 'personLegalName' }, 'Person Legal name'),
                        m(Input, {
                            contentLeft: m(Icon, { name: Icons.USER }),
                            id: 'personLegalName',
                            name: 'personLegalName',
                            placeholder: '',
                            fluid: true,
                            oninput: (e) => {
                                personLegalName = e.target.value;
                            },
                        })
                    ),
                    m(
                        FormGroup,
                        m(FormLabel, { for: 'engagementContextRole' }, 'Engagement Context Role'),
                        m(Input, {
                            contentLeft: m(Icon, { name: Icons.TAG }),
                            id: 'engagementContextRole',
                            name: 'engagementContextRole',
                            placeholder: '',
                            fluid: true,
                            oninput: (e) => {
                                engagementContextRole = e.target.value;
                            },
                        })
                    ),
                    m(FormGroup, { class: Classes.ALIGN_RIGHT }, [
                        m(Button, {
                            iconRight: Icons.CHEVRON_RIGHT,
                            type: 'submit',
                            label: 'Issue',
                            intent: 'primary',
                            loading: isSubmitting,
                        }),
                    ])
                ),
            ]);
        },
    };
}

module.exports = LegalEntityEngagementContextRolevLEICredential;
