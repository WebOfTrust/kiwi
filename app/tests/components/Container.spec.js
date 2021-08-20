import m from 'mithril';
import mq from 'mithril-query';
import Container from '../../components/Container';

describe('Container component', () => {
    it('Should create', () => {
        let out = mq(m(Container, m('p', 'test')));
        expect(out).toBeTruthy();
    });
    it('Should render vnode.children inside of container', () => {
        let out = mq(m(Container, m('p', 'test')));
        let containerDiv = out.first('div');
        expect(containerDiv.innerHTML).toBe('<p>test</p>');
    });
    it('Should accept styles passed from "style" vnode attr', () => {
        let out = mq(
            m(
                Container,
                {
                    style: {
                        position: 'relative',
                    },
                },
                m('p', 'test')
            )
        );
        let containerDiv = out.first('div');
        expect(containerDiv.style['position']).toBe('relative');
    });
});
