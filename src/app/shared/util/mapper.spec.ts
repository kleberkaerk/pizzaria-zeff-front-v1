import { Mapper } from "./mapper";
import { ProductDTO } from "../dto/product-dto";
import { Type } from "../domain/type";
import { PriceRating } from "../domain/price-rating";
import { Product } from "../domain/product";

// This test will not have complete coverage, because jasmine considers that a private constructor is the same thing as a method

describe("MapperTest", () => {

    let productDTO: ProductDTO;
    let productToComparison: Product;

    beforeEach(() => {

        productDTO = new ProductDTO(1, "name1", "description1", 10.00, Type.DRINK, PriceRating.REGULAR_PRICE, "image1", true);

        productToComparison = new Product(1, "name1", "description1", 10.00, Type.DRINK, PriceRating.REGULAR_PRICE, "image1", true);
    });

    it("fromProductDTOToProduct", () => {

        expect(Mapper.fromProductDTOToProduct(productDTO))
        .toEqual(productToComparison);
    });
});