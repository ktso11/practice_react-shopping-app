//156 Creating Notification Service

//registering to observe
//observer is me or the component that wants to listen
var observers = {};

//example:
// var observers = {
//     "wishListChanged": [{observer: someComponent, callBack: someFunction},
//     {observer: someOtherComponent}],
//     "userHasLoggedIn":[{observer:something}]
// };
let instance = null;

class NotificationService {
    constructor() {
        if (!instance) {
            instance = this;
        }
        return instance;
    }

    addObserver = (notifName, observer, callBack) => {
        let obs = observers[notifName]

        if(!obs) {
            observers[notifName]= []
        }
    }
}