import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {getInitialData, sortData} from '../../helpers/Home';

import ProjectItems from '../../components/ProjectItems';

const Home = () => {
  const [projectsData, setProjectsData] = useState([]);

  useEffect(() => {
    let projectList = getInitialData();
    setProjectsData(projectList);
  }, []);

  const updateList = updatedList => {
    const sortedData = sortData(updatedList);
    setProjectsData(sortedData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.projectWrapper}>
        <Text style={styles.title}>Projects</Text>
        <View style={styles.itemsWrapper}>
          <ProjectItems projectsData={projectsData} updateList={updateList} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F5F7',
  },
  projectWrapper: {
    marginHorizontal: 0,
    paddingTop: 44,
    paddingBottom: 60,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingLeft: 12,
    color: '#373737',
    letterSpacing: 0.5,
    lineHeight: 36,
  },
  itemsWrapper: {
    paddingTop: 24,
  },
});

export default Home;
