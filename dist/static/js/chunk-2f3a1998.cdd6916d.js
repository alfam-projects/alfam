(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2f3a1998"],{"0c13":function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-row",{staticStyle:{height:"calc(100vh - 96px)"}},[r("el-col",{staticStyle:{height:"calc(100vh - 96px)"},attrs:{span:19}},[r("Table",{ref:"packingListTableRef_edit",attrs:{broken:t.broken},on:{calculateTotalPrice:t.calculateTotalPrice}})],1),r("el-col",{staticStyle:{height:"calc(100vh - 86px)"},attrs:{span:5}},[r("Tools",{ref:"calculatorRef",attrs:{"total-price":t.totalPrice},on:{totalPriceChanged:t.totalPriceChanged,brokenState:t.changedBrokenState}},[t._t("default")],2)],1)],1)},n=[],i=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{ref:"tblContainer1",staticStyle:{height:"calc(100vh - 86px)"}},[r("el-table",{staticStyle:{width:"100%"},attrs:{"max-height":t.bodyHeight+"",size:"small",data:t.tableDataComputed,"show-summary":"","summary-method":t.jamiSumma}},[r("el-table-column",{attrs:{width:"150",label:"КАФЕЛНИ КОДИ",prop:"code",fixed:"left",align:"center"}}),r("el-table-column",{attrs:{width:"150",label:"СПЕЦИФИКАЦИЯСИ",prop:"type_name",align:"center"}}),r("el-table-column",{attrs:{width:"150",label:"ТОВАРНИ РАЗМЕРИ",prop:"size",align:"center"}}),r("el-table-column",{attrs:{width:"150",label:"ТОВАРНИ РАСМИ",prop:"photo",align:"center"}},[r("el-image",{staticStyle:{width:"30px",height:"30px"},attrs:{src:"https://images.unsplash.com/photo-1612831661153-4914a5ff7851?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2125&q=80",fit:"scale-down"},on:{click:function(e){return t.openImg("https://images.unsplash.com/photo-1612831661153-4914a5ff7851?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2125&q=80")}}})],1),r("el-table-column",{attrs:{width:"300",label:"УМУМИЙ МИҚДОРНИ ЎЛЧОВ БИРЛИГИ",align:"center"}},[r("el-table-column",{attrs:{width:"150",label:"УМУМИЙ (м2)",align:"center",prop:"packTotalArea"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-input",{attrs:{size:"small",type:"number",value:e.row.packTotalArea},on:{input:function(r){return t.areaIsChanging(r,e.row)}}})]}}])}),r("el-table-column",{attrs:{width:"150",label:"УМУМИЙ (ДОНАСИ)",prop:"item_num",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("div",{staticClass:"two-fields"},[r("el-input",{attrs:{size:"small",value:e.row.item_num},on:{input:function(r){return t.item_numIsChanging(r,e.row)}}})],1)]}}])})],1),r("el-table-column",{attrs:{width:"155",align:"center"}},[r("template",{slot:"header"},[r("span",[t._v("ТОВАРНИ УМУМИЙ")]),r("br"),r("span",[t._v("ПОЧКАСИНИЙ")]),r("br"),r("span",[t._v("(МИҚДОРИ)")]),r("br")]),r("el-table-column",{attrs:{width:"178",align:"center",prop:"pack_num"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("div",{staticClass:"two-fields"},[r("div",{staticClass:"two-fields"},[r("el-input",{attrs:{size:"small",value:e.row.pack_num},on:{input:function(r){return t.pack_numIsChanging(r,e.row)}}})],1),r("div",{staticClass:"two-fields"},[r("el-input",{attrs:{size:"small",value:e.row.over_pack_num},on:{input:function(r){return t.over_pack_numIsChanging(r,e.row)}}})],1)])]}}])},[r("template",{slot:"header"},[r("span",[t._v("ТОВАРНИ УМУМИЙ")]),r("br"),r("span",[t._v("ДОНАСИНИ")]),r("br"),r("span",[t._v("(МИҚДОРИ)")]),r("br")])],2)],2),r("el-table-column",{attrs:{width:"100",prop:"base_price",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-tooltip",{staticStyle:{"margin-right":"1em"},attrs:{effect:"dark",content:e.row.price_by?"Price by item number":"Price by area (m2)",placement:"left"}},[r("el-switch",{attrs:{value:e.row.price_by,"active-color":"#13ce66","inactive-color":""},on:{change:function(r){return t.calcPriceprice_byChanged(r,e.row)}}})],1)]}}])},[r("template",{slot:"header"},[r("span",[t._v("ТАН НАРХИ")]),r("br"),r("span",[t._v("m2 / Dona")])])],2),r("el-table-column",{attrs:{width:"120",label:"ТАН НАРХИ",prop:"base_price",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("span",[t._v(t._s(e.row.base_price))])]}}])}),r("el-table-column",{attrs:{width:"130",prop:"sum_kassa",align:"center"}},[r("template",{slot:"header"},[r("span",[t._v("СУММАСИ")]),r("br"),r("span",[t._v("КАССА")])])],2),r("el-table-column",{attrs:{width:"130",prop:"base_price_changed",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-input",{attrs:{size:"small",type:"number",value:e.row.base_price_changed},on:{input:function(r){return t.base_priceIsChanging(r,e.row)}}})]}}])},[r("template",{slot:"header"},[r("span",[t._v("ЎЗГАРГАН")]),r("br"),r("span",[t._v("ТАН НАРХИ")])])],2),r("el-table-column",{attrs:{width:"130",label:"СУММАСИ",prop:"sum",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.row.sum.toFixed(2))+" ")]}}])}),r("el-table-column",{attrs:{width:"150",label:"ТОВАРНИ УМУМИЙ КИЛОГРАММИ",prop:"weight",align:"center"}}),r("el-table-column",{attrs:{label:"1-ТА ПОЧКАДИГИ КОЛИЧЕСТВАНИ ЎЛЧОВ БИРЛИГИ",align:"center"}},[r("el-table-column",{attrs:{width:"160",label:"ПОЧКАСИДИГИ (м2)",align:"center",prop:"area_of_one_packet"}}),r("el-table-column",{attrs:{width:"140",label:"1-ДОНАСИНИ (м2)",prop:"area_of_an_item",align:"center"}}),r("el-table-column",{attrs:{align:"center",prop:"number_of_items",width:"140",label:"УМУМИЙ ДОНАСИ"}}),r("el-table-column",{attrs:{width:"160",label:"ПОЧКАСИДИГИ (КГ)",align:"center",prop:"wight_of_one_packet"}}),r("el-table-column",{attrs:{width:"140",label:"1-ДОНАСИНИ  (КГ)",align:"center",prop:"weight_of_an_item"}})],1)],1),r("el-dialog",{attrs:{title:"",visible:t.showImageDilog,"append-to-body":"",width:"40%"},on:{"update:visible":function(e){t.showImageDilog=e}}},[r("el-image",{staticStyle:{width:"100%",height:"90%"},attrs:{src:t.imageUrl,fit:"scale-down"}})],1)],1)},c=[],o=(r("d3b7"),r("159b"),r("d81d"),r("a9e3"),r("b680"),r("4de4"),{props:{broken:{type:Boolean,default:!1}},data:function(){return{showImageDilog:!1,imageUrl:"",maxHeight:600,newArea:"",currentNotification:null,currentProduct:{},brokenPropotionArr:[],totalPrice:0,tableData:[{propotion:53.33,code:"1191A",type_name:"Ochi",size:"30 * 90",base_price:2,base_price_changed:14,sum:189,sum_kassa:27,price_by:!1,broken:!1,packTotalArea:13.5,item_num:50,pack_num:8,over_pack_num:2,wight_of_one_packet:28,weight_of_an_item:4.6,weight:229.99,area_of_one_packet:1.62,area_of_an_item:.27,number_of_items:6},{propotion:26.67,code:"1191D",type_name:"Decor",size:"30 * 90",broken:!1,base_price:4,base_price_changed:14,sum_kassa:8.64,sum:30.24,price_by:!1,packTotalArea:2.16,item_num:8,pack_num:1,over_pack_num:2,wight_of_one_packet:28,weight_of_an_item:4.6,weight:36.79,area_of_one_packet:1.62,area_of_an_item:.27,number_of_items:6},{propotion:53.33,broken:!0,code:"1191BR",type_name:"Ochi (Singan)",size:"30 * 90",base_price:2,base_price_changed:2,sum:0,sum_kassa:0,price_by:!1,packTotalArea:0,item_num:0,pack_num:0,over_pack_num:0,wight_of_one_packet:28,weight_of_an_item:4.6,weight:0,area_of_one_packet:1.62,area_of_an_item:.27,number_of_items:6},{propotion:20,code:"1191C",type_name:"Pol",size:"30 * 30",base_price:6,base_price_changed:6,sum_kassa:0,sum:0,packTotalArea:0,item_num:0,pack_num:0,broken:!1,price_by:!1,over_pack_num:0,wight_of_one_packet:25,weight_of_an_item:2.28,weight:0,area_of_one_packet:.99,area_of_an_item:.09,number_of_items:11}],tableData1:[{propotion:49,code:"1191A",type_name:"Ochi",size:"30 * 60",base_price:3e3,sum:0,packTotalArea:"",item_num:"",pack_num:"",over_pack_num:"",wight_of_one_packet:25,weight_of_an_item:3.125,weight:"",area_of_one_packet:1.44,area_of_an_item:.18,number_of_items:8},{propotion:25.2,code:"1191B",type_name:"To'qi",size:"30 * 60",packTotalArea:"",base_price:1200,item_num:"",pack_num:"",sum:0,over_pack_num:"",wight_of_one_packet:25,weight_of_an_item:3.125,weight:"",area_of_one_packet:1.44,area_of_an_item:.18,number_of_items:8},{propotion:5.3,code:"1191C",type_name:"Dekor",size:"30 * 60",packTotalArea:"",item_num:"",base_price:304,sum:0,pack_num:"",over_pack_num:"",wight_of_one_packet:25,weight_of_an_item:3.125,weight:"",area_of_one_packet:1.44,area_of_an_item:.18,number_of_items:8},{propotion:14.85,code:"1191D",type_name:"Pol",size:"30 * 30",packTotalArea:"",item_num:"",pack_num:"",over_pack_num:"",base_price:2e3,sum:0,wight_of_one_packet:21,weight_of_an_item:1.4,weight:"",area_of_one_packet:1.35,area_of_an_item:.09,number_of_items:15},{propotion:1.65,code:"1191F",type_name:"Friz",size:"30 * 6",packTotalArea:"",item_num:"",pack_num:"",base_price:300,sum:0,over_pack_num:"",wight_of_one_packet:21,weight_of_an_item:1.4,weight:"",area_of_one_packet:.72,area_of_an_item:.018,number_of_items:40},{propotion:1.1,code:"1191S",type_name:"Sigara",size:"30 * 2",packTotalArea:"",item_num:"",base_price:3401,pack_num:"",sum:0,over_pack_num:"",wight_of_one_packet:10,weight_of_an_item:.1,weight:"",area_of_one_packet:.6,area_of_an_item:.006,number_of_items:100},{propotion:2.76,code:"1191P",type_name:"Plintus",size:"30 * 10",packTotalArea:"",item_num:"",base_price:3401,pack_num:"",sum:0,over_pack_num:"",wight_of_one_packet:20,weight_of_an_item:.1,weight:"",area_of_one_packet:18.6,area_of_an_item:.03,number_of_items:620}]}},computed:{tableDataComputed:function(){var t=this;return this.broken?this.tableData:this.tableData.filter((function(e){return e.broken===t.broken}))}}}),u=r("2909"),s=(r("7db0"),r("b65f"),r("b0c0"),r("99af"),{methods:{areaIsChanging:function(t,e){if(this.currentProduct=this.tableDataComputed.find((function(t){return t._id===e._id})),t){t=parseFloat(t),this.currentProduct.packTotalArea=this.truncateToDecimals(t,4);var r=this.truncateToDecimals(t/this.currentProduct.area_of_an_item,4),a=this.truncateToDecimals(parseFloat(r-parseInt(r)),4);r=Math.ceil(r),a<=1e-4&&t?(this.currentProduct.item_num=r,this.currentProduct.pack_num=parseInt(r/this.currentProduct.number_of_items),this.currentProduct.over_pack_num=parseInt(r%this.currentProduct.number_of_items),this.currentProduct.sum=parseInt(this.currentProduct.base_price*t),this.currentProduct.weight=this.truncateToDecimals(this.currentProduct.item_num*this.currentProduct.weight_of_an_item,2),this.calcPrice(),this.calculateTotalPrice(),this.checkPropotion()):0===t?(this.currentProduct.item_num=0,this.currentProduct.pack_num=0,this.currentProduct.over_pack_num=0,this.currentProduct.sum=0,this.calculateTotalPrice(),this.currentProduct.weight=0):(this.currentProduct.item_num="",this.currentProduct.pack_num="",this.currentProduct.over_pack_num="",this.currentProduct.sum=0,this.calculateTotalPrice(),this.currentProduct.weight="")}else this.currentProduct.packTotalArea=t},item_numIsChanging:function(t,e){this.currentProduct=this.tableDataComputed.find((function(t){return t._id===e._id})),t?(this.currentProduct.item_num=parseInt(t),this.currentProduct.packTotalArea=this.truncateToDecimals(parseFloat(this.currentProduct.item_num*this.currentProduct.area_of_an_item),4),this.currentProduct.pack_num=parseInt(this.currentProduct.item_num/this.currentProduct.number_of_items),this.currentProduct.over_pack_num=parseInt(this.currentProduct.item_num%this.currentProduct.number_of_items),this.calcPrice(),this.currentProduct.weight=(this.currentProduct.item_num*this.currentProduct.weight_of_an_item).toFixed(2),this.checkPropotion(),this.calculateTotalPrice()):(this.currentProduct.over_pack_num="",this.currentProduct.item_num="",this.currentProduct.pack_num="",this.currentProduct.packTotalArea="",this.currentProduct.sum=0,this.calculateTotalPrice(),this.currentProduct.weight="")},pack_numIsChanging:function(t,e){this.currentProduct=this.tableDataComputed.find((function(t){return t._id===e._id})),t?(this.currentProduct.pack_num=parseInt(t),this.currentProduct.item_num=parseInt(this.currentProduct.pack_num*this.currentProduct.number_of_items+this.currentProduct.over_pack_num),this.currentProduct.over_pack_num=""===this.currentProduct.over_pack_num?0:this.currentProduct.over_pack_num,this.currentProduct.packTotalArea=parseFloat((this.currentProduct.item_num*this.currentProduct.area_of_an_item).toFixed(4)),this.calcPrice(),this.currentProduct.weight=(this.currentProduct.item_num*this.currentProduct.weight_of_an_item).toFixed(2),this.checkPropotion(),this.calculateTotalPrice()):(this.currentProduct.pack_num=t,this.currentProduct.item_num="",this.currentProduct.item_num="",this.currentProduct.packTotalArea="",this.currentProduct.sum=0,this.calculateTotalPrice(),this.currentProduct.weight="")},over_pack_numIsChanging:function(t,e){this.currentProduct=this.tableDataComputed.find((function(t){return t._id===e._id})),t?(this.currentProduct.over_pack_num=parseInt(t)>this.currentProduct.number_of_items?this.currentProduct.number_of_items:parseInt(t),this.currentProduct.item_num=parseInt(this.currentProduct.pack_num*this.currentProduct.number_of_items+this.currentProduct.over_pack_num),this.currentProduct.packTotalArea=parseFloat((this.currentProduct.item_num*this.currentProduct.area_of_an_item).toFixed(4)),this.currentProduct.weight=(this.currentProduct.item_num*this.currentProduct.weight_of_an_item).toFixed(2),this.calcPrice(),this.checkPropotion(),this.calculateTotalPrice()):(this.currentProduct.over_pack_num=t,this.currentProduct.item_num="",this.currentProduct.packTotalArea="",this.currentProduct.sum=0,this.calculateTotalPrice(),this.currentProduct.weight="")},base_priceIsChanging:function(t,e){this.currentProduct=this.tableDataComputed.find((function(t){return t._id===e._id})),t?(this.currentProduct.base_price_changed=parseFloat(t),this.currentProduct.sum=parseFloat((this.currentProduct.base_price_changed*this.currentProduct.packTotalArea).toFixed(4)),this.calculateTotalPrice()):(this.currentProduct.base_price_changed=t,this.currentProduct.sum=0)},calculatebase_prices:function(t){if(t){t=""===t?0:parseFloat(t+"");var e=this.tableDataComputed.reduce((function(t,e){return t+(""===e.sum?0:parseFloat(e.sum))}),0),r=[];this.tableDataComputed.forEach((function(t){r.push(t.sum/e)}));for(var a=0;a<r.length;a++){var n=this.tableDataComputed[a];n.sum=t*r[a],n.price_by&&n.item_num?n.base_price_changed=n.sum/n.item_num:!n.price_by&&n.packTotalArea?n.base_price_changed=parseFloat((n.sum/n.packTotalArea).toFixed(4)):0!==n.price_by&&0!==n.packTotalArea&&this.$notify({message:"Number of item is unknown! or Area is unknown!",type:"error",duration:2300})}}},calcPrice:function(){var t=""===this.currentProduct.item_num?0:parseFloat(this.currentProduct.item_num),e=""===this.currentProduct.packTotalArea?0:parseFloat(this.currentProduct.packTotalArea);this.currentProduct.sum=this.currentProduct.base_price_changed*(this.currentProduct.price_by?t:e),this.currentProduct.sum_kassa=this.currentProduct.base_price*(this.currentProduct.price_by?t:e)},calcPriceprice_byChanged:function(t,e){this.currentProduct=this.tableDataComputed.find((function(t){return t._id===e._id})),this.currentProduct.price_by=t,this.calcPrice(),this.calculateTotalPrice()},truncateToDecimals:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2,r=Math.pow(10,e);return Math.trunc(t*r)/r},calculateTotalPrice:function(){this.$emit("calculateTotalPrice",this.truncateToDecimals(this.tableDataComputed.reduce((function(t,e){return t+(""===e.sum?0:parseFloat(e.sum))}),0),2))},checkPropotion:function(){var t=this,e=this.tableDataComputed.reduce((function(t,e){return t+(""===e.packTotalArea?0:parseFloat(e.packTotalArea))}),0),r={name:"",bad_percentage:0,good_percentage:0};this.brokenPropotionArr=[],this.tableDataComputed.forEach((function(a){r.name=a.type_name,r.good_percentage=a.propotion,r.bad_percentage=0===e?0:t.truncateToDecimals(""===a.packTotalArea?0:parseFloat(a.packTotalArea)/e*100),t.brokenPropotionArr.push(r),r={name:"",bad_percentage:0,good_percentage:0}}));var a=this.$createElement;this.currentNotification&&this.currentNotification.close(),this.currentNotification=this.$notify({type:"error",title:"Proportion error",dangerouslyUseHTMLString:!0,message:a("table",{class:"notificationTable"},[a("tr",null,[a("th",{style:{width:"35%"}},"Name"),a("th",{style:{width:"35%"}},"Should be"),a("th",{style:{width:"30%"}},"Now")])].concat(Object(u["a"])(function(){var e=[];return t.brokenPropotionArr.forEach((function(t){e.push(a("tr",null,function(){return[a("td",null,t.name),a("td",null,t.good_percentage),a("td",null,t.bad_percentage)]}()))})),e}()))),duration:0})}}}),l={components:{},mixins:[o,s],data:function(){return{bodyHeight:300}},mounted:function(){var t=this;setTimeout((function(){t.bodyHeight=t.$refs.tblContainer1.clientHeight}),300),window.addEventListener("resize",(function(e){console.log("windows resizing"),t.bodyHeight=t.$refs.tblContainer1.clientHeight}))},methods:{openImg:function(t){this.showImageDilog=!0,this.imageUrl=t},jamiSumma:function(t){var e=t.columns,r=t.data,a=[];return e.forEach((function(t,e){if(0===e&&(a[e]="Жами"),"packTotalArea"===t.property||"item_num"===t.property||"sum"===t.property||"sum_kassa"===t.property){var n=r.map((function(e){return Number(e[t.property])}));if(n.every((function(t){return isNaN(t)})))a[e]="";else{var i=n.reduce((function(t,e){var r=Number(e);return isNaN(r)?t:t+e}),0);a[e]=i.toFixed(2)}}})),this.$nextTick((function(){})),a}}},_=l,p=(r("154b"),r("2877")),m=Object(p["a"])(_,i,c,!1,null,null,null),h=m.exports,d=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"tools-wrapper"},[r("p",[t._v("List №: ALFAM-001 ")]),r("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"Choose a product"},model:{value:t.currentProduct,callback:function(e){t.currentProduct=e},expression:"currentProduct"}},t._l(t.products,(function(t,e){return r("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),1),r("el-checkbox",{staticStyle:{margin:"1em 0"},on:{change:t.brokenStateChanged},model:{value:t.withBorken,callback:function(e){t.withBorken=e},expression:"withBorken"}},[t._v("Include borkens")]),r("el-select",{staticClass:"tools-wrapper-item",staticStyle:{width:"100%"},attrs:{placeholder:"Choose action"},model:{value:t.currentStatus,callback:function(e){t.currentStatus=e},expression:"currentStatus"}},t._l(t.Procedures,(function(t,e){return r("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),1),r("el-select",{staticClass:"tools-wrapper-item",staticStyle:{width:"100%"},attrs:{placeholder:"Choose a customer"},model:{value:t.currentcustomer,callback:function(e){t.currentcustomer=e},expression:"currentcustomer"}},t._l(t.customers,(function(t,e){return r("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),1),r("el-select",{staticClass:"tools-wrapper-item",staticStyle:{width:"100%"},attrs:{placeholder:"Choose a Driver"},model:{value:t.currentcustomer,callback:function(e){t.currentcustomer=e},expression:"currentcustomer"}},t._l(t.customers,(function(t,e){return r("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),1),r("el-input",{staticClass:"tools-wrapper-item",attrs:{placeholder:"Cost to upload (so'm)"},model:{value:t.costOfUpload,callback:function(e){t.costOfUpload=e},expression:"costOfUpload"}}),r("el-input",{staticClass:"tools-wrapper-item",attrs:{value:t.totalPrice,type:"number",placeholder:"Discount price"},on:{input:t.changebase_price}}),r("div",{staticStyle:{"margin-bottom":"1em"}},[r("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":""},model:{value:t.isDebt,callback:function(e){t.isDebt=e},expression:"isDebt"}}),t._v(" Is debt? ")],1),t.isDebt?r("el-date-picker",{staticStyle:{"margin-bottom":"1em"},attrs:{placeholder:"Debt back date"},model:{value:t.debtDate,callback:function(e){t.debtDate=e},expression:"debtDate"}}):t._e(),t.isDebt?r("el-input",{staticStyle:{"margin-bottom":"1em"},attrs:{type:"textarea",rows:"4"},model:{value:t.debtDescription,callback:function(e){t.debtDescription=e},expression:"debtDescription"}}):t._e(),r("div",{staticClass:"order-action-btn"},[t._t("default")],2)],1)},f=[],b={props:{totalPrice:{type:[Number,String],default:0}},data:function(){return{withBorken:!1,currentProduct:"",currentStatus:"",currentcustomer:"",costOfUpload:"",discountPrice:0,debtDescription:"",debtDate:"",isDebt:!1,products:[{label:"Nilufar",value:1}],Procedures:[{label:"Sotib olish",value:1},{label:"Barter (Almashtirish)",value:2},{label:"Qaytarib berish",value:3}],customers:[{label:"A",value:1},{label:"B",value:2},{label:"Q",value:3}]}},methods:{base_priceChangedOneOfItem:function(t){this.discountPrice=t,console.log("sends back",t)},changebase_price:function(t){this.$emit("totalPriceChanged",t)},brokenStateChanged:function(t){this.$emit("brokenState",t)}}},g=b,k=(r("7197"),Object(p["a"])(g,d,f,!1,null,null,null)),P=k.exports,w={name:"Shop",components:{Table:h,Tools:P},data:function(){return{totalPrice:0,broken:!1}},methods:{callSave:function(){this.$refs.calculatorRef.save()},calculateTotalPrice:function(t){this.totalPrice=t},totalPriceChanged:function(t){this.totalPrice=t,this.$refs.packingListTableRef_edit.calculatebase_prices(t)},changedBrokenState:function(t){this.broken=t},triggerSumTotalPrice:function(){this.$refs.packingListTableRef_edit.calculateTotalPrice()}}},v=w,y=Object(p["a"])(v,a,n,!1,null,null,null);e["default"]=y.exports},"154b":function(t,e,r){"use strict";r("a169")},7197:function(t,e,r){"use strict";r("efc2")},"7db0":function(t,e,r){"use strict";var a=r("23e7"),n=r("b727").find,i=r("44d2"),c=r("ae40"),o="find",u=!0,s=c(o);o in[]&&Array(1)[o]((function(){u=!1})),a({target:"Array",proto:!0,forced:u||!s},{find:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}}),i(o)},a169:function(t,e,r){},b65f:function(t,e,r){var a=r("23e7"),n=Math.ceil,i=Math.floor;a({target:"Math",stat:!0},{trunc:function(t){return(t>0?i:n)(t)}})},efc2:function(t,e,r){}}]);