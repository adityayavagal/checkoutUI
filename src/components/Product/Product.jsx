import { Component } from "react";
import PropTypes from "prop-types";
import { SfButton, SfIconShoppingCart, SfLink } from "@storefront-ui/react";
import { currencyFormatter } from "../../util/formatting";
import { cartActions } from "../../store/cart-slice";
import { connect } from "react-redux";

class Product extends Component {

  constructor(props) {
    super(props);
  }

  handleAddToCart = () => {
    this.props.addItem({
      item: this.props.item,
    });
  };

  render() {
    return (
      <li className="border m-3 border-neutral-200 rounded-md shadow-md hover:shadow-lg max-w-[350px]">
        <div>
          <div className="block">
            <img
              src={`http://localhost:8080/${this.props.item.image}`}
              className="object-cover cursor-pointer h-auto rounded-t-md aspect-auto"
              width="350"
            />
          </div>
        </div>
        <div className="p-4 flex flex-col items-center">
          <SfLink
            href="#"
            variant="secondary"
            className="no-underline font-semibold"
          >
            {this.props.item.name}
          </SfLink>
          <p className="block py-2 text-center font-normal typography-text-sm text-neutral-700">
            {this.props.item.description}
          </p>
          <span className="block pb-2 font-bold typgraphy-text-lg">
            {currencyFormatter.format(this.props.item.price)}
          </span>

          <SfButton
            size="sm"
            onClick={this.handleAddToCart}
            slotPrefix={<SfIconShoppingCart size="sm" />}
          >
            Add to Cart
          </SfButton>
        </div>
      </li>
    );
  }
}

Product.propTypes = {
  item: PropTypes.object.isRequired,
  addItem: PropTypes.func,
};

const mapStateToProps = () => {
  return {};
}

const mapDispatchToProps = {
  addItem: cartActions.addItem,
}

const ProductContainer = connect(mapStateToProps, mapDispatchToProps)(Product)
export default ProductContainer;
