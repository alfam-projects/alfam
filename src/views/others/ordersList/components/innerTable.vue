<template>
  <el-col :span="24" class="orders-page-body">
    <el-table
      v-loading="tableLoading"
      style="width: 100%"
      height="calc(100% - 3.5rem)"
      :data="orders"
      :row-class-name="tableRowClassName"
      highlight-current-row
      @row-click="orderChosed"
    >
      <el-table-column width="50" type="expand" fixed="left">
        <!-- eslint-disable-next-line -->
        <template slot-scope="scope">
          <div class="inner-table">
            <el-table
              :data="scope.row.products"
              :show-header="true"
              style="width: 80%"
              stripe
            >
              <el-table-column
                label="КАФЕЛНИ КОДИ"
                prop="code"
                fixed="left"
                align="center"
              />
              <el-table-column
                label="СПЕЦИФИКАЦИЯСИ"
                prop="type_name"
                align="center"
              />
              <el-table-column
                label="ТОВАРНИ РАЗМЕРИ"
                prop="size"
                align="center"
              />
              <el-table-column
                label="ТОВАРНИ РАСМИ"
                prop="photo"
                align="center"
              >
                <!-- eslint-disable-next-line  -->
              <template slot-scope="scope">

                  <el-image
                    style="width: 30px; height: 30px"
                    :src="scope.row.photo_path"
                    fit="scale-down"
                    @click="openImg(scope.row.photo_path)"
                  />
                </template>
              </el-table-column>
              <el-table-column
                label="1-ТА ПОЧКАДИГИ КОЛИЧЕСТВАНИ ЎЛЧОВ БИРЛИГИ"
                align="center"
              >
                <el-table-column
                  label="ПОЧКАСИДИГИ (м2)"
                  align="center"
                  prop="area_of_one_packet"
                />
                <el-table-column
                  label="1-ДОНАСИНИ (м2)"
                  prop="area_of_an_item"
                  align="center"
                />
                <el-table-column
                  align="center"
                  prop="number_of_items"
                  label="УМУМИЙ ДОНАСИ"
                />
                <el-table-column
                  label="ПОЧКАСИДИГИ (КГ)"
                  align="center"
                  prop="wight_of_one_packet"
                />
                <el-table-column
                  label="1-ДОНАСИНИ  (КГ)"
                  align="center"
                  prop="weight_of_an_item"
                />
              </el-table-column>
            </el-table>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="180" align="center" prop="_id" label="ID">
        <template slot-scope="scope">
          {{ scope.row._id.substr(0, 6) }}
        </template>
      </el-table-column>
      <el-table-column
        width="180"
        align="center"
        prop="order_name"
        label="Order No"
      />
      <el-table-column width="180" align="center">
        <template slot="header">
          <span>Area m<sup>2</sup></span>
        </template>
        <template slot-scope="scope">
          {{ parseFloat(getTotalAre(scope.row.products).packTotalArea.toFixed(4)) }}
        </template>
      </el-table-column>
      <el-table-column width="180" align="center" label="Number of items">
        <template slot-scope="scope">

          <el-popover
            placement="right"
            trigger="hover"
          >
            <el-table :show-header="false" :data="gridData(scope.row.products)">
              <el-table-column align="center" width="120" property="name" label="name" />
              <el-table-column align="center" width="100" property="value" label="value">
                <!-- eslint-disable-next-line -->
                <template slot-scope="scope">
                  <span v-if="scope.row.isReturning || scope.row.action === 3" style="color: red"> - {{ scope.row.value }}</span>
                  <span v-else style="color: green"> + {{ scope.row.value }}</span>
                </template>
              </el-table-column>
            </el-table>
            <el-button slot="reference" type="text">{{ getTotalNumber(scope.row.products).item_num }}</el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column width="180" align="center" label="Pack / Overpack num">
        <template slot-scope="scope">
          {{ getPackNumber(scope.row.products).pack_num }} / {{ getOverPackNumber(scope.row.products).over_pack_num }}
        </template>
      </el-table-column>

      <el-table-column width="180" align="center" prop="last_sum" label="Price">
        <template slot-scope="scope">

          <el-popover
            placement="right"
            trigger="hover"
          >
            <el-table :show-header="false" :data="gridDataPrice(scope.row.products)">
              <el-table-column align="center" width="120" property="name" label="name" />
              <el-table-column align="center" width="100" property="value" label="value">
                <!-- eslint-disable-next-line -->
                <template slot-scope="scope">
                  <span v-if="scope.row.isReturning || scope.row.action === 3" style="color: red"> {{ parseFloat(scope.row.value.toFixed(4)) }}</span>
                  <span v-else style="color: green"> + {{ parseFloat(scope.row.value.toFixed(4)) }}</span>
                </template>
              </el-table-column>
            </el-table>
            <el-button slot="reference" type="text">
              <span style="">+ {{ getPriceMinusPlus(scope.row.products).plus }}</span> /
              <span style="color: red">{{ getPriceMinusPlus(scope.row.products).minus }}</span>
            </el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column width="180" align="center" prop="driver" label="Driver">
        <template slot-scope="scope">
          {{ `${scope.row.driver.firstName} ${scope.row.driver.lastName}` }}
        </template>
      </el-table-column>
      <el-table-column v-if="roles.includes('admin')" width="180" align="center" label="Stuff">
        <template slot-scope="scope">
          {{ scope.row.user.stuff.firstName + ' ' + scope.row.user.stuff.lastName }}
        </template>
      </el-table-column>

      <el-table-column prop="status" width="130" align="center" label="Checkout status" fixed="right">
        <template slot-scope="scope">
          <el-checkbox :value="scope.row.did_checkout" @change="setCheckoutStatus($event, scope.row)" />
        </template>
      </el-table-column>

      <el-table-column prop="action" width="100" align="center" :label="!!currentOrderHeader.order_name ? 'Action' : 'Last action'" fixed="right">
        <template slot-scope="scope">
          {{ actions[scope.row.action] }}
        </template>
      </el-table-column>
    </el-table>
    <div class="pgntion">
      <Pagination :total="102" :page="1" :limit="20" />
    </div>
    <el-dialog title="" :visible.sync="showImageDilog" append-to-body width="40%">
      <el-image
        style="width: 100%; height: 90%"
        :src="imageUrl"
        fit="scale-down"
      />
    </el-dialog>
  </el-col>
