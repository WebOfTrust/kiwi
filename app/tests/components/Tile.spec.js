import m from 'mithril';
import mq from 'mithril-query';
import { Colors, Intent } from 'construct-ui';
import Tile from '../../components/Tile';

describe('Tile component', () => {
    let attrs = {
        title: 'Tile title',
        intent: Intent.PRIMARY,
    };
    let out;
    let tileHeader;

    beforeEach(() => {
        out = mq(m(Tile, attrs, m('p', 'Tile content')));
        tileHeader = out.first('.tileHeader');
    });

    it('Should create', () => {
        expect(out).toBeTruthy();
    });
    it('Should pass "title" vnode attr to TileHeader', () => {
        expect(tileHeader.innerHTML).toContain(attrs.title);
    });
    it('Should pass "intent" vnode attr to TileHeader', () => {
        expect(tileHeader.style['background']).toBe(Colors.INDIGO400);
    });
    it('Should render vnode.children', () => {
        expect(out.rootEl.innerHTML).toContain('<p>Tile content</p>');
    });
});
