function checkAvailability(arr, val) {
return arr.some(function(arrVal) {
  return val === arrVal;
});
};