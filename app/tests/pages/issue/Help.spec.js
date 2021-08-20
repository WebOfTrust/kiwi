import m from 'mithril';
import mq from 'mithril-query';
import Help from '../../../pages/issue/Help';

describe('Help component', () => {
    it('Should create', () => {
        let out = mq(m(Help));
        expect(out).toBeTruthy();
    });
});
