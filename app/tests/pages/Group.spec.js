import m from 'mithril';
import mq from 'mithril-query';
import xhring from '../../helpers/xhring';
import Group from '../../pages/Group';

describe('Group component', () => {
    let multisigSpy;

    beforeEach(() => {
        multisigSpy = jest.spyOn(xhring, 'multisig').mockImplementation(() => {
            return new Promise((resolve, reject) => {
                resolve([]); // TODO: Resolve mock response
            });
        });
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });
    it('Should create', () => {
        let out = mq(m(Group));
        expect(out).toBeTruthy();
    });
    it('Should call xhring.multisig once in oninit', () => {
        let controller = new Group();
        controller.oninit();
        expect(multisigSpy).toHaveBeenCalledTimes(1);
    });
});
