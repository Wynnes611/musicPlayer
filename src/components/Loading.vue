<template>
    <ul>
        <li class="loading">
        <span
          style="
            margin-left: -30px;
            padding-right: 11px;
            vertical-align: middle;
          "
          >正在加载</span
        >
        <ul class="la-ball-newton-cradle">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </li>
    </ul>
</template>

<script>
    export default {
        
    }
</script>

<style lang="less" scoped>
.loading {
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
      sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 50px;
    font-size: 0.8rem;
    font-family: monospace;
    font-weight: bolder;
    margin-bottom: 40px;
    // background-color: #fec54f;
    .la-ball-newton-cradle,
    .la-ball-newton-cradle > li {
      position: relative;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
    }
    .la-ball-newton-cradle {
      display: block;
      font-size: 0;
      color: #d43c33;
      width: 28px;
      height: 10px;
      margin-top: 5px;
    }
    .la-ball-newton-cradle.la-dark {
      color: #333;
    }
    .la-ball-newton-cradle > li {
      display: inline-block;
      float: none;
      background-color: currentColor;
      border: 0 solid currentColor;
      width: 7px;
      height: 7px;
      border-radius: 100%;
    }
    .la-ball-newton-cradle > li:first-child {
      -webkit-transform: translateX(0%);
      -moz-transform: translateX(0%);
      -ms-transform: translateX(0%);
      -o-transform: translateX(0%);
      transform: translateX(0%);
      -webkit-animation: ball-newton-cradle-left 1s 0s ease-out infinite;
      -moz-animation: ball-newton-cradle-left 1s 0s ease-out infinite;
      -o-animation: ball-newton-cradle-left 1s 0s ease-out infinite;
      animation: ball-newton-cradle-left 1s 0s ease-out infinite;
    }
    .la-ball-newton-cradle > li:last-child {
      -webkit-transform: translateX(0%);
      -moz-transform: translateX(0%);
      -ms-transform: translateX(0%);
      -o-transform: translateX(0%);
      transform: translateX(0%);
      -webkit-animation: ball-newton-cradle-right 1s 0s ease-out infinite;
      -moz-animation: ball-newton-cradle-right 1s 0s ease-out infinite;
      -o-animation: ball-newton-cradle-right 1s 0s ease-out infinite;
      animation: ball-newton-cradle-right 1s 0s ease-out infinite;
    }
    @keyframes ball-newton-cradle-left {
      25% {
        -webkit-transform: translateX(-100%);
        -moz-transform: translateX(-100%);
        -o-transform: translateX(-100%);
        transform: translateX(-100%);
        -webkit-animation-timing-function: ease-in;
        -moz-animation-timing-function: ease-in;
        -o-animation-timing-function: ease-in;
        animation-timing-function: ease-in;
      }
      50% {
        -webkit-transform: translateX(0%);
        -moz-transform: translateX(0%);
        -o-transform: translateX(0%);
        transform: translateX(0%);
      }
    }
    @keyframes ball-newton-cradle-right {
      50% {
        -webkit-transform: translateX(0%);
        -moz-transform: translateX(0%);
        -o-transform: translateX(0%);
        transform: translateX(0%);
      }
      75% {
        -webkit-transform: translateX(100%);
        -moz-transform: translateX(100%);
        -o-transform: translateX(100%);
        transform: translateX(100%);
        -webkit-animation-timing-function: ease-in;
        -moz-animation-timing-function: ease-in;
        -o-animation-timing-function: ease-in;
        animation-timing-function: ease-in;
      }
      100% {
        -webkit-transform: translateX(0%);
        -moz-transform: translateX(0%);
        -o-transform: translateX(0%);
        transform: translateX(0%);
      }
    }
  }
</style>