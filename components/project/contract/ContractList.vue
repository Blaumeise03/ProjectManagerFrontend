<template>
  <div class="table-responsive">
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th>ID</th>
          <th>Spieler</th>
          <th>Zeit</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contract in contracts" @click="redirectContract(contract.id)">
          <td>{{ contract.id }}</td>
          <td>{{ contract.playerName }}</td>
          <td nowrap>{{ formatTime(contract.created) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import Contract from "~/components/project/contract/Contract.vue"
  import moment from "moment"

  export default {
    components: {
      Contract
    },
    props: {
      contracts: {
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
      redirectContract(id) {
        this.$router.push("/project/contract/" + id)
      }
    }
  }
</script>

<style>
</style>
