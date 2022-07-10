<template>
  <tr @click="openDetails">
    <td>
      {{ item.name }}
    </td>
    <td v-for="price in prices">
      {{ getPrice(item, price).toLocaleString('en-US') }} ISK
    </td>
    <td v-for="res in ressources">
      {{ getRes(item, res.id).toLocaleString('en-US') }}
    </td>
  </tr>
</template>

<script>
  export default {
    props: {
      item: {
        type: Object,
        required: true
      },
      ressources: {
        type: Array,
        default() {
          return []
        }
      },
      prices: {
        type: Array,
        default() {
          return []
        }
      },
      efficiency: {
        type: Number,
        default() {
          return 1.5;
        }
      }
    },
    methods: {
      getPrice(item, type) {
        for (const price of item.prices) {
          if (price.type == type) {
            return price.value;
          }
        }
        return -1;
      },
      getRes(item, res) {
        if (item.blueprint != null) {
          for (const c of item.blueprint.baseCost) {
            if(c.itemID == res)
              return c.quantity / 1.5 * this.efficiency;
          }
        }
        return 0;
      },
      openDetails() {
        if (this.item != undefined) {
          this.$router.push('/data/item/' + this.item.itemID)
        }
      }
    },
    data() {
      const id = this.$services.uuid.getUUID()

      return {
        uuid: id
      }
    },
    computed: {

    },
    mounted() {
      //console.log("Item.vue mounted")
    },
    updated() {
      //console.log("Item.vue updated");
    }
  }
</script>
