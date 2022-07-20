<template>
  <div class="container box p-4 mt-5">
    <h1>Project Manager</h1>
    <div class="d-flex flex-wrap">
      <!--Link to the wallet of the current user-->
      <div class="flex-fill link-btn p-0">
        <NuxtLink :to="'/wallet/' + userMID">
          <div class="icon bi-wallet"></div>
          <h1 class="icon-label">Wallet</h1>
        </NuxtLink>
      </div>
      <!--Link to the wallets of the current user's corp-->
      <div class="flex-fill link-btn p-0">
        <NuxtLink to="/wallet/">
          <div class="icon bi-building"></div>
          <h1 class="icon-label">Corp</h1>
        </NuxtLink>
      </div>
      <!--Link to create a new transaction-->
      <div class="flex-fill link-btn p-0">
        <NuxtLink to="/wallet/transaction">
          <div class="icon bi-pen"></div>
          <h1 class="icon-label">Neu</h1>
        </NuxtLink>
      </div>
      <!--Link to the item list page-->
      <div class="flex-fill link-btn p-0">
        <NuxtLink to="/data/item">
          <div class="icon bi bi-clipboard2-data"></div>
          <h1 class="icon-label">Items</h1>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      //ID of the user, required for the wallet link
      userMID() {
        const user = this.$store.state.user.user
        return user.mid;
      }
    }
  }
</script>


<style lang="scss">
  h1 {
    text-align: center;
  }

  .icon {
    font-size: 7rem;
    text-align: center;
    padding-left: 2rem !important;
    padding-right: 2rem !important;
  }

  .link-btn {
    outline: 1px solid #808080;
    border-radius: 2rem;
    box-shadow: 5px 10px 5px rgba(0, 0, 0, 0.2);
    margin: 10px;

    a {
      text-decoration: none;
      color: inherit;
      margin: 0;
    }

    .icon-label {
      margin: 0;
      padding-bottom: 5px;
    }
  }

  @media (max-width: 576px) {
    .icon {
      font-size: 2rem;
      padding-left: 1rem !important;
      padding-right: 1rem !important;
    }

    .icon-label {
      font-size: 1rem;
    }

    .link-btn {
      border-radius: 0.75rem;
    }
  }
</style>
