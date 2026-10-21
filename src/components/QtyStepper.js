import { Pressable, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

// Compact − qty + control shared by product cards and cart lines.
export function QtyStepper({ qty, onDecrement, onIncrement, size = 'md' }) {
  const button = size === 'sm' ? 'h-7 w-7' : 'h-8 w-8';
  const icon = size === 'sm' ? 14 : 16;

  return (
    <View className="flex-row items-center rounded-full bg-tile p-0.5">
      <Pressable
        onPress={onDecrement}
        accessibilityLabel="Remove one"
        className={`${button} items-center justify-center rounded-full bg-white active:bg-line`}
      >
        <Feather name="minus" size={icon} color="#111111" />
      </Pressable>
      <Text className="min-w-7 text-center font-inter-semibold text-sm text-ink">{qty}</Text>
      <Pressable
        onPress={onIncrement}
        accessibilityLabel="Add one"
        className={`${button} items-center justify-center rounded-full bg-ink active:opacity-80`}
      >
        <Feather name="plus" size={icon} color="#FFFFFF" />
      </Pressable>
    </View>
  );
}
