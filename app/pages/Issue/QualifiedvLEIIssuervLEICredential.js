import m from 'mithril';
import {Button, Callout, Classes, Colors, Form, FormGroup, FormLabel, Icon, Icons, Input} from "construct-ui";
import Container from "../../components/Container";
import xhring from "../../helpers/xhring";

function QualifiedvLEIIssuervLEICredential() {
    const schemaSAID = "E9bX8Do0nb1Eq986HvoJ2iNO00TjC6J_2En8Du9L-hYU";
    let isSubmitting = false;
    let lei = '';

    function handleSubmit(e) {
        e.preventDefault();
        return xhring.exnRequest({
            "LEI": lei,
            "schema": schemaSAID,
            "type": "QualifiedvLEIIssuervLEICredential"
        }).then(function (res) {
            return xhring.agentPost(res['date'], res['attachment'], res['d'])
        }).catch(function (err) {
            console.log("caught", err)
        })
    }

    return {
        view: function () {
            return m('', {style: {paddingTop: "16px"}},
                m(Container,
                    m(Callout, {
                        content: "A vLEI Credential issued by GLEIF to Qualified vLEI Issuers which allows the Qualified vLEI Issuers to issue, verify and revoke Legal Entity vLEI Credentials and Legal Entity Official Organizational Role vLEI Credentials"
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
                            fluid: true,
                            value: '254900OPPU84GM83MG36',
                            readOnly: true
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

module.exports = QualifiedvLEIIssuervLEICredential;
