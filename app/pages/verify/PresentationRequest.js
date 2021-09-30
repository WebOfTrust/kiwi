import m from 'mithril';
import { Button, Classes, Form, FormGroup, FormLabel, Icons, Select } from 'construct-ui';
import { Container } from '../../components';
import Recipient from './Recipient';
import { toaster, xhring } from '../../helpers';

function PresentationRequest() {
    let schema = 'ES63gXI-FmM6yQ7ISVIH__hOEhyE6W6-Ev0cArldsxuc';
    let schemaOptions = [
        {
            value: 'ES63gXI-FmM6yQ7ISVIH__hOEhyE6W6-Ev0cArldsxuc',
            label: 'GLEIF vLEI Credential',
        },
        {
            value: 'E-_XCbf1LJ0v9CR7g-_gOknf5dpoZROgF7qG5T8mXCv8',
            label: 'Qualified vLEI Issuer vLEI Credential',
        },
        {
            value: 'EJEY6JAAVfAh8-yBTV37rHaJ9b_VKvkZunz_oJupzsvQ',
            label: 'Legal Entity vLEI Credential',
        },
        {
            value: 'E3n2Od38xMVDoM6Km-Awse_Cw9z0RtUJN-j0MQo642xw',
            label: 'Legal Entity Official Organizational Role vLEI Credential',
        },
        {
            value: 'EmaEqu_zIkxXKsrNJFTJq_s2c96McS8yzHhcvYDW8u5A',
            label: 'Legal Entity Engagement Context Role vLEI Credential',
        },
    ];
    let isSubmitting = false;

    function getLabelForSchema(schemaValue) {
        return schemaOptions.filter((option) => option.value === schemaValue)[0].label;
    }

    function handleSubmit(e) {
        e.preventDefault();
        isSubmitting = true;
        xhring
            .presentationRequest({
                schema: schema,
                recipient: 'EpXprWFWmvJx4dP7CqDyXRgoigTVFwEUh6i-6jUCcoU8',
            })
            .then((res) => {
                isSubmitting = false;
                toaster.success(`Request succeeded for ${getLabelForSchema(schema)}`);
            })
            .catch((err) => {
                isSubmitting = false;
                toaster.error(`Request failed for ${getLabelForSchema(schema)}`);
                console.log('caught', err);
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
