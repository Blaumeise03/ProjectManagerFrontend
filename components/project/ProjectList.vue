<template>
  <div class="table-responsive">
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <td>ID</td>
          <th>Name</th>
          <th>Erstellungszeit</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projects" @click="redirectProject(project.id)">
          <td>{{ project.id }}</td>
          <td>{{ project.name }}</td>
          <td>{{ formatTime(project.created) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import moment from 'moment'

  export default {
    props: {
      projects: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    methods: {
      formatTime(unix) {
        let time = moment.unix(unix);
        return time.format("YYYY-MM-DD HH:mm");
      },
      redirectProject(id) {
        this.$router.push("/project/" + id)
      }
    }
  }
</script>

<style>

</style>
