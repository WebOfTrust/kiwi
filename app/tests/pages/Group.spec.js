import m from 'mithril';
import mq from 'mithril-query';
import Group from '../../pages/Group';

describe('Group component', () => {
    it('Should create', () => {
        let out = mq(m(Group));
        expect(out).toBeTruthy();
    });
});
