const fs = require('fs')


class baseDeDatos {
    constructor(nombreDeArchivo){
        this.nombreDeArchivo=nombreDeArchivo
    }
    async  save(objeto){
        let objetos = []
        try{
            let buscarArchivos= await fs.promises.readdir('./db')
            let existe= buscarArchivos.find(archivo => archivo=== this.nombreDeArchivo)
            if(existe){
                let existente = await fs.promises.readFile(`./db/${this.nombreDeArchivo}`, 'utf-8')
                if(existente !== ''){
                     objetos = JSON.parse(existente)
                     if(objetos.length > 0){
                        let maxId = objetos[0].id
                        for(let i =0; i< objetos.length; i++){
                            if(maxId < objetos[i].id){
                                maxId=objetos[i].id
                            }
                        objeto.id = maxId+1
                        }
                     }
                }
            }else{
                objeto.id=1
            }
            objeto.timestamp = new Date()
            objetos.push(objeto)
            await fs.promises.writeFile(`./db/${this.nombreDeArchivo}`, JSON.stringify(objetos))
            return objeto.id
        }catch(err){
            console.error(`hubo un error al guardar el archivo : ${err}`)
        }
    }
    async getById(numero){
        try{
            let buscarArchivos= await fs.promises.readdir('./db')
            let existe= buscarArchivos.find(archivo => archivo=== this.nombreDeArchivo)
            if (existe){
                let leer = await fs.promises.readFile(`./db/${this.nombreDeArchivo}`, 'utf-8')
                let parsed =  JSON.parse(leer)
                let encontrado =  parsed.find(objeto => objeto.id === parseInt(numero) )
                if(encontrado){
                    return encontrado
                }else{
                    return null
                } 
            }
        }catch(err){
            console.log(`hubo un error al buscar por id : ${err}`)
        } 
    }

    async updateById(id,producto){
        try{
            let buscarArchivos= await fs.promises.readdir('./db')
            let existe= buscarArchivos.find(archivo => archivo=== this.nombreDeArchivo)
            if (existe){
                let leer = await fs.promises.readFile(`./db/${this.nombreDeArchivo}`, 'utf-8')
                let parsed =  JSON.parse(leer)
                let encontrado =  parsed.findIndex(objeto => objeto.id === parseInt(id) )
                if(encontrado != -1){
                    producto.id = parseInt(id)
                    parsed[encontrado]=producto
                    await fs.promises.writeFile(`./db/${this.nombreDeArchivo}`, JSON.stringify(parsed))
                return producto
                }else{
                    return null
                } 
            }
        }catch(err){
            console.log(`hubo un error al actualizar por id : ${err}`)
        } 
    }


    async deleteById(id){
        try{
            let buscarArchivos= await fs.promises.readdir('./db')
            let existe= buscarArchivos.find(archivo => archivo=== this.nombreDeArchivo)
            if (existe){
                let leer = await fs.promises.readFile(`./db/${this.nombreDeArchivo}`, 'utf-8')
                let parsed =  JSON.parse(leer)
                let filtrado =  parsed.filter(objeto => objeto.id !== parseInt(id) )
                console.log(filtrado)
                await fs.promises.writeFile(`./db/${this.nombreDeArchivo}`, JSON.stringify(filtrado))
                return filtrado
                
            }
        }catch(err){
            console.log(`hubo un error al actualizar por id : ${err}`)
        } 
    }

    async getAll(){
        try{
            let buscarArchivos= await fs.promises.readdir('./db')
            let existe= buscarArchivos.find(archivo => archivo=== this.nombreDeArchivo)
            if (existe){
                let leer = await fs.promises.readFile(`./db/${this.nombreDeArchivo}`, 'utf-8')
                let encontrado =  JSON.parse(leer)
                if(encontrado){
                    return encontrado
                }else{
                    return null
                } 
            }else{
                return ('no existe archivo')
            }

        }catch(err){
            console.log(`hubo un error al buscar todos : ${err}`)
        } 
    }
/*     async deleteAll(){
        try{
            let buscarArchivos= await fs.promises.readdir('./db')
            let existe= buscarArchivos.find(archivo => archivo=== this.nombreDeArchivo)
            if(existe){
                await fs.promises.writeFile(`./db/${this.nombreDeArchivo}`, JSON.stringify([]))
                return null
            }
        }catch(err){
            console.log(`hubo un error al borrar todos : ${err}`)
        } 
    } */
}




module.exports = baseDeDatos