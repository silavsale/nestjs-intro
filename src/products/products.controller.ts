import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { ProductsService } from './products.service';



@Controller('products')
export class  ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    addProduct(
        @Body('title') prodTitle: string, 
        @Body('description') prodDesc: string, 
        @Body('price') prodPrice: number
        ) {
            console.log('prodTitle', prodTitle);
            console.log('prodDesc', prodDesc);
            console.log('prodPrice', prodPrice);

            const generatedId = this.productsService.insertProduct(prodTitle, prodDesc, prodPrice)
            console.log('generatedId', generatedId);
        
        return {id: generatedId}
    }

    @Get()
    getAllProducts() {
        return this.productsService.getProducts()
    }

    @Get(':id')
    getProduct(@Param('id') prodId: string) {
            return this.productsService.getSingleProduct(prodId)
    }

    @Patch(':id')
    updateProduct(
        @Param('id') prodId: string,
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number
        ) {
            console.log("updateProduct ++++++==== prodId", prodId);
            console.log("updateProduct ++++++==== prodTitle", prodTitle);
            console.log("updateProduct ++++++==== prodDesc", prodDesc);
            console.log("updateProduct ++++++==== prodPrice", prodPrice);
            
            
            this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice)
            return null
        }
        
    @Delete(':id')
    removeProduct(
        @Param('id') prodId: string,
    ){
        this.productsService.deleteProduct(prodId)
        return null
    }
}