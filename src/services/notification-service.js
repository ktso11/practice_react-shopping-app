//156 Creating Notification Service

//central place to store notifications
export const NOTIF_WISHLIST_CHANGED = "notif_wishlist_changed";


//Idea is that we store a list of observers (they are listeners)
//registering to observe

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

    postNotification = (notifName, data) => {
        let obs = observers[notifName];
        for (var x=0 ; x < obs.length; x++) {
            var obj = obs[x];
            obj.callBack(data);
        }
    }

    removeObserver = (observer, notifName) => {
        var obs = observers[notifName];

        //if there are observers (notifName), if there are none don't go through the list
        if(obs) {
            for (var x = 0; obs.length; x++) {
                // if observer is equal to the one in meomory
                if(observer === obs[x].observer) {
                    obs.splice(x,1);
                    observers[notifName] = obs;
                    break;
                }
            }
        }
    }

    //notifName is the name of notification
    //observer is the component that want so listen
    //callback is func that follows
    addObserver = (notifName, observer, callBack) => {
        let obs = observers[notifName]

        //if we have never registered for a notification -> empty arr
        //without it, the app will break
        if(!obs) {
            observers[notifName]= [];
        }

        let obj = {observer: observer, callBack: callBack};
        observers[notifName].push(obj)
    }

}

export default NotificationService