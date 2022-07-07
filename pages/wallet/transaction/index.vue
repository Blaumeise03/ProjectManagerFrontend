<template>
  <div class="container-fluid p-0">
    <h1 class="title">
      Neue Transaktion
    </h1>
    <div class="container-md box">
      Transaktion eingeben
    </div>
    <transaction-item-create class="container-md" :transaction="transaction" />
  </div>
</template>

<script>
  import TransactionItemCreate from '~/components/TransactionItemCreate.vue'

  export default {
    components: {
      TransactionItemCreate
    },
    data() {
      return {
        transaction: {
          type: Object,
          default() {
            return null;
          }
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
