import { PriceRating } from "./price-rating";
import { Type } from "./type";

export class Product {

    private id: number;
    private name: string;
    private description: string;
    private price: number;
    private type: Type;
    private priceRating: PriceRating;
    private image: string;
    private stocked: boolean;

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

    public get getId() {
        return this.id;
    }

    public get getName() {
        return this.name;
    }

    public get getDescription() {
        return this.description;
    }

    public get getPrice() {
        return this.price;
    }

    public get getType() {
        return this.type;
    }

    public get getPriceRating() {
        return this.priceRating;
    }

    public get getImage() {
        return this.image;
    }

    public get getStocked() {
        return this.stocked;
    }
}