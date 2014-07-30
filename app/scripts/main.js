'use strict';

function run() {
    var person = {
        'firstName': 'Jerome',
        'lastName': 'Howard',
        'address': {
            'street-no': 23,
            'street-name': 'main',
            'state': 'CA'
        }
    };
    // Note: if the variable person is not used, it will be dropped by Uglify 
    console.log(person.lastName);
    return person;
}

// Dummy call to avoid jshint warning: defined but never used
run();