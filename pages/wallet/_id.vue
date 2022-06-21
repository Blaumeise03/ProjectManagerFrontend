<template>
  <div class="container-fluid p-0">
    <h1 class="title">
      Konto {{ playerID }}
    </h1>
    <div class="container-md pb-4">
      <transaction-item-create :playerID="playerID" :players="players" :playerName="playerName"/>
    </div>
    <div class="container-md pb-2">
      <div class="balance box">Kontostand von {{ playerName }}: <span v-bind:class="{ negative: isNegativeBal, positive: !isNegativeBal }">{{ getPriceString }}</span> ISK</div>
    </div>
    <div class="container-md box">Austehende Transaktionen</div>
    <transaction-list :transactions="transactionsUnverified" />
    <div class="container-md box">Abgeschlossene Transaktionen</div>
    <transaction-list :transactions="transactionsVerified" />
  </div>
</template>

<script>
  import TransactionList from '~/components/TransactionList.vue'
  import TransactionItemCreate from '~/components/TransactionItemCreate.vue'

  export default {
    components: {
      TransactionList,
      TransactionItemCreate
    },
    data() {
      return {
        transactionsVerified: {
          type: Array
        },
        transactionsUnverified: {
          type: Array
        },
        playerID: {
          type: Number,
          default: -1
        },
        negativeBal: {
          type: Boolean
        },
        players: {
          type: Array
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
        //console.log(this.$route.params.id + " " + this.transaction.fromID)
        if (this.balance == undefined) return null;
        return this.balance < 0
      },
      getPriceString: function () {
        if (this.balance == undefined) return null;
        return this.balance.toLocaleString('en-US')
      }
    },
    mounted() {
      //console.log(this)
      //if (this.$router.params.id == undefined) {
        //console.log(ctx.app.router)
        //console.warn("No wallet id found, redirecting to /wallets")
        //this.$router.push("/wallets")
        //return;
      //}
      //console.log("teeest")
      //console.log(this)
      
    },
    async asyncData(ctx) {
      
      //console.log("t: wallet_id");
      const transactions = await ctx.app.$services.transaction.findAllByUserId(ctx.route.params.id);
      //console.log(ctx.app.$services.transaction.getVerified(transactions));
      const player = await ctx.app.$services.player.findById(ctx.route.params.id);
      if (ctx.route.params.id == undefined) {
        //console.log("tee");
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
