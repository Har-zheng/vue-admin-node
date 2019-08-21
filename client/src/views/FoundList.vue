<template>
  <div class="foundlist">
    <div class="table">
      <el-row class="btn">
        <el-col :span="2" :offset="22">
          <el-button style="float: right;" @click="onAddMoney">添加</el-button>
        </el-col>
      </el-row>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="创建时间" width="180"></el-table-column>
        <el-table-column prop="type" label="收支类型" width="180"></el-table-column>
        <el-table-column prop="describe" label="收支描述"></el-table-column>
        <el-table-column prop="income" label="收入"></el-table-column>
        <el-table-column prop="expend" label="支出"></el-table-column>
        <el-table-column prop="cash" label="账户现金"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column prop="operation" align="center" label="操作" fixed="right" width="180">
          <template slot-scope="scope">
            <el-button type="warning" icon="edit" size="small" @click="onEditMoney(scope.row)">编辑</el-button>
            <el-button
              type="danger"
              icon="delete"
              size="small"
              @click="onDeleteMoney(scope.row,scope.$index)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <DialogFound :dialog="dialog" :form="form" @update="getProfiles"></DialogFound>
  </div>
</template>
<script>
import DialogFound from '../components/DialogFound'
export default {
  name: "foundlist",
  components: {
    DialogFound
  },
  data() {
    return {
      tableData: [],
      dialog: {
        show: false,
        title: "",
        option: "edit"
      },
      form: {
        type: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: ""
      },
    }
  },
  created() {
    this.getProfiles()
  },
  methods: {
    getProfiles() {
      this.$axios.get('/api/profiles').then(res => {
        console.log(res)
        this.tableData = res.data
      })
    },
    onAddMoney() {
      // 添加
      this.dialog = {
        show: true,
        title: "添加资金信息",
        option: "add"
      };
      this.form = {
        type: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: ""
      };
    },
    onEditMoney(row, index) {
      // 编辑
      this.dialog = {
        show: true,
        title: "修改资金信息",
        option: "edit"
      };
      this.form = {
        type: row.type,
        describe: row.describe,
        income: row.income,
        expend: row.expend,
        cash: row.cash,
        remark: row.remark,
        id: row._id
      };
    },
    onDeleteMoney(row, index) {
      this.$axios.delete(`/api/profiles/delete/${row._id}`).then(res => {
        this.$message("删除成功");
        this.getProfile();
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.foundlist
  padding 20px
  .btn
    padding 6px
</style>