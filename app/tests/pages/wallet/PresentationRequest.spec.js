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
                    sad: {
                        a: {
                            i: 'EyR75fE1ZmuCSfDwKPfbLowUWLqqi0ZX4502DLIo857Q',
                            t: ['mock', 'LegalEntityOfficialOrganizationalRolevLEICredential'],
                        },
                        p: [],
                    },
                    sigers: ['signature'],
                },
            })
        );
        expect(out).toBeTruthy();
    });
});
