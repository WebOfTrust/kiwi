import m from 'mithril';
import mq from 'mithril-query';
import xhring from '../../helpers/xhring';
import GetStarted from '../../pages/GetStarted';

describe('GetStarted component', () => {
    let applySpy;

    beforeEach(() => {
        applySpy = jest.spyOn(xhring, 'apply').mockImplementation(() => {
            return new Promise((resolve, reject) => {
                resolve([]); // TODO: Resolve mock response
            });
        });
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });
    it('Should create', () => {
        let out = mq(m(GetStarted));
        expect(out).toBeTruthy();
    });
    it('Should call xhring.apply once in handleSubmit', () => {
        let controller = new GetStarted();
        controller.handleSubmit();
        expect(applySpy).toHaveBeenCalledTimes(1);
    });
});
