<template>
  <el-row :gutter="10" class="stepOne">
    <el-col :offset="2" :span="20" style="display: flex; column-gap: 1em">
      <el-select
        v-model="belongsTo"
        style="width: 49.5%"
        placeholder="Партнер номи"
        :loading="gettingOthers"
        @change="belongsChanging"
      >
        <el-option
          v-for="(item, index) in others"
          :key="index"
          :value="item._id"
          :label="item.firstName + ' ' + item.lastName + ' | ' + item.shop"
          style="display: flex; justify-content: space-between"
        >
          <span>{{ item.firstName + " " + item.lastName }}</span>
          <span>{{ item.shop }}</span>
        </el-option>
        <el-option :value="'addNewItem'" style="padding: 0">
          <el-button style="border: 1px solid transparent; width: 100%; margin: 0" icon="el-icon-plus" />
        </el-option>
      </el-select>

      <el-input v-model="name" placeholder="Махсулот номи" @change="nameChanging" />
    </el-col>
    <el-col style="margin-top: 20px" :offset="2" :span="20">
      <div class="newType">
        <el-input
          v-model="typeObject.name"
          style="width: 70%"
          placeholder="Янги тури"
          @keyup.native.enter="addNewType()"
        />
        <el-button @click="addNewType()">Қўшиш</el-button>
      </div>
    </el-col>
    <el-col style="margin-top: 20px" :offset="2" :span="20">
      <div class="types">
        <el-table
          empty-text="Махсулот тури ҳали киритилмади"
          :show-header="false"
          :data="types"
          height="100%"
          width="100%"
          border
        >
          <el-table-column type="index" align="center" />
          <el-table-column prop="type_name" label="Name" align="center">
            <template slot-scope="scope">
              <el-input
                v-if="editing.status && scope.row.id === editing.id"
                v-model="editedType"
                @keyup.native.enter="saveEdit(scope.row.type_name)"
              />
              <p v-else>{{ scope.row.type_name }}</p>
            </template>
          </el-table-column>
          <el-table-column width="50">
            <template slot-scope="scope">
              <el-button
                v-if="editing.status && scope.row.id === editing.id"
                type="text"
                icon="el-icon-check"
                @click="saveEdit(scope.row.type_name)"
              />
              <el-button v-else type="text" icon="el-icon-edit" @click="editThis(scope.row)" />
            </template>
          </el-table-column>
          <el-table-column width="50" align="center">
            <template slot-scope="scope">
              <el-button
                :style="{ color: editing.status ? 'gray' : 'red' }"
                type="text"
                icon="el-icon-delete"
                :disabled="editing.status"
                @click="deleteThis(scope.row.type_name)"
              />
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { mapMutations } from 'vuex'
import request from '@/utils/request'
import { Message } from 'element-ui'
export default {
  data() {
    return {
      gettingOthers: false,
      belongsTo: '',
      newOther: {
        firstName: '',
        lastName: '',
        shopName: '',
        phone: ''
      },
      others: [],

      name: '',
      types: [],
      editing: {
        status: false,
        id: null
      },
      typeObject: {
        name: ''
      },
      editedType: ''

    }
  },
  mounted() {
    this.workWithLocalStorage()
    this.gettingOthers = true
    this.getOthers()
  },
  methods: {
    ...mapMutations('others/newProduct', [
      'SET_NAME',
      'SET_TYPES',
      'SET_OTHER'
    ]),
    getOthers() {
      request({
        url: '/others/list',
        method: 'GET'
      })
        .then((res) => {
          this.gettingOthers = false
          this.others = res.data
        })
        .catch((err) => {
          this.gettingOthers = false
          Message({
            duration: 2000,
            message: err.response.data,
            type: 'error'
          })
          console.error(err)
        })
    },
    cancel() {
      // cancel add new other
      this.openNewItemAddDialog = false
    },
    save() {
      // save new other
      this.saving = true
      request({
        url: '/others/add-other',
        data: this.newOther,
        method: 'POST'
      })
        .then((res) => {
          this.saving = false
          this.openNewItemAddDialog = false
          this.getOthers()
          this.belongsTo = res.data._id
          this.SET_OTHER(this.belongsTo)
        })
        .catch((err) => {
          this.saving = false
          Message({
            duration: 2000,
            message: err.response.data,
            type: 'error'
          })
        })
    },
    belongsChanging(v) {
      if (v === 'addNewItem') {
        this.openNewItemAddDialog = true
        this.belongsTo = ''
      } else {
        this.SET_OTHER(v)
      }
    },
    checkAndStoreToLocalHost(name) {
      const types = JSON.parse(localStorage.getItem('types'))
      if (types) {
        const indexOfType = types.findIndex((t) => t.type_name === name)
        if (indexOfType === -1) {
          types.push({
            id: types[types.length - 1].id + 1,
            type_name: name
          })
          localStorage.setItem('types', JSON.stringify(types))
        }
      }
    },
    workWithLocalStorage() {
      const lcs = localStorage.getItem('types')
      if (lcs === null) {
        localStorage.setItem(
          'types',
          JSON.stringify([
            { id: 0, type_name: 'ОЧИ' },
            { id: 1, type_name: 'ТЎҚИ' },
            { id: 2, type_name: 'ДЕКОР' },
            { id: 3, type_name: 'СИГАРА' },
            { id: 4, type_name: 'ПОЛ' },
            { id: 5, type_name: 'ФРИЗ' }
          ])
        )
        this.types = [
          { id: 0, type_name: 'ОЧИ' },
          { id: 1, type_name: 'ТЎҚИ' },
          { id: 2, type_name: 'ДЕКОР' },
          { id: 3, type_name: 'СИГАРА' },
          { id: 4, type_name: 'ПОЛ' },
          { id: 5, type_name: 'ФРИЗ' }
        ]
        this.$store.commit('newProduct/SET_TYPES', this.types)
      } else {
        this.types = JSON.parse(localStorage.getItem('types'))
        this.$store.commit('newProduct/SET_TYPES', this.types)
      }
    },
    reset() {
      this.name = ''
      this.workWithLocalStorage()
      this.editing = {
        status: false,
        id: null
      }
      this.typeObject = {
        name: ''
      }
      this.editedType = ''
    },
    nameChanging(e) {
      console.log(e)
      this.SET_NAME(e)
    },
    addNewType() {
      const nm = this.typeObject.name + ''
      const indexOfType = this.types.findIndex((t) => t.type_name === nm)
      if (indexOfType === -1) {
        if (this.types.length === 0) {
          this.types.push({ id: 0, type_name: nm })
        } else {
          this.checkAndStoreToLocalHost(nm)
          this.types.push({
            id: this.types[this.types.length - 1].id + 1,
            type_name: nm
          })
        }
        this.typeObject.name = ''
        this.SET_TYPES(this.types)
      }
    },
    editThis(row) {
      console.log('row: ', row)
      this.editing.status = true
      this.editing.id = row.id
      this.editedType = row.type_name
    },
    saveEdit(name) {
      this.editing.status = false
      const index = this.types.findIndex(
        (item) =>
          item.type_name.toLowerCase().trim() === name.toLowerCase().trim()
      )
      this.types[index].type_name = this.editedType + ''
      this.editedType = ''
      this.SET_TYPES(this.types)
    },
    deleteThis(name) {
      const index = this.types.findIndex(
        (item) =>
          item.type_name.toLowerCase().trim() === name.toLowerCase().trim()
      )
      this.types.splice(index, 1)
      this.SET_TYPES(this.types)
    }
  }
}
</script>

<style>
.stepOne {
  /* border: 1px solid red; */
  height: 100%;
  background-color: white;
  overflow-y: auto;
}

.newType {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
