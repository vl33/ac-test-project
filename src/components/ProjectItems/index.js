import React, {useRef} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Star from '../../assets/star-starred.svg';
import BigStar from '../../assets/star.svg';

import ProgressBagde from './ProgressBadge';
import {SwipeListView} from 'react-native-swipe-list-view';

const ProjectItems = ({projectsData, updateList}) => {
  const swipeListRef = useRef(null);

  const getDescriptionText = (company, user, isLogged) => {
    let description = '';
    if (company) {
      description = description.concat(company);
    }
    if (user) {
      description = description.concat(' • ', user);
    }
    if (isLogged) {
      description = description.concat(' (You) ');
    }
    return description;
  };

  const updateListData = r => {
    swipeListRef.current.closeAllOpenRows();
    let updatedItem = {...r.item};
    let updatedList = [...projectsData];

    updatedItem.favorite = !updatedItem.favorite;
    updatedList.splice(r.index, 1, updatedItem);
    updateList(updatedList);
  };

  const getBgcolor = isFavorite => (isFavorite ? '#8E8E8E' : '#FFCC6B');

  return (
    <View>
      <SwipeListView
        ref={swipeListRef}
        disableRightSwipe
        data={projectsData}
        keyExtractor={item => item.id}
        renderItem={(data, rowMap) => (
          <View style={styles.item}>
            <View style={styles.section}>
              <Text
                style={styles.titleText}
                ellipsizeMode="tail"
                numberOfLines={1}>
                {data.item.name}
              </Text>
              <View style={styles.iconHolder}>
                {data.item.favorite && <Star height="16" width="16" />}
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.descriptionText}>
                {getDescriptionText(
                  data.item.company,
                  data.item.user,
                  data.item.userLogged,
                )}
              </Text>
              {data.item.labelName && (
                <View
                  style={[
                    styles.statusHolder,
                    {backgroundColor: data.item.labelColor},
                  ]}>
                  <ProgressBagde labelName={data.item.labelName} />
                </View>
              )}
            </View>
          </View>
        )}
        renderHiddenItem={(data, rowMap) => (
          <TouchableOpacity onPress={() => updateListData(data)}>
            <View
              style={[
                styles.hiddenBlock,
                {backgroundColor: getBgcolor(data.item.favorite)},
              ]}>
              <BigStar />
            </View>
          </TouchableOpacity>
        )}
        rightOpenValue={-75}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'column',
    height: 68,
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    shadowOffset: {width: 0, height: 2},
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
    paddingLeft: 16,
    paddingRight: 8,
    marginBottom: 4,
    marginHorizontal: 8,
  },
  section: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    paddingTop: 12,
    color: '#303037',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.5,
    lineHeight: 22,
    maxWidth: '90%',
  },
  iconHolder: {
    paddingTop: 8,
  },
  descriptionText: {
    paddingBottom: 12,
    marginTop: 4,
    color: '#89898E',
    fontSize: 14,
    letterSpacing: 0.5,
    lineHeight: 18,
  },
  statusHolder: {
    marginTop: 4,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#D3F7EE',
  },
  hiddenBlock: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    width: 68,
    height: 68,
    borderRadius: 6,
    marginHorizontal: 8,
  },
});

export default ProjectItems;
