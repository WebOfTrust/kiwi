import m from 'mithril';
import { Button, Callout, Classes, Form, FormGroup, FormLabel, Icon, Icons, Input } from 'construct-ui';
import { Container } from '../../components';
import { storing, toaster, xhring } from '../../helpers';

function LegalEntityvLEICredential() {
    const schemaSAID = 'EJEY6JAAVfAh8-yBTV37rHaJ9b_VKvkZunz_oJupzsvQ';
    let isSubmitting = false;
    let lei = '506700GE1G29325QX363';

    function handleSubmit(e = null) {
        if (e) {
            e.preventDefault();
        }
        isSubmitting = true;
        xhring
            .exnRequest({
                credentialData: {
                    LEI: lei,
                },
                schema: schemaSAID,
                type: 'LegalEntityvLEICredential',
                registry: 'gleif',
                recipient: 'EpXprWFWmvJx4dP7CqDyXRgoigTVFwEUh6i-6jUCcoU8',
            })
            .then((res) => {
                isSubmitting = false;
                storing.addCredential(res['i'], JSON.stringify(res));
                toaster.success('LegalEntityvLEICredential issued');
            })
            .catch((err) => {
                isSubmitting = false;
                console.log('caught', err);
                toaster.error('Failed to issue LegalEntityvLEICredential');
            });
    }

    return {
        handleSubmit,
        view: function () {
            return m(Container, { style: { padding: '16px' } }, [
                m(Callout, {
                    content: 'A vLEI Credential issued by a Qualified vLEI issuer to a Legal Entity',
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
                            defaultValue: '506700GE1G29325QX363',
                            fluid: true,
                            oninput: (e) => {
                                lei = e.target.value;
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

module.exports = LegalEntityvLEICredential;
