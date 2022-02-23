const { Router } = require('express')
const app = Router()
const carrinho = require("../outra/carrinho")
const administrator = false;

app.delete("/:id/productos/:id_prod", (req, res, next) => {

  console.log("Remover");
  const { id, id_prod } = req.params;
  console.log(`Intentando remover producto ${id_prod} del carrito ${id} `);

  const fscart = new carrinho(); 
  const resultado = await fscart.removerCarrito(id, id_prod);

  res.status(200).json({
    code: 200,
    message: `${resultado}.`,
  });
})


app.post("/:id/productos", (req, res, next) => {

  const { id } = req.params;
  const { idproducto } = req.body;

  const fscart = new carrinho(); 
  const resultado = await fscart.agregarCarrito(id, idproducto);
  if (resultado) {
    res.status(200).json({
      code: 200,
      message: `Agregado`,
    });
  } else {
    res.status(400).json({
      code: 400,
      message: `Error`,
    });
  }
})


app.get("/:id/productos", (req, res, next) => {

  try {
    const { id } = req.params;
    const fscart = new carrinho(); //
    const productosEnCarro = await fscart.mostrarCarrito(id);

    if (productosEnCarro) {
      return res.status(200).json({
        code: 200,
        productosEnCarro,
      });
    } else {
      throw "No hay productos";
    }
  } catch (error) {
    if (error === "No hay productos") {
      return res.status(400).json({ code: 400, message: error });
    } else {
      console.log("Error", error);
      return res
        .status(400)
        .json({ code: 400, message: "Error" });
    }
  }

})




app.delete("/:id", (req, res, next) => {

  try {
    const { id } = req.params;

    const fscart = new carrinho(); //
    const resultado = await fscart.deleteById(id);
    if (resultado === 400) {
      throw resultado;
    } else {
      return res
        .status(200)
        .json({ code: 200, message: "Borrado" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ code: 400, message: "No existe esa ID" });
  }

})






app.post("/:id/productos", (req, res, next) => {

  try {
    const nCarrt = {
      timestamp: Date.now(),
      productos: [],
    };

    const fscart = new carrinho();
    const resultado = await fscart.save(nCarrt);
    return res.status(200).json({
      code: 200,
      message: `Nuevo carrito`,
    });
  } catch (error) {
    console.log("Error", error);
    return res.status(400).json({
      code: 400,
      message: `Error`,
    });
  }

});





module.exports = app;




  