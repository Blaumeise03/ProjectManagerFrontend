<template>
  <div>
    <h1>{{ item.name }}</h1>
    <item-edit :item="item" :itemNames="itemNames"/>
    <item-list :items="[item]" :ressources="ressources" />
  </div>
</template>

<script>
  import Item from '~/components/data/Item.vue'
  import ItemList from '~/components/data/ItemList.vue'
  import ItemEdit from '~/components/data/ItemEdit.vue'

  export default {
    components: {
      Item,
      ItemList,
      ItemEdit
    },
    data() {
      return {
        item: {
          type: Object,
          default() {
            return null;
          }
        },
        ressources: {
          type: Array,
          default() {
            return [];
          }
        },
        itemNames: {
          type: Array,
          default() {
            return [];
          }
        }
      };
    },
    async asyncData(ctx) {
      var item = await ctx.$services.item.findFullById(ctx.route.params.id)
      const res = [];
      for (const r of item.baseCost) {
        res.push({
          id: r.itemID,
          name: r.itemName
        });
      }
      //console.log(item)
      try {
        return {
          item: item,
          ressources: res,
          itemNames: await ctx.$services.item.findAllNames()
        };
      } catch (error) {

      }
    },
    mounted() {
      //console.log("_id.vue mounted")
    },
    updated() {
      //console.log("_id.vue updated");
    }
  }
</script>
