<template>
  <q-page class="bg-grey-2 q-pa-sm">
    <div v-if="this.$q.dark.isActive" class="">
      <q-card dark bordered class="bg-grey-9 my-card">
        <q-card-section>
          <div class="text-h6">Help</div>
          <div class="text-subtitle2">by Tanishq</div>
        </q-card-section>

        <q-separator dark inset />
        <q-card-section>
          ToDo is a very user-friendly tool for organizing simple to-do lists on
          your iOS, Android, Web, Macbook, Windows etc.
        </q-card-section>
      </q-card>
    </div>
    <div v-if="!this.$q.dark.isActive" class="">
      <q-card flat bordered class="my-card">
        <q-card-section>
          <div class="text-h6">Help</div>
          <div class="text-subtitle2">by Tanishq</div>
        </q-card-section>

        <q-separator inset />
        <q-card-section>
          ToDo is a very user-friendly tool for organizing simple to-do lists on
          your iOS, Android, Web, Macbook, Windows etc.
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {};
</script>
