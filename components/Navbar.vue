<template>
  <nav class="navbar navbar-expand-sm bg-light navbar-light">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>
      <span class="navbar-text pe-2">Navbar text </span>
      
      <div class="collapse navbar-collapse" id="collapsibleNavbar">
        <span class="navbar-text pathLink" v-for="location in loadLocation" :id="location.text">
          <a class="" :href="location.link" :class="{active: location.last}">{{ location.text }}</a><span v-if="!location.last" class="">»</span>
        </span>
        <ul class="navbar-nav">
          <!--navbar-link v-for="location in loadLocation" :text="location.text" :link="location.link" :last="location.last" :key="location.link" /-->
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
  import NavbarLink from '~/components/NavbarLink.vue'

  export default {
    components: {
      NavbarLink
    },
    data() {
      return {

      }
    },
    computed: {
      loadLocation() {
        console.log()
        var res = [];
        var current = ''
        this.$router.currentRoute.path.substring(1).split("/").forEach(el => {
          current += '/' + el;
          res.push({
            text: el,
            link: current,
            last: false
          });
          //current += '/';
        });
        //console.log(res);
        res[res.length - 1].last = true;
        return res;
      }
    },
    methods: {

    },
    mounted() {

    }
  }
</script>

<style lang="scss">
  .pathLink {
    a {
      text-decoration: none;
    }
  }
</style>
