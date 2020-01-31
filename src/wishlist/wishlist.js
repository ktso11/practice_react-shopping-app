import React, {Component} from 'react';
import './wishlist.css';
import DataService from '../services/data-service';
import Notification, { NOTIF_WISHLIST_CHANGED } from '../services/notification-service';
import ProductCondensed from '../product-condensed/product-condensed';
import NotificationService from '../services/notification-service';


let ns = new NotificationService();

class WishList extends Component {
    constructor(props) {
        super(props);

        this.state = { wishList: []}
            // {
            //     title:"Gunblade", 
            //     price: 30.99,
            //     _id: "4353we"
            // },
            // {
            //     title:"Buster Sword", 
            //     price: 20.99,
            //     _id: "43111e"
            // },
            // {
            //     title:"Unicorn", 
            //     price: 300.99,
            //     _id: "99753"
            // }
        

        //bind functions
        this.createWishList = this.createWishList.bind(this);
        this.onWishListChanged = this.onWishListChanged.bind(this)
    }

    //158 6:50
    //Lifecycle when component just load on the screen
    // add ourselve as a observer
    componentDidMount() {
        ns.addObserver(NOTIF_WISHLIST_CHANGED, this, this.onWishListChanged )
    }
    //remove ourselve as a observer, notifcation is holding on to component (may lead to memory leak)
    componentWillUnmount(){
        ns.removeObserver(this, NOTIF_WISHLIST_CHANGED);
    }

    onWishListChanged(newWishList) {
        this.setState({wishList: newWishList})
    }

    createWishList = () => {
        const list = this.state.wishList.map((product) =>
            <ProductCondensed product={product} key={product._id} />
        );

        return (list)
    }

    render() {
        return (
            <div className="card">
                <div className="card-block">
                    <h4 className="card-title">Wish List</h4>
                    <ul className="list-group">
                        {this.createWishList()}
                    </ul>
                </div>
            </div>
        )
    }
}

export default WishList;