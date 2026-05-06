import orderReducer, { fetchOrders } from './ordersSlice';

const mockOrders = [
    { _id: '1', number: 12345, status: 'done', name: 'Test Order 1', ingredients: [], createdAt: '', updatedAt: '' }
]

describe('ordersSlice', () => {
    const initialState = {
        orders: [],
        isLoading: false,
        error: null,
    };

    it('should return the initial state', () => {
        expect(orderReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('should handle fetchOrders.pending', () => {
        const state = orderReducer(initialState, fetchOrders.pending('')); 
        expect(state.isLoading).toBe(true);
        expect(state.error).toBeNull();
    });

    it('should handle fetchOrders.fulfilled', () => {
        const state = orderReducer(initialState, fetchOrders.fulfilled(mockOrders, '')); 
        expect(state.orders).toEqual(mockOrders);
        expect(state.isLoading).toBe(false);
        expect(state.error).toBeNull();
    });

    it('should handle fetchOrders.rejected', () => {
        const error = 'Failed to fetch orders';
        const state = orderReducer(initialState, fetchOrders.rejected(new Error(error), '')); 
        expect(state.isLoading).toBe(false);
        expect(state.error).toBe(error);
    });
});