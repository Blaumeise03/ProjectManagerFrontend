<template>
  <div class="box p-2">
    <button data-bs-toggle="collapse" data-bs-target="#form" class="btn btn-primary">Neue Transaktion...</button>

    <div id="form" class="collapse">
      <form class="" @submit.prevent="create">
        <div class="form-group row">
          <div class="col-sm-6">
            <label for="from">Von:</label>
            <input v-model="from" type="text" list="players" class="form-control" id="from">
          </div>
          <div class="col-sm-6">
            <label for="to"> An: </label>
            <input v-model="to" type="text" list="players" class="form-control" id="to">
          </div>
        </div>
        <datalist id="players">
          <option v-for="player in players">{{ player.name }}</option>
        </datalist>
        <div class="form-group row">
          <div class="form-group col-sm-7">
            <label for="amount">Menge:</label>
            <input v-model="amount" type="number" min="1" step="any" class="form-control" id="amount">
          </div>
          <div class="form-group col-sm-5">
            <label for="time">Zeit:</label>
            <input v-model="time" type="datetime-local" class="form-control" id="time" @change="changeTime">
          </div>
        </div>
          <div class="form-group">
            <label for="purpose">Verwendungszweck:</label>
            <textarea v-model="purpose" type="text" class="form-control" id="purpose" />
          </div>
          <div class="form-group">
            <label for="reference">Referenz:</label>
            <textarea v-model="reference" type="text" class="form-control" id="reference" />
          </div>
          <div class="form-group pt-2">
            <button @click="create" class="btn btn-primary">
              Senden
            </button>
          </div>
      </form>
    </div>
  </div>
</template>

<script>
import Transaction from "../assets/data/Transaction.class";

  export default {
    data() {
      return {
        from: this.playerName,
        to: '',
        amount: '',
        purpose: '',
        reference: '',
        time: '',
        verified: false
      }
    },
    props: {
      playerID: {
        type: Number,
        required: true
      },
      players: {
        type: Array,
        default() {
          return []
        }
      },
      playerName: {
        type: String,
        default() {
          return '';
        }
      }
    },
    computed: {
      
    },
    methods: {
      create() {
        //this.$services.todo.create()
        console.log(this.playerName);
        //e.preventDefaul();
      },
      changeTime() {
        //console.log("test3:" + this.time);
      }
    },
    async fetch() {
      const services = this.$root.$options.$services
      //console.log("i:" + this.playerID)
      const player = await services.player.findById(this.playerID);
      //console.log("p:" + player);
      return {
        //players: await services.player.findAllByCorpID(player.corpID)
      }
    },
    mounted() {
      //console.log("test");
      var timeString = new Date().toISOString();
      timeString = timeString.substring(0, timeString.length - 8);
      document.getElementById('time').value = timeString;
      //console.log(timeString);
    }
  }
</script>
