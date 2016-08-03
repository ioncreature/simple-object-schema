const
    expect = require( 'chai' ).expect,
    Schema = require( '../src/schema' );

describe( 'Object validation', function(){

    describe( 'Number', function(){
        it( 'should validate (number)', function(){
            var schema = new Schema( {num: Number} );
            // expect( () =>  ).to.be.true;
        });

    });



    it( 'should not validate object' );
});