import m from 'mithril';
import mq from 'mithril-query';
import CredentialList from '../../../pages/revoke/CredentialList';

describe('CredentialList component', () => {
    it('Should create', () => {
        let out = mq(m(CredentialList));
        expect(out).toBeTruthy();
    });
});
