import request from '@/utils/request'
// import { Message } from 'element-ui'
function getProductTypes() {
  return request({
    url: '/products/get_product_types',
    method: 'GET'
  })
}

function getTargets(id) {
  return request({
    url: '/products/get-targets',
    method: 'GET',
    params: {
      productId: id
    }
  })
}

function getProducts() {
  return request({
    url: '/products/all-products',
    method: 'GET'
  })
}

function getTodaysProductInfo(params) {
  return request({
    url: '/products/todays-products',
    params
  })
}

function getProductById(id) {
  return request({
    params: {
      product: id.product_id,
      partiya: id.partiya
    },
    url: '/products/get-product-by-typeid'
  })
}

function save_order(data) {
  return request({
    url: '/orders/save-order',
    method: 'POST',
    data,
    timeout: 25 * 1000
  })
}

function save_order_zavsklad(data) {
  return request({
    url: '/orders/save-order-zavsklad',
    method: 'POST',
    data,
    timeout: 25 * 1000
  })
}

function save_order_shop(data) {
  return request({
    url: '/orders/save-order-shop',
    method: 'POST',
    data,
    timeout: 25 * 1000
  })
}

function save_sample(data) {
  return request({
    url: '/orders/save-sample',
    method: 'POST',
    data
  })
}

function get_last_base_price(params) {
  return request({
    url: '/orders/get-last-base-price',
    method: 'GET',
    params
  })
}

const d = new Date()

const state = {
  products: [],
  edit_batch_of_product: [],
  editing_product_id: '',
  product_with_types: [],
  total_Area_for_invoice: 0,
  product_with_types_table_loading: false,
  products_types: [],
  todays_product_nums: 0,
  isThereBroken: false, // is there already broken enetered in this partiya
  there_is_product_type: false,
  wrong_format: false,
  wrong_format_product: '',
  order: {
    product: '',
    products: [],
    order_name: `ALFAM-${1}-${d.getDate()}/${
      d.getMonth() + 1
    }/${d.getFullYear()}`,
    includes_brokens: false,
    action: -1,
    time: '',
    customer: '',
    driver: '',
    upload_cost: '',
    isSample: false,
    last_sum: '',
    last_sum_kassa: '',
    is_debt: false,
    date_of_return_debt: '',
    description_of_debt: '',
    status: -1,
    shop: ''
  }
}

