import m from 'mithril';
import { EmptyState } from 'construct-ui';
import { Container } from '../../components';
import Credential from './Credential';

function CredentialList() {
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
                vnode.attrs.credentials.length > 0
                    ? vnode.attrs.credentials.map((cred) =>
                          m(Credential, {
                              cred,
                              isRevoked: vnode.attrs.isRevoked,
                              revokeCredential: vnode.attrs.revokeCredential,
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

module.exports = CredentialList;
