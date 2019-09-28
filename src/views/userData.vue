<template>
    <el-container class="home">
        <el-header>
            <el-row>
              <el-col :span="3"  v-for="(item,index) in classify" :key="index">
                <span>{{item}}</span>
                <el-select v-model="value" placeholder="请选择" size="small">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                </el-select>
              </el-col>
              <el-col :span="6">
              </el-col>
              <el-col class="time" :class="[flag==1?'active':'']" @click.native="flag=1" :span="1">近7天</el-col>
              <el-col class="time" :class="[flag==2?'active':'']" @click.native="flag=2" :span="1">近30天</el-col>
              <el-col class="time" :class="[flag==3?'active':'']" @click.native="flag=3" :span="1">按周</el-col>
              <el-col class="time" :class="[flag==4?'active':'']" @click.native="flag=4" :span="1">按月</el-col>
              <el-col :span="2">
                <el-button type="primary"><i class="el-icon-search"></i>查询</el-button>
              </el-col>
              <el-col :span="2">
                <el-button type="primary"><i class="el-icon-refresh"></i>重置</el-button>
              </el-col>
            </el-row>
        </el-header>
        <el-main>
          <el-row class="userClass">
            <el-col :span="5" v-for="(item,index) in classify2" :key="index">
              <p><span>{{item.name}}</span><i class="el-icon-info"></i></p>
              <p>{{item.data}}</p>
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
   data() {
      return {
        flag:1,                                        //控制时间段选中样式
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
        classify:["区域:","品牌:","门店:"],
        classify2:[
          {name:"全部下单用户",data:"231",point:""},
          {name:"复购用户数",data:"22131",point:""},
          {name:"活跃用户数",data:"23211",point:""},
          {name:"沉睡用户",data:"2231",point:""},
          {name:"流失用户",data:"2311",point:""},
        ]
      }
    },
    mounted(){
      var myChart = echarts.init(document.getElementById("chart"),"light"); 
      myChart.option = {
        title: {
            text: '下单用户分析',
            x:"20px",
            y:"20px"
        },
        //折线代表的意义说明
        legend: {
            icon:"rect",
            itemWidth: 40,
            itemHeight: 5,
            itemGap:50,
            data:['我的',"比前七日"],
            x:"200px",
            y:"25px"
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
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
        series: [
          {
            name:"我的",
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true,
            lineStyle: {
              normal: {
                  color: '#409EFF',
                  width: 3,
              }
            },
          },
          {
            name:'比前七日',
            type:'line',
            data:[220, 182, 191, 234, 290, 330, 310],
            smooth:true,
            lineStyle: {
              normal: {
                  color: '#CCC',
                  width: 3,
                  type: 'dashed'
              }
            },
            itemStyle:{
              color:"#CCC"
            }
        },
        ]
      };
      myChart.setOption(myChart.option);
    }
}
</script>
<style lang="scss" scoped>
  .home{
    margin:15px;
    height:700px;
    .el-header{
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
