<template>
  <div class="app">
    <div class="container" ref="container"></div>
  </div>
</template>

<script>
// import * as THREE  from '../js/libs/three.js'
// window.THREE = THREE
// let OrbitControls  = require('../js/libs/OrbitControls.js')
import Game from '../js/game'
import Bus from '../js/bus'
import {EVE} from '../js/Utils'
export default {
  name: 'app',
  data () {
    return {
      game:null
    }
  },
  created(){
    console.log('AppPage has been loaded!');
    document.ontouchmove = e=>e.preventDefault()
  },
  mounted(){
    this.game = new Game() //game脚本加载在App之前，所以在这里实例化
  }
}
</script>

<style>
.app{
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
