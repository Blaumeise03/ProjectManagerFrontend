<template>
  <div class="box p-2">
    <button data-bs-toggle="collapse" data-bs-target="#createForm" class="btn btn-primary" @click="test" aria-expanded="true" aria-controls="#createForm">
      <span v-if="tid != null">Bearbeiten...</span>
      <span v-else>Neue Transaktion...</span>
    </button>

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
        <div class="toast" id="toast-changeVerify">
          <div class="toast-header">
            Transaktion bereits verifiziert!
            <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
          </div>
          <div class="toast-body">
            Diese Transaktion ist bereits verifiziert. Du kannst den Verifikationsstatus ändern, jedoch lehnt der Server die Anfrage ab wenn du keine Administratorberechtigungen hast.
          </div>
        </div>
        <div class="form-group form-check form-switch">
          <label for="reference">Verifiziert</label>
          <input v-model="verified" class="form-check-input" :class="{lockedInput: verifiedStyle}" type="checkbox" id="verified" name="option-verified" value="verified" @click="verifiedChange" />
        </div>
        <div class="form-group pt-2">
          <div class="alert alert-danger" :class="{hidden: !verifiedLocked}" id="alert-verified"><strong>Achtung:</strong> Transaktion ist bereits verifiziert. Um Daten zu ändern, lege den "Verifiziert"-Schalter um.</div>
          <div class="alert alert-warning" id="alert-unverified" :class="{hidden: verifiedLocked}"><strong>Hinweis:</strong> Eine Verifizierung ist nur möglich, wenn Du der besitzer der Ausgangskontos bist, oder wenn Du ein Admin bist.</div>
          <button class="btn btn-primary">
            Senden
          </button>
        </div>
      </form>
    </div>
    <!--Toasts-->
    
  </div>
</template>

<script>
  import Transaction from "~/assets/data/Transaction.class";
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
        verified: false,
        verifiedLocked: false,
        verifiedStyle: false
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
        var res = this.$services.transaction.create(this.tid, this.from, this.to, this.amount, date.unix(), this.purpose, this.reference, this.verified);
        res.then((r) => {
          if (r) window.location.reload();
        });
        //e.preventDefaul();
      },
      verifiedChange(e) {
        //console.log(e)
        if (this.verifiedLocked) {
          var toastEl = document.getElementById("toast-changeVerify");
          var toast = new bootstrap.Toast(toastEl);
          toast.show();
          const inputs = document.getElementsByClassName("t-input");
          this.verifiedStyle = false;
          for (let i = 0; i < inputs.length; i++) {
            inputs[i].disabled = false;
          }
        }
      },
      changeTime() {
        //console.log("test3:" + this.time);
      },
      test() {
        //console.log("teest");
      }
    },
    mounted() {
      //console.log("test");
      var timeString = new Date().toISOString();
      this.time = timeString.substring(0, timeString.length - 8);
      //document.getElementById('time').value = timeString;
      //console.log(timeString);
      const transaction = this.transaction;
      //console.log(transaction.tid);
      if (transaction != null && transaction.tid != undefined) {
        this.tid = transaction.tid;
        this.from = transaction.fromName;
        this.to = transaction.toName;
        this.amount = transaction.price;
        this.purpose = transaction.purpose;
        this.reference = transaction.reference;
        var time = moment.unix(transaction.time);
        this.time = time.format("YYYY-MM-DD HH:mm");
        console.log(this.time)
        this.verified = transaction.verified;
        if (this.verified) {
          const inputs = document.getElementsByClassName("t-input");
          this.verifiedLocked = true;
          this.verifiedStyle = true;
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

  .hidden {
      display: none;
  }
</style>
