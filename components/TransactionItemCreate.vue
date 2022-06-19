<template>
  <div class="box p-2">
    <button data-bs-toggle="collapse" data-bs-target="#createForm" class="btn btn-primary" @click="test" aria-expanded="true" aria-controls="#createForm">Neue Transaktion...</button>

    <div id="createForm" class="collapse">
      <form class="" @submit.prevent="create">
        <div class="form-group row">
          <div class="col-sm-6">
            <label for="from">Von:</label>
            <input v-model="from" type="text" list="players" class="form-control t-input" id="from">
          </div>
          <div class="col-sm-6">
            <label for="to"> An: </label>
            <input v-model="to" type="text" list="players" class="form-control t-input" id="to">
          </div>
        </div>
        <datalist id="players">
          <option v-for="player in players">{{ player.name }}</option>
        </datalist>
        <div class="form-group row">
          <div class="form-group col-sm-7">
            <label for="amount">Menge:</label>
            <input v-model="amount" type="number" min="1" step="any" class="form-control t-input" id="amount">
          </div>
          <div class="form-group col-sm-5">
            <label for="time">Zeit:</label>
            <input v-model="time" type="datetime-local" class="form-control t-input" id="time" @change="changeTime">
          </div>
        </div>
        <div class="form-group">
          <label for="purpose">Verwendungszweck:</label>
          <textarea v-model="purpose" type="text" class="form-control t-input" id="purpose" />
        </div>
        <div class="form-group">
          <label for="reference">Referenz:</label>
          <textarea v-model="reference" type="text" class="form-control t-input" id="reference" />
        </div>
        <div class="form-group form-check form-switch">
          <label for="reference">Verifiziert</label>
          <input v-model="verified" class="lockedInput form-check-input" type="checkbox" id="verified" name="option-verified" value="verified" onclick="return false;" />
        </div>
        <div class="form-group pt-2">
          <div class="alert alert-warning"><strong>Achtung:</strong> Transaktion ist bereits verifiziert...</div>
          <button class="btn btn-primary">
            Senden
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import Transaction from "../assets/data/Transaction.class";
  import moment from 'moment';

  export default {
    data() {
      return {
        tid: null,
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
        default() {
          return null
        }
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
      },
      transaction: {
        type: Object,
        default() {
          return null;
        }
      }
    },
    computed: {

    },
    methods: {
      create() {
        //console.log()
        var date = moment(time.valueAsNumber)
        //console.log(moment.utc())
        this.$services.transaction.create(this.tid, this.from, this.to, this.amount, date.unix() / 1000, this.purpose, this.reference, this.verified);
        //console.log(this.playerName);
        //e.preventDefaul();
      },
      changeTime() {
        //console.log("test3:" + this.time);
      },
      test() {
        console.log("teest");
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
      const transaction = this.transaction;
      console.log(transaction);
      if (transaction != null) {
        this.from = transaction.fromName;
        this.to = transaction.toName;
        this.amount = transaction.price;
        this.purpose = transaction.purpose;
        this.reference = transaction.reference;
        this.time = transaction.time;
        this.verified = transaction.verified;
        if (this.verified) {
          const inputs = document.getElementsByClassName("t-input");
          for (let i = 0; i < inputs.length; i++) {
            inputs[i].disabled = true;
          }
        }
      }
    }
  }
</script>

<style lang="scss">
  .lockedInput {
    background-color: #494949 !important;
    border-color: #494949 !important;
  }
</style>
