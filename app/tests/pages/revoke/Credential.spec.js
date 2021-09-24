import m from 'mithril';
import mq from 'mithril-query';
import Credential from '../../../pages/revoke/Credential';

describe('Credential component', () => {
    it('Should create', () => {
        let out = mq(m(Credential));
        expect(out).toBeTruthy();
    });
});
