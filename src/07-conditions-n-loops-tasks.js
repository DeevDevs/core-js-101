/* *************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling  *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration              *
 *                                                                                                *
 ************************************************************************************************ */

/**
 * Returns the 'Fizz','Buzz' or an original number using the following rules:
 * 1) return original number
 * 2) but if number multiples of three return 'Fizz'
 * 3) for the multiples of five return 'Buzz'
 * 4) for numbers which are multiples of both three and five return 'FizzBuzz'
 *
 * @param {number} num
 * @return {any}
 *
 * @example
 *   2 =>  2
 *   3 => 'Fizz'
 *   5 => 'Buzz'
 *   4 => 4
 *  15 => 'FizzBuzz'
 *  20 => 'Buzz'
 *  21 => 'Fizz'
 *
 */
function getFizzBuzz(num) {
  let value;
  if (num % 3 === 0 && num % 5 === 0) {
    value = 'FizzBuzz';
    return value;
  }
  if (num % 3 === 0) {
    value = 'Fizz';
    return value;
  }
  if (num % 5 === 0) {
    value = 'Buzz';
    return value;
  }
  return num;
}

/**
 * Returns the factorial of the specified integer n.
 *
 * @param {number} n
 * @return {number}
 *
 * @example:
 *   1  => 1
 *   5  => 120
 *   10 => 3628800
 */
function getFactorial(n) {
  let total = 1;
  function factorial(num) {
    if (num < 1) return total;
    total *= num;
    return factorial(num - 1);
  }
  return factorial(n);
}

/**
 * Returns the sum of integer numbers between n1 and n2 (inclusive).
 *
 * @param {number} n1
 * @param {number} n2
 * @return {number}
 *
 * @example:
 *   1,2   =>  3  ( = 1+2 )
 *   5,10  =>  45 ( = 5+6+7+8+9+10 )
 *   -1,1  =>  0  ( = -1 + 0 + 1 )
 */
function getSumBetweenNumbers(n1, n2) {
  let total = 0;
  for (let i = n1; i <= n2; i += 1) {
    total += i;
  }
  return total;
}

/**
 * Returns true, if a triangle can be built with the specified sides a, b, c
 * and false in any other ways.
 *
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {bool}
 *
 * @example:
 *   1,2,3    =>  false
 *   3,4,5    =>  true
 *   10,1,1   =>  false
 *   10,10,10 =>  true
 */
function isTriangle(a, b, c) {
  return a + b > c && b + c > a && a + c > b;
}

/**
 * Returns true, if two specified axis-aligned rectangles overlap, otherwise false.
 * Each rectangle representing by object
 *  {
 *     top: 5,
 *     left: 5,
 *     width: 20,
 *     height: 10
 *  }
 *
 *  (5;5)
 *     -------------
 *     |           |
 *     |           |  height = 10
 *     -------------
 *        width=20
 *
 * NOTE: Please use canvas coordinate space (https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes#The_grid),
 * it differs from Cartesian coordinate system.
 *
 * @param {object} rect1
 * @param {object} rect2
 * @return {bool}
 *
 * @example:
 *   { top: 0, left: 0, width: 10, height: 10 },
 *   { top: 5, left: 5, width: 20, height: 20 }    =>  true
 *
 *   { top: 0, left: 0, width: 10, height: 10 },
 *   { top:20, left:20, width: 20, height: 20 }    =>  false
 *
 */
function doRectanglesOverlap(rect1, rect2) {
  let verticallyOverlap = true;
  if (rect2.top > rect1.top) {
    verticallyOverlap = rect1.top + rect1.height > rect2.top;
  }
  if (rect1.top > rect2.top) {
    verticallyOverlap = rect2.top + rect2.height > rect1.top;
  }
  let horizontallyOverlap = true;
  if (rect2.left > rect1.left) {
    horizontallyOverlap = rect1.left + rect1.width > rect2.left;
  }
  if (rect1.left > rect2.left) {
    horizontallyOverlap = rect2.left + rect2.width > rect1.left;
  }
  return verticallyOverlap && horizontallyOverlap;
}

