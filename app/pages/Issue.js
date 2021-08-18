import m from 'mithril';
import Container from '../components/Container';
import Tile from '../components/Tile';
import {Col, Grid, Intent} from "construct-ui";
import * as partials from './Issue/Partials';

function Issue() {
    const gridAttrs = {gutter: {xs: 0, sm: 10, md: 20, lg: 30, xl: 40}};
    const colAttrs = {span: {xs: 12, md: 4}, style: {"margin-top": "16px", "margin-bottom": "16px"}};
    const cardAttrs = {fluid: true};
    const cell = '.cui-example-grid-col';

    return {
        view: function () {
            return m(Container, {},
                m(Grid, gridAttrs, [
                    m(Col, colAttrs, m(cell, m(Tile, {title: "Credential Schema", ...cardAttrs}, m(partials.Help)))),
                    m(Col, colAttrs, m(cell, m(Tile, {
                        title: "GLEIF vLEI Credential",
                        intent: Intent.PRIMARY, ...cardAttrs
                    }, m(partials.GLEIFvLEICredential)))),
                    m(Col, colAttrs, m(cell, m(Tile, {
                        title: "Qualified vLEI Issuer vLEI Credential",
                        intent: Intent.PRIMARY, ...cardAttrs
                    }, m(partials.QualifiedvLEIIssuervLEICredential)))),
                    m(Col, colAttrs, m(cell, m(Tile, {
                        title: "Legal Entity vLEI Credential",
                        intent: Intent.PRIMARY, ...cardAttrs
                    }, m(partials.LegalEntityvLEICredential)))),
                    m(Col, colAttrs, m(cell, m(Tile, {
                        title: "Legal Entity Official Organizational Role vLEI Credential",
                        intent: Intent.PRIMARY, ...cardAttrs
                    }, m(partials.LegalEntityOfficialOrganizationalRolevLEICredential)))),
                    m(Col, colAttrs, m(cell, m(Tile, {
                        title: "Legal Entity Engagement Context Role vLEI Credential",
                        intent: Intent.PRIMARY, ...cardAttrs
                    }, m(partials.LegalEntityEngagementContextRolevLEICredential)))),
                ]),
            )
        }
    };
}

module.exports = Issue;
