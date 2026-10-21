import './global.css';
import { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { FlatList, Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { CartProvider } from './src/context/CartContext';
import { PRODUCTS } from './src/data/products';
import { Header } from './src/components/Header';
import { ProductCard } from './src/components/ProductCard';
import { CartModal } from './src/components/CartModal';
import { ViewCartBar } from './src/components/ViewCartBar';

// Keep the native splash (logo on off-white) visible until fonts are ready.
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });
  // UI-only state: whether the cart sheet is open. Cart data lives in CartContext.
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  const openCart = useCallback(() => setCartOpen(true), []);
  const closeCart = useCallback(() => setCartOpen(false), []);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <CartProvider>
        <SafeAreaView edges={['top']} className="flex-1 bg-canvas">
          <StatusBar style="dark" />
          <Header onCartPress={openCart} />
          <FlatList
            className="flex-1"
            contentContainerClassName="px-3.5 pb-32"
            data={PRODUCTS}
            numColumns={2}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ProductCard product={item} />}
            ListHeaderComponent={
              <View className="px-1.5 pb-2 pt-3">
                <Text className="font-inter-bold text-3xl tracking-tight text-ink">Discover</Text>
                <Text className="mt-1 font-inter text-sm text-muted">
                  Everyday tech, thoughtfully picked.
                </Text>
              </View>
            }
            showsVerticalScrollIndicator={false}
          />
          <ViewCartBar onPress={openCart} />
          <CartModal visible={cartOpen} onClose={closeCart} />
        </SafeAreaView>
      </CartProvider>
    </SafeAreaProvider>
  );
}
