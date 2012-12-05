/**
 * Unit tests for the degree rotation amt calculator
 */
var degRotnCalc = require('../index');

describe('The degree rotation amount calculator', function() {

  it('can calculate the number of degrees needed to rotate ' +
     'a minute hand from an initial time t1 such that the clock ' +
     'displays a desired new time t2', function() {

    var t1 = '10:15 AM';
    var t2 = '12:45 PM';
    expect(degRotnCalc.getDegreeRotationAmt(t1, t2)).toEqual(900);
  });

  it('can acommodate for instances where the desired time would ' +
     'out-of-context be considered "earlier" than the initial ' +
     'time', function() {

    var t1 = '7:00 AM';
    var t2 = '6:00 AM';
    expect(degRotnCalc.getDegreeRotationAmt(t1, t2)).toEqual(8280);
  });

  it('returns a negative value when given an invalid string', function() {
    var t1 = '7:00 AM';
    var bogus = '12.59pm';
    var whatShouldBeAnErrCode = degRotnCalc.getDegreeRotationAmt(t1, bogus);
    expect(whatShouldBeAnErrCode).toEqual(degRotnCalc.errCodes.E_FORMAT);
  });

  it('returns a negative value when given a non-existant time', function() {
    var bogus = '80:00 PM';
    var t2 = '2:30 PM';
    var whatShouldBeAnErrCode = degRotnCalc.getDegreeRotationAmt(bogus, t2);
    expect(whatShouldBeAnErrCode).toEqual(degRotnCalc.errCodes.E_INVALID);
  });

});
