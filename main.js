const express = require('express')
const app= express()
const productosRouter= require('./routes/routeProductos')
const carritoRouter= require('./routes/routeCarrito')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/productos',productosRouter)
app.use('/api/carrito',carritoRouter)
app.use('*',(req,res)=>{
    res.status(404).send({error:'ruta no implementada'})
})

const server = app.listen(process.env.PORT || 8080, ()=>{console.log(`servidor escuchando en el puerto ${server.address().port}`)})
server.on('error', (error)=>{console.error(error)})

