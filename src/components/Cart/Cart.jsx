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

  componentDidUpdate() {
    if (this.props.progress === "CART") {
      (async () => {
        const response = await fetch("http://localhost:8080/api/coupon");
        if (response.ok) {
          const data = await response.json();
          this.props.applyCoupon({
            couponData: data,
          });
        } else {
          this.props.applyCoupon({
            couponData: null,
          });
        }
      })();
    }
  }

  getDiscountData = (totalCartAmount) => {
    const { discount } = this.props.couponData;
    const discountAmount = totalCartAmount * (discount / 100);
    const discountedAmout = totalCartAmount - discountAmount;

    return [discountedAmout, discountAmount];
  };

  render() {
    const totalCartAmount = this.props.items.reduce(
      (total, item) => item.quantity * item.price + total,
      0
    );
    let [discountedAmout, discountAmount] = [null, null];
    if (this.props.couponData) {
      [discountedAmout, discountAmount] = this.getDiscountData(totalCartAmount);
    }
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
            {this.props.couponData && (
              <div className="pt-4">
                <p className="px-3 py-2 bg-secondary-100 text-secondary-700 typography-text-md rounded-md text-center mb-4">
                  Congratulations you are our lucky winner you get{" "}
                  {this.props.couponData.discount}% discount.
                </p>
                <p className="flex pr-4 justify-end font-bold typgraphy-text-lg">
                  Sub Total: {currencyFormatter.format(discountedAmout)}
                </p>
                <p className="flex pr-4 justify-end typography-text-xs text-neutral-500">
                  Original Price: {currencyFormatter.format(totalCartAmount)}
                </p>
                <p className="flex pr-4 justify-end typography-text-xs text-secondary-700">
                  Savings: {currencyFormatter.format(discountAmount)}
                </p>
              </div>
            )}
            {!this.props.couponData && (
              <p className="flex pt-4 pr-4 justify-end font-bold typgraphy-text-lg">
                Sub Total: {currencyFormatter.format(totalCartAmount)}
              </p>
            )}
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
  couponData: PropTypes.object,
  closeCart: PropTypes.func.isRequired,
  openCheckout: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  applyCoupon: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    items: state.cart.items,
    progress: state.cart.progress,
    couponData: state.cart.couponData,
  };
};

const mapDispatchToProps = {
  closeCart: cartActions.closeCart,
  openCheckout: cartActions.openCheckout,
  addItem: cartActions.addItem,
  removeItem: cartActions.removeItem,
  applyCoupon: cartActions.applyCoupon,
};

const CartContainer = connect(mapStateToProps, mapDispatchToProps)(Cart);

export default CartContainer;
