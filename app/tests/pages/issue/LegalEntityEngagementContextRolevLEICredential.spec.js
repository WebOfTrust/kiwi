import m from 'mithril';
import mq from 'mithril-query';
import xhring from '../../../helpers/xhring';
import LegalEntityEngagementContextRolevLEICredential from '../../../pages/issue/LegalEntityEngagementContextRolevLEICredential';
import { ECR_CREDENTIAL_ISSUE_RESPONSE } from '../../mocks';

describe('LegalEntityEngagementContextRolevLEICredential component', () => {
    let exnRequestSpy;
    let fakeQVICred = {
        sad: {
            d: 'testing-d',
            i: 'testing-i',
        },
    };

    beforeEach(() => {
        exnRequestSpy = jest.spyOn(xhring, 'exnRequest').mockImplementation(() => {
            return new Promise((resolve, reject) => {
                resolve(ECR_CREDENTIAL_ISSUE_RESPONSE);
            });
        });
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });
    it('Should create', () => {
        let out = mq(
            m(LegalEntityEngagementContextRolevLEICredential, {
                qualifiedvLEIIssuerCred: fakeQVICred,
            })
        );
        expect(out).toBeTruthy();
    });
    it('Should call xhring.exnRequest once in handleSubmit', () => {
        let controller = new LegalEntityEngagementContextRolevLEICredential();
        controller.handleSubmit(null, fakeQVICred);
        expect(exnRequestSpy).toHaveBeenCalledTimes(1);
    });
});
