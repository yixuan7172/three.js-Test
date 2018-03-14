# The Book of Shaders 学习笔记

### step
* step(x,y) 插值函数需要输入两个参数。x是极限或阀值，y是我们想要检测或通过的值。对任何小于x的值，返回 0.0，大于x，则返回 1.0。
* ![](https://github.com/yixuan7172/three.js-test/blob/master/shaders/imgs/step.png?raw=true)

###  smoothstep
* smoothstep(x,y,z),x、y：范围的上下限。x < z < y，则执行0~1之间的平滑埃尔米特差值。如果x >= y，结果是未定义的。
*![](https://github.com/yixuan7172/three.js-test/blob/master/shaders/imgs/smoothstep.png?raw=true)

### mod 取余
* mod(x,y) 返回 x - y * floor(x / y);

### fract 返回小数部分
* fract(x) 返回 x - floor(x)

### sign 取正负号
* sign(x) Returns 1.0 if x > 0;  0.0 if x = 0,or –1.0 if x < 0.

### clamp 限制值
* clamp(x,min,max) 把x限制在min和max之间。

### mix 以百分比混合
* mix(x,y,a) 返回 x*(1-a)+y*a

### length 返回长度
* length(x) 返回矢量x的长度 Sqrt(x[0]*x[0]+x[1]*x[1]…)




## 造型函数进阶
1. 多项式造型函数（Polynomial Shaping Functions）: www.flong.com/texts/code/shapers_poly

2. 指数造型函数（Exponential Shaping Functions）: www.flong.com/texts/code/shapers_exp

3. 圆与椭圆的造型函数（Circular & Elliptical Shaping Functions）: www.flong.com/texts/code/shapers_circ

4. 贝塞尔和其他参数化造型函数（Bezier and Other Parametric Shaping Functions）: www.flong.com/texts/code/shapers_bez

5. 一套有用的函数 http://www.iquilezles.org/www/articles/functions/functions.htm

* 函数公式表：![函数公示表](https://github.com/yixuan7172/three.js-test/blob/master/shaders/imgs/func.png?raw=true)



