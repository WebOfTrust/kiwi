import m from 'mithril';
import mq from 'mithril-query';
import PresentationRequest from '../../../pages/verify/PresentationRequest';

describe('PresentationRequest component', () => {
    it('Should create', () => {
        let out = mq(m(PresentationRequest));
        expect(out).toBeTruthy();
    });
    it('Should initialize select with "GLEIF vLEI Credential" option selected', () => {
        let out = mq(m(PresentationRequest));
        let selected = out.first('option[selected]');
        expect(selected.text).toBe('GLEIF vLEI Credential');
    });
});
