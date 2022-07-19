<template>
  <div class="row table-item hover" @click="openDetails">
    <div class="row col">
      <div class="col-md mobile-border">
        <div class="mobile-only mobile-bold">Von</div>
        <div class="">{{ getFrom }}</div>
      </div>
      <div class="col-md mobile-border">
        <div class="mobile-only mobile-bold">Zu</div>
        <div class="">
          {{ getTo }}
        </div>
      </div>
      <div class="col-md">
        <div class="mobile-only mobile-bold">Betrag</div>
        <div class="" v-bind:class="{ negative: negative, positive: !negative }">
          {{ getPriceString }} ISK
        </div>
      </div>
    </div>

    <div class="row col">
      <div class="col-md mobile-border">
        <div class="mobile-only mobile-bold">Verwendungszweck</div>
        <div class="">{{ transaction.purpose }}</div>
      </div>
      <div class="col-md mobile-border">
        <div class="mobile-only mobile-bold">Referenz</div>
        <div class="">{{ transaction.reference }}</div>
      </div>
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
      }
    },
    computed: {
      getPriceString: function () {
        if (this.transaction.price != undefined)
          return this.transaction.price.toLocaleString('en-US');
        return null;
      },
      getTimeUTC: function () {
        var newDate = new Date();
        if (this.transaction.time != undefined) {
          newDate.setTime(this.transaction.time * 1000);
          return newDate.toLocaleString("de-DE");
        }
        return null;
      },
      isNegative: function () {
        //console.log(this.$route.params.id + " " + this.transaction.fromID)
        return this.$route.params.id == this.transaction.fromID
      },
      getFrom: function () {
        if (this.transaction != undefined) {
          if (this.transaction.fromID == -1) return "N/A";
          return this.transaction.fromName;
        }
        return null;
      },
      getTo: function () {
        //console.log(this.transaction)
        if (this.transaction != undefined) {
          if (this.transaction.toID == -1) return "N/A";
          return this.transaction.toName;
        }
        return null;
      }
    },
    data() {
      //console.log(this.$route.params.id == this.transaction.fromID)
      return {
        negative: this.$route.params.id == this.transaction.fromID
      };
    },
    methods: {
      openDetails() {
        if (this.transaction != undefined) {
          this.$router.push('/wallet/transaction/' + this.transaction.tid)
        }
      }
    }
  };
</script>

<style lang="scss">
 
</style>
