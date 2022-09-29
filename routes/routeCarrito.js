const express=require('express')
const {Router}= express
const router=Router()
const db= require('../db/dbProductos')
const dbCarritos= require('../db/dbCarrito')
const dbCarrito= new dbCarritos('carrito.json')
const DB= new db('productos.json')





router.get('/:id/productos',async (req,res)=>{//
    try{
        const {id}=req.params
        const data = await dbCarrito.getById(id)
        if(data){
           res.status(200).send(data)  
        }else{
            res.status(404).send({error:'carrito no encontrado'})
        }
    }catch(err){
        res.status(404).send({error:err})
    }
})

router.post('/', async(req,res)=>{//
    try{
        const data = await dbCarrito.save()
        res.send({idCarrito:data})
    }catch(err){
            res.send({error: true, err})
        }
})


router.post('/:id/productos', async(req,res)=>{//
        const {idProducto}=req.body
        if(!idProducto){
            return  res.status(406).send({error: 'falta idProducto en el req.body'})
        }
        const producto = await DB.getById(idProducto)
        const {id}=req.params
        try{
        const data = await dbCarrito.updateCarritoById(id,producto)
        if(data){
            res.status(200).send(data)
        }else{
            res.status(404).send({error:'carrito no encontrado'})
        }
        }catch(err){
            res.send({error: true, err})
        }
})

router.delete('/:id/productos/:id_prod', async(req,res)=>{//
        const {id,id_prod}=req.params
        try{
        const data = await dbCarrito.deleteProductoById(id,id_prod)
        if(data){
            res.status(200).send(data)
        }else{
            res.status(404).send({error:'carrito no encontrado'})
        }
        }catch(err){
            res.send({error: true, err})
        } 
})

router.delete('/:id', async(req,res)=>{//
    const {id}=req.params
    try{
    const data = await dbCarrito.deleteById(id)
    if(data){
        res.status(200).send(data)
    }else{
        res.status(404).send({error:'carrito no encontrado'})
    }
    }catch(err){
        res.send({error: true, err})
    } 
})

module.exports = router