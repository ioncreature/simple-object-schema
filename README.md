# simple-object-schema

Simple object schema description and validation

```js
    
    var userSchema = Schema({
        age: Number,
        name: String,
        birthDate: Date,
        about: {type: String, max: 100500},
        friends: [Number],
        posts: [{text: String, at: Date}],
        weight: {type: Number, min: 30, max: 300},
        meta: {
            la: Number,
            lalala: {type: Date}
        },
        complicated: function( val ){
            return Math.random() * 2 | 0;
        }
    })
    
    
    var user = {
        age: 10,
        name: 'Joe',
        birthDate: '2010-10-20',
        about: 'its a boy',
        friends: [],
        posts: [
            {text: 'hey', at: '2016-10-20'},
            {text: 'yay', at: '2016-10-20'}
        ],
        weight: 120,
        meta: {la: 1, lalala: 'yep'},
        complicated: 'wow'
    }
    
    userSchema.validate( user ); // returns true or false or throws exception?

```