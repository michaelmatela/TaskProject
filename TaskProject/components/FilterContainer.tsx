import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const FilterContainer = ({ showDoneTasks, showNotDoneTasks, toggleShowDoneTasks, toggleShowNotDoneTasks }) => {
  return (
    <View style={styles.filterContainer}>
      <TouchableOpacity onPress={toggleShowDoneTasks} style={[styles.filterButton, showDoneTasks && styles.activeFilterButton]}>
        <Text style={[styles.filterButtonText, showDoneTasks && styles.activeFilterButtonText]}>Show Done</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleShowNotDoneTasks} style={[styles.filterButton, showNotDoneTasks && styles.activeFilterButton]}>
        <Text style={[styles.filterButtonText, showNotDoneTasks && styles.activeFilterButtonText]}>Show Not Done</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  filterButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: '#EDEDED',
  },
  filterButtonText: {
    fontSize: 16,
  },
  activeFilterButton: {
    backgroundColor: 'blue',
  },
  activeFilterButtonText: {
    color: 'white',
  },
});

export default FilterContainer;