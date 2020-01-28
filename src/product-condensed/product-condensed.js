import React, {Component} from 'react';
import './product-condensed.css';

class ProductCondensed extends Component {
    render() {
        return (
            <li className="list-group-item product-condensed">
                <a className="btn btn-outline-danger">X </a>
                <span>{this.props.product.title}  |  <b>${this.props.product.price}</b></span>
            </li>
        )
    }
}

export default ProductCondensed;