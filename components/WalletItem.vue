<template>
  <div class="row wallet-item hover" @click="openDetails">
    <div class="col-md mobile-border">
      <div class="mobile-only mobile-bold">Name</div>
      <div class="">{{ wallet.name }}</div>
    </div>
    <div class="col-md mobile-border">
      <div class="mobile-only mobile-bold">Konto</div>
      <div class="" v-bind:class="{ negative: negativeV, positive: !negativeV }">
        {{ getVerifiedPriceString }}
      </div>
    </div>
    <div class="col-md">
      <div class="mobile-only mobile-bold">Austehend</div>
      <div class="" v-bind:class="{ negative: negativeUV, positive: !negativeUV }">
        {{ getUnverifiedPriceString }} ISK
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';

  export default {
    props: {
      wallet: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      getVerifiedPriceString: function () {
        return this.wallet.verified.toLocaleString('en-US')
      },
      getUnverifiedPriceString: function () {
        return this.wallet.unverified.toLocaleString('en-US')
      },
    },
    data() {
      //console.log(this.$route.params.id == this.transaction.fromID)
      return {
        negativeV: this.wallet.verified < 0,
        negativeUV: this.wallet.unverified < 0,
      };
    },
    methods: {
      openDetails() {
        this.$router.push('/wallet/' + this.wallet.id)
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

  .wallet-item:nth-of-type(1) {
    border-block-color: black;
  }

  .wallet-item:nth-last-of-type(1) {
    border: none;
  }

  .mobile-border {
  }

  .mobile-bold {
  }

  .hover:hover {
    background-color: lightgray !important;
  }

  .wallet-item {
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

    .wallet-item {
      border-width: medium;
    }
  }
</style>
