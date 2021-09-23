import m from 'mithril';
import mq from 'mithril-query';
import xhring from '../../helpers/xhring';
import Group from '../../pages/Group';

describe('Group component', () => {
    beforeAll(() => {
        jest.spyOn(xhring, 'multisig').mockImplementation(() => {
            return new Promise((resolve, reject) => {
                resolve([]); // TODO: Resolve mock response
            });
        });
    });
    afterAll(() => {
        jest.restoreAllMocks();
    });
    it('Should create', () => {
        let out = mq(m(Group));
        expect(out).toBeTruthy();
    });
});
