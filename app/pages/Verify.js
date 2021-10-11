import m from 'mithril';
import { Col, Grid, Intent } from 'construct-ui';
import { Container, Tile } from '../components';
import { PresentationRequest } from './verify';
import { PresentationRequestList } from './wallet';
import { mailbox } from '../helpers';

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
                    m(
                        Col,
                        colAttrs,
                        m(
                            Tile,
                            {
                                title: 'Presentation Requests',
                                intent: Intent.PRIMARY,
                            },
                            m(PresentationRequestList, {
                                msgs: mailbox.presentations,
                                emptyStateHeader: 'No requests',
                            })
                        )
                    ),
                ])
            );
        },
    };
}

module.exports = Verify;
