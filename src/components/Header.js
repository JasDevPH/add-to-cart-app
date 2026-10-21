import { Text, View } from 'react-native';
import { useCart } from '../hooks/useCart';

export function Header() {
  const { itemCount } = useCart();

  return (
    <View className="flex-row items-center justify-between bg-indigo-600 px-5 pb-4 pt-3">
      <View>
        <Text className="text-2xl font-bold text-white">ShopCart</Text>
        <Text className="text-xs text-indigo-100">Tap “Add to cart” to start shopping</Text>
      </View>
      <View className="flex-row items-center rounded-full bg-white px-3 py-1.5">
        <Text className="text-base">🛒</Text>
        <Text className="ml-1.5 text-base font-bold text-indigo-600">{itemCount}</Text>
      </View>
    </View>
  );
}
