import { Component } from "react";
import PropTypes from "prop-types";
import logoImg from "../../assets/vite.svg";
import { SfButton, SfIconShoppingCart } from "@storefront-ui/react";
import { connect } from "react-redux";
import { cartActions } from "../../store/cart-slice";

class Header extends Component {

  handleOpenCart = () => {
    this.props.openCart();
  }

  render() {
    const totalCartItems = this.props.items.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
    return (
      <header className="flex shadow-md justify-center w-full lg:py-5 lg:px-6 py-3 px-4 bg-white border-b border-neutral-200">
        <div className="flex lg:flex-nowrap flex-row items-center justify-start h-full max-w-[1536px] w-full">
          <a
            href="/"
            className="flex items-center flex-row w-full h-full"
            aria-label="SF HomePage"
          >
            <picture>
              <img src={logoImg} />
            </picture>
            <span className="text-lg font-semibold">Vite Store</span>
          </a>
          <nav className="flex justify-end w-full h-full lg:order-last lg:ml-4">
            <SfButton
              as="a"
              href="#"
              className="relative"
              square
              aria-label="Add to cart"
              onClick={this.handleOpenCart}
            >
              <SfIconShoppingCart />
              <span className=" absolute -top-3 -right-3 py-0.25 px-2 rounded-full bg-red-600">
                {totalCartItems}
              </span>
            </SfButton>
          </nav>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  items: PropTypes.array.isRequired,
  openCart: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    items: state.cart.items,
  };
};

const mapDispatchToProps = {
  openCart: cartActions.openCart,
}

const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header);

export default HeaderContainer;
