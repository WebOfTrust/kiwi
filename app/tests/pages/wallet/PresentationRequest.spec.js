import m from 'mithril';
import mq from 'mithril-query';
import PresentationRequest from '../../../pages/wallet/PresentationRequest';

describe('PresentationRequest component', () => {
    it('Should create', () => {
        let out = mq(
            m(PresentationRequest, {
                msg: {
                    vc: {
                        d: {
                            type: 'LegalEntityEngagementContextRolevLEICredential',
                        },
                    },
                },
            })
        );
        expect(out).toBeTruthy();
    });
});
