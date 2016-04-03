var almostEqual = require('almost-equal')

var ops = [
  {
    name: 'sum',
    check: function (a, b) { return a - b },
    apply: function (b, f, t) { return b + (f * t) }
  }, {
    name: 'multiply',
    check: function (a, b) { return a / b },
    apply: function (b, f, t) { return b * Math.pow(f, t) }
  }, {
    name: 'nothing',
    check: function () { return true },
    apply: function (b, f, t) { return b }
  }
]

function valueAtIndex (values, index) {
  return compile(values).atIndex(index)
}

function compile (values) {
  var op
  var factor

  for (var i = 0; i < ops.length; i++) {
    op = ops[i]
    factor = tryOp(op, values)
    if (factor) {
      break
    }
  }

  return {
    atIndex: function (index) {
      var relValue = values[(index - 1) % values.length]
      var times = values.length * (Math.floor((index - 1) / values.length) + 1)
      return this._op.apply(relValue, factor, times)
    },
    _op: op,
    operation: op.name,
    factor: factor
  }
}

function tryOp (op, values) {
  var potentialFactor = op.check(values[1], values[0])
  if (isNaN(potentialFactor)) return null

  for (var i = 2; i < values.length; i++) {
    var newFactor = op.check(values[i], values[i - 1])
    if (!almostEqual(potentialFactor, newFactor)) {
      return null
    }
  }

  return potentialFactor
}

module.exports = valueAtIndex
module.exports.compile = compile
