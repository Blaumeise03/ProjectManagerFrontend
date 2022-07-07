<template>
  <div>
    <h1>Project {{ projectID }}</h1>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        projectID: {
          type: Number,
          default() {
            return -1;
          }
        }
      }
    },
    async asyncData(ctx) {

      return {
        projectID: Number(ctx.route.params.id)
      }
    }
  }
</script>