/**
 * Returns true, if point lies inside the circle, otherwise false.
 * Circle is an object of
 *  {
 *     center: {
 *       x: 5,
 *       y: 5
 *     },
 *     radius: 20
 *  }
 *
 * Point is object of
 *  {
 *     x: 5,
 *     y: 5
 *  }
 *
 * @param {object} circle
 * @param {object} point
 * @return {bool}
 *
 * @example:
 *   { center: { x:0, y:0 }, radius:10 },  { x:0, y:0 }     => true
 *   { center: { x:0, y:0 }, radius:10 },  { x:10, y:10 }   => false
 *
 */
function isInsideCircle(/* circle, point */) {
  throw new Error('Not implemented');
  // const hR = [circle.center.x - circle.radius, circle.center.x + circle.radius];
  // const vR = [circle.center.y - circle.radius, circle.center.y + circle.radius];
  // return (
  //   hR[0] < point.x && hR[1] > point.x && vR[0] < point.y && vR[1] > point.y
  // );
}

/**
 * Returns the first non repeated char in the specified strings otherwise returns null.
 *
 * @param {string} str
 * @return {string}
 *
 * @example:
 *   'The quick brown fox jumps over the lazy dog' => 'T'
 *   'abracadabra'  => 'c'
 *   'entente' => null
 */
function findFirstSingleChar(str) {
  let foundChar = null;
  for (let i = 0; i < str.length; i += 1) {
    const instances = [];
    const thisChar = str[i];
    for (let j = 0; j < str.length; j += 1) {
      if (str[j] === thisChar) instances.push(thisChar);
    }
    if (instances.length === 1) {
      foundChar = thisChar;
      break;
    }
  }
  return foundChar;
}

/**
 * Returns the string representation of math interval,
 * specified by two points and include / exclude flags.
 * See the details: https://en.wikipedia.org/wiki/Interval_(mathematics)
 *
 * Please take attention, that the smaller number should be the first in the notation
 *
 * @param {number} a
 * @param {number} b
 * @param {bool} isStartIncluded
 * @param {bool} isEndIncluded
 * @return {string}
 *
 * @example
 *   0, 1, true, true   => '[0, 1]'
 *   0, 1, true, false  => '[0, 1)'
 *   0, 1, false, true  => '(0, 1]'
 *   0, 1, false, false => '(0, 1)'
 * Smaller number has to be first :
 *   5, 3, true, true   => '[3, 5]'
 *
 */
function getIntervalString(a, b, isStartIncluded, isEndIncluded) {
  return `${isStartIncluded ? '[' : '('}${a < b ? `${a}, ${b}` : `${b}, ${a}`}${
    isEndIncluded ? ']' : ')'
  }`;
}

/**
 * Reverse the specified string (put all chars in reverse order)
 *
 * @param {string} str
 * @return {string}
 *
 * @example:
 * 'The quick brown fox jumps over the lazy dog' => 'god yzal eht revo spmuj xof nworb kciuq ehT'
 * 'abracadabra' => 'arbadacarba'
 * 'rotator' => 'rotator'
 * 'noon' => 'noon'
 */
function reverseString(str) {
  return str.split('').reverse().join('');
}

/**
 * Reverse the specified integer number (put all digits in reverse order)
 *
 * @param {number} num
 * @return {number}
 *
 * @example:
 *   12345 => 54321
 *   1111  => 1111
 *   87354 => 45378
 *   34143 => 34143
 */
function reverseInteger(num) {
  return Number(num.toString().split('').reverse().join(''));
}

/**
 * Validates the CCN (credit card number) and return true if CCN is valid
 * and false otherwise.
 *
 * See algorithm here : https://en.wikipedia.org/wiki/Luhn_algorithm
 *
 * @param {number} cnn
 * @return {boolean}
 *
 * @example:
 *   79927398713      => true
 *   4012888888881881 => true
 *   5123456789012346 => true
 *   378282246310005  => true
 *   371449635398431  => true
 *
 *   4571234567890111 => false
 *   5436468789016589 => false
 *   4916123456789012 => false
 */
