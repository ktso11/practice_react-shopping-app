import React, {Component} from 'react';
import './wishlist.css';
import ProductCondensed from '../product-condensed/product-condensed';

class WishList extends Component {
    constructor(props) {
        super(props);

        this.state = { wishList: [
            {
                title:"Gunblade", 
                price: 30.99,
                _id: "4353we"
            },
            {
                title:"Buster Sword", 
                price: 20.99,
                _id: "43111e"
            },
            {
                title:"Unicorn", 
                price: 300.99,
                _id: "99753"
            }
        ]}

        //bind functions
        this.createWishList = this.createWishList.bind(this);
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