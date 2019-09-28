<template>
    <el-container class="home">
        <el-header>
          <el-row>
            <el-col :span="3"><p>药店总数</p><p>{{businessData.shopTotalCount}}</p></el-col>
            <el-col :span="3"><p>药品总数</p><p>{{businessData.productTotalCount}}</p></el-col>
            <el-col :span="3"><p>注册用户数</p><p>{{businessData.userTotalCount}}</p></el-col>
          </el-row>
        </el-header>
        <el-header>
            <el-row>
              <el-col :span="3">
                <span>区域</span>
                <el-select v-model="areaCode" placeholder="请选择" size="small">
                    <el-option
                      v-for="item in areaArr"
                      :key="item.id"
                      :label="item.name"
                      :value="item.code">
                    </el-option>
                </el-select>
              </el-col>
              <el-col :span="3">
                <span>品牌</span>
                <el-select v-model="orgId" placeholder="请选择" size="small">
                    <el-option
                      v-for="(item,index) in brandArr"
                      :key="index"
                      :label="item"
                      :value="index">
                    </el-option>
                </el-select>
              </el-col>
              <el-col :span="3">
                <span>门店</span>
                <el-select v-model="shopId" placeholder="请选择" size="small">
                    <el-option
                      v-for="item in shopArr"
                      :key="item.id"
                      :label="item.shopName"
                      :value="item.shopId">
                    </el-option>
                </el-select>
              </el-col>
              <el-col :span="3">
              </el-col>
              <el-col class="time" :class="[flag==1?'active':'']" @click.native="get_account_data(1)" :span="1">昨天</el-col>
              <el-col class="time" :class="[flag==2?'active':'']" @click.native="get_account_data(2)" :span="1">近7天</el-col>
              <el-col class="time" :class="[flag==3?'active':'']" @click.native="get_account_data(3)" :span="1">近30天</el-col>
              <el-col class="time" :span="2">
                <el-date-picker
                  v-model="week"
                  type="week"
                  format="yyyy 第 WW 周"
                  placeholder="选择周">
                </el-date-picker>
              </el-col>
              <el-col class="time" :span="2">
                <el-date-picker
                  v-model="month"
                  type="month"
                  placeholder="选择月">
                </el-date-picker>
              </el-col>
              <el-col :span="2">
                <el-button type="primary" @click.native="search"><i class="el-icon-search"></i>查询</el-button>
              </el-col>
              <el-col :span="2">
                <el-button type="primary" @click.native="search"><i class="el-icon-refresh"></i>重置</el-button>
              </el-col>
            </el-row>
        </el-header>
        <el-main>
          <el-row class="userClass">
            <el-col :span="5">
              <p><span>营业总额</span><i class="el-icon-info"></i></p>
              <p>{{businessData.totalPrice || 0}}</p>
            </el-col>
            <el-col :span="5">
              <p><span>有效订单数</span><i class="el-icon-info"></i></p>
              <p>{{businessData.validOrderNum || 0}}</p>
            </el-col>
            <el-col :span="5">
              <p><span>客单价</span><i class="el-icon-info"></i></p>
              <p>{{businessData.pricePerOrder || 0}}</p>
            </el-col>
            <el-col :span="5">
              <p><span>无效订单</span><i class="el-icon-info"></i></p>
              <p>{{businessData.invalidOrderNum || 0}}</p>
            </el-col>
            <el-col :span="5">
              <p><span>平台服务费</span><i class="el-icon-info"></i></p>
              <p>{{(businessData.totalPrice - businessData. totalFreight) * 0.03 || 0}}</p>
            </el-col>
          </el-row>
        </el-main>
        <section>
          <div id="chart"></div>
        </section>
    </el-container>
</template>

