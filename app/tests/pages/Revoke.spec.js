import m from 'mithril';
import mq from 'mithril-query';
import Revoke from '../../pages/Revoke';

describe('Revoke component', () => {
    it('Should create', () => {
        let out = mq(m(Revoke));
        expect(out).toBeTruthy();
    });
});
