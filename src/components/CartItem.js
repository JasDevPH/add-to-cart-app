import { Pressable, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/cart';
import { QtyStepper } from './QtyStepper';

export function CartItem({ item }) {
  const { addToCart, removeFromCart, removeAllOf } = useCart();

  return (
    <View className="flex-row items-center border-b border-line py-3.5">
      <View className="h-14 w-14 items-center justify-center rounded-2xl bg-tile">
        <Feather name={item.icon} size={22} color="#111111" />
      </View>

      <View className="ml-3 flex-1">
        <Text numberOfLines={1} className="font-inter-semibold text-[15px] text-ink">
          {item.productName}
        </Text>
        <Text className="mt-0.5 font-inter text-xs text-muted">
          {formatPrice(item.price)} × {item.qty}
        </Text>
        <Text className="mt-1 font-inter-bold text-sm text-ink">
          {formatPrice(item.price * item.qty)}
        </Text>
      </View>

      <View className="items-end">
        <Pressable
          onPress={() => removeAllOf(item.id)}
          accessibilityLabel={`Remove ${item.productName}`}
          hitSlop={8}
          className="mb-2 p-1"
        >
          <Feather name="trash-2" size={16} color="#6B7280" />
        </Pressable>
        <QtyStepper
          size="sm"
          qty={item.qty}
          onDecrement={() => removeFromCart(item.id)}
          onIncrement={() => addToCart(item)}
        />
      </View>
    </View>
  );
}
