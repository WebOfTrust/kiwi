import m from 'mithril';
import mq from 'mithril-query';
import Group from '../../pages/Group';

describe('Group component', () => {
    beforeAll(() => {
        jest.spyOn(Group.prototype, 'loadGroups').mockImplementation(() => {});
    });
    afterAll(() => {
        jest.restoreAllMocks();
    });
    it('Should create', () => {
        let out = mq(m(Group));
        expect(out).toBeTruthy();
    });
});
