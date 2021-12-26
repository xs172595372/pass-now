<template>
    <div style="padding: 30px">
        <el-row>
            <el-col :span="24" style="text-align: left;margin: 20px">
                <el-button @click.native="edit()">新增题库</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col
                :span="8"
                v-for="item in exercises"
                :key="item.id"
            >
                <el-card class="exercise">
                    <div style="margin-bottom: 20px">{{ item.title }}</div>
                    <el-button style="margin: 10px" type="success" icon="el-icon-switch-button" @click.native="study(item.id)"
                               circle></el-button>
                    <el-button type="primary" icon="el-icon-edit" @click.native="edit(item.id)" circle></el-button>
                </el-card>
            </el-col>

        </el-row>
    </div>
</template>

<script>

import Store from "electron-store";

export default {
    name: "Home",
    components: {},
    data() {
        return {
            store: new Store(),
            exercises: [],
        };
    },
    mounted() {
        let exercises = this.store.get("exercises");

        if(exercises) {
            this.exercises = exercises;
        } else {
            this.store.set('exercises',[]);
        }
    },
    methods: {
        study(id) {
            this.$router.push({ name: "Study", params: { id: id } });
        },
        edit(id) {
            this.$router.push({ name: "EditRepository", params: { id: id } });
        },
    },
};
</script>

<style scoped>
.exercise {
    margin: 20px;
}
</style>
