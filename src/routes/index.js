const { Router } = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const router = Router();
const administrator = false;
const fs_producto = require("../outra/produto") 
/* const textos = require('../sample.json'); */ //obtener archivo json
/* const _ = require('underscore') */


app.delete("/:id", (req, res, next) => {
    if (administrator) {
        try {
          const { id } = req.params;
    
          const fsprod = new fs_producto(); 
          const resultado = await fsprod.deleteById(id);
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
            .json({ code: 400, message: "no existe ese producto" });
        }
      } else {
        return res.status(400).json({
          code: 400,
          error: -1,
          descripcion: `Error`,
        });
      }
})


app.put("/:id", (req, res, next) => {
    if (administrator) {
        try {
          const { id } = req.params;
          const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
    
          let newProduct = new Object();
    
          if (nombre) {
            newProduct.nombre = nombre;
          }
          if (descripcion) {
            newProduct.descripcion = descripcion;
          }
          if (codigo) {
            newProduct.codigo = codigo;
          }
          if (foto) {
            newProduct.foto = foto;
          }
          if (precio) {
            newProduct.precio = precio;
          }
          if (stock) {
            newProduct.stock = stock;
          }
    
          const fsprod = new fs_producto(); // destructuracion de req.body
          const result = await fsprod.updateById(id, newProduct);
    
          console.log("..", result);
        } catch (error) {
          console.log("ERROR!", error);
        }
      } else {
        return res.status(400).json({
          code: 400,
          error: -1,
          descripcion: `Error`,
        });
      }
})


app.post("/", (req, res, next) => {
    if (administrator) {
        try {
          const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
          let newProduct = {
            timestamp: Date.now(),
            nombre: nombre,
            descripcion: descripcion,
            codigo: codigo,
            foto: foto,
            precio: precio,
            stock: stock,
          };
          const fsprod = new fs_producto(); 
          const resultado = await fsprod.save(newProduct);
          return res.status(200).json({
            code: 200,
            message: `guardado ${nombre} con el id ${resultado}`,
          });
        } catch (error) {
          console.log("Error", error);
          return res.status(400).json({
            code: 400,
            message: `Error`,
          });
        }
      } else {
        return res.status(400).json({
          code: 400,
          error: -1,
          descripcion: `Error`,
        });
      }
})


app.get("/", (req, res, next) => {
    try {
        const fsprod = new fs_producto(); 
        const productos = await fsprod.getAll();
        if (productos === undefined) {
          throw "No hay articulo";
        } else {
          return res.status(200).json({
            code: 200,
            productos,
          });
        }
      } catch (error) {
        console.log("Error", error);
        return res
          .status(400)
          .json({ code: 400, message: "Error" });
      }
})
app.get("/:id", (req, res, next) => {
    const { id } = req.params;

    try {
      const fsprod = new fs_producto();
      const producto = await fsprod.getById(id);
      if (producto === undefined) {
        throw "No hay articulo!";
      } else {
        return res.status(200).json({
          code: 200,
          producto,
        });
      }
    } catch (error) {
      console.log("Error", error);
      return res
        .status(400)
        .json({ code: 400, message: "Error" });
    }
})



























/* router.get('/', (req, res) =>{

 res.json(textos); // aplicar el archivo json

});


router.post('/', (req, res) =>{
    const { titulo, precio, thumbnail } = req.body;
    
    if( titulo &&  precio &&  thumbnail) {
        const id = textos.length + 1;
        const newTextos = {...req.body, id};
        textos.push(newTextos);
        res.json(textos);
    }else {
        res.status(500).json({error:'error'});
    }

    
   
});


router.put('/:id', (req, res) =>{
    const {id} = req.params;
    const { titulo, precio, thumbnail } = req.body;
    if( titulo &&  precio &&  thumbnail){
        _.each(textos, (texto, i) =>{
            if(texto.id == id){
                texto.titulo = titulo;
                texto.precio = precio;
                texto.thumbnail = thumbnail;
            }
        });
        res.json(textos);
    } else {
        res.status(500).json({error:'error'});
    }
});





router.delete('/:id', (req, res) => {
    const { id } = req.params;
    _.each(textos ,(texto, i)=>{
        if(texto.id == id) {
            textos.splice(i, 1);
        }
    })

    res.send(textos);
   
   }); */

module.exports = router;