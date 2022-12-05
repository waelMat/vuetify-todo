<template>
    <v-dialog
    :value="true"
    persistent
    max-width="290"
  >
    
    <v-card>
      <v-card-title class="text-h5">
        Edit Task?
      </v-card-title>
      <v-card-text>Edit title of this task:
        <v-text-field v-model="taskTitle" @keyup.enter="saveTask"/>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <!--$emit close method is in parent component Task.vue-->
        <v-btn
          text
          @click="$emit('close')"
        >
          Cancel
        </v-btn>
        <!--:disabled="!taskTitle" disables the ssave button if title input field is empty
        and the field will be disabled if we did not do chnges to the title (taskTitleInvalid is the method)-->
        <v-btn
        @click="saveTask"
        :disabled="taskTitleInvalid"
          color="red darken-1"
          text
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
    props: ['task'],
    data() {
      return {
        taskTitle: null //this is the existing title we want to display it in the edit dialog
      }
    },
    computed: {
      taskTitleInvalid() {
        return !this.taskTitle || this.taskTitle === this.task.title
      }
    },
    methods: {
      saveTask() {
        //this if statement will disable the save button if we click enter button to save withoput any changes or empty field
        if(!this.taskTitleInvalid){
          let payload = {
          id: this.task.id,
          title: this.taskTitle
        }
        this.$store.dispatch('updateTaskTitle', payload)
        this.$emit('close') //this will close the dialog after we edit the title
        }  
      }
    },
    mounted() {
      //this will display the tasktitle in the edit field
      this.taskTitle = this.task.title
    }

}
</script>

<style>

</style>