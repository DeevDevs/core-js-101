/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */

/**
 * Returns the rectangle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  const obj = {
    width,
    height,
    getArea() {
      return this.width * this.height;
    },
  };
  return obj;
}

/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  return JSON.stringify(obj);
}

/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
  const obj = JSON.parse(json);
  return Object.setPrototypeOf(obj, proto);
}

/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurrences
 *
 * All types of selectors can be combined using the combination ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string representation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

class Builder {
  constructor() {
    this.builtString = '';
    this.existingSelectors = [];
  }

  isIncorrectOrder(str, arr) {
    this.filler = 'filler';
    let value;
    if (str === 'element') {
      value = (arr.indexOf('id') >= 0
          && arr.indexOf('id') < arr.indexOf('element'))
        || (arr.indexOf('class') >= 0
          && arr.indexOf('class') < arr.indexOf('element'))
        || (arr.indexOf('attr') >= 0
          && arr.indexOf('attr') < arr.indexOf('element'))
        || (arr.indexOf('pseudoClass') >= 0
          && arr.indexOf('pseudoClass') < arr.indexOf('element'))
        || (arr.indexOf('pseudoElement') >= 0
          && arr.indexOf('pseudoElement') < arr.indexOf('element'));
    }
    if (str === 'id') {
      value = (arr.indexOf('class') >= 0
          && arr.indexOf('class') < arr.indexOf('id'))
        || (arr.indexOf('attr') >= 0 && arr.indexOf('attr') < arr.indexOf('id'))
        || (arr.indexOf('pseudoClass') >= 0
          && arr.indexOf('pseudoClass') < arr.indexOf('id'))
        || (arr.indexOf('pseudoElement') >= 0
          && arr.indexOf('pseudoElement') < arr.indexOf('id'));
    }
    if (str === 'class') {
      value = (arr.indexOf('attr') >= 0
          && arr.indexOf('attr') < arr.indexOf('class'))
        || (arr.indexOf('pseudoClass') >= 0
          && arr.indexOf('pseudoClass') < arr.indexOf('class'))
        || (arr.indexOf('pseudoElement') >= 0
          && arr.indexOf('pseudoElement') < arr.indexOf('class'));
    }
    if (str === 'attr') {
      value = (arr.indexOf('pseudoClass') >= 0
          && arr.indexOf('pseudoClass') < arr.indexOf('attr'))
        || (arr.indexOf('pseudoElement') >= 0
          && arr.indexOf('pseudoElement') < arr.indexOf('attr'));
    }
    if (str === 'pseudoClass') {
      value = arr.indexOf('pseudoElement') >= 0
        && arr.indexOf('pseudoElement') < arr.indexOf('pseudoClass');
    }
    return value;
  }

  createCheckSelector(obj, value, string) {
    this.filler = 'filler';
    const passedValue = obj.builtString;
    const { existingSelectors } = obj;
    if (
      string === 'element'
      || string === 'id'
      || string === 'pseudoElement'
    ) {
      if (existingSelectors.indexOf(string) >= 0) {
        throw new Error(
          'Element, id and pseudo-element should not occur more then one time inside the selector',
        );
      }
    }
    const toPass = new Builder();
    toPass.builtString = `${
      passedValue.length > 0 ? `${passedValue}` : ''
    }${value}`;
    toPass.existingSelectors = existingSelectors.concat([string]);
    if (obj.isIncorrectOrder(string, toPass.existingSelectors)) {
      throw new Error(
        'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element',
      );
    }
    return toPass;
  }

  element(value) {
    const passedValue = `${value}`;
    return this.createCheckSelector(this, passedValue, 'element');
  }

  id(value) {
    const passedValue = `#${value}`;
    return this.createCheckSelector(this, passedValue, 'id');
  }

  class(value) {
    const passedValue = `.${value}`;
    return this.createCheckSelector(this, passedValue, 'class');
  }

  attr(value) {
    const passedValue = `[${value}]`;
    return this.createCheckSelector(this, passedValue, 'attr');
  }

  pseudoClass(value) {
    const passedValue = `:${value}`;
    return this.createCheckSelector(this, passedValue, 'pseudoClass');
  }

  pseudoElement(value) {
    const passedValue = `::${value}`;
    return this.createCheckSelector(this, passedValue, 'pseudoElement');
  }

  combine(selector1, combinator, selector2) {
    const thisBuilt = this.builtString;
    const toPass = new Builder();
    toPass.builtString = `${thisBuilt}${selector1.builtString} ${combinator} ${selector2.builtString}`;
    return toPass;
  }

  stringify() {
    return this.builtString;
  }
}

const cssSelectorBuilder = new Builder();

module.exports = {
  Rectangle,
  getJSON,
  fromJSON,
  cssSelectorBuilder,
};
