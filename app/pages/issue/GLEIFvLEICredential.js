import m from 'mithril';
import { Button, Callout, Classes, Form, FormGroup, FormLabel, Icon, Icons, Input } from 'construct-ui';
import { Container } from '../../components';
import { toaster, xhring } from '../../helpers';

class GLEIFvLEICredential {
    constructor() {
        this.schemaSAID = 'E7brwlefuH-F_KU_FPWAZR78A3pmSVDlnfJUqnm8Lhr4';
        this.lei = '506700GE1G29325QX363';
        this.isSubmitting = false;
    }

    handleSubmit(e = null) {
        if (e) {
            e.preventDefault();
        }
        this.isSubmitting = true;
        xhring
            .exnRequest({
                credentialData: {
                    LEI: this.lei,
                },
                schema: this.schemaSAID,
                type: 'GLEIFvLEICredential',
                registry: 'gleif',
                recipient: 'EpXprWFWmvJx4dP7CqDyXRgoigTVFwEUh6i-6jUCcoU8',
            })
            .then((res) => {
                this.isSubmitting = false;
                toaster.success('GLEIFvLEICredential issued');
            })
            .catch((err) => {
                this.isSubmitting = false;
                console.log('caught', err);
                toaster.error('Failed to issue GLEIFvLEICredential');
            });
    }

    view() {
        return m(Container, { style: { padding: '16px' } }, [
            m(Callout, {
                content: 'The vLEI Credential issued to GLEIF',
            }),
            m(
                Form,
                {
                    gutter: 16,
                    onsubmit: (e) => this.handleSubmit(e),
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
                        loading: this.isSubmitting,
                    }),
                ])
            ),
        ]);
    }
}

module.exports = GLEIFvLEICredential;
