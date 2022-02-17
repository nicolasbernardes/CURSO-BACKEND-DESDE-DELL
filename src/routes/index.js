const { Router } = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const router = Router();
const _ = require('underscore')

const textos = require('../sample.json'); //obtener archivo json

router.get('/', (req, res) =>{

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
   
   });

module.exports = router;