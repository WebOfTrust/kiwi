import m from 'mithril';
import { Button, Callout, Classes, Form, FormGroup, FormLabel, Icon, Icons, Input } from 'construct-ui';
import { Container } from '../../components';
import { toaster, xhring } from '../../helpers';

function GLEIFvLEICredential() {
    const schemaSAID = 'E7brwlefuH-F_KU_FPWAZR78A3pmSVDlnfJUqnm8Lhr4';
    let isSubmitting = false;
    let lei = '506700GE1G29325QX363';

    function handleSubmit(e) {
        e.preventDefault();
        isSubmitting = true;
        xhring
            .exnRequest({
                credentialData: {
                    LEI: lei,
                },
                schema: schemaSAID,
                type: 'GLEIFvLEICredential',
                registry: 'gleif',
                recipient: 'EpXprWFWmvJx4dP7CqDyXRgoigTVFwEUh6i-6jUCcoU8',
            })
            .then((res) => {
                isSubmitting = false;
                toaster.success('GLEIFvLEICredential issued');
            })
            .catch((err) => {
                isSubmitting = false;
                console.log('caught', err);
                toaster.error('Failed to issue GLEIFvLEICredential');
            });
    }

    return {
        view: function () {
            return m(Container, { style: { padding: '16px' } }, [
                m(Callout, {
                    content: 'The vLEI Credential issued to GLEIF',
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
                            readOnly: true,
                            fluid: true,
                            value: '506700GE1G29325QX363',
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

module.exports = GLEIFvLEICredential;
