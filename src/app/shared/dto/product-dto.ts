import { Type } from "../domain/type";
import { PriceRating } from "../domain/price-rating";

export class ProductDTO {

    public id: number;
    public name: string;
    public description: string;
    public price: number;
    public type: Type;
    public priceRating: PriceRating;
    public image: string;
    public stocked: boolean;

    constructor(
        id: number,
        name: string,
        description: string,
        price: number,
        type: Type,
        priceRating: PriceRating,
        image: string,
        stocked: boolean
    ) {

        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.type = type;
        this.priceRating = priceRating;
        this.image = image;
        this.stocked = stocked;
    }
}