import { Injectable, NotFoundException } from '@nestjs/common'
import {Product} from './product.model'

@Injectable()
export class ProductsService {
    private products: Product[] = []


    insertProduct(title: string, desc: string, price: number) {
        const prodId = Math.floor(Math.random() * Math.floor(10)).toString()
        const newProduct = new Product(prodId, title, desc, price)
        this.products.push(newProduct)
        return prodId
    }

    getProducts(){
        return [...this.products]
    }
  
    getSingleProduct(productId: string){
        const product = this.findProduct(productId)[0]
        
        return {...product}
    }

    updateProduct(productId: string, title: string, desc: string, price: number){
        const [product, index] = this.findProduct(productId)
        console.log('updateProduct productId', productId);
        console.log('updateProduct title', title);
        console.log('updateProduct desc', desc);
        console.log('updateProduct price', price);
        
        const updatedProduct = {...product}
        if(title) {
        console.log('--------------');

            updatedProduct.title = title
        }
        if(desc) {
            updatedProduct.description = desc
        }
        if(price) {
            updatedProduct.price = price
        }
        this.products[index] = updatedProduct
        console.log('updateProduct this.products[index]', this.products[index]);
    }

    deleteProduct(prodId: string){
        // find product and product index
        // const [product, index] = this.findProduct(prodId)

        // find only index
        const index = this.findProduct(prodId)[1]

        this.products.splice(index, 1)
    }

    private findProduct(id: string): [Product, number] {
        const productIndex = this.products.findIndex(product => product.id === id)
        const product = this.products[productIndex]
        if (!product) {
            throw new NotFoundException("Cuould not find a product");
            
        }
        
        return [product, productIndex]
    }
}