function isCreditCardNumber(ccn) {
  const numberToValidate = +ccn
    .toString()
    .split('')
    .splice(ccn.toString().length - 1, 1)[0];
  const arrayToWorkWith = ccn.toString().slice(0, ccn.toString().length - 1);
  const multiplied = arrayToWorkWith
    .split('')
    .reverse()
    .map((strNum, index) => (index === 0 || index % 2 === 0 ? +strNum * 2 : +strNum));
  const multipliedToVerify = multiplied
    .map((num) => (num.toString().length > 1
      ? num
        .toString()
        .split('')
        .reduce((sum, numb) => {
          const value = sum + +numb;
          return value;
        }, 0)
      : +num))
    .reduce((summ, numbe) => {
      const finalVal = summ + +numbe;
      return finalVal;
    }, 0);
  const finalValue = (10 - (multipliedToVerify % 10)) % 10;
  return finalValue === numberToValidate;
}
/**
 * Returns the digital root of integer:
 *   step1 : find sum of all digits
 *   step2 : if sum > 9 then goto step1 otherwise return the sum
 *
 * @param {number} n
 * @return {number}
 *
 * @example:
 *   12345 ( 1+2+3+4+5 = 15, 1+5 = 6) => 6
 *   23456 ( 2+3+4+5+6 = 20, 2+0 = 2) => 2
 *   10000 ( 1+0+0+0+0 = 1 ) => 1
 *   165536 (1+6+5+5+3+6 = 26,  2+6 = 8) => 8
 */
function getDigitalRoot(num) {
  function getRoot(numb) {
    const newNum = numb
      .toString()
      .split('')
      .reduce((sum, numbe) => {
        const value = sum + +numbe;
        return value;
      }, 0);
    let isOneDigit;
    if (newNum.toString().length > 1) isOneDigit = false;
    if (newNum.toString().length === 1) isOneDigit = true;
    return isOneDigit ? newNum : getRoot(newNum);
  }
  return getRoot(num);
}

/**
 * Returns true if the specified string has the balanced brackets and false otherwise.
 * Balanced means that is, whether it consists entirely of pairs of opening/closing brackets
 * (in that order), none of which mis-nest.
 * Brackets include [],(),{},<>
 *
 * @param {string} str
 * @return {boolean}
 *
 * @example:
 *   '' => true
 *   '[]'  => true
 *   '{}'  => true
 *   '()   => true
 *   '[[]' => false
 *   ']['  => false
 *   '[[][][[]]]' => true
 *   '[[][]][' => false
 *   '{)' = false
 *   '{[(<{[]}>)]}' = true
 */
function isBracketsBalanced(str) {
  let balanced = true;
  const leftBrackets = ['[', '{', '<', '('];
  const rightBrackets = [']', '}', '>', ')'];
  if (str.length === 0) return true;
  if (str.length % 2 !== 0) return false;
  const stack = [];
  str.split('').forEach((bracket) => {
    if (balanced === false) return;
    if (leftBrackets.includes(bracket)) {
      stack.push(bracket);
      return;
    }
    if (rightBrackets.includes(bracket)) {
      const indexOfRightBracket = rightBrackets.indexOf(bracket);
      const stackedBracket = stack.pop();
      const indexOfLeftBracket = leftBrackets.indexOf(stackedBracket);
      if (indexOfRightBracket === indexOfLeftBracket) return;
      if (indexOfRightBracket !== indexOfLeftBracket) {
        balanced = false;
      }
    }
  });
  return balanced;
}

/**
 * Returns the string with n-ary (binary, ternary, etc, where n <= 10)
 * representation of specified number.
 * See more about
 * https://en.wikipedia.org/wiki/Binary_number
 * https://en.wikipedia.org/wiki/Ternary_numeral_system
 * https://en.wikipedia.org/wiki/Radix
 *
 * @param {number} num
 * @param {number} n, radix of the result
 * @return {string}
 *
 * @example:
 *   1024, 2  => '10000000000'
 *   6561, 3  => '100000000'
 *    365, 2  => '101101101'
 *    365, 3  => '111112'
 *    365, 4  => '11231'
 *    365, 10 => '365'
 */
function toNaryString(num, n) {
  return num.toString(n);
}

