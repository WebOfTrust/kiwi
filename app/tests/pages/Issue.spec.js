import m from 'mithril';
import mq from 'mithril-query';
import xhring from '../../helpers/xhring';
import Issue from '../../pages/Issue';

describe('Issue component', () => {
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
        let out = mq(m(Issue));
        expect(out).toBeTruthy();
    });
    it('Should call xhring.multisig once in oninit', () => {
        let controller = new Issue();
        controller.oninit();
        expect(credentialsSpy).toHaveBeenCalledTimes(1);
    });
});
