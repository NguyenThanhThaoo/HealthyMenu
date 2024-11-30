// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   ActivityIndicator,
//   TouchableOpacity,
//   Image,
//   ImageBackground,
//   Button
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// import RecipesDetail from '../../screens/recipes/RecipesDetailsScreen'
// import { RootStackParamList } from '../../navigators/MainNavigator';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { useNavigation } from '@react-navigation/native';
// import { ImageComponent } from 'react-native';

// // Định nghĩa kiểu điều hướng
// type FavoritesScreenNavigationProp = NativeStackNavigationProp<
//   RootStackParamList,
//   'Detail'
// >;

// const FavoritesScreen = () => {
//   // const [favorites, setFavorites] = useState<any[]>([]);
//   // const [loading, setLoading] = useState(true);

//   // Sử dụng kiểu điều hướng đã định nghĩa
//   const navigation = useNavigation<FavoritesScreenNavigationProp>();


//   // Fetch favorite recipes from the API
//   // useEffect(() => {
//   //   const fetchFavorites = async () => {
//   //     try {
//   //       const response = await fetch('http://your-api-url/users/favorites');
//   //       if (response.ok) {
//   //         const data = await response.json();
//   //         setFavorites(data);
//   //       } else {
//   //         console.error('Failed to fetch favorites');
//   //       }
//   //     } catch (error) {
//   //       console.error('Error fetching favorites:', error);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchFavorites();
//   // }, []);
//   const [localFavorites, setLocalFavorites] = useState([
//     {
//       id: '1',
//       name: 'Salad Trái Cây',
//       description: 'Một món salad tươi mát với các loại trái cây nhiệt đới.',
//       image: require('../../assets/images/salad.jpg'),
//       // imageUrl: 'https://quangon.vn/resources/2020/05/19/salad-trai-cay-sot-mayonnaise-13.jpg',
//     },
//     {
//       id: '2',
//       name: 'Smoothie Xoài',
//       description: 'Sinh tố xoài thơm ngon, bổ dưỡng.',
//       image: require('../../assets/images/salad.jpg'),
//       // imageUrl: 'https://quangon.vn/resources/2020/05/19/salad-trai-cay-sot-mayonnaise-13.jpg',
//     },
//     {
//       id: '3',
//       name: 'Đậu Hũ Sốt Cà',
//       description: 'Món đậu hũ truyền thống với nước sốt cà chua đậm đà.',
//       image: require('../../assets/images/salad.jpg'),
//       // imageUrl: 'https://quangon.vn/resources/2020/05/19/salad-trai-cay-sot-mayonnaise-13.jpg',
//     },
//   ]);
//     // Hàm xử lý xóa công thức
//     const removeFavorite = (id: string) => {
//       setLocalFavorites((prevFavorites) =>
//         prevFavorites.filter((recipe) => recipe.id !== id)
//       );
//     };

//  // Render từng công thức
//  const renderRecipeItem = ({ item }: { item: any }) => {
//   return (
//     <View style={styles.recipeCard}> 
//      {/* console.log(item.imageUrl) */}
//    <TouchableOpacity
//        style={{ flex: 1 }}
//       // onPress={() => navigation.navigate('Detail', { recipeId: '1'})}
//       onPress={() => navigation.navigate('Detail', { recipeId: item.id })}
//     >
//       {/* <ImageBackground src={"D:/HealthyMenu/src/assets/images/logo.png"}/> */}
//       <Image source={item.image} style={styles.recipeImage} />
//       <View style={styles.recipeInfo}>
//         <Text style={styles.recipeTitle}>{item.name}</Text>
//         {/* <Text style={styles.recipeDescription}>{item.description}</Text> */}
//       </View>
//     </TouchableOpacity>
//     <Button
//           title="Xóa"
//           color="#ff4d4d"
//           onPress={() => removeFavorite(item.id)}
//         />
//     </View>
// );
//   };


//   // if (loading) {
//   //   return (
//   //     <View style={styles.loadingContainer}>
//   //       <ActivityIndicator size="large" color="#0000ff" />
//   //     </View>
//   //   );
//   // }
//   if (localFavorites.length === 0) {
//     return (
//       <View style={styles.emptyContainer}>
//         <Text style={styles.emptyText}>Bạn chưa thêm công thức nào vào yêu thích.</Text>
//       </View>
//     );
//   }

