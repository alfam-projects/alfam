<template>
  <el-col :span="24" class="inventars-page-body">
    <el-table
      v-loading="tblLoading"
      style="width: 100%"
      height="calc(100% - 3.5rem)"
      :data="archiveData"
      stripe
      highlight-current-row
      @row-dblclick="archiveProductChosen"
    >
      <!-- eslint-disable  -->
      <el-table-column width="50" type="expand" fixed="left">
        <!-- eslint-disable-next-line -->
        <template slot-scope="scope">
          <div class="inner-table">
            <el-table
              :data="scope.row.products"
              :show-header="true"
              style="width: 100%"
              stripe
            >
              <el-table-column
                label="Кафелни коди"
                prop="code"
                :min-width="150"
                fixed="left"
                align="center"
              >
                <template slot-scope="scope">
                  {{
                    productTypeMap[scope.row.product_type]
                      ? productTypeMap[scope.row.product_type].code
                      : scope.$index
                  }}
                  {{ scope.row.broken ? "синган" : "" }}
                </template>
              </el-table-column>
              <el-table-column
                label="Спецификацияси"
                prop="type_name"
                :min-width="180"
                align="center"
              >
                <template slot-scope="scope">
                  {{
                    productTypeMap[scope.row.product_type]
                      ? productTypeMap[scope.row.product_type].type_name
                      : ""
                  }}
                </template>
              </el-table-column>
              <el-table-column
                label="Товарни размери"
                prop="size"
                :min-width="180"
                align="center"
              >
                <template slot-scope="scope">
                  {{
                    productTypeMap[scope.row.product_type]
                      ? productTypeMap[scope.row.product_type].size
                      : ""
                  }}
                </template>
              </el-table-column>
              <el-table-column
                label="Товарни расми"
                prop="photo"
                :min-width="160"
                align="center"
              >
                <!-- eslint-disable-next-line  -->
                <template slot-scope="scope">
                  <el-image
                    style="width: 30px; height: 30px"
                    :src="
                      productTypeMap[scope.row.product_type]
                        ? productTypeMap[scope.row.product_type].photo_path
                        : ''
                    "
                    fit="scale-down"
                    @click="
                      openImg(
                        productTypeMap[scope.row.product_type]
                          ? productTypeMap[scope.row.product_type].photo_path
                          : ''
                      )
                    "
                  />
                  <!-- <editImage /> -->
                </template>
              </el-table-column>
              <el-table-column
                label="Касса нархи ($)"
                prop="total_archive_area"
                :min-width="160"
                align="center"
              >
                <template slot-scope="scope">
                  {{ toThousandFilter(scope.row.base_price) }}
                  <span v-if="!scope.row.price_by">(м<sup>2</sup>)</span>
                  <span v-else>(дона)</span>
                </template>
              </el-table-column>
              <el-table-column
                label="Умумий суммаси ($)"
                :min-width="160"
                align="center"
              >
                <template slot-scope="scope">
                  {{
                    toThousandFilter(
                      (!scope.row.price_by
                        ? scope.row.total_area
                        : scope.row.total_number_of_items) *
                        scope.row.base_price
                    )
                  }}
                </template>
              </el-table-column>
              <el-table-column
                label="Умумий юзаси"
                prop="total_area"
                :min-width="160"
                align="center"
              >
                <template slot-scope="scope">
                  {{ toThousandFilter(scope.row.total_area) }}
                </template>
              </el-table-column>
              <el-table-column
                label="Умумий сони"
                :min-width="160"
                prop="total_number_of_items"
                align="center"
              >
                <template slot-scope="scope">
                  {{ toThousandFilter(scope.row.total_number_of_items) }}
                </template>
              </el-table-column>

              <el-table-column
                label="Умумий пакет / ортиқча сони"
                prop="total_number_of_packets"
                align="center"
                :min-width="160"
              >
                <template slot="header">
                  <span
                    >Умумий <br />пакет / ортиқча <br />
                    сони</span
                  >
                </template>
                <template slot-scope="scope">
                  {{ toThousandFilter(scope.row.total_number_of_packets) }} /
                  {{ scope.row.total_number_of_over_packet }}
                </template>
              </el-table-column>

              <el-table-column
                label="УМУМИЙ ОҒИРЛИГИ"
                :min-width="160"
                prop="total_archive_wight_of_packets"
                align="center"
              >
                <template slot="header">
                  <span
                    >Умумий <br />
                    оғирлиги</span
                  >
                </template>
                <template slot-scope="scope">
                  {{ toThousandFilter(scope.row.total_wight_of_packets) }}
                </template>
              </el-table-column>
              <el-table-column
                label="1-та почкадаги каличество ўлчов бирлиги"
                align="center"
              >
                <el-table-column
                  label="Почкасини (м2)"
                  align="center"
                  :min-width="160"
                  prop="area_of_one_packet"
                />
                <el-table-column
                  label="1-донасини (м2)"
                  :min-width="160"
                  prop="area_of_an_item"
                  align="center"
                />
                <el-table-column
                  align="center"
                  prop="number_of_items"
                  :min-width="160"
                  label="Умумий донаси"
                />
                <el-table-column
                  label="Почкасини (КГ)"
                  align="center"
                  :min-width="160"
                  prop="wight_of_one_packet"
                />
                <el-table-column
                  label="1-донасини  (КГ)"
                  align="center"
                  :min-width="160"
                  prop="weight_of_an_item"
                />
              </el-table-column>
            </el-table>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="_id"
        align="center"
        label="Махсулот"
        :min-width="180"
      >
        <template slot-scope="scope">
          {{ scope.row._id.product.product_name }} - {{ scope.row._id.batch }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="Умумий юзаси"
        prop="total_area"
        :min-width="180"
      >
        <template slot="header">
          <span>Умумий юзаси м <sup>2</sup></span>
        </template>
        <template slot-scope="scope">
          {{ toThousandFilter(scope.row.total_area) }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="Умумий махсулот сони"
        prop="total_number_of_items"
        :min-width="180"
      >
        <template slot-scope="scope">
          {{ toThousandFilter(scope.row.total_number_of_items) }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="Пакетлар / ортиқча сони"
        prop="total_number_of_packets"
        :min-width="190"
      >
        <template slot-scope="scope">
          {{ toThousandFilter(scope.row.total_number_of_packets) }} /
          {{ scope.row.total_number_of_over_packet }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="Умумий оғирлиги (кг)"
        prop="total_wight_of_packets"
        :min-width="180"
      >
        <template slot-scope="scope">
          {{ toThousandFilter(scope.row.total_wight_of_packets) }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="Умумий суммаси ($)"
        prop="total_price"
        :min-width="180"
      >
        <template slot-scope="scope">
          {{ toThousandFilter(scope.row.total_price) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="createdAt"
        align="center"
        label="Архивга киритилган вақти"
        :min-width="200"
      >
        <template slot-scope="scope">
          {{ giveDate(scope.row.createdAt_) }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" align="center" label="Ўчириш">
        <template slot-scope="scope">
          <el-button
            type="text"
            icon="el-icon-delete"
            style="color: red"
            @click="setCurrentProductForDelete(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pgntion">
      <Pagination
        :total="total_archive"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getList"
      />
    </div>
    <el-dialog
      title=""
      :visible.sync="showImageDilog"
      append-to-body
      width="40%"
    >
      <el-image
        style="width: 100%; height: 90%"
        :src="imageUrl"
        fit="scale-down"
      />
    </el-dialog>
    <el-dialog
      title="Махсулотни ўчириш"
      :visible.sync="deleteArchiveModal"
      width="40%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      align="center"
    >
      <p>
        Сиз ушбу номи: {{ current_product_name }} бўлган ва партияси
        {{ current_product_batch }} бўлган ўчирмоқчимисиз
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button :disabled="deletingTheArchive" @click="cancelDelete()"
          >Отменит</el-button
        >
        <el-button
          :disabled="deletingTheArchive"
          type="danger"
          :loading="deletingTheArchive"
          @click="deleteArchive()"
          >Ўчириш</el-button
        >
      </span>
    </el-dialog>
  </el-col>
</template>

<script>
import Pagination from '@/components/Pagination'
import { mapActions, mapMutations, mapState } from 'vuex'
import { toThousandFilter } from '@/filters/index'
import request from '@/utils/request'
export default {
  components: {
    Pagination
  },
  data: () => ({
    current_product_name: '',
    current_product_id: '',
    current_product_batch: '',
    deleteArchiveModal: false,
    deletingTheArchive: false,
    baseApi: process.env.VUE_APP_BASE_API,
    showImageDilog: false,
    imageUrl: '',
    productTypeMap: [],
    listQuery: {
      page: 1,
      limit: 50
    }
  }),
  computed: {
    ...mapState('inventars', [
      'archiveData',
      'tblLoading',
      'total_archive',
      'queryParamsArchive'
    ])
  },
  beforeDestroy() {
    // this.SET_SHOP(null)
  },
  mounted() {
    this.listQuery = {
      page: this.queryParamsArchive.currentPage,
      limit: this.queryParamsArchive.perPage
    }
    this.GET_ARCHIVE().then(() => {
      this.mapProductTypes()
    })
  },
  methods: {
    ...mapMutations('inventars', ['SET_ARCHIVE', 'SET_QUERY_PARAM_ARCHIVE']),
    ...mapActions('inventars', ['GET_ARCHIVE']),
    ...mapMutations('products', ['SET_EDIT_PRODUCT']),
    cancelDelete() {
      this.deleteArchiveModal = false
      this.current_product_id = ''
      this.current_product_batch = ''
      this.current_product_name = ''
    },
    giveDate(d) {
      d = new Date(d)

      return (
        d.toLocaleDateString() +
        ' ' +
        d.getHours() +
        ':' +
        d.getMinutes() +
        ':' +
        d.getSeconds()
      )
    },
    deleteArchive() {
      request({
        url: '/products/delete-archive',
        method: 'DELETE',
        data: {
          product: this.current_product_id,
          partiya: this.current_product_batch
        }
      })
        .then((res) => {
          this.deleteArchiveModal = false
          this.current_product_id = ''
          this.current_product_batch = ''
          this.current_product_name = ''
          this.$notify({
            message: res.data,
            duration: 2500,
            type: 'success'
          })
        })
        .catch((err) => {
          this.$notify({
            message: err.response.data,
            duration: 2500,
            type: 'error'
          })
        })
    },
    setCurrentProductForDelete({
      _id: {
        batch,
        product: { product_name, _id }
      }
    }) {
      this.current_product_name = product_name
      this.current_product_batch = batch
      this.current_product_id = _id
      console.log(this.current_product_batch, this.current_product_name)
      this.deleteArchiveModal = true
    },
    openImg(url) {
      this.showImageDilog = true
      this.imageUrl = url
    },
    archiveProductChosen(row, column, event) {
      this.$confirm(
        'Сиз ҳақиқатдан ҳам шу махсулотни количествасини тахрирламоқчимисиз?',
        ''
      ).then(() => {
        this.SET_ARCHIVE(row)
        this.SET_EDIT_PRODUCT(row)
        this.$router.push(
          '/sklad/edit-archive-product/' +
            row._id.product.product_name +
            '-' +
            row._id.batch
        )
      })
    },
    mapProductTypes() {
      console.log('Setting map')
      this.archiveData.forEach((data) => {
        const prTypes = data._id.product.product_types
        prTypes.forEach((pr) => {
          this.productTypeMap[pr._id] = pr
        })
      })
    },
    toThousandFilter(num) {
      return toThousandFilter(parseFloat(num.toFixed(3)))
    },
    getList() {
      this.SET_QUERY_PARAM_ARCHIVE({
        key: 'perPage',
        value: this.listQuery.limit
      })
      this.SET_QUERY_PARAM_ARCHIVE({
        key: 'currentPage',
        value: this.listQuery.page
      })
      this.GET_ARCHIVE().then(() => {
        this.mapProductTypes()
      })
    }
  }
}
</script>

<style>
</style>
