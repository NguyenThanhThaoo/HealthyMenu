import React, { useState, useEffect } from 'react';
import {
  FlatList,
  View,
  Text,
  StatusBar,
  StyleSheet,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { CategoriesList, RowComponent, CircleComponent, SpaceComponent, TextComponent } from '../../components';
import { appColors } from '../../constants/appColors';
import { fontFamilies } from '../../constants/fontFamilies';
import { authSelector } from '../../redux/reducers/authReducer';
import { globalStyles } from '../../styles/globalStyles';
import { RecommandDishesAPI } from '../../apis/RecommandDishesAPI';
import { getAccessToken } from '../../components/getDataUser';
import RecommendItem from '../../components/RecommendItem';

const HomeScreen = ({ navigation, route }: any) => {
  const dispatch = useDispatch();
  const auth = useSelector(authSelector);
  const [recommendDishes, setRecommendDishes] = useState<any[]>([]); 
  const updatedHealthData = route.params?.updatedHealthData;
  // Fetch recommended dishes on component mount
  useEffect(() => {
    const getRecommandDishes = async () => {
      try {
        const token = await getAccessToken();
        const response = await RecommandDishesAPI.RecommandDishes(token);
        console.log("idijdidi",response?.status)
        if (response?.status === 200) {
          const data = await response?.data;
          const filteredDishes = data.data.filter((dish:any) => dish.type0fgroup == "Món ăn");
        // Kiểm tra nếu dữ liệu hợp lệ và set vào state
        // if (data && Array.isArray(data)) {
        //   console.log("length", Array.isArray(data))
        //   setRecommendDishes(data); // Cập nhật state với dữ liệu nhận được
        // }
        setRecommendDishes(filteredDishes)
        } else {
          Alert.alert('Lỗi', 'Không thể lấy món ăn, vui lòng thử lại sau.');
        }
      } catch (error) {
        Alert.alert('Lỗi', 'Đã xảy ra lỗi trong quá trình lấy món ăn.');
        console.error(error);
      }
    };

    getRecommandDishes();
  }, []);
 
  const FoodsCategories = [
    { key: '1', icon: '', iconColor: '#FF9933', title: 'Món chính' },
    { key: '2', icon: '', iconColor: '#FFCC33', title: 'Ăn vặt' },
    { key: '3', icon: '', iconColor: '#33FF33', title: 'Món chay' },
    { key: '4', icon: '', iconColor: '#46CDFB', title: 'Món khác' },
  ];

  return (
    <View style={[globalStyles.container]}>
      <StatusBar barStyle={'light-content'} />
      
      {/* Header */}
      <View style={{ backgroundColor: appColors.primary, height: 180, borderBottomLeftRadius: 40, borderBottomRightRadius: 40, paddingTop: 40 }}>
        <View style={{ paddingHorizontal: 16 }}>
          <SpaceComponent height={24} />
          <RowComponent>
            {/* Input tìm kiếm */}
            <RowComponent styles={{ flex: 1 }} onPress={() => { }}>
              <MaterialIcons name="search" size={25} color={appColors.white} />
              <View style={{ width: 1, height: 18, marginHorizontal: 12, backgroundColor: '#FFFFFF' }} />
              <TextComponent text="Tìm kiếm..." color={appColors.white} flex={1} size={16} />
            </RowComponent>
            
            {/* Gợi ý */}
            <RowComponent
              onPress={() => navigation.navigate('HealthFormScreen')}
              styles={{ backgroundColor: '#33CC66', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 100 }}
            >
              <CircleComponent size={25} color={appColors.white}>
                <MaterialIcons name="tips-and-updates" size={20} color={appColors.primary} />
              </CircleComponent>
              <SpaceComponent width={8} />
              <TextComponent text="Gợi ý" color={appColors.white} font={fontFamilies.medium} />
            </RowComponent>
          </RowComponent>
          <SpaceComponent height={24} />
        </View>
        <View style={{ marginBottom: -14 }}>
          <CategoriesList isColor categoriesData={FoodsCategories} />
        </View>
      </View>

      {/* Body */}
      <View style={styles.container}>
      {/* {recommendDishes.length > 0 ? (
        recommendDishes.map((item: any) => (
          <RecommendItem
            key={item._id}
            item={item}
            onPress={() => {
              console.log('Pressed item:', item.title);
            }}
          />
        ))
      ) : (
        <Text>No recommended dishes found.</Text>
      )} */}
        <FlatList
        data={recommendDishes} // Pass the array to FlatList
        keyExtractor={(item) => item._id} // Unique key for each item in the list
        renderItem={({ item }) => (
          <RecommendItem
            item={item} // Pass each dish item to RecommendItem
            onPress={() => {
              // Handle onPress action if needed
              navigation.navigate('Detail', { recipeId: item })
              console.log('Pressed item:', item._id);
            }}
          />
        )}
      />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
});

export default HomeScreen;
