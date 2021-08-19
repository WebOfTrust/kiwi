import m from 'mithril';
import mq from 'mithril-query';
import Header from '../../components/Header';

describe('Header component', () => {
    it('Should render vnode.children', () => {
        let out = mq(m(Header, m('h1', 'test')));
        let container = out.first('div');
        expect(container.innerHTML).toContain('<h1>test</h1>');
    });
});
