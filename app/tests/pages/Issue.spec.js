import m from 'mithril';
import mq from 'mithril-query';
import Issue from '../../pages/Issue';

describe('Issue component', () => {
    it('Should create', () => {
        let out = mq(m(Issue));
        expect(out).toBeTruthy();
    });
});
