/**
 * Simple object schema and validation
 * @author Alexander Marenin
 */

const
    DEPTH = 3,
    STANDARD_TYPES = [Boolean, Number, String, Array, Object, Date];


module.exports = class Schema {
    constructor( description ){
        validateSchema( description );
        this.schema = description;
    }


    validate( object ){
        if ( !(object instanceof Object) )
            throw new Error( 'Argument should be an object' );

        Object.keys( this.schema ).forEach( key => {
            var value = this.schema[value];
            // if ( !isValidValue() )
        });
    }
};


function validateSchema( schema ){
    Object.keys( schema ).forEach( key => {
        if ( !isValid(schema[key]) )
            throw new Error( `Schema entity ${key} is invalid` );
    });

    function isValid( value, depth ){
        if ( depth === 0 )
            return false;

        if ( value instanceof Function )
            return true;

        if ( isStandardType(value) )
            return true;

        if ( Array.isArray(value) )
            return value[0] ? isValid( value[0] ) : true;

        if ( isTypeDescription(value) )
            return true;

        if ( isObjectDescription(value) )
            return isValid( value, (depth || DEPTH) - 1 );
    }
}


function isValidValue( spec, value, depth ){
    if ( depth <= 0 )
        return false;

    if ( typeof spec === 'function' )
        return spec( value );

    if ( isStandardType(spec) )
        return isValidByType( spec, value );

    if ( Array.isArray(spec) ){
        if ( spec.length === 0 )
            return Array.isArray( value );

        if ( isStandardType(spec[0]) )
            return value.every( val => isValidByType(spec[0], val) );

        if ( isTypeDescription(spec[0]) )
            return value.every( val => isValidByTypeDescription(spec[0], val) );

        if ( isObjectDescription(spec[0]) )
        // return Object.keys( spec[0] ).every();
            return value.everyObject.keys( spec[0] ).every();

        return false;
    }

    if ( isTypeDescription(spec) )
        return isValidByTypeDescription( spec, value );

    if ( isObjectDescription(spec) )
        return Object.keys( spec ).every( key => isValidValue(spec[key], value, depth - 1) );
}


function isTypeDescription( value ){
    return value instanceof Object && isStandardType( value.type );
}


function isObjectDescription( value ){
    return value instanceof Object && !isStandardType( value.type );
}


function isStandardType( value ){
    return STANDARD_TYPES.indexOf( value ) > -1;
}


function isValidByType( type, value ){
    if ( type === Number )
        return typeof value === 'number';

    if ( type === Object )
        return value !== null && typeof value == 'object';

    if ( type === String )
        return typeof value == 'string' || value instanceof String;

    if ( type === Boolean )
        return value === false || value === true;

    if ( type === Array )
        return Array.isArray( value );

    if ( type === Date )
        return isDate( value );
}


function isDate( value ){
    var date = new Date( value );
    return !isNaN( date.getTime() );
}
