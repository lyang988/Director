/* 
	 all problems must use some combination of forEach, map, reduce or filter
*/

// ----------------------------
//   Q.1 
//
// Assuming that x_0 is a 4-D physics vector as defined below, use one of the functions (forEach, map, etc.)  
//  that computes the overall magnitude of the vector

var x_0 = [ 0.91,  4.31,  2.10,  0.07] ;
// => return value must be a single scalar
function findMag(vec){
    function square(total,elem){
        total += Math.pow(elem,2);
        return total;
    }
    var squared = vec.reduce(square,0);
    var mag = Math.pow(squared,.5);
    return mag;
}
console.log(findMag(x_0));
// ----------------------------
//   Q.2 
//
// Assuming that x is an array of rows of 4-D vectors (as defined below), use some combination of
//  one (forEach, map, reduce, filter) to compute the magnitude vector of each row.
//
// => the result should be an array with 12 elements (i.e. result is an array with one result for each row)

var x = [
   [ 0.91,  4.31,  2.10,  0.07],
   [-1.80, -5.88, -6.16, -0.79],
   [ 1.47, -0.59, -1.06, -5.25],
   [ 2.22, -3.62, -2.47, -0.86],
   [ 5.14,  8.72, -4.73, -2.49],
   [-0.58,  2.48,  1.52, -2.94],
   [-6.42,  4.14,  0.85, -3.47],
   [-2.52, -3.17,  0.10, -1.60],
   [ 4.06, -1.41, -4.00, -6.01],
   [-3.22, -0.82,  3.38,  2.89],
   [ 2.88,  3.30,  1.05,  1.56],
   [ 0.37, -0.83, -0.90, -0.06]
]
var q2result = x.map(findMag);
console.log(q2result);
// ----------------------------
//   Q.3 
//
// Using x as defined above, define an operation that finds vectors with a magnitude 
//  greater than 8.0 - AND returns the vector, not the magnitude:
//
//  i.e.
//    - compute the magnitude vector for each row as defined in Q.2
//    - return only original vectors that pass the test 
//  
// => the result should be an array with N elements, where each element one of the size 4 physics vectors
function greaterthan8(elem){
    if(findMag(elem)>8)
        return true;
    return false;
}
console.log(x.filter(greaterthan8));

// ----------------------------
//   Q.4
//
// Using x as defined above, define an operation that produces an object that contains the magnitude 
// of the largest and smallest vectors as keyed values. The output should look like:
// { max : 12.7 , min : 0.04 }
function small(small,elem){
        if(findMag(elem)<small)
            small = findMag(elem);
        return small;
}
function large(large,elem){
        if(findMag(elem)>large)
            large = findMag(elem);
        return large;
}
function minmax(minmax,elem){
    if(findMag(elem)>minmax[1])
            minmax[1] = findMag(elem);
    if(findMag(elem)<minmax[2])
            minmax[2] = findMag(elem);
    return minmax;
}
var temp = x.reduce(minmax,{1:findMag(x[1]),2:findMag(x[1])});
console.log({"max": temp[1],
             "min": temp[2]});
console.log({"max": x.reduce(large,findMag(x[1])),
             "min": x.reduce(small,findMag(x[1]))});
// ----------------------------
//   Q.5
//
// Using x as defined above, define an operation that produces an output array 
//  that only contains vectors whose magnitude is within the bounds of a parameters object.
//  
//   Run twice using the following objects to assist the operation:
		 var params = {'low' : 4.5, 'high' : 8.0 };
//		 var params = {'low' : 5.0, 'high' : 6.0 };
//
// => the result should be an array with N elements, where each element one of the size 4 physics vectors
function betweenParams(elem){
    if(findMag(elem)>this['low'] && findMag(elem)<this['high'])
        return true;
}
console.log(x.filter(betweenParams,params));
// ----------------------------
//   Q.6 
//
// Define a function that takes two arguments: 
//  1) an array of vectors of form similar to x
//  2) params, of the form defined in Q.5
//
// => return only vectors whose value are within the bounds of params (similar to Q.5)

// ----------------------------
//   Q.7 
//
// Define a function that:
//  - reads an array of vectors from an external text file: 
//  - computes the maximum and minimum vectors as defined in Q.4
//  - prints the result to the console AND writes the output to a file named out.txt
function readFile(elem){
var fs = require('fs')
fs.readFile(elem, function(e,d) {
    var statesStr = d.toString();
    var StatesArr = JSON.parse(statesStr);
    console.log(StatesArr);
    return StatesArr;
})
}
