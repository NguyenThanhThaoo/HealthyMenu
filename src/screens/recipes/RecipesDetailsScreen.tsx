// import React, { useEffect, useState, useContext } from 'react';
// import { View, Text, Image, Alert, TextInput, Pressable, FlatList } from 'react-native';
// import { ScrollView } from 'react-native-virtualized-view';
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import IconMT from 'react-native-vector-icons/MaterialCommunityIcons';
// import { handleDetails } from "../../apis/DetailApi";
// import {
//     CircleComponent,
//     RowComponent,
//     SectionComponent,
//     TextComponent,
//     ContainerComponent,
//     CardComponent,
//     ButtonComponent
//   } from '../../components';
// // import { MyContext } from '../context';
// import { fontFamilies } from '../../constants/fontFamilies';
// const RecipesDetail = ({ route }) => {
//     const { id } = route.params; // Lấy ID món ăn từ params
//     const [RecipesDetail, setRecipesDetail] = useState({});
//     const [comments, setComments] = useState([]);
//     const [comment, setComment] = useState('');
//     // const user = useContext(MyContext);

//     // Fetch món ăn chi tiết
//     useEffect(() => {
//         const fetchFoodDetail = async () => {
//             const data = await handleDetails(id); // Gọi hàm handleDetails từ file API
//             if (data) {
//                 setRecipesDetail(data); // Cập nhật state với dữ liệu chi tiết món ăn
//             } else {
//                 Alert.alert("Lỗi", "Không thể tải thông tin món ăn.");
//             }
//         };
//         fetchFoodDetail();
//     }, [id]);

//     const handleLike = async () => {
//         try {
//             // API yêu thích
//             Alert.alert("Thông báo", "Đã thêm vào yêu thích!");
//         } catch (error) {
//             console.error('Error liking recipe:', error);
//         }
//     };

//     return (
//         <ContainerComponent isScroll title={foodDetail?.title ?? "Chi tiết món ăn"} back>
//             <CardComponent styles={{ margin: 10, padding: 10 }}>
//                 <Image
//                     source={{ uri: foodDetail.image }}
//                     style={{ width: "100%", height: 200, borderRadius: 10 }}
//                 />
//             </CardComponent>

//             <SectionComponent styles={{ padding: 10 }}>
//                 <TextComponent
//                     text="Nutrition Info:"
//                     font={fontFamilies.medium}
//                     size={20}
//                     styles={{ marginBottom: 8 }}
//                 />
//                 <TextComponent
//                     text={foodDetail.nutritionInfo || "Không có thông tin dinh dưỡng"}
//                     styles={{ marginBottom: 12 }}
//                 />

//                 <TextComponent
//                     text="Ingredients:"
//                     font={fontFamilies.medium}
//                     size={20}
//                     styles={{ marginBottom: 8 }}
//                 />
//                 <TextComponent
//                     text={foodDetail.ingredients?.join(", ") || "Không có danh sách nguyên liệu"}
//                     styles={{ marginBottom: 12 }}
//                 />

//                 <TextComponent
//                     text="Preparation Method:"
//                     font={fontFamilies.medium}
//                     size={20}
//                     styles={{ marginBottom: 8 }}
//                 />
//                 <TextComponent
//                     text={foodDetail.preparationMethod || "Không có phương pháp chế biến"}
//                 />
//             </SectionComponent>

//             <RowComponent justify="center" styles={{ marginVertical: 20 }}>
//                 <ButtonComponent
//                     text="Thêm vào yêu thích"
//                     icon={
//                         <CircleComponent size={40} color="#FFB90F">
//                             <IconMT name="heart" size={20} color="#fff" />
//                         </CircleComponent>
//                     }
//                     onPress={handleLike}
//                     color="#FFB90F"
//                     textColor="#fff"
//                     textFont={fontFamilies.medium}
//                 />
//             </RowComponent>
//         </ContainerComponent>
//     );
// };

// export default RecipesDetail;




