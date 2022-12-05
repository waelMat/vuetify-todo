<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :mobile-breakpoint="768"
      app
      >

      <v-img 
      src="./assets/header-img.jpg"
      height="170"
      gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
      class="pa-4 pt-7">
    
      <v-avatar size="70" class="mb-2">
        <img src="./assets/wael.jpeg" />
      </v-avatar>
      <div class="white--text text-subtitle-1 font-weight-bold">Wael Matar</div>
      <div class="white--text text-subtitle-2">wael__matar</div>
    </v-img>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Todo
          </v-list-item-title>
          <v-list-item-subtitle>
            Best Todo Ever!
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="primary"
      dark
      src="./assets/header-img.jpg"
      prominent
      :height="$route.path === '/' ? '235' : '170'"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.9), rgba(128,208,199,.9)"
        ></v-img>
      </template>

      <v-container class="pa-0 header-container">
        <v-row>
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
          <v-spacer></v-spacer>
          <!--Search Field component-->
          <search />
        </v-row>
        <v-row>
          <v-toolbar-title class="text-h4 ml-4">{{ $store.state.appTitle }}</v-toolbar-title>
        </v-row>
        <v-row>
          <live-date-time />
        </v-row>
        <v-row v-if="$route.path === '/'">
          <field-add-task />
        </v-row>
      </v-container>





    </v-app-bar>

    <v-main>
      <router-view></router-view>
      <snackbar />
    </v-main>
  </v-app>
</template>

<script>
import FieldAddTask from '@/components/Todo/FieldAddTask.vue' //instead of this we have another method
//in components down there 'field-add-task': require('@/components/Todo/FieldAddTask.vue').default this is the same

export default {
  data: () => ({ 
    drawer: null,
    items: [
          { title: 'Todo', icon: 'mdi-format-list-checks', to: '/' },
          { title: 'About', icon: 'mdi-help-box', to: '/about' },
        ],
  }),
  components: {
    'field-add-task': FieldAddTask,
    'snackbar': require('@/components/Shared/Snackbar.vue').default,
    'search': require('@/components/Tools/Search.vue').default,
    'live-date-time': require('@/components/Tools/LiveDateTime.vue').default,
  },
  //to get data from databse
  mounted() {
    this.$store.dispatch('getTasks')
  }
  // computed: {
  //   appTitle(){
  //     return  process.env.VUE_APP_TITLE 
  //   }
  // }
  //we are using the state ad store instead
}
</script>

<style lang="sass">
.header-container
  max-width: none !important
</style>