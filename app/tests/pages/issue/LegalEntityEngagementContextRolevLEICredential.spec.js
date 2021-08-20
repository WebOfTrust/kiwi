import m from 'mithril';
import mq from 'mithril-query';
import LegalEntityEngagementContextRolevLEICredential from '../../../pages/issue/LegalEntityEngagementContextRolevLEICredential';

describe('LegalEntityEngagementContextRolevLEICredential component', () => {
    it('Should create', () => {
        let out = mq(m(LegalEntityEngagementContextRolevLEICredential));
        expect(out).toBeTruthy();
    });
});
