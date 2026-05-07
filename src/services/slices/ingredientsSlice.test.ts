import ingredienyReducer, { fetchIngredients } from './ingredientsSlice';
import { TIngredient } from '@utils-types';

const mockIngredients: TIngredient[] = [
  {
    _id: '1',
    name: 'Краторная булка',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'bun.png',
    image_mobile: 'bun-mobile.png',
    image_large: 'bun-large.png'
  }
];

describe('ingredientsSlice', () => {
  const initialState = {
    ingredients: [],
    isLoading: false,
    error: null
  };

  it('должен вернуть начальное состояние', () => {
    expect(ingredienyReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('fetchIngredients.pending — устанавливает isLoading в true', () => {
    const state = ingredienyReducer(initialState, fetchIngredients.pending(''));
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('fetchIngredients.fulfilled — устанавливает ингредиенты и isLoading в false', () => {
    const state = ingredienyReducer(
      { ...initialState, isLoading: true },
      fetchIngredients.fulfilled(mockIngredients, '', undefined)
    );
    expect(state.isLoading).toBe(false);
    expect(state.ingredients).toEqual(mockIngredients);
    expect(state.error).toBeNull();
  });

  it('fetchIngredients.rejected — устанавливает ошибку и isLoading в false', () => {
    const errorMessage = 'Ошибка загрузки ингредиентов';
    const state = ingredienyReducer(
      { ...initialState, isLoading: true },
      fetchIngredients.rejected(new Error(errorMessage), '', undefined)
    );
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
    expect(state.ingredients).toEqual([]);
  });
});
