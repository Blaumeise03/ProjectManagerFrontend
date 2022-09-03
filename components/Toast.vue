<template>
  <div class="position-fixed bottom-0 center p-3" style="z-index: 1200">
    <div id="toast" class="toast border hide" :class="'border-' + color" data-bs-delay="5000">
      <div class="toast-header" id="toastHeader">
        {{ header }}
        <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
      </div>
      <div class="toast-body" id="toastBody">
        {{ message }}
      </div>
      <div class="progress toast-bar-parent" id="toastBarP">
        <div id="toastBar" class="progress-bar toast-bar" :class="'bg-' + color"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        color: "",
        message: "",
        header: ""
      }
    },
    methods: {
      show(color, header, message) {
        this.color = color;
        this.message = message;
        this.header = header;

        document.getElementById("toast").addEventListener('shown.bs.toast', function (event) {
          document.getElementById("toastBar").classList.add("shrink");
        });

        new Promise(resolve => setTimeout(resolve, 200)).then(() => {
          //Has to be inside a promise to wait until nuxt has refreshed the page
          let toast = bootstrap.Toast.getOrCreateInstance(document.getElementById("toast"));
          toast.show();
        });
      }
    },
    created() {
      this.$nuxt.$eventHub.$on("toast-show", ({ color, header, msg }) => {
        this.show(color, header, msg);
      })
    }
  }
</script>

<style lang="scss" scoped>
  .toast-bar-parent {
    height: 4px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  .toast-bar {
    transition: width 5s;
  }

  .shrink {
    animation-duration: 5s;
    animation-iteration-count: 1;
    animation-name: toastBar;
  }

  @keyframes toastBar {
    from {
      width: 100%
    }

    to {
      width: 0%
    }
  }
</style>
