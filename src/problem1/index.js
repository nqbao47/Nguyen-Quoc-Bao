/**
 * Provide 3 unique implementations of the following function in JavaScript.
 * Input**: `n` - any integer
 * Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`*.
 * Output**: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`.
 *
 **/

/**
 * MATHEMATICS WAY
 * n * (n + 1) /2
 * */
var sum_to_n_a = function (n) {
  if (n <= 0) {
    return 0;
  } else {
    return (n * (n + 1)) / 2;
  }
};
console.log(sum_to_n_a(6));

/**
 * SIMPLE LOOP WAY
 * Iteratively summing from 1 to n
 */
var sum_to_n_b = function (n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};
console.log(sum_to_n_b(6));

/**
 * RECURSIVE WAY
 * Stop conditions: n <= 0
 * Recursive: n + (RECURSIVE(n-1))
 */
var sum_to_n_c = function (n) {
  if (n <= 0) return 0;
  return n + sum_to_n_c(n - 1);
};
console.log(sum_to_n_c(6));
