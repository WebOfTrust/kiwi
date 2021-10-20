import m from 'mithril';
import {
    Button,
    Callout,
    Classes,
    Col,
    Form,
    FormGroup,
    FormLabel,
    Grid,
    Icon,
    Icons,
    Input,
    Intent,
} from 'construct-ui';
import { Container, Tile } from '../components';
import {AddressBook, toaster, xhring} from '../helpers';

function GetStarted() {
    const gridAttrs = { gutter: { xs: 0, sm: 8, md: 16, lg: 32, xl: 32 } };
    const colAttrs = { span: { xs: 12, md: 6 }, style: { margin: '16px 0' } };

    const schemaSAID = 'E-_XCbf1LJ0v9CR7g-_gOknf5dpoZROgF7qG5T8mXCv8';
    const issuer = process.env.GLEIF_IDENTIFIER;
    let lei = '254900OPPU84GM83MG36';

    let isSubmitting = false;

    function handleSubmit(e = null) {
        if (e) {
            e.preventDefault();
        }
        isSubmitting = true;
        xhring
            .apply({
                schema: schemaSAID,
                type: 'QualifiedvLEIIssuervLEICredential',
                issuer: issuer,
                values: {
                    LEI: lei,
                },
            })
            .then((res) => {
                isSubmitting = false;
                toaster.success('Get started!');
            })
            .catch((err) => {
                isSubmitting = false;
                console.log('caught', err);
                toaster.error('Failed to submit application');
            });
    }

    return {
        handleSubmit,
        view: function () {
            return m(
                Container,
                m(Grid, gridAttrs, [
                    m(
                        Col,
                        colAttrs,
                        m(
                            Tile,
                            {
                                title: 'Get started with your Qualified vLEI Issuer vLEI Credential',
                                intent: Intent.PRIMARY,
                            },
                            m(Container, { style: { padding: '16px' } }, [
                                m(Callout, {
                                    content:
                                        'A vLEI Credential issued by GLEIF to Qualified vLEI Issuers which allows the Qualified vLEI Issuers to issue, verify and revoke Legal Entity vLEI Credentials and Legal Entity Official Organizational Role vLEI Credentials',
                                }),
                                m(
                                    Form,
                                    {
                                        gutter: 16,
                                        onsubmit: (e) => handleSubmit(e),
                                        style: { marginTop: '16px' },
                                    },
                                    m(
                                        FormGroup,
                                        m(FormLabel, { for: 'lei' }, 'LEI'),
                                        m(Input, {
                                            contentLeft: m(Icon, { name: Icons.HASH }),
                                            id: 'lei',
                                            name: 'lei',
                                            fluid: true,
                                            readOnly: true,
                                            defaultValue: lei,
                                            oninput: (e) => {
                                                lei = e.target.value;
                                            },
                                        })
                                    ),
                                    m(FormGroup, { class: Classes.ALIGN_RIGHT }, [
                                        m(Button, {
                                            type: 'submit',
                                            label: 'Get Started',
                                            intent: 'primary',
                                        }),
                                    ])
                                ),
                            ])
                        )
                    ),
                ])
            );
        },
    };
}

module.exports = GetStarted;
