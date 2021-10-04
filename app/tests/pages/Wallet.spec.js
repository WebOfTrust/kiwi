import m from 'mithril';
import mq from 'mithril-query';
import Wallet from '../../pages/Wallet';

describe('Wallet component', () => {
    it('Should create', () => {
        let out = mq(m(Wallet));
        expect(out).toBeTruthy();
    });
});
