import m from 'mithril';
import mq from 'mithril-query';
import Footer from '../../components/Footer';

describe('Footer component', () => {
  it('Should render vnode.children', () => {
    let out = mq(m(Footer, m('p', 'test')));
    let container = out.first('div');
    expect(container.innerHTML).toContain('<p>test</p>');
  })
});
