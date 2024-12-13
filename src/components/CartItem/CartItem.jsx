import {
  SfButton,
  SfIconAdd,
  SfIconRemove,
  SfLink,
} from "@storefront-ui/react";
import { Component } from "react";
import { currencyFormatter } from "../../util/formatting";
import PropTypes from "prop-types";

class CartItem extends Component {
  constructor(props) {
    super(props);
  }

  handleAddItem = () => {
    console.log(this.props.item);
    this.props.addItem({
      item: this.props.item,
    });
  };

  handleRemoveItem = () => {
    this.props.removeItem({
      id: this.props.item.id,
    });
  };

  render() {
    return (
      <li className="flex border-b border-neutral-200 p-4">
        <div className="overflow-hidden rounded-md min-w-[100px] w-[100px]">
          <img
            src={`http://localhost:8080/${this.props.item.image}`}
            className="w-full h-auto rounded-md"
          />
        </div>
        <div className="flex max-w-[320px] pl-4 flex-col">
          <SfLink
            href="#"
            variant="secondary"
            className="no-underline typography-text-sm sm:typography-text- font-semibold"
          >
            {this.props.item.name}
          </SfLink>
          <p className="font-normal typography-text-sm text-neutral-700">
            {this.props.item.description}
          </p>
          <div className="flex pt-2 items-center">
            <SfButton
              onClick={this.handleRemoveItem}
              square
              variant="tertiary"
              size="sm"
              className=" border rounded-r-none"
            >
              <SfIconRemove />
            </SfButton>
            <span className="border-y py-[6px] text-center w-10">
              {this.props.item.quantity}
            </span>
            <SfButton
              onClick={this.handleAddItem}
              variant="tertiary"
              square
              size="sm"
              className="border rounded-l-none"
            >
              <SfIconAdd />
            </SfButton>
          </div>
        </div>
        <div className="flex my-auto justify-center ml-auto">
          <p className="pb-2 font-bold typgraphy-text-lg">
            {currencyFormatter.format(this.props.item.price)}
          </p>
        </div>
      </li>
    );
  }
}

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
  addItem: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
};

export default CartItem;
