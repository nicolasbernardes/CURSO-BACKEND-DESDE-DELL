const fs = require("fs");
const ruta = __dirname + "../productos.txt"; 

module.exports = class Productos {
  
  constructor(id, nombre, descripcion, codigo, foto, precio, stock) {
    
    this.id = id;
    this.timestamp = Date.now();
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.codigo = codigo;
    this.foto = foto;
    this.precio = precio;
    this.stock = stock;
  }

  async escribir(texto) {
    try {
      await fs.promises.writeFile(ruta, texto);
      texto != ""
        ? console.log("salvo")
        : console.log("vaciado");
    } catch (err) {
      
      console.log(err);
    }
  }
  async getAll() {
    try {
      let contenido = await fs.promises.readFile(ruta, "utf-8");

      if (contenido && contenido.length > 0) {
        contenido = JSON.parse(contenido);
        contenido = contenido.sort(function (a, b) {
          return a.id - b.id;
        });
        return contenido;
      } else {
        throw "No hay contenido";
      }
    } catch (err) {
      console.log("no funciono");
    }
  }
  async getById(number) {
    const productos = await this.getAll();
    const result = productos.filter((x) => x.id == number);
    return result[0];
  }
  async deleteById(number) {
    let productos = await this.getAll();
    const nproductos = productos.filter((x) => x.id != number);

    if (productos.length == nproductos.length) {
      return 400;
    } else {
      this.escribir(JSON.stringify(nproductos));
      return 200;
    }
  }
  async deleteAll() {
    this.escribir("");
  }
  async verificarID() {
    try {
      await this.verificarArchivo();
      let contenido = await fs.promises.readFile(ruta, "utf-8");

      if (contenido.length > 0) {
        contenido = JSON.parse(contenido);
        contenido = contenido.sort(function (a, b) {
          return a.id - b.id;
        });
        let ultimoId = contenido[contenido.length - 1].id;

        return ultimoId + 1;
      } else {
        console.log("vacio");
        return 1;
      }
    } catch (err) {
      console.log("Error de lectura: ", err);
    }
  }
  async save(producto) {
    try {
      if (producto != undefined) {
        
        if (!producto.id) {
          producto.id = await this.verificarID(); 
        }
        let productos = await this.getAll();
        if (!Array.isArray(productos)) productos = [];

        productos.push(producto);
        productos = JSON.stringify(productos);

        this.escribir(productos);
        return producto.id; 
      } else {
        throw "No se recibio";
      }
    } catch (err) {
      console.warn("Error", err);
    }
  }
  async verificarArchivo() {
    try {
      let contenido = await fs.promises.readFile(ruta, "utf-8");
      if (contenido) {
        return true;
      }
    } catch (err) {
      

      if (err) {
        await this.escribir("");
        console.log("No existe");
      }
    }
  }
  async updateById(number, data) {
    const producto = await this.getById(number);

    if (data.nombre) {
      producto.nombre = data.nombre;
    }

    if (data.descripcion) {
      producto.descripcion = data.descripcion;
    }

    if (data.codigo) {
      producto.codigo = data.codigo;
    }

    if (data.foto) {
      producto.foto = data.foto;
    }

    if (data.precio) {
      producto.precio = data.precio;
    }

    if (data.stock) {
      producto.stock = data.stock;
    }

    producto.timestamp = Date.now();

    await this.deleteById(producto.id);

    await this.save(producto);

    return producto;
  }
};
