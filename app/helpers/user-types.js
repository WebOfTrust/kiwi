import { storing } from './storing';

export default class UserTypes {
    // static selectedType = localStorage.getItem('userType') || 'developer';
    static selectedType = process.env.USER_TYPE;

    static USER_TYPES = ['developer', 'gleif', 'qvi', 'legal-entity', 'person', 'lei-data-user'];

    static toDisplay(type) {
        return (type.charAt(0).toUpperCase() + type.slice(1)).replace(/-/g, ' ');
    }

    static userTypeIn(arr) {
        return arr.includes(this.selectedType);
    }

    static getUserType() {
        return this.selectedType;
    }

    static setUserType(type) {
        this.selectedType = type;
        localStorage.setItem('userType', type);
    }
}
