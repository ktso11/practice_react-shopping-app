import React, {Component} from 'react';
import './product.css';
import DataService from '../services/data-service';
import NotificationService, {NOTIF_WISHLIST_CHANGED} from '../services/notification-service';

let ds = new DataService();
let ns = new NotificationService();

class Product extends Component {

    constructor(props) {
        super(props);

        //is this item on the wishlist?
        this.state = {onWishList: ds.itemOnWishList()};
        
        //bind
        this.onButtonClicked = this.onButtonClicked.bind(this)
        this.onWishListChanged = this.onWishListChanged.bind(this)
    }

    componentDidMount() {
        ns.addObserver(NOTIF_WISHLIST_CHANGED, this, this.onWishListChanged )
    }
    //remove ourselve as a observer, notifcation is holding on to component (may lead to memory leak)
    componentWillUnmount(){
        ns.removeObserver(this, NOTIF_WISHLIST_CHANGED);
    }

    onWishListChanged(newWishList) {
        this.setState({onWishList: ds.itemOnWishList(this.props.product)})
    }

    onButtonClicked = () => {
        if (this.state.onWishList) {
            ds.removeWishListItem(this.props.product)
        } else {
            ds.addWishListItem(this.props.product);
        }
    }

    render() {

        var btnClass;
        if(this.state.onWishList) {
            btnClass = "btn btn-danger";
        } else {
            btnClass = "btn btn-primary";
        }

        return (
            <div className="card product">
                <img className="card-img-top product__image" src={this.props.product.imgUrl} alt="product"></img>
                <div className="card-block">
                    <h4 className="card-title">{this.props.product.title}</h4>
                    <p className="card-text">Price: ${this.props.product.price}</p>
                    {/* teriary if on the wish list/true REMOVE, else ADD TO CART */}
                    <a href="#" onClick={() => this.onButtonClicked()} className={btnClass}>{this.state.onWishList ? "Remove From WishList" : "Add To Cart"}</a>
                </div>
            </div>
        )
    }
}

export default Product;