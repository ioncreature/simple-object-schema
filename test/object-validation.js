const
    expect = require( 'chai' ).expect,
    Schema = require( '../src/schema' );

describe( 'Object validation', function(){

    it( 'should fail when not object passed', function(){
        var schema = new Schema( {o: Object} );
        expect( schema.validate().valid ).to.be.false;
        expect( schema.validate(123).valid ).to.be.false;
        expect( schema.validate([]).valid ).to.be.false;
        expect( schema.validate('asd').valid ).to.be.false;
    });


    describe( 'Number', function(){
        it( 'should validate number (by constructor)', function(){
            var schema = new Schema( {n: Number} );
            expect( schema.validate({n: 1}).valid ).to.be.true;
        });


        it( 'should validate number (by description)', function(){
            var schema = new Schema( {n: {type: Number}} );
            expect( schema.validate({n: 1}).valid ).to.be.true;
            expect( schema.validate({n: NaN}).valid ).to.be.true;
        });


        it( 'should validate number if not passed (by constructor)', function(){
            var schema = new Schema( {n: Number} );
            expect( schema.validate({}).valid ).to.be.true;
        });


        it( 'should validate number if not passed (by description)', function(){
            var schema = new Schema( {n: {type: Number}} );
            expect( schema.validate({}).valid ).to.be.true;
        });


        it( 'should validate number if not passed and required=false (by description)', function(){
            var schema = new Schema( {n: {type: Number, required: false}} );
            expect( schema.validate({}).valid ).to.be.true;
        });


        it( 'should fail number (by constructor)', function(){
            var schema = new Schema( {n: Number} );
            expect( schema.validate({n: false}).valid ).to.be.false;
            expect( schema.validate({n: []}).valid ).to.be.false;
            expect( schema.validate({n: null}).valid ).to.be.false;
        });


        it( 'should fail number (by description)', function(){
            var schema = new Schema( {n: {type: Number}} );
            expect( schema.validate({n: 'no'}).valid ).to.be.false;
        });


        it( 'should fail number if required and not passed(by description)', function(){
            var schema = new Schema( {n: {type: Number, required: true}} );
            expect( schema.validate({}).valid ).to.be.false;
        });
    });


    describe( 'String', function(){
        it( 'should validate string (by constructor)', function(){
            var schema = new Schema( {s: String} );
            expect( schema.validate({s: 'yes'}).valid ).to.be.true;
        });


        it( 'should validate string (by description)', function(){
            var schema = new Schema( {s: {type: String}} );
            expect( schema.validate({s: 'yay'}).valid ).to.be.true;
        });


        it( 'should validate string if not passed (by constructor)', function(){
            var schema = new Schema( {s: String} );
            expect( schema.validate({}).valid ).to.be.true;
        });


        it( 'should validate string if not passed (by description)', function(){
            var schema = new Schema( {s: {type: String}} );
            expect( schema.validate({}).valid ).to.be.true;
        });


        it( 'should validate string if not passed and required=false (by description)', function(){
            var schema = new Schema( {s: {type: String, required: false}} );
            expect( schema.validate({}).valid ).to.be.true;
        });


        it( 'should fail string (by constructor)', function(){
            var schema = new Schema( {s: String} );
            expect( schema.validate({s: 123}).valid ).to.be.false;
            expect( schema.validate({s: []}).valid ).to.be.false;
            expect( schema.validate({s: {}}).valid ).to.be.false;
        });


        it( 'should fail string (by description)', function(){
            var schema = new Schema( {s: {type: String}} );
            expect( schema.validate({s: null}).valid ).to.be.false;
        });


        it( 'should fail number if required and not passed(by description)', function(){
            var schema = new Schema( {s: {type: String, required: true}} );
            expect( schema.validate({}).valid ).to.be.false;
        });
    });


    describe( 'Boolean', function(){
        it( 'should validate boolean (by constructor)', function(){
            var schema = new Schema( {b: Boolean} );
            expect( schema.validate({b: true}).valid ).to.be.true;
        });


        it( 'should validate boolean (by description)', function(){
            var schema = new Schema( {b: {type: Boolean}} );
            expect( schema.validate({b: false}).valid ).to.be.true;
        });


        it( 'should validate boolean if not passed (by constructor)', function(){
            var schema = new Schema( {b: Boolean} );
            expect( schema.validate({}).valid ).to.be.true;
        });


        it( 'should validate boolean if not passed (by description)', function(){
            var schema = new Schema( {b: {type: Boolean}} );
            expect( schema.validate({}).valid ).to.be.true;
        });


        it( 'should validate boolean if not passed and required=false (by description)', function(){
            var schema = new Schema( {b: {type: Boolean, required: false}} );
            expect( schema.validate({}).valid ).to.be.true;
        });


        it( 'should fail boolean (by constructor)', function(){
            var schema = new Schema( {b: Boolean} );
            expect( schema.validate({b: 1}).valid ).to.be.false;
            expect( schema.validate({b: {}}).valid ).to.be.false;
        });


        it( 'should fail boolean (by description)', function(){
            var schema = new Schema( {b: {type: Boolean}} );
            expect( schema.validate({b: null}).valid ).to.be.false;
        });


        it( 'should fail boolean if required and not passed(by description)', function(){
            var schema = new Schema( {b: {type: Boolean, required: true}} );
            expect( schema.validate({}).valid ).to.be.false;
        });
    });


    describe( 'Date', function(){
        it( 'should validate date (by constructor)', function(){
            var schema = new Schema( {d: Date} );
            expect( schema.validate({d: new Date}).valid ).to.be.true;
            expect( schema.validate({d: '2020-10-10'}).valid ).to.be.true;
        });


        it( 'should validate timestamp (by description)', function(){
            var schema = new Schema( {d: {type: Date}} );
            expect( schema.validate({d: Date.now()}).valid ).to.be.true;
        });


        it( 'should validate date if not passed (by constructor)', function(){
            var schema = new Schema( {d: Date} );
            expect( schema.validate({}).valid ).to.be.true;
        });


        it( 'should validate date if not passed (by description)', function(){
            var schema = new Schema( {d: {type: Date}} );
            expect( schema.validate({}).valid ).to.be.true;
        });


        it( 'should validate date if not passed and required=false (by description)', function(){
            var schema = new Schema( {d: {type: Date, required: false}} );
            expect( schema.validate({}).valid ).to.be.true;
        });


        it( 'should fail date (by constructor)', function(){
            var schema = new Schema( {d: Date} );
            expect( schema.validate({d: 'bla-bla-bla, mr. Freeman'}).valid ).to.be.false;
            expect( schema.validate({d: []}).valid ).to.be.false;
            expect( schema.validate({d: {}}).valid ).to.be.false;
        });


        it( 'should fail date (by description)', function(){
            var schema = new Schema( {d: {type: Date}} );
            expect( schema.validate({d: 'null'}).valid ).to.be.false;
        });


        it( 'should fail date if required and not passed(by description)', function(){
            var schema = new Schema( {d: {type: Date, required: true}} );
            expect( schema.validate({}).valid ).to.be.false;
        });
    });


    describe( 'Array (constructor)', function(){
        it( 'should validate array (by constructor)', function(){
            var schema = new Schema( {a: Array} );
            expect( schema.validate({a: []}).valid ).to.be.true;
            expect( schema.validate({a: [1, 2, 3]}).valid ).to.be.true;
            expect( schema.validate({a: [{}]}).valid ).to.be.true;
        });


        it( 'should fail for not arrays (by constructor)', function(){
            var schema = new Schema( {a: Array} );
            expect( schema.validate({a: arguments}).valid ).to.be.false;
            expect( schema.validate({a: 'bla'}).valid ).to.be.false;
            expect( schema.validate({a: 123}).valid ).to.be.false;
            expect( schema.validate({a: false}).valid ).to.be.false;
            expect( schema.validate({a: null}).valid ).to.be.false;
        });
    });


    describe( 'Object (constructor)', function(){
        it( 'should validate object (by constructor)', function(){
            var schema = new Schema( {o: Object} );
            expect( schema.validate({o: {}}).valid ).to.be.true;
            expect( schema.validate({o: new Boolean}).valid ).to.be.true;
        });


        it( 'should fail for not objects (by constructor)', function(){
            var schema = new Schema( {o: Object} );
            expect( schema.validate({o: []}).valid ).to.be.false;
            expect( schema.validate({o: 'bla'}).valid ).to.be.false;
            expect( schema.validate({o: 123}).valid ).to.be.false;
            expect( schema.validate({o: false}).valid ).to.be.false;
            expect( schema.validate({o: null}).valid ).to.be.false;
        });
    });


    describe( 'Function (constructor)', function(){
        it( 'should validate object (by constructor)', function(){
            var schema = new Schema( {f: Function} );
            expect( schema.validate({f: () => 1}).valid ).to.be.true;
            expect( schema.validate({f: function(){}}).valid ).to.be.true;
            expect( schema.validate({f: Boolean}).valid ).to.be.true;
            expect( schema.validate({f: Date}).valid ).to.be.true;
        });


        it( 'should fail for not objects (by constructor)', function(){
            var schema = new Schema( {f: Function} );
            expect( schema.validate({f: 'bla'}).valid ).to.be.false;
            expect( schema.validate({f: 123}).valid ).to.be.false;
            expect( schema.validate({f: false}).valid ).to.be.false;
            expect( schema.validate({f: null}).valid ).to.be.false;
        });
    });


    describe( 'Function (instance)', function(){
        it( 'should validate by function', function(){
            var schema = new Schema( {f: () => 1} );
            expect( schema.validate({f: 1}).valid ).to.be.true;
            expect( schema.validate({f: false}).valid ).to.be.true;
            expect( schema.validate({}).valid ).to.be.true;
        });


        it( 'should fail', function(){
            var schema = new Schema( {f: () => 0} );
            expect( schema.validate({f: 1}).valid ).to.be.false;
            expect( schema.validate({f: false}).valid ).to.be.false;
            expect( schema.validate({f: Date}).valid ).to.be.false;
        });
    });


    describe( 'Object schema', function(){
        it( 'should validate by object schema', function(){
            var schema = new Schema( {o: {n: Number, s: String}} );
            expect( schema.validate({o: {n: 1, s: 's'}}).valid ).to.be.true;
            expect( schema.validate({o: {n: 'f', s: 1}}).valid ).to.be.false;
        });


        it( 'should validate by nested object schema', function(){
            var schema = new Schema( {o: {n: Number, s: String, o: {a: Array}}} );
            expect( schema.validate({o: {n: 1, s: 's', o: {a: [1, 3]}}}).valid ).to.be.true;
            expect( schema.validate({o: {n: 'f', s: 1, o: false}}).valid ).to.be.false;
        });
    });


    describe( 'Collection validation', function(){
        it( 'should validate collection (no item schema)', function(){
            var schema = new Schema( {c: []} );
            expect( schema.validate({c: []}).valid ).to.be.true;
            expect( schema.validate({c: [1]}).valid ).to.be.true;
            expect( schema.validate({c: [1, 2]}).valid ).to.be.true;
            expect( schema.validate({c: [1, 2, 'a']}).valid ).to.be.true;
            expect( schema.validate({c: [1, 2, 'a', {}]}).valid ).to.be.true;
            expect( schema.validate({c: [1, 2, 'a', {}, () => 1]}).valid ).to.be.true;
        });


        it( 'should validate Number schema', function(){
            var schema = new Schema( {c: [Number]} );
            expect( schema.validate({c: []}).valid ).to.be.true;
            expect( schema.validate({c: [1]}).valid ).to.be.true;
            expect( schema.validate({c: [1, 2, 3]}).valid ).to.be.true;

            expect( schema.validate({c: false}).valid ).to.be.false;
            expect( schema.validate({c: [false]}).valid ).to.be.false;
            expect( schema.validate({c: [1, 2, '3']}).valid ).to.be.false;
        });


        it( 'should validation String schema', function(){
            var schema = new Schema( {c: [String]} );
            expect( schema.validate({c: []}).valid ).to.be.true;
            expect( schema.validate({c: ['a']}).valid ).to.be.true;
            expect( schema.validate({c: ['a', 'b']}).valid ).to.be.true;

            expect( schema.validate({c: ['a', 'b', 1]}).valid ).to.be.false;
            expect( schema.validate({c: [1, 2, 'c']}).valid ).to.be.false;
            expect( schema.validate({c: ['a', 'b', () => 1]}).valid ).to.be.false;
        });


        it( 'should validate Object schema', function(){
            var schema = new Schema( {c: [Object]} );
            expect( schema.validate({c: []}).valid ).to.be.true;
            expect( schema.validate({c: [{}]}).valid ).to.be.true;
            expect( schema.validate({c: [{}, {}, new Date]}).valid ).to.be.true;

            expect( schema.validate({c: [Date, Array, 'a']}).valid ).to.be.false;
            expect( schema.validate({c: [null]}).valid ).to.be.false;
            expect( schema.validate({c: ['a', 'b', 1]}).valid ).to.be.false;
        });


        it( 'should validate collection by flat object description', function(){
            var schema = new Schema( {c: [{n: Number, s: String, b: Boolean}]} );
            expect( schema.validate({c: []}).valid ).to.be.true;
            expect( schema.validate({c: [{n: 1, s: '', b: true}]}).valid ).to.be.true;
            expect( schema.validate({c: [
                {n: 1, s: '', b: true},
                {n: 5, s: '123', b: false}
            ]}).valid ).to.be.true;

            expect( schema.validate({c: [{n: 's', s: 1, b: 0}]}).valid ).to.be.false;
            expect( schema.validate({c: [{n: 1, s: '', b: !0}]}).valid ).to.be.true;
            expect( schema.validate({c: [{n: 5, o: null}]}).valid ).to.be.true;
        });


        it( 'should validate collection by nested object description', function(){
            var schema = new Schema( {c: [{n: {type: Number, required: true}, o: {s: String, b: Boolean}}]} );
            expect( schema.validate({c: [{n: 1, o: {s: '', b: !0}}]}).valid ).to.be.true;

            expect( schema.validate({c: [{n: '', o: {s: '', b: !0}}]}).valid ).to.be.false;
            expect( schema.validate({c: [{o: null}]}).valid ).to.be.false;
        });
    });
});
