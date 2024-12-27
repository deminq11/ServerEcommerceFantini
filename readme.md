Server express.js hosteado en localhost:3000 que usa MongoDB Atlas para la base de datos.
cid = ObjectId de un carrito.
pid = ObjectId de un producto.
uid = ObjectId de un usuario.

API DE PRODUCTS 
GET "api/products/",
Retorna todos los productos de forma paginada, por defecto la primera pagina y 10 productos limite.
Acepta las QUERYS ?limit=x, ?page=x,(x = numero deseado, sin comillas) ?sort=-1/1(por determinado sortea price) o {"atributo": -1/1},
?query= acepta cualquier filtro de mongo escrito en formato valido para JSON, por ejemplo &query={"category":{"$eq":"Audio"}}.

GET "api/products/:pid",
Retorna el producto especificado por /:pid, el pid debe ser un ObjectId valido para Mongo.

POST "api/products", 
Recibe por BODY un producto y retorna el producto subido a la base, el producto debe estar en formato de objeto y debe tener: { //No se puede pasar _id ni id "title":"un string" "price": un number "code":"un string unico por ej: SM24FE" //Los demas atributos se pueden especifcar opcionalmente: "status": un boolean,por default true "stock": un number, por default 10 "category": un string, por default Electronica "thumbnails": [un array de strings referentes a imagenes], por default [] }

PUT "api/products/:pid",
Recibe por BODY, un objeto con atributos a cambiar del producto especificado por /:pid y lo retorna, los atributos deben coincidir con los del esquema de productos. No se puede pasar _id o id ni se puede cambiar code a menos que no haya ningun producto con el mismo valor code. Ej:{ "price": 299.99, } DELETE "api/products/:pid" Elimina el producto especificado por /:pid y lo retorna.

API DE CARTS
GET "api/cart/:cid",
Retorna el carrito con _id que coincida con el parametro /:cid.

POST "api/cart",
Crea un carrito con "_id" y un array "products" vacío, y lo retorna.

POST "api/cart/:cid/products/:pid",
Añade el producto especificado por /:pid al carrito especificado por /:cid, y lo retorna. Se le puede agregar la QUERY ?quantity=x para especificar la cantidad que se desea agregar(por default va a ser 1).

PUT "api/cart/:cid",
Se le pasa por BODY un array de objetos o un objeto con _id de un producto y un quantity (opcional), sino se introduce sera 1, y se agrega al carrito especificado por /:cid y retorna el carrito cambiado.

PUT "api/cart/:cid/products/:pid",
Reemplaza la quantity del producto especificado por /:pid, en el carrito especificado por /:cid, y retorna el carrito actualizado. la quantity se pasa por la QUERY ?quantity=x o por BODY ej = {quantity = 5} (Si se manda por ambos, el server tomara el dato del body).

DELETE "api/cart/:cid",
 Vacia el contenido de products del carrito especificado por /:cid y retorna el carrito vaciado.

DELETE "api/cart/:cid/products/:pid", 
Elimina el producto especificado por /:pid en el carrito especificado por /:cid, y retorna el carrrito actualizado.
