import m from 'mithril';
import { Button, Callout, Classes, Colors, Form, FormGroup, FormLabel, Icon, Icons, Input } from 'construct-ui';
import Container from '../../components/Container';
import xhring from '../../helpers/xhring';

function LegalEntityEngagementContextRolevLEICredential() {
    const schemaSAID = 'EWPMkW-_BU6gh1Y8kizXHchFdmvu_i1wYlYbAC3aJABk';
    let isSubmitting = false;
    let lei = '';
    let personLegalName = '';
    let engagementContextRole = '';

    function handleSubmit(e) {
        e.preventDefault();
        return xhring
            .exnRequest({
                schema: schemaSAID,
                LEI: lei,
                personLegalName: personLegalName,
                engagementContextRole: engagementContextRole,
                type: 'LegalEntityEngagementContextRolevLEICredential',
            })
            .then(function (res) {
                return xhring.agentPost(res['date'], res['attachment'], res['d']);
            })
            .catch(function (err) {
                console.log('caught', err);
            });
    }

    return {
        view: function () {
            return m(
                '',
                { style: { paddingTop: '16px' } },
                m(
                    Container,
                    m(Callout, {
                        content:
                            'A vLEI Role Credential issued to representatives of a Legal Entity in other than official roles but in functional or other context of engagement',
                    })
                ),
                m(
                    Container,
                    { style: { background: Colors.WHITE } },
                    m(
                        Form,
                        {
                            gutter: 15,
                            onsubmit: handleSubmit,
                            style: { paddingTop: '16px', paddingBottom: '16px' },
                        },
                        m(
                            FormGroup,
                            { style: { paddingBottom: '16px' } },
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
                            { style: { paddingBottom: '16px' } },
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
                            { style: { paddingBottom: '16px' } },
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
                    )
                )
            );
        },
    };
}

module.exports = LegalEntityEngagementContextRolevLEICredential;
