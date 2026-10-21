import { Pressable, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import colors from '../theme/colors';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/cart';
import { QtyStepper } from './QtyStepper';

export function ProductCard({ product }) {
  const { addToCart, removeFromCart, cart } = useCart();
  const qtyInCart = cart.find((item) => item.id === product.id)?.qty ?? 0;

  return (
    <View className="m-1.5 flex-1 rounded-3xl border border-line bg-white p-3">
      <View className="aspect-square items-center justify-center rounded-2xl bg-tile">
        <Feather name={product.icon} size={40} color={colors.ink} />
      </View>

      <Text numberOfLines={1} className="mt-3 font-inter-semibold text-[15px] text-ink">
        {product.productName}
      </Text>
      <Text numberOfLines={2} className="mt-0.5 h-8 font-inter text-xs leading-4 text-muted">
        {product.description}
      </Text>

      <View className="mt-3 flex-row items-center justify-between">
        <Text className="font-inter-bold text-[15px] text-ink">{formatPrice(product.price)}</Text>
        {qtyInCart === 0 ? (
          <Pressable
            onPress={() => addToCart(product)}
            accessibilityRole="button"
            accessibilityLabel={`Add ${product.productName} to cart`}
            className="h-8 w-8 items-center justify-center rounded-full bg-ink active:opacity-80"
          >
            <Feather name="plus" size={16} color={colors.white} />
          </Pressable>
        ) : null}
      </View>

      {qtyInCart > 0 ? (
        <View className="mt-2 items-end">
          <QtyStepper
            size="sm"
            qty={qtyInCart}
            onDecrement={() => removeFromCart(product.id)}
            onIncrement={() => addToCart(product)}
          />
        </View>
      ) : null}
    </View>
  );
}
