<template>
  <div class="container box p-4 mt-5">
    <h1>Project Manager</h1>
    <div class="d-flex flex-wrap">

      <div class="flex-fill link-btn p-0">
        <NuxtLink :to="'/wallet/' + userMID">
          <div class="icon bi-wallet p-4"></div>
          <h1>Wallet</h1>
        </NuxtLink>
      </div>
      <div class="flex-fill link-btn p-0">
        <NuxtLink to="/wallet/">
          <div class="icon bi-building p-4"></div>
          <h1>Corp</h1>
        </NuxtLink>
      </div>
      <div class="flex-fill link-btn p-0">
        <NuxtLink to="/wallet/transaction">
          <div class="icon bi-pen p-4"></div>
          <h1>Neu</h1>
        </NuxtLink>
      </div>
      <div class="flex-fill link-btn p-0">
        <NuxtLink to="/data/item">
          <div class="icon bi bi-clipboard2-data p-4"></div>
          <h1>Items</h1>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
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
  }

  .link-btn {
    outline: 1px solid #808080;
    border-radius: 2rem;
    box-shadow: 5px 10px 5px rgba(0, 0, 0, 0.2);
    margin: 10px;

    a{
      text-decoration: none;
      color: inherit;
      margin:0;
    }

    h1{
      margin: 0;
      padding-bottom: 5px;
    }
  }
</style>
