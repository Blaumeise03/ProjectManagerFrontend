<template>
  <div>
    <h1>Projekte</h1>
    <div class="container-md box p-2">
      <button type="button" class="btn btn-success" @click="createNew()">Neues Projekt erstellen</button>
      <project-list class="mt-4" :projects="projects" />
    </div>
    
  </div>
</template>

<script>
  import ProjectList from '~/components/project/ProjectList.vue'

  import Project from '~/assets/data/Project.class'
  import moment from 'moment'

  export default {
    components: {
      ProjectList
    },
    data() {
      return {
        project: null
      }
    },
    async asyncData(ctx) {
      return {
        projects: await ctx.app.$services.project.findAll()
      }
    },
    methods: {
      async createNew() {
        let corp = this.$store.state.user.user.cid;
        let time = moment().unix();
        this.timeCreated = time.unix;
        if (corp) {
          let project = await this.$services.project.save(new Project(null, corp, "Neues Projekt", time, null, null));
          this.project = project;
          this.$router.push({ path: "/project/" + project.id });
        } else {
          this.$nuxt.$eventHub.$emit("toast-show", {
            color: "danger",
            header: "Fehler!",
            msg: "Sie sind in keiner Corp und können deshalb kein Projekt erstellen."
          });
        }
      }
    }
  }
</script>

<style>

</style>
