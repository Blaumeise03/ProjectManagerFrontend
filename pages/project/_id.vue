<template>
  <div>
    <h1>Project {{ projectID }}</h1>
    <project :project="project" :itemNames="itemNames" />
  </div>
</template>

<script>
  import Project from "~/components/project/Project.vue"

  export default {
    components: {
      Project
    },
    data() {
      return {
        projectID: {
          type: Number,
          default() {
            return -1;
          }
        },
        project: {
          type: Object,
          default() {
            return null;
          }
        },
        itemNames: [],
      }
    },
    async asyncData(ctx) {

      return {
        projectID: Number(ctx.route.params.id),
        project: await ctx.app.$services.project.findByID(ctx.route.params.id),
        itemNames: await ctx.$services.item.findAllNames(),
      }
    }
  }
</script>
