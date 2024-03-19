import {promises as fs} from "fs"

class ProductManager{
    constructor(){
        this.patch = "./discos.txt"
        this.products = []
    }

    static id = 0

    addProduct = async (title, description, price, image, code, stock) => {

        ProductManager.id++

        let newProduct = {
            id: ProductManager.id,
            title,
            description,
            price,
            image,
            code,
            stock
        };

        this.products.push(newProduct)

        await fs.writeFile(this.patch, JSON.stringify(this.products))
    };

    readProducts = async () =>{
        let respuesta = await fs.readFile(this.patch, "utf-8")
        return JSON.parse(respuesta)
    }

    getProducts = async () => {
        let buscar = await this.readProducts()
        return console.log(buscar)
    }

    getProductsById = async (id) => {
        let buscarId = await this.readProducts()
        if (!buscarId.find(product => product.id === id)){
            console.log("Disco no encontrado");
        } else {
            console.log(buscarId.find(product => product.id === id));
        }
    }

    deleteProductsById = async (id) =>{
        let buscarId = await this.readProducts();
        let productFilter = buscarId.filter(products => products.id != id)
        await fs.writeFile(this.patch, JSON.stringify(productFilter));
        console.log("Disco eliminado")
    }

    modificarProducts = async ({id, ...producto}) =>{
        await this.deleteProductsById(id);
        let productosExistentes = await this.readProducts()
        let modificados = [{id, ...producto}, ...productosExistentes]
        await fs.writeFile(this.patch, JSON.stringify(modificados));
    }
}

const productos = new ProductManager

//productos.addProduct("Nada Personal", "Soda Stereo", 1000, "imagen1", "abc123", 5)
//productos.addProduct("Fuerza Natural", "Gustavo Cerati", 1000, "imagen2", "abc124", 5)
//productos.addProduct("Bocanada", "Gustavo Cerati", 1000, "imagen3", "abc125", 5)
//productos.addProduct("Piano Bar", "Charly Garcia", 1000, "imagen4", "abc126", 5)
//productos.addProduct("Clics Modernos", "Charly Garcia", 1000, "imagen5", "abc127", 5)

//productos.getProducts()

productos.getProductsById(4)

//productos.deleteProductsById(2)

/*productos.modificarProducts({
    id: 1,
    title: 'Nada Personal',
    description: 'Soda Stereo',
    price: 1000,
    image: 'imagen1',
    code: 'abc123',
    stock: 5
})*/