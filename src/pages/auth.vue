<template>
  <div class="q-pa-md column ">
    <q-btn
      @click="signInwithGoogle"
      color="black"
      icon="mail"
      label="Sign in with Google"
    />
    <div class="q-ma-sm text-center">
      OR
    </div>
    <div class="q-gutter-y-md">
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="dark"
          indicator-color="dark"
          align="justify"
          narrow-indicator
        >
          <q-tab name="login" label="Login" />
          <q-tab name="register" label="Register" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="login" class="column">
            <q-form @submit.prevent="submitForm">
              <q-input
                required
                dense
                outlined
                clearable
                class="q-mb-sm"
                v-model="user.email"
                type="email"
                label="Email"
              />
              <q-input
                required
                dense
                outlined
                clearable
                class="q-mb-sm"
                v-model="user.password"
                type="password"
                label="Password"
              />

              <q-btn type="submit" color="black" label="Login" />
            </q-form>
          </q-tab-panel>

          <q-tab-panel name="register" class="column">
            <q-form @submit.prevent="submitForm">
              <q-input
                required
                dense
                outlined
                clearable
                class="q-mb-sm"
                v-model="user.name"
                type="text"
                label="Name"
              />
              <q-input
                required
                dense
                outlined
                clearable
                class="q-mb-sm"
                v-model="user.email"
                label="Email"
                type="email"
              />
              <q-input
                required
                dense
                outlined
                clearable
                class="q-mb-sm"
                v-model="user.password1"
                type="password"
                label="Password"
              />
              <q-input
                required
                dense
                outlined
                clearable
                class="q-mb-sm"
                v-model="user.password2"
                type="password"
                label="Confirm Password"
              />
              <q-btn type="submit" color="black" label="Register" />
            </q-form>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      tab: "login",
      user: {
        name: "",
        email: "",
        password1: "",
        password2: ""
      }
    };
  },
  methods: {
    ...mapActions("task_store", [
      "loginUser",
      "registerUser",
      "signInwithGoogle"
    ]),
    submitForm() {
      if (this.tab === "login") {
        this.loginUser(this.user);
      } else if (this.tab === "register") {
        if (this.user.password1 === this.user.password2) {
          this.registerUser(this.user);
        }
      }
    }
  }
};
</script>

<style lang="scss"></style>
