import m from 'mithril';
import mq from 'mithril-query';
import GroupList from '../../../pages/group/GroupList';

describe('GroupList component', () => {
    it('Should create', () => {
        let out = mq(m(GroupList));
        expect(out).toBeTruthy();
    });
});