</template>

<script>
import Pagination from '@/components/Pagination'
import { mapMutations, mapState, mapActions } from 'vuex'
import { Message } from 'element-ui'
export default {
  name: 'InnerTable',
  components: {
    Pagination
  },
  data: () => ({
    baseApi: process.env.VUE_APP_BASE_API,
    showImageDilog: false,
    actuality: false,
    imageUrl: '',
    actions: ['', 'Buying', 'Barter', 'Returning'],
    statuses: ['el-icon-loading', 'el-icon-error', 'el-icon-success'],
    statuses_text: ['Waiting approvement', 'Order ejected', 'Order accepted'],
    statuses_color: ['gray', 'red', 'green']
  }),
  computed: {
    ...mapState('user', ['roles']),
    ...mapState('others/orders', ['orders', 'tableLoading', 'currentOrderHeader'])
  },
  beforeDestroy() {
    this.SET_ORDER(null)
  },
  methods: {
    ...mapMutations('others/orders', ['SET_ORDER', 'SET_CURRENT_ORDER_HEADER']),
    ...mapActions('others/orders', ['GET_ORDERS', 'GET_CURRENT_ORDER', 'DO_CHECKOUT']),
    async setCheckoutStatus(val, row) {
      try {
        const result = await this.DO_CHECKOUT({ did_checkout: !row.did_checkout, order_id: row._id })
        Message({
          message: 'Success: ' + result.data,
          type: 'success',
          duration: 2000
        })
      } catch (error) {
        Message({
          message: 'Error: ' + error.response.data,
          type: 'error',
          duration: 4000
        })
      }
    },

    tableRowClassName({ row, rowIndex }) {
      if (!row.did_checkout) {
        return 'warning-row'
      }
      return ''
    },
    openImg(url) {
      this.showImageDilog = true
      this.imageUrl = url
    },
    orderChosed(row) {
      if (row.status === -1) {
        this.SET_ORDER(row)
      } else {
        this.$notify({
          message: 'You cant edit this order: order already processed by zavsklad',
          type: 'warning',
          duration: 4000
        })
      }
    },
    getTotalAre(products) {
      return products.reduce((a, b) => ({ packTotalArea: a.packTotalArea + b.packTotalArea }))
    },
    getTotalNumber(products) {
      return products.reduce((a, b) => ({ item_num: a.item_num + b.item_num }))
    },
    getPackNumber(products) {
      return products.reduce((a, b) => ({ pack_num: a.pack_num + b.pack_num }))
    },
    getOverPackNumber(products) {
      return products.reduce((a, b) => ({ over_pack_num: a.over_pack_num + b.over_pack_num }))
    },
    gridData(products) {
      let dataItem = {
        name: '',
        value: '',
        isReturning: false
      }
      const data = []
      products.forEach(product => {
        dataItem.name = product.type_name + (product.is_broken ? ' - broken' : '')
        dataItem.value = product.item_num
        dataItem.isReturning = product.isReturning
        data.push(dataItem)
        dataItem = {
          name: '',
          value: '',
          isReturning: false
        }
      })
      return data
    },
    getPriceMinusPlus(products) {
      let minus = 0
      let plus = 0
      products.forEach(product => {
        if (product.isReturning) {
          minus += product.sum
        } else {
          plus += product.sum
        }
      })
      minus = parseFloat(minus.toFixed(4))
      plus = parseFloat(plus.toFixed(4))
      return { minus: minus, plus: plus }
    },
    gridDataPrice(products) {
      let dataItem = {
        name: '',
        value: '',
        isReturning: false
      }
      const data = []
      products.forEach(product => {
        dataItem.name = product.type_name + (product.is_broken ? ' - broken' : '')
        dataItem.value = product.sum
        dataItem.isReturning = product.isReturning
        data.push(dataItem)
        dataItem = {
          name: '',
          value: '',
          isReturning: false
        }
      })
      return data
    }
  }
}
</script>

<style>

  .inner-table {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .el-table .warning-row {
    background: rgb(253, 233, 230);
  }
</style>
