import * as actionTypes from "../actions/actionsTypes";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,

  loadingOrders: false,
  ordersError: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false
      };
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return {
        ...state,
        loading: false,
        purchased: true,
        orders: state.orders.concat([
          {
            ...action.orderData,
            key: action.orderId
          }
        ])
      };

    case actionTypes.PURCHASE_BURGER_FAIL:
      return state;

    case actionTypes.FETCH_ORDERS_START:
      return {
        ...state,
        loadingOrders: true
      };

    case actionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.orders,
        loadingOrders: false
      };

    case actionTypes.FETCH_ORDERS_FAIL:
      return {
        ...state,
        loadingOrders: false,
        ordersError: false
      };

    default:
      return state;
  }
};

export default reducer;