import React, { useEffect, useState } from 'react';
import { View, Image, Alert, Text, ImageBackground, TouchableOpacity, SafeAreaView, Platform, StatusBar } from 'react-native';
import IconMT from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    CircleComponent,
    RowComponent,
    SectionComponent,
    TextComponent,
    ContainerComponent,
    CardComponent,
    ButtonComponent
} from '../../components';
import { fontFamilies } from '../../constants/fontFamilies';
import { ScrollView } from 'react-native-virtualized-view';
import { globalStyles } from '../../styles/globalStyles';
import { appColors } from '../../constants/appColors';
import MaterialIcon from '@react-native-vector-icons/material-icons'
import { ArrowLeft2 } from 'iconsax-react-native';
import { LinearGradient } from 'react-native-linear-gradient'
import { HeartAdd } from 'iconsax-react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigators/MainNavigator';

type RecipesDetailRouteProp = RouteProp<RootStackParamList, 'Detail'>;
const RecipesDetail = () => {
    const navigation = useNavigation(); // Khai báo navigation
    const route = useRoute<RecipesDetailRouteProp>();
    const  dishData  = route.params?.recipeId;
    console.log("recipeId",dishData)

    // Dữ liệu cục bộ giả lập
    const sampleData = {
        id:'1',
        title: "Món ăn mẫu",
        imageUrl: 'https://imagev3.vietnamplus.vn/w1000/Uploaded/2024/ngtnnn/2022_07_27/2707banhxeo.jpg.webp', // Sử dụng require để lấy hình ảnh cục bộ
        nutritionInfo: "Calories: 250, Protein: 10g, Fat: 5g, Carbs: 35g",
        ingredients: [
            "Bơ lạt 50gr",
            "Bánh quy 120gr",
            "Whipping cream 250gr",
            "Cream cheese 250gr",
            "Đường 90gr Sữa chua uống Đà Lạt Milk 150ml",
            "Nước cốt chanh 1 muỗng cà phê",
            "Bột gelatin 14gr"],
        preparationMethod: [
            "Bước 1: Đế bánh: Nghiền nhuyễn 120gr bánh quy. Đem 50gr bơ lạt đi đun cách thủy hoặc quay lò vi sóng 30 giây cho chảy. Cho bơ vào bánh rồi trộn đều. Dùng khuôn có đường kính 16cm, cho bánh đã trộn bơ vào khuôn, ép xuống đều để để bánh được chắc chắn. Cho vào ngăn đá đến khi cứng lại, khoảng 1 tiếng.",
            "Bước 2: Cốt bánh: Cho vào tô 250gr cream cheese để mềm ở nhiệt độ phòng, tán phần mịn, sau đó thêm vào 90gr đường, 150ml sữa chua uống Đà Lạt Milk, 250ml whipping cream vào. Trộn đều tay bằng phới lồng. Sau đó cho vào 1 muỗng cà phê nước cốt chanh để tạo vị chua nhẹ cho bánh.",
            "Bước 3: Cho vào chén 14gr bột gelatin, thêm 4 muỗng canh nước lạnh, ngâm 15 phút. Cho vào lò vi sóng 30s cho gelatin tan chảy. Cho vào gelatin hỗn hợp cốt bánh sữa chua, trộn thật đều để gelatin hòa quyện. Đổ hỗn hợp này vào khuôn sau khi phần để bánh đã cứng lại. Bọc khuôn bằng màng bọc thực phẩm và để ngăn mát tủ lạnh 4 tiếng.",
            "Bước 4: Bánh đông lại lấy ra khuôn đặt lên đĩa, trang trí với topping cream và dâu tây cắt lát. Cắt bánh ra và thưởng thức."
        ],
    };
    const [foodDetail, setFoodDetail] = useState(sampleData);
    // const [comments, setComments] = useState([]);
    // const [comment, setComment] = useState('');

    // Sử dụng dữ liệu cục bộ
    useEffect(() => {
        // Giả lập lấy dữ liệu
        setTimeout(() => {
            setFoodDetail(sampleData);
        }, 0); // Thêm một chút trễ để giả lập thời gian tải
    }, []);

    const handleLike = async () => {
        try {
            // Giả lập hành động yêu thích
            Alert.alert("Thông báo", "Đã thêm vào yêu thích!");
        } catch (error) {
            console.error('Error liking recipe:', error);
        }
    };
    // const handleGoBack = () => {
    //     navigation.goBack(); // Xử lý quay lại màn hình trước
    // };

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: '#fff',
                paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, // Xử lý padding trên Android
                
            }}
        >
            <ScrollView style={{ flex: 1 }}>
                <ImageBackground
                    source={{uri: foodDetail.imageUrl}}
                    style={{ flex: 1, height: 244 }} 
                    imageStyle={{ resizeMode: 'cover' }} 
                >
                    <LinearGradient
                        colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0)']}
                        style={{ flex: 1 }}
                    >
                        <RowComponent styles={{ padding: 16 }}>
                            <RowComponent styles={{ flex: 1}}>
                                <TouchableOpacity
                                    onPress={() => navigation.goBack()}
                                    style={{
                                        width: 32,
                                        height: 30,
                                        justifyContent: 'center',
                                        
                                    }}>
                                    <ArrowLeft2 size={24} color={appColors.white} />
                                </TouchableOpacity>
                                <TextComponent
                                    flex={1}
                                    text="Chi tiết công thức"
                                    title
                                    color={appColors.white}
                                    
                                />
                            </RowComponent>
                        </RowComponent>
                    </LinearGradient>
                </ImageBackground>
                <SectionComponent styles={{ padding: 10, paddingBottom: 100}}>
                    {/* Tiêu đề món ăn */}
                    <TextComponent
                        text={foodDetail.title}
                        font={fontFamilies.medium}
                        size={30}
                        styles={{ marginBottom: 8 }}
                    />

                    {/* Thông tin dinh dưỡng */}
                    <TextComponent
                        text="Thành phần dinh dưỡng:"
                        font={fontFamilies.medium}
                        size={20}
                        styles={{ marginBottom: 8 }}
                    />
                    <TextComponent
                        text={foodDetail.nutritionInfo || "Không có thông tin dinh dưỡng"}
                        styles={{ marginBottom: 12 }}
                    />

                    {/* Thành phần nguyên liệu */}
                    <TextComponent
                        text="Nguyên liệu:"
                        font={fontFamilies.medium}
                        size={20}
                        styles={{ marginBottom: 8 }}
                    />
                    {foodDetail.ingredients.map((ingredient, index) => (
                        <TextComponent
                            key={index}
                            text={`• ${ingredient}`} // Hiển thị mỗi nguyên liệu trên một dòng
                            styles={{ marginBottom: 4 }}
                        />
                    ))}

                    {/* Phương pháp chế biến */}
                    <TextComponent
                        text="Cách làm:"
                        font={fontFamilies.medium}
                        size={20}
                        styles={{ marginBottom: 8 }}
                    />
                    {foodDetail.preparationMethod.map((step, index) => (
                        <TextComponent
                            key={index}
                            text={`Bước ${index + 1}: ${step}`} // Đánh số bước và xuống dòng
                            styles={{ marginBottom: 4 , paddingBottom: 10}}
                        />
                    ))}
                </SectionComponent>
            </ScrollView >
            <LinearGradient 
                    colors={['rgba(255, 255, 255, 0.5)', 'rgba(255, 255, 255, 1)']}
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        left: 0,
                        padding: 12,
                    }}>
                    <ButtonComponent
                        text="Thêm vào mục yêu thích"
                        type="primary"
                        onPress={handleLike}
                        iconFlex="left"
                        icon={
                            <IconMT name="heart" size={25} color={appColors.white} />
                        }
                    />
                </LinearGradient>
        </SafeAreaView>
    );
};

export default RecipesDetail;
