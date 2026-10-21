import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/cart';
import { CartItem } from './CartItem';

export function CartSummary() {
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
  // Local UI state: what the user is typing. Only the applied result lives in context.
  const [code, setCode] = useState('');

  return (
    <View className="mt-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <View className="flex-row items-center justify-between">
        <Text className="text-xl font-bold text-slate-900">Your Cart</Text>
        <View className="rounded-full bg-indigo-100 px-3 py-1">
          <Text className="font-semibold text-indigo-700">
            {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </Text>
        </View>
      </View>

      {cart.length === 0 ? (
        <Text className="py-6 text-center text-slate-400">Your cart is empty.</Text>
      ) : (
        <View className="mt-2">
          {cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </View>
      )}

      {/* Voucher */}
      <View className="mt-4">
        <Text className="mb-1 text-sm font-semibold text-slate-700">Voucher code</Text>
        <View className="flex-row">
          <TextInput
            value={code}
            onChangeText={setCode}
            placeholder="e.g. discount10"
            autoCapitalize="none"
            autoCorrect={false}
            editable={!voucherApplied}
            className="flex-1 rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900"
          />
          {voucherApplied ? (
            <Pressable
              onPress={() => {
                clearVoucher();
                setCode('');
              }}
              className="ml-2 justify-center rounded-xl bg-slate-200 px-4 active:bg-slate-300"
            >
              <Text className="font-semibold text-slate-700">Remove</Text>
            </Pressable>
          ) : (
            <Pressable
              onPress={() => applyVoucher(code)}
              disabled={cart.length === 0}
              className={`ml-2 justify-center rounded-xl px-4 ${
                cart.length === 0 ? 'bg-slate-300' : 'bg-emerald-600 active:bg-emerald-700'
              }`}
            >
              <Text className="font-semibold text-white">Apply</Text>
            </Pressable>
          )}
        </View>
        {voucherError ? <Text className="mt-1 text-sm text-rose-600">{voucherError}</Text> : null}
        {voucherApplied ? (
          <Text className="mt-1 text-sm text-emerald-600">
            Voucher applied: {Math.round(discountRate * 100)}% off
          </Text>
        ) : null}
      </View>

      {/* Totals */}
      <View className="mt-4 border-t border-slate-200 pt-3">
        <View className="flex-row justify-between">
          <Text className="text-slate-500">Subtotal</Text>
          <Text
            className={`text-slate-700 ${voucherApplied ? 'line-through text-slate-400' : ''}`}
          >
            {formatPrice(total)}
          </Text>
        </View>
        {voucherApplied ? (
          <View className="mt-1 flex-row justify-between">
            <Text className="text-emerald-600">Discount (10%)</Text>
            <Text className="text-emerald-600">−{formatPrice(total - discountedTotal)}</Text>
          </View>
        ) : null}
        <View className="mt-2 flex-row justify-between">
          <Text className="text-lg font-bold text-slate-900">Total</Text>
          <Text className="text-lg font-bold text-indigo-600">{formatPrice(discountedTotal)}</Text>
        </View>
      </View>
    </View>
  );
}
