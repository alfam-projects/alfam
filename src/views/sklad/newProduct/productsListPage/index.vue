<template>
  <el-row>
    <el-col :span="24" style="text-align: center">
      <h3 style="color: gray"> Мавжуд махсулот турлари</h3>
    </el-col>
    <!-- eslint-disable  -->
    <!-- <el-col class="product-tools_" :span="24">
          Tools
      </el-col> -->
    <el-col :span="24">
      <el-table
        v-loading="gettingTableData"
        :data="tableData"
        border
        stripe
        height="calc(100vh - 10rem)"
      >
        <el-table-column width="50" type="expand" fixed="left">
          <template slot-scope="scope_">
            <el-table
              :data="scope_.row.product_types"
              :show-header="true"
              height="100%"
              :row-class-name="rowClassName"
              style="width: 100%; border: 1px solid #cecece"
              stripe
            >
              <el-table-column
                label="Тури"
                prop="type_name"
                :min-width="150"
                align="center"
              />
              <el-table-column
                label="Коди"
                prop="code"
                :min-width="150"
                align="center"
              />
              <el-table-column
                label="Размер"
                prop="size"
                :min-width="150"
                align="center"
              />
              <el-table-column
                width="170"
                label="Товарни расми"
                prop="photo"
                align="center"
              >
                <template slot-scope="scope">
                    <div style="display: flex; justify-content: space-around">
                        <el-image
                            style="width: 30px; height: 30px"
                            :src="scope.row.photo_path"
                            fit="scale-down"
                            @click="openImg(scope.row.photo_path)"
                        />
                        <editTheImage 
                            @updateTable="getData()"
                            :product_id="scope_.row._id" 
                            :type_id="scope.row._id" 
                            :index="scope.$index"
                            :old_image="scope.row.photo_path"
                            :imageUrl="scope.row.photo_path"
                        />
                    </div>
                </template>
              </el-table-column>
              <!-- <el-table-column
                label="Асосийлиги"
                prop="isMain"
                :min-width="150"
                align="center"
              >
                <template slot-scope="scope">
                  {{ scope.row.isMain ? 1 : 0 }}
                </template>
              </el-table-column> -->
            </el-table>
          </template>
        </el-table-column>
        <el-table-column label="Махсулот номи" prop="product_name" />
        <el-table-column width="80">
          <template slot-scope="scope_">
            <el-button icon="el-icon-edit" style="border: 1px solid transparent" @click="editProduct(scope_.row)" />
          </template>
        </el-table-column>
      </el-table>
      <el-dialog top="1%" title="" :visible.sync="showImageDilog" append-to-body width="40%">
        <el-image
          style="width: 100%; height: 90%"
          :src="imageUrl"
          fit="scale-down"
        />
      </el-dialog>
    </el-col>
  </el-row>
</template>

<script>
import request from '@/utils/request'
import editTheImage from './editTheImage'
import { mapMutations } from 'vuex'
export default {
  components: {
    editTheImage
  },
  data() {
    return {
      tableData: [],
      baseApi: process.env.VUE_APP_BASE_API,
      showImageDilog: false,
      imageUrl: '',
      gettingTableData: false
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    ...mapMutations('newProduct', ['SET_EDIT_STATUS', 'SET_DATA_TO_EDIT']),

    getData() {
      this.gettingTableData = true
      request({
        url: '/products/get_product_types',
        method: 'GET'

      }).then(res => {
        this.gettingTableData = false
        this.tableData = res.data
      }).catch(err => {
        this.tableData = []
        this.gettingTableData = false
        console.error(err)
      })
    },
    openImg(url) {
      this.showImageDilog = true
      this.imageUrl = url
    },
    clone(obj) {
      if (obj == null || typeof (obj) !== 'object') { return obj }
      var temp = new obj.constructor()
      for (var key in obj) { temp[key] = this.clone(obj[key]) }
      return temp
    },
    editProduct(product) {
      this.SET_EDIT_STATUS(true)
      this.SET_DATA_TO_EDIT(this.clone(product))
    },
    rowClassName({ row }) {
      if (row.isMain) {
        return 'is-main-type'
      }
    }
  }
}
</script>

<style>
    .product-tools_ {
        height: 2rem;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 0 1em;
    }
    .el-table .is-main-type {
      background: rgb(231, 255, 206);
    }
</style>
