<template>
  <div class="container-fluid p-0">
    <h1 class="title">
      Kontos von [{{ corp.tag }}]
    </h1>
    <div class="container-md pb-4">
      <!--transaction-item-create :players="players" :playerName="playerName"/-->
    </div>
    <div class="container-md box">Kontostände [{{ corp.tag }}] {{ corp.name }} (ID: {{ corp.cid }})</div>
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
        corpID: null,
        corp: {
          type: Object,
          default() {
            return {
              tag: 'N/A',
              name: 'N/A',
              cid: null
            };
          }
        },
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
    validate({ params, query, store, redirect, app }) {
      if (store.state.user.user.cid == null) {
        app.$eventHub.$emit('general-error', {message: "No Corp found/not logged in!"})
        redirect('/');
        //return false;
      };
      return true;
    },
    async asyncData(ctx) {
      //console.log("t " + ctx.app.store.state.user.user.cid)
      try {
        return {
          corpID: ctx.app.store.state.user.user.cid,
          wallets: await ctx.app.$services.player.findWalletsByCorp(ctx.app.store.state.user.user.cid),
          corp: await ctx.app.$services.corp.findByID(ctx.app.store.state.user.user.cid)
        }
      } catch (error) {

      }
    },
    mounted() {
      console.log(this.corp)
    },
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
