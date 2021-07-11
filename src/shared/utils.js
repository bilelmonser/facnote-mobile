import R from 'ramda';

export const getMaxArrayValue = (array) => {
    return maximum(array.map((x) => x.value || 0));
  };
  
  function maximum(items) {
    return R.reduce(R.max, -Infinity, items);
  }
  
 export const getMinArrayValue = (array) => {
    return minimum(array.map((x) => x.value || 0));
  };
  
  function minimum(items) {
    return R.reduce(R.min, Infinity, items);
  }
  export function thousandSeparator(n, sep) {

    function reverse(text) {
      
        return text.split('').reverse().join('');
    }

    var rx = /(\d{3}(?!.*\.|$))/g;

    if (!sep) {
        sep = ' ';
    }
    if(typeof n == "undefined")
      return '0'
    return reverse(reverse(n.toString()).replace(rx, '$1' + sep));

}