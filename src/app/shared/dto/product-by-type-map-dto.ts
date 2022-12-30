import { ProductDTO } from "./product-dto";

export class ProductsMapByTypeDTO {

    public SALTY_PIZZA: Readonly<Array<ProductDTO>>;
    public SWEET_PIZZA: Readonly<Array<ProductDTO>>;
    public SALTY_ESFIHA: Readonly<Array<ProductDTO>>;
    public SWEET_ESFIHA: Readonly<Array<ProductDTO>>;
    public DRINK: Readonly<Array<ProductDTO>>;

    constructor(
        saltyPizzas: Array<ProductDTO>,
        sweetPizzas: Array<ProductDTO>,
        saltyEsfihas: Array<ProductDTO>,
        sweetEsfihas: Array<ProductDTO>,
        drinks: Array<ProductDTO>
    ) {

        this.SALTY_PIZZA = saltyPizzas;
        this.SWEET_PIZZA = sweetPizzas;
        this.SALTY_ESFIHA = saltyEsfihas;
        this.SWEET_ESFIHA = sweetEsfihas;
        this.DRINK = drinks;
    }
}