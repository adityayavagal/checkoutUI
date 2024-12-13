import { Component } from "react";
import Product from "../Product/Product";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  setItems = (items) => {
    this.setState({
      ...this.state,
      items,
    });
  };

  componentDidMount() {
    (async () => {
      const response = await fetch("http://localhost:8080/api/products");
      const respData = await response.json();

      this.setItems(respData);
    })();
  }
  render() {
    return (
      <ul className="flex justify-center flex-wrap flex-row">
        {this.state.items.map((item) => {
          return <Product key={item.id} item={item} />;
        })}
      </ul>
    );
  }
}

export default ProductList;
