import m from 'mithril';
import mq from 'mithril-query';
import xhring from '../../helpers/xhring';
import Settings from '../../pages/Settings';

describe('Settings component', () => {
    beforeAll(() => {
        jest.spyOn(xhring, 'identifiers').mockImplementation(() => {
            return new Promise((resolve, reject) => {
                resolve([]); // TODO: Resolve mock response
            });
        });
    });
    afterAll(() => {
        jest.restoreAllMocks();
    });
    it('Should create', () => {
        let out = mq(m(Settings));
        expect(out).toBeTruthy();
    });
});
