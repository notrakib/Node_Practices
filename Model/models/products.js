const path = require("path");
const fs = require("fs");

// const p = path.join(__dirname, "..", "..", "data", "product.json");
const p = path.join(__dirname, "..", "data", "product.json");

const getProduct = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (!err) {
      cb(JSON.parse(fileContent));
    } else {
      cb([]);
    }
  });
};

module.exports = class Product {
  constructor(t) {
    this.title = t;
  }

  save() {
    getProduct((product) => {
      product.push(this);
      fs.writeFile(p, JSON.stringify(product), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProduct(cb);
  }
};
