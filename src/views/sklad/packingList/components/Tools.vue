<template>
  <div class="tools-wrapper">
    <p>Буюртма №: {{ order.order_name }}</p>

    <el-form ref="toolBarFormRef" :model="toolBarForm" :rules="rules" style="width: 100%">
      <el-form-item prop="currentProduct" label="Махсулот">
        <el-select
          v-model="toolBarForm.currentProduct"
          style="width: 100%; background-color: transparent"
          placeholder="Махсулот"
          filterable
          @change="getProducts"
        >
          <el-option
            v-for="(pr, i) in batches"
            :key="i"
            style="background-color: transparent"
            :label="
              pr._product[0].title.split('-')[0] +
                ' - ' +
                pr._product[0].title.split('-')[2]
            "
            :value="pr._id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="isSample">
        <el-checkbox v-model="toolBarForm.isSample" style="width: 100%" @change="sampleStateChanged">Образец
        </el-checkbox>
      </el-form-item>
      <el-form-item prop="withBorken">
        <el-checkbox
          v-model="toolBarForm.withBorken"
          style="width: 100%"
          :disabled="toolBarForm.isSample"
          @change="brokenStateChanged"
        >Синганлари билан</el-checkbox>
      </el-form-item>
      <el-form-item v-if="!toolBarForm.isSample" prop="currentcustomer">
        <el-select
          v-model="toolBarForm.currentcustomer"
          class="tools-wrapper-item"
          style="width: 100%"
          filterable
          placeholder="Диллер танланг"
          @change="customerChanged"
        >
          <el-option value="Янги диллерни қўшинг" style="padding: 0">
            <el-button style="border: 1px solid transparent; width: 100%; margin: 0" icon="el-icon-plus">Янги диллер
            </el-button>
          </el-option>
          <el-option v-for="(pr, i) in shops_for_packinglist" :key="i" :label="pr.name" :value="pr._id" />
          <!-- <el-option :value="'addNewItemCustomer'" style="padding: 0">
            <el-button
              style="border: 1px solid transparent; width: 100%; margin: 0"
              icon="el-icon-plus"
            >Янги харидор</el-button>
          </el-option>-->
        </el-select>
      </el-form-item>

      <!-- if is sample then show shops list -->
      <el-form-item v-if="toolBarForm.isSample" prop="currentShop">
        <el-select
          v-model="toolBarForm.currentShop"
          class="tools-wrapper-item"
          style="width: 100%"
          placeholder="Дўкон"
          @change="shopChanged"
        >
          <el-option :value="'Янги диллерни қўшинг'" style="padding: 0">
            <el-button style="border: 1px solid transparent; width: 100%; margin: 0" icon="el-icon-plus">Янги диллер
            </el-button>
          </el-option>
          <el-option v-for="(pr, i) in all_shops" :key="i" :label="pr.name" :value="pr._id" />
        </el-select>
      </el-form-item>
      <!-- end of: if is sample then show shops list-->

      <el-form-item v-if="!toolBarForm.isSample && times.length" prop="time">
        <el-select
          v-model="toolBarForm.time"
          style="width: 100%"
          class="tools-wrapper-item"
          placeholder="Вақтни танланг"
          clearable
          @change="timeChanged"
        >
          <el-option v-for="time in times" :key="time" :label="new Date(time).toLocaleString('uz-UZ')" :value="time" />
        </el-select>
      </el-form-item>

      <el-form-item v-if="!toolBarForm.isSample" prop="currentStatus">
        <el-select
          v-model="toolBarForm.currentStatus"
          style="width: 100%"
          class="tools-wrapper-item"
          placeholder="Жараённи танланг"
          @change="procedureChanged"
        >
          <el-option v-if="!toolBarForm.time" label="Сотиб олиш" :value="1" />
          <el-option label="Сотув-2/Бартер (Алмаштириш)" :value="2" />
          <el-option label="Қайтариш" :value="3" />
        </el-select>
      </el-form-item>

      <el-form-item v-if="!toolBarForm.isSample" prop="currentDriver">
        <el-select
          v-model="toolBarForm.currentDriver"
          class="tools-wrapper-item"
          style="width: 100%"
          filterable
          placeholder="Ҳайдовчи"
          @change="currentDriverChanged"
        >
          <el-option value="Янги ҳайдовчи" style="padding: 0">
            <el-button style="border: 1px solid transparent; width: 100%; margin: 0" icon="el-icon-plus">Янги ҳайдовчи
            </el-button>
          </el-option>
          <el-option v-for="(pr, i) in drivers" :key="i" :label="pr.firstName + ' ' + pr.lastName" :value="pr._id" />
        </el-select>
      </el-form-item>

      <el-form-item v-if="!toolBarForm.isSample" prop="costOfUpload">
        <el-input
          v-model="toolBarForm.costOfUpload"
          type="number"
          class="tools-wrapper-item"
          placeholder="Пагрузка пули"
          @change="costOfUploadChanging"
        />
        <p>
          Пагрузка:
          {{
            toThousandFilter(
              Math.ceil(total_Area_for_invoice * toolBarForm.costOfUpload)
            )
          }}
        </p>
      </el-form-item>

      <el-form-item v-if="!toolBarForm.isSample" label="Қарзгами?" prop="isDebt">
        <el-switch v-model="toolBarForm.isDebt" active-color="#13ce66" inactive-color @change="setIsDebt" />
      </el-form-item>

      <el-form-item v-if="toolBarForm.isDebt" label="Қарзни қайтариш санаси" prop="debtDate">
        <el-date-picker
          v-model="toolBarForm.debtDate"
          type="date"
          format="yyyy-MM-dd"
          value-format="timestamp"
          style="margin-bottom: 1em"
          placeholder="Қарзни қайтариш санаси"
          @change="setReturnDebtDate"
        />
      </el-form-item>

      <el-form-item v-if="toolBarForm.isDebt" label="Қарзни изоҳи" prop="debtDescription">
        <el-input
          v-model="toolBarForm.debtDescription"
          style="margin-bottom: 1em"
          type="textarea"
          rows="4"
          @change="setDebtDescription"
        />
      </el-form-item>
    </el-form>
    <div class="order-action-btn">
      <el-button type="primary" :disabled="order_saving" :loading="order_saving" @click="validateOrder()">Сохранить
      </el-button>
      <el-button type="danger" @click="reset_all()">Отменить</el-button>
    </div>
    <!-- <AddCustomerDialog :dialog-visible="customerAddDailog" @closeDialog="closeForm()" /> -->
    <AddDillerDialog :dialog-visible="dillerAddDailog" @closeDialog="closeForm()" />
    <add :dialog-visible="addDialog" @closeDialog="addDialog = false; toolBarForm.currentDriver = ''" />
  </div>
