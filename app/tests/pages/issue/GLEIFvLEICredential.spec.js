import m from 'mithril';
import mq from 'mithril-query';
import GLEIFvLEICredential from '../../../pages/issue/GLEIFvLEICredential';

describe('GLEIFvLEICredential component', () => {
    it('Should create', () => {
        let out = mq(m(GLEIFvLEICredential));
        expect(out).toBeTruthy();
    });
});
