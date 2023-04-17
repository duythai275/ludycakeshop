import { createSelector } from 'reselect';

const selectProduct = state => state.products;

export const selectProducts = createSelector(
    [selectProduct],
    products => products.products
  );