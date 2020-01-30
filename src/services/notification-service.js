let instance = null

class NotificationService {
    constructor() {
        if (!instance) {
            instance = this;
        }
        return instance;
    }
}