import m from 'mithril';
import mq from 'mithril-query';
import Identifier from '../../../pages/settings/Identifier';

describe('Identifier component', () => {
    it('Should create', () => {
        let out = mq(m(Identifier));
        expect(out).toBeTruthy();
    });
});
