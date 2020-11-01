<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions("task_store", ["userIsSignedInOrNot"])
  },
  mounted() {
    this.userIsSignedInOrNot();
  }
};
</script>
