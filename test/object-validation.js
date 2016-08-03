const
    expect = require( 'chai' ).expect,
    Schema = require( '../src/schema' );

describe( 'Object validation', function(){

    describe( 'Number', function(){
        it( 'should validate (by constructor)', function(){
            var schema = new Schema( {num: Number} );
            expect( schema.validate({num: 1}).valid ).to.be.true;
        });


        it( 'should validate (by description)', function(){
            var schema = new Schema( {num: {type: Number}} );
            expect( schema.validate({num: 1}).valid ).to.be.true;
        });


        it( 'should not validate (by constructor)', function(){
            var schema = new Schema( {num: Number} );
            expect( schema.validate({num: false}).valid ).to.be.false;
        });


        it( 'should not validate (by description)', function(){
            var schema = new Schema( {num: {type: Number}} );
            expect( schema.validate({num: 'no'}).valid ).to.be.false;
        });
    });


    describe( 'String', function(){
        it( 'should validate (by constructor)', function(){
            var schema = new Schema( {s: String} );
            expect( schema.validate({s: 'yes'}).valid ).to.be.true;
        });


        it( 'should validate (by description)', function(){
            var schema = new Schema( {s: {type: String}} );
            expect( schema.validate({s: 'yay'}).valid ).to.be.true;
        });


        it( 'should not validate (by constructor)', function(){
            var schema = new Schema( {s: String} );
            expect( schema.validate({s: 123}).valid ).to.be.false;
        });


        it( 'should not validate (by description)', function(){
            var schema = new Schema( {num: {type: String}} );
            expect( schema.validate({s: null}).valid ).to.be.false;
        });
    });
});