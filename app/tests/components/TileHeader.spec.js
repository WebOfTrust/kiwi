import m from 'mithril';
import mq from 'mithril-query';
import { Colors, Intent } from 'construct-ui';
import TileHeader from '../../components/TileHeader';

describe('TileHeader component', () => {
    it('Should create', () => {
        let out = mq(
            m(TileHeader, {
                title: 'Test title',
                intent: Intent.PRIMARY,
            })
        );
        expect(out).toBeTruthy();
    });
    it('Should render "title" from vnode attrs', () => {
        let out = mq(
            m(TileHeader, {
                title: 'Test title',
                intent: Intent.PRIMARY,
            })
        );
        let tileHeaderDiv = out.first('.tileHeader');
        expect(tileHeaderDiv.innerHTML).toBe('Test title');
    });
    it('Should render as different color based off of "intent" vnode attr', () => {
        let out1 = mq(
            m(TileHeader, {
                title: 'TileHeader 1',
                intent: Intent.PRIMARY,
            })
        );
        let tileHeader1Div = out1.first('.tileHeader');

        let out2 = mq(
            m(TileHeader, {
                title: 'TileHeader 2',
                intent: 'other',
            })
        );
        let tileHeader2Div = out2.first('.tileHeader');

        expect(tileHeader1Div.style['background']).toBe(process.env.PRIMARY_COLOR);
        expect(tileHeader1Div.style['color']).toBe(Colors.WHITE);
        expect(tileHeader2Div.style['background']).toBe(Colors.GREY200);
        expect(tileHeader2Div.style['color']).toBe(process.env.PRIMARY_COLOR);
    });
});
