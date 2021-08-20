import m from 'mithril';
import { Button, Card, Classes, Colors, Form, FormGroup, FormLabel, Icons, List, ListItem, Select } from 'construct-ui';
import { Container } from '../../components';
import Recipient from './Recipient';

function PresentationRequest() {
    let schema = 'E7brwlefuH-F_KU_FPWAZR78A3pmSVDlnfJUqnm8Lhr4';
    let schemaOptions = [
        {
            value: 'E7brwlefuH-F_KU_FPWAZR78A3pmSVDlnfJUqnm8Lhr4',
            label: 'GLEIF vLEI Credential',
        },
        {
            value: 'E9bX8Do0nb1Eq986HvoJ2iNO00TjC6J_2En8Du9L-hYU',
            label: 'Qualified vLEI Issuer Credential',
        },
        {
            value: 'E-BRq9StLuC9DxGgiFiy2XND0fFgzyn8cjptlcdvGEFY',
            label: 'Legal Entity vLEI Credential',
        },
        {
            value: 'EUZ_F1do5sG78zeeA_8CChT5utRpOXQK4GYnv0WGRfuU',
            label: 'Legal Entity Official Organizational Role vLEI Credential',
        },
        {
            value: 'EWPMkW-_BU6gh1Y8kizXHchFdmvu_i1wYlYbAC3aJABk',
            label: 'Legal Entity Engagement Context Role vLEI Credential',
        },
    ];
    let isSubmitting = false;

    function handleSubmit(e) {
        e.preventDefault();
        // TODO: Move to helpers/xring
        m.request({
            method: 'POST',
            url: GACC_SERVER_URL + '/presentation/request',
            body: {
                schema,
            },
        })
            .then((res) => {
                m.request({
                    method: 'POST',
                    url: CONTROLLER_URL + '/exn/cmd/presentation/request',
                    headers: {
                        'CESR-DATE': res['date'],
                        'CESR-ATTACHMENT': res['attachment'],
                        'Content-Type': 'application/cesr+json',
                    },
                    body: JSON.parse(res['data']),
                }).catch((err) => {
                    console.log(err);
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return {
        view: function () {
            return m(Container, [
                m(
                    Form,
                    {
                        onsubmit: handleSubmit,
                        style: { paddingTop: '16px', paddingBottom: '16px' },
                    },
                    [
                        m(Recipient),
                        m(FormGroup, [
                            m(FormLabel, 'Schema'),
                            m(Select, {
                                fluid: true,
                                onchange: (e) => {
                                    schema = e.currentTarget.value;
                                },
                                defaultValue: schema,
                                options: schemaOptions,
                            }),
                        ]),
                        m(FormGroup, { class: Classes.ALIGN_RIGHT }, [
                            m(Button, {
                                iconRight: Icons.CHEVRON_RIGHT,
                                label: 'Request',
                                type: 'submit',
                                intent: 'primary',
                                loading: isSubmitting,
                            }),
                        ]),
                    ]
                ),
            ]);
        },
    };
}

module.exports = PresentationRequest;
