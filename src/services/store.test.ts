import store from "./store";

describe('rootReducer', () => {
    it('should return the initial state', () => {
        const state = store.getState();
        expect(state).toHaveProperty('feed');
        expect(state).toHaveProperty('orders');
        expect(state).toHaveProperty('user');
        expect(state).toHaveProperty('ingredients');
        expect(state).toHaveProperty('burgerConstructor');
    });

    it('ingredients — начальное состояние корректно', () => {
        expect(store.getState().ingredients.ingredients).toEqual([]);
        expect(store.getState().ingredients.isLoading).toBe(false);
        expect(store.getState().ingredients.error).toBeNull();
    });
    
    it('burgerConstructor — начальное состояние корректно', () => {
        expect(store.getState().burgerConstructor.constructorItems.bun).toBeNull();
        expect(store.getState().burgerConstructor.constructorItems.ingredients).toEqual([]);
    });
});