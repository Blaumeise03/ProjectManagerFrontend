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
      <button v-if="edit" class="btn btn-primary my-2" type="submit">Speichern</button>
      <project-content-list :project="project" :itemNames="itemNames" :edit="edit" />
    </form>
    <!--Toasts-->
    <div class="position-fixed bottom-0 center p-3" style="z-index: 1200">
      <div id="saveToast" class="toast border hide" :class="'border-' + saveToast.color" data-bs-delay="5000">
        <div class="toast-header" id="saveToastHeader">
          {{ saveToast.header }}
          <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
        </div>
        <div class="toast-body" id="saveToastBody">
          {{ saveToast.body }}
        </div>
        <div class="progress save-bar-parent" id="stBarP">
          <div id="stBar" class="progress-bar save-bar" :class="'bg-' + saveToast.color"></div>
        </div>
      </div>
    </div>
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
        edit: false,
        saveToast: {
          color: "success",
          header: "Gespeichert!",
          body: "Das Projekt wurde gespeichert."
        },
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
          this.saveToast = {
            color: "success",
            header: "Gespeichert!",
            body: "Das Projekt wurde gespeichert. Seite wird neugeladen..."
          };
          new Promise(resolve => setTimeout(resolve, 5000)).then(() => {
            document.location.reload();
          });
        } else {
          this.saveToast = {
            color: "danger",
            header: "Fehler!",
            body: "Das Projekt konnte nicht gespeichert werden."
          };
        }
        document.getElementById("saveToast").addEventListener('shown.bs.toast', function (event) {
          document.getElementById("stBar").classList.add("shrink");
        })
        new Promise(resolve => setTimeout(resolve, 200)).then(() => {
          //Has to be inside a promise to wait until nuxt has refreshed the page
          let toast = bootstrap.Toast.getOrCreateInstance(document.getElementById("saveToast"));
          toast.show();
        });
      }
    }
  }
</script>

<style lang="scss">

</style>
