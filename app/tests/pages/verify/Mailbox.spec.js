import m from 'mithril';
import mq from 'mithril-query';
import Mailbox from '../../../pages/Mailbox';

describe('Mailbox component', () => {
    it('Should create', () => {
        let out = mq(m(Mailbox));
        expect(out).toBeTruthy();
    });
});
