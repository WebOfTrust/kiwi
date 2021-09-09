import m from 'mithril';
import { EmptyState, Icons } from 'construct-ui';
import { Container } from '../../components';
import Identifier from './Identifier';

function IdentifierList() {
    return {
        view: function (vnode) {
            if (!vnode.attrs.identifiers) {
                return null;
            }
            return m(
                Container,
                {
                    style: {
                        padding: '16px',
                        position: 'relative',
                        minHeight: '150px',
                    },
                },
                vnode.attrs.identifiers.length > 0
                    ? vnode.attrs.identifiers.map((identifier) =>
                          m(Identifier, {
                              identifier,
                          })
                      )
                    : m(EmptyState, {
                          header: vnode.attrs.emptyStateHeader,
                          fill: true,
                          icon: Icons.USERS,
                          content: [],
                      })
            );
        },
    };
}

module.exports = IdentifierList;
