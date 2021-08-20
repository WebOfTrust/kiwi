import m from 'mithril';
import mq from 'mithril-query';
import Recipient from '../../../pages/verify/Recipient';

describe('Recipient component', () => {
    it('Should create', () => {
        let comp = mq(m(Recipient));
        expect(comp).toBeTruthy();
    });
});