<script>
import echarts from "echarts";
export default {
    data(){
      return {
        flag:1,                                        //控制时间段选中样式
        areaCode:"",
        shopId:"",
        week:"",
        month:"",
        orgId:"",
        areaArr:[{name:"全部",code:""}],
        brandArr:{"":"全部"},
        shopArr:[{shopName:"全部",shopId:""}],
        businessData:{},
        params:{                                       //请求参数
          "areaCode": "",
          "endDate": "",
          "itemId": 0,
          "itemName": "",
          "orgId": 0,
          "queryFlag": 3,
          "shopId": 0,
          "skuId": 0,
          "startDate": ""
        },
        time:[],                                                //横坐标时间
        mineData: [],                                           //纵坐标数据
        myChart:{}                                             //echarts对象
      }
    },
    created(){
      var endDate = new Date();
      var startDate = new Date();
      startDate.setTime((endDate.getTime() - 30*24*60*60*1000));
      this.params.endDate = this.changeDate(endDate) + " 00:00:00";              //当前日期
      this.params.startDate = this.changeDate(startDate) + " 00:00:00";
      this.getAreaList();
      this.getShopList();
      this.getOrgList();
      this.search(); 
    },
    mounted(){
      this.myChart = echarts.init(document.getElementById("chart"),"light"); 
      this.myChart.option = {
        title: {
            text: '营业总额分析',
            x:"20px",
            y:"20px"
        },
        //折线代表的意义说明
        // legend: {
        //     icon:"rect",
        //     itemWidth: 40,
        //     itemHeight: 5,
        //     itemGap:50,
        //     data:['我的',"比前七日"],
        //     x:"200px",
        //     y:"25px"
        // },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLabel:{interval:0}
        },
        yAxis: {
            type: 'value',
            axisLine: {
              show: false,
            }
        },
        //图表的主体部分
        grid: {
            left: '5%',
            right: '5%',
            bottom: '3%',
            top:'15%',
            containLabel: true
        },
      };
      this.myChart.setOption(this.myChart.option);
    },
    methods:{
      // 点击 昨日， 近7天， 近30天，选择周，选择月 的时候触发
      get_account_data(flag){
        this.flag = flag
     
        if(flag==1){
          this.params.queryFlag = 1
          this.get_time_day(1)
        }else if(flag==2){
           this.params.queryFlag = 2
          this.get_time_day(6)
        }else if(flag==3){
           this.params.queryFlag = 3
          this.get_time_day(29)
        }
      },
      // 用于获取近多少天  的开始时间和结束日期
      get_time_day(num){
        var time2 = new Date()
        var time = new Date(time2.getTime() - 24 * 60 * 60 * 1000 * num)
        var s_time =  time.getFullYear() + '-'  + (Number(time.getMonth()) + 1) + '-' + time.getDate()
          // 开始的时间
        var start_time = s_time + ' 00:00:00'
         // 结束的时间
        var end_time;
         if(num==1){
            end_time =  s_time + ' 23:59:59'
        }else{
           end_time = time2.getFullYear() + '-'  + (Number(time2.getMonth()) + 1) + '-'  + time2.getDate() + ' 23:59:59'
        }
        console.log(start_time,end_time)
        this.params.startDate = start_time
        this.params.endDate = end_time
        this.params.areaCode = this.areaCode
        this.params.shopId = this.shopId
         console.log( this.params)
        this.search()
      },
      // 点击获取 某一周或者某一个月的时候触发
      // time: 选中的周或者月的开始日期； num:  1,表示周，2，表示月
      get_time_week_month(time,num){
          console.log(time,num)
          if(num==1){
              this.params.queryFlag = 4
            this.start_to_end_time(time,6)
          }else if(num==2){
            var res = new Date(time)
            //  获取当前月有多少天
            var acc = new Date(res.getFullYear(),res.getMonth()+1,0).getDate()
              this.params.queryFlag = 5
            this.start_to_end_time(time,acc-1)
          }
      },
      start_to_end_time(time,day){
            var week_time2 = new Date(new Date(time).getTime())
            var week_time = new Date(new Date(time).getTime() + 24 * 60 * 60 * 1000 * day)
            var start_week_time = week_time2.getFullYear() + '-'  + (Number(week_time2.getMonth()) + 1) + '-' + week_time2.getDate() +  ' 00:00:00'
            var end_week_time =  week_time.getFullYear() + '-'  + (Number(week_time.getMonth()) + 1) + '-' + week_time.getDate() +  ' 23:59:59'
          console.log("开始结束时间：",start_week_time,end_week_time)
           this.params.startDate = start_week_time
        this.params.endDate = end_week_time
         this.params.areaCode = this.areaCode
        this.params.shopId = this.shopId
         console.log( this.params)
          this.search()
      },
      //获取营业数据
      search(){
        this.params.areaCode = this.areaCode;
        this.params.shopId = this.shopId;
        this.params.orgId = this.orgId;
        this.$post("businessData",this.params).then(res=>{
          this.businessData = Object.assign({},res.data);
          console.log("subDataListYesterday-------",res)
          res.data.subDataListYesterday.forEach(item => {
            this.time.push(item.statisticsTime.substring(5));  
          });
          res.data.subDataListYesterday.forEach(item => {
            this.mineData.push(parseInt(item.invalidOrderNum));  
          });
          this.myChart.setOption({
            xAxis: {
              data:this.time
            },
            series:[
              {
                name:"我的",
                type: 'line',
                data:this.mineData,
                smooth: true,
                lineStyle: {
                  normal: {
                      color: '#409EFF',
                      width: 3,
                  }
                },
              },
            ]
          })
        })
      },
       //获取青岛市内区域列表
      getAreaList(){
        this.$get("areaList",{areaCode:"3702"}).then(res=>{
          this.areaArr = this.areaArr.concat(res.data);
        })
      },
      //获取品牌列表
      getOrgList(){
        this.$get("orgList").then(res=>{
          Object.assign(this.brandArr,res.data)
        })
      },
      getShopList(){
        //获取门店列表
        this.$get("shopList",{areaCode:this.areaCode,orgId:this.orgId}).then(res=>{
          this.shopArr = this.shopArr.concat(res.data);
        })
      },
      //把日期转换成年月日的形式
      changeDate(date,item){
         var select_data = new Date(date)
        //  item==1,表示选择的是周
        if(item==1){
              select_data = new Date(date.getTime() - 24 * 60 * 60 *1000) 
            return select_data.getFullYear() + "-" + (Number(select_data.getMonth()) + 1) + "-" + select_data.getDate();
        }else if(item==2){
            // item==2，表示选择的是月
            return select_data.getFullYear() + "-" + (Number(select_data.getMonth()) + 1) + "-" + select_data.getDate();
        }
     
      }
    },
    watch:{
      week:function(val){
        this.params.queryFlag = 4;
       console.log(this.changeDate(val))

       this.get_time_week_month(this.changeDate(val,1),1)

       this.getShopList();
        
      },
      month:function(val){
        this.params.queryFlag = 4;
        
        this.get_time_week_month(this.changeDate(val,2),2)

        this.getShopList();
      
      },
      orgId:function(){
        this.shopArr = [{shopName:"全部",shopId:""}];
        this.getShopList();
      },
      areaCode:function(){
        this.shopArr = [{shopName:"全部",shopId:""}];
        this.getShopList();
      }
    }
}
</script>
<style lang="scss" scoped>
  .home{
    margin:15px;
    height:760px;
    .el-header:first-of-type{
      background:#fff;
      display: flex;
      .el-row{
        display:flex;
        width:100%;
        height:100%;
        .el-col{
          display: flex;
          justify-content: space-around;
          align-items: center;
        }
      }
    }
    .el-header:last-of-type{
      background:#fff;
      display:flex;
      align-items: center;
      .el-row{
        width:100%;
        height:100%;
        display:flex;
        align-items: center;
        .el-col{
          display:flex;
          align-items: center;
          height:100%;
          justify-content: center;
          .el-select{
            width:90px;
            margin-left:10px;
          };
          span{
            font-size:12px;
          }
          .el-button{
            width:90px;
            height:30px;
            line-height:30px;
            padding:0;
            margin-left:20px;
            i{
              margin-right:10px;
            }
          }
          &.time{
            margin:0 10px;
            border-bottom:3px solid #fff;
            &:hover{
              cursor: pointer;
            }
            &.active{
              border-color:#409EFF;
              color:#409EFF;
            }
          }
        }
      }
    };
    .el-main{
      height:120px;
      padding:0;
      margin-top:15px;
      .userClass{
        height:100%;
        display:flex;
        justify-content: space-between;
        .el-col{
          background:#fff;
          height:100%;
          margin-right:15px;
          height:100%;
          &:hover{
            cursor: pointer;
          }
          &:last-child{
            margin:0;
          };
          p:first-child{
            display:flex;
            justify-content: space-between;
            margin:15px 25px;
            color:#666;
            align-items: center;
            height:20px;
          };
          p:last-child{
            font-size:36px;
            margin:0 25px;
          }
        }
      }
    };
    section{
      padding:0;
      height:500px;
      margin-top:10px;
      width:100%;
      #chart{
        width:100%;
        height:500px;
        background:#fff;
      }
    }
  }
</style>
