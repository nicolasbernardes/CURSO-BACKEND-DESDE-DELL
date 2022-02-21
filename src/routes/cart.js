const { Router } = require('express')
const app = Router()
const carrinho = require("../outra/carrinho")
const administrator = false;

app.delete("/:id/productos/:id_prod", (req, res, next) => {

  console.log("Remove product!");
  const { id, id_prod } = req.params;
  console.log(`Intentando remover producto ${id_prod} del carrito ${id} `);

  const fscart = new fs_carrito();
  const resultado = await fscart.removeProductToCart(id, id_prod);

  res.status(200).json({
    code: 200,
    message: `Estamos laburando para vos! ${resultado}.`,
  });
})


app.post("/:id/productos", (req, res, next) => {

  const { id } = req.params;
  const { idproducto } = req.body;

  const fscart = new fs_carrito();
  const resultado = await fscart.addProductToCart(id, idproducto);
  if (resultado) {
    res.status(200).json({
      code: 200,
      message: `Se agrego el producto al carrito de forma correcta.`,
    });
  } else {
    res.status(400).json({
      code: 400,
      message: `No se pudo agregar.`,
    });
  }
})


app.get("/:id/productos", (req, res, next) => {

  try {
    const { id } = req.params;
    const fscart = new fs_carrito(); 
    const productosEnCarro = await fscart.showProductsOfCart(id);

    if (productosEnCarro) {
      return res.status(200).json({
        code: 200,
        productosEnCarro,
      });
    } else {
      throw "No hay productos en este carrito!";
    }
  } catch (error) {
    if (error === "No hay productos en este carrito!") {
      return res.status(400).json({ code: 400, message: error });
    } else {
      console.log("Error inesperado:", error);
      return res
        .status(400)
        .json({ code: 400, message: "Intento de obtener productos fallido." });
    }
  }

})




app.delete("/:id", (req, res, next) => {

  try {
    const { id } = req.params;

    const fscart = new fs_carrito(); 
    const resultado = await fscart.deleteById(id);
    if (resultado === 400) {
      throw resultado;
    } else {
      return res
        .status(200)
        .json({ code: 200, message: "Carrito borrado con exito!" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ code: 400, message: "No hay ningun carrito con esa ID" });
  }

})






app.post("/:id/productos", (req, res, next) => {

    try {
        const { id } = req.params;
        const cart = new carrinho(); 
        const productos = await cart.showProductsOfCart(id);
    
        if (productos) {
          return res.status(200).json({
            code: 200,
            productos,
          });
        } else {
          throw "No hay productos en este carrito!";
        }
      } catch (error) {
        if (error === "No hay productos en este carrito!") {
          return res.status(400).json({ code: 400, message: error });
        } else {
          console.log("Error inesperado:", error);
          return res
            .status(400)
            .json({ code: 400, message: "Intento de obtener productos fallido." });
        }
      }

});

module.exports = app;




  