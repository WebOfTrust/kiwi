import m from 'mithril';
import mq from 'mithril-query';
import Verify from '../../pages/Verify';

describe('Verify component', () => {
    it('Should create', () => {
        let out = mq(m(Verify));
        expect(out).toBeTruthy();
    });
});
