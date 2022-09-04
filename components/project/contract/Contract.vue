<template>
  <div class="container-md box p-4">
    <h1>Vertrag {{ contract.id }}</h1>
    <div class="contract-owner box">Ersteller: {{ player.name }}</div>
    <div class="input-group mb-3">
      <span class="input-group-text"><i class="bi bi-calendar-day"></i></span>
      <input v-model="timeCreated" type="datetime-local" class="form-control" :disabled="!edit" placeholder="Name" id="pTime" />
    </div>
    <div class="form-check form-switch mb-2">
      <input class="form-check-input" v-model.boolean="edit" type="checkbox" id="editContract" name="edit" value="false">
      <label class="form-check-label" for="editContract">Bearbeiten</label>
    </div>
    <contract-item-list :items="contract.items" :itemNames="itemNames" :contractID="contract.id" :edit="edit" />

    <div v-if="edit" class="input-group mb-3">
      <span class="input-group-text">Spieler</span>
      <datalist>
        <option v-for="name in playerNames">{{ name }}</option>
      </datalist>
      <input v-model="playerName" type="text" class="form-control" placeholder="Spielername">
    </div>
    
    <div v-if="edit" class="input-group">
      <button type="button" class="btn btn-success" @click="save">Speichern</button>
      <button type="button" class="btn btn-danger" @click="deleteContract">Löschen</button>
    </div>
    
  </div>
</template>

<script>
  import ContractItemList from "~/components/project/contract/ContractItemList.vue"
  import moment from 'moment'

  export default {
    components: {
      ContractItemList
    },
    props: {
      contract: {
        type: Object,
        default() {
          return null;
        }
      },
      player: {
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
      },
      playerNames: {
        type: Array,
        default() {
          return [];
        }
      },
    },
    data() {
      return {
        edit: false,
        playerName: this.player.name,
        timeCreated: "",
      }
    },
    methods: {
      async save() {
        if (this.player.name != this.playerName) {
          let player = await this.$services.player.findByName(this.playerName);
          this.contract.playerID = player.id;
        }
        let time = moment(this.timeCreated);
        this.contract.created = time.unix();
        let res = await this.$services.contract.save(this.contract);
        if (res) {
          this.$nuxt.$eventHub.$emit("toast-show", {
            color: "success", header: "Gespeichert!", msg: "Vertrag wurde gespeichert!"
          });
        } else {
          this.$nuxt.$eventHub.$emit("toast-show", {
            color: "danger", header: "Fehler!", msg: "Vertrag wurde nicht gespeichert!"
          });
        }
      },
      async deleteContract() {
        let res = await this.$services.contract.delete(this.contract.id);
        if (res) {
          this.$nuxt.$eventHub.$emit("toast-show", {
            color: "success", header: "Gelöscht!", msg: "Vertrag wurde gelöscht!"
          });
        } else {
          this.$nuxt.$eventHub.$emit("toast-show", {
            color: "danger", header: "Fehler!", msg: "Vertrag wurde nicht gelöscht!"
          });
        }
      }
    },
    mounted() {
      let time = moment.unix(this.contract.created);
      this.timeCreated = time.format("YYYY-MM-DD HH:mm");
    }
  }
</script>

<style lang="scss">
  .contract-owner {
    position: relative;
    width: fit-content;
    margin-right: auto;
    height: max-content;
    padding: 4px;
  }
</style>
