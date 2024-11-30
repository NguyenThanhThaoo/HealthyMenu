// import React from 'react';
// import { View, Text, FlatList, TouchableOpacity } from 'react-native';

// const CategoryScreen = ({ navigation, route }) => {
//   const { recommendations } = route.params;

//   const renderRecipeItem = (item, type) => (
//     <TouchableOpacity
//       onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}>
//       <View
//         style={{
//           marginVertical: 8,
//           padding: 16,
//           backgroundColor: '#fff',
//           borderRadius: 8,
//           shadowColor: '#000',
//           shadowOpacity: 0.1,
//           shadowOffset: { width: 0, height: 1 },
//         }}>
//         <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.name}</Text>
//         <Text>{type === 'food' ? 'Món ăn' : 'Đồ uống'}</Text>
//         <Text>{item.calories} kcal</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={{ flex: 1, padding: 16 }}>
//       <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>
//         Gợi ý công thức
//       </Text>

//       <Text style={{ fontSize: 18, fontWeight: '600', marginVertical: 8 }}>
//         Món ăn
//       </Text>
//       <FlatList
//         data={recommendations.foodRecipes}
//         renderItem={({ item }) => renderRecipeItem(item, 'food')}
//         keyExtractor={(item) => item.id.toString()}
//       />

//       <Text style={{ fontSize: 18, fontWeight: '600', marginVertical: 8 }}>
//         Đồ uống
//       </Text>
//       <FlatList
//         data={recommendations.drinkRecipes}
//         renderItem={({ item }) => renderRecipeItem(item, 'drink')}
//         keyExtractor={(item) => item.id.toString()}
//       />
//     </View>
//   );
// };

// export default CategoryScreen;
