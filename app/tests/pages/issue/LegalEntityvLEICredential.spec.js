import m from 'mithril';
import mq from 'mithril-query';
import xhring from '../../../helpers/xhring';
import LegalEntityvLEICredential from '../../../pages/issue/LegalEntityvLEICredential';
import { LEGAL_ENTITY_CREDENTIAL_ISSUE_RESPONSE } from '../../mocks';

describe('LegalEntityvLEICredential component', () => {
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
                resolve(LEGAL_ENTITY_CREDENTIAL_ISSUE_RESPONSE);
            });
        });
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });
    it('Should create', () => {
        let out = mq(
            m(LegalEntityvLEICredential, {
                qualifiedvLEIIssuerCred: fakeQVICred,
            })
        );
        expect(out).toBeTruthy();
    });
    it('Should call xhring.exnRequest once in handleSubmit', () => {
        let controller = new LegalEntityvLEICredential();
        controller.handleSubmit(null, fakeQVICred);
        expect(exnRequestSpy).toHaveBeenCalledTimes(1);
    });
});
