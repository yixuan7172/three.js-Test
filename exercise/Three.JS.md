# Three.js 记录
  * 依赖three.js的脚本，必须放在three.js之后
  #Renderer
    * renderer.shadowMap.type = THREE.PCFShadowMap 阴影映射类型

  #light
    * light.bias 减少阴影偏差

  # DDSLoader
    *

  # TrackballControls
    * staticMoving 阻尼开关，true表示关闭
    * dynamicDampingFactor 阻尼，值越小，惯性越大