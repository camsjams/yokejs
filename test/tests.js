var yoke = yoke || {};
console.info('test:START');
/******************
 * TEST: BASIC
 *****************/
console.info('test::BASIC bind');
yoke(
    'doTest',
    {
        'handler': function () {
            console.warn('my BASIC handler was called!');
        }
    }
);
console.info('test::BASIC trigger');
yoke('doTest');

/******************
 * TEST: FAIL
 *****************/
console.info('test::FAIL bind');
yoke(
    'doTest',
    {
        'handler': function () {
            console.warn('my FAIL handler was called!');
            throw new Error('broke');
        }
    }
);
console.info('test::FAIL trigger');
yoke('doTest');

/******************
 * TEST: IDP1
 *****************/
console.info('test::IDP1 bind');
yoke(
    'doTestUnique',
    {
        'id': 'uniqueYoke',
        'handler': function () {
            console.warn('my IDP1 handler was called!');
        }
    }
);
console.info('test::IDP1 trigger');
yoke('doTestUnique');

/******************
 * TEST: IDP2
 *****************/
console.info('test::IDP2 bind');
yoke(
    'doTestUnique',
    {
        'id': 'uniqueYoke',
        'handler': function () {
            console.warn('my IDP2 handler was called!');
        }
    }
);
console.info('test::IDP2 trigger');
yoke('doTestUnique');


/******************
 * TEST: LIST
 *****************/
console.info('test::LIST call');
yoke(
    'doTest',
    {
        'action': 'list'
    }
);

/******************
 * TEST: UNBIND
 *****************/
console.info('test::UNBIND call');
yoke(
    'doTestUnique',
    {
        'id': 'uniqueYoke',
        'action': 'unbind'
    }
);
console.info('test::UNBIND trigger');
yoke('doTestUnique');


/******************
 * TEST: CLEAR
 *****************/
console.info('test::CLEAR call');
yoke(
    'doTest',
    {
        'action': 'clear'
    }
);
console.info('test::CLEAR trigger');
yoke('doTest');