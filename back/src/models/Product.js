export class Product {
    constructor({ id = null, name, price, ingredients = [], category }) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.ingredients = ingredients;
        this.category = category;
    }
}
  