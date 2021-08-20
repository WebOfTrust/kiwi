import m from 'mithril';
import mq from 'mithril-query';
import RevokedCredentials from '../../../pages/revoke/RevokedCredentials';

describe('RevokedCredentials component', () => {
    it('Should create', () => {
        let out = mq(m(RevokedCredentials));
        expect(out).toBeTruthy();
    });
});
