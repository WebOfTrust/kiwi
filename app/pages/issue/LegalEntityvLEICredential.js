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
                        content: 'A vLEI Credential issued by a Qualified vLEI issuer to a Legal Entity',
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

module.exports = LegalEntityvLEICredential;