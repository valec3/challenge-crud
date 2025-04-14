import db from '../config/firebase.js';

export class OrderService {
    async getAll() {
        const snapshot = await db.collection('orders').get();
        return snapshot.docs.map(doc => {
            const data = doc.data();
            return { id: doc.id, ...data };
        });
    }

    async create(orderData) {
        const orderToSave = {
            items: orderData.items.map(item => ({
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                subtotal: item.price * item.quantity
            })),
            createdAt: new Date().toISOString(),
            total: orderData.items.reduce((sum, item) => 
                sum + (item.price * item.quantity), 0),
            status: 'pending'
        };

        const docRef = await db.collection('orders').add(orderToSave);
        return { id: docRef.id, ...orderToSave };
    }

    async update(id, orderData) {
        const orderToUpdate = {
            items: orderData.items.map(item => ({
                productId: item.productId,
                name: item.name,
                quantity: item.quantity,
                price: item.price
            })),
            updatedAt: new Date().toISOString(),
            total: orderData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        };

        await db.collection('orders').doc(id).update(orderToUpdate);
        return { id, ...orderToUpdate };
    }

    async delete(id) {
        await db.collection('orders').doc(id).delete();
        return true;
    }
}