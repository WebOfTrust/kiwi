import m from 'mithril';
import mq from 'mithril-query';
import LegalEntityvLEICredential from '../../../pages/issue/LegalEntityvLEICredential';

describe('LegalEntityvLEICredential component', () => {
    it('Should create', () => {
        let out = mq(m(LegalEntityvLEICredential));
        expect(out).toBeTruthy();
    });
});
