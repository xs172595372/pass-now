<template>
    <el-container>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="id" hidden>
                <el-input v-model="form.id"></el-input>
            </el-form-item>
            <el-form-item label="题库名称">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click.native="save">保存</el-button>
                <el-button type="danger" @click.native="del">删除</el-button>
                <el-button @click.native="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </el-container>
</template>
<script>

import Store from "electron-store";
import Utils from "@/utils/Utils";

export default {
    name: "Study",
    data() {
        return {
            store: new Store(),
            form: {},
        };
    },
    created() {
        if(this.$route.params.id) {
            let exercises = this.store.get("exercises");
            this.form = exercises.find(item => item.id === this.$route.params.id);
        } else {
            this.form.id = Utils.uuid();
        }
    },
    methods: {
        cancel() {
            this.$router.push("/");
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
            let exercises = this.store.get("exercises");
            let result = exercises.filter(item => item.id !== this.$route.params.id);
            this.store.set("exercises", result);
            this.$router.back();
        },
    },
};
</script>
