<template>
  <div ref="tblContainer" style="height: 100%">
    <el-table
      v-loading="getting_product"
      :max-height="bodyHeight + ''"
      style="width: 100%; border-radius: 10px; overflow: hidden; border: 1px solid #bbbbbb;"
      size="small"
      :data="tableDataComputed"
      show-summary
      border
      :summary-method="jamiSumma"
    >
      <el-table-column
        width="150"
        label="КАФЕЛНИ КОДИ"
        prop="code"
        fixed="left"
        align="center"
      />
      <el-table-column
        width="150"
        label="ТУРИ"
        prop="type_name"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.type_name + (scope.row.broken ? ' - broken': '') }}
        </template>
      </el-table-column>
      <el-table-column
        width="150"
        label="ТОВАРНИ РАЗМЕРИ"
        prop="size"
        align="center"
      />
      <el-table-column
        width="150"
        label="ТОВАРНИ РАСМИ"
        prop="photo"
        align="center"
      >
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
        v-if="order.action === 2"
        width="100"
        prop="isReturning"
        align="center"
      >
        <template slot="header" slot-scope="">
          <span style="font-weight: bold">+ / -</span>
        </template>
        <template slot-scope="scope">
          <el-tooltip style="margin-right: 1em" effect="dark" :content=" scope.row.isReturning ? 'To Remove' : 'To add'" placement="left">
            <el-switch v-model="scope.row.isReturning" active-color="#13ce66" inactive-color="" />
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column
        width="300"
        label="УМУМИЙ МИҚДОРНИ ЎЛЧОВ БИРЛИГИ"
        align="center"
      >
        <el-table-column
          width="150"
          label="УМУМИЙ (м2)"
          align="center"
          prop="packTotalArea"
        >
          <template slot-scope="scope">
            <el-input
              size="small"
              type="number"
              :value="scope.row.packTotalArea"
              @input="areaIsChanging($event, scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column
          width="150"
          label="УМУМИЙ (ДОНАСИ)"
          prop="item_num"
          align="center"
        >
          <template slot-scope="scope">
            <div class="two-fields">
              <el-input
                size="small"
                :value="scope.row.item_num"
                @input="item_numIsChanging($event, scope.row)"
              />
            </div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column
        width="155"
        align="center"
      >
        <template slot="header" slot-scope="">
          <span>ТОВАРНИ УМУМИЙ</span><br>
          <span>ПОЧКАСИНИНГ</span><br>
          <span>(МИҚДОРИ)</span><br>
        </template>
        <el-table-column
          width="178"
          align="center"
          prop="pack_num"
        >
          <template slot="header" slot-scope="">
            <span>ТОВАРНИ УМУМИЙ</span><br>
            <span>ДОНАСИНИ</span><br>
            <span>(МИҚДОРИ)</span><br>
          </template>
          <template slot-scope="scope">
            <div class="two-fields">
              <div class="two-fields">
                <el-input
                  size="small"
                  :value="scope.row.pack_num"
                  @input="pack_numIsChanging($event, scope.row)"
                />
              </div>

              <div class="two-fields">
                <el-input
                  size="small"
                  :value="scope.row.over_pack_num"
                  @input="over_pack_numIsChanging($event, scope.row)"
                />
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column
        width="100"
        prop="base_price"
        align="center"
      >
        <template slot="header" slot-scope="">
          <!-- <span>КАССА</span><br>
          <span>НАРХИ</span><br> -->
          <span>м2 / ДОНА</span>
        </template>
        <template slot-scope="scope">
          <el-tooltip style="margin-right: 1em" effect="dark" :content=" scope.row.base_priceBy ? 'Донаси бўйича' : 'м2 бўйича'" placement="left">
            <el-switch :value="scope.row.base_priceBy" active-color="#13ce66" inactive-color="" @change="calcPriceprice_byChanged($event, scope.row)" />
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column
        width="120"
        prop="base_price"
        align="center"
      >
        <template slot="header">
          <span>КАССА</span><br>
          <span>НАРХИ</span>
        </template>
        <template slot-scope="scope">
          <span>{{ scope.row.base_price }}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="130"
        prop="sum_kassa"
        align="center"
      >
        <template slot="header">
          <span>МАХСУЛОТНИНГ</span><br>
          <span>УМУМИЙ</span><br>
          <span>КАССА</span><br>
          <span>НАРХИ</span>
        </template>
        <template slot-scope="scope">
          {{ scope.row.sum_kassa.toFixed(2) }}
        </template>
      </el-table-column>

      <el-table-column
        width="130"
        prop="base_price_changed"
        align="center"
      >
        <template slot="header">
          <span>ЎЗГАРГАН</span><br>
          <span>КАССА</span><br>
          <span>НАРХИ</span>
        </template>

        <template slot-scope="scope">
          <el-input
            size="small"
            type="number"
            :value="scope.row.base_price_changed"
            @input="base_priceIsChanging($event, scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column
        width="130"
        prop="sum"
        align="center"
      >
        <template slot="header">
          <span>СКИДКА</span><br>
          <span>НАРХИ</span>
        </template>

        <template slot-scope="scope">
          {{ scope.row.sum.toFixed(2) }}
        </template>
      </el-table-column>
      <el-table-column
        width="150"
        label="ТОВАРНИ УМУМИЙ КИЛОГРАММИ"
        prop="weight"
        align="center"
      >
        <template slot="header">
          <span>ТОВАРНИ</span><br>
          <span>УМУМИЙ</span><br>
          <span>КИЛОГРАММИ</span>
        </template>
      </el-table-column>
      <el-table-column
        label="1-ТА ПОЧКАДИГИ КОЛИЧЕСТВАНИ ЎЛЧОВ БИРЛИГИ"
        align="center"
      >
        <el-table-column
          width="160"
          label="ПОЧКАСИДИГИ (м2)"
          align="center"
          prop="area_of_one_packet"
        />
        <el-table-column
          width="140"
          label="1-ДОНАСИНИ (м2)"
          prop="area_of_an_item"
          align="center"
        />
        <el-table-column
          align="center"
          prop="number_of_items"
          width="140"
          label="УМУМИЙ ДОНАСИ"
        />
        <el-table-column
          width="160"
          label="ПОЧКАСИДИГИ (КГ)"
          align="center"
          prop="wight_of_one_packet"
        />
        <el-table-column
          width="140"
          label="1-ДОНАСИНИ  (КГ)"
          align="center"
          prop="weight_of_an_item"
        />
      </el-table-column>
    </el-table>
    <el-dialog top="1%" title="" :visible.sync="showImageDilog" append-to-body width="40%">
      <el-image
        style="width: 100%; height: 90%"
        :src="imageUrl"
        fit="scale-down"
      />
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import data_ from './mixins/data_.js'
import methods_ from './mixins/methods_.js'
export default {
  components: {

  },
  mixins: [data_, methods_],
  data() {
    return {
      baseApi: process.env.VUE_APP_BASE_API,
      bodyHeight: 300
    }
  },
  computed: {
    ...mapState('others/products', ['getting_product']),
    ...mapState('others/products', ['order'])
  },
  mounted() {
    setTimeout(() => {
      this.bodyHeight = this.$refs.tblContainer.clientHeight
      console.log(this.$refs.tblContainer.clientHeight)
    }, 300)
    window.addEventListener('resize', e => {
      this.bodyHeight = this.$refs.tblContainer.clientHeight
    })
  },
  beforeDestroy() {
    this.SET_PRODUCT([])
  },
  methods: {
    ...mapMutations('others/products', ['SET_PRODUCT']),
    openImg(url) {
      this.showImageDilog = true
      this.imageUrl = url
    },
    jamiSumma(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = 'Жами'
          // return;
        }
        if (
          column.property === 'packTotalArea' ||
          column.property === 'item_num' ||
          column.property === 'sum' ||
          column.property === 'sum_kassa'
        ) {
          const values = data.map((item) => Number(item[column.property]))
          if (!values.every((value) => isNaN(value))) {
            const val = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0)
            sums[index] = parseFloat(val.toFixed(4))
          } else {
            sums[index] = ''
          }
        }
      })
      this.$nextTick(() => {
        // this.$refs.myTableDHJ.doLayout()
      })
      return sums
    }
  }
}
</script>

<style>
.header-section {
  height: 3em;
  display: flex;
  justify-content: center;
  margin: 0 !important;
}

.list-main {
  /* border: 1px solid green; */
  height: calc(100% - 50px);
  margin: 0 !important;
}
.el-tabs__header {
  margin: 0 !important;
}

.toolbar-list {
  display: flex;
  align-items: center;
  padding: 0 0.5em;
}

.two-fields {
  display: flex;
  flex-flow: column;
}
</style>
