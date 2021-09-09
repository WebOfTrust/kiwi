import m from 'mithril';
import mq from 'mithril-query';
import Settings from '../../pages/Settings';

describe('Settings component', () => {
    it('Should create', () => {
        let out = mq(m(Settings));
        expect(out).toBeTruthy();
    });
});
