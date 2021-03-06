var almostEqual = require('almost-equal')
var tap = require('tap')
var s = require('.')

tap.equal(s.compile([2505, 5010]).operation, 'sum')
tap.equal(s.compile([2, 4, 6]).operation, 'sum')
tap.equal(s.compile([2, 4, 8]).operation, 'multiply')
tap.equal(s.compile([5010, 5009, 5008]).operation, 'sum')
tap.equal(s.compile([5010, 5011, 5012]).operation, 'sum')
tap.equal(s.compile([80, 40, 20, 10, 5, 2.5]).operation, 'multiply')
tap.equal(s.compile([5010]).operation, 'nothing')

tap.equal(s.compile([118, 119]).factor, 1)
tap.equal(s.compile([10, 119]).factor, 109)
tap.equal(s.compile([10, -100, 1000]).factor, -10)
tap.equal(s.compile([10, 1 / 10, 1 / 1000]).factor, 1 / 100)
tap.equal(s.compile([-2, 6, -18]).factor, -3)

tap.equal(s([1, 2, 3], 1), 4)
tap.equal(s([-2, 0, 2, 4], 2), 8)
tap.equal(s(['qwe', 'asd'], 2), 'asd')
tap.equal(s(['qwe', 'asd'], 7), 'qwe')
tap.equal(s([0, 77, 11, 18, -28], 7), 77)
tap.equal(s([-2, 6, -18], 1), 54)
tap.equal(s([-2, 6, -18], 2), -162)
tap.equal(s([-2, 6, -18], 3), 486)
tap.equal(s([-2, 6, -18], 4), -1458)
tap.equal(s([-2, 6, -18], 6), -13122)
tap.assert(almostEqual(s([10, 1 / 10, 1 / 1000], 3), 1 / 1000000000))
