<template>
  <div class="wallet-container">
    <div class="wallet-list-container container-md pt-2 box">
      <div class="row desktop-only wallet-item">
        <div class="col">Name</div>
        <div class="col">Konto</div>
        <div class="col">Austehend</div>
      </div>
      <wallet-item v-for="wallet in wallets" :key="wallet.id" :wallet="wallet" />
    </div>
  </div>
</template>

<script>
  import WalletItem from '~/components/wallet/WalletItem.vue'

  export default {
    components: {
      WalletItem
    },
    props: {
      wallets: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      createItem(item) {
        this.wallets.push(item)
      },
      deleteItem(item) {
        this.wallets.splice(this.wallets.indexOf(item), 1)
      }
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

  .wallet-container {
    //width: 80%;
    //margin: auto;
    //margin-top: 50px;
    display: block;

    .wallet-item:nth-of-type(2n) {
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

  .wallet-list-container {
    //width: 400px;
    //margin: auto;
    //margin-top: 50px;
    display: block;
    //box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  }
</style>
