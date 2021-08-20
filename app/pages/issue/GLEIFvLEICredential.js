import m from 'mithril';
import { Button, Callout, Classes, Form, FormGroup, FormLabel, Icon, Icons, Input } from 'construct-ui';
import { Container } from '../../components';
import { xhring } from '../../helpers';

function GLEIFvLEICredential() {
    const schemaSAID = 'E7brwlefuH-F_KU_FPWAZR78A3pmSVDlnfJUqnm8Lhr4';
    let isSubmitting = false;
    let lei = '';

    function handleSubmit(e) {
        e.preventDefault();
        return xhring
            .exnRequest({
                LEI: lei,
                schema: schemaSAID,
                type: 'GLEIFvLEICredential',
            })
            .then((res) => {
                return xhring.agentPost(res['date'], res['attachment'], res['d']);
            })
            .catch((err) => {
                console.log('caught', err);
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
