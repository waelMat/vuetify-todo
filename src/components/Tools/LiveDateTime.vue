<template>
    <div class="text-subtitle-1 ml-4">
        {{ date }}
    </div>
</template>

<script>
import { format } from 'date-fns'

export default {
    data() {
        return {
            date: ''
        }
    },
    methods: {
        getDate() {
            this.date = format(new Date(), 'MMMM d, H:mm:ss')//assigning current date to the date in return data()
            setTimeout(this.getDate, 1000)//this will make the date live so we dont need to refresh the page inorder for the date and time to change
        }
    },
    //I need to trigger this method getDate when the page is loaded so i add mounted hook
    mounted() {
        this.getDate()
    }
}
</script>

<style>

</style>