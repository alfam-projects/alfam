<template>
  <el-col :span="24" class="drivers-page-body">
    <el-table
      v-loading="tblLoading"
      style="width: 100%"
      height="calc(100% - 3.5rem)"
      :data="tableData"
      stripe
      highlight-current-row
      @row-click="driverChosed"
    >
      <!-- <el-table-column width="100" align="center" prop="id" label="ID">
        <template slot-scope="scope">
          {{ scope.row._id.substr(0, 6) }}
        </template>
      </el-table-column> -->
      <el-table-column align="center" prop="name" label="Тўлиқ исми">
        <template slot-scope="scope">
          {{ `${scope.row.firstName} ${scope.row.lastName}` }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="address" label="Аддресс" />
      <el-table-column width="260" align="center" prop="phone" label="Тел. рақам" />
      <el-table-column width="180" align="center" prop="car_type" label="Машина тури" />
      <el-table-column width="160" align="center" prop="car_num" label="Машина рақами" />
      <el-table-column width="150" align="center" prop="date" label="Рег. рақам">
        <template slot-scope="scope">
          {{ new Date(scope.row.date).toLocaleString().split(",")[0] }}
        </template>
      </el-table-column>
    </el-table>
    <!-- <div class="pgntion">
      <Pagination :total="102" :page="1" :limit="20" />
    </div> -->
  </el-col>
</template>

<script>
// import Pagination from '@/components/Pagination'
import { mapMutations, mapState } from 'vuex'

export default {
  components: {
    // Pagination
  },
  data: () => ({}),
  computed: {
    ...mapState('drivers', ['tableData', 'tblLoading'])
  },
  beforeDestroy() {
    this.SET_DRIVER(null)
  },
  methods: {
    ...mapMutations('drivers', ['SET_DRIVER']),
    driverChosed(row, column, event) {
      this.SET_DRIVER(row)
    }
  }
}
</script>

<style>
</style>
