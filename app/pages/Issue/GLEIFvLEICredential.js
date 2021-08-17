import m from 'mithril';
import {
    Button,
    Callout,
    Classes,
    Colors,
    Form,
    FormGroup,
    FormLabel,
    Icon,
    Icons,
    Input,
    Intent,
    Size,
    Toaster, ToasterPosition
} from "construct-ui";
import Container from "../../components/Container";
import xhring from "../../helpers/xhring";

function GLEIFvLEICredential() {
    const AppToaster = new Toaster();
    const schemaSAID = "E7brwlefuH-F_KU_FPWAZR78A3pmSVDlnfJUqnm8Lhr4";
    let isSubmitting = false;
    let lei = '';

    function handleSubmit() {
        return xhring.gaccRequest({
            "LEI": lei,
            "schema": schemaSAID,
            "type": "GLEIFvLEICredential"
        }).then(function (res) {
            return xhring.agentPost(res['date'], res['attachment'], res['d'])
        }).then(function () {
            console.log("toasting", AppToaster)
            AppToaster.show({
                message: `Timestamp: ${Date.now()}`,
                icon: Icons.CHECK,
                intent: Intent.POSITIVE,
                size: Size.DEFAULT,
                position: ToasterPosition.TOP,
                timeout: 3000,
                inline: true,
            });
            console.log("bar");
        }).catch(function (e) {
            //alert
            console.log("caught", e)
            AppToaster.show({
                message: `Timestamp: ${Date.now()}`,
                icon: Icons.ALERT_TRIANGLE,
                intent: Intent.NEGATIVE,
                size: Size.DEFAULT,
                position: ToasterPosition.TOP,
                timeout: 3000
            });
        })
    }

    function getEXN() {
        return xhring.gaccRequest({
            "LEI": lei,
            "schema": schemaSAID,
            "type": "GLEIFvLEICredential"
        })
    }

    function post(res) {
        return xhring.agentPost(res['date'], res['attachment'], res['d'])
    }

    return {
        view: function () {
            return m('', {style: {paddingTop: "16px"}},
                m(Container,
                    m(Callout, {
                        content: "The vLEI Credential issued to GLEIF"
                    })),
                m(Container, {style: {background: Colors.WHITE}}, m(Form, {
                        gutter: 15,
                        onsubmit: handleSubmit,
                        style: {paddingTop: "16px", paddingBottom: "16px"}
                    },
                    m(FormGroup, {style: {paddingBottom: "16px"}},
                        m(FormLabel, {for: 'lei'}, 'LEI'),
                        m(Input, {
                            contentLeft: m(Icon, {name: Icons.HASH}),
                            id: 'lei',
                            name: 'LEI',
                            readOnly: true,
                            fluid: true,
                            value: '506700GE1G29325QX363',
                        })
                    ),
                    m(FormGroup, {class: Classes.ALIGN_RIGHT}, [
                        m(Button, {
                            iconRight: Icons.CHEVRON_RIGHT,
                            type: 'submit',
                            label: 'Issue',
                            intent: 'primary',
                            loading: isSubmitting
                        })
                    ])
                ))
            )
        },
    }
}

module.exports = GLEIFvLEICredential;