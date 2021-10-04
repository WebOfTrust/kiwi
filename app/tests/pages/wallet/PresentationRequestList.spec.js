import m from 'mithril';
import mq from 'mithril-query';
import PresentationRequestList from '../../../pages/wallet/PresentationRequestList';

describe('PresentationRequestList component', () => {
    it('Should create', () => {
        let out = mq(m(PresentationRequestList));
        expect(out).toBeTruthy();
    });
});
