import db from '../config/firebase.js';
import { Category } from '../models/Category.js';

export class CategoryService {
    async getAll() {
        const snapshot = await db.collection('categories').get();
        return snapshot.docs.map(doc => new Category({ id: doc.id, ...doc.data() }));
    }

    async getById(id) {
        const doc = await db.collection('categories').doc(id).get();
        if (!doc.exists) return null;
        return new Category({ id: doc.id, ...doc.data() });
    }

    async create(categoryData) {
        const docRef = await db.collection('categories').add(categoryData);
        return new Category({ id: docRef.id, ...categoryData });
    }

    async update(id, categoryData) {
        await db.collection('categories').doc(id).update(categoryData);
        return new Category({ id, ...categoryData });
    }

    async delete(id) {
        await db.collection('categories').doc(id).delete();
        return true;
    }
}