<template>
  <el-menu
    class="nav"
    mode="horizontal"
    :default-active="$route.path"
    :router="true"
    text-color="#409EFF"
    active-text-color="#409EFF"
  >
    <!-- Nav -->
    <el-menu-item index="/" route="/"> Home </el-menu-item>
    <el-menu-item index="/workouts" route="/workouts/add">
      Add Workout
    </el-menu-item>
    <el-menu-item index="/about" route="/about"> About </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "Navigation",
};
</script>

<style></style>
