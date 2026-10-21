import { Pressable, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import colors from '../theme/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/cart';

// Floating pill that appears once the cart has items; tapping it opens the cart modal.
export function ViewCartBar({ onPress }) {
  const { itemCount, discountedTotal } = useCart();
  const insets = useSafeAreaInsets();

  if (itemCount === 0) return null;

  return (
    <View
      pointerEvents="box-none"
      className="absolute inset-x-0 bottom-0 px-5"
      style={{ paddingBottom: Math.max(insets.bottom, 12) + 4 }}
    >
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel="View cart"
        className="flex-row items-center justify-between rounded-full bg-ink py-3 pl-3 pr-5 shadow-lg active:opacity-90"
      >
        <View className="flex-row items-center">
          <View className="h-9 w-9 items-center justify-center rounded-full bg-white/15">
            <Feather name="shopping-bag" size={17} color={colors.white} />
          </View>
          <Text className="ml-3 font-inter-semibold text-[15px] text-white">View cart</Text>
          <View className="ml-2 rounded-full bg-white/15 px-2 py-0.5">
            <Text className="font-inter-medium text-xs text-white">{itemCount}</Text>
          </View>
        </View>
        <Text className="font-inter-bold text-[15px] text-white">{formatPrice(discountedTotal)}</Text>
      </Pressable>
    </View>
  );
}
