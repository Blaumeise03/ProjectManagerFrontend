<template>
  <div>
    <contract :contract="contract" :player="player" :itemNames="itemNames" class="my-4" />
  </div>
</template>

<script>
  import Contract from "~/components/project/contract/Contract.vue"

  export default {
    components: {
      Contract
    },
    data() {
      return {
        contractID: {
          type: Number,
          default() {
            return -1;
          }
        },
        contract: {
          type: Object,
          default() {
            return null;
          }
        },
        player: {
          type: Object,
          default() {
            return null;
          }
        },
        itemNames: {
          type: Array,
          default() {
            return [];
          }
        },
        playerNames: {
          type: Array,
          default() {
            return [];
          }
        }
      }
    },
    async asyncData(ctx) {
      let contract = await ctx.app.$services.contract.findByID(ctx.route.params.id);
      return {
        contractID: Number(ctx.route.params.id),
        contract: contract,
        player: await ctx.app.$services.player.findById(contract.playerID),
        itemNames: await ctx.$services.item.findAllNames(),
      }
    }
  }
</script>

<style lang="scss">

</style>
