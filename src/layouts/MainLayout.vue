<template>
  <q-layout view="lHr LpR lfr">

    <q-header elevated class="bg-dark text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="drawer = !drawer" />
        
        <q-toolbar-title>
        </q-toolbar-title>

        <q-btn v-if="this.$q.dark.isActive" @click.native="day_night" flat round dense icon="wb_sunny" class="shadow-1"/>
        <q-btn v-if="!this.$q.dark.isActive" @click.native="day_night" flat round dense icon="nights_stay" class="inset-shadow"/>
      </q-toolbar>
      <div class="q-ml-lg q-mt-xl q-mb-md">
        <div class="text-h3">Todo</div>
        <div class="text-subtitle1">Monday 12 November</div>
      </div>
      <!-- <q-img src="/src/assets/nature.jpg" spinner-color="white" style="height: 140px; max-width: 150px" /> -->
      
      <q-img src="../assets/nature.jpg" class="absolute-top header-img" :class="[this.$q.dark.isActive ? 'dimmed':'']"/>
    </q-header>
    
    <q-drawer
        v-model="drawer"
        show-if-above
        side="left"
        bordered
        :width="200"
        :breakpoint="400"
      >
        <q-scroll-area class="absolute-top" style="height: calc(100% - 192px); margin-top: 192px; border-right: 1px solid #ddd">
          <q-list padding>
            <q-item to="/" exact clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="list" />
              </q-item-section>

              <q-item-section>
                Todo
              </q-item-section>
            </q-item>

            <q-item to='/help' exact clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="help" />
              </q-item-section>

              <q-item-section>
                Help
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" src="../assets/mountain.png" style="height: 192px; opacity:0.9;">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <div class="text-weight-bold">Tanishq Patni</div>
            <div>@tanishq_rocks</div>
          </div>
        </q-img>
      </q-drawer>


    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<style lang="scss">
  .header-img{
    z-index: -1;
    height:100%;
    opacity: 0.8;
  }
</style>

<script>
export default {
  data () {
    return {
      drawer: false,
    }
  },
  methods: {
    day_night(){
      if(this.$q.dark.isActive){
        console.log("on")
        this.$q.dark.set(false)
      }else{
        console.log("off")
        this.$q.dark.set(true)
      }
    }
  },
  created () {
    this.$q.dark.set(false)
  }
}
</script>