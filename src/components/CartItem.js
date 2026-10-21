import { Pressable, Text, View } from 'react-native';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/cart';

export function CartItem({ item }) {
  const { addToCart, removeFromCart, removeAllOf } = useCart();

  return (
    <View className="flex-row items-center border-b border-slate-100 py-3">
      <View className="flex-1">
        <Text className="font-semibold text-slate-900">{item.productName}</Text>
        <Text className="text-sm text-slate-500">
          {formatPrice(item.price)} × {item.qty} = {formatPrice(item.price * item.qty)}
        </Text>
      </View>

      <View className="flex-row items-center">
        <Pressable
          onPress={() => removeFromCart(item.id)}
          className="h-8 w-8 items-center justify-center rounded-lg bg-slate-200 active:bg-slate-300"
        >
          <Text className="text-lg font-bold text-slate-700">−</Text>
        </Pressable>
        <Text className="w-8 text-center font-semibold">{item.qty}</Text>
        <Pressable
          onPress={() => addToCart(item)}
          className="h-8 w-8 items-center justify-center rounded-lg bg-slate-200 active:bg-slate-300"
        >
          <Text className="text-lg font-bold text-slate-700">+</Text>
        </Pressable>
        <Pressable
          onPress={() => removeAllOf(item.id)}
          className="ml-2 rounded-lg bg-rose-100 px-2 py-1.5 active:bg-rose-200"
        >
          <Text className="text-xs font-semibold text-rose-600">Remove</Text>
        </Pressable>
      </View>
    </View>
  );
}
