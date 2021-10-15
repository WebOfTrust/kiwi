import m from 'mithril';
import mq from 'mithril-query';
import xhring from '../../../helpers/xhring';
import GLEIFvLEICredential from '../../../pages/issue/GLEIFvLEICredential';
import { GLEIF_CREDENTIAL_ISSUE_RESPONSE } from '../../mocks';
import { AddressBook } from '../../../helpers';

describe('GLEIFvLEICredential component', () => {
    let exnRequestSpy;

    // probably a better way to mock this.
    AddressBook['EZNNZO-Sa41t-ps_jwOeeDmo2x_nPNavwOEl1QbN7O7s'] = {
        name: 'test',
    };

    beforeEach(() => {
        exnRequestSpy = jest.spyOn(xhring, 'exnRequest').mockImplementation(() => {
            return new Promise((resolve, reject) => {
                resolve(GLEIF_CREDENTIAL_ISSUE_RESPONSE);
            });
        });
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });
    it('Should create', () => {
        let out = mq(m(GLEIFvLEICredential));
        expect(out).toBeTruthy();
    });
    it('Should call xhring.exnRequest once in handleSubmit', () => {
        let controller = new GLEIFvLEICredential();
        controller.handleSubmit();
        expect(exnRequestSpy).toHaveBeenCalledTimes(1);
    });
});
