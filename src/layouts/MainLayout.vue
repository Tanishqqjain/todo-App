<template>
  <q-layout view="lHr LpR lfr">
    <q-header class="bg-dark text-white ">
      <q-toolbar>
        <q-btn
          v-if="this.$route.fullPath !== '/auth'"
          dense
          flat
          round
          icon="menu"
          @click="drawer = !drawer"
        />

        <q-toolbar-title> </q-toolbar-title>

        <q-btn
          v-if="this.$q.dark.isActive && this.$route.fullPath !== '/auth'"
          @click.native="day_night"
          flat
          round
          dense
          icon="wb_sunny"
          class="shadow-1"
        />
        <q-btn
          v-if="!this.$q.dark.isActive && this.$route.fullPath !== '/auth'"
          @click.native="day_night"
          flat
          round
          dense
          icon="nights_stay"
          class="inset-shadow"
        />
      </q-toolbar>
      <div class="q-ml-lg q-mt-xl q-mb-md">
        <div class="text-h3">Todo</div>
        <div class="text-subtitle1">{{ todayDate }}</div>
      </div>
      <!-- <q-img src="/src/assets/nature.jpg" spinner-color="white" style="height: 140px; max-width: 150px" /> -->

      <q-img
        src="../assets/nature.jpg"
        class="absolute-top header-img"
        :class="[this.$q.dark.isActive ? 'dimmed' : '']"
      />
    </q-header>

    <q-drawer
      v-if="this.$route.fullPath !== '/auth'"
      v-model="drawer"
      show-if-above
      side="left"
      bordered
      :width="200"
      :breakpoint="600"
    >
      <q-scroll-area
        class="absolute-top"
        style="height: calc(100% - 192px); margin-top: 192px; border-right: 1px solid #ddd"
      >
        <q-list padding>
          <q-item to="/" exact clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="list" />
            </q-item-section>

            <q-item-section>
              Todo
            </q-item-section>
          </q-item>

          <q-item to="/help" exact clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="help" />
            </q-item-section>

            <q-item-section>
              Help
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img
        class="absolute-top"
        src="../assets/mountain.png"
        style="height: 192px; opacity:0.9;"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img v-if="user.photoURL" :src="user.photoURL" />
            <img v-if="!user.photoURL" src="../assets/user.png" />
          </q-avatar>
          <div class="text-weight-bold">{{ user.name || "Username" }}</div>
          <div>{{ user.email || "xyz@gmail.com" }}</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        v-if="user.loggedIn"
        @click="logout_user"
        fab
        icon="logout"
        color="black"
      />
    </q-page-sticky>
  </q-layout>
</template>

<style lang="scss">
.header-img {
  z-index: -1;
  height: 100%;
  opacity: 0.8;
}
</style>

<script>
import { date } from "quasar";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      todayDate: date.formatDate(Date.now(), "dddd DD MMMM"),
      drawer: false
    };
  },
  computed: {
    ...mapGetters({
      user: "task_store/user"
    })
  },
  methods: {
    day_night() {
      if (this.$q.dark.isActive) {
        console.log("on");
        this.$q.dark.set(false);
        console.log(this.$route.fullPath === "/auth");
      } else {
        console.log("off");
        this.$q.dark.set(true);
      }
    },
    ...mapActions("task_store", ["logout"]),
    logout_user() {
      this.$q.dark.set(false);
      this.logout();
    }
  },
  created() {
    this.$q.dark.set(false);
  }
};
</script>
