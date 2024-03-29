import { ProductDTO } from "../dto/product-dto";
import { Product } from "../domain/product";

export function fromProductDTOToProduct(productDTO: ProductDTO) {

    return new Product(
        productDTO.id,
        productDTO.name,
        productDTO.description,
        productDTO.price,
        productDTO.type,
        productDTO.priceRating,
        productDTO.image,
        productDTO.stocked
    );
}
