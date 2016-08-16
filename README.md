# object-schema-validation

Simple object schema description and validation


Simple Usage
============

```js

const Schema = require( 'object-schema-validation' );

var someSchema = new Schema({
        name: String, 
        age: Number
    }),
    validation = someSchema.validate({
        name: 'Johny', 
        age: 88
    });

if ( validation.valid )
    console.log( 'yay, its valid' );
else
    console.warn( 'oh, no! It invalid', validation.error );

```

Available types
===============

```js
    
    var userSchema = new Schema({
        age: Number,
        name: String,
        birthDate: Date,
        about: {type: String, max: 100500, required: true},
        friends: [Number],
        posts: [{text: String, at: Date}],
        weight: {type: Number, min: 30, max: 300, required: true},
        meta: {
            la: Number,
            lalala: {type: Date},
            blabla: {
                list: [String],
                isTrue: Boolean
            }
        },
        complicated: function( val ){
            return Math.random() * 2 | 0;
        }
    })
        
    userSchema.validate( user ); // returns {valid: Boolean, error?: Error}

```