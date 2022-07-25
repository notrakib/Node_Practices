const products = [];

exports.getAddProduct = (req, res, next) => {
  res.render("add-product", {
    pagetitle: "Add_product",
    path: "/admin/add-product",
  });
};

exports.getProduct = (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect("/");
};

exports.getWelcome = (req, res, next) => {
  res.render("shop", { prods: products, doctitle: "Shop", path: "/" });
};
