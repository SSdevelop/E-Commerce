import { cartActionType } from './cart.types';
import { addItemToCart, removeCartFromItem } from './cart.utils';

const initialState = {
	hidden: true,
	cartItems: [],
};

const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case cartActionType.TOGGLE_CART_HIDDEN:
			return {
				...state,
				hidden: !state.hidden,
			};
		case cartActionType.ADD_ITEM:
			return {
				...state,
				cartItems: addItemToCart(state.cartItems, action.payload),
			};
		case cartActionType.REMOVE_ITEM:
			return {
				...state,
				cartItems: removeCartFromItem(state.cartItems, action.payload),
			};
		case cartActionType.CLEAR_ITEM_FROM_CART:
			return {
				...state,
				cartItems: state.cartItems.filter(
					(cartItem) => cartItem.id !== action.payload.id
				),
			};
		default:
			return state;
	}
};

export default cartReducer;
