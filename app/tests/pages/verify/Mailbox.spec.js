import m from 'mithril';
import mq from 'mithril-query';
import Mailbox from '../../../pages/verify/Mailbox';

describe('Mailbox component', () => {
    beforeAll(() => {
        global.EventSource = jest.fn().mockImplementation(() => {
            return {
                addEventListener: jest.fn(),
                onerror: jest.fn(),
                close: jest.fn(),
                onmessage: jest.fn(),
                onopen: jest.fn(),
                url: 'test-url',
                readyState: 0,
                withCredentials: false,
                CLOSED: 2,
                CONNECTING: 0,
                OPEN: 1,
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn(),
            };
        });
    });
    it('Should create', () => {
        let comp = mq(m(Mailbox));
        expect(comp).toBeTruthy();
    });
});
