import m from 'mithril';
import mq from 'mithril-query';
import QualifiedvLEIIssuervLEICredential from '../../../pages/issue/QualifiedvLEIIssuervLEICredential';

describe('QualifiedvLEIIssuervLEICredential component', () => {
    it('Should create', () => {
        let out = mq(m(QualifiedvLEIIssuervLEICredential));
        expect(out).toBeTruthy();
    });
});
