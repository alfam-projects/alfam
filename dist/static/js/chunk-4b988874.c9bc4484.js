(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4b988874"],{"0444":function(t,e,r){},"1cc9":function(t,e,r){"use strict";r("0444")},"2c44":function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-row",{staticStyle:{height:"calc(100vh - 50px)"}},[r("el-col",{staticStyle:{height:"calc(100vh - 50px)"},attrs:{span:12}},[r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.tableLoading,expression:"tableLoading"}],staticStyle:{width:"100%"},attrs:{data:t.zavskladOrders,height:"100%",border:"","highlight-current-row":!0,"row-class-name":t.className},on:{"row-click":t.choseOrder}},[r("el-table-column",{attrs:{fixed:"left",align:"center",label:"Диллер / Дўкон номи",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.customer?r("div",[t._v(" "+t._s(e.row.user.stuff.shop?e.row.user.stuff.shop.name:"")+" ")]):r("div",[t._v(" "+t._s(e.row.diller.name)+" ")])]}}])}),r("el-table-column",{attrs:{align:"center",width:"200",label:"Ҳаридор"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.customer?r("div",[t._v(" "+t._s(e.row.customer.firstName+" "+e.row.customer.lastName)+" ")]):r("div",[t._v(" "+t._s(e.row.diller.name)+" ")])]}}])}),r("el-table-column",{attrs:{width:"200",prop:"product",align:"center",label:"Махсулот"}}),r("el-table-column",{attrs:{prop:"status",width:"150",align:"center",fixed:"right",label:"Процесс"},scopedSlots:t._u([{key:"default",fn:function(e){return[-1===e.row.status?r("div",{staticClass:"action-btns"},[r("el-tooltip",{attrs:{effect:"dark",content:"Қабул қилиш",placement:"left-start"}},[r("el-button",{staticClass:"action-btn",attrs:{disabled:t.order_processing,icon:t.order_processing?"el-icon-loading":"el-icon-check"},on:{click:function(r){return t.accept(e.row._id)}}})],1),r("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"Рад қилиш",placement:"right-start"}},[r("el-button",{staticClass:"action-btn",staticStyle:{color:"red"},attrs:{disabled:t.order_processing,icon:"el-icon-close"},on:{click:function(r){return t.reject(e.row._id)}}})],1)],1):t._e(),0===e.row.status?r("div",[r("i",{staticClass:"el-icon-close",staticStyle:{color:"red"}})]):t._e(),1===e.row.status?r("div",[r("i",{staticClass:"el-icon-check",staticStyle:{color:"green"}})]):t._e()]}}])}),r("el-table-column",{attrs:{prop:"createdAt",align:"center",label:"Буюртма вақти","min-width":180},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(t.giveDate(e.row.createdAt))+" ")]}}])}),r("el-table-column",{attrs:{prop:"updatedAt",align:"center",label:"Текширилган вақти","min-width":180},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(t.giveDate(e.row.updatedAt))+" ")]}}])})],1)],1),r("el-col",{staticStyle:{height:"calc(100vh - 50px)"},attrs:{span:12}},[r("el-table",{staticStyle:{width:"100%"},attrs:{height:"100%",size:"small",data:t.currentOrderProducts,"row-class-name":t.tableRowClassName}},[r("el-table-column",{attrs:{width:"150",label:"КАФЕЛНИ КОДИ",prop:"code",fixed:"left",align:"center"}}),r("el-table-column",{attrs:{width:"150",label:"СПЕЦИФИКАЦИЯСИ",prop:"type_name",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.row.type_name+(e.row.broken?" - broken":""))+" ")]}}])}),r("el-table-column",{attrs:{width:"150",label:"ТОВАРНИ РАЗМЕРИ",prop:"size",align:"center"}}),r("el-table-column",{attrs:{width:"300",label:"УМУМИЙ МИҚДОРНИ ЎЛЧОВ БИРЛИГИ",align:"center"}},[r("el-table-column",{attrs:{width:"150",label:"УМУМИЙ (м2)",align:"center",prop:"packTotalArea"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.row.packTotalArea)+" ")]}}])}),r("el-table-column",{attrs:{width:"150",label:"УМУМИЙ (ДОНАСИ)",prop:"item_num",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("div",{staticClass:"two-fields"},[t._v(" "+t._s(e.row.item_num)+" ")])]}}])})],1),r("el-table-column",{attrs:{width:"155",align:"center"}},[r("template",{slot:"header"},[r("span",[t._v("ТОВАРНИ УМУМИЙ")]),r("br"),r("span",[t._v("ПОЧКАСИНИЙ")]),r("br"),r("span",[t._v("(МИҚДОРИ)")]),r("br")]),r("el-table-column",{attrs:{width:"178",align:"center",prop:"pack_num"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.row.pack_num)+" / "+t._s(e.row.over_pack_num)+" ")]}}])},[r("template",{slot:"header"},[r("span",[t._v("ТОВАРНИ УМУМИЙ")]),r("br"),r("span",[t._v("ДОНАСИНИ")]),r("br"),r("span",[t._v("(МИҚДОРИ)")]),r("br")])],2)],2),r("el-table-column",{attrs:{width:"150",label:"ТОВАРНИ УМУМИЙ КИЛОГРАММИ",prop:"weight",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.row.weight_of_an_item*e.row.item_num)+" ")]}}])}),r("el-table-column",{attrs:{width:"150",label:"ТОВАРНИ РАСМИ",prop:"photo",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-image",{staticStyle:{width:"30px",height:"30px"},attrs:{src:e.row.photo_path,fit:"scale-down"},on:{click:function(r){return t.openImg(e.row.photo_path)}}})]}}])})],1)],1),r("el-dialog",{attrs:{title:"",visible:t.showImageDilog,width:"40%"},on:{"update:visible":function(e){t.showImageDilog=e}}},[r("el-image",{staticStyle:{width:"100%"},attrs:{src:t.imageUrl,fit:"scale-down"}})],1)],1)},o=[],a=r("5530"),l=r("2f62"),s={name:"OrdersPage",data:function(){return{showImageDilog:!1,imageUrl:"",currentOrderProducts:[],order_processing:!1}},computed:Object(a["a"])({},Object(l["e"])("orders",["zavskladOrders","tableLoading"])),mounted:function(){this.GET_ZAVSKLAD_ORDERS()},methods:Object(a["a"])(Object(a["a"])({},Object(l["b"])("orders",["GET_ZAVSKLAD_ORDERS","SET_ORDER_STATUS"])),{},{choseOrder:function(t){this.currentOrderProducts=t.products,console.log(this.currentOrderProducts)},className:function(t){var e=t.row;return e.customer?"":"others-row"},openImg:function(t){this.showImageDilog=!0,this.imageUrl=t},giveDate:function(t){return t=new Date(t),t.toLocaleDateString()+" "+t.getHours()+":"+t.getMinutes()+":"+t.getSeconds()},accept:function(t){var e=this;this.$confirm("Ушбу заказни қабул қилишини тасдиқланг","Қабул қилиш").then((function(){e.order_processing=!0,e.SET_ORDER_STATUS({status:1,order_id:t}).then((function(){e.order_processing=!1,e.currentOrderProducts=[],e.GET_ZAVSKLAD_ORDERS()})).catch((function(t){console.error(t),e.order_processing=!1}))})).catch((function(){}))},reject:function(t){var e=this;this.$confirm("Ушбу заказни рад қилишини тасдиқланг","Рақ қилиш").then((function(){e.order_processing=!0,e.SET_ORDER_STATUS({status:0,order_id:t}).then((function(){e.order_processing=!1,e.currentOrderProducts=[],e.GET_ZAVSKLAD_ORDERS()})).catch((function(t){console.error(t),e.order_processing=!1}))})).catch((function(){}))},tableRowClassName:function(t){var e=t.row;t.rowIndex;return e.isReturning?"warning-row":""}})},c=s,i=(r("1cc9"),r("2877")),u=Object(i["a"])(c,n,o,!1,null,null,null);e["default"]=u.exports}}]);