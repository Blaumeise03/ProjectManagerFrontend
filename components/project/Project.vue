<template>
  <div class="container-fluid box py-2">
    <form @submit.prevent="save">
      <div class="row"> 
        <div class="col-md input-group">
          <button class="btn btn-outline-primary" type="button" @click="editProject"><i class="bi bi-pencil" /></button>
          <input v-model="project.name" type="text" class="form-control" :disabled="locked" placeholder="Name" id="pName" />
        </div>
        <div class="col-md input-group">  
          <span class="input-group-text bi bi-calendar-date" />
          <input v-model="timeCreated" type="datetime-local" class="form-control" :disabled="locked" placeholder="Name" id="pTime" />
        </div>
      </div>
      <button class="btn btn-primary my-2" type="submit">Speichern</button> WIP!
      <project-content-list :project="project" :edit="true" />
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
      }
    },
    data() {
      return {
        locked: true,
        timeCreated: "",
        edit: false,
      }
    },
    mounted() {
      let time = moment.unix(this.project.created);
      this.timeCreated = time.format("YYYY-MM-DD HH:mm");
    },
    methods: {
      editProject() {
        this.locked = !this.locked;
      },
      save() {
        let time = moment(this.timeCreated);
        this.project.created = time.unix();
      }
    }
  }
</script>

<style lang="scss">

</style>
