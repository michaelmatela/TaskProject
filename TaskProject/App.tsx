
import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, FlatList, StyleSheet, SafeAreaView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskItem from './components/TaskItem';
import FilterContainer from './components/FilterContainer';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);
  const [showDoneTasks, setShowDoneTasks] = useState(false);
  const [showNotDoneTasks, setShowNotDoneTasks] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState('');
  const [incrementKey, setIncrementKey] = useState('0');

  useEffect(() => {
    loadTasks();
    loadIncrementKey();
  }, []);

  const loadIncrementKey = async () => {
    try {
      const storedIncKey = await AsyncStorage.getItem('incKey');
      if (storedIncKey !== null) {
        setIncrementKey(storedIncKey);
      }
    } catch(error){
      console.error('Error loading current key:', error);
    }
  };

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks !== null) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const saveTasks = async (updatedTasks) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  const saveIncrementKey = async () => {
    try {
      const newIncKey = Number(incrementKey) + 1;
      await AsyncStorage.setItem('incKey', (newIncKey).toString());
      setIncrementKey(newIncKey.toString());
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  }

//This function are called within TaskItem.tsx
  const addTask = () => {
    if (taskText.trim() !== '') {
      if (editingTaskIndex !== null) {
        const newTasks = [...tasks];
        newTasks[editingTaskIndex] = { id: newTasks[editingTaskIndex].id, title: taskText, done: newTasks[editingTaskIndex].done };
        saveTasks(newTasks);
        setEditingTaskIndex(null);
      } else {
        saveTasks([...tasks, { id: incrementKey, title: taskText, done: false }]);
        saveIncrementKey();
      }
      setTaskText('');
    }
  };

  const editTask = (id) => {
    const index = tasks.findIndex(item => item.id === id);
    setTaskText(tasks[index].title);
    setEditingTaskIndex(index);
  };

  const toggleDone = (id) => {
    const index = tasks.findIndex(item => item.id === id);
    const newTasks = [...tasks];
    newTasks[index].done = !newTasks[index].done;
    saveTasks(newTasks);
  };

  const deleteTask = (id) => {
    const index = tasks.findIndex(item => item.id === id);
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    saveTasks(newTasks);
  };

  const displayTask = (id) => {
    const index = tasks.findIndex(item => item.id === id);
    setSelectedTask(tasks[index].title);
    setModalVisible(true);
  };

  //end of TaskItem.tsx outside method calls

  const handleCloseModal = () => {
    setSelectedTask('');
    setModalVisible(false);
  };

  //This method are used by FilterContainer.tsx
  const toggleShowDoneTasks = () => {
    setShowDoneTasks(!showDoneTasks);
  };

  const toggleShowNotDoneTasks = () => {
    setShowNotDoneTasks(!showNotDoneTasks);
  };
  //end of FilterContainer.tsx

  const filterTasks = (task) => {
    if (showDoneTasks && task.done) {
      return true;
    }
    if (showNotDoneTasks && !task.done) {
      return true;
    }
    if (!showDoneTasks && !showNotDoneTasks) {
      return true;
    }
    return false;
  };

  return (
    
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
      <Text style={styles.title}>Task List</Text>
      <FilterContainer
        showDoneTasks={showDoneTasks}
        showNotDoneTasks={showNotDoneTasks}
        toggleShowDoneTasks={toggleShowDoneTasks}
        toggleShowNotDoneTasks={toggleShowNotDoneTasks}
      />
      <TextInput
        style={styles.input}
        value={taskText}
        onChangeText={(text) => setTaskText(text)}
        placeholder="Enter task"
      />
      <TouchableOpacity style={styles.button} onPress={addTask}>
        <Text style={styles.buttonText}>{editingTaskIndex !== null ? 'Update Task' : 'Add Task'}</Text>
      </TouchableOpacity>
      <FlatList
        data={tasks.filter(filterTasks)}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggleDone={() => toggleDone(item.id)}
            onDisplay={() => displayTask(item.id)} 
            onEdit={() => editTask(item.id)} 
            onDelete={() => deleteTask(item.id)} 
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeader}>{selectedTask}</Text>
          <TouchableOpacity onPress={handleCloseModal}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safecontainer: {
    paddingTop: Platform.OS === 'android' ? 25 : 0
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', 
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  closeButton: {
    fontSize: 16,
    color: 'blue',
  },
});

export default App;