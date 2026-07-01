import { createEndpointHook } from "@/lib/api/lib/endpoints";
import { endpointsMap } from "@/lib/api/lib/endpointsMap";
import { CartAddItemBody, CartServer, CartUpdateItemBody } from "../model";

export const useGetCart = createEndpointHook<CartServer>(
  endpointsMap.cart.get
);

export const useAddCartItem = createEndpointHook<CartAddItemBody, CartServer>(
  endpointsMap.cart.addItem
);

export const useUpdateCartItem = createEndpointHook<CartUpdateItemBody, void>(
  endpointsMap.cart.updateItem
);

export const useRemoveCartItem = createEndpointHook<void, void>(
  endpointsMap.cart.removeItem
);

export const useClearCart = createEndpointHook<void, void>(
  endpointsMap.cart.clear
);

export const useCheckoutCart = createEndpointHook<void, CartServer>(
  endpointsMap.cart.checkout
);
