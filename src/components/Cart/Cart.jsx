import { SfButton, SfIconClose, SfModal } from "@storefront-ui/react";
import { Component } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import CartItem from "../CartItem/CartItem";
import { currencyFormatter } from "../../util/formatting";
import { cartActions } from "../../store/cart-slice";
import { connect } from "react-redux";

class Cart extends Component {
  constructor(props) {
    super(props);
  }

  handleCloseCart = () => {
    this.props.closeCart();
  };

  handleOpenCheckout = () => {
    this.props.openCheckout();
  };

  render() {
    const totalCartAmount = this.props.items.reduce(
      (total, item) => item.quantity * item.price + total,
      0
    );
    return createPortal(
      <SfModal
        className="max-w-[90%] shadow-md w-full md:max-w-2xl"
        open={this.props.progress === "CART"}
      >
        <header>
          <h3 className="justify-start font-bold typo typography-headline-4 md:typography-headline-3">
            Your Cart
          </h3>
          <SfButton
            square
            variant="tertiary"
            className=" absolute top-2 right-2"
            onClick={this.handleCloseCart}
          >
            <SfIconClose />
          </SfButton>
        </header>
        <div className="p-2">
          <ul>
            {this.props.items.map((item) => {
              return (
                <CartItem
                  key={item.id}
                  addItem={this.props.addItem}
                  removeItem={this.props.removeItem}
                  item={item}
                />
              );
            })}
          </ul>
          <div>
          <div className="pt-4"/>
          <p className="px-3 py-1.5 bg-secondary-100 text-secondary-700 typography-text-sm rounded-md text-center mb-4">
              Congratulations you are our Nth customer.
            </p>
            <p className="flex pr-4 justify-end font-bold typgraphy-text-lg">
              Sub Total: {currencyFormatter.format(totalCartAmount)}
            </p>
            <p className="flex pr-4 justify-end typography-text-xs text-neutral-500">
              Original Price: {currencyFormatter.format(totalCartAmount)}
            </p>
            <p className="flex pr-4 justify-end typography-text-xs text-secondary-700">
              Savings: {currencyFormatter.format(totalCartAmount)}
            </p>
          </div>
        </div>
        <footer className="flex flex-row justify-end">
          <SfButton
            onClick={this.handleCloseCart}
            variant="secondary"
            className="m-1"
          >
            Close
          </SfButton>
          <SfButton onClick={this.handleOpenCheckout} className="m-1">
            Checkout
          </SfButton>
        </footer>
      </SfModal>,
      document.getElementById("modal")
    );
  }
}

Cart.propTypes = {
  items: PropTypes.array.isRequired,
  progress: PropTypes.string.isRequired,
  closeCart: PropTypes.func.isRequired,
  openCheckout: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    items: state.cart.items,
    progress: state.cart.progress,
  };
};

const mapDispatchToProps = {
  closeCart: cartActions.closeCart,
  openCheckout: cartActions.openCheckout,
  addItem: cartActions.addItem,
  removeItem: cartActions.removeItem,
};

const CartContainer = connect(mapStateToProps, mapDispatchToProps)(Cart);

export default CartContainer;
