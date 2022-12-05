<template>
    <!--Button to add a task-->
    <!--v-model will bind the value-->
    <!--@click:append is emmitted when an appended icon is clicked-->
    <!--@keyup.enter="" this will be triggered whenever we click enter in that field (same method addTask)-->
    <v-text-field v-model="newTaskTitle" @keyup.enter="addTask" outlined placeholder="Add Task" class="field-add-task pa-3" hide-details clearable>
        <!--hide-details remove the extra space between the field and the tasks
    clearable property add X icon so when we type and want to delete we can easily use it-->

    <!--here we created a icon aside and not inside the textfield as it was previously to have control on this button
    and disable it if the field is empty -->
    <template v-slot:append>
        <v-icon
        @click="addTask"
        :disabled="newTaskTitleInvalid"
        >mdi-plus</v-icon>
      </template>
    </v-text-field>
</template>

<script>
export default {
    data() {
        return {
            newTaskTitle: '',
        }
    },
    computed: {
        newTaskTitleInvalid() {
            return !this.newTaskTitle
        }
    },
    methods: {
        addTask() {
            if(!this.newTaskTitleInvalid){
                //dispatch because we arte calling the actions in the store this time
                this.$store.dispatch('addTask', this.newTaskTitle)
                this.newTaskTitle = ''
            }
        },

    },

}
</script>

<style lang="sass">
 .field-add-task.v-input--is-focused
   .v-input__control
     background-color: #1d5775 !important

</style>