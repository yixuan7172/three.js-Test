# Three.js 记录
  * 依赖three.js的脚本，必须放在three.js之后
  ## WebGLRenderer
    * renderer.shadowMap.type:
        * THREE.PCFShadowMap:默认阴影映射类型。
        * THREE.PCFSoftShadowMap:让边缘柔和。
    * autoClear:在渲染之前是否清除输出。
    * setFaceCulling() 渲染器剔除模式
    * autoClear:定义渲染器在呈现帧之前是否应该自动清除它的输出。
    * clearDepth()：清除深度缓冲
    * clear():告诉渲染器清除它的颜色、深度或模板绘制缓冲区。该方法将颜色缓冲区初始化为当前清晰的颜色值。参数默认为true。
    * copyFramebufferToTexture：将当前WebGLFramebuffer的像素复制到2D纹理中。

## light
   * 能够创建阴影的光源：
        1. SpotLight
        2. DirectionalLight
   * HemisphereLight：模拟反光面和光线微弱的天空来创建更自然的室外光线。
   * LensFlare：为场景中的光源添加镜头光晕效果。
   * light.bias 减少阴影偏差

## DDSLoader


## TrackballControls
   * staticMoving 阻尼开关，true表示关闭
   * dynamicDampingFactor 阻尼，值越小，惯性越大

## texture
   * needsUpdate  当设置为true时,标记文理已经更新。
   * format   像素数据的颜色格式,默认为THREE.RGBAFormat。还有以下可选参数：THREE.AlphaFormat，THREE.RGBFormat，
             THREE.LuminanceFormat，THREE.LuminanceAlphaFormat。
   * ![format.png](https://raw.githubusercontent.com/yixuan7172/three.js-test/master/exercise/imgs/format.png)

### minFilter 和 magFilter  纹理缩小或放大时的过滤方式
   * THREE.NearestFilter:最邻进过滤，将纹理上最近的像素应用于面上。放大时，会导致方块化；缩小时，会丢失细节。
   * THREE.LinearFilter:线性过滤，最终的颜色由周围四个像素值来决定。虽然在缩小时会丢失部分细节，但在放大时会平滑很多。
   * THREE.NearestMipMapNearestFilter:选择最邻近的mip层，并执行THREE.NearestFilter。虽然放大时会有方块化，但缩小时会好很多。
   * THREE.NearestMipMapLinearFilter:选择最邻近的两个mip层，分别执行THREE.NearestFilter获取两个中间值，
                                       再传到THREE.LinearFilter获取最终值。
   * THREE.LinearMipMapNearestFilter:选择最临近的mip层，并执行THREE.LinearFilter。
   * THREE.LinearMipMapLinearFilter:   选择最邻近的两个mip层，分别执行THREE.LinearFilter获取两个中间值，
                                      再传到THREE.LinearFilter获取最终值。

   * anisotropy  各向异性过滤，让纹理的效果更好，但会消耗更多的内存、CPU、GPU。
   * mapping    映射模式,有THREE.UVMapping 默认的，平展(u,v坐标)映射。
                           THREE.CubeReflectionMapping CubeTexture的默认设置，立方体反射映射,
                           THREE.CubeRefractionMapping 立方体折射映射,{两个cubeMapping由6个纹理组成}。
                           THREE.SphericalReflectionMapping 球面反射映射,
                           THREE.SphericalRefractionMapping 球面折射映射。
                           THREE.EquirectangularReflectionMapping，
                           THREE.EquirectangularRefractionMapping。

    
   * mipmap    在三维世界中,显示一张图的大小与摄象机的位置有关,近的地方,图片实际象素就大一些,远的地方图片实际像素就会小一些,就要进行一些压缩,
              例如一张64*64的图,在近处,显示出来可能是50*50,在远处可能显示出来是20*20。
                如果只限于简单的支掉某些像素,将会使缩小后的图片损失很多细节,图片变得很粗糙,因此,图形学有很多复杂的方法来处理缩小图片的问题,
              使得缩小后的图片依然清晰,然而,这些计算都会耗费一定的时间。
                Mipmap纹理技术是目前解决纹理分辨率与视点距离关系的最有效途径,它会先将图片压缩成很多逐渐缩小的图片,例如一张64*64的图片,
              会产生64*64,32*32,16*16,8*8,4*4,2*2,1*1的7张图片,当屏幕上需要绘制像素点为20*20 时，程序只是利用 32*32 和 16*16
              这两张图片来计算出即将显示为 20*20 大小的一个图片，这比单独利用 32*32 的那张原始片计算出来的图片效果要好得多，速度也更快。

   * wrapS、wrapsT    S、T方向覆盖模式,默认为THREE.ClampToEdgeWrapping,(夹取),超过1.0的值被固定为1.0。超过1.0的其它地方的纹理，沿用最后像                     素的纹理。用于当叠加过滤时，需要从0.0到1.0精确覆盖且没有模糊边界的纹理。
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
   * alphaTest  alpha测试,取值范围0.0-1.0，如果某个像素的alpha值小于该值，那么该像素不会显示出来。可以使用这个属性移除一些与透明相关的毛边。
   * overdraw  当三角面之间产生间距,发生图形走样时,填充像素,确保图形保真,消除走样.通常取值范围在0.0=1.0之间
   * needsUpdate  设置该值为true后，如果材质发生改变，就会使用新的材质刷新它的缓存。

    * MeshStandardMaterial -> roughness:粗糙度

## geometry
   * vertices  Geometry对象顶点位置存放在vertices属性中，若要更新this.vertices属性,需要将 Geometry.verticesNeedUpdat设置为true。
   * faces  将Geometry对象的三角面存放在faces属性中，如果要更新this.faces属性,需要将Geometry.elementsNeedUpdate 设置为true。
   * faceVertexUvs 二维数组，将Geometry对象的三角面的uv层存放在this.faceVertexUvs属性中，如果要更新this.faceVertexUvs的值,需要将Geometry.uvsNeedUpdate属性设置为true。
   * colors  根据索引的顺序一对一的保存顶点颜色,用于点和线，如果要更新this.colors属性需要将Geometry.colorsNeedUpdate设置为true。
   * materialIndex  材质索引号
   * merge操作：
        ~~~js
        let plane = new THREE.Mesh(new THREE.PlaneGeometry(64, 64)),
            copyGeo = new THREE.Geometry(),
            geometry = new THREE.Geometry()
        plane.updateMatrix()
        copyGeo.copy(plane.geometry)
        copyGeo.applyMatrix(plane.matrix)
        geometry.merge(copyGeo) //merge
        ~~~


