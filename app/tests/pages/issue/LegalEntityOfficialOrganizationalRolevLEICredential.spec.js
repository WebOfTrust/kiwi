import m from 'mithril';
import mq from 'mithril-query';
import xhring from '../../../helpers/xhring';
import LegalEntityOfficialOrganizationalRolevLEICredential from '../../../pages/issue/LegalEntityOfficialOrganizationalRolevLEICredential';
import { OOR_CREDENTIAL_ISSUE_RESPONSE } from '../../mocks';

describe('LegalEntityOfficialOrganizationalRolevLEICredential component', () => {
    let exnRequestSpy;

    beforeAll(() => {
        exnRequestSpy = jest.spyOn(xhring, 'exnRequest').mockImplementation(() => {
            return new Promise((resolve, reject) => {
                resolve(OOR_CREDENTIAL_ISSUE_RESPONSE);
            });
        });
    });
    afterAll(() => {
        jest.restoreAllMocks();
    });
    it('Should create', () => {
        let out = mq(m(LegalEntityOfficialOrganizationalRolevLEICredential));
        expect(out).toBeTruthy();
    });
    it('Should call xhring.exnRequest once in handleSubmit', () => {
        let controller = new LegalEntityOfficialOrganizationalRolevLEICredential();
        controller.handleSubmit();
        expect(exnRequestSpy).toHaveBeenCalledTimes(1);
    });
});
