<template>
    <div>
        <v-menu bottom left>
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </template>

            <v-list>
                <v-list-item v-for="(item, index) in items" :key="index" @click="handleClick(index)">
                    <v-list-item-icon>
                        <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>

        <!-- close method that is emitted in DialogDelete for No button -->
        <dialog-delete v-if="dialogs.delete" :task="task" @close="dialogs.delete = false" />
        <dialog-edit v-if="dialogs.edit" :task="task" @close="dialogs.edit = false" />
        <dialog-due-date v-if="dialogs.dueDate" :task="task" @close="dialogs.dueDate = false" />
    </div>
</template>

<script>
export default {
    //now this child component have access to Task
    props: ['task'],
    data: () => ({
          //is used to let the dialog appear when delete icon is clicked
          dialogs: {
                delete: false,
                edit: false,
                dueDate: false
            },
        items: [
            {
                title: 'Edit',
                icon: 'mdi-pencil',
                click() {
                    this.dialogs.edit = true
                }
            },
            {
                title: 'Due Date',
                icon: 'mdi-calendar',
                click() {
                    //this will display the date dialog when we click it in the menu options
                    this.dialogs.dueDate = true
                }
            },
            {
                title: 'Delete',
                icon: 'mdi-delete',
                click() {
                    this.dialogs.delete = true
                }
            },
            //this will create new item in menu of every task
            //and the draggable icon will appear 
            {
                title: 'Sort',
                icon: 'mdi-drag-horizontal-variant',
                click() {
                    //this if says if there is nothing in our search field
                    if($store.state.search){
                        this.$store.commit('toggleSorting')
                    }else{
                        this.$store.commit('showSnackbar', 'How dare you try to sort while searching!')
                    }
                }
            }
        ],
    }),
    methods: {
        handleClick(index) {
            this.items[index].click.call(this)
        }
    },
    components: {
        'dialog-delete': require('@/components/Todo/Dialogs/DialogDelete.vue').default,
        'dialog-edit': require('@/components/Todo/Dialogs/DialogEdit.vue').default,
        'dialog-due-date': require('@/components/Todo/Dialogs/DialogDueDate.vue').default,
    }
}
</script>
