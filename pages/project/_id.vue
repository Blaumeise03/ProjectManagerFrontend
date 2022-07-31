<template>
  <div>
    <h1>Project {{ projectID }}</h1>
    <project :project="project"/>
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
        }
      }
    },
    async asyncData(ctx) {

      return {
        projectID: Number(ctx.route.params.id),
        project: await ctx.app.$services.project.findByID(ctx.route.params.id)
      }
    }
  }
</script>
