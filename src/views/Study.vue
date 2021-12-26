<template>
    <div>
        <el-button type="primary" icon="el-icon-edit" v-on:click="add_new_connection"></el-button>
    </div>
</template>

<script>
import Store from "electron-store";
import { remote } from "electron";

export default {
    name: "HeaderTool",
    props: {
        msg: String,
    },
    methods: {
        add_new_connection: function() {
            const store = new Store();
            // 存储信息
            store.set("foo", "bar");
            // 根据process.type来分辨在哪种模式使用哪种模块
            // 获取electron应用的用户目录
            const STORE_PATH = remote.app.getPath("userData");
            console.log(STORE_PATH);
            // 显示存储的信息
            console.log(store.get("foo"));
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
