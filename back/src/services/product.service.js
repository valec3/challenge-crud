import db from '../config/firebase.js';
import { Product } from '../models/Product.js';

export class ProductService {
    async getAll() {
        const snapshot = await db.collection('products').get();
        return snapshot.docs.map(doc => new Product({ id: doc.id, ...doc.data() }));
    }

    async getById(id) {
        const doc = await db.collection('products').doc(id).get();
        if (!doc.exists) return null;
        return new Product({ id: doc.id, ...doc.data() });
    }

    async create(productData) {
        const docRef = await db.collection('products').add(productData);
        return new Product({ id: docRef.id, ...productData });
    }

    async update(id, productData) {
        await db.collection('products').doc(id).update(productData);
        return new Product({ id, ...productData });
    }

    async delete(id) {
        await db.collection('products').doc(id).delete();
        return true;
    }

    async getByCategory(category) {
        const snapshot = await db.collection('products')
            .where('category', '==', category)
            .get();
        return snapshot.docs.map(doc => new Product({ id: doc.id, ...doc.data() }));
    }
}