<template>
  <q-scroll-area :thumb-style="thumbStyle" :bar-style="barStyle">
    <slot></slot>
  </q-scroll-area>
</template>

<script>
export default {
  data() {
    return {
      thumbStyle: {
        right: "4px",
        borderRadius: "5px",
        backgroundColor: "#000",
        width: "5px",
        opacity: 0.75
      },

      barStyle: {
        right: "2px",
        borderRadius: "9px",
        backgroundColor: "#000",
        width: "9px",
        opacity: 0.2
      }
    };
  }
};
</script>

<style lang="scss" scoped></style>
