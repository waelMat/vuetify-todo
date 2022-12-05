import Vue from 'vue'
import Vuex from 'vuex'
import Localbase from 'localbase'

let db = new Localbase('db')
db.config.debug = false

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //app title
    appTitle: process.env.VUE_APP_TITLE,
    //is the property we are using in search component
      search: null,
      //array called tasks where we can store our tasks
      tasks: [
        // {
        //   id: 1,
        //   title: 'Wake up',
        //   done: false,
        //   dueDate: '2020-10-16'
        // },
        // {
        //   id: 2,
        //   title: 'Get Apples',
        //   done: false,
        //   dueDate: '2020-10-17'
        // },
        // {
        //   id: 3,
        //   title: 'Eat Apples',
        //   done: false,
        //   dueDate: null
        // },
      ],
      snackbar: {
        show: false,
        text: '' //we will set this text depending on the state updating 
      },
      //this to sort all tasks by draggable icon
      sorting: false,
  },
  getters: {
    tasksFiltered(state){
      if(!state.search){
        //!state.search means inf the field is empty
        return state.tasks
      }
      return state.tasks.filter(task => 
        task.title.toLowerCase().includes(state.search.toLowerCase())) // here we are seeing if what we typed match ant of our tasks
    }
  },
  mutations: {
    setSearch(state, value){
      //we are setting what we type into the search above
      state.search = value
    },
    //in mutation we have alwys pass the state as parameter to access the data
    //we can also pass second parameter
    addTask(state, newTask) {
      state.tasks.push(newTask)//pushing the newTask to the Tasks Array
    },
    doneTask(state, id) {
      // this.tasks.filter will iterate to all of the tasks in the array "Tasks"
      //so it look at first task and assign it to (task) and see if its ID (task.id) equal
      //to the id  we are passing in the method
      let task = state.tasks.filter(task => task.id === id)[0]
      task.done = !task.done//if true set false and vice versa
    },
    deleteTask(state, id) {
      state.tasks = state.tasks.filter(task => task.id !== id)
    },
    updateTaskTitle(state, payload) {
      let task = state.tasks.filter(task => task.id === payload.id)[0]
      task.title = payload.title
    },
    updateTaskDueDate(state, payload) {
      let task = state.tasks.filter(task => task.id === payload.id)[0]
      task.dueDate = payload.dueDate
    },
    setTasks(state, tasks) {
      state.tasks = tasks
    },
    //this will set the snackbar to true in order to display it when we need that
    showSnackbar(state, text){
      let timeout = 0
      if (state.snackbar.show) {
        state.snackbar.show = false
        timeout = 300
        //if there is a snackbar already shown this if statement will be skipped
        //so the moral if we added and then deleted a task the first snackbar will disappear and the second will be
        //displayed immediately
      }
      setTimeout(() => {
        state.snackbar.show = true
        state.snackbar.text = text//this text we will commit in actions whatever the action is done
      }, timeout)
    },//now we need to trigger this mutation when a task is added for example
    //this to let us when click on close button in snackbar it dissappears
    hideSnackbar (state){
      state.snackbar.show = false
    },
    //so when we change sorting to true the draggableicons will appear else it will not 
    toggleSorting(state) {
      state.sorting = !state.sorting
    }

  },
  actions: {
    //within our action we commit the addTASK and then commit the showSnackbar
    //committing the addTask mutation
    addTask({ commit }, newTaskTitle) {
      let newTask = {
        //id should be unique so we used date.now
        id: Date.now(),
        title: newTaskTitle, //title from the field (v-model)
        done: false,
        dueDate: null
      }
      db.collection('tasks').add(newTask).then(() => {
        commit( 'addTask', newTask )
        commit('showSnackbar', 'Task Added!')//task added is the text we passed into snackbar
        //now we need to jump to FieldAddTask so whenwe add a task this snackbar will be displayed
      })
    },
    doneTask({state, commit }, id){
      let task = state.tasks.filter(task => task.id === id)[0]
      db.collection('tasks').doc({ id: id }).update({
        done: !task.done
      }).then(() => {
        commit('doneTask',id)
      })
    },
    deleteTask( { commit }, id){
      db.collection('tasks').doc({ id: id }).delete().then(() => {

        commit('deleteTask', id)
        commit('showSnackbar', 'Task Deleted!')//task deleted is the text that we passed to snackbar
      })
    },
    //this action is dispatched in DialogEdit in saveTask method so when we edit any task a snackbar with message will appear
    updateTaskTitle({ commit }, payload){
      db.collection('tasks').doc({ id: payload.id }).update({
        title: payload.title
      }).then(() => {

        commit('updateTaskTitle', payload)
        commit('showSnackbar', 'Task Upadted!')
      })
    },
    //this action is dispatched in DialogDueDate to save the date of task
    updateTaskDueDate({ commit }, payload){
      db.collection('tasks').doc({ id: payload.id }).update({
        dueDate: payload.dueDate
      }).then(() => {

        commit('updateTaskDueDate', payload)
        commit('showSnackbar', 'Due-date Added!')
      })   
    },
    setTasks({ commit }, tasks){
      db.collection('tasks').set(tasks).
        commit('setTasks', tasks)
    },
    getTasks({ commit }){
    db.collection('tasks').get().then(tasks => {
      commit('setTasks', tasks)
    })

    }
    
  },
  modules: {
  }
})
