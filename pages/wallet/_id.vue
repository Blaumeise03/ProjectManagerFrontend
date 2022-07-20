<template>
  <div class="container-fluid p-0">
    <h1 class="title">
      Konto {{ playerID }}
    </h1>
    <div class="container-md pb-4">
      <transaction-item-create :playerID="playerID" :players="players" :playerName="playerName" />
    </div>
    <!--Playername + Balance-->
    <div class="container-md pb-2">
      <div class="balance box">Kontostand von {{ playerName }}: <span v-bind:class="{ negative: isNegativeBal, positive: !isNegativeBal }">{{ getPriceString }}</span> ISK</div>
    </div>
    <!--Unverified transactions of the user-->
    <div class="container-md box">Austehende Transaktionen</div>
    <transaction-list :transactions="transactionsUnverified" :owner="playerID" />
    <!--Verified transactions of the user-->
    <div class="container-md box">Abgeschlossene Transaktionen</div>
    <transaction-list :transactions="transactionsVerified" :owner="playerID" />
  </div>
</template>

<script>
  import TransactionList from '~/components/wallet/transactions/TransactionList.vue'
  import TransactionItemCreate from '~/components/wallet/transactions/TransactionItemCreate.vue'

  export default {
    components: {
      TransactionList,
      TransactionItemCreate
    },
    data() {
      return {
        transactionsVerified: {
          type: Array,
          default: []
        },
        transactionsUnverified: {
          type: Array,
          default: []
        },
        playerID: {
          type: Number,
          default: -1
        },
        negativeBal: {
          type: Boolean
        },
        //All players, will be passed to the TransactionItemCreate component
        players: {
          type: Array,
          default() {
            return [];
          }
        },
        playerName: {
          tyoe: String,
          default() {
            return "";
          }
        }
      }
    },
    computed: {
      isNegativeBal: function () {
        if (this.balance == undefined) return null;
        return this.balance < 0
      },
      getPriceString: function () {
        if (this.balance == undefined) return null;
        return this.balance.toLocaleString('en-US')
      }
    },
    /**
     * Nuxt lifecycle hook to load data.
     * 
     * @param ctx the nuxt context
     */
    async asyncData(ctx) {
      try {
        const transactions = await ctx.app.$services.transaction.findAllByUserId(ctx.route.params.id);
        const player = await ctx.app.$services.player.findById(ctx.route.params.id);
        //Error placeholder
        if (ctx.route.params.id == undefined) {
          return {
            transactionsVerified: [],
            transactionsUnverified: [],
            balance: -1,
            players: [],
            playerName: 'Error'
          };
        };
        return {
          playerID: Number(ctx.route.params.id),
          transactionsVerified: await ctx.app.$services.transaction.getVerified(transactions),
          transactionsUnverified: await ctx.app.$services.transaction.getUnverified(transactions),
          balance: await ctx.app.$services.transaction.getBalanceByUserId(ctx.route.params.id),
          players: await ctx.app.$services.player.findAllByCorpID(player.corpID),
          playerName: player.name
        }
      } catch (error) {
        //Axios errors will be handled by the interceptor.
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
