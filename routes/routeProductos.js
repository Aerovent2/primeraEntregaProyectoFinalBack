const express=require('express')
const {Router}= express
const router=Router()
const db= require('../db/dbProductos')
const DB= new db('productos.json')
const admin = false

const isAdmin = (req,res,next)=>{
    if(admin){
        next()
    }else{
        res.status(401).send({error: `ruta: /api/productos${req.url} necesita permisos de administrador }`})
    }
}

router.get('/', async(req,res)=>{//
    try{
       const data = await DB.getAll()
       return res.status(200).send(data)
    }catch(err){
        res.status(400).send({error:err})
    }
})

router.get('/:id',async (req,res)=>{//
    try{
        const {id}=req.params
        const data = await DB.getById(id)
        if(data){
           res.status(200).send(data)  
        }else{
            res.status(404).send({error:'producto no encontrado'})
        }
    }catch(err){
        res.status(404).send({error:err})
    }
})

router.post('/',isAdmin, async(req,res)=>{//
        const {nombre,descripcion,codigo,url,precio,stock}=req.body
        if(!nombre || !descripcion || !codigo || !url || !precio || !stock){
            return  res.status(406).send({error: 'faltan datos o son incorrectos'})
        }
        const producto={nombre,descripcion,codigo,url,precio:parseFloat(precio),stock:parseInt(stock)}
        try{
        const data = await DB.save(producto)
        producto.id = data
        res.send(producto)
        }catch(err){
            res.send({error: true, err})
        }
})
router.put('/:id',isAdmin, async(req,res)=>{//
        const {nombre,descripcion,codigo,url,precio,stock}=req.body
        if(!nombre & !descripcion & !codigo & !url & !precio & !stock){
            return  res.status(406).send({error: 'error en mascara de entrada'})
        }
        const producto={nombre,descripcion,codigo,url,precio:parseFloat(precio),stock:parseInt(stock)}
        const {id}=req.params
        try{
        const data = await DB.updateById(id,producto)
        if(data){
            res.status(200).send(data)
        }else{
            res.status(404).send({error:'producto no encontrado'})
        }
        }catch(err){
            res.send({error: true, err})
        }
})

router.delete('/:id',isAdmin, async(req,res)=>{//
        const {id}=req.params
        try{
        const data = await DB.deleteById(id)
        if(data){
            res.status(200).send(data)
        }else{
            res.status(404).send({error:'producto no encontrado'})
        }
        }catch(err){
            res.send({error: true, err})
        } 
})


module.exports = router