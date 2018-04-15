class Utils {
    changeCameraPosition(currCamera, targetCamera, target, duration, fn = null) {
        let currPos = currCamera.position
        let targetPos = targetCamera.position
        let pos = new THREE.Vector3()
        let t = 0, per
        return function (dt) {
            t += dt
            per = t / duration
            if (per >= 1) per = 1
            pos.x = currPos.x + (targetPos.x - currPos.x) * per
            pos.y = currPos.y + (targetPos.y - currPos.y) * per
            pos.z = currPos.z + (targetPos.z - currPos.z) * per
            currCamera.lookAt(target.position)
            if (per >= 1) {
                fn && fn()
            }
        }
    }

    tweenAnimate(property, property2, duration, fn = null) {
        let tw = new TWEEN.Tween(property)
            .to(property2, duration)
            .onUpdate(function () {

            })
            .onComplete(function () {
                fn && fn()
            })
            .start()
        return new Promise(resolve => resolve)
    }

    randomInt(min, max) {
        if (min > max) return
        return min + ~~((max - min) * Math.random())
    }
}

let utils = new Utils()

