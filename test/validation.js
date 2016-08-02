const
    expect = require( 'chai' ).expect,
    Schema = require( '../src/schema' );

describe( 'Schema', function(){
    describe( 'creation', function(){
        it( 'should not create schema (wrong value)', function(){
            var schema = {name: 'Polly'};
            expect( () => new Schema(schema) ).to.throw( /name/ );
        });


        it( 'should not create schema (wrong value in array)', function(){
            var schema = {legs: [10]};
            expect( () => new Schema(schema) ).to.throw( /legs/ );
        });


        it( 'should not create schema (deep nesting)', function(){
            var schema = {meta: {info: {data: {important: Boolean}}}};
            expect( () => new Schema(schema) ).to.throw( /meta/ );
        });


        it( 'should create schema (flat and simple)', function(){
            var schema = new Schema( {name: String, at: Date, able: Boolean, age: Number, meta: Object} );
            expect( schema ).to.respondsTo( 'validate' );
        });


        it( 'should create schema (functions)', function(){
            var schema = new Schema({
                name(){ return true },
                age(){ return false }
            });
            expect( schema ).to.respondsTo( 'validate' );
        });


        it( 'should create schema (arrays)', function(){
            var schema = new Schema({
                nums: [Number],
                at: [Date],
                legs: [],
                wow: [{type: Number, max: 100}],
                yay: [{name: String, age: Number, friends: Array}]
            });
            expect( schema ).to.respondsTo( 'validate' );
        });


        it( 'should create schema (objects)', function(){
            var schema = new Schema({
                bla: {type: Object},
                flat: {key: String, value: {type: Object, required: false}},
                nested: {
                    prop1: {name: String, age: Number},
                    prop2: {has: Boolean, at: Date},
                    prop3: {type: Number, max: 100500}
                }
            });
            expect( schema ).to.respondsTo( 'validate' );
        });
    });


    describe( 'validation', function(){
        it( 'should validate object' );
        it( 'should not validate object' );
    });
});