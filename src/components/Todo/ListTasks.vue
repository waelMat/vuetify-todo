<template>
    <!--v-if="tasks.length here say we only display this if there are some tasks in the tasks array"-->
    <!--we used getters here to display all when search is empty and display only what we are searching for incase we typed any-->
    <v-list flat class="pt-0">

        <draggable 
        handle=".handle"
        v-model="tasks"
        >
        <task v-for="task in tasks" :key="task.id" :task="task" />
        </draggable>
    </v-list>

    <!--this div says if the tasks array is empty we will display a message-->

</template>

<script>
import draggable from 'vuedraggable'

export default {
    components: {
        'task': require('@/components/Todo/Task.vue').default,
        draggable
    },
    computed: {
        tasks: {
            get() {
                return this.$store.getters.tasksFiltered
            },
            set(value) {
                this.$store.dispatch('setTasks', value)
            }
        }
    }

}
</script>
