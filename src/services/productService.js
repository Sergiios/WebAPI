class ProductService {
  constructor({ productRepository }) {
    this.productRepository = productRepository;
  }

  async find(itemId) {
    return this.productRepository.find(itemId);
  }

  async create(data) {
    return this.productRepository.create(data);
  }
}

module.exports = ProductService;
