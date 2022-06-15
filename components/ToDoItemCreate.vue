<template>
  <div class="create-container d-flex p-2">
    <input v-model="titleOfNewToDo" type="text" class="flex-fill">
    <button @click="create" class="">
      Add
    </button>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        titleOfNewToDo: ''
      }
    },
    methods: {
      create() {
        this.$services.todo.create(this.titleOfNewToDo).then((data) => {
          this.$emit('create', data)
          this.titleOfNewToDo = ''
        })
      }
    }
  }
</script>
