<template>
  <div>
    <div class="container-fluid pt-5 bg-dark text-white">
      <h1 class="title">
        Test
      </h1>
    </div>
    <div class="container bg-primary">
      <p>Lorem Ipsum</p>
    </div>
    <div class="container bg-primary d-flex ">
      <div class="p-2 flex-fill">
        <input type="text" class="input1">
      </div>
      <div class="p-2">
        <button @click="create" class="button1">
          Add
        </button>
      </div>
    </div>
  </div>
</template>

<style>
  .input1 {
    width: 100%;
  }

  .button1 {
    width: auto;
  }

  .flexbox {
  }
</style>
