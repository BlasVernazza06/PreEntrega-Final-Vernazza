const products = [
    {
      id: "1",
      stock: 12,
      numProducto: "Product-1",
      imagen: require("../../assets/itemProducts/Barcelona-Foto4.jpg"),
      pais: "España", 
      nombre: "Paquete a Barcelona",
      desde: "Mié 26 Jun",
      hasta: "Lun 01 Jul",
      origen: "BUE",
      destino: "BAR",
      precio: 880.912,
      category: 'Paquetes',
    },
    {
      id: "2",
      stock: 9,
      numProducto: "Product-2",
      imagen: require("../../assets/itemProducts/LaCumbrecita-Foto2.jpg"),
      pais: "Argentina",
      nombre: "Paquete a Córdoba",
      desde: "Mié 25 Sep",
      hasta: "Mar 01 Oct",
      origen: "BUE",
      destino: "COR",
      precio: 181.536,
      category: 'Paquetes',
    },
    
    {
        id: 3 , 
        stock: 7, 
        numProducto: "Product-3", 
        imagen: require("../../assets/itemProducts/Salta.jpeg"), 
        pais: "Argentina", 
        nombre: "Paquete a Salta", 
        desde: "Mié 22 Ene", 
        hasta: "Lun 27 Ene", 
        origen: "BUE", 
        destino: "SAL", 
        precio: 246.865,
        category: 'Paquetes'
    },

    {
        id: 4 , 
        stock: 16, 
        numProducto: "Product-4", 
        imagen: require("../../assets/itemProducts/LosAngeles-Foto3.jpg"), 
        pais: "Estados Unidos", 
        nombre: "Paquete a los Angeles", 
        desde: "Dom 23 Jun", 
        origen: "BUE", 
        destino: "LA", 
        hasta: "Vie 28 Jun", 
        precio: 538.321,
        category: 'Paquetes'
    },

    {
        id: 5 , 
        stock: 1, 
        numProducto: "Product-5", 
        imagen: require("../../assets/itemProducts/Berlin-Foto5.jpg"), 
        pais: "República Federal de Alemania", 
        nombre: "Paquete a Berlin", 
        desde: "Sab 26 Ago", 
        origen: "BUE", 
        destino: "BER", 
        hasta: "Vie 05 Sep", 
        precio: 738.321,
        category: 'Paquetes'
    },
    
    {
        id: 6 , 
        stock: 1, 
        numProducto: "Product-6", 
        imagen: require("../../assets/itemProducts/Francia-Foto6.jpg"), 
        pais: "Francia", 
        nombre: "Paquete a Paris", 
        desde: "Lun 02 Dic", 
        origen: "BUE", 
        destino: "PAR", 
        hasta: "Vie 15 Dic", 
        precio: 938.321,
        category: 'Paquetes'
    
    }
]

export const getProducts = () => {
    let error = false
    return new Promise((resolve, reject) => {
        setTimeout(() =>{
            if (error) {
                reject("No hay productos")                
            } else {
                resolve(products)
            }
        }, 2000)
    })
}

