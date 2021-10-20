import m from 'mithril';
import {Table, Col, Grid, Intent} from 'construct-ui';
import {Container, Tile} from '../components';
import {IdentifierList} from './settings';
import {AddressBook, xhring} from '../helpers';

function Settings() {
    const gridAttrs = {gutter: {xs: 0, sm: 8, md: 16, lg: 32, xl: 32}};
    const colAttrs = {span: 7, style: {margin: '16px 0'}};
    const smColAttrs = {span: 5, style: {margin: '16px 0'}};
    let identifiers = [];

    function loadIdentifiers() {
        xhring
            .identifiers()
            .then((res) => {
                identifiers = res;
            })
            .catch((err) => {
                console.log('caught', err);
            });
        m.redraw();
    }

    return {
        oninit: function () {
            loadIdentifiers();
        },

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
                                title: 'Identifier',
                                intent: Intent.PRIMARY,
                            },
                            m(IdentifierList, {
                                identifiers: identifiers,
                                loadIdentifiers: loadIdentifiers,
                                emptyStateHeader: 'No Identifiers',
                            })
                        )
                    ),
                    m(
                        Col,
                        smColAttrs,
                        m(
                            Tile,
                            {
                                title: 'Address Book',
                                intent: Intent.PRIMARY,
                            },
                            m(
                                Container,
                                {
                                    style: {
                                        padding: '16px',
                                        position: 'relative',
                                        minHeight: '150px',
                                    },
                                },
                                m(Table, {
                                    bordered: this.bordered,
                                    interactive: this.interactive,
                                    striped: this.striped
                                }, [
                                    m('tr', [
                                        m('th', 'Name (Role)'),
                                        m('th', 'AID')
                                    ]),
                                    Object.keys(AddressBook.book).map((key) => {
                                        return m('tr', [
                                            m('td', `${AddressBook.get(key)}`),
                                            m('td', key)
                                        ])
                                    }),
                                ])
                            )
                        )
                    )
                ])
            );
        },
    };
}

module.exports = Settings;
