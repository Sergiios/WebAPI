const { readFile, writeFile } = require("fs/promises");

class ProductRepository {
  constructor({ file }) {
    this.file = file;
  }

  async _currentFileContent() {
    return JSON.parse(await readFile(this.file));
  }

  async find(itemId) {
    const all = await this._currentFileContent();
    if (!itemId) return all;
    return all.find(({ id }) => itemId === id);
  }

  async create(data) {
    const currentFile = await this._currentFileContent();
    currentFile.push(data);

    await writeFile(this.file, JSON.stringify(currentFile));
    return data.id;
  }
}

module.exports = ProductRepository;

// const productRepository = new ProductRepository({
//   file: "./../../database/data.json",
// });

// productRepository
//   .create({ id: 2, nome: "Macarrão", price: 3.25, inventory: 50 })
//   .then(console.log)
//   .catch((err) => console.log(err));
// productRepository
//   .find()
//   .then(console.log)
//   .catch((err) => console.log(err));
