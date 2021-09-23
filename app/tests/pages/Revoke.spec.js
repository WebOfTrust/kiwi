import m from 'mithril';
import mq from 'mithril-query';
import xhring from '../../helpers/xhring';
import Revoke from '../../pages/Revoke';

describe('Revoke component', () => {
    beforeAll(() => {
        jest.spyOn(xhring, 'credentials').mockImplementation(() => {
            return new Promise((resolve, reject) => {
                resolve([]); // TODO: Resolve mock response
            });
        });
    });
    afterAll(() => {
        jest.restoreAllMocks();
    });
    it('Should create', () => {
        let out = mq(m(Revoke));
        expect(out).toBeTruthy();
    });
});
