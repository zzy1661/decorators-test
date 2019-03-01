let map = new Map()
// let map = new WeakMap()
var obj;
(function() {
    var kObj = {};
    obj = kObj;
    map.set(obj,'some info')
    console.log(map)
})()
console.log(map)
