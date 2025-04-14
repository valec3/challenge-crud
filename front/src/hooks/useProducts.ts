import { useState, useEffect } from 'react';
import { productService } from '@/services/productService';
import type { Product } from '@/lib/types';
import { useToast } from '@/hooks/useToast';

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    const fetchProducts = async () => {
        try {
            const data = await productService.getAllProducts();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
            toast({
                title: "Error",
                description: "Failed to fetch products",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const createProduct = async (productData: Omit<Product, 'id'>) => {
        try {
            const newProduct = await productService.createProduct(productData);
            setProducts(prev => [...prev, newProduct]);
            toast({
                title: "Success",
                description: "Product created successfully",
            });
            return true;
        } catch (error) {
            console.error('Error creating product:', error);
            toast({
                title: "Error",
                description: "Failed to create product",
                variant: "destructive",
            });
            return false;
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return {
        products,
        loading,
        createProduct,
        refreshProducts: fetchProducts
    };
}