<template>
  <el-col
    :md="{span: 12}"
    :lg="{span: 12}"
    :sm="{span: 24}"
    :xm="{span: 24}"
    style="margin-top: 10px"
  >
    <vue-apex-charts
      ref="chart2nd"
      class="char-body"
      width="100%"
      height="300"
      :options="chartOptions"
      :series="series"
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
      sizeOptions: [],
      currentSize: '',
      total_area: 0,
      series: [
        {
          name: '',
          data: []
        }
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          },
          toolbar: {
            show: false
          },
          dropShadow: {
            enabled: true,
            enabledOnSeries: undefined,
            top: 15,
            left: 3,
            blur: 3,
            color: '#000',
            opacity: 0.35
          }
        },
        dataLabels: {
          enabled: false,
          formatter: function(value) {
            return toThousandFilter(value)
          }
        },
        // stroke: {
        //   curve: 'straight'
        // },
        title: {
          text: 'ОПЕРАЦИЯ ЖАРАЁНИ ГРАФИГИ',
          align: 'center',
          style: {
            color: 'white',
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
            fontSize: '14px',
            color: 'white'
          }
        },
        // colors: ["#db2e03", "#6bdb03"],
        grid: {
          borderColor: '#40475D',
          show: true,
          xaxis: {
            lines: {
              show: false
            }
          },
          yaxis: {
            lines: {
              show: true
            }
          }
        },
        stroke: {
          curve: 'smooth'
        },
        colors: ['#FCCF31', '#17ead9', '#f02fc2'],
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'horizontal',
            shadeIntensity: 0.5,
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100],
            gradientToColors: ['#F55555', '#6078ea', '#6094ea']
          }
        },
        tooltip: {
          theme: 'dark'
        },
        legend: {
          labels: {
            useSeriesColors: true
          }
        },
        yaxis: {
          labels: {
            style: {
              colors: 'white'
            },
            formatter: function(value) {
              return toThousandFilter(value)
            }
          }
        },
        xaxis: {
          categories: [],
          labels: {
            style: {
              colors: 'white'
            }
          }
        }
      }
    }
  },
  mounted() {
    this.getOrdersHistory()
  },
  methods: {
    async getOrdersHistory() {
      this.gettingData = true

      try {
        const res = await request({
          url: '/dashboard/get-orders-cost',
          method: 'GET',
          params: {
            filterdate: this.filterdate
          }
        })
        this.gettingData = false
        this.series[0].data = []
        this.chartOptions.xaxis.categories = []
        res.data.forEach(ch => {
          this.series[0].data.push(parseFloat(ch.last_sum.toFixed(2)))
          this.chartOptions.xaxis.categories.push(ch.day)

          this.chartOptions.subtitle.text = 'Жами: ' + toThousandFilter(parseFloat((this.series[0].data.reduce((a, b) => a + b, 0)).toFixed(2)))
        })
        this.$refs.chart2nd.refresh()
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
