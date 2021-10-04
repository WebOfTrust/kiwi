import m from 'mithril';
import { Select } from 'construct-ui';

import { UserTypes } from '../helpers';

function UserTypeInput() {
    return {
        view: (vnode) => {
            return m(Select, {
                options: UserTypes.USER_TYPES.map((type) => {
                    return {
                        label: `${UserTypes.toDisplay(type)}`,
                        value: type,
                    };
                }),
                defaultValue: UserTypes.selectedType,
                onchange: (e) => {
                    let newType = e.currentTarget.value;
                    UserTypes.setUserType(newType);
                    m.route.set(vnode.attrs.defaultRoute);
                },
            });
        },
    };
}

module.exports = UserTypeInput;
