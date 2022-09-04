<template>
  <div>
    <div class="container-md box my-4 p-2">
      <h1>Neuen Vertrag erstellen</h1>

      <form @submit.prevent="create(); return false;" class="was-validated">
        <div class="form-group">
          <!--label for="ingame-list">Ingame Liste:</label-->
          <textarea v-model="ingameList" class="form-control" rows="10" id="ingame-list" placeholder="Ingame Liste hier einfügen oder leer lassen für einen leeren Vertrag." />
        </div>
        <div class="input-group mt-3">
          <span class="input-group-text">Spieler</span>
          <datalist id="playerNames">
            <option v-for="name in playerNames">{{ name }}</option>
          </datalist>
          <input v-model="playerName" type="text" class="form-control" list="playerNames" name="playername" placeholder="Spielername" required>
        </div>
        <div class="input-group mt-3">
          <button type="button" class="btn" :class="canUseClipboard ? 'btn-primary' : 'btn-secondary'" @click="paste"><i class="bi bi-clipboard-plus"></i> Einfügen</button>
          <button type="submit" class="btn btn-success">Erstellen</button>
        </div>
      </form>
    </div>

    <contract v-if="contract" :contract="contract" :player="player" :playernames="playerNames" />
    
    <div class="container-md box mb-4 p-2">
      <div class="d-flex">
        <h2>Verträge</h2>
        <ul class="ms-auto pagination">
          <li class="page-item" :class="page == 0 ? 'disabled' : ''"><NuxtLink class="page-link" :to="'?page=' + (pages[0])"><i class="bi bi-arrow-left"></i></NuxtLink></li>
          <li class="page-item" :class="pages[1] == page ? 'active' : ''"><NuxtLink class="page-link" :to="'?page=' + pages[1]">{{ pages[1] + 1 }}</NuxtLink></li>
          <li class="page-item" :class="pages[2] == page ? 'active' : ''"><NuxtLink class="page-link" :to="'?page=' + pages[2]">{{ pages[2] + 1 }}</NuxtLink></li>
          <li class="page-item" :class="pages[3] == page ? 'active' : ''"><NuxtLink class="page-link" :to="'?page=' + pages[3]">{{ pages[3] + 1 }}</NuxtLink></li>
          <li class="page-item"><NuxtLink class="page-link" :to="'?page=' + (pages[4])"><i class="bi bi-arrow-right"></i></NuxtLink></li>
        </ul>
      </div>
      
      <contract-list :contracts="contracts" />
      
    </div>
  </div>
</template>

<script>
  import Contract from "~/components/project/contract/Contract.vue"
  import ContractList from "~/components/project/contract/ContractList.vue"

  export default {
    components: {
      Contract,
      ContractList
    },
    data() {
      return {
        ingameList: "",
        playerName: "",
        canUseClipboard: true,
        contract: null,
        player: null,
        page: this.$route.query.page == null ? 0 : parseInt(this.$route.query.page),
        pages: [0, 0, 1, 2, 1],
      }
    },
    async asyncData(ctx) {
      
      return {
        playerNames: await ctx.app.$services.player.findNamesByCorpTag(ctx.app.store.state.user.user.cTag),
        contracts: await ctx.app.$services.contract.findAll(0)
      }
    },
    methods: {
      async create() {
        let contract = await this.$services.contract.create({ player: this.playerName, content: this.ingameList, created: null });
        if (contract) {
          this.player = await this.$services.player.findById(contract.playerID);
          this.contract = contract;
          this.ingameList = "";
          this.playerName = "";
          this.$nuxt.$eventHub.$emit("toast-show", {
            color: "success", header: "Erstellt!", msg: "Der Vertrag wurde erstellt."
          });
        }
      },
      async paste() {
        //Checking clipboard permissions
        navigator.permissions.query({ name: "clipboard-read" }).then((result) => {
          if (result.state != "denied") {
            //Permission is not denied
            navigator.clipboard.readText().then((res) => {
              //Access to clipboard granted
              this.ingameList = res;
              this.$nuxt.$eventHub.$emit("toast-show", {
                color: "success", header: "Eingefügt!", msg: "Die Zwischenablage wurde eingefügt."
              });
            }).catch((error) => {
              //Permissins is not denied, but access got rejected
              this.canUseClipboard = false;
              console.warn("Clipboard permission rejected:");
              console.error(error);
              this.$nuxt.$eventHub.$emit("toast-show", {
                color: "warning", header: "Warnung!", msg: "Zugriff auf die Zwischenablage nicht möglich!"
              });
            });
          } else {
            //Permission is denied
            this.canUseClipboard = false;
            console.warn("Clipboard permission rejected!");
            this.$nuxt.$eventHub.$emit("toast-show", {
              color: "warning", header: "Warnung!", msg: "Zugriff auf die Zwischenablage wurde abgelehnt!"
            });
          }
        }).catch((error) => {
          //Browser doesn't support the 'clipboard-read' permission
          this.canUseClipboard = false;
          this.$nuxt.$eventHub.$emit("toast-show", {
            color: "danger", header: "Fehler!", msg: "Dein Browser unterstützt dieses Feature nicht!"
          });
          console.warn("Can't access clipboard:");
          console.error(error);
        });
      },
      calculatePagination(currentPage) {
        let page = 0;
        if (currentPage)
          page = parseInt(currentPage);
        this.page = page;
        if (page < 2) {
          this.pages = [Math.max(page - 1, 0), 0, 1, 2, page + 1];
        } else {
          this.pages = [page - 1, page - 1, page, page + 1, page + 1];
        }
      },
      async loadPage(page) {
        this.contracts = await this.$services.contract.findAll(page);
      }
    },
    mounted() {
      
    },
    watch: {
      $route(to, from) {
        this.calculatePagination(to.query.page);
        this.loadPage(this.page);
      }
    }
  }
</script>

<style>
</style>
