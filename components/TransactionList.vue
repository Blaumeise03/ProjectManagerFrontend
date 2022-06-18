<template>
  <div class="transaction-container">
    <div class="transaction-list-container container-md pt-2 box">
      <div class="row desktop-only transaction-item">
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
  import TransactionItem from '~/components/TransactionItem.vue'

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
    },
    async asyncData(ctx) {
      console.log("test")
    }
  }
</script>

<style lang="scss">
  .mobile-only {
      
  }

  .desktop-only {
  }

  

  @media screen and (max-width : 1920px) {
    .mobile-only {
      display: none;
    }
  }

  @media screen and (max-width : 768px) {
    .desktop-only {
      display: none;
    }

    .mobile-only {
      display: inherit;
    }

    
  }

  .transaction-container {
    //width: 80%;
    //margin: auto;
    //margin-top: 50px;
    display: block;

    .transaction-item:nth-of-type(2n) {
      background-color: rgba(0, 0, 0, 0.04);
    }

    .create-container {
      //width: 100%;
      //height: 50px;
      box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);

      input {
        //height: 50px;
        //width: 80%;
        border: none;
        //padding-left: 10px;
        font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        font-size: 18px;

        &:focus {
          outline: none;
        }
      }

      button {
        //height: 45px;
        float: right;
        background: none;
        width: auto;
        margin: 0;
        border: none;
        cursor: pointer;
        text-align: right;
        //padding-right: 20px;
        font-size: 18px;

        &:focus {
          outline: none;
        }
      }
    }
  }

  .transaction-list-container {
    //width: 400px;
    //margin: auto;
    //margin-top: 50px;
    display: block;
    //box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  }
</style>
