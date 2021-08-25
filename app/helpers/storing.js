export default class storing {
    static addCredential(id, body, revoked = false) {
        if (localStorage !== undefined) {
            if (revoked) {
                localStorage.setItem('revoked.credential.' + id, body);
            } else {
                localStorage.setItem('credential.' + id, body);
            }
        }
    }

    static removeCredential(id) {
        if (localStorage !== undefined) {
            localStorage.removeItem('credential.' + id);
        }
    }

    static revokeCredential(id) {
        if (localStorage !== undefined) {
            let storedCred = localStorage.getItem('credential.' + id);
            if (storedCred) {
                this.addCredential(id, storedCred, true);
                localStorage.removeItem('credential.' + id);
            }
        }
    }
}
