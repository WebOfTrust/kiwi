import { Intent, Toaster, ToasterPosition } from 'construct-ui';

export default class toaster {
    static AppToaster = new Toaster();

    static info(message, timeout = 3000) {
        this.AppToaster.show({
            message,
            timeout,
        });
    }

    static primary(message, timeout = 3000) {
        this.AppToaster.show({
            message,
            intent: Intent.PRIMARY,
            timeout,
        });
    }

    static success(message, timeout = 3000) {
        this.AppToaster.show({
            message,
            intent: Intent.POSITIVE,
            timeout,
        });
    }

    static error(message, timeout = 3000) {
        this.AppToaster.show({
            message,
            intent: Intent.NEGATIVE,
            timeout,
        });
    }

    static warning(message, timeout = 3000) {
        this.AppToaster.show({
            message,
            intent: Intent.WARNING,
            timeout,
        });
    }
}
