import m from 'mithril';
import mq from 'mithril-query';
import xhring from '../../../helpers/xhring';
import QualifiedvLEIIssuervLEICredential from '../../../pages/issue/QualifiedvLEIIssuervLEICredential';
import { QVI_CREDENTIAL_ISSUE_RESPONSE } from '../../mocks';

describe('QualifiedvLEIIssuervLEICredential component', () => {
    let exnRequestSpy;

    beforeAll(() => {
        exnRequestSpy = jest.spyOn(xhring, 'exnRequest').mockImplementation(() => {
            return new Promise((resolve, reject) => {
                resolve(QVI_CREDENTIAL_ISSUE_RESPONSE);
            });
        });
    });
    afterAll(() => {
        jest.restoreAllMocks();
    });
    it('Should create', () => {
        let out = mq(m(QualifiedvLEIIssuervLEICredential));
        expect(out).toBeTruthy();
    });
    it('Should call xhring.exnRequest once in handleSubmit', () => {
        let controller = new QualifiedvLEIIssuervLEICredential();
        controller.handleSubmit();
        expect(exnRequestSpy).toHaveBeenCalledTimes(1);
    });
});