</template>
<script>
import { mapMutations, mapActions, mapState } from 'vuex'
// import AddCustomerDialog from '@/views/information/customers/components/addCustomer.vue'
import AddDillerDialog from '@/views/information/other_shops/components/add.vue'
import request from '@/utils/request'
import add from '../../../information/drivers/components/add.vue'

import { Message } from 'element-ui'
import tools_mixin from './mixins/tools.mixin'
import { toThousandFilter } from '@/filters'
export default {
  components: {
    // AddCustomerDialog,
    AddDillerDialog,
    add
  },
  mixins: [tools_mixin],
  props: {
    totalPrice: {
      type: [Number, String],
      default: 0
    },
    isTableValid: {
      type: [Boolean],
      default: false
    }
  },
  data: () => ({
    order_saving: false,
    batches: [],
    customerAddDailog: false,
    dillerAddDailog: false,
    shops_for_packinglist: [],
    addDialog: false,
    times: []
  }),
  computed: {
    ...mapState('products', [
      'products_types',
      'product',
      'order',
      'total_Area_for_invoice'
    ]),
    ...mapState('shops', ['shops', 'shops_other']),
    all_shops() {
      return this.shops.concat(this.shops_other)
    },
    drivers() {
      return this.$store.state.drivers.tableData
    },
    customers() {
      return this.$store.state.customers.tableData
    }
  },
  mounted() {
    this.getOrderCount()
    this.GET_PRODUCT_TYPES()
    this.GET_CUSTOMERS()
    this.GET_DRIVERS()
    this.GET_SHOPS()
    this.GET_SHOPS_OTHER()

    request({
      url: '/products/get-batches',
      method: 'GET'
    })
      .then((res) => {
        this.batches = res.data
        console.log(this.batches)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
    async getTimes() {
      this.times = []
      try {
        console.log('asdasd', this.toolBarForm)
        const { data } = await request({
          url: '/orders/get-partner-order-times-with-product-bantch-1',
          params: {
            batch: this.toolBarForm.currentProduct[0],
            product_id: this.toolBarForm.currentProduct[1],
            customer: this.toolBarForm.currentcustomer
          }
        })
        console.log(
          'times: ',
          data
        )
        this.times = data.map(({ time }) => time)
        console.log('actual times', this.times)
      } catch (error) {
        console.error(error)
      }
    },
    closeForm() {
      this.customerAddDailog = false
      this.dillerAddDailog = false
      this.SET_ORDER({ key: 'customer', value: '' })
      this.toolBarForm.currentcustomer = ''
      this.GET_CUSTOMERS()
    },
    toThousandFilter(num) {
      return toThousandFilter(num)
    },
    ...mapActions('products', [
      'GET_PRODUCT_TYPES',
      'GET_PRODUCT_BY_TYPE_ID',
      'SAVE_ORDER_ZAVSKLAD'
    ]),
    ...mapActions('customers', ['GET_CUSTOMERS']),
    ...mapActions('shops', ['GET_SHOPS', 'GET_SHOPS_OTHER']),
    ...mapActions('drivers', ['GET_DRIVERS']),
    ...mapMutations('products', ['SET_ORDER', 'PREPARE_ORDER']),

    getOrderCount() {
      request({
        url: '/orders/get-order-count-for-today-commertia'
      })
        .then((res) => {
          console.log('orders', res.data)
          const d = new Date()
          this.SET_ORDER({
            key: 'order_name',
            value: `ALFAM-${res.data[0].count + 1}-${d.getDate()}/${d.getMonth() + 1
            }/${d.getFullYear()}`
          })
        })
        .catch((err) => {
          console.log('orders', err)
        })
    },

    checkTableIsValidToSave() {
      this.$emit('checkTable')
    },

    validateOrder() {
      this.checkTableIsValidToSave()
      setTimeout(() => {
        this.$refs.toolBarFormRef.validate((valid) => {
          if (valid) {
            if (this.isTableValid) {
              this.saveOrder()
            } else {
              this.$notify({
                message:
                  'Жадвални текширинг, бўш бўлмаслиги керак, уларни 0-га тенг қилинг',
                type: 'error',
                duration: 0
              })
            }
          } else {
            return false
          }
        })
      }, 120)
    },

    saveOrder() {
      // first need to be check whether everything is ok
      this.order_saving = true
      this.PREPARE_ORDER()
      setTimeout(() => {
        this.SAVE_ORDER_ZAVSKLAD()
          .then(() => {
            this.order_saving = false
            Message({
              message: 'Заказ мувоффақиятли сақланди',
              type: 'success',
              duration: 3000
            })
            this.reset_all()
            this.$emit('closeNotification')
            this.getOrderCount()
            this.$router.go()
          })
          .catch((err) => {
            console.error(err)
            this.order_saving = false
            Message({
              message: 'Заказ сақлашда ҳатолик',
              type: 'error',
              duration: 3000
            })
          })
      }, 200)
    },
    setIsDebt(val) {
      this.SET_ORDER({ key: 'is_debt', value: val })
    },
    getProducts(val) {
      this.others_list()
      const { _product } = this.batches.find((batch) =>
        batch._id[1].includes(val[1])
      )
      const title = _product[0].title.split('-')[0] + ' - ' + val[0]
      this.SET_ORDER({
        key: 'product',
        value: {
          title,
          product_id: val[1],
          partiya: val[0]
        }
      })
      this.GET_PRODUCT_BY_TYPE_ID({ product_id: val[1], partiya: val[0] })
    },

    changebase_price(val) {
      // this is to change each item base price accordingly
      this.$emit('totalPriceChanged', val)
      this.toolBarForm.totalPrice = val
      this.SET_ORDER({ key: 'last_sum', val })
    },
    brokenStateChanged(val) {
      this.$emit('brokenState', val)
      this.SET_ORDER({ key: 'includes_brokens', value: val })
    },
    sampleStateChanged(val) {
      this.toolBarForm.withBorken = true
      this.brokenStateChanged(true)
      this.SET_ORDER({ key: 'isSample', value: val })
    },
    procedureChanged(val) {
      this.SET_ORDER({ key: 'action', value: val })
    },
    timeChanged(val) {
      this.SET_ORDER({ key: 'time', value: val })
    },
    setReturnDebtDate(val) {
      this.SET_ORDER({ key: 'date_of_return_debt', value: val })
    },
    setDebtDescription(val) {
      this.SET_ORDER({ key: 'description_of_debt', value: val })
    },
    costOfUploadChanging(val) {
      this.SET_ORDER({ key: 'upload_cost', value: parseFloat(val) })
    },
    currentDriverChanged(val) {
      if (val === 'Янги ҳайдовчи') {
        this.addDialog = true
      } else {
        this.SET_ORDER({ key: 'driver', value: val })
      }
    },
    customerChanged(val) {
      if (val === 'Янги диллерни қўшинг') {
        this.dillerAddDailog = true
      } else {
        this.SET_ORDER({ key: 'customer', value: val })
        this.getLastActionOfCustomer()
        this.getTimes()
      }
    },
    shopChanged(val) {
      if (val === 'Янги диллерни қўшинг') {
        this.dillerAddDailog = true
      } else {
        this.SET_ORDER({ key: 'shop', value: val })
      }
    },
    reset_all() {
      this.toolBarForm.withBorken = false
      this.toolBarForm.currentProduct = ''
      this.toolBarForm.currentStatus = ''
      this.toolBarForm.currentcustomer = ''
      this.toolBarForm.costOfUpload = ''
      this.order_saving = false
      this.toolBarForm.currentDriver = ''
      this.toolBarForm.debtDescription = ''
      this.toolBarForm.debtDate = ''
      this.toolBarForm.isDebt = false
      this.changebase_price(0)
      this.$refs.toolBarFormRef.resetFields()
    },
    others_list() {
      console.log('aa', this.toolBarForm.currentProduct[1])
      request({
        url: '/info/get-shops-list-upakovichniy-other',
        params: {
          product_id: this.toolBarForm.currentProduct[1]
        },
        method: 'GET'
      })
        .then((res) => {
          this.shops_for_packinglist = res.data
        })
        .catch((err) => {
          console.error(err)
          this.shops_for_packinglist = []
        })
    }
  }
}
</script>

<style scope>
.tools-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1.5em !important;
  overflow-y: auto;
  height: 100%;
  background-color: white;
  border-radius: 10px;
}

.tools-wrapper::-webkit-scrollbar {
  width: 6px;
  border-radius: 10px;
}

/* Track */
.tools-wrapper::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

/* Handle */
.tools-wrapper::-webkit-scrollbar-thumb {
  background: rgba(172, 172, 172, 0.247);
  border-radius: 10px;
}

/* Handle on hover */
.tools-wrapper::-webkit-scrollbar-thumb:hover {
  background: rgb(146, 146, 146);
  border-radius: 10px;
}

.tools-wrapper-item {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.notificationTable {
  width: 230px;
  border-spacing: 5px;
}

.order-action-btn {}
</style>
