export default class UserTypes {
    static selectedType = process.env.USER_TYPE;

    static DEVELOPER = 'developer';
    static GLEIF = 'gleif';
    static QVI = 'qvi';
    static LEGAL_ENTITY = 'legal-entity';
    static PERSON = 'person';
    static LEI_DATA_USER = 'lei-data-user';

    static USER_TYPES = [
        UserTypes.DEVELOPER,
        UserTypes.GLEIF,
        UserTypes.QVI,
        UserTypes.LEGAL_ENTITY,
        UserTypes.PERSON,
        UserTypes.LEI_DATA_USER,
    ];

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
