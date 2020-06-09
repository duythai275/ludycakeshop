import { CategoryActionTypes } from './category.type';

export const fetchCategories = categories => ({
    type: CategoryActionTypes.FETCH_ALL_CATEGORIES,
    payload: categories
});