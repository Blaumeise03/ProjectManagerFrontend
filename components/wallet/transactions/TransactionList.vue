<template>
  <div class="table-container">
    <div class="table-list-container container-md pt-2 box">
      <div class="row desktop-only table-item">
        <div class="col row">
          <div class="col">Von</div>
          <div class="col">Zu</div>
          <div class="col">Betrag</div>
        </div>
        <div class="col row">
          <div class="col">Verwendungszweck</div>
          <div class="col">Referenz</div>
          <div class="col">Zeit</div>
        </div>
      </div>
      <transaction-item v-for="transaction in transactions" :key="transaction.tid" :transaction="transaction" />
    </div>
  </div>
</template>

<script>
  import TransactionItem from '~/components/wallet/transactions/TransactionItem.vue'

  export default {
    components: {
      TransactionItem
    },
    props: {
      transactions: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      createItem(item) {
        this.transactions.push(item)
      },
      deleteItem(item) {
        this.transactions.splice(this.transactions.indexOf(item), 1)
      }
    }
  }
</script>

<style lang="scss">

</style>
