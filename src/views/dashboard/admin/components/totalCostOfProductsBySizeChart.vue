<template>
  <el-col
    :md="{ span: 24 }"
    :lg="{ span: 24 }"
    :sm="{ span: 24 }"
    :xm="{ span: 24 }"
    class="char-body-1st"
    style="margin-top: 10px"
  >
    <vue-apex-charts
      ref="totalCostRef"
      class="char-body"
      width="100%"
      height="500"
      :options="chartOptionsBar"
      :series="seriesBar"
    />
    <div
      class="pagination"
      :style="{ left: '2%', width: '20rem', 'background-color': 'transparent' }"
    >
      <Pagination
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        layout="prev, pager, next, total"
        @pagination="getList"
      />
    </div>
    <div
      class="select-size-wrapper-1"
      :style="currentSize !== '' ? { right: '50%' } : { right: '45%' }"
    >
      <el-select
        v-model="currentSize"
        clearable
        align="center"
        style="width: 6.6em"
        class="select-size"
        @change="sizeChangedHandler"
      >
        <el-option label="Хаммаси" :value="''" />
        <el-option
          v-for="size in sizeOptions"
          :key="size._id"
          :label="size.size"
          :value="size.size"
        />
      </el-select>
      <i
        :style="gettingData ? { color: 'white' } : { color: 'transparent' }"
        class="el-icon-loading"
      />
    </div>
    <div v-if="currentSize !== ''" class="select-name-wrapper">
      <el-select
        v-model="currentName"
        clearable
        align="center"
        style="width: 9em"
        class="select-size"
        @change="nameChangedHandler"
      >
        <el-option label="Хаммаси" :value="''" />
        <el-option
          v-for="(name, index) in chartOptionsBar.xaxis.categories"
          :key="index"
          :label="name"
          :value="name"
        />
      </el-select>
      <i
        :style="
          gettingDataByName ? { color: 'white' } : { color: 'transparent' }
        "
        class="el-icon-loading"
      />
    </div>
  </el-col>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import request from '@/utils/request'
