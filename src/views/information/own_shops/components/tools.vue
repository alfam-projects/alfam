<template>
  <el-col :span="24" class="shops-page-tools">
    <div style="display: flex">
      <!-- <el-input v-model="search_input" style="border: 1px solid transparent" placeholder="Қидириш">
        <el-select
          slot="prepend"
          v-model="search_type"
          :style="search_type == 1 || search_type == 2 ? {'width': '5.5rem'} : {'width': '10rem'} "
          placeholder="Select"
          @change="searchTypeChanged"
        >
          <el-option label="ID" :value="1" />
          <el-option label="Name" :value="2" />
          <el-option label="Registred date" :value="3" />
          <el-option label="Shopping times" :value="4" />
          <el-option label="Shopping amount" :value="5" />
        </el-select>
      </el-input>
      <el-button :disabled="tblLoading" :loading="tblLoading" style=" border: 1px solid transparent; margin-left: .5rem " icon="el-icon-search" @click="search()" /> -->
    </div>
    <div style="display: flex">
      <!--      <el-button style="border: 1px solid transparent"><svg-icon style="color: green" icon-class="excel" /></el-button>
 -->
      <el-button style="border: 1px solid transparent" icon="el-icon-plus" @click="addDialog = true" />
      <!-- <el-button :disabled="!!!currentShop" style="border: 1px solid transparent" icon="el-icon-edit" @click="editDialog = true" /> -->
      <!-- <el-button :disabled="!!!currentShop" style="border: 1px solid transparent; color: red" icon="el-icon-delete" @click="delete_Dialog = true" /> -->
      <add :dialog-visible="addDialog" @closeDialog="addDialog = false" />
      <!-- <edit :dialog-visible="editDialog" @closeDialog="editDialog = false" /> -->
      <!-- <delete_ :dialog-visible="delete_Dialog" @closeDialog="delete_Dialog = false" /> -->
    </div>
  </el-col>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import add from './add.vue'
// import delete_ from './delete.vue'
// import edit from './edit.vue'
export default {
  components: {
    add
    // delete_,
    // edit
  },
  data: () => ({
    search_input: '',
    search_type: 1,
    addDialog: false,
    editDialog: false,
    delete_Dialog: false
  }),
  computed: {
    ...mapState('shops', ['currentShop', 'tblLoading'])
  },
  mounted() {
    this.search()
  },
  methods: {
    ...mapMutations('shops', ['SET_QUERY']),
    ...mapActions('shops', ['GET_SHOPS']),
    search() {
      this.GET_SHOPS()
    },
    searchTypeChanged(t) {
      this.SET_QUERY({
        key: 'search_input',
        value: t
      })
    }
  }
}
</script>

<style>
.shops-page-tools {
  background-color: white;
  border-radius: 8px;
}

.shops-page-tools {
  height: 3rem;
  /* border: 1px solid red; */
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.el-input-group__append,
.el-input-group__prepend {
  background-color: white;
}
</style>