/**
 * Returns the common directory path for specified array of full filenames.
 *
 * @param {array} pathes
 * @return {string}
 *
 * @example:
 *   ['/web/images/image1.png', '/web/images/image2.png']  => '/web/images/'
 *   ['/web/assets/style.css', '/web/scripts/app.js',  'home/setting.conf'] => ''
 *   ['/web/assets/style.css', '/.bin/mocha',  '/read.me'] => '/'
 *   ['/web/favicon.ico', '/web-scripts/dump', '/verbalizer/logs'] => '/'
 */
function getCommonDirectoryPath(pathes) {
  const arrOfArrays = pathes.map((str) => str.split('/'));
  if (arrOfArrays.some((arr) => arr[0] !== '')) return '';
  const minLength = arrOfArrays.reduce(
    (minL, array) => (minL > array.length ? array.length : minL),
    1000,
  );
  const finalArr = [];
  for (let i = 0; i < minLength; i += 1) {
    if (arrOfArrays.every((arr) => arr[i] === arrOfArrays[0][i])) finalArr.push(arrOfArrays[0][i]);
  }
  return `${finalArr.join('/')}/`;
}

/**
 * Returns the product of two specified matrixes.
 * See details: https://en.wikipedia.org/wiki/Matrix_multiplication
 *
 * @param {array} m1
 * @param {array} m2
 * @return {array}
 *
 * @example:
 *   [[ 1, 0, 0 ],       [[ 1, 2, 3 ],           [[ 1, 2, 3 ],
 *    [ 0, 1, 0 ],   X    [ 4, 5, 6 ],     =>     [ 4, 5, 6 ],
 *    [ 0, 0, 1 ]]        [ 7, 8, 9 ]]            [ 7, 8, 9 ]]
 *
 *                        [[ 4 ],
 *   [[ 1, 2, 3]]    X     [ 5 ],          =>     [[ 32 ]]
 *                         [ 6 ]]
 *
 */
function getMatrixProduct(/* m1, m2 */) {
  throw new Error('Not implemented');
}

/**
 * Returns the evaluation of the specified tic-tac-toe position.
 * See the details: https://en.wikipedia.org/wiki/Tic-tac-toe
 *
 * Position is provides as 3x3 array with the following values: 'X','0', undefined
 * Function should return who is winner in the current position according to the game rules.
 * The result can be: 'X','0',undefined
 *
 * @param {array} position
 * @return {string}
 *
 * @example
 *
 *   [[ 'X',   ,'0' ],
 *    [    ,'X','0' ],       =>  'X'
 *    [    ,   ,'X' ]]
 *
 *   [[ '0','0','0' ],
 *    [    ,'X',    ],       =>  '0'
 *    [ 'X',   ,'X' ]]
 *
 *   [[ '0','X','0' ],
 *    [    ,'X',    ],       =>  undefined
 *    [ 'X','0','X' ]]
 *
 *   [[    ,   ,    ],
 *    [    ,   ,    ],       =>  undefined
 *    [    ,   ,    ]]
 *
 */
function evaluateTicTacToePosition(position) {
  const allLines = [];
  for (let i = 0; i <= 2; i += 1) {
    allLines.push(position[i]);
    allLines.push([position[0][i], position[1][i], position[2][i]]);
  }
  allLines.push([position[0][0], position[1][1], position[2][2]]);
  allLines.push([position[2][0], position[1][1], position[0][2]]);
  if (
    allLines.some((arr) => arr[0] === '0' && arr[1] === '0' && arr[2] === '0')
  ) return '0';
  if (
    allLines.some((arr) => arr[0] === 'X' && arr[1] === 'X' && arr[2] === 'X')
  ) return 'X';
  return undefined;
}

module.exports = {
  getFizzBuzz,
  getFactorial,
  getSumBetweenNumbers,
  isTriangle,
  doRectanglesOverlap,
  isInsideCircle,
  findFirstSingleChar,
  getIntervalString,
  reverseString,
  reverseInteger,
  isCreditCardNumber,
  getDigitalRoot,
  isBracketsBalanced,
  toNaryString,
  getCommonDirectoryPath,
  getMatrixProduct,
  evaluateTicTacToePosition,
};
