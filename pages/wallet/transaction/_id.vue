<template>
  <div class="container-fluid p-0">
    <h1 class="title">
      Transaction {{ transactionID }}
    </h1>
    <transaction-list :transactions="transactions" :owner="owner"/>
    <div class="container-md box">
      Status:
      <span v-if="transaction.verified" class="positive"><strong>Verifiziert</strong></span>
      <span v-else class="negative"><strong>Nicht Verifiziert</strong></span>
    </div>
    <transaction-item-create class="container-md" :transaction="transaction" :visible="true"/>
    
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
        //The id of the transaction
        transactionID: -1,
        //The transaction object of this page
        transaction: {
          type: Object,
          default() {
            return null;
          }
        },
        //An array of transactions, it will be filled with the transaction of this page to be passed to the TransactionList
        transactions: {
          type: Array,
          default() {
            return [];
          }
        }
      }
    },
    computed: {
      /**
       * The owner of the wallet to determine the color of the ISK.
       *
       * The owner ID has to be passed as a query parameter by another page. For example if the user was on the wallet page of
       * the wallet 42 and clicks on one of the transaction to be redirected to this page, the 42 will be passed as a query param.
       * That way the highligting of the ISK will stay the same, if the transaction has the wallet 42 as the sender, it will be red,
       * of not green.
       *
       * @return the owner ID or -1 if no owner ID was passed as a query param.
       */
      owner() {
        if (this.$route.query.owner) {
          return Number(this.$route.query.owner);
        }
        return -1;
      }
    },
    /**
     * Nuxt lifecycle hook to load data.
     * 
     * @param ctx the Nuxt context
     */
    async asyncData(ctx) {
      try {
        const t = await ctx.$services.transaction.findById(ctx.route.params.id);
        return {
          transactionID: Number(ctx.route.params.id),
          transaction: t,
          transactions: [t]
        }
      } catch (error) {
        return {
          transactionID: -1,
          transaction: {transactionID: null},
          transactions: []
        }
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
</style>
