<template>
  <div class="container-fluid p-0">
    <h1 class="title">
      Konto
    </h1>
    <div class="container-md pb-2">
      <div class="balance box">Kontostand: <span v-bind:class="{ negative: isNegativeBal, positive: !isNegativeBal }">{{ getPriceString }}</span> ISK</div>
    </div>
    <div class="container-md box">Austehende Transaktionen</div>
    <transaction-list :transactions="transactionsUnverified" />
    <div class="container-md box">Abgeschlossene Transaktionen</div>
    <transaction-list :transactions="transactionsVerified" />
  </div>
</template>

<script>
  import TransactionList from '~/components/TransactionList.vue'
  export default {
    components: {
      TransactionList
    },
    data() {
      return {
        transactionsVerified: {
          type: Array
        },
        transactionsUnverified: {
          type: Array
        },
        negativeBal: {
          type: Boolean
        }
      }
    },
    computed: {
      isNegativeBal: function () {
        //console.log(this.$route.params.id + " " + this.transaction.fromID)
        return this.balance < 0
      },
      getPriceString: function () {
        return this.balance.toLocaleString('en-US')
      }
    },
    async asyncData(ctx) {
      //console.log(ctx)
      const transactions = await ctx.app.$services.transaction.findAllByUserId(ctx.route.params.id);
      //console.log(ctx.app.$services.transaction.getVerified(transactions));
      return {
        transactionsVerified: await ctx.app.$services.transaction.getVerified(transactions),
        transactionsUnverified: await ctx.app.$services.transaction.getUnverified(transactions),
        balance: await ctx.app.$services.transaction.getBalanceByUserId(ctx.route.params.id),
      }
    }
  }
</script>
<style lang="scss">
  .negative {
    color: red;
  }

  .positive {
    color: green;
  }

  .balance {
    //right: 50px;
    position: relative;
    //left:100%;
    width:fit-content;
    margin-left:auto;
    height: max-content;
    padding: 4px;

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
</style>
