<template>
  <div class="wrapper">
    <li class="nav-item">
      <a class="nav-link" :href="link" :class="{active: last}">{{ text }}</a>
    </li>
    <li v-if="!last" class="nav-item">
      »
    </li>
  </div>
</template>

<script>
  export default {
    props: {
      text: {
        type: String,
        required: true
      },
      link: {
        type: String,
        required: true
      },
      last: false
    }
  }
</script>

<style>
  .wrapper {
    display: contents;
  }
</style>
