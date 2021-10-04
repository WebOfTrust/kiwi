import m from 'mithril';
import mq from 'mithril-query';
import PortInput from '../../components/PortInput';

describe('PortInput component', () => {
    it('Should create', () => {
        let out = mq(m(PortInput, m('p', 'test')));
        expect(out).toBeTruthy();
    });
});
