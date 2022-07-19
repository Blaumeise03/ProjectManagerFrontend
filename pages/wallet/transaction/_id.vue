<template>
  <div class="container-fluid p-0">
    <h1 class="title">
      Transaction {{ transactionID }}
    </h1>
    <transaction-list :transactions="transactions"/>
    <div class="container-md box">
      Status:
      <span v-if="transaction.verified" class="positive"><strong>Verifiziert</strong></span>
      <span v-else class="negative"><strong>Nicht Verifiziert</strong></span>
    </div>
    <transaction-item-create class="container-md" :transaction="transaction"/>
    
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
        transactionID: -1,
        transaction: {
          type: Object,
          default() {
            return null
          }
        },
        transactions: {
          type: Array,
          default() {
            return []
          }
        }
      }
    },
    computed: {
      
    },
    async asyncData(ctx) {
      //console.log("t: transaction_id");
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
