import { fromProductDTOToProduct } from "./mapper";
import { ProductDTO } from "../dto/product-dto";
import { Type } from "../domain/type";
import { PriceRating } from "../domain/price-rating";
import { Product } from "../domain/product";

describe("MapperTest", () => {

    let productDTO: ProductDTO;
    let productToComparisonInFromProductDTOToProduct: Product;

    beforeEach(() => {

        productDTO = new ProductDTO(1, "name1", "description1", 10.00, Type.DRINK, PriceRating.REGULAR_PRICE, "image1", true);

        productToComparisonInFromProductDTOToProduct = new Product(1, "name1", "description1", 10.00, Type.DRINK, PriceRating.REGULAR_PRICE, "image1", true);
    });

    it("fromProductDTOToProduct", () => {

        expect(fromProductDTOToProduct(productDTO))
            .toEqual(productToComparisonInFromProductDTOToProduct);
    });
});