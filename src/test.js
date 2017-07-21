var arr = [1, 2, [12, 3, [5]], 6];
var arr1 = [];
function modeArr(array) {
    for (var i = 0; i < array.length; i++) {
        if (typeof(array[i]) == 'object') {
         modeArr(array[i])
        } else {
            arr1.push(array[i])
        }
    }

}
console.log(arr)

modeArr(arr)
console.log(arr1)