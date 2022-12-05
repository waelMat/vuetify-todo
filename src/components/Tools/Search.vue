<template>
  <v-text-field
  placeholder="Search"
  @input="$store.commit('setSearch', $event)"
  filled
  dense
  clearable
  prepend-inner-icon="mdi-magnify"
  class="expanding-search mt-1"
  :class="{ 'closed' : searchClosed && !$store.state.search }"
  @focus="searchClosed = false"
  @blur="searchClosed = true"
  v-model="search"
  :disabled="$store.state.sorting">
  </v-text-field>
  <!-- :disabled="$store.state.sorting" when we are done sorting we can use the search field -->
  
  <!-- :class="{ 'closed' : searchClosed }" we will only extend this class when searchClosed property is true 
@focus="searchClosed = false" this will let the field expand when we click the search icon
@blur="searchClosed = true" when we click outside the search field it will be closed again
v-model search and the && !search says that we want to close the field when we click outside it only if its empty -->
</template>

<script>
export default {
    data() {
        return {
            searchClosed: true,
        }
    }

}
</script>

<!--these classes we have got from the inspect to target the search field-->
<!--closed classwe are targetting in text-field above and here we are saying taht we want to close so only the icon will appear and then we will style so when we click it it will expand-->
<!--adding transition for the maxwidth class-->
<!-- cursor: pointer !important adds pointer when we hover over the icon -->
<style lang="sass">
.expanding-search
  transition: max-width 0.3s
  .v-input__slot
    cursor: pointer !important
    &:before, &:after
      border-color: transparent !important
  &.closed
   max-width: 45px
   .v-input__slot
     background: transparent !important
</style>