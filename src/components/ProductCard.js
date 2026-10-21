import { Pressable, Text, View } from 'react-native';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/cart';

export function ProductCard({ product }) {
  const { addToCart, cart } = useCart();
  const qtyInCart = cart.find((item) => item.id === product.id)?.qty ?? 0;

  return (
    <View className="mb-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <View className="flex-row items-start justify-between">
        <Text className="flex-1 pr-2 text-lg font-semibold text-slate-900">
          {product.productName}
        </Text>
        <Text className="text-lg font-bold text-indigo-600">{formatPrice(product.price)}</Text>
      </View>
      <Text className="mt-1 text-sm text-slate-500">{product.description}</Text>

      <View className="mt-3 flex-row items-center justify-between">
        <Text className="text-xs text-slate-400">
          {qtyInCart > 0 ? `${qtyInCart} in cart` : 'Not in cart'}
        </Text>
        <Pressable
          onPress={() => addToCart(product)}
          className="rounded-xl bg-indigo-600 px-4 py-2 active:bg-indigo-800"
        >
          <Text className="font-semibold text-white">+ Add to cart</Text>
        </Pressable>
      </View>
    </View>
  );
}
