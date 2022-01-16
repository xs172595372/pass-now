<template>
    <div class="container">
        <div class="title">我的题库</div>
        <el-divider></el-divider>
        <el-row>
            <el-col
                :span="8"
                v-for="item in exercises"
                :key="item.id"
            >
                <el-card class="exercise">
                    <div>{{ item.title }}</div>
                    <el-button style="margin: 10px" type="success" icon="el-icon-switch-button"
                               @click.native="study(item.id)"
                               circle></el-button>
                    <el-button type="primary" icon="el-icon-edit" @click.native="edit(item.id)" circle></el-button>
                </el-card>
            </el-col>
            <el-col :span="8" @click.native="edit()">
                <el-card class="exercise add">
                    <div><i class="el-icon-plus"></i><span style="margin-left: 20px;">新增题库</span></div>
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
        if (exercises) {
            this.exercises = exercises;
        } else {
            this.store.set("exercises", []);
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
.container {
    padding: 30px;
}

.title {
    font-size: 20px;
    font-weight: bold;
    text-align: left;
}

.exercise {
    color: #333;
    font-weight: bold;
    margin: 20px;
    height: 150px;
}

.exercise div {
    margin-bottom: 20px
}

.add {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 19px;
    border: 2px #ccc dashed;
    color: #666;
    cursor: pointer
}
</style>
