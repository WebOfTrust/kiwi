import m from 'mithril';
import mq from 'mithril-query';
import xhring from '../../helpers/xhring';
import Revoke from '../../pages/Revoke';

describe('Revoke component', () => {
    let credentialsSpy;
    beforeEach(() => {
        credentialsSpy = jest.spyOn(xhring, 'credentials').mockImplementation(() => {
            return new Promise((resolve, reject) => {
                resolve([]); // TODO: Resolve mock response
            });
        });
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });
    it('Should create', () => {
        let out = mq(m(Revoke));
        expect(out).toBeTruthy();
    });
    it('Should call xhring.credentials once in oninit', () => {
        let controller = new Revoke();
        controller.oninit();
        expect(credentialsSpy).toHaveBeenCalledTimes(1);
    });
});
