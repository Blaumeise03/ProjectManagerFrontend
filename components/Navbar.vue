<template>
  <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="collapsibleNavbar">
        <!--ul class="navbar-nav">
          <li class="nav-item">
            <NuxtLink class="nav-link" :to="'/wallet/' + user.mid">Wallet</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink class="nav-link" to="/wallet">Corp</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink class="nav-link" to="/wallet/transaction">Neu</NuxtLink>
          </li>
        </ul-->

        <span class="navbar-text pathLink" id="home">
          <NuxtLink class="" :class="{ active: isHomePage, inactive: !isHomePage }" to="/">Home</NuxtLink><span v-if="!isHomePage" class="seperator">»</span>
        </span>
        <span class="navbar-text pathLink" v-for="location in loadLocation" :id="location.text">
          <NuxtLink class="" :class="{ active: location.last, inactive: !location.last }" :to="location.link">{{ location.text }}</NuxtLink><span v-if="!location.last" class="seperator">»</span>
        </span>
        <span class="ps-8 me-auto"></span>

        <div class="d-flex">
          <div class="navbar-text me-2">{{ userInfo }}</div>
          <NuxtLink to="/logout" class="">
            <button class="btn btn-primary" type="button">Logout</button>
          </NuxtLink>
        </div>
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
        user: {
          type: Object,
          default() {
            return null;
          }
        }
      }
    },
    computed: {
      loadLocation() {
        console.log()
        var res = [];
        var current = ''
        this.$router.currentRoute.path.substring(1).split("/").forEach(el => {
          //var n = el;
          if (res.length == 0 || el.length > 0) {
            current += '/' + el;
            res.push({
              text: el.charAt(0).toUpperCase() + el.slice(1),
              link: current,
              last: false
            });
          }
          //current += '/';
        });
        res[res.length - 1].last = true;
        return res;
      },
      isHomePage() {
        return this.$router.currentRoute.name == 'index';
      },
      userInfo() {
        const user = this.$store.state.user.user
        //console.log(user.name + ": " + user.mainCharName)
        //console.log(user)
        return user.name + ": [" + user.cTag + "] " + user.mainCharName;
      }
    },
    mounted() {
      this.user = this.$store.state.user.user;
    }
  }
</script>

<style lang="scss">
  .active {
    color: #ffffff !important;
  }

  .inactive {
    color: #aeaeae !important;
  }

  .pathLink {
    a {
      text-decoration: none;
    }

    span {
      color: #808080;
    }
  }

  .seperator {
    color: #808080
  }

  @media only screen and (min-width: 576px) {
    .navbar .navbar-nav .nav-item .nav-link {
      padding: 0 0.5em;
    }

    .navbar-nav {
      border-right: 2px solid rgba(255, 255, 255, 0.55);
      margin-right: 8px;
    }
  }
</style>
