import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

type RecommendItemProps = {
  item:any;
  onPress?: () => void; // Optional onPress function, used for custom behavior
};

const RecommendItem: React.FC<RecommendItemProps> = ({ item, onPress }) => {
  
  const navigation = useNavigation();
  // console.log(item.title);
  const handlePress = () => {
    
    if (onPress) {
      console.log("okoko")
      onPress();
      // navigation.navigate({'name':'RecipesDetailsScreen','item': { itemId: item._id }});
    } else {
      // Otherwise, navigate to the 'FoodDetail' screen with the item ID
      // navigation.navigate('RecipesDetailsScreen', { itemId: item._id });
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      {/* Image */}
      <Image
        source={{ uri: item.image_path ? item.image_path : 'https://heyyofoods.com/wp-content/uploads/2023/07/banhchuoichien.jpg' }}
        style={styles.image}
      />

      {/* Text container */}
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.title}</Text>
        {item.description && <Text style={styles.description}>{item.description}</Text>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginVertical: 8,
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
  },
  textContainer: {
    flex: 1,
    padding: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});

export default RecommendItem;
