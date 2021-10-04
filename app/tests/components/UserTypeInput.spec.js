import m from 'mithril';
import mq from 'mithril-query';
import UserTypeInput from '../../components/UserTypeInput';

describe('UserTypeInput component', () => {
    it('Should create', () => {
        let out = mq(
            m(UserTypeInput, {
                defaultRoute: '/manage',
            })
        );
        expect(out).toBeTruthy();
    });
});
