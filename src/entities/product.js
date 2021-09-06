class Product {
  constructor({ name, price, inventory }) {
    this.id = Math.floor(Math.random() * 100) + Date.now();
    this.name = name;
    this.price = price;
    this.inventory = inventory;
  }

  isValid() {
    const propertyNames = Object.getOwnPropertyNames(this);

    const amountInvalid = propertyNames
      .map((property) => (!!this[property] ? null : `${property} is missing`))
      .filter((item) => !!item);

    return {
      valid: amountInvalid.length === 0,
      error: amountInvalid,
    };
  }
}

module.exports = Product;

// const productt = new Product({
//   name: "Sabonete",
//   price: 1.9,
//   inventory: 50,
// });
// console.log("valid", productt.isValid());
