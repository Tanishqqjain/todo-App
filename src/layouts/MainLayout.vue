<template>
  <q-layout view="lHr LpR lfr">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="drawer = !drawer" />

        <q-toolbar-title>
          <!-- <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar> -->
          Todo App
        </q-toolbar-title>
      
      <q-btn v-if="this.$q.dark.isActive" @click.native="day_night" flat round dense icon="wb_sunny" />
      <q-btn v-if="!this.$q.dark.isActive" @click.native="day_night" flat round dense icon="nights_stay" />

      </q-toolbar>
    </q-header>
    
    <q-drawer
        v-model="drawer"
        show-if-above
        side="left"
        bordered
        :width="200"
        :breakpoint="400"
      >
        <q-scroll-area class="absolute-top" style="height: calc(100% - 200px); margin-top: 200px; border-right: 1px solid #ddd">
          <q-list padding>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="inbox" />
              </q-item-section>

              <q-item-section>
                Inbox
              </q-item-section>
            </q-item>

            <q-item active clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="star" />
              </q-item-section>

              <q-item-section>
                Star
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="send" />
              </q-item-section>

              <q-item-section>
                Send
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="drafts" />
              </q-item-section>

              <q-item-section>
                Drafts
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 200px">
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