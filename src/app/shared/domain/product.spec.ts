import { PriceRating } from './price-rating';
import { Product } from './product'
import { Type } from './type';

describe("ProductTest", () => {

    let product: Product;

    beforeEach(() => {

        product = new Product(1, "name1", "description1", 10.00, Type.DRINK, PriceRating.REGULAR_PRICE, "image1", true);
    });

    it("getId", () => {

        expect(product.getId)
        .toEqual(1);
    });

    it("getName", () => {

        expect(product.getName)
        .toEqual("name1");
    });

    it("getDescription", () => {

        expect(product.getDescription)
        .toEqual("description1");
    });

    it("getPrice", () => {

        expect(product.getPrice)
        .toEqual(10.00);
    });

    it("getType", () => {

        expect(product.getType)
        .toEqual(Type.DRINK);
    });

    it("getPriceRating", () => {

        expect(product.getPriceRating)
        .toEqual(PriceRating.REGULAR_PRICE);
    });

    it("getImage", () => {

        expect(product.getImage)
        .toEqual("image1");
    });

    it("getStocked", () => {

        expect(product.getStocked)
        .toBeTrue();
    });
});