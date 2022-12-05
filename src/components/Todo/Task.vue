<template>
    <!--$store.state.tasks we are accessing store then state then our data array which is in vueX store -->
    <div>
        <v-list-item @click="$store.dispatch('doneTask', task.id)" 
        :class="{ 'blue lighten-5': task.done }"
        :ripple="false">
        <!--ripple so we will not see grey background when we drag a task-->
            <!--class="{ 'blue' : task.done }" says if task.done is true we are going to add this class which is blue here-->
            <template v-slot:default>
                <v-list-item-action>
                    <!-- check box is now unchecked because all tasks are by default false, if any is changed to true
          the checkbox will be checked -->
                    <v-checkbox :input-value="task.done" color="primary"></v-checkbox>
                </v-list-item-action>

                <!--Task Title-->
                <v-list-item-content>
                    <v-list-item-title :class="{ 'text-decoration-line-through': task.done }">
                        <!--:class="{ 'text-decoration-line-through' : task.done }" this says
          if task.done is true we will draw a line in the middle of the title-->
                        {{ task.title }}
                    </v-list-item-title>
                </v-list-item-content>

                <!--list that will display the dueDate isnide the task-->
                <!-- v-if="task.dueDate" the date will appear if only there is a date -->
                <!-- task.dueDate | niceDate -> | is used to add a filter  -->
                <v-list-item-action v-if="task.dueDate">
                    <v-list-item-action-text>
                        <v-icon small>mdi-calendar</v-icon>
                        {{ task.dueDate | niceDate }}
                    </v-list-item-action-text>

                  </v-list-item-action>

                <!--Delete Buttons-->
                <v-list-item-action>
                    <task-menu :task="task"/>
                </v-list-item-action>

                <!--sort tasks with vue draggable-->
                <!--created the draggable icon in each task-->
                <v-list-item-action
                v-if="$store.state.sorting"
                >
                <!--class handle is the handle from taskmenu in draggable component-->
                    <v-btn color="primary" icon class="handle">
                        <v-icon>mdi-drag-horizontal-variant</v-icon>
                    </v-btn>
                </v-list-item-action>
            </template>
        </v-list-item>

        <!--Dividers between tasks-->
        <v-divider></v-divider>

        
    </div>
</template>

<script>
import { format } from 'date-fns'

export default {
    //now this child component have access to Task
    props: ['task'],
    filters: {
        niceDate(value){
            return format(new Date(value), 'MMM d')
        }
    },
    components :{
        'task-menu': require('@/components/Todo/TaskMenu.vue').default
    }

}
</script>

<!--so we will not see the text of task overlaying when we drag it-->
<style lang="sass" scoped>
 .sortable-ghost 
   opacity:0 !important
 .sortable-ghost
   box-shadow: 0 0 10px rgba(0,0,0,0.3) !important

</style>

