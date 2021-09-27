import m from 'mithril';
import { Button, Callout, Classes, Form, FormGroup, FormLabel, Icon, Icons, Input } from 'construct-ui';
import { Container } from '../../components';
import { storing, toaster, xhring } from '../../helpers';

function QualifiedvLEIIssuervLEICredential() {
    const schemaSAID = 'E-_XCbf1LJ0v9CR7g-_gOknf5dpoZROgF7qG5T8mXCv8';
    let isSubmitting = false;
    let lei = '254900OPPU84GM83MG36';

    function handleSubmit(e) {
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
                type: 'QualifiedvLEIIssuervLEICredential',
                registry: 'gleif',
                recipient: 'EpXprWFWmvJx4dP7CqDyXRgoigTVFwEUh6i-6jUCcoU8',
            })
            .then((res) => {
                isSubmitting = false;
                storing.addCredential(res['i'], JSON.stringify(res));
                toaster.success('QualifiedvLEIIssuervLEICredential issued');
            })
            .catch((err) => {
                isSubmitting = false;
                console.log('caught', err);
                toaster.error('Failed to issue QualifiedvLEIIssuervLEICredential');
            });
    }

    return {
        handleSubmit,
        view: function () {
            return m(Container, { style: { padding: '16px' } }, [
                m(Callout, {
                    content:
                        'A vLEI Credential issued by GLEIF to Qualified vLEI Issuers which allows the Qualified vLEI Issuers to issue, verify and revoke Legal Entity vLEI Credentials and Legal Entity Official Organizational Role vLEI Credentials',
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
                            fluid: true,
                            value: '254900OPPU84GM83MG36',
                            readOnly: true,
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

module.exports = QualifiedvLEIIssuervLEICredential;
