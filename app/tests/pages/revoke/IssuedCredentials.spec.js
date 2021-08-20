import m from 'mithril';
import mq from 'mithril-query';
import IssuedCredentials from '../../../pages/revoke/IssuedCredentials';

describe('IssuedCredentials component', () => {
    it('Should create', () => {
        let out = mq(m(IssuedCredentials));
        expect(out).toBeTruthy();
    });
});
