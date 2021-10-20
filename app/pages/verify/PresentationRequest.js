import m from 'mithril';
import { Button, Classes, Form, FormGroup, FormLabel, Icon, Icons, Input, Select } from 'construct-ui';
import { Container } from '../../components';
import {AddressBook, toaster, xhring} from '../../helpers';

function PresentationRequest() {
    let schema = 'ES63gXI-FmM6yQ7ISVIH__hOEhyE6W6-Ev0cArldsxuc';
    let defaultRecipient = Object.keys(AddressBook.book).find((key) => {
        return AddressBook.get(key) === "ACME Corp. (Legal Entity)";
    });


    let recipient = defaultRecipient;
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
            value: 'EC9rQ-xi_3cRrjANStL6tn6Kn4Z444r9rvTr_Vfi-750',
            label: 'Legal Entity vLEI Credential',
        },
        {
            value: 'EFBMQwQ1fv_bEBpqrom0EHLytFZiP5tWAs5HUpaa-WUg',
            label: 'Legal Entity Official Organizational Role vLEI Credential',
        },
        {
            value: 'EMNumLS-O9ScGskk8h4xHvoiAeQf-CDW6KU3LoDUiz3o',
            label: 'Legal Entity Engagement Context Role vLEI Credential',
        },
    ];
    let isSubmitting = false;

    function getLabelForSchema(schemaValue) {
        return schemaOptions.filter((option) => option.value === schemaValue)[0].label;
    }

    function handleSubmit(e) {
        if (recipient === '') {
            toaster.warning('Recipient is required.');
            return;
        }
        e.preventDefault();
        isSubmitting = true;
        xhring
            .presentationRequest({
                schema: schema,
                recipient: recipient,
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
                        m(
                            FormGroup,
                            m(FormLabel, { for: 'holer' }, 'Holder'),
                            m(Select, {
                                contentLeft: m(Icon, { name: Icons.USER }),
                                id: 'holder',
                                name: 'holder',
                                fluid: true,
                                options: Object.keys(AddressBook.book).map((key) => {
                                    return {
                                        label: `${AddressBook.get(key)} (${key})`,
                                        value: key,
                                    };
                                }),
                                defaultValue: defaultRecipient,
                                onchange: (e) => {
                                    recipient = e.target.value;
                                },
                            })
                        ),
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
