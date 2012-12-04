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

});
