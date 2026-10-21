import { Image, Pressable, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import colors from '../theme/colors';
import { useCart } from '../hooks/useCart';
import appConfig from '../../app.json';

const logo = require('../assets/logo-mark.png');
// Brand name comes from app.json, the same name shown under the app icon.
const APP_NAME = appConfig.expo.name;

export function Header({ onCartPress }) {
  const { itemCount } = useCart();

  return (
    <View className="flex-row items-center justify-between bg-canvas px-5 pb-3 pt-2">
      <View className="flex-row items-center">
        <Image source={logo} style={{ width: 36, height: 36 }} accessibilityIgnoresInvertColors />
        <Text className="ml-2.5 font-inter-bold text-xl tracking-tight text-ink">{APP_NAME}</Text>
      </View>

      <Pressable
        onPress={onCartPress}
        accessibilityRole="button"
        accessibilityLabel={`Open cart, ${itemCount} items`}
        className="h-11 w-11 items-center justify-center rounded-full border border-line bg-white active:bg-tile"
      >
        <Feather name="shopping-bag" size={20} color={colors.ink} />
        {itemCount > 0 ? (
          <View className="absolute -right-1 -top-1 h-5 min-w-5 items-center justify-center rounded-full bg-ink px-1">
            <Text className="font-inter-semibold text-[11px] text-white">{itemCount}</Text>
          </View>
        ) : null}
      </Pressable>
    </View>
  );
}
