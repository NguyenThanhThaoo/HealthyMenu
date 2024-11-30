import {
    HambergerMenu,
    Notification,
    SearchNormal1,
    Sort,
  } from 'iconsax-react-native';
  import React, { useState, useEffect } from 'react';
  import {
    FlatList,
    Platform,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    Alert
  } from 'react-native';
  import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
  import { useDispatch, useSelector } from 'react-redux';
  import {
    CategoriesList,
    CircleComponent,
    EventItem,
    RowComponent,
    SectionComponent,
    SpaceComponent,
    TagBarComponent,
    TextComponent,
  } from '../../components';
  import { appColors } from '../../constants/appColors';
  import { fontFamilies } from '../../constants/fontFamilies';
  import { authSelector } from '../../redux/reducers/authReducer';
  import { globalStyles } from '../../styles/globalStyles';
  
  import { RollInLeft } from "react-native-reanimated";
  import axios from 'axios';
  import { handleSearch } from '../../apis/SearchApi';
  import RecipesDetail from '../../screens/recipes/RecipesDetailsScreen'
import RecommendItem from '../../components/RecommendItem';
import { RecommandDishesAPI } from '../../apis/RecommandDishesAPI';
import { getAccessToken } from '../../components/getDataUser';
  
  
  const DrinksScreen = ({ navigation, route }: any) => {
    const dispatch = useDispatch();
    const auth = useSelector(authSelector);
    const [query, setQuery] = useState('');
    const [filterDrinks, setFilterDrinks] = useState([]);
    const [recommendDishes, setRecommendDishes] = useState<any[]>([]); 
  
     // Nhận thông tin cập nhật từ HealthFormScreen
     const updatedHealthData = route.params?.updatedHealthData;
  
    //  React.useEffect(() => {
    //    if (updatedHealthData) {
    //      console.log('Dữ liệu sức khỏe đã cập nhật:', updatedHealthData);
    //      // Xử lý dữ liệu để hiển thị hoặc gợi ý món ăn
    //    }
    //  }, [updatedHealthData]);
    useEffect(() => {
      const getRecommandDishes = async () => {
        try {
          const token = await getAccessToken();
          const response = await RecommandDishesAPI.RecommandDishes(token);
          if (response?.status === 200) {
            const data = await response?.data;
            const filteredDishes = data.data.filter((dish:any) => dish.type0fgroup == "Đồ uống");
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

    useEffect(() => {
      if (updatedHealthData) {
        console.log('Dữ liệu sức khỏe đã cập nhật:', updatedHealthData);
        // Xử lý dữ liệu để hiển thị hoặc gợi ý món ăn
      }
    }, [updatedHealthData]);
  
    const onSearch = async (text: any) => {
      setQuery(text);
      const results = await handleSearch(text);
      setFilterDrinks(results);
    };
  
    //   const handleDetails = (foods) => {
    //     navigation.navigate('FoodsDetail', {
    //         name: foods.name,
    //         ingredient: foods.ingredient,
    //         instruct: foods.instruct,
    //         imageUrl: foods.imageUrl,
  
    //     }, { foods });
    // };
   
    const drinkCategories = [
    {
      key: '1',
      icon:'',
      iconColor: '#FF9933',
      title: 'Nước ép',
    },
    {
      key: '2',
      icon:'',
      iconColor: '#FFCC33',
      title: 'Sinh tố',
    },
    {
      key: '3',
      icon:'',
      iconColor: '#33FF33',
      title: 'Sữa hạt',
    },
    {
      key: '4',
      icon:'',
      iconColor: '#46CDFB',
      title: 'Loại khác',
    },
  ];

  
  
    return (
      <View style={[globalStyles.container]}>
        <StatusBar barStyle={'light-content'} />
  
        {/* Header */}
        <View
          style={{
            backgroundColor: appColors.primary,
            height: 180,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            paddingTop: 40,
          }}>
          <View style={{ paddingHorizontal: 16 }}>
            <SpaceComponent height={24} />
            <RowComponent>
              {/* Input tìm kiếm */}
              <RowComponent
                styles={{ flex: 1 }}
                onPress={() => {
                  const query = 'Search text'; // Thay bằng query từ TextInput nếu cần
                  handleSearch(query); // Gọi hàm tìm kiếm
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
                  text="Tìm kiếm..." // Placeholder
                  color={appColors.white}
                  flex={1}
                  size={16}
                />
              </RowComponent>
  
              {/* Gợi ý */}
              <RowComponent
              onPress={() => {
                navigation.navigate('HealthFormScreen');
              }}
                styles={{
                  backgroundColor: '#33CC66',
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 100,
                }}>
                <CircleComponent size={25} color={appColors.white}>
                  <MaterialIcons name="tips-and-updates" size={20} color={appColors.primary} />
                </CircleComponent>
                <SpaceComponent width={8} />
                <TextComponent text="Gợi ý" 
                  color={appColors.white}
                  font={fontFamilies.medium} />
              </RowComponent>
            </RowComponent>
            <SpaceComponent height={24} />
          </View>
          <View style={{ marginBottom: -14 }}>
            <CategoriesList isColor categoriesData={drinkCategories} />
          </View>
        </View>
  
        {/* Body */}
        <View style={styles.container}>
          <TagBarComponent title="Gợi ý hôm nay" onPress={() => { }} />
          {recommendDishes.length>0?
          <FlatList
        data={recommendDishes} // Pass the array to FlatList
        keyExtractor={(item) => item._id} // Unique key for each item in the list
        renderItem={({ item }) => (
          <RecommendItem
            item={item} // Pass each dish item to RecommendItem
            onPress={() => {
              // Handle onPress action if needed
              console.log('Pressed item:', item.title);
            }}
          />
        )}
      />: <Text style={{ textAlign: 'center', marginTop: 20 }}>
      No recommended dishes available.
    </Text>}
          {/* <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={Array.from({ length: 5 })} // Thay thế bằng `searchResults` nếu hiển thị kết quả tìm kiếm
            renderItem={({ item }) => <RecommendItem type="card" item={item} />}
          /> */}
          {/* <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <RecommendItem
              item={item}
              onPress={() => console.log(`Bạn đã nhấn vào: ${item.name}`)}
            />
          )}
          ListHeaderComponent={<View style={{ height: 16 }} />} // Thêm khoảng trống đầu
          ListFooterComponent={<View style={{ height: 16 }} />} // Thêm khoảng trống cuối
          /> */}
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
  
  
  export default DrinksScreen;
  
  