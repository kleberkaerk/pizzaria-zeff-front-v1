import { ProductDTO } from "../dto/product-dto";
import { Product } from "../domain/product";
import { AddressDTO } from "../dto/address-dto";
import { Address } from "../domain/address";

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

export function fromAddressDTOToAddress(addressDTO: AddressDTO) {

    return new Address(
        addressDTO.id,
        addressDTO.number,
        addressDTO.road,
        addressDTO.district,
        addressDTO.city,
        addressDTO.state
    );
}
