<template>
  <div class="row table-item hover" @click="openDetails">
    <div class="row col-sm">
      <!--From field-->
      <div class="col-md mobile-border mobile-border-r">
        <div class="mobile-only mobile-bold">Von</div>
        <div class="">{{ getFrom }}</div>
      </div>
      <!--To field-->
      <div class="col-md mobile-border mobile-border-r">
        <div class="mobile-only mobile-bold">Zu</div>
        <div class="">
          {{ getTo }}
        </div>
      </div>
      <!--Formatted price field-->
      <div class="col-md mobile-border-r">
        <div class="mobile-only mobile-bold">Betrag</div>
        <div class="" v-bind:class="{ negative: negative, positive: !negative }">
          {{ getPriceString }} ISK
        </div>
      </div>
    </div>

    <div class="row col-sm">
      <!--Purpose field-->
      <div class="col-md mobile-border">
        <div class="mobile-only mobile-bold">Verwendungszweck</div>
        <div class="text-break">{{ transaction.purpose }}</div>
      </div>
      <!--Reference field-->
      <div class="col-md mobile-border">
        <div class="mobile-only mobile-bold">Referenz</div>
        <div class="text-break">{{ getRef }}</div>
      </div>
      <!--Formatted time field-->
      <div class="col-md">
        <div class="mobile-only mobile-bold">Zeit</div>
        <div class="">{{ getTimeUTC }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';

  export default {
    props: {
      transaction: {
        type: Object,
        default() {
          return {}
        }
      },
      heights: {
        type: Array,
        default() {
          return ['unset', 'unset', 'unsert'];
        }
      },
      owner: {
        type: Number,
        default() {
          return -1;
        }
      }
    },
    computed: {
      /**
       * Function to get the formatted price of this transaction.
       * 
       * @return the formatted price.
       */
      getPriceString: function () {
        if (this.transaction.price != undefined)
          return this.transaction.price.toLocaleString('en-US');
        return null;
      },
      /**
       * Function to get the formatted time of this transaction.
       * 
       * @return the formatted time.
       */
      getTimeUTC: function () {
        var newDate = new Date();
        if (this.transaction.time != undefined) {
          newDate.setTime(this.transaction.time * 1000);
          return newDate.toLocaleString("de-DE");
        }
        return null;
      },
      /**
       * Checks whether this transaction is negative for the current wallet.
       *
       * If the owner property of this component is equal to the sender (this.transaction.fromID),
       * the function returns true and the price will be highlighted red. If not green. The property
       * has to be passed down from the page. Take a look at the different pages which use this
       * component to see where the value comes from.
       *
       * @return true or false
       */
      isNegative: function () {
        return this.owner == this.transaction.fromID
      },
      /**
       * Gets the sender of this transaction or "N/A" if the transaction does not has a sender.
       *
       * @return a non-empty String or null if the current transaction is null.
       */
      getFrom: function () {
        if (this.transaction != undefined) {
          if (this.transaction.fromID == -1) return "N/A";
          return this.transaction.fromName;
        }
        return null;
      },
      /**
       * Gets the receiver of this transaction or "N/A" if the transaction does not has a receiver.
       *
       * @return a non-empty String or null if the current transaction is null.
       */
      getTo: function () {
        //console.log(this.transaction)
        if (this.transaction != undefined) {
          if (this.transaction.toID == -1) return "N/A";
          return this.transaction.toName;
        }
        return null;
      },
      /**
       * Gets the reference of this transaction or "N/A" if the transaction does not has a reference.
       *
       * @return a non-empty String or null if the current transaction is null.
       */
      getRef: function () {
        if (this.transaction != undefined) {
          if (this.transaction.reference == "") return "N/A";
          return this.transaction.reference;
        }
        return null;
      }
    },
    data() {
      return {
        negative: this.owner == this.transaction.fromID
      };
    },
    methods: {
      /**
       * Method to open the transaction details page. The owner property gets passed as a query param,
       * that way the highlighting stays the same.
       */
      openDetails() {
        if (this.transaction != undefined) {
          this.$router.push({
            path: '/wallet/transaction/' + this.transaction.tid,
            query: { owner: this.owner }
          })
        }
      }
    }
  };
</script>

<style lang="scss">
  
</style>