const mutations = {
  PUSH_EDIT_BATCH_OF_PRODUCTS: (state, data) => {
    state.edit_batch_of_product.push(data)
  },
  SET_TARGETS: (state, targets) => {
    for (let i = 0; i < state.edit_batch_of_product.length; i++) {
      console.log('targets.target', targets.target)
      state.edit_batch_of_product[i].target_date = targets.target
    }
  },
  SET_EDIT_PRODUCT: (state, pr) => {
    state.products_types = [pr._id.product]
    state.editing_product_id = pr._id.product._id
    state.edit_batch_of_product = pr.products
  },
  SET_EDIT_BATCH_OF_PRODUCTS: (state, data) => {
    const currnetProductIndex = state.edit_batch_of_product.findIndex(
      (pr) => pr.product_type === data.product_type && data.broken === pr.broken
    )
    if (currnetProductIndex > -1) {
      state.edit_batch_of_product[currnetProductIndex] = {
        ...state.edit_batch_of_product[currnetProductIndex],
        ...data
      }
    }
  },
  SET_PRODUCT_TYPES: (state, types) => {
    state.products_types = types
  },
  SET_PRODUCTS: (state, products) => {
    state.products = products
  },
  SET_TODAYS_PRODUCT_NUM: (state, num) => {
    state.todays_product_nums = num.partiya
    state.isThereBroken = num.isThereBroken
    state.there_is_product_type = num.there_is_product_type
  },
  SET_PRODUCT: (state, product) => {
    if (product === -1) {
      state.product_with_types = []
      state.total_Area_for_invoice = 0
    } else {
      state.product_with_types = product
    }
  },
  SET_LOADER: (state, loader) => {
    state[loader.key] = loader.value
  },
  SET_ORDER: (state, order) => {
    state.order[order.key] = order.value
    state.total_Area_for_invoice = state.product_with_types.reduce(
      (acc, elem) => {
        return acc + (elem.packTotalArea === '' ? 0 : elem.packTotalArea)
      },
      0
    )
  },
  PREPARE_ORDER: (state) => {
    state.order.products = []
    state.wrong_format_product = ''
    state.wrong_format = false
    const current_product = state.product_with_types
    for (let i = 0; i < current_product.length; i++) {
      if (current_product[i].item_num < 0) {
        state.wrong_format = true
        state.wrong_format_product = current_product[i].type_name
        i = 1000000
        return
      }
      if (state.order.includes_brokens) {
        const pro_obj = {
          id: current_product[i]._id,
          is_broken: current_product[i].broken,
          code:
            current_product[i].code + (current_product[i].broken ? '-1' : ''),
          type_name: current_product[i].type_name,
          size: current_product[i].size,
          photo_path: current_product[i].photo_path,
          isMain: current_product[i].isMain,
          isReturning: current_product[i].isReturning,
          packTotalArea: current_product[i].packTotalArea,
          item_num: current_product[i].item_num,
          pack_num: current_product[i].pack_num,
          over_pack_num: current_product[i].over_pack_num,
          price_by: current_product[i].price_by,
          base_price: current_product[i].base_price,
          base_price_changed: current_product[i].base_price_changed,
          sum_kassa: parseFloat(current_product[i].sum_kassa.toFixed(2)),
          sum: parseFloat(current_product[i].sum.toFixed(2)),
          area_of_one_packet: current_product[i].area_of_one_packet,
          area_of_an_item: current_product[i].area_of_an_item,
          number_of_items: current_product[i].number_of_items,
          wight_of_one_packet: current_product[i].wight_of_one_packet,
          weight_of_an_item: current_product[i].weight_of_an_item
        }
        state.order.products.push(pro_obj)
      } else if (!current_product[i].broken) {
        const pro_obj = {
          id: current_product[i]._id,
          is_broken: current_product[i].broken,
          code: current_product[i].code,
          isMain: current_product[i].isMain,
          type_name: current_product[i].type_name,
          size: current_product[i].size,
          photo_path: current_product[i].photo_path,
          isReturning: current_product[i].isReturning,
          packTotalArea: current_product[i].packTotalArea,
          item_num: current_product[i].item_num,
          pack_num: current_product[i].pack_num,
          over_pack_num: current_product[i].over_pack_num,
          price_by: current_product[i].price_by,
          base_price: current_product[i].base_price,
          base_price_changed: current_product[i].base_price_changed,
          sum_kassa: parseFloat(current_product[i].sum_kassa.toFixed(2)),
          sum: parseFloat(current_product[i].sum.toFixed(2)),
          area_of_one_packet: current_product[i].area_of_one_packet,
          area_of_an_item: current_product[i].area_of_an_item,
          number_of_items: current_product[i].number_of_items,
          wight_of_one_packet: current_product[i].wight_of_one_packet,
          weight_of_an_item: current_product[i].weight_of_an_item
        }
        state.order.products.push(pro_obj)
      }
    }
  },
  RESET_ORDER: (state) => {
    state.product_with_types = []
    state.order = {
      products: [],
      isSample: false,
      order_name: '',
      includes_brokens: false,
      action: -1,
      customer: '',
      driver: '',
      upload_cost: '',
      last_sum: '',
      is_debt: false,
      date_of_return_debt: '',
      description_of_debt: ''
    }
  },
  SET_ORDER_BASE_PRICE_M: (state, data) => {
    const { products } = data
    for (let i = 0; i < products.length; i++) {
      const indexOfProduct = state.product_with_types.findIndex(
        (pr) => pr.code === products[i].code
      )
      if (indexOfProduct !== -1) {
        state.product_with_types[indexOfProduct].base_price_changed =
          products[i].base_price_changed
      }
    }
  }
}

