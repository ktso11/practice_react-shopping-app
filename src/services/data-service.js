import NotificationService, {NOTIF_WISHLIST_CHANGED} from './notification-service';

// normally 'new' creates a new copy, but this one will only refernce to the same one in memory
let ns = new NotificationService();

//this is to ensure that we only have 1 instance
//storing instance here permanently
let instance = null;
var wishList= []

class DataService {
    constructor(){
        //if there is not a instance. 
        if (!instance) {
            //instance equal this
            instance = this;
        }
        return instance;
    }

    //to ensure no dup on wishlist
    itemOnWishList = item => {
        for (var x = 0; x<wishList.length; x++) {
            if(wishList[x]._id === item._id) {
                return true;
            }
        }
        return false;
    }

    addWishListItem = item => {
        wishList.push(item)
        ns.postNotification(NOTIF_WISHLIST_CHANGED, wishList)
    }

    removeWishListItem = item => {
        for (var x = 0; x< wishList.length; x++){
            if(wishList[x]._id === item._id) {
                wishList.splice(x, 1);
                ns.postNotification(NOTIF_WISHLIST_CHANGED, wishList)
                break;
            }
        }
    }
}

export default DataService;