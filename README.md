Socrata Front-End Engineer Programming Challenge
================================================

Overview
--------
This node module represents my answer to Socrata's [Front-End Engineer
Programming
Challenge](http://www.socrata.com/career/front-end-software-engineer/),
described here:
<blockquote>
"Allow the user to enter two times of the format “[H]H:MM AM”. Mentally picture
these times on two analog clocks, each having an hour hand and a minute hand.
Without using any built-in date or time routines, calculate the number of
degrees the minute hand on the first clock must travel in order to have the
second clock show the exact same time as the first clock. Assume that when you
move the minute hand, the hour hand moves automatically. The minute hand may
only move in the clockwise direction. You may assume that the minute hand
always ends up on a perfect minute boundary."
</blockquote>

Installation
------------
```sh
$ git clone https://github.com/traviskaufman/socrata_programming_challenge.git
$ cd socrata_programming_challenge
$ npm install .
```

Run the Tests
-------------
```sh
$ npm test
```

Verify that it works
--------------------
```sh
$ ./bin/rotation-amt [-h, --help] START_TIME END_TIME
```

Examples
--------
###Running the command line script
```sh
$ ./bin/rotation-amt "10:15 AM" "12:45 PM"
900 degrees (2.5 rotations)
```

###Using it as a nodeJS Module
```javascript
var degRotnAmtCalc = require('./index');
degRotnAmtCalc.getDegreeRotationAmt('10:15 AM', '12:45 PM'); // 900 
```
