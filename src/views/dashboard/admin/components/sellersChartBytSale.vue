<template>
  <el-col
    :md="{span: 12}"
    :lg="{span: 12}"
    :sm="{span: 24}"
    :xm="{span: 24}"
    class="char-body-1st"
    style="margin-top: 10px"
  >
    <vue-apex-charts
      ref="sellersChartRef"
      class="char-body"
      width="100%"
      height="300"
      :options="chartOptionsBar"
      :series="seriesBar"
    />
  </el-col>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import request from '@/utils/request'
import { toThousandFilter } from '@/filters/index'
export default {
  components: {
    VueApexCharts
  },
  props: {
    filterdate: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      gettingData: false,
      sellerOptions: [],
      currentSize: '',
      total_area: 0,
      seriesBar: [
        {
          name: '',
          data: []
        }
      ],
      chartOptionsBar: {
        chart: {
          type: 'bar',
          foreColor: 'white',
          toolbar: {
            show: false
          }
          // events: {
          //   click: (chart, w, e) => {
          //     if (this.currentSize === '' && e.dataPointIndex >= 0) {
          //       this.currentSize = e.config.xaxis.categories[e.dataPointIndex]
          //       this.sizeChangedHandler(this.currentSize)
          //     }
          //   }
          // }
        },
        grid: {
          borderColor: '#40475D',
          xaxis: {
            lines: {
              show: true
            }
          },
          yaxis: {
            lines: {
              show: false
            }
          }
        },
        plotOptions: {
          bar: {
            columnWidth: '10%',
            // distributed: true,
            barHeight: '35%',

            borderRadius: 4,
            horizontal: true
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
        colors: ['#FCCF31', '#17ead9', '#f02fc2'],
        fill: {
          type: 'gradient',
          gradient: {
            type: 'horizontal',
            shade: 'dark',
            shadeIntensity: 0.5,
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100],
            gradientToColors: ['#F55555', '#6078ea', '#6094ea']
          }
        },
        title: {
          text: 'РАҚОБАТНИ ТАҚҚОСЛОВЧИ ДИНАМИКА',
          align: 'center',
          style: {
            fontSize: '12px',
            fontWeight: 'light'
          }
        },
        // subtitle: {
        //   text: 'Жами: ',
        //   floating: true,
        //   align: 'right',
        //   offsetY: 0,
        //   style: {
        //     fontSize: '14px'
        //   }
        // },
        tooltip: {
          theme: 'dark'
        },
        yaxis: {
          lines: {
            show: true
          }
        },
        xaxis: {
          lines: {
            show: true
          },
          categories: [],
          labels: {
            style: {
              fontSize: '12px'
            },
            formatter: function(value) {
              return toThousandFilter(value)
            }
          }
        }
      }
    }
  },
  mounted() {
    this.sizeChangedHandler('')
  },
  methods: {
    async sizeChangedHandler() {
      this.gettingData = true

      try {
        const res = await request({
          url: '/dashboard/sellers-sales',
          method: 'GET',
          params: {
            filterdate: this.filterdate
          }
        })
        this.gettingData = false
        const chart1st = res.data
        this.seriesBar[0].data = []
        this.chartOptionsBar.xaxis.categories = []
        chart1st.forEach(ch => {
          this.seriesBar[0].data.push(parseFloat(ch.last_sum.toFixed(2)))
          this.chartOptionsBar.xaxis.categories.push(ch.shop)
          // this.chartOptionsBar.subtitle.text = 'Жами: ' + toThousandFilter(parseFloat((this.seriesBar[0].data.reduce((a, b) => a + b, 0)).toFixed(2)))
        })
        this.$refs.sellersChartRef.refresh()
      } catch (err) {
        this.gettingData = false
        console.error(err)
      }
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
