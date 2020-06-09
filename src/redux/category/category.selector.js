import { createSelector } from 'reselect';

const selectCategory = state => state.categories;

export const selectCategories = createSelector(
    [selectCategory],
    categories => cart.cartItems
  );