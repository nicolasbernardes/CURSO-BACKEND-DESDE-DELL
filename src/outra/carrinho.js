const fs = require("fs");
const productoJava = require("./produto");
const route = __dirname + "../carrinho.txt"; 

module.exports = class Carrinho {
  
  constructor(id) {
   
    this.id = id;
    this.timestamp = Date.now();
    this.productos = [];
  }

  async escribir(text) {
    try {
      await fs.promises.writeFile(route, text);
      text != ""
        ? console.log("Salvo")
        : console.log("Borrado");
    } catch (err) {
      console.log(err);
    }
  }



  async getAll() {
    try {
      let cont = await fs.promises.readFile(route, "utf-8");

      if (cont && cont.length > 0) {
        cont = JSON.parse(cont);
        cont = cont.sort(function (a, b) {
          return a.id - b.id;
        });
        return cont;
      } else {
        throw "No hay";
      }
    } catch (err) {
      console.log("Error");
    }
  }

  async getById(number) {
    const producto = await this.getAll();
    const result = producto.filter((i) => i.id == number);
    return result[0];
  }


  async deleteById(number) {
    let producto = await this.getAll();
    const otroProducto = producto.filter((i) => i.id != number);

    if (producto.length == otroProducto.length) {
      return 400;
    } else {
      this.escribir(JSON.stringify(otroProducto));
      return 200;
    }
  }



  async deleteAll() {
    this.escribir("");
  }
  async Id() {
    try {
      await this.archivo();
      let cont = await fs.promises.readFile(route, "utf-8");

      if (cont.length > 0) {
        cont = JSON.parse(cont);
        cont = cont.sort(function (a, b) {
          return a.id - b.id;
        });
        let otroId = cont[cont.length - 1].id;

        return otroId + 1;
      } else {
        console.log("no hay nada");
        return 1;
      }
    } catch (err) {
      console.log("Error", err);
    }
  }



  async save(producto) {
    try {
      if (producto != undefined) {
     
        if (!producto.id) {
          producto.id = await this.Id(); 
        }
        let productos = await this.getAll();
        if (!Array.isArray(productos)) productos = [];

        productos.push(producto);
        productos = JSON.stringify(productos);

        this.escribir(productos);
        return producto.id; 
      } else {
        throw "no hay";
      }
    } catch (err) {
      console.warn("Error", err);
    }
  }


  async archivo() {
    try {
      let cont = await fs.promises.readFile(route, "utf-8");
      if (cont) {
        return true;
      }
    } catch (err) {
      

      if (err) {
        await this.escribir("");
        console.log("No hay");
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


  async agregarCarrito (number, data) {
    try {
      const producto = await this.getById(number); 
      producto.productos.push(data);
      producto.timestamp = Date.now();

      await this.deleteById(producto.id);

      await this.save(producto);

      return true;
    } catch (error) {
      console.log("Error", error);
      return false;
    }
  }

  async removerCarrito(idCart, idProd) {
    try {
      const cart = await this.getById(idCart); 

      console.log(".", cart.productos);
      

      const otroGuardar = [];

      for (let guardar of cart.productos) {
        if (guardar !== idProd) {
            otroGuardar.push(guardar);
        }
      }
      cart.productos = otroGuardar;

      cart.timestamp = Date.now();

      await this.deleteById(idCart);
      await this.save(cart);

      return true;
    } catch (error) {
      console.log("Error", error);
      return false;
    }
  }

  async mostrarCarrito(idCart) {
    try {
      const cart = await this.getById(idCart); 
      const productoArchiv = new productoJava();

      console.log(".", cart.productos); 
      const productoDelCarrito = [];

      for (let productoSalvo of cart.productos) { 
        const producto = await productoArchiv.getById(productoSalvo);

        if (producto !== undefined) {
            productoDelCarrito.push(producto); 
        }
      }

      return productoDelCarrito; 
    } catch (error) {
      console.log("Error", error);
      return false;
    }
  }
};
