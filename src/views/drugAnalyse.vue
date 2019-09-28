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
              <el-col :span="7">
              </el-col>
              <el-col class="time" :class="[flag==4?'active':'']" @click.native="flag=4" :span="1">昨天</el-col>
              <el-col class="time" :class="[flag==1?'active':'']" @click.native="flag=1" :span="1">近7天</el-col>
              <el-col class="time" :class="[flag==2?'active':'']" @click.native="flag=2" :span="1">近30天</el-col>
              <el-col :span="2">
                <el-button type="primary"><i class="el-icon-search"></i>查询</el-button>
              </el-col>
              <el-col :span="2">
                <el-button type="primary"><i class="el-icon-refresh"></i>重置</el-button>
              </el-col>
            </el-row>
        </el-header>
        <el-table
          :data="tableData"
          border
          height="500px">
          <el-table-column
            align="center"
            label="编号"
            type="index"
            min-width=14%>
          </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="药品名称"
            min-width=17.2%>
          </el-table-column>
          <el-table-column
            align="center"
            prop="address"
            label="销售额"
            min-width=17.2%>
          </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="销额占比"
            min-width=17.2%>
          </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="销售量"
            min-width=17.2%>
          </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="销量占比"
            min-width=17.2%>
          </el-table-column>
        </el-table>
    </el-container>
</template>

<script>
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
          {name:"营业总额",data:"231",point:""},
          {name:"有效订单数",data:"22131",point:""},
          {name:"客单价",data:"23211",point:""},
          {name:"无效订单",data:"2231",point:""},
          {name:"注册用户数",data:"2311",point:""},
        ],
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },]
      }
    }
}
</script>
<style lang="scss" scoped>
  .home{
    margin:1%;
    height:700px;
    background:#fff;
    width:98%;
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
            &.active{
              border-color:#409EFF;
              color:#409EFF;
            }
          }
        }
      }
    };
    .el-table{
      width:98%;
      margin:1%;
    }
  }
</style>