import Pagination from '@/components/Pagination'
import { toThousandFilter } from '@/filters/index'
import { mapState } from 'vuex'
export default {
  components: {
    VueApexCharts,
    Pagination
  },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 15
      },
      total: 0,
      gettingData: false,
      currentSize: '',
      currentName: '',
      total_area: 0,
      gettingDataByName: false,
      seriesBar: [
        {
          name: '',
          data: []
        }
      ],
      seriesBarAll: [
        {
          name: '',
          data: []
        }
      ],
      categoriesAll: [],
      chartOptionsBar: {
        chart: {
          type: 'bar',
          foreColor: 'white',
          toolbar: {
            show: false
          },
          events: {
            click: (chart, w, e) => {
              if (e.dataPointIndex >= 0) {
                if (this.currentSize === '' && e.dataPointIndex >= 0) {
                  this.currentSize =
                    e.config.xaxis.categories[e.dataPointIndex]
                  this.sizeChangedHandler(this.currentSize)
                } else if (this.currentSize !== '' && this.currentName === '') {
                  this.currentName =
                    e.config.xaxis.categories[e.dataPointIndex]
                  this.nameChangedHandler(this.currentName)
                }
              }
            }
          }
        },

        // colors: colors,
        grid: {
          borderColor: '#40475D',
          borderRadius: 4
        },
        plotOptions: {
          bar: {
            columnWidth: '25%',
            borderRadius: 4
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function(value) {
            return toThousandFilter(value)
          }
        },
        stroke: {
          width: 0
        },
        legend: {
          show: true
        },
        colors: ['#00a2ff'],
        fill: {
          type: 'gradient',
          gradient: {
            type: 'vertical',
            shade: 'dark',
            shadeIntensity: 0.5,
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 0.8,
            stops: [0, 100],
            gradientToColors: ['#00ffd5']
          }
        },
        title: {
          text: 'МИҚДОРЛИ ГИСТОГРАММА ИНДЕКСИ ($)',
          align: 'center',
          style: {
            fontSize: '12px',
            fontWeight: 'light'
          }
        },
        subtitle: {
          text: 'Жами: ',
          floating: true,
          align: 'right',
          offsetY: 0,
          style: {
            fontSize: '14px'
          }
        },
        tooltip: {
          theme: 'dark'
        },
        yaxis: {
          labels: {
            formatter: function(value) {
              return toThousandFilter(value)
            }
          }
        },
        xaxis: {
          rotate: -55,
          categories: [],
          labels: {
            style: {
              fontSize: '11px'
            }
          }
        }
      }
    }
  },
  computed: {
    ...mapState('dashboard', ['sizeOptions'])
  },
  mounted() {
    this.sizeChangedHandler('')
  },
  methods: {
    getList() {
      this.setWithPagination()
    },
    async nameChangedHandler(product_name) {
      this.listQuery.page = 1
      this.gettingDataByName = true
      try {
        const res = await request({
          url: '/dashboard/get-inventar-cost',
          method: 'GET',
          params: {
            product_name,
            size: this.currentSize
          }
        })
        this.gettingDataByName = false
        this.seriesBarAll[0].data = []
        this.categoriesAll = []
        const chart1st = res.data
        this.seriesBar[0].data = []
        this.chartOptionsBar.xaxis.categories = []
        chart1st.forEach((ch) => {
          if (product_name === '') {
            console.log('ch.price_by', ch.price_by)

            this.total = res.data.length
            this.seriesBarAll[0].data.push(
              parseFloat(ch.total_cost.toFixed(2))
            )
            this.categoriesAll.push(ch.product_name)
            // this.seriesBar[0].data.push(parseFloat((ch.total_cost).toFixed(2)))
            // this.chartOptionsBar.xaxis.categories.push(ch.product_name)
          } else {
            this.total = res.data.length
            console.log('ch.price_by', ch.price_by)
            this.seriesBarAll[0].data.push(
              parseFloat((ch.base_price * ch.total_area).toFixed(2))
            )
            this.categoriesAll.push(ch.size + ' ' + ch.type_name)

            // this.seriesBar[0].data.push(parseFloat((ch.base_price * ch.total_area).toFixed(2)))
            // this.chartOptionsBar.xaxis.categories.push(ch.size + ' ' + ch.type_name)
          }
          this.chartOptionsBar.subtitle.text =
            'Жами: ' +
            toThousandFilter(
              parseFloat(
                this.seriesBar[0].data.reduce((a, b) => a + b, 0).toFixed(2)
              )
            )
        })
        this.setWithPagination()
        console.log('need to be changed')
        // this.$refs.totalCostRef.refresh()
      } catch (err) {
        this.gettingData = false
        console.error(err)
      }
    },
    async sizeChangedHandler(size) {
      this.gettingData = true
      this.listQuery.page = 1

      try {
        const res = await request({
          url: '/dashboard/get-inventar-cost',
          method: 'GET',
          params: {
            size: size
          }
        })
        this.gettingData = false
        const chart1st = res.data
        this.seriesBarAll[0].data = []
        this.categoriesAll = []
        chart1st.forEach((ch) => {
          console.log('cccc', ch)
          if (size === '') {
            this.total = res.data.length
            this.seriesBarAll[0].data.push(
              parseFloat(ch.total_cost.toFixed(2))
            )
            this.categoriesAll.push(ch.size)

            // this.seriesBar[0].data.push(parseFloat(ch.total_cost.toFixed(2)))
            // this.chartOptionsBar.xaxis.categories.push(ch.size)
          } else {
            this.total = res.data.length
            this.seriesBarAll[0].data.push(
              parseFloat(ch.total_cost.toFixed(2))
            )
            this.categoriesAll.push(ch.product_name)

            // this.seriesBar[0].data.push(parseFloat(ch.total_cost.toFixed(2)))
            // this.chartOptionsBar.xaxis.categories.push(ch.product_name)
          }
          this.chartOptionsBar.subtitle.text =
            'Жами: ' +
            toThousandFilter(
              parseFloat(
                this.seriesBar[0].data.reduce((a, b) => a + b, 0).toFixed(2)
              )
            )
        })

        // this.seriesBar[0].data = this.seriesBar[0].data.map(value => toThousandFilter(value))
        this.setWithPagination()

        // this.$refs.totalCostRef.refresh()
      } catch (error) {
        this.gettingData = false
        console.error(error)
      }
    },
    setWithPagination() {
      this.$refs.totalCostRef.updateOptions(
        {
          subtitle: {
            text:
              'Жами: ' +
              toThousandFilter(
                this.seriesBarAll[0].data.reduce((a, b) => a + b, 0).toFixed(2)
              )
          },
          xaxis: {
            categories: this.categoriesAll.slice(
              (this.listQuery.page - 1) * 15,
              (this.listQuery.page - 1) * 15 + this.listQuery.limit
            )
          },
          series: [
            {
              name: '',
              data: this.seriesBarAll[0].data.slice(
                (this.listQuery.page - 1) * 15,
                (this.listQuery.page - 1) * 15 + this.listQuery.limit
              )
            }
          ]
        },
        false,
        true,
        false
      )
    }
  }
}
</script>

<style lang="scss">
.char-body-1st {
  position: relative;
}
.select-size-wrapper {
  position: absolute;
  top: 12px;
  left: 12px;
}

.el-select.select-size > .el-input > .el-input__inner {
  background-color: transparent !important;
  color: white !important;
  border: 1px solid transparent;
}
</style>
