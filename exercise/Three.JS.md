# Three.js 记录
  * 依赖three.js的脚本，必须放在three.js之后
  ## Renderer
    * renderer.shadowMap.type = THREE.PCFShadowMap 阴影映射类型

  ## light
    * light.bias 减少阴影偏差

  ## DDSLoader


  ## TrackballControls
    * staticMoving 阻尼开关，true表示关闭
    * dynamicDampingFactor 阻尼，值越小，惯性越大

  ## texture
    * needsUpdate  当设置为true时,标记文理已经更新。
    * format 像素数据的颜色格式,默认为THREE.RGBAFormat。还有以下可选参数：THREE.AlphaFormat，THREE.RGBFormat，THREE.LuminanceFormat，THREE.LuminanceAlphaFormat。
   # ![format.png](https://raw.githubusercontent.com/yixuan7172/three.js-test/master/exercise/imgs/format.png)

    ### minFilter 和 magFilter  纹理缩小或放大时的过滤方式 </br>
      THREE.NearestFilter:最邻进过滤，将纹理上最近的像素应用于面上。放大时，会导致方块化；缩小时，会丢失细节。
      THREE.LinearFilter:线性过滤，最终的颜色由周围四个像素值来决定。虽然在缩小时会丢失部分细节，但在放大时会平滑很多。</br>
      THREE.NearestMipMapNearestFilter:选择最邻近的mip层，并执行THREE.NearestFilter。虽然放大时会有方块化，但缩小时会好很多。</br>
      THREE.NearestMipMapLinearFilter:选择最邻近的两个mip层，分别执行THREE.NearestFilter获取两个中间值，再传到THREE.LinearFilter获取最终值。</br>
      

    * anisotropy  各向异性过滤，让纹理的效果更好，但会消耗更多的内存、CPU、GPU。
    * mapping  映射模式,有THREE.UVMapping平展映射,THREE.CubeReflectionMapping 立方体反射映射,THREE.CubeRefractionMapping立方体折射映射,THREE.SphericalReflectionMapping球面反射映射,THREE.SphericalRefractionMapping球面折射映射。
    * mipmap   在三维世界中,显示一张图的大小与摄象机的位置有关,近的地方,图片实际象素就大一些,远的地方图片实际象
              	   素就会小一些,就要进行一些压缩,例如一张64*64的图,在近处,显示出来可能是50*50,在远处可能显示出来是20*20.
                     如果只限于简单的支掉某些像素,将会使缩小后的图片损失很多细节,图片变得很粗糙,因此,图形学有很多复杂的方
                     法来处理缩小图片的问题,使得缩小后的图片依然清晰,然而,这些计算都会耗费一定的时间。

                     Mipmap纹理技术是目前解决纹理分辨率与视点距离关系的最有效途径,它会先将图片压缩成很多逐渐缩小的图片,
                     例如一张64*64的图片,会产生64*64,32*32,16*16,8*8,4*4,2*2,1*1的7张图片,当屏幕上需要绘制像素点为20*20 时，
                     程序只是利用 32*32 和 16*16 这两张图片来计算出即将显示为 20*20 大小的一个图片，这比单独利用 32*32 的
                     那张原始片计算出来的图片效果要好得多，速度也更快。
    * wrapS、wrapsT  S、T方向覆盖模式,默认为THREE.ClampToEdgeWrapping,(夹取),超过1.0的值被固定为1.0。超过1.0的其它地方的纹理，沿用最后像素的纹理。用于当叠加过滤时，需要从0.0到1.0精确覆盖且没有模糊边界的纹理。
                     还有THREE.RepeatWrapping(重复)和THREE.MirroredRepeatWrapping(镜像).
  ## material
    * map 普通贴图
    * envMap 环境贴图
    * lightMap 光照贴图
    * specularMap 高光贴图
    * alphaMap 透明通道贴图

    * depthTest  深度测试,默认为true,如果设置为false,在场景中远处的对象不被近处的对象遮挡
    * depthWrite  允许或禁止向深度缓冲区写入数据,默认为true,指定是否允许向深度缓冲区写入数据。
    * polygonOffset 多边形位移,当两个面共面时,会出现十分难看的z - fighting 问题,要解决此问题可以使用, Polygon Offset.
    * alphaTest  alpha测试,取值范围0.0-1.0
    * overdraw  当三角面之间产生间距,发生图形走样时,填充像素,确保图形保真,消除走样.通常取值范围在0.0=1.0之间
    * needsUpdate  设置该值为true后，如果材质发生改变，就会使用新的材质刷新它的缓存。

  ## geometry
    * vertices  Geometry对象顶点位置存放在vertices属性中，若要更新this.vertices属性,需要将 Geometry.verticesNeedUpdat设置为true。
    * faces  将Geometry对象的三角面存放在faces属性中，如果要更新this.faces属性,需要将Geometry.elementsNeedUpdate 设置为true。
    * faceVertexUvs 二维数组，将Geometry对象的三角面的uv层存放在this.faceVertexUvs属性中，如果要更新this.faceVertexUvs的值,需要将Geometry.uvsNeedUpdate属性设置为true。
    * colors  根据索引的顺序一对一的保存顶点颜色,用于点和线，如果要更新this.colors属性需要将Geometry.colorsNeedUpdate设置为true。
    * materialIndex  材质索引号


