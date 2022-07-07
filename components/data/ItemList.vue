<template>
  <div class="container-md p-2 box">
    <div class="pb-4">
      Effizienz: <input v-model.number="efficiency" type="number" max="3" min="0.5" step="0.01" /> (Aktuell: {{ getEffi() }})
    </div>
    <table class="table table-striped table-hover">
      <thead>
        <tr class="">
          <th class="">Name</th>
          <th v-for="price in prices">{{ price }}</th>
          <th v-for="res in ressources">{{ res.name }}</th>
        </tr>
      </thead>
      <tbody>
        <item v-for="item in items" :key="item.itemID" :item="item" :prices="prices" :ressources="ressources" :efficiency="efficiency" />
      </tbody>
    </table>
  </div>
</template>

<script>
  import Item from '~/components/data/Item.vue'

  export default {
    components: {
      Item
    },
    props: {
      items: {
        type: Array,
        default() {
          return [];
        }
      },
      ressources: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    data() {
      return {
        prices: ['MARKET_LOWEST_SELL', 'VCB_SELL'],
        efficiency: 1.5
      }
    },
    methods: {
      getEffi() {
        return (Math.round(this.efficiency * 10000) / 100).toFixed(0) + '%'
      }
    },
    mounted() {
      //console.log("ItemList.vue mounted")
    },
    updated() {
      //console.log("IteList.vue updated");
    }
  }
</script>