const actions = {
  SET_ORDER_BASE_PRICE({ commit, state }) {
    return new Promise((resolve, reject) => {
      get_last_base_price({
        product: state.order.product.product_id,
        customer: state.order.customer
      })
        .then((res) => {
          if (res.data) {
            commit('SET_ORDER_BASE_PRICE_M', res.data)
            resolve(true)
          } else {
            resolve(null)
          }
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  SAVE_ORDER({ commit, state }) {
    return new Promise((resolve, reject) => {
      // console.log('Is Sample:', state.order.isSample)
      if (!state.wrong_format) {
        if (state.order.isSample) {
          save_sample(state.order)
            .then((res) => {
              commit('RESET_ORDER')
              resolve()
            })
            .catch((err) => {
              reject(err)
            })
        } else {
          save_order(state.order)
            .then((res) => {
              commit('RESET_ORDER')
              resolve()
            })
            .catch((err) => {
              reject(err)
            })
        }
      } else {
        this.$notify({
          message: 'You inserted wrong value to: ' + state.wrong_format_product
        })
      }
    })
  },
  SAVE_ORDER_SHOP({ commit, state }) {
    return new Promise((resolve, reject) => {
      // console.log('Is Sample:', state.order.isSample)
      if (!state.wrong_format) {
        save_order_shop(state.order)
          .then((res) => {
            commit('RESET_ORDER')
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      } else {
        this.$notify({
          message: 'You inserted wrong value to: ' + state.wrong_format_product
        })
      }
    })
  },
  SAVE_ORDER_ZAVSKLAD({ commit, state }) {
    return new Promise((resolve, reject) => {
      // console.log('Is Sample:', state.order.isSample)
      if (!state.wrong_format) {
        if (state.order.isSample) {
          save_sample(state.order)
            .then((res) => {
              commit('RESET_ORDER')
              resolve()
            })
            .catch((err) => {
              reject(err)
            })
        } else {
          save_order_zavsklad(state.order)
            .then((res) => {
              commit('RESET_ORDER')
              resolve()
            })
            .catch((err) => {
              reject(err)
            })
        }
      } else {
        this.$notify({
          message: 'You inserted wrong value to: ' + state.wrong_format_product
        })
      }
    })
  },
  GET_TARGETS({ commit }, id) {
    return new Promise((resolve, reject) => {
      getTargets(id)
        .then((res) => {
          commit('SET_TARGETS', res.data)
          resolve()
        })
        .catch((err) => reject(err))
    })
  },
  GET_PRODUCT_BY_TYPE_ID({ commit }, id) {
    return new Promise((resolve, reject) => {
      commit('SET_LOADER', {
        key: 'product_with_types_table_loading',
        value: true
      })
      getProductById(id)
        .then((res) => {
          commit('SET_LOADER', {
            key: 'product_with_types_table_loading',
            value: false
          })
          commit('SET_PRODUCT', res.data)
          resolve()
        })
        .catch((err) => {
          commit('SET_LOADER', {
            key: 'product_with_types_table_loading',
            value: false
          })
          reject(err)
        })
    })
  },
  GET_PRODUCT_TYPES({ commit }) {
    return new Promise((resolve, reject) => {
      getProductTypes()
        .then((res) => {
          commit('SET_PRODUCT_TYPES', res.data)
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  GET_PRODUCTS({ commit }) {
    return new Promise((resolve, reject) => {
      getProducts()
        .then((res) => {
          commit('SET_PRODUCTS', res.data)
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  GET_TODAYS_PRODUCTS({ commit }, params) {
    return new Promise((resolve, reject) => {
      getTodaysProductInfo(params)
        .then((res) => {
          // num_of_todays_product
          commit('SET_TODAYS_PRODUCT_NUM', res.data)
          resolve()
        })
        .catch((err) => {
          console.log(err)
          commit('SET_TODAYS_PRODUCT_NUM', -1)
          reject(err)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
