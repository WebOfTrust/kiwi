export default class storing {
    static addCredential(id, body) {
        if (localStorage !== undefined) {
            localStorage.setItem("credential." + id, body);
        }
    }

    static removeCredential(id) {
        if (localStorage !== undefined) {
            localStorage.removeItem("credential." + id)
        }
    }
}


module.exports = storing;