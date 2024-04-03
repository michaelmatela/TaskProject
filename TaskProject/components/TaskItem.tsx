import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TaskItem = ({ task, onToggleDone, onDisplay, onEdit, onDelete }) => {
  const renderTaskTitle = (title) => {
    if (title.length > 10) {
      return title.substring(0, 10) + '...';
    }
    return title;
  };

  // const handleDisplay = () => {
  //   onDisplay(task.title);
  // };

  return (
    <View style={styles.taskItem}>
      <TouchableOpacity onPress={() => onToggleDone(task.id)}>
        <Text style={[styles.taskTitle, task.done && styles.doneTaskTitle]}>{renderTaskTitle(task.title)}</Text>
      </TouchableOpacity>
      <View style={styles.buttonsContainer}>
      <TouchableOpacity onPress={() => onDisplay(task.id)}>
          <Text style={styles.displayButton}>Display</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onEdit(task.id)}>
          <Text style={styles.editButton}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(task.id)}>
          <Text style={styles.deleteButton}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  taskTitle: {
    fontSize: 16,
  },
  doneTaskTitle: {
    textDecorationLine: 'line-through',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  displayButton: {
    color: 'blue',
    marginRight: 10,
  },
  editButton: {
    color: 'green',
    marginRight: 10,
  },
  deleteButton: {
    color: 'red',
  },
});

export default TaskItem;