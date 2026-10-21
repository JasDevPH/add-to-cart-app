import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/cart';
import { CartItem } from './CartItem';

const SHEET_OFFSET = 700;

// Bottom-sheet cart: the backdrop fades (Modal animationType="fade") while the
// sheet itself springs up from the bottom with an Animated translateY.
export function CartModal({ visible, onClose }) {
  const {
    cart,
    itemCount,
    total,
    discountedTotal,
    discountRate,
    voucherApplied,
    voucherError,
    applyVoucher,
    clearVoucher,
  } = useCart();
  const insets = useSafeAreaInsets();
  // Local UI state: what the user is typing. Only the applied result lives in context.
  const [code, setCode] = useState('');
  const translateY = useRef(new Animated.Value(SHEET_OFFSET)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        speed: 16,
        bounciness: 0,
      }).start();
    } else {
      translateY.setValue(SHEET_OFFSET);
    }
  }, [visible, translateY]);

  const isEmpty = cart.length === 0;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 justify-end"
      >
        <Pressable
          onPress={onClose}
          accessibilityLabel="Close cart"
          className="absolute inset-0 bg-black/40"
        />

        <Animated.View style={{ transform: [{ translateY }], maxHeight: '88%' }}>
          <View
            className="rounded-t-[28px] bg-white px-5 pt-2"
            style={{ paddingBottom: Math.max(insets.bottom, 16) + 8 }}
          >
            <View className="mb-3 items-center">
              <View className="h-1 w-10 rounded-full bg-line" />
            </View>

            <View className="flex-row items-center justify-between">
              <View className="flex-row items-baseline">
                <Text className="font-inter-bold text-2xl tracking-tight text-ink">Cart</Text>
                <Text className="ml-2 font-inter text-sm text-muted">
                  {itemCount} {itemCount === 1 ? 'item' : 'items'}
                </Text>
              </View>
              <Pressable
                onPress={onClose}
                accessibilityLabel="Close cart"
                className="h-9 w-9 items-center justify-center rounded-full bg-tile active:bg-line"
              >
                <Feather name="x" size={18} color="#111111" />
              </Pressable>
            </View>

            {isEmpty ? (
              <View className="items-center py-14">
                <View className="h-16 w-16 items-center justify-center rounded-full bg-tile">
                  <Feather name="shopping-bag" size={26} color="#6B7280" />
                </View>
                <Text className="mt-4 font-inter-semibold text-base text-ink">Your cart is empty</Text>
                <Text className="mt-1 font-inter text-sm text-muted">Add something you love.</Text>
              </View>
            ) : (
              <>
                <ScrollView className="mt-1" style={{ maxHeight: 300 }}>
                  {cart.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </ScrollView>

                {/* Voucher */}
                <View className="mt-4">
                  {voucherApplied ? (
                    <View className="flex-row items-center justify-between rounded-2xl bg-emerald-50 px-4 py-3">
                      <View className="flex-row items-center">
                        <Feather name="tag" size={16} color="#059669" />
                        <Text className="ml-2 font-inter-semibold text-sm text-accent">
                          DISCOUNT10 · {Math.round(discountRate * 100)}% off
                        </Text>
                      </View>
                      <Pressable
                        onPress={() => {
                          clearVoucher();
                          setCode('');
                        }}
                        hitSlop={8}
                      >
                        <Text className="font-inter-medium text-sm text-muted underline">Remove</Text>
                      </Pressable>
                    </View>
                  ) : (
                    <View className="flex-row items-center rounded-2xl border border-line bg-canvas pl-4 pr-1.5">
                      <Feather name="tag" size={16} color="#6B7280" />
                      <TextInput
                        value={code}
                        onChangeText={setCode}
                        placeholder="Voucher code"
                        placeholderTextColor="#9CA3AF"
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="done"
                        onSubmitEditing={() => applyVoucher(code)}
                        className="flex-1 px-3 py-3 font-inter text-sm text-ink"
                      />
                      <Pressable
                        onPress={() => applyVoucher(code)}
                        disabled={code.trim().length === 0}
                        className={`rounded-xl px-4 py-2 ${
                          code.trim().length === 0 ? 'bg-line' : 'bg-ink active:opacity-80'
                        }`}
                      >
                        <Text className="font-inter-semibold text-sm text-white">Apply</Text>
                      </Pressable>
                    </View>
                  )}
                  {voucherError ? (
                    <Text className="ml-1 mt-1.5 font-inter text-xs text-rose-600">{voucherError}</Text>
                  ) : null}
                </View>

                {/* Totals */}
                <View className="mt-5">
                  <View className="flex-row justify-between">
                    <Text className="font-inter text-sm text-muted">Subtotal</Text>
                    <Text
                      className={`font-inter-medium text-sm ${
                        voucherApplied ? 'text-muted line-through' : 'text-ink'
                      }`}
                    >
                      {formatPrice(total)}
                    </Text>
                  </View>
                  {voucherApplied ? (
                    <View className="mt-1.5 flex-row justify-between">
                      <Text className="font-inter text-sm text-accent">Discount (10%)</Text>
                      <Text className="font-inter-medium text-sm text-accent">
                        −{formatPrice(total - discountedTotal)}
                      </Text>
                    </View>
                  ) : null}
                  <View className="mt-3 flex-row items-end justify-between border-t border-line pt-3">
                    <Text className="font-inter-semibold text-base text-ink">Total</Text>
                    <Text className="font-inter-bold text-2xl tracking-tight text-ink">
                      {formatPrice(discountedTotal)}
                    </Text>
                  </View>
                </View>
              </>
            )}

            <Pressable
              onPress={onClose}
              className="mt-5 items-center rounded-full bg-ink py-4 active:opacity-80"
            >
              <Text className="font-inter-semibold text-[15px] text-white">Continue shopping</Text>
            </Pressable>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
