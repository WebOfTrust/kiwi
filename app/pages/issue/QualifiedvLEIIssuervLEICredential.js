import m from 'mithril';
import { Button, Callout, Classes, Form, FormGroup, FormLabel, Icon, Icons, Input } from 'construct-ui';
import { Container } from '../../components';
import { xhring } from '../../helpers/xhring';

function QualifiedvLEIIssuervLEICredential() {
    const schemaSAID = 'E9bX8Do0nb1Eq986HvoJ2iNO00TjC6J_2En8Du9L-hYU';
    let isSubmitting = false;
    let lei = '';

    function handleSubmit(e) {
        e.preventDefault();
        return xhring
            .exnRequest({
                LEI: lei,
                schema: schemaSAID,
                type: 'QualifiedvLEIIssuervLEICredential',
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
