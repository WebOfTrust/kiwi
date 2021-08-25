import m from 'mithril';
import { Button, Callout, Classes, Colors, Form, FormGroup, FormLabel, Icon, Icons, Input } from 'construct-ui';
import { Container } from '../../components';
import { storing, xhring } from '../../helpers';

function LegalEntityOfficialOrganizationalRolevLEICredential() {
    const schemaSAID = 'EUZ_F1do5sG78zeeA_8CChT5utRpOXQK4GYnv0WGRfuU';
    let isSubmitting = false;
    let lei = '';
    let personLegalName = '';
    let officialRole = '';

    function handleSubmit(e) {
        e.preventDefault();
        xhring
            .exnRequest({
                schema: schemaSAID,
                LEI: lei,
                personLegalName: personLegalName,
                officialRole: officialRole,
                type: 'LegalEntityOfficialOrganizationalRolevLEICredential',
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
                        'A vLEI Role Credential issued by a Qualified vLEI issuer to official representatives of a Legal Entity',
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
                        m(FormLabel, { for: 'officialRole' }, 'Official Role'),
                        m(Input, {
                            contentLeft: m(Icon, { name: Icons.GLOBE }),
                            id: 'officialRole',
                            name: 'officialRole',
                            placeholder: '',
                            fluid: true,
                            oninput: (e) => {
                                officialRole = e.target.value;
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

module.exports = LegalEntityOfficialOrganizationalRolevLEICredential;
