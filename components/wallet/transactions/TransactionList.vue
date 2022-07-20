<template>
  <div class="table-container">
    <div class="table-list-container container-md pt-2 box">
      <!--The headings for the table, only visible on desktop devices-->
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
      <!--The transactions of this list, the owner property gets passed down to the item component-->
      <transaction-item v-for="transaction in transactions" :key="transaction.tid" :transaction="transaction" :owner="owner" />
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
      //The list of transactions which should be displayed in this component.
      transactions: {
        type: Array,
        default() {
          return []
        }
      },
      //The ownerID, for more details refer to TransactionItem.vue
      owner: {
        type: Number,
        default() {
          return -1;
        }
      }
    },
    methods: {
      /**
       * Adds an item to the transaction list.
       * 
       * @param item the item which should be added.
       */
      createItem(item) {
        this.transactions.push(item)
      },
      /**
       * Removes a specific item from the transaction list.
       * 
       * @param item the item which should be removed.
       */
      deleteItem(item) {
        this.transactions.splice(this.transactions.indexOf(item), 1)
      }
    }
  }
</script>

<style lang="scss">

</style>
