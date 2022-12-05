<template>
    <!--vaslue= true is to display the dat dialog-->
    <v-dialog
    ref="dialog"
    :value="true"
    :return-value.sync="date"
    persistent
    width="290px"
  >
    <v-date-picker
      v-model="date"
      scrollable
    >
      <v-spacer></v-spacer>
      <v-btn
        text
        color="primary"
        @click="$emit('close')"
      >
        Cancel
      </v-btn>
      <v-btn
        @click="saveTask"
        text
        color="primary"
      >
        OK
      </v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
export default {
    //so now we have access to the task
    props: ['task'],
data() {
    return {
        //v-model = date in date picker
        date: null
    }
},
mounted() {
    //if this task have a due date
    if(this.task.dueDate){
        //this will select the existing date of the task in the date picker dialog
        this.date = this.task.dueDate
    }
},
methods: {
    saveTask() {
        let payload = {
            id: this.task.id,
            dueDate: this.date
        }
        this.$store.dispatch('updateTaskDueDate', payload)
        this.$emit('close')//will close the dialog after adding date this method is emitted from taskmenu.vue @close="dialogs.dueDate = false"
    }
},
}
</script>

<style>

</style>