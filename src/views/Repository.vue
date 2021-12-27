<template>
    <div style="padding: 30px">
        <div style="color:#333;font-size: 20px;font-weight: bold;text-align: left"><i class="el-icon-arrow-left" style="font-size: 20px;cursor: pointer;margin-right: 10px" @click="back"></i>编辑题库</div>
        <el-divider></el-divider>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="id" hidden>
                <el-input v-model="form.id"></el-input>
            </el-form-item>
            <el-form-item label="题库名称">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="题目列表" style="text-align: left">
                <el-table :data="this.form.problems">
                    <el-table-column
                        type="index"
                        label="ID"
                        width="40">
                    </el-table-column>
                    <el-table-column
                        prop="title"
                        label="题目"
                        sortable
                        min-width="400">
                    </el-table-column>
                    <el-table-column
                        prop="type"
                        :formatter="row => row.type ? '单选' : '多选'"
                        width="50"
                        label="类型">
                    </el-table-column>
                    <el-table-column
                        fixed="right"
                        label="操作"
                        align="center"
                        width="150">
                        <template slot-scope="scope">
                            <el-button @click="editProblem(scope.row)" type="primary" size="small">编辑</el-button>
                            <el-button @click="delProblem(scope.row)" type="danger" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item>
                <el-button @click.native="editProblem()">新增题目</el-button>
                <el-button type="primary" @click.native="save">保存</el-button>
                <el-button type="danger" @click.native="del">删除</el-button>
            </el-form-item>
        </el-form>
        <el-dialog
            title="编辑题目"
            width="50%"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :visible.sync="editProblemDialog">
            <el-form ref="form" :model="problem" label-width="80px" style="text-align: left">
                <el-form-item label="id" hidden>
                    <el-input v-model="problem.id"></el-input>
                </el-form-item>
                <el-form-item label="题干">
                    <el-input type="textarea" v-model="problem.title"></el-input>
                </el-form-item>
                <el-form-item label="选项">
                    <el-input type="textarea" v-model="optionsText" :rows="5"></el-input>
                </el-form-item>
                <el-form-item label="答案">
                    <el-select v-model="problem.answer" multiple>
                        <el-option v-for="item in problem.options" :key="item.title"
                                   :value="item.title"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editProblemDialog = false">取 消</el-button>
                <el-button type="primary" @click="saveProblem()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>

import Store from "electron-store";
import Utils from "@/utils/Utils";

export default {
    name: "Study",
    data() {
        return {
            store: new Store(),
            form: {
                id: "",
                title: "",
                problems: [],
            },
            editProblemDialog: false,
            problem: { title: "", options: [], answer: [] },
            optionsText: "",
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
    watch: {
        optionsText(val) {
            let arr = val.split("\n");
            this.problem.options = [];
            arr.forEach(item => {
                this.problem.options.push({ title: item, isAnswer: false });
            });
        },
    },
    methods: {
        editProblem(row) {
            this.editProblemDialog = true;
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
                this.optionsText = options.join("\n");
            } else {
                this.problem = {
                    id: "",
                    title: "",
                    options: [],
                    answer: [],
                };
                this.optionsText = "";
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
        saveProblem() {
            this.problem.options.forEach(option => {
                this.problem.answer.forEach(item => {
                    if (option.title === item) {
                        option.isAnswer = true;
                    }
                });
            });
            if (this.problem.id) {
                let obj = this.form.problems.find(item => item.id === this.problem.id);
                obj.title = this.problem.title;
                obj.options = this.problem.options;
                obj.type = this.problem.answer.length === 1;
            } else {
                this.form.problems.unshift({
                    id: Utils.uuid(),
                    title: this.problem.title,
                    options: this.problem.options,
                    type: this.problem.answer.length === 1,
                });
            }
            this.editProblemDialog = false;
        },
        save() {
            let exercises = this.store.get("exercises");
            if (this.$route.params.id) {
                exercises = exercises.filter(item => item.id !== this.$route.params.id);
            }
            exercises.unshift(this.form);
            this.store.set("exercises", exercises);
            this.$router.back();
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
