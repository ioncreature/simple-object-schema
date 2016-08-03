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
            return {valid: false, error: new Error('Argument should be an object')};

        for ( let key in this.schema )
            if ( this.schema.hasOwnProperty(key) )
                if ( !isValidValue(this.schema[key], object[key]) )
                    return {valid: false, field: key, error: new Error(`Invalid value at field "${key}"`)};
        return {valid: true};
    }
};


function validateSchema( schema ){
    Object.keys( schema ).forEach( key => {
        if ( !isValid(schema[key]) )
            throw new Error( `Schema entity "${key}" is invalid` );
    });

    function isValid( value, depth ){
        if ( depth === 0 )
            return false;
        var d = (depth || DEPTH) - 1;

        if ( value instanceof Function )
            return true;

        if ( isStandardType(value) )
            return true;

        if ( Array.isArray(value) )
            return value[0] ? isValid( value[0], d ) : true;

        if ( isTypeDescription(value) )
            return true;

        if ( isObjectDescription(value) )
            return Object.keys( value ).every( key => isValid(value[key], d) );
    }
}


function isValidValue( spec, value, depth ){
    if ( depth <= 0 )
        return false;

    var d = (depth || DEPTH) - 1;

    if ( isStandardType(spec) )
        return isValidByType( spec, value );

    if ( typeof spec === 'function' )
        return spec( value );

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
        return Object.keys( spec ).every( key => isValidValue(spec[key], value, d) );
}


function isValidByTypeDescription( spec, value ){
    // todo: add parameters to validation
    return isValidByType( spec.type, value );
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
