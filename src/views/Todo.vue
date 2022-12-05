<template>
  <div class="home">

    <list-tasks 
    v-if="$store.state.tasks.length"
    />

    <no-tasks v-else/>

    <!-- //this button is to hide the draggable icons when we finish sorting  
    this button will be shown only when state is true-->
    <button-done-sorting
    v-if="$store.state.sorting"
    />
   
    </div>
</template>

<script>


export default {
  name: 'Home',
  components: {
    
    'list-tasks' : require('@/components/Todo/ListTasks.vue').default,
    'no-tasks': require('@/components/Todo/NoTasks.vue').default,
    'button-done-sorting': require('@/components/Todo/ButtonDoneSorting.vue').default,
  }
}
</script>

