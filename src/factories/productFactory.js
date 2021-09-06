const ProductRepository = require("./../repositories/productRepository");
const ProductService = require("./../services/productService");

const { join } = require("path");
const filename = join(__dirname, "../../database", "data.json");

const generateInstance = () => {
  const productRepository = new ProductRepository({ file: filename });
  const productService = new ProductService({ productRepository });
  return productService;
};

module.exports = { generateInstance };

// generateInstance()
//   .find(2)
//   .then(console.log)
//   .catch((err) => console.log(err));
