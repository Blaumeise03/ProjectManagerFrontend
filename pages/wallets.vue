<template>
  <div class="container-fluid p-0">
    <h1 class="title">
      Kontos von [{{ corpTag }}]
    </h1>
    <div class="container-md pb-4">
      <!--transaction-item-create :players="players" :playerName="playerName"/-->
    </div>
    <div class="container-md box">Kontostände</div>
    <div class="container-md box">Abgeschlossene Transaktionen</div>
    <wallet-list :wallets="wallets" />
  </div>
</template>

<script>
  import WalletList from '~/components/WalletList.vue'
  //import TransactionItemCreate from '~/components/TransactionItemCreate.vue'

  export default {
    components: {
      WalletList,
      //TransactionItemCreate
    },
    data() {
      return {
        corpID: 1,
        corpTag: null,
        wallets: {
          type: Array,
          default() {
            return [];
          }
        }
      }
    },
    computed: {

    },
    async asyncData(ctx) {
      console.log("t2")
      return {
        wallets: await ctx.app.$services.player.findWalletsByCorp(1)
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