//   // if (favorites.length === 0) {
//   //   return (
//   //     <View style={styles.emptyContainer}>
//   //       <Text style={styles.emptyText}>Bạn chưa thêm công thức nào vào yêu thích.</Text>
//   //     </View>
//   //   );
//   // }

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.header}>Công thức yêu thích</Text>
//       {/* <FlatList
//         data={favorites}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={renderRecipeItem}
//         contentContainerStyle={styles.listContainer}
//       /> */}
//            <FlatList
//         data={localFavorites}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={renderRecipeItem}
//         contentContainerStyle={styles.listContainer}
//       /> 
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     margin: 16,
//   },
//   listContainer: {
//     padding: 16,
//   },
//   recipeCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f8f8f8',
//     borderRadius: 8,
//     marginBottom: 16,
//     overflow: 'hidden',
//   },
//   recipeImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 8,
//   },
//   recipeInfo: {
//     flex: 1,
//     padding: 8,
//   },
//   recipeTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   emptyText: {
//     fontSize: 18,
//     color: '#aaa',
//   },
// });

// export default FavoritesScreen;

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Button,
  Alert,
  StatusBar,
  Platform,

} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigators/MainNavigator';
import { RowComponent, SpaceComponent, CircleComponent, TextComponent, CategoriesList } from '../../components'
import { Trash, SearchNormal1 } from 'iconsax-react-native'
import { appColors } from '../../constants/appColors';
import { ScrollView } from 'react-native-virtualized-view';
import { fontFamilies } from '../../constants/fontFamilies';

// Định nghĩa kiểu điều hướng
type FavoritesScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Detail'
>;

