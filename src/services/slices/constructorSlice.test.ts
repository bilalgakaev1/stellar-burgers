import constructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  closeOrderModal
} from './constructorSlice';
import { TIngredient } from '@utils-types';

const mockIngredient: TIngredient = {
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
};

const mockIngredientMain: TIngredient = {
  _id: '2',
  name: 'Говяжий метеорит',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 3000,
  image: 'main.png',
  image_mobile: 'main-mobile.png',
  image_large: 'main-large.png'
};

describe('constructorSlice', () => {
  const initialState = {
    constructorItems: { bun: null, ingredients: [] },
    orderRequest: false,
    orderModalData: null,
    error: null
  };

  it('должен вернуть начальное состояние', () => {
    expect(constructorReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('addIngredient — добавляет булку', () => {
    const state = constructorReducer(
      initialState,
      addIngredient(mockIngredient)
    );
    expect(state.constructorItems.bun).not.toBeNull();
    expect(state.constructorItems.bun?._id).toBe('1');
  });

  it('addIngredient — заменяет булку при добавлении новой', () => {
    const stateWithBun = constructorReducer(
      initialState,
      addIngredient(mockIngredient)
    );
    const newBun: TIngredient = {
      ...mockIngredient,
      _id: '99',
      name: 'Новая булка'
    };
    const state = constructorReducer(stateWithBun, addIngredient(newBun));
    expect(state.constructorItems.bun?._id).toBe('99');
  });

  it('addIngredient — добавляет начинку', () => {
    const state = constructorReducer(
      initialState,
      addIngredient(mockIngredientMain)
    );
    expect(state.constructorItems.ingredients).toHaveLength(1);
    expect(state.constructorItems.ingredients[0]._id).toBe('2');
  });

  it('addIngredient — добавляет уникальный id каждому ингредиенту', () => {
    let state = constructorReducer(
      initialState,
      addIngredient(mockIngredientMain)
    );
    state = constructorReducer(state, addIngredient(mockIngredientMain));
    const [first, second] = state.constructorItems.ingredients;
    expect(first.id).not.toBe(second.id);
  });

  it('removeIngredient — удаляет ингредиент по id', () => {
    let state = constructorReducer(
      initialState,
      addIngredient(mockIngredientMain)
    );
    const id = state.constructorItems.ingredients[0].id;
    state = constructorReducer(state, removeIngredient(id));
    expect(state.constructorItems.ingredients).toHaveLength(0);
  });

  it('moveIngredient — перемещает ингредиент вниз', () => {
    let state = constructorReducer(
      initialState,
      addIngredient(mockIngredientMain)
    );
    const second: TIngredient = {
      ...mockIngredientMain,
      _id: '3',
      name: 'Второй'
    };
    state = constructorReducer(state, addIngredient(second));
    const firstId = state.constructorItems.ingredients[0].id;
    state = constructorReducer(
      state,
      moveIngredient({ fromIndex: 0, toIndex: 1 })
    );
    expect(state.constructorItems.ingredients[1].id).toBe(firstId);
  });

  it('moveIngredient — перемещает ингредиент вверх', () => {
    let state = constructorReducer(
      initialState,
      addIngredient(mockIngredientMain)
    );
    const second: TIngredient = {
      ...mockIngredientMain,
      _id: '3',
      name: 'Второй'
    };
    state = constructorReducer(state, addIngredient(second));
    const secondId = state.constructorItems.ingredients[1].id;
    state = constructorReducer(
      state,
      moveIngredient({ fromIndex: 1, toIndex: 0 })
    );
    expect(state.constructorItems.ingredients[0].id).toBe(secondId);
  });
});
