<template>
  <div class="q-pa-md column ">
    <q-btn
      class="electron-hide"
      @click="signInUserWithGoogle"
      color="black"
      icon="mail"
      label="Sign in with Google"
    />
    <div class="q-ma-sm text-center electron-hide">
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
                v-model="user.password1"
                type="password"
                label="Password"
              />
              <div class="row justify-between">
                <q-btn type="submit" color="black" label="Login" />
                <q-btn
                  @click="prompt = true"
                  color="white"
                  text-color="black"
                  size="md"
                  label="Forgot Password?"
                />
                <q-dialog v-model="prompt" persistent>
                  <q-card style="min-width: 310px">
                    <q-card-section>
                      <div class="text-h6">Email Address</div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                      <q-input clearable dense v-model="resetMail" autofocus />
                    </q-card-section>

                    <q-card-actions align="right" class="text-dark">
                      <q-btn
                        @click="resetMail = ''"
                        flat
                        label="Cancel"
                        v-close-popup
                      />
                      <q-btn
                        @click="resetPassword"
                        flat
                        label="Reset Password"
                        v-close-popup
                      />
                    </q-card-actions>
                  </q-card>
                </q-dialog>
              </div>
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
import { QSpinnerGears } from "quasar";
export default {
  data() {
    return {
      tab: "login",
      user: {
        name: "",
        email: "",
        password1: "",
        password2: ""
      },
      prompt: false,
      resetMail: ""
    };
  },
  methods: {
    ...mapActions("task_store", [
      "loginUser",
      "registerUser",
      "signInwithGoogle",
      "sendPasswordResetEmail"
    ]),
    signInUserWithGoogle() {
      this.$q.loading.show({
        spinner: QSpinnerGears
      });
      this.signInwithGoogle();
    },
    submitForm() {
      this.$q.loading.show({
        spinner: QSpinnerGears
      });
      if (this.tab === "login") {
        this.loginUser(this.user);
      } else if (this.tab === "register") {
        this.registerUser(this.user);
      }
    },
    resetPassword() {
      this.$q.loading.show({
        spinner: QSpinnerGears
      });
      this.sendPasswordResetEmail(this.resetMail);
      this.resetMail = "";
    }
  }
};
</script>

<style lang="scss"></style>
