import storing from './storing';

export default class mocking {
    static mockGLEIFvLEICredentialSubmit() {
        let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (Math.random() * 16) | 0,
                v = c == 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
        storing.addCredential(
            uuid,
            JSON.stringify({
                said: uuid,
                d: {
                    data: {
                        LEI: 'LEI',
                        type: ['VerifiableCredential', 'GLEIFvLEICredential'],
                    },
                    recipient: 'recipient',
                },
            })
        );
    }
}
