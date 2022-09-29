<template>
  <div class="container-fluid box py-2">
    <form @submit.prevent="save">
      <div class="row">
        <div class="col-md input-group">
          <button class="btn btn-outline-primary" type="button" @click="editProject"><i class="bi" :class="[edit ? 'bi-pencil-fill' : 'bi-pencil']" /></button>
          <input v-model="project.name" type="text" class="form-control" :disabled="!edit" placeholder="Name" id="pName" />
        </div>
        <div class="col-md input-group">
          <span class="input-group-text bi bi-calendar-date" />
          <input v-model="timeCreated" type="datetime-local" class="form-control" :disabled="!edit" placeholder="Name" id="pTime" />
        </div>
      </div>
      <div v-if="edit" class="col-md input-group">
        <button class="btn btn-primary my-2" type="submit">Speichern</button>
        <button class="btn btn-danger my-2" type="button" @click="deleteProject()">Löschen</button>
      </div>
      
      <project-content-list :project="project" :itemNames="itemNames" :edit="edit" />
    </form>
  </div>
</template>

<script>
  import moment from 'moment';
  import ProjectContentList from "~/components/project/ProjectContentList.vue"

  export default {
    components: {
      ProjectContentList
    },
    props: {
      project: {
        type: Object,
        default() {
          return null;
        }
      },
      itemNames: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    data() {
      return {
        locked: true,
        timeCreated: "",
        edit: false
      }
    },
    mounted() {
      let time = moment.unix(this.project.created);
      this.timeCreated = time.format("YYYY-MM-DD HH:mm");
    },
    methods: {
      editProject() {
        this.edit = !this.edit;
      },
      async save() {
        let time = moment(this.timeCreated);
        this.project.created = time.unix();
        let res = await this.$services.project.save(this.project);
        console.log(res)
        if (res) {
          this.$nuxt.$eventHub.$emit("toast-show", {
            color: "success",
            header: "Gespeichert!",
            msg: "Das Projekt wurde gespeichert. Seite wird neugeladen..."
          });
          new Promise(resolve => setTimeout(resolve, 5000)).then(() => {
            document.location.reload();
          });
        } else {
          this.$nuxt.$eventHub.$emit("toast-show", {
            color: "danger",
            header: "Fehler!",
            msg: "Das Projekt konnte nicht gespeichert werden."
          });
        }
      },
      async deleteProject() {

      }
    }
  }
</script>

<style lang="scss">
</style>