const FavoritesScreen = () => {
  const navigation = useNavigation<FavoritesScreenNavigationProp>();

  // Danh sách yêu thích cục bộ
  const [localFavorites, setLocalFavorites] = useState([
    {
      id: '1',
      name: 'Salad Trái Cây',
      description: 'Một món salad tươi mát với các loại trái cây nhiệt đới.',
      imageUrl: 'https://imagev3.vietnamplus.vn/w1000/Uploaded/2024/ngtnnn/2022_07_27/2707banhxeo.jpg.webp',
    },
    {
      id: '2',
      name: 'Cá hồi sốt cam sành',
      description: 'Sinh tố xoài thơm ngon, bổ dưỡng.',
      imageUrl: 'https://images2.thanhnien.vn/528068263637045248/2023/5/22/goi-cuon-16847338256841687509788.jpeg',
    },
    {
      id: '3',
      name: 'Đậu Hũ Sốt Cà',
      description: 'Món đậu hũ truyền thống với nước sốt cà chua đậm đà.',
      imageUrl: 'https://imagev3.vietnamplus.vn/w1000/Uploaded/2024/ngtnnn/2022_07_27/2707banhxeo.jpg.webp',
    },
    {
      id: '5',
      name: 'Salad Trái Cây',
      description: 'Một món salad tươi mát với các loại trái cây nhiệt đới.',
      imageUrl: 'https://imagev3.vietnamplus.vn/w1000/Uploaded/2024/ngtnnn/2022_07_27/2707banhxeo.jpg.webp',
    },
    {
      id: '6',
      name: 'Smoothie Xoài',
      description: 'Sinh tố xoài thơm ngon, bổ dưỡng.',
      imageUrl: 'https://imagev3.vietnamplus.vn/w1000/Uploaded/2024/ngtnnn/2022_07_27/2707banhxeo.jpg.webp',
    },
    {
      id: '7',
      name: 'Đậu Hũ Sốt Cà',
      description: 'Món đậu hũ truyền thống với nước sốt cà chua đậm đà.',
      imageUrl: 'https://imagev3.vietnamplus.vn/w1000/Uploaded/2024/ngtnnn/2022_07_27/2707banhxeo.jpg.webp',
    },
    {
      id: '10',
      name: 'Salad Trái Cây',
      description: 'Một món salad tươi mát với các loại trái cây nhiệt đới.',
      imageUrl: 'https://imagev3.vietnamplus.vn/w1000/Uploaded/2024/ngtnnn/2022_07_27/2707banhxeo.jpg.webp',
    },
    {
      id: '8',
      name: 'Smoothie Xoài',
      description: 'Sinh tố xoài thơm ngon, bổ dưỡng.',
      imageUrl: 'https://imagev3.vietnamplus.vn/w1000/Uploaded/2024/ngtnnn/2022_07_27/2707banhxeo.jpg.webp',
    },
    {
      id: '9',
      name: 'Đậu Hũ Sốt Cà',
      description: 'Món đậu hũ truyền thống với nước sốt cà chua đậm đà.',
      imageUrl: 'https://imagev3.vietnamplus.vn/w1000/Uploaded/2024/ngtnnn/2022_07_27/2707banhxeo.jpg.webp',
    },
  ]);
  const [drinkCategories] = useState([
    { id: '1', name: 'Cocktails' },
    { id: '2', name: 'Smoothies' },
    { id: '3', name: 'Nước Ép' },
  ]);

  // Hàm xử lý tìm kiếm
  const handleSearch = (query: string) => {
    console.log('Tìm kiếm:', query);
  };

  // Hàm xử lý xóa công thức
  const removeFavorite = (id: string) => {
    setLocalFavorites((prevFavorites) =>
      prevFavorites.filter((recipe) => recipe.id !== id)
    );
  };

  // Thông báo xác nhận trước khi xóa
  const confirmRemoveFavorite = (id: string, name: string) => {
    Alert.alert(
      'Xác nhận xóa',
      `Bạn có chắc chắn muốn xóa "${name}" khỏi danh sách yêu thích không?`,
      [
        { text: 'Hủy', style: 'cancel' },
        { text: 'Xóa', style: 'destructive', onPress: () => removeFavorite(id) },
      ]
    );
  };

  // Render từng công thức
  const renderRecipeItem = ({ item }: { item: any }) => {
    return (
      <View style={styles.recipeCard}>
        <TouchableOpacity
          style={styles.recipeContent}
          onPress={() => navigation.navigate('Detail', { recipeId: item.id })}
        >
          {/* Hiển thị hình ảnh món ăn */}
          <Image source={{uri: item.imageUrl}} style={styles.recipeImage} />
          {/* Hiển thị tiêu đề món ăn */}
          <Text style={styles.recipeTitle}>{item.name}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ padding: 5, backgroundColor: 'red', borderRadius: 100, margin: 5, }}
          onPress={() => confirmRemoveFavorite(item.id, item.name)}>
          <Trash size={25} color="white" />
        </TouchableOpacity>
      </View>
    );
  };

  if (localFavorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          Bạn chưa thêm công thức nào vào yêu thích.
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar barStyle="light-content" backgroundColor={appColors.primary} />

      {/* Phần Header */}
      <View
        style={{
          backgroundColor: appColors.primary,
          height: 180,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 + 20 : 20,
          paddingHorizontal: 16,
        }}>
        <TextComponent
          text="Danh sách công thức yêu thích"
          title
          color={appColors.white} // Sửa lỗi cú pháp
          font={fontFamilies.medium}
          styles={{
            marginBottom: 25,
            marginTop: 15,
          }}
        />
        <RowComponent>
          {/* Input tìm kiếm */}
          <RowComponent
            styles={{ flex: 1 }}
            onPress={() => {
              const query = 'Search text'; // TextInput có thể thay thế
              handleSearch(query);
            }}>
            <SearchNormal1 size={25} color={appColors.white} />
            <View
              style={{
                width: 1,
                height: 18,
                marginHorizontal: 12,
                backgroundColor: '#FFFFFF',
              }}
            />
            <TextComponent
              text="Tìm kiếm..."
              color={appColors.white}
              flex={1}
              size={16}
            />
          </RowComponent>

        </RowComponent>

      </View>

      {/* Danh sách công thức yêu thích */}
      <ScrollView contentContainerStyle={styles.scrollViewContent} keyboardShouldPersistTaps="handled">
        <FlatList
          data={localFavorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderRecipeItem}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                Bạn chưa thêm công thức nào vào yêu thích.
              </Text>
            </View>
          }
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  scrollViewContent: {
    flexGrow: 1,
    backgroundColor: 'white',
    paddingTop: 16,
  },

  listContainer: {
    padding: 16,
  },
  recipeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8cdc74',
    borderRadius: 8,
    marginBottom: 16,
    padding: 8,
  },
  recipeContent: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  recipeImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  recipeInfo: {
    flex: 1,
    padding: 8,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#aaa',
  },
});

export default FavoritesScreen;
