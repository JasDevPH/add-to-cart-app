import './global.css';
import { StatusBar } from 'expo-status-bar';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { CartProvider } from './src/context/CartContext';
import { PRODUCTS } from './src/data/products';
import { Header } from './src/components/Header';
import { ProductCard } from './src/components/ProductCard';
import { CartSummary } from './src/components/CartSummary';

export default function App() {
  return (
    <SafeAreaProvider>
      <CartProvider>
        <SafeAreaView edges={['top']} className="flex-1 bg-indigo-600">
          <StatusBar style="light" />
          <Header />
          <FlatList
            className="flex-1 bg-slate-100"
            contentContainerClassName="p-4 pb-10"
            data={PRODUCTS}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ProductCard product={item} />}
            ListHeaderComponent={
              <Text className="mb-3 text-lg font-bold text-slate-800">Products</Text>
            }
            ListFooterComponent={<CartSummary />}
            keyboardShouldPersistTaps="handled"
          />
          <View className="bg-slate-100" />
        </SafeAreaView>
      </CartProvider>
    </SafeAreaProvider>
  );
}
