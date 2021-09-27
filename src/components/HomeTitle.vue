<template>
  <h3 class="home-title"><slot></slot></h3>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.home-title {
  border-left: 3.5px solid #d43c33;
  line-height: 1;
  padding-left: 8px;
  margin: 15px 0;
  font-size: 16px;
}
</style>