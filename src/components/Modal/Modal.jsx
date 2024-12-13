import { Children } from "react";

const { SfModal } = require("@storefront-ui/react");
const { Component } = require("react");

class Modal extends Component {
  constructor(props) {

  }

  onClose = () => {

  }

  render() {
    return <SfModal open={true}>{this.props.children}</SfModal>;
  }
}

export default Modal;
