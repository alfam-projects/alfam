<template>
  <div>
    <el-row :gutter="10" class="users-body">
      <Tools />
      <page-body />
    </el-row>
  </div>
</template>

<script>
import Tools from './components/tools.vue'
import pageBody from './components/pageBody.vue'
export default {
  name: 'Users',
  components: {
    Tools,
    pageBody
  }

}
</script>

<style>
    .users-body {
        background-color: rgb(243, 243, 243);
        height: calc(100vh - 89px);
        width: 100%;
        padding: 1rem;
    }

    .users-page-body {
        background-color: white;
        border-radius: 8px;
    }
    .users-page-body {
        margin-top: 1rem;
        height: calc(100vh - 6rem - 89px);
    }
    .pgntion {
        height: 3.5rem;
        display: flex;
        align-items: center;
    }
</style>
