const path = require("path");
const fs = require("fs");

const p = path.join(__dirname, "..", "data", "cart.json");

module.exports = class Cart {
  static updateCart(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      let cartProducts;

      if (!err) {
        cartProducts = JSON.parse(fileContent);
      } else {
        cartProducts = { products: [], totalPrice: 0 };
      }

      const newProductIndex = cartProducts.products.findIndex(
        (prod) => prod.id === id
      );

      if (newProductIndex >= 0) {
        cartProducts.products[newProductIndex].qty =
          cartProducts.products[newProductIndex].qty + 1;
      } else {
        cartProducts.products = [...cartProducts.products, { id: id, qty: 1 }];
      }

      cartProducts.totalPrice = cartProducts.totalPrice + +productPrice;

      fs.writeFile(p, JSON.stringify(cartProducts), (err) => {
        console.log(err);
      });
    });
  }
};
