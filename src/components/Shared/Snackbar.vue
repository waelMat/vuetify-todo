<template>
    <!--this is a global component which we might be used by various pages
    of our app in the future, then it does not make sense to import it to our Todo Page.
Probably makes more sense to import it to our APP.VUE-->

<!--v-model is binding to the snackbar array in store state-->
    <v-snackbar
    v-model="$store.state.snackbar.show"
  >
    {{ $store.state.snackbar.text }}

    <template v-slot:action="{ attrs }">
      <v-btn
        @click="$store.commit('hideSnackbar')"
        color="blue"
        text
        v-bind="attrs"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
  export default {
//    data: () => ({
//       text: 'Task Added!', we will move it to our store to create a dynamic text which will be displayed depending on what actions we have made
//     }),
  }
</script>

<!--to show snackbars on phones-->
<style lang="sass">
 div.v-snack:not(.v-snack--absolute) 
   height:100%

</style>