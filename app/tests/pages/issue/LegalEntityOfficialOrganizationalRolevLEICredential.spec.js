import m from 'mithril';
import mq from 'mithril-query';
import LegalEntityOfficialOrganizationalRolevLEICredential from '../../../pages/issue/LegalEntityOfficialOrganizationalRolevLEICredential';

describe('LegalEntityOfficialOrganizationalRolevLEICredential component', () => {
    it('Should create', () => {
        let out = mq(m(LegalEntityOfficialOrganizationalRolevLEICredential));
        expect(out).toBeTruthy();
    });
});
