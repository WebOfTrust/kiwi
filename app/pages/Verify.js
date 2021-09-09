import m from 'mithril';
import { Col, Grid, Intent } from 'construct-ui';
import { Container, Tile } from '../components';
import { PresentationRequest } from './verify';

function Verify() {
    const gridAttrs = { gutter: { xs: 0, sm: 8, md: 16, lg: 32, xl: 32 } };
    const colAttrs = { span: { xs: 12, md: 6 }, style: { margin: '16px 0' } };

    return {
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
                                title: 'Presentation Request',
                                intent: Intent.PRIMARY,
                            },
                            m(PresentationRequest)
                        )
                    ),
                ])
            );
        },
    };
}

module.exports = Verify;
