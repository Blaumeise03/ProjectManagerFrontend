<template>
  <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
    <div class="container-fluid">
      <!--Button to expand the nav bar on mobile devices-->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav-login" id="nav-toggle">
        <span class="navbar-toggler-icon"></span>
      </button>
      <!--Logo-->
      <NuxtLink class="navbar-brand me-0" to="/" id="nav-brand">
        <img src="/V2_Logo2x.png" alt="V2 Logo" style="width:40px;" class="rounded-pill">
      </NuxtLink>

      <!--Current path, e.g. Home»My»Sub»Page-->
      <div class="my-2" id="nav-link">
        <!--Home link-->
        <span class="navbar-text pathLink ms-2" id="home">
          <NuxtLink class="" :class="{ active: isHomePage, inactive: !isHomePage }" to="/">Home</NuxtLink><span v-if="!isHomePage" class="seperator">»</span>
        </span><!--This comment is required at exactly this position to remove the space between "Home" and the next link, make sure that the autolayout of you IDE doesn't move it into it's own line!
    --><span class="navbar-text pathLink" v-for="location in loadLocation" :id="location.text">
          <!--The other links of the current path, see loadLoadlocation()-->
          <NuxtLink class="" :class="{ active: location.last, inactive: !location.last }" :to="location.link">{{ location.text }}</NuxtLink><span v-if="!location.last" class="seperator">»</span>
        </span>
        <span class="ps-8 me-auto"></span>
      </div>
      <!--Current logged-in user + Login/out button-->
      <div class="flex collapse navbar-collapse" id="nav-login">
        <!--User info-->
        <div v-if="!isLoggedOff" class="navbar-text me-2">{{ userInfo }}</div>
        <div v-else class="navbar-text me-2">Bitte Anmelden</div>
        <!--Login/logout button-->
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
  export default {
    components: {

    },
    data() {
      return {
        
      }
    },
    computed: {
      /**
       * Loads the current location for the dynamic Navbar link.
       *
       * Takes the current path from $router.path and splits it at the slashes. Every entry will be converted into an object:
       * {
       *    text: String, //The name to display of the link, first letter is uppercase
       *    link: String, //The link to this page
       *    last: Boolean //If it is the last entry, which means it's the current page, it's true, if not false.
       * }.
       * @return an array containing the path objects.
       */
      loadLocation() {
        //The result array
        var res = [];
        //Saves the current path/link
        var current = ''
        //Iterates over the current path
        this.$router.currentRoute.path.substring(1).split("/").forEach(el => {
          if (res.length == 0 || el.length > 0) {
            //Adds the element to the current path/link
            current += '/' + el;
            //Adds a new object to the result array
            res.push({
              //Formatted text
              text: el.charAt(0).toUpperCase() + el.slice(1),
              //Current link
              link: current,
              last: false
            });
          }
        });
        //Sets the last attribute of the last element to true
        res[res.length - 1].last = true;
        return res;
      },
      /**
       * Checks if the current page is the homepage.
       *
       * @returns true if the current page is the homepage
       */
      isHomePage() {
        return this.$router.currentRoute.name == 'index';
      },
      /**
       * Returns the userinfo of the current user that is logged in.
       *
       * The user data is saved inside the $store. The result format is as follows:
       * "Username: [CorpTag] IngameName"
       *
       * @returns the user data as a String
       */
      userInfo() {
        const user = this.$store.state.user.user;
        return user.name + ": [" + user.cTag + "] " + user.mainCharName;
      },
      /**
       * Returns the current user save inside the store.
       */
      user() {
        return this.$store.state.user.user;
      },
      /**
       * Checks if there is currently a user logged in.
       *
       * @returns true or false.
       */
      isLoggedOff() {
        return this.user.uid == null;
      }
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
