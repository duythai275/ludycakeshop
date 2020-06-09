import { ProductActionTypes } from './product.type';

export const fetchProducts = products => ({
    type: ProductActionTypes.FETCH_ALL_PRODUCTS,
    payload: products
})