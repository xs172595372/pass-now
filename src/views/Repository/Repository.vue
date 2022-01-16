<template>
    <div class="container">
        <div class="header">
            <i class="el-icon-arrow-left" @click="back"></i>
            <span>编辑题库</span>
        </div>
        <el-divider></el-divider>
        <el-form ref="form" :model="form" label-width="80px" :rules="rules">
            <el-form-item label="id" hidden>
                <el-input v-model="form.id"></el-input>
            </el-form-item>
            <el-form-item label="题库名称" prop="title">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-table :data="this.form.problems" class="table">
                <el-table-column type="index" label="ID" width="40"></el-table-column>
                <el-table-column prop="title" label="题目" sortable min-width="400"></el-table-column>
                <el-table-column prop="type" :formatter="row => row.type ? '单选' : '多选'" width="50"
                                 label="类型"></el-table-column>
                <el-table-column fixed="right" label="操作" align="center" width="150">
                    <template slot-scope="scope">
                        <el-button @click="editProblem(scope.row)" type="primary" size="small">编辑</el-button>
                        <el-button @click="delProblem(scope.row)" type="danger" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-form-item>
                <el-button @click.native="editProblem()">新增题目</el-button>
                <el-button type="primary" @click.native="save">保存</el-button>
                <el-button type="danger" @click.native="del">删除</el-button>
            </el-form-item>
        </el-form>
        <edit-problem
            :visible.sync="problemDialog"
            :problem="problem"
            @close="problemDialog = false"
            @save="saveProblem"
        ></edit-problem>
    </div>
</template>
<script>

import Store from "electron-store";
import Utils from "@/utils/Utils";
import EditProblem from "@/views/Repository/EditProblem";

export default {
    name: "Study",
    components: {
        EditProblem,
    },
    data() {
        return {
            store: new Store(),
            form: {
                id: "",
                title: "",
                problems: [],
            },
            problemDialog: false,
            rules: {
                title: [
                    { required: true, message: "请输入题库名称", trigger: "blur" },
                ],
            },
            problem: {},
        };
    },
    created() {
        if (this.$route.params.id) {
            let exercises = this.store.get("exercises");
            this.form = exercises.find(item => item.id === this.$route.params.id);
        } else {
            this.form.id = Utils.uuid();
        }
    },

    methods: {
        editProblem(row) {
            this.problemDialog = true;
            if (row) {
                this.problem = {
                    id: row.id,
                    title: row.title,
                    options: row.options,
                    answer: [],
                };
                let options = [];
                row.options.forEach(item => {
                    options.push(item.title);
                    item.isAnswer && this.problem.answer.push(item.title);
                });
                this.problem.optionsText = options.join("\n");
            } else {
                this.problem = {
                    id: "",
                    title: "",
                    options: [],
                    answer: [],
                    optionsText: "",
                };
            }
        },
        delProblem(row) {
            this.$confirm("确认删除吗？").then(() => {
                let index = this.form.problems.findIndex(item => {
                    return item.id === row.id;
                });
                this.form.problems.splice(index, 1);
                console.log(this.form.problems);
            }).catch(() => {
            });
        },
        saveProblem(problem) {
            if (problem.id) {
                let obj = this.form.problems.find(item => item.id === problem.id);
                obj.title = problem.title;
                obj.options = problem.options;
                obj.type = problem.answer.length === 1;
            } else {
                this.form.problems.unshift({
                    id: Utils.uuid(),
                    title: problem.title,
                    options: problem.options,
                    type: problem.answer.length === 1,
                });
            }
        },
        save() {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    let exercises = this.store.get("exercises");
                    if (this.$route.params.id) {
                        exercises = exercises.filter(item => item.id !== this.$route.params.id);
                    }
                    exercises.unshift(this.form);
                    this.store.set("exercises", exercises);
                    this.$router.back();
                }
            });
        },
        del() {
            this.$confirm("确认删除吗？").then(() => {
                let exercises = this.store.get("exercises");
                let result = exercises.filter(item => item.id !== this.$route.params.id);
                this.store.set("exercises", result);
                this.$router.back();
            }).catch(() => {
            });
        },
        back() {
            this.$confirm("尚未保存，确认返回？").then(() => {
                this.$router.back();
            }).catch(() => {
            });
        },
    },
};
</script>

<style scoped>
.container {
    padding: 30px;
}

.header {
    color: #333;
    font-size: 20px;
    font-weight: bold;
    text-align: left;
}

.header i {
    font-size: 20px;
    cursor: pointer;
    margin-right: 10px;
}

.table {
    margin-bottom: 30px;
}
</style>
