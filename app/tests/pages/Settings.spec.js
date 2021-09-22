import m from 'mithril';
import mq from 'mithril-query';
import Settings from '../../pages/Settings';

describe('Settings component', () => {
    beforeAll(() => {
        jest.spyOn(Settings.prototype, 'loadIdentifiers').mockImplementation(() => {});
    });
    afterAll(() => {
        jest.restoreAllMocks();
    });
    it('Should create', () => {
        let out = mq(m(Settings));
        expect(out).toBeTruthy();
    });
});
