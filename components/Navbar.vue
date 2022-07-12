<template>
  <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
    <div class="container-fluid">

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav-login" id="nav-toggle">
        <span class="navbar-toggler-icon"></span>
      </button>

      <NuxtLink class="navbar-brand me-0" to="/" id="nav-brand">
        <img src="/V2_Logo2x.png" alt="V2 Logo" style="width:40px;" class="rounded-pill">
      </NuxtLink>

      <div class="my-2" id="nav-link">
        <span class="navbar-text pathLink ms-2" id="home">
          <NuxtLink class="" :class="{ active: isHomePage, inactive: !isHomePage }" to="/">Home</NuxtLink><span v-if="!isHomePage" class="seperator">»</span>
        </span><!--
     --><span class="navbar-text pathLink" v-for="location in loadLocation" :id="location.text">
          <NuxtLink class="" :class="{ active: location.last, inactive: !location.last }" :to="location.link">{{ location.text }}</NuxtLink><span v-if="!location.last" class="seperator">»</span>
        </span>
        <span class="ps-8 me-auto"></span>
      </div>
      <div class="flex collapse navbar-collapse" id="nav-login">
        <div v-if="!isLoggedOff" class="navbar-text me-2">{{ userInfo }}</div>
        <div v-else class="navbar-text me-2">Bitte Anmelden</div>
        <NuxtLink v-if="!isLoggedOff" to="/logout" class="">
          <button class="btn btn-primary" type="button">Logout</button>
        </NuxtLink>
        <NuxtLink v-else to="/login" class="">
          <button class="btn btn-primary" type="button">Login</button>
        </NuxtLink>
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
        const user = this.$store.state.user.user;
        //console.log(user.name + ": " + user.mainCharName)
        //console.log(user)
        return user.name + ": [" + user.cTag + "] " + user.mainCharName;
      },
      user() {
        //console.log("tt:" + this.$store.state.user.user.uid)
        return this.$store.state.user.user;
      },
      isLoggedOff() {
        //console.log("tt2:" + (this.user.uid == null))
        return this.user.uid == null;
      }
    },
    mounted() {
      //console.log("Navbar.vue mounted");
    },
    updated() {
      //console.log("Navbar.vue updated");
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

  .flex {
    display: flex;
  }

  #nav-toggle {
    order: 0;
  }

  #nav-brand {
    order: 1;
  }

  #nav-link {
    margin-right: auto;
    order: 2;
  }

  #nav-login {
    order: 3;
    flex-grow: 0;
  }

  @media (max-width: 576px) {
    #nav-toggle {
      order: 0;
    }

    #nav-brand {
      order: 2;
    }

    #nav-link {
      order: 1;
      flex-basis: content;
    }

    #nav-login {
      order: 3;
      margin-left: auto;
      padding-top: 1rem;
      flex-basis: content;
    }
  }

  @media only screen and (min-width: 576px) {
    .navbar .navbar-nav .nav-item .nav-link {
      padding: 0 0.5em;
    }

    .navbar-nav {
      border-right: 2px solid rgba(255, 255, 255, 0.55);
      margin-right: 8px;
    }
  }</style>
