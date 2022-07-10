<template>
  <div>
    <h1>Items</h1>
    <item-list :items="items" />
  </div>
</template>

<script>
  import Item from '~/components/data/Item.vue'
  import ItemList from '~/components/data/ItemList.vue'

  export default {
    components: {
      Item,
      ItemList
    },
    data() {
      return {
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
      };
    },
    async asyncData(ctx) {
      var items = await ctx.$services.item.findFullAll()
      const res = ['Anderes Item', 'Noch nen Item'];
      //console.log(item)
      try {
        return {
          items: items,
          ressources: res
        };
      } catch (error) {

      }
    }
  }
</script>
