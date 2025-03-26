const Categories =[
    {
        id: 1,
        imagen: require("../../assets/Images/maleta.png"),
        title: 'Alojamientos',
        categoria: 'Alojamientos',
    },
    {
        id:2,
        imagen: require("../../assets/Images/avion.png"),
        title: 'Vuelos',
        categoria: 'Vuelos',
    },
    {
        id:3,
        imagen: require("../../assets/Images/mapa.png"),
        title: 'Actividades',
        categoria: 'Actividades',
    },
    {
        id:4,
        imagen: require("../../assets/Images/coche.png"),
        title: 'Autos',
        categoria: 'Autos',
    },
    {
        id:5,
        imagen: require("../../assets/Images/coche.png"),
        title: 'Paquetes',
        categoria: 'Paquetes',
    },
]
 
export const getCategory = () => {
     let error = false
     return new Promise((resolve, reject) => {
          setTimeout(() =>{
             if (error) {
                 reject("No hay productos")                
             } else {
                 resolve(Categories)
             }
          }, 1000)
     })
}
 
 