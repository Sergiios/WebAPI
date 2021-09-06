echo '

requestion all products'
curl localhost:3000/product

echo '

requestion product id 1'
curl localhost:3000/product/1

echo '

requesting with wrong body'
curl --silent -X POST --data-binary '{"invalid":"data"}' localhost:3000/product

echo '

creating product Caneta'
curl --silent -X POST --data-binary '{"name":"Caneta", "price": 1.25, "inventory":30}' localhost:3000/product
