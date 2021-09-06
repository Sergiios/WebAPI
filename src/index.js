const http = require("http");
const PORT = 3000;
const DEFAULT_HEADER = { "Content-Type": "application/json" };
const ProductFactory = require("./factories/productFactory");
const ProductServices = ProductFactory.generateInstance();
const Product = require("./entities/product");

const routes = {
  "/product:get": async (request, response) => {
    const { id } = request.queryString;
    //await Promisse.reject("/product:get");
    const product = await ProductServices.find(id);
    response.write(JSON.stringify({ result: product }));
    response.end();
  },
  "/product:post": async (request, response) => {
    //async iterator
    for await (const data of request) {
      try {
        //await Promisse.reject("/product:post");
        const item = JSON.parse(data);
        const product = new Product(item);
        const { error, valid } = product.isValid();
        if (!valid) {
          response.writeHead(400, DEFAULT_HEADER);
          response.write(JSON.stringify({ errro: error.join(",") }));
          return response.end();
        }
        const id = await ProductServices.create(product);
        response.writeHead(201, DEFAULT_HEADER);
        response.write(JSON.stringify({ sucess: "Product registred !", id }));
        return response.end();
      } catch (error) {
        return handleError(response)(error);
      }
    }
  },
  default: (request, response) => {
    response.write("Hello, erro 404");
    response.end();
  },
};

const handleError = (response) => {
  return (erro) => {
    console.error(erro);
    response.writeHead(500, DEFAULT_HEADER);
    response.write(JSON.stringify({ error: "Internal Server Error!!" }));
    return response.end();
  };
};

const handler = (request, response) => {
  const { url, method } = request;
  const [first, route, id] = url.split("/");
  request.queryString = { id: isNaN(id) ? id : Number(id) };

  const key = `/${route}:${method.toLowerCase()}`;

  response.writeHead(200, DEFAULT_HEADER);
  const chosen = routes[key] || routes.default;
  return chosen(request, response).catch(handleError(response));
};

http
  .createServer(handler)
  .listen(PORT, () => console.log(`Server running at ${PORT}`));
