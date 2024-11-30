import {View, Text, FlatList} from 'react-native';
import React, {ReactNode} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RowComponent, SpaceComponent, TextComponent} from '.';
import {globalStyles} from '../styles/globalStyles';
import {appColors} from '../constants/appColors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {ChefFork} from '../assets/svgs';
import { fontFamilies } from '../constants/fontFamilies';

interface Props {
  isColor?: boolean;
  categoriesData: Category[];

}

interface Category {
  key: string;
  title: string;
  icon: ReactNode;
  iconColor: string;
}

const CategoriesList = (props: Props) => {
  const {isColor, categoriesData} = props;
  const renderTagCategory = (item: Category) => {
    return (
      <RowComponent
        onPress={() => {}}
        styles={[
          globalStyles.tag,
          {
            backgroundColor: isColor ? item.iconColor : appColors.white,
          },
        ]}>
        {item.icon}
        <SpaceComponent width={8} />
        <TextComponent
          text={item.title}
          color={isColor ? appColors.white : appColors.gray}
          font={fontFamilies.medium}
        />
      </RowComponent>
    );
  };

  return (
    <FlatList
      style={{paddingHorizontal: 16}}
      showsHorizontalScrollIndicator={false}
      horizontal
      data={categoriesData}
      renderItem={({item}) => renderTagCategory(item)}
    />
  );
};

export default CategoriesList;
