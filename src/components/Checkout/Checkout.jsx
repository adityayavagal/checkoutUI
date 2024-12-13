/* eslint-disable react/prop-types */
import { Component } from "react";
import { SfButton, SfIconClose, SfInput, SfModal } from "@storefront-ui/react";
import { createPortal } from "react-dom";
import { connect } from "react-redux";
import { cartActions } from "../../store/cart-slice";

class Checkout extends Component {

  handleSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());
    const bodyData = JSON.stringify({
        items: this.props.items,
        customer: customerData,
    });

    (async () => {
      const response = await fetch("http://localhost:8080/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: bodyData,
      });
      if (response.status === 201) {
        this.props.closeCheckout();
        this.props.resetCart();
      }
    })();
  };

  render() {
    return createPortal(
      <SfModal
        className="max-w-[90%] shadow-md w-full md:max-w-2xl"
        open={this.props.progress === "CHECKOUT"}
      >
        <header>
          <h3 className="justify-start font-bold typo typography-headline-4 md:typography-headline-3">
            Checkout
          </h3>
          <SfButton
            square
            variant="tertiary"
            className=" absolute top-2 right-2"
            onClick={this.props.closeCheckout}
          >
            <SfIconClose />
          </SfButton>
        </header>
        <form
          className="p-4 flex gap-4 flex-col flex-wrap text-neutral-900"
          onSubmit={this.handleSubmit}
        >
          <label className="w-full flex flex-col gap-0.5">
            <span className="typography-text-sm font-medium">Name</span>
            <SfInput className="m-10" id="name" name="name" type="text" />
          </label>
          <label className="w-full flex flex-col gap-0.5">
            <span className="typography-text-sm font-medium">E-mail</span>
            <SfInput id="email" name="email" type="email" />
          </label>
          <label className="w-full flex flex-col gap-0.5">
            <span className="typography-text-sm font-medium">Street</span>
            <SfInput id="street" name="street" type="text" />
          </label>
          <label className="w-full sm:w-auto flex-grow flex flex-col gap-0.5 mt-4">
            <span className="typography-text-sm font-medium">Postal Code</span>
            <SfInput id="postal-code" name="postalCode" type="number" />
          </label>
          <label className="w-full sm:w-auto flex-grow flex flex-col gap-0.5">
            <span className="typography-text-sm font-medium">City</span>
            <SfInput id="city" name="city" type="text" />
          </label>
          <footer className="pt-4 flex justify-end">
            <SfButton type="submit">Submit</SfButton>
          </footer>
        </form>
      </SfModal>,
      document.getElementById("modal")
    );
  }
}
const mapStateToProps = (state) => {
  return {
    progress: state.cart.progress,
    items: state.cart.items,
  };
};

const mapDispatchToProps = {
  closeCheckout: cartActions.closeCheckout,
  resetCart: cartActions.resetCart,
};

const CheckoutContainer = connect(mapStateToProps, mapDispatchToProps)(Checkout);
export default CheckoutContainer;
