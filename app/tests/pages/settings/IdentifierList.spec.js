import m from 'mithril';
import mq from 'mithril-query';
import IdentifierList from '../../../pages/settings/IdentifierList';

describe('IdentifierList component', () => {
    it('Should create', () => {
        let out = mq(m(IdentifierList));
        expect(out).toBeTruthy();
    });
});
