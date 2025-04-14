export class Order {
    constructor({ id = null, items = [], status = 'pending' }) {
        this.id = id;
        this.items = items;
        this.status = status;
        this.createdAt = new Date().toISOString();
        this.total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }
}
  