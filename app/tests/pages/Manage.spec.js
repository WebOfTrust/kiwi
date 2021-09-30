import m from 'mithril';
import mq from 'mithril-query';
import xhring from '../../helpers/xhring';
import { Manage } from '../../pages';

describe('Manage component', () => {
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
        let out = mq(m(Manage));
        expect(out).toBeTruthy();
    });
    it('Should call credentials on in oninit', () => {
        let controller = new Manage();
        controller.oninit();
        expect(credentialsSpy).toHaveBeenCalledTimes(2);
    });
});
