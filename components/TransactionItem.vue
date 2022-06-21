<template>
  <div class="row transaction-item hover" @click="openDetails">
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
        return this.transaction.price.toLocaleString('en-US')
      },
      getTimeUTC: function () {
        var newDate = new Date();
        newDate.setTime(this.transaction.time * 1000);
        return newDate.toLocaleString("de-DE");
      },
      isNegative: function () {
        //console.log(this.$route.params.id + " " + this.transaction.fromID)
        return this.$route.params.id == this.transaction.fromID
      },
      getFrom: function () {
        if (this.transaction.fromID == -1) return "N/A";
        return this.transaction.fromName;
      },
      getTo: function () {
        //console.log(this.transaction)
        if (this.transaction.toID == -1) return "N/A";
        return this.transaction.toName;
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
        this.$router.push('/wallet/transaction/' + this.transaction.tid)
      }
    }
  };
</script>

<style lang="scss">
  .negative {
    color: red;
  }

  .positive {
    color: green;
  }

  .transaction-item:nth-of-type(1) {
    border-block-color: black;
  }

  .transaction-item:nth-last-of-type(1) {
    border: none;
  }

  .mobile-border {
  }

  .mobile-bold {

  }
  .hover:hover {
      background-color: lightgray !important;
  }

  .transaction-item {
    //width: 100%;
    //display: block;
    //height: 50px;
    //box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
    border-block-color: rgb(128, 128, 128);
    border-bottom-style: solid;
    border-width: thin;

    .cell {
      display: table-cell;
    }

    .trow {
      display: able-row;
    }

    &.completed {
      opacity: 0.2;
    }

    div {
      //height: 50px;
      //padding-left: 20px;
      //line-height: 50px;
      //width: 300px;
      //display: inline-block;
    }

    .controls {
      display: inline-block;
      height: 50px;
      line-height: 50px;
      float: right;

      div {
        line-height: 50px;
        height: 50px;
        display: inline-block;
        width: 45px;
        text-align: center;
        padding: 0;
        cursor: pointer;
      }
    }
  }

  @media screen and (max-width : 768px) {
    .mobile-border {
      border-block-color: rgb(187, 187, 187);
      border-bottom-style: solid;
      border-width: thin;
    }

    .mobile-bold {
      font-weight: bold;
    }

    .transaction-item {
      border-width: medium;
    }
  }
</style>
