import m from 'mithril';
import mq from 'mithril-query';
import Identifier from '../../../pages/settings/Identifier';

describe('Identifier component', () => {
    it('Should create', () => {
        let out = mq(
            m(Identifier, {
                identifier: {
                    isith: 1,
                    public_keys: ['key'],
                    toad: 1,
                    witnesses: ['witness_1'],
                },
            })
        );
        expect(out).toBeTruthy();
    });
});
