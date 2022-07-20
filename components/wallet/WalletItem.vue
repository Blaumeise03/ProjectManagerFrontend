<template>
  <div class="row wallet-item hover" @click="openDetails">
    <!--Playername-->
    <div class="col-md mobile-border">
      <div class="mobile-only mobile-bold">Name</div>
      <div class="">{{ wallet.name }}</div>
    </div>
    <!--Sum of verified transactions-->
    <div class="col-md mobile-border">
      <div class="mobile-only mobile-bold">Konto</div>
      <div class="" :class="{ negative: negativeV, positive: !negativeV }">
        {{ getVerifiedPriceString }}
      </div>
    </div>
    <!--Sum of unverified transactions-->
    <div class="col-md">
      <div class="mobile-only mobile-bold">Austehend</div>
      <div class="" :class="{ negative: negativeUV, positive: !negativeUV }">
        {{ getUnverifiedPriceString }} ISK
      </div>
    </div>
  </div>
</template>

<script>
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
      return {
        //Whether the verified sum is negative
        negativeV: this.wallet.verified < 0,
        //Whether the unverified sum is negative
        negativeUV: this.wallet.unverified < 0,
      };
    },
    methods: {
      /**
       * Redirects the client to the page of this wallet
       */
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

  .hover:hover {
    background-color: lightgray !important;
  }

  .wallet-item {
    border-block-color: rgb(128, 128, 128);
    border-bottom-style: solid;
    border-width: thin;

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
</style>
