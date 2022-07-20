<template>
  <div class="box p-2">
    <!--Button to toggle the input form-->
    <button data-bs-toggle="collapse" data-bs-target="#createForm" class="btn btn-primary" aria-expanded="true" aria-controls="#createForm">
      <span v-if="tid != null">Bearbeiten...</span>
      <span v-else>Neue Transaktion...</span>
    </button>

    <!--Input form, if available prefilled with the forwarded transaction-->
    <div id="createForm" class="collapse">
      <form class="" @submit.prevent="create">
        <!--Inputs for sender and receiver-->
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
        <!--Datalist containing all players from the property players, it's used by the browser for autocompletion of the two input fields-->
        <datalist id="players">
          <option v-for="player in players">{{ player.name }}</option>
        </datalist>
        <div class="form-group row">
          <!--Input for the amount of ISK-->
          <div class="form-group col-sm-7">
            <label for="amount">Menge:</label>
            <input v-model="amount" type="number" min="1" step="any" class="form-control t-input" id="amount">
          </div>
          <!--Input for the time-->
          <div class="form-group col-sm-5">
            <label for="time">Zeit:</label>
            <input v-model="time" type="datetime-local" class="form-control t-input" id="time">
          </div>
        </div>
        <!--Input for the purpose-->
        <div class="form-group">
          <label for="purpose">Verwendungszweck:</label>
          <textarea v-model="purpose" type="text" class="form-control t-input" id="purpose" />
        </div>
        <!--Input for the reference-->
        <div class="form-group">
          <label for="reference">Referenz:</label>
          <textarea v-model="reference" type="text" class="form-control t-input" id="reference" />
        </div>

        <!--Toast for setting verified to false-->
        <div class="toast" id="toast-changeVerify">
          <div class="toast-header">
            Transaktion bereits verifiziert!
            <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
          </div>
          <div class="toast-body">
            Diese Transaktion ist bereits verifiziert. Du kannst den Verifikationsstatus ändern, jedoch lehnt der Server die Anfrage ab wenn du keine Administratorberechtigungen hast.
          </div>
        </div>
        <!--Verified-switch-->
        <div class="form-group form-check form-switch">
          <label for="verified">Verifiziert</label>
          <input v-model="verified" class="form-check-input" :class="{lockedInput: verifiedStyle}" type="checkbox" id="verified" name="option-verified" value="verified" @click="verifiedChange" />
        </div>
        
        <div class="form-group pt-2">
          <!--More Alerts-->
          <div class="alert alert-danger" :class="{hidden: !verifiedLocked}" id="alert-verified">
            <strong>Achtung:</strong> Transaktion ist bereits verifiziert. Um Daten zu ändern, lege den "Verifiziert"-Schalter um.
          </div>
          <div class="alert alert-warning" id="alert-unverified" :class="{hidden: verifiedLocked}">
            <strong>Hinweis:</strong> Eine Verifizierung ist nur möglich, wenn Du der Besitzer der Ausgangskontos bist, oder wenn Du ein Admin bist.
          </div>
          <div class="alert alert-danger" id="alert-error" v-if="error != null">{{error}}</div>
          <!--Buttons-->
          <button type="button" class="btn btn-primary" id="create" @click="create()">
            Senden
          </button>
          <button type="button" class="btn btn-danger" id="delete" @click="deleteTransaction()">
            <i class="bi bi-trash" />
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';

  export default {
    data() {
      return {
        //The properties of the transaction
        tid: null,
        from: this.playerName,
        to: '',
        amount: '',
        purpose: '',
        reference: '',
        time: '',
        verified: false,
        //Whether the transaction was originally already verified
        verifiedLocked: false,
        //Determines the style of the input, if true the inputs will be locked
        verifiedStyle: false,
        error: null
      }
    },
    props: {
      playerID: {
        type: Number,
        default() {
          return null;
        }
      },
      //All players which should be used for the datalist of the input fields (for autocompletion)
      players: {
        type: Array,
        default() {
          return [];
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
      },
      visible: {
        type: Boolean,
        default() {
          return false;
        }
      }
    },
    computed: {

    },
    methods: {
      /**
       * Sends the new transaction to the database.
       */
      create() {
        //Converts the time
        var date = moment(this.time)
        //Makes API call
        let res = this.$services.transaction.create(this.tid, this.from, this.to, this.amount, date.unix(), this.purpose, this.reference, this.verified);
        res.then((r) => {
          //Reloads the page on success
          if (r) window.location.reload();
        });
      },
      /**
       * Deletes this transaction from the database.
       */
      deleteTransaction() {
        if (this.tid != null) {
          //Makes API call
          let res = this.$services.transaction.delete(this.tid);
          res.then((r) => {
            if (r) {
              //API call was successfull (returned 200)
              this.error = "Transaktion wurde gelöscht!"
            } else {
              //API call was not successfull
              this.error = "Transaktion konnte nicht gelöscht werden!"
            }
          });
        } else {
          //Transaction ID is null, that means that transaction of this component is a new one which is not yet saved into the database.
          this.error = "Transaktion kann nicht gelöscht werden, da sie noch nicht gespeichert ist!"
        }
      },
      /**
       * OnClick method to change the verified-attribute of this transaction.
       *
       * If the the transaction was already verified (the verifiedLocked property would be true if thats the case),
       * the inputs get unlocked and a toast will appear containing an informative warning.
       * 
       */
      verifiedChange() {
        if (this.verifiedLocked) {
          //Opens the toast
          var toastEl = document.getElementById("toast-changeVerify");
          var toast = new bootstrap.Toast(toastEl);
          toast.show();
          //Enables all inputs
          const inputs = document.getElementsByClassName("t-input");
          this.verifiedStyle = false;
          for (let i = 0; i < inputs.length; i++) {
            inputs[i].disabled = false;
          }
        }
      }
    },
    mounted() {
      //Gets current time and sets it at the default-time
      var timeString = new Date().toISOString();
      this.time = timeString.substring(0, timeString.length - 8);
      
      //If the the property visible is true (by default it's false, it has to be passed down by a parent as true)
      //The input form is expanded by default
      if (this.visible) {
        new bootstrap.Collapse(document.querySelector("#createForm"), {toggle: this.visible})
      }

      const transaction = this.transaction;

      if (transaction != null && transaction.tid != undefined) {
        //Changes the data of this component to reflect the transaction passed down from the paren
        this.tid = transaction.tid;
        this.from = transaction.fromName;
        this.to = transaction.toName;
        this.amount = transaction.price;
        this.purpose = transaction.purpose;
        this.reference = transaction.reference;
        //Formats the time so the input can display it properly
        let time = moment.unix(transaction.time);
        this.time = time.format("YYYY-MM-DD HH:mm");
        this.verified = transaction.verified;
        if (this.verified) {
          //Locks the inputs if the transaction is already verified
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
