import m from 'mithril';
import mq from 'mithril-query';
import xhring from '../../helpers/xhring';
import Settings from '../../pages/Settings';

describe('Settings component', () => {
    let identifiersSpy;

    beforeEach(() => {
        identifiersSpy = jest.spyOn(xhring, 'identifiers').mockImplementation(() => {
            return new Promise((resolve, reject) => {
                resolve([]); // TODO: Resolve mock response
            });
        });
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });
    it('Should create', () => {
        let out = mq(m(Settings));
        expect(out).toBeTruthy();
    });
    it('Should call xhring.identifiers once in oninit', () => {
        let controller = new Settings();
        controller.oninit();
        expect(identifiersSpy).toHaveBeenCalledTimes(1);
    });
});
