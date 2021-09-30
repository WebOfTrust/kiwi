import m from 'mithril';
import { EmptyState } from 'construct-ui';
import { Container } from '../../components';
import { PresentationRequest } from './index';

function PresentationRequestList() {
    return {
        view: function (vnode) {
            return m(
                Container,
                {
                    style: {
                        padding: '16px',
                        position: 'relative',
                        minHeight: '150px',
                        maxHeight: '600px',
                        overflowY: 'auto',
                    },
                },
                vnode.attrs.msgs && vnode.attrs.msgs.length > 0
                    ? vnode.attrs.msgs.map((msg) =>
                          m(PresentationRequest, {
                              cred: msg,
                              isRevoked: vnode.attrs.isRevoked,
                              revokeCredential: vnode.attrs.revokeCredential,
                              isWallet: vnode.attrs.isWallet,
                          })
                      )
                    : m(EmptyState, {
                          header: vnode.attrs.emptyStateHeader,
                          fill: true,
                      })
            );
        },
    };
}

module.exports = PresentationRequestList;
