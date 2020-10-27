<template>
  <q-page padding>
    
    <div v-for="i in 50" :key="i">{{ i }}</div>
    
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
}
</script>
