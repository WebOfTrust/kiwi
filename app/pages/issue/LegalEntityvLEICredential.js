import m from 'mithril';
import { Button, Callout, Classes, Colors, Form, FormGroup, FormLabel, Icon, Icons, Input } from 'construct-ui';
import { Container } from '../../components';
import { xhring } from '../../helpers';

function LegalEntityvLEICredential() {
    const schemaSAID = 'E-BRq9StLuC9DxGgiFiy2XND0fFgzyn8cjptlcdvGEFY';
    let isSubmitting = false;
    let lei = '';

    function handleSubmit(e) {
        e.preventDefault();
        return xhring
            .exnRequest({
                LEI: lei,
                schema: schemaSAID,
                type: 'LegalEntityvLEICredential',
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
                            placeholder: '506700GE1G29325QX363',
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
