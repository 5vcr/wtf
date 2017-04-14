/*!
 * jQuery JavaScript Library v1.12.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:17Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			div.childNodes[ 0 ].style.borderCollapse = "separate";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {

	// Disconnected elements are considered hidden
	if ( !jQuery.contains( elem.ownerDocument || document, elem ) ) {
		return true;
	}
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[name][type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.on('ajax:complete', rails.linkDisableSelector, function() {
        rails.enableElement($(this));
    });

    $document.on('ajax:complete', rails.buttonDisableSelector, function() {
        rails.enableFormElement($(this));
    });

    $document.on('click.rails', rails.linkClickSelector, function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.on('click.rails', rails.buttonClickSelector, function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.on('change.rails', rails.inputChangeSelector, function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.on('submit.rails', rails.formSubmitSelector, function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.on('click.rails', rails.formInputClickSelector, function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.on('ajax:send.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.on('ajax:complete.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
/* ========================================================================
 * Bootstrap: transition.js v3.3.7
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: alert.js v3.3.7
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.7'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector === '#' ? [] : selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);
/* ========================================================================
 * Bootstrap: button.js v3.3.7
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.7'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d).prop(d, true)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d).prop(d, false)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target).closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"], input[type="checkbox"]'))) {
        // Prevent double click on radios, and the double selections (so cancellation) on checkboxes
        e.preventDefault()
        // The target component still receive the focus
        if ($btn.is('input,button')) $btn.trigger('focus')
        else $btn.find('input:visible,button:visible').first().trigger('focus')
      }
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);
/* ========================================================================
 * Bootstrap: carousel.js v3.3.7
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.7'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: collapse.js v3.3.7
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

/* jshint latedef: false */


+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.7'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: dropdown.js v3.3.7
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.7'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);
/* ========================================================================
 * Bootstrap: modal.js v3.3.7
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.7'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (document !== e.target &&
            this.$element[0] !== e.target &&
            !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: tab.js v3.3.7
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.7'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);
/* ========================================================================
 * Bootstrap: affix.js v3.3.7
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.7'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.7
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.7'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: tooltip.js v3.3.7
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.7'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      if (that.$element) { // TODO: Check whether guarding this code with this `if` is really necessary.
        that.$element
          .removeAttr('aria-describedby')
          .trigger('hidden.bs.' + that.type)
      }
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var isSvg = window.SVGElement && el instanceof window.SVGElement
    // Avoid using $.offset() on SVGs since it gives incorrect results in jQuery 3.
    // See https://github.com/twbs/bootstrap/issues/20280
    var elOffset  = isBody ? { top: 0, left: 0 } : (isSvg ? null : $element.offset())
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
      that.$element = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);
/* ========================================================================
 * Bootstrap: popover.js v3.3.7
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.7'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);












/*

$.Link (part of noUiSlider) - WTFPL */

(function(c) {
    function m(a, c, d) {
        if ((a[c] || a[d]) && a[c] === a[d]) throw Error("(Link) '" + c + "' can't match '" + d + "'.'");
    }

    function r(a) {
        void 0 === a && (a = {});
        if ("object" !== typeof a) throw Error("(Format) 'format' option must be an object.");
        var h = {};
        c(u).each(function(c, n) {
            if (void 0 === a[n]) h[n] = A[c];
            else if (typeof a[n] === typeof A[c]) {
                if ("decimals" === n && (0 > a[n] || 7 < a[n])) throw Error("(Format) 'format.decimals' option must be between 0 and 7.");
                h[n] = a[n]
            } else throw Error("(Format) 'format." + n + "' must be a " + typeof A[c] +
                ".");
        });
        m(h, "mark", "thousand");
        m(h, "prefix", "negative");
        m(h, "prefix", "negativeBefore");
        this.r = h
    }

    function k(a, h) {
        "object" !== typeof a && c.error("(Link) Initialize with an object.");
        return new k.prototype.p(a.target || function() {}, a.method, a.format || {}, h)
    }
    var u = "decimals mark thousand prefix postfix encoder decoder negative negativeBefore to from".split(" "),
        A = [2, ".", "", "", "", function(a) {
            return a
        }, function(a) {
            return a
        }, "-", "", function(a) {
            return a
        }, function(a) {
            return a
        }];
    r.prototype.a = function(a) {
        return this.r[a]
    };
    r.prototype.L = function(a) {
        function c(a) {
            return a.split("").reverse().join("")
        }
        a = this.a("encoder")(a);
        var d = this.a("decimals"),
            n = "",
            k = "",
            m = "",
            r = "";
        0 === parseFloat(a.toFixed(d)) && (a = "0");
        0 > a && (n = this.a("negative"), k = this.a("negativeBefore"));
        a = Math.abs(a).toFixed(d).toString();
        a = a.split(".");
        this.a("thousand") ? (m = c(a[0]).match(/.{1,3}/g), m = c(m.join(c(this.a("thousand"))))) : m = a[0];
        this.a("mark") && 1 < a.length && (r = this.a("mark") + a[1]);
        return this.a("to")(k + this.a("prefix") + n + m + r + this.a("postfix"))
    };
    r.prototype.w =
        function(a) {
            function c(a) {
                return a.replace(/[\-\/\\\^$*+?.()|\[\]{}]/g, "\\$&")
            }
            var d;
            if (null === a || void 0 === a) return !1;
            a = this.a("from")(a);
            a = a.toString();
            d = a.replace(RegExp("^" + c(this.a("negativeBefore"))), "");
            a !== d ? (a = d, d = "-") : d = "";
            a = a.replace(RegExp("^" + c(this.a("prefix"))), "");
            this.a("negative") && (d = "", a = a.replace(RegExp("^" + c(this.a("negative"))), "-"));
            a = a.replace(RegExp(c(this.a("postfix")) + "$"), "").replace(RegExp(c(this.a("thousand")), "g"), "").replace(this.a("mark"), ".");
            a = this.a("decoder")(parseFloat(d +
                a));
            return isNaN(a) ? !1 : a
        };
    k.prototype.K = function(a, h) {
        this.method = h || "html";
        this.j = c(a.replace("-tooltip-", "") || "<div/>")[0]
    };
    k.prototype.H = function(a) {
        this.method = "val";
        this.j = document.createElement("input");
        this.j.name = a;
        this.j.type = "hidden"
    };
    k.prototype.G = function(a) {
        function h(a, c) {
            return [c ? null : a, c ? a : null]
        }
        var d = this;
        this.method = "val";
        this.target = a.on("change", function(a) {
            d.B.val(h(c(a.target).val(), d.t), {
                link: d,
                set: !0
            })
        })
    };
    k.prototype.p = function(a, h, d, k) {
        this.g = d;
        this.update = !k;
        if ("string" ===
            typeof a && 0 === a.indexOf("-tooltip-")) this.K(a, h);
        else if ("string" === typeof a && 0 !== a.indexOf("-")) this.H(a);
        else if ("function" === typeof a) this.target = !1, this.method = a;
        else {
            if (a instanceof c || c.zepto && c.zepto.isZ(a)) {
                if (!h) {
                    if (a.is("input, select, textarea")) {
                        this.G(a);
                        return
                    }
                    h = "html"
                }
                if ("function" === typeof h || "string" === typeof h && a[h]) {
                    this.method = h;
                    this.target = a;
                    return
                }
            }
            throw new RangeError("(Link) Invalid Link.");
        }
    };
    k.prototype.write = function(a, c, d, k) {
        if (!this.update || !1 !== k)
            if (this.u = a, this.F = a =
                this.format(a), "function" === typeof this.method) this.method.call(this.target[0] || d[0], a, c, d);
            else this.target[this.method](a, c, d)
    };
    k.prototype.q = function(a) {
        this.g = new r(c.extend({}, a, this.g instanceof r ? this.g.r : this.g))
    };
    k.prototype.J = function(a) {
        this.B = a
    };
    k.prototype.I = function(a) {
        this.t = a
    };
    k.prototype.format = function(a) {
        return this.g.L(a)
    };
    k.prototype.A = function(a) {
        return this.g.w(a)
    };
    k.prototype.p.prototype = k.prototype;
    c.Link = k
})(window.jQuery || window.Zepto);
/*

$.fn.noUiSlider - WTFPL - refreshless.com/nouislider/ */
(function(c) {
    function m(e) {
        return "number" === typeof e && !isNaN(e) && isFinite(e)
    }

    function r(e) {
        return c.isArray(e) ? e : [e]
    }

    function k(e, b) {
        e.addClass(b);
        setTimeout(function() {
            e.removeClass(b)
        }, 300)
    }

    function u(e, b) {
        return 100 * b / (e[1] - e[0])
    }

    function A(e, b) {
        if (b >= e.d.slice(-1)[0]) return 100;
        for (var a = 1, c, f, d; b >= e.d[a];) a++;
        c = e.d[a - 1];
        f = e.d[a];
        d = e.c[a - 1];
        c = [c, f];
        return d + u(c, 0 > c[0] ? b + Math.abs(c[0]) : b - c[0]) / (100 / (e.c[a] - d))
    }

    function a(e, b) {
        if (100 <= b) return e.d.slice(-1)[0];
        for (var a = 1, c, f, d; b >= e.c[a];) a++;
        c =
            e.d[a - 1];
        f = e.d[a];
        d = e.c[a - 1];
        c = [c, f];
        return 100 / (e.c[a] - d) * (b - d) * (c[1] - c[0]) / 100 + c[0]
    }

    function h(a, b) {
        for (var c = 1, g;
            (a.dir ? 100 - b : b) >= a.c[c];) c++;
        if (a.m) return g = a.c[c - 1], c = a.c[c], b - g > (c - g) / 2 ? c : g;
        a.h[c - 1] ? (g = a.h[c - 1], c = a.c[c - 1] + Math.round((b - a.c[c - 1]) / g) * g) : c = b;
        return c
    }

    function d(a, b) {
        if (!m(b)) throw Error("noUiSlider: 'step' is not numeric.");
        a.h[0] = b
    }

    function n(a, b) {
        if ("object" !== typeof b || c.isArray(b)) throw Error("noUiSlider: 'range' is not an object.");
        if (void 0 === b.min || void 0 === b.max) throw Error("noUiSlider: Missing 'min' or 'max' in 'range'.");
        c.each(b, function(b, g) {
            var d;
            "number" === typeof g && (g = [g]);
            if (!c.isArray(g)) throw Error("noUiSlider: 'range' contains invalid value.");
            d = "min" === b ? 0 : "max" === b ? 100 : parseFloat(b);
            if (!m(d) || !m(g[0])) throw Error("noUiSlider: 'range' value isn't numeric.");
            a.c.push(d);
            a.d.push(g[0]);
            d ? a.h.push(isNaN(g[1]) ? !1 : g[1]) : isNaN(g[1]) || (a.h[0] = g[1])
        });
        c.each(a.h, function(b, c) {
            if (!c) return !0;
            a.h[b] = u([a.d[b], a.d[b + 1]], c) / (100 / (a.c[b + 1] - a.c[b]))
        })
    }

    function E(a, b) {
        "number" === typeof b && (b = [b]);
        if (!c.isArray(b) || !b.length ||
            2 < b.length) throw Error("noUiSlider: 'start' option is incorrect.");
        a.b = b.length;
        a.start = b
    }

    function I(a, b) {
        a.m = b;
        if ("boolean" !== typeof b) throw Error("noUiSlider: 'snap' option must be a boolean.");
    }

    function J(a, b) {
        if ("lower" === b && 1 === a.b) a.i = 1;
        else if ("upper" === b && 1 === a.b) a.i = 2;
        else if (!0 === b && 2 === a.b) a.i = 3;
        else if (!1 === b) a.i = 0;
        else throw Error("noUiSlider: 'connect' option doesn't match handle count.");
    }

    function D(a, b) {
        switch (b) {
            case "horizontal":
                a.k = 0;
                break;
            case "vertical":
                a.k = 1;
                break;
            default:
                throw Error("noUiSlider: 'orientation' option is invalid.");
        }
    }

    function K(a, b) {
        if (2 < a.c.length) throw Error("noUiSlider: 'margin' option is only supported on linear sliders.");
        a.margin = u(a.d, b);
        if (!m(b)) throw Error("noUiSlider: 'margin' option must be numeric.");
    }

    function L(a, b) {
        switch (b) {
            case "ltr":
                a.dir = 0;
                break;
            case "rtl":
                a.dir = 1;
                a.i = [0, 2, 1, 3][a.i];
                break;
            default:
                throw Error("noUiSlider: 'direction' option was not recognized.");
        }
    }

    function M(a, b) {
        if ("string" !== typeof b) throw Error("noUiSlider: 'behaviour' must be a string containing options.");
        var c = 0 <= b.indexOf("snap");
        a.n = {
            s: 0 <= b.indexOf("tap") || c,
            extend: 0 <= b.indexOf("extend"),
            v: 0 <= b.indexOf("drag"),
            fixed: 0 <= b.indexOf("fixed"),
            m: c
        }
    }

    function N(a, b, d) {
        a.o = [b.lower, b.upper];
        a.g = b.format;
        c.each(a.o, function(a, e) {
            if (!c.isArray(e)) throw Error("noUiSlider: 'serialization." + (a ? "upper" : "lower") + "' must be an array.");
            c.each(e, function() {
                if (!(this instanceof c.Link)) throw Error("noUiSlider: 'serialization." + (a ? "upper" : "lower") + "' can only contain Link instances.");
                this.I(a);
                this.J(d);
                this.q(b.format)
            })
        });
        a.dir && 1 < a.b && a.o.reverse()
    }

    function O(a, b) {
        var f = {
                c: [],
                d: [],
                h: [!1],
                margin: 0
            },
            g;
        g = {
            step: {
                e: !1,
                f: d
            },
            start: {
                e: !0,
                f: E
            },
            connect: {
                e: !0,
                f: J
            },
            direction: {
                e: !0,
                f: L
            },
            range: {
                e: !0,
                f: n
            },
            snap: {
                e: !1,
                f: I
            },
            orientation: {
                e: !1,
                f: D
            },
            margin: {
                e: !1,
                f: K
            },
            behaviour: {
                e: !0,
                f: M
            },
            serialization: {
                e: !0,
                f: N
            }
        };
        a = c.extend({
            connect: !1,
            direction: "ltr",
            behaviour: "tap",
            orientation: "horizontal"
        }, a);
        a.serialization = c.extend({
            lower: [],
            upper: [],
            format: {}
        }, a.serialization);
        c.each(g, function(c, d) {
            if (void 0 === a[c]) {
                if (d.e) throw Error("noUiSlider: '" + c + "' is required.");
                return !0
            }
            d.f(f, a[c], b)
        });
        f.style = f.k ? "top" : "left";
        return f
    }

    function P(a, b) {
        var d = c("<div><div/></div>").addClass(f[2]),
            g = ["-lower", "-upper"];
        a.dir && g.reverse();
        d.children().addClass(f[3] + " " + f[3] + g[b]);
        return d
    }

    function Q(a, b) {
        b.j && (b = new c.Link({
            target: c(b.j).clone().appendTo(a),
            method: b.method,
            format: b.g
        }, !0));
        return b
    }

    function R(a, b) {
        var d, f = [];
        for (d = 0; d < a.b; d++) {
            var k = f,
                h = d,
                m = a.o[d],
                n = b[d].children(),
                r = a.g,
                s = void 0,
                v = [],
                s = new c.Link({}, !0);
            s.q(r);
            v.push(s);
            for (s = 0; s < m.length; s++) v.push(Q(n, m[s]));
            k[h] = v
        }
        return f
    }

    function S(a, b, c) {
        switch (a) {
            case 1:
                b.addClass(f[7]);
                c[0].addClass(f[6]);
                break;
            case 3:
                c[1].addClass(f[6]);
            case 2:
                c[0].addClass(f[7]);
            case 0:
                b.addClass(f[6])
        }
    }

    function T(a, b) {
        var c, d = [];
        for (c = 0; c < a.b; c++) d.push(P(a, c).appendTo(b));
        return d
    }

    function U(a, b) {
        b.addClass([f[0], f[8 + a.dir], f[4 + a.k]].join(" "));
        return c("<div/>").appendTo(b).addClass(f[1])
    }

    function V(d, b, m) {
        function g() {
            return t[["width", "height"][b.k]]()
        }

        function n(a) {
            var b, c = [q.val()];
            for (b = 0; b < a.length; b++) q.trigger(a[b],
                c)
        }

        function u(d, p, e) {
            var g = d[0] !== l[0][0] ? 1 : 0,
                H = x[0] + b.margin,
                k = x[1] - b.margin;
            e && 1 < l.length && (p = g ? Math.max(p, H) : Math.min(p, k));
            100 > p && (p = h(b, p));
            p = Math.max(Math.min(parseFloat(p.toFixed(7)), 100), 0);
            if (p === x[g]) return 1 === l.length ? !1 : p === H || p === k ? 0 : !1;
            d.css(b.style, p + "%");
            d.is(":first-child") && d.toggleClass(f[17], 50 < p);
            x[g] = p;
            b.dir && (p = 100 - p);
            c(y[g]).each(function() {
                this.write(a(b, p), d.children(), q)
            });
            return !0
        }

        function B(a, b, c) {
            c || k(q, f[14]);
            u(a, b, !1);
            n(["slide", "set", "change"])
        }

        function w(a, c, d, e) {
            a =
                a.replace(/\s/g, ".nui ") + ".nui";
            c.on(a, function(a) {
                var c = q.attr("disabled");
                if (q.hasClass(f[14]) || void 0 !== c && null !== c) return !1;
                a.preventDefault();
                var c = 0 === a.type.indexOf("touch"),
                    p = 0 === a.type.indexOf("mouse"),
                    F = 0 === a.type.indexOf("pointer"),
                    g, k, l = a;
                0 === a.type.indexOf("MSPointer") && (F = !0);
                a.originalEvent && (a = a.originalEvent);
                c && (g = a.changedTouches[0].pageX, k = a.changedTouches[0].pageY);
                if (p || F) F || void 0 !== window.pageXOffset || (window.pageXOffset = document.documentElement.scrollLeft, window.pageYOffset =
                    document.documentElement.scrollTop), g = a.clientX + window.pageXOffset, k = a.clientY + window.pageYOffset;
                l.C = [g, k];
                l.cursor = p;
                a = l;
                a.l = a.C[b.k];
                d(a, e)
            })
        }

        function C(a, c) {
            var b = c.b || l,
                d, e = !1,
                e = 100 * (a.l - c.start) / g(),
                f = b[0][0] !== l[0][0] ? 1 : 0;
            var k = c.D;
            d = e + k[0];
            e += k[1];
            1 < b.length ? (0 > d && (e += Math.abs(d)), 100 < e && (d -= e - 100), d = [Math.max(Math.min(d, 100), 0), Math.max(Math.min(e, 100), 0)]) : d = [d, e];
            e = u(b[0], d[f], 1 === b.length);
            1 < b.length && (e = u(b[1], d[f ? 0 : 1], !1) || e);
            e && n(["slide"])
        }

        function s(a) {
            c("." + f[15]).removeClass(f[15]);
            a.cursor && c("body").css("cursor", "").off(".nui");
            G.off(".nui");
            q.removeClass(f[12]);
            n(["set", "change"])
        }

        function v(a, b) {
            1 === b.b.length && b.b[0].children().addClass(f[15]);
            a.stopPropagation();
            w(z.move, G, C, {
                start: a.l,
                b: b.b,
                D: [x[0], x[l.length - 1]]
            });
            w(z.end, G, s, null);
            a.cursor && (c("body").css("cursor", c(a.target).css("cursor")), 1 < l.length && q.addClass(f[12]), c("body").on("selectstart.nui", !1))
        }

        function D(a) {
            var d = a.l,
                e = 0;
            a.stopPropagation();
            c.each(l, function() {
                e += this.offset()[b.style]
            });
            e = d < e / 2 || 1 === l.length ?
                0 : 1;
            d -= t.offset()[b.style];
            d = 100 * d / g();
            B(l[e], d, b.n.m);
            b.n.m && v(a, {
                b: [l[e]]
            })
        }

        function E(a) {
            var c = (a = a.l < t.offset()[b.style]) ? 0 : 100;
            a = a ? 0 : l.length - 1;
            B(l[a], c, !1)
        }
        var q = c(d),
            x = [-1, -1],
            t, y, l;
        if (q.hasClass(f[0])) throw Error("Slider was already initialized.");
        t = U(b, q);
        l = T(b, t);
        y = R(b, l);
        S(b.i, q, l);
        (function(a) {
            var b;
            if (!a.fixed)
                for (b = 0; b < l.length; b++) w(z.start, l[b].children(), v, {
                    b: [l[b]]
                });
            a.s && w(z.start, t, D, {
                b: l
            });
            a.extend && (q.addClass(f[16]), a.s && w(z.start, q, E, {
                b: l
            }));
            a.v && (b = t.find("." + f[7]).addClass(f[10]),
                a.fixed && (b = b.add(t.children().not(b).children())), w(z.start, b, v, {
                    b: l
                }))
        })(b.n);
        d.vSet = function() {
            var a = Array.prototype.slice.call(arguments, 0),
                d, e, g, h, m, s, t = r(a[0]);
            "object" === typeof a[1] ? (d = a[1].set, e = a[1].link, g = a[1].update, h = a[1].animate) : !0 === a[1] && (d = !0);
            b.dir && 1 < b.b && t.reverse();
            h && k(q, f[14]);
            a = 1 < l.length ? 3 : 1;
            1 === t.length && (a = 1);
            for (m = 0; m < a; m++) h = e || y[m % 2][0], h = h.A(t[m % 2]), !1 !== h && (h = A(b, h), b.dir && (h = 100 - h), !0 !== u(l[m % 2], h, !0) && c(y[m % 2]).each(function(a) {
                if (!a) return s = this.u, !0;
                this.write(s,
                    l[m % 2].children(), q, g)
            }));
            !0 === d && n(["set"]);
            return this
        };
        d.vGet = function() {
            var a, c = [];
            for (a = 0; a < b.b; a++) c[a] = y[a][0].F;
            return 1 === c.length ? c[0] : b.dir ? c.reverse() : c
        };
        d.destroy = function() {
            c.each(y, function() {
                c.each(this, function() {
                    this.target && this.target.off(".nui")
                })
            });
            c(this).off(".nui").removeClass(f.join(" ")).empty();
            return m
        };
        q.val(b.start)
    }

    function W(a) {
        if (!this.length) throw Error("noUiSlider: Can't initialize slider on empty selection.");
        var b = O(a, this);
        return this.each(function() {
            V(this,
                b, a)
        })
    }

    function X(a) {
        return this.each(function() {
            var b = c(this).val(),
                d = this.destroy(),
                f = c.extend({}, d, a);
            c(this).noUiSlider(f);
            d.start === f.start && c(this).val(b)
        })
    }

    function B() {
        return this[0][arguments.length ? "vSet" : "vGet"].apply(this[0], arguments)
    }
    var G = c(document),
        C = c.fn.val,
        z = window.navigator.pointerEnabled ? {
            start: "pointerdown",
            move: "pointermove",
            end: "pointerup"
        } : window.navigator.msPointerEnabled ? {
            start: "MSPointerDown",
            move: "MSPointerMove",
            end: "MSPointerUp"
        } : {
            start: "mousedown touchstart",
            move: "mousemove touchmove",
            end: "mouseup touchend"
        },
        f = "noUi-target noUi-base noUi-origin noUi-handle noUi-horizontal noUi-vertical noUi-background noUi-connect noUi-ltr noUi-rtl noUi-dragable  noUi-state-drag  noUi-state-tap noUi-active noUi-extended noUi-stacking".split(" ");
    c.fn.val = function() {
        var a = arguments,
            b = c(this[0]);
        return arguments.length ? this.each(function() {
            (c(this).hasClass(f[0]) ? B : C).apply(c(this), a)
        }) : (b.hasClass(f[0]) ? B : C).call(b)
    };
    c.noUiSlider = {
        Link: c.Link
    };
    c.fn.noUiSlider = function(a, b) {
        return (b ? X : W).call(this,
            a)
    }
})(window.jQuery || window.Zepto);
/* globals jQuery */


(function($) {
  // Selector to select only not already processed elements
  $.expr[":"].notmdproc = function(obj){
    if ($(obj).data("mdproc")) {
      return false;
    } else {
      return true;
    }
  };

  function _isChar(evt) {
    if (typeof evt.which == "undefined") {
      return true;
    } else if (typeof evt.which == "number" && evt.which > 0) {
      return !evt.ctrlKey && !evt.metaKey && !evt.altKey && evt.which != 8 && evt.which != 9;
    }
    return false;
  }

  $.material =  {
    "options": {
      // These options set what will be started by $.material.init()
      "input": true,
      "ripples": true,
      "checkbox": true,
      "togglebutton": true,
      "radio": true,
      "arrive": true,
      "autofill": false,

      "withRipples": [
        ".btn:not(.btn-link)",
        ".card-image",
        ".navbar a:not(.withoutripple)",
        ".dropdown-menu a",
        ".nav-tabs a:not(.withoutripple)",
        ".withripple",
        ".pagination li:not(.active, .disabled) a:not(.withoutripple)"
      ].join(","),
      "inputElements": "input.form-control, textarea.form-control, select.form-control",
      "checkboxElements": ".checkbox > label > input[type=checkbox]",
      "togglebuttonElements": ".togglebutton > label > input[type=checkbox]",
      "radioElements": ".radio > label > input[type=radio]"
    },
    "checkbox": function(selector) {
      // Add fake-checkbox to material checkboxes
      $((selector) ? selector : this.options.checkboxElements)
      .filter(":notmdproc")
      .data("mdproc", true)
      .after("<span class=checkbox-material><span class=check></span></span>");
    },
    "togglebutton": function(selector) {
      // Add fake-checkbox to material checkboxes
      $((selector) ? selector : this.options.togglebuttonElements)
      .filter(":notmdproc")
      .data("mdproc", true)
      .after("<span class=toggle></span>");
    },
    "radio": function(selector) {
      // Add fake-radio to material radios
      $((selector) ? selector : this.options.radioElements)
      .filter(":notmdproc")
      .data("mdproc", true)
      .after("<span class=circle></span><span class=check></span>");
    },
    "input": function(selector) {
      $((selector) ? selector : this.options.inputElements)
      .filter(":notmdproc")
      .data("mdproc", true)
      .each( function() {
        var $this = $(this);

        if (!$(this).attr("data-hint") && !$this.hasClass("floating-label")) {
          return;
        }
        $this.wrap("<div class=form-control-wrapper></div>");
        $this.after("<span class=material-input></span>");

        // Add floating label if required
        if ($this.hasClass("floating-label")) {
          var placeholder = $this.attr("placeholder");
          $this.attr("placeholder", null).removeClass("floating-label");
          $this.after("<div class=floating-label>" + placeholder + "</div>");
        }

        // Add hint label if required
        if ($this.attr("data-hint")) {
          $this.after("<div class=hint>" + $this.attr("data-hint") + "</div>");
        }

        // Set as empty if is empty (damn I must improve this...)
        if ($this.val() === null || $this.val() == "undefined" || $this.val() === "") {
          $this.addClass("empty");
        }

        // Support for file input
        if ($this.parent().next().is("[type=file]")) {
          $this.parent().addClass("fileinput");
          var $input = $this.parent().next().detach();
          $this.after($input);
        }
      });

      $(document)
      .on("change", ".checkbox input[type=checkbox]", function() { $(this).blur(); })
      .on("keydown paste", ".form-control", function(e) {
        if(_isChar(e)) {
          $(this).removeClass("empty");
        }
      })
      .on("keyup change", ".form-control", function() {
        var $this = $(this);
        if ($this.val() === "" && (typeof $this[0].checkValidity != "undefined" && $this[0].checkValidity())) {
          $this.addClass("empty");
        } else {
          $this.removeClass("empty");
        }
      })
      .on("focus", ".form-control-wrapper.fileinput", function() {
        $(this).find("input").addClass("focus");
      })
      .on("blur", ".form-control-wrapper.fileinput", function() {
        $(this).find("input").removeClass("focus");
      })
      .on("change", ".form-control-wrapper.fileinput [type=file]", function() {
        var value = "";
        $.each($(this)[0].files, function(i, file) {
          value += file.name + ", ";
        });
        value = value.substring(0, value.length - 2);
        if (value) {
          $(this).prev().removeClass("empty");
        } else {
          $(this).prev().addClass("empty");
        }
        $(this).prev().val(value);
      });
    },
    "ripples": function(selector) {
      $((selector) ? selector : this.options.withRipples).ripples();
    },
    "autofill": function() {

      // This part of code will detect autofill when the page is loading (username and password inputs for example)
      var loading = setInterval(function() {
        $("input[type!=checkbox]").each(function() {
          if ($(this).val() && $(this).val() !== $(this).attr("value")) {
            $(this).trigger("change");
          }
        });
      }, 100);

      // After 10 seconds we are quite sure all the needed inputs are autofilled then we can stop checking them
      setTimeout(function() {
        clearInterval(loading);
      }, 10000);
      // Now we just listen on inputs of the focused form (because user can select from the autofill dropdown only when the input has focus)
      var focused;
      $(document)
      .on("focus", "input", function() {
        var $inputs = $(this).parents("form").find("input").not("[type=file]");
        focused = setInterval(function() {
          $inputs.each(function() {
            if ($(this).val() !== $(this).attr("value")) {
              $(this).trigger("change");
            }
          });
        }, 100);
      })
      .on("blur", "input", function() {
        clearInterval(focused);
      });
    },
    "init": function() {
      if ($.fn.ripples && this.options.ripples) {
        this.ripples();
      }
      if (this.options.input) {
        this.input();
      }
      if (this.options.checkbox) {
        this.checkbox();
      }
      if (this.options.togglebutton) {
        this.togglebutton();
      }
      if (this.options.radio) {
        this.radio();
      }
      if (this.options.autofill) {
        this.autofill();
      }

      if (document.arrive && this.options.arrive) {
        if ($.fn.ripples && this.options.ripples) {
          $(document).arrive(this.options.withRipples, function() {
            $.material.ripples($(this));
          });
        }
        if (this.options.input) {
          $(document).arrive(this.options.inputElements, function() {
            $.material.input($(this));
          });
        }
        if (this.options.checkbox) {
          $(document).arrive(this.options.checkboxElements, function() {
            $.material.checkbox($(this));
          });
        }
        if (this.options.radio) {
          $(document).arrive(this.options.radioElements, function() {
            $.material.radio($(this));
          });
        }
        if (this.options.togglebutton) {
          $(document).arrive(this.options.togglebuttonElements, function() {
            $.material.togglebutton($(this));
          });
        }

      }
    }
  };

})(jQuery);
/* Copyright 2014+, Federico Zivolo, LICENSE at https://github.com/FezVrasta/bootstrap-material-design/blob/master/LICENSE.md */
/* globals jQuery, navigator */


(function($, window, document, undefined) {

  "use strict";

  /**
   * Define the name of the plugin
   */
  var ripples = "ripples";


  /**
   * Get an instance of the plugin
   */
  var self = null;


  /**
   * Define the defaults of the plugin
   */
  var defaults = {};


  /**
   * Create the main plugin function
   */
  function Ripples(element, options) {
    self = this;

    this.element = $(element);

    this.options = $.extend({}, defaults, options);

    this._defaults = defaults;
    this._name = ripples;

    this.init();
  }


  /**
   * Initialize the plugin
   */
  Ripples.prototype.init = function() {
    var $element  = this.element;

    $element.on("mousedown touchstart", function(event) {
      /**
       * Verify if the user is just touching on a device and return if so
       */
      if(self.isTouch() && event.type === "mousedown") {
        return;
      }


      /**
       * Verify if the current element already has a ripple wrapper element and
       * creates if it doesn't
       */
      if(!($element.find(".ripple-wrapper").length)) {
        $element.append("<div class=\"ripple-wrapper\"></div>");
      }


      /**
       * Find the ripple wrapper
       */
      var $wrapper = $element.children(".ripple-wrapper");


      /**
       * Get relY and relX positions
       */
      var relY = self.getRelY($wrapper, event);
      var relX = self.getRelX($wrapper, event);


      /**
       * If relY and/or relX are false, return the event
       */
      if(!relY && !relX) {
        return;
      }


      /**
       * Get the ripple color
       */
      var rippleColor = self.getRipplesColor($element);


      /**
       * Create the ripple element
       */
      var $ripple = $("<div></div>");

      $ripple
      .addClass("ripple")
      .css({
        "left": relX,
        "top": relY,
        "background-color": rippleColor
      });


      /**
       * Append the ripple to the wrapper
       */
      $wrapper.append($ripple);


      /**
       * Make sure the ripple has the styles applied (ugly hack but it works)
       */
      (function() { return window.getComputedStyle($ripple[0]).opacity; })();


      /**
       * Turn on the ripple animation
       */
      self.rippleOn($element, $ripple);


      /**
       * Call the rippleEnd function when the transition "on" ends
       */
      setTimeout(function() {
        self.rippleEnd($ripple);
      }, 500);


      /**
       * Detect when the user leaves the element
       */
      $element.on("mouseup mouseleave touchend", function() {
        $ripple.data("mousedown", "off");

        if($ripple.data("animating") === "off") {
          self.rippleOut($ripple);
        }
      });

    });
  };


  /**
   * Get the new size based on the element height/width and the ripple width
   */
  Ripples.prototype.getNewSize = function($element, $ripple) {

    return (Math.max($element.outerWidth(), $element.outerHeight()) / $ripple.outerWidth()) * 2.5;
  };


  /**
   * Get the relX
   */
  Ripples.prototype.getRelX = function($wrapper,  event) {
    var wrapperOffset = $wrapper.offset();

    if(!self.isTouch()) {
      /**
       * Get the mouse position relative to the ripple wrapper
       */
      return event.pageX - wrapperOffset.left;
    } else {
      /**
       * Make sure the user is using only one finger and then get the touch
       * position relative to the ripple wrapper
       */
      event = event.originalEvent;

      if(event.touches.length === 1) {
        return event.touches[0].pageX - wrapperOffset.left;
      }

      return false;
    }
  };


  /**
   * Get the relY
   */
  Ripples.prototype.getRelY = function($wrapper, event) {
    var wrapperOffset = $wrapper.offset();

    if(!self.isTouch()) {
      /**
       * Get the mouse position relative to the ripple wrapper
       */
      return event.pageY - wrapperOffset.top;
    } else {
      /**
       * Make sure the user is using only one finger and then get the touch
       * position relative to the ripple wrapper
       */
      event = event.originalEvent;

      if(event.touches.length === 1) {
        return event.touches[0].pageY - wrapperOffset.top;
      }

      return false;
    }
  };


  /**
   * Get the ripple color
   */
  Ripples.prototype.getRipplesColor = function($element) {

    var color = $element.data("ripple-color") ? $element.data("ripple-color") : window.getComputedStyle($element[0]).color;

    return color;
  };


  /**
   * Verify if the client browser has transistion support
   */
  Ripples.prototype.hasTransitionSupport = function() {
    var thisBody  = document.body || document.documentElement;
    var thisStyle = thisBody.style;

    var support = (
      thisStyle.transition !== undefined ||
      thisStyle.WebkitTransition !== undefined ||
      thisStyle.MozTransition !== undefined ||
      thisStyle.MsTransition !== undefined ||
      thisStyle.OTransition !== undefined
    );

    return support;
  };


  /**
   * Verify if the client is using a mobile device
   */
  Ripples.prototype.isTouch = function() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };


  /**
   * End the animation of the ripple
   */
  Ripples.prototype.rippleEnd = function($ripple) {
    $ripple.data("animating", "off");

    if($ripple.data("mousedown") === "off") {
      self.rippleOut($ripple);
    }
  };


  /**
   * Turn off the ripple effect
   */
  Ripples.prototype.rippleOut = function($ripple) {
    $ripple.off();

    if(self.hasTransitionSupport()) {
      $ripple.addClass("ripple-out");
    } else {
      $ripple.animate({"opacity": 0}, 100, function() {
        $ripple.trigger("transitionend");
      });
    }

    $ripple.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function() {
      $ripple.remove();
    });
  };


  /**
   * Turn on the ripple effect
   */
  Ripples.prototype.rippleOn = function($element, $ripple) {
    var size = self.getNewSize($element, $ripple);

    if(self.hasTransitionSupport()) {
      $ripple
      .css({
        "-ms-transform": "scale(" + size + ")",
        "-moz-transform": "scale(" + size + ")",
        "-webkit-transform": "scale(" + size + ")",
        "transform": "scale(" + size + ")"
      })
      .addClass("ripple-on")
      .data("animating", "on")
      .data("mousedown", "on");
    } else {
      $ripple.animate({
        "width": Math.max($element.outerWidth(), $element.outerHeight()) * 2,
        "height": Math.max($element.outerWidth(), $element.outerHeight()) * 2,
        "margin-left": Math.max($element.outerWidth(), $element.outerHeight()) * (-1),
        "margin-top": Math.max($element.outerWidth(), $element.outerHeight()) * (-1),
        "opacity": 0.2
      }, 500, function() {
        $ripple.trigger("transitionend");
      });
    }
  };


  /**
   * Create the jquery plugin function
   */
  $.fn.ripples = function(options) {
    return this.each(function() {
      if(!$.data(this, "plugin_" + ripples)) {
        $.data(this, "plugin_" + ripples, new Ripples(this, options));
      }
    });
  };

})(jQuery, window, document);
/* SnackbarJS - MIT LICENSE (https://github.com/FezVrasta/snackbarjs/blob/master/LICENSE.md) */


(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function( $ ){

    $(document).ready(function() {
        $("body").append("<div id=snackbar-container/>");
    });

    function isset(variable) {
        if (typeof variable !== "undefined" && variable !== null) {
            return true;
        } else {
            return false;
        }
    }

    $(document)
    .on("click", "[data-toggle=snackbar]", function() {
        $(this).snackbar("toggle");
    })
    .on("click", "#snackbar-container .snackbar", function() {
        $(this).snackbar("hide");
    });

    $.snackbar = function(options) {

        if (isset(options) && options === Object(options)) {
            var $snackbar;

            if (!isset(options.id)) {
                $snackbar = $("<div/>").attr("id", "snackbar" + Date.now()).attr("class", "snackbar");
            } else {
                $snackbar = $("#" + options.id);
            }

            var snackbarStatus = $snackbar.hasClass("snackbar-opened");

            if (isset(options.style)) {
                $snackbar.attr("class", "snackbar " + options.style);
            } else {
                $snackbar.attr("class", "snackbar");
            }

            options.htmlAllowed = isset(options.htmlAllowed) ? options.htmlAllowed : false;

            options.timeout = (isset(options.timeout)) ? options.timeout : 3000;

            options.content = (options.htmlAllowed) ? options.content : $("<p>" + options.content + "</p>").text();

            if (isset(options.content)) {
                if ($snackbar.find(".snackbar-content").length) {
                    $snackbar.find(".snackbar-content").html(options.content);
                } else {
                    $snackbar.prepend("<span class=snackbar-content>" + options.content + "</span>");
                }
            }

            if (!isset(options.id)) {
                $snackbar.appendTo("#snackbar-container");
            } else {
                $snackbar.insertAfter("#snackbar-container .snackbar:last-child");
            }

            // Show or hide item
            if (isset(options.action) && options.action == "toggle") {
                if (snackbarStatus) {
                    options.action = "hide";
                } else {
                    options.action = "show";
                }
            }

            var animationId1 = Date.now();
            $snackbar.data("animationId1", animationId1);
            setTimeout(function() {
                if ($snackbar.data("animationId1") === animationId1) {
                    if (!isset(options.action) || options.action == "show") {
                        $snackbar.addClass("snackbar-opened");
                    } else if (isset(options.action) && options.action == "hide") {
                        $snackbar.removeClass("snackbar-opened");
                    }
                }
            }, 50);

            // Set timer for item autohide
            var animationId2 = Date.now();
            $snackbar.data("animationId2", animationId2);

            if (options.timeout !== 0) {
                setTimeout(function() {
                    if ($snackbar.data("animationId2") === animationId2) {
                        $snackbar.removeClass("snackbar-opened");
                    }
                }, options.timeout);
            }

            return $snackbar;

        } else {
            return false;
        }
    };

    $.fn.snackbar = function(action) {

        var options = {};

        if (!this.hasClass("snackbar")) {

            if (!isset(action) || action === "show" || action === "hide" || action == "toggle") {
                options = {
                    content: $(this).attr("data-content"),
                    style: $(this).attr("data-style"),
                    timeout: $(this).attr("data-timeout"),
                    htmlAllowed: $(this).attr("data-html-allowed")
                };
            }

            if (isset(action)) {
                options.id = this.attr("data-snackbar-id");

                if(action === "show" || action === "hide" || action == "toggle") {
                    options.action = action;
                }
            }

            var $snackbar = $.snackbar(options);
            this.attr("data-snackbar-id", $snackbar.attr("id"));

            return $snackbar;

        } else {

            options.id = this.attr("id");
            if(action === "show" || action === "hide" || action == "toggle") {
                options.action = action;
            }
            return $.snackbar(options);
        }

    };
}));




// https://d3js.org Version 4.7.4. Copyright 2017 Mike Bostock.
(function(t,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n(t.d3=t.d3||{})})(this,function(t){"use strict";function n(t){return function(n,e){return Ls(t(n),e)}}function e(t,n){return[t,n]}function r(t,n,e){var r=Math.abs(n-t)/Math.max(0,e),i=Math.pow(10,Math.floor(Math.log(r)/Math.LN10)),o=r/i;return o>=Js?i*=10:o>=Qs?i*=5:o>=Ks&&(i*=2),n<t?-i:i}function i(t){return t.length}function o(t){return"translate("+t+",0)"}function u(t){return"translate(0,"+t+")"}function a(t){var n=t.bandwidth()/2;return t.round()&&(n=Math.round(n)),function(e){return t(e)+n}}function c(){return!this.__axis}function s(t,n){function e(e){var o=null==s?n.ticks?n.ticks.apply(n,i):n.domain():s,u=null==f?n.tickFormat?n.tickFormat.apply(n,i):mf:f,g=Math.max(l,0)+p,y=n.range(),m=y[0]+.5,x=y[y.length-1]+.5,b=(n.bandwidth?a:mf)(n.copy()),w=e.selection?e.selection():e,M=w.selectAll(".domain").data([null]),T=w.selectAll(".tick").data(o,n).order(),k=T.exit(),S=T.enter().append("g").attr("class","tick"),N=T.select("line"),E=T.select("text");M=M.merge(M.enter().insert("path",".tick").attr("class","domain").attr("stroke","#000")),T=T.merge(S),N=N.merge(S.append("line").attr("stroke","#000").attr(r+"2",d*l).attr(v+"1",.5).attr(v+"2",.5)),E=E.merge(S.append("text").attr("fill","#000").attr(r,d*g).attr(v,.5).attr("dy",t===xf?"0em":t===wf?"0.71em":"0.32em")),e!==w&&(M=M.transition(e),T=T.transition(e),N=N.transition(e),E=E.transition(e),k=k.transition(e).attr("opacity",Tf).attr("transform",function(t){return isFinite(t=b(t))?_(t):this.getAttribute("transform")}),S.attr("opacity",Tf).attr("transform",function(t){var n=this.parentNode.__axis;return _(n&&isFinite(n=n(t))?n:b(t))})),k.remove(),M.attr("d",t===Mf||t==bf?"M"+d*h+","+m+"H0.5V"+x+"H"+d*h:"M"+m+","+d*h+"V0.5H"+x+"V"+d*h),T.attr("opacity",1).attr("transform",function(t){return _(b(t))}),N.attr(r+"2",d*l),E.attr(r,d*g).text(u),w.filter(c).attr("fill","none").attr("font-size",10).attr("font-family","sans-serif").attr("text-anchor",t===bf?"start":t===Mf?"end":"middle"),w.each(function(){this.__axis=b})}var r,i=[],s=null,f=null,l=6,h=6,p=3,d=t===xf||t===Mf?-1:1,v=t===Mf||t===bf?(r="x","y"):(r="y","x"),_=t===xf||t===wf?o:u;return e.scale=function(t){return arguments.length?(n=t,e):n},e.ticks=function(){return i=yf.call(arguments),e},e.tickArguments=function(t){return arguments.length?(i=null==t?[]:yf.call(t),e):i.slice()},e.tickValues=function(t){return arguments.length?(s=null==t?null:yf.call(t),e):s&&s.slice()},e.tickFormat=function(t){return arguments.length?(f=t,e):f},e.tickSize=function(t){return arguments.length?(l=h=+t,e):l},e.tickSizeInner=function(t){return arguments.length?(l=+t,e):l},e.tickSizeOuter=function(t){return arguments.length?(h=+t,e):h},e.tickPadding=function(t){return arguments.length?(p=+t,e):p},e}function f(t){return s(xf,t)}function l(t){return s(bf,t)}function h(t){return s(wf,t)}function p(t){return s(Mf,t)}function d(){for(var t,n=0,e=arguments.length,r={};n<e;++n){if(!(t=arguments[n]+"")||t in r)throw new Error("illegal type: "+t);r[t]=[]}return new v(r)}function v(t){this._=t}function _(t,n){return t.trim().split(/^|\s+/).map(function(t){var e="",r=t.indexOf(".");if(r>=0&&(e=t.slice(r+1),t=t.slice(0,r)),t&&!n.hasOwnProperty(t))throw new Error("unknown type: "+t);return{type:t,name:e}})}function g(t,n){for(var e,r=0,i=t.length;r<i;++r)if((e=t[r]).name===n)return e.value}function y(t,n,e){for(var r=0,i=t.length;r<i;++r)if(t[r].name===n){t[r]=kf,t=t.slice(0,r).concat(t.slice(r+1));break}return null!=e&&t.push({name:n,value:e}),t}function m(t){return function(){var n=this.ownerDocument,e=this.namespaceURI;return e===Sf&&n.documentElement.namespaceURI===Sf?n.createElement(t):n.createElementNS(e,t)}}function x(t){return function(){return this.ownerDocument.createElementNS(t.space,t.local)}}function b(){return new w}function w(){this._="@"+(++Cf).toString(36)}function M(t,n,e){return t=T(t,n,e),function(n){var e=n.relatedTarget;e&&(e===this||8&e.compareDocumentPosition(this))||t.call(this,n)}}function T(n,e,r){return function(i){var o=t.event;t.event=i;try{n.call(this,this.__data__,e,r)}finally{t.event=o}}}function k(t){return t.trim().split(/^|\s+/).map(function(t){var n="",e=t.indexOf(".");return e>=0&&(n=t.slice(e+1),t=t.slice(0,e)),{type:t,name:n}})}function S(t){return function(){var n=this.__on;if(n){for(var e,r=0,i=-1,o=n.length;r<o;++r)e=n[r],t.type&&e.type!==t.type||e.name!==t.name?n[++i]=e:this.removeEventListener(e.type,e.listener,e.capture);++i?n.length=i:delete this.__on}}}function N(t,n,e){var r=qf.hasOwnProperty(t.type)?M:T;return function(i,o,u){var a,c=this.__on,s=r(n,o,u);if(c)for(var f=0,l=c.length;f<l;++f)if((a=c[f]).type===t.type&&a.name===t.name)return this.removeEventListener(a.type,a.listener,a.capture),this.addEventListener(a.type,a.listener=s,a.capture=e),void(a.value=n);this.addEventListener(t.type,s,e),a={type:t.type,name:t.name,value:n,listener:s,capture:e},c?c.push(a):this.__on=[a]}}function E(n,e,r,i){var o=t.event;n.sourceEvent=t.event,t.event=n;try{return e.apply(r,i)}finally{t.event=o}}function A(){}function C(){return[]}function z(t,n){this.ownerDocument=t.ownerDocument,this.namespaceURI=t.namespaceURI,this._next=null,this._parent=t,this.__data__=n}function P(t,n,e,r,i,o){for(var u,a=0,c=n.length,s=o.length;a<s;++a)(u=n[a])?(u.__data__=o[a],r[a]=u):e[a]=new z(t,o[a]);for(;a<c;++a)(u=n[a])&&(i[a]=u)}function L(t,n,e,r,i,o,u){var a,c,s,f={},l=n.length,h=o.length,p=new Array(l);for(a=0;a<l;++a)(c=n[a])&&(p[a]=s=Wf+u.call(c,c.__data__,a,n),s in f?i[a]=c:f[s]=c);for(a=0;a<h;++a)s=Wf+u.call(t,o[a],a,o),(c=f[s])?(r[a]=c,c.__data__=o[a],f[s]=null):e[a]=new z(t,o[a]);for(a=0;a<l;++a)(c=n[a])&&f[p[a]]===c&&(i[a]=c)}function R(t,n){return t<n?-1:t>n?1:t>=n?0:NaN}function q(t){return function(){this.removeAttribute(t)}}function U(t){return function(){this.removeAttributeNS(t.space,t.local)}}function D(t,n){return function(){this.setAttribute(t,n)}}function O(t,n){return function(){this.setAttributeNS(t.space,t.local,n)}}function F(t,n){return function(){var e=n.apply(this,arguments);null==e?this.removeAttribute(t):this.setAttribute(t,e)}}function I(t,n){return function(){var e=n.apply(this,arguments);null==e?this.removeAttributeNS(t.space,t.local):this.setAttributeNS(t.space,t.local,e)}}function Y(t){return function(){this.style.removeProperty(t)}}function B(t,n,e){return function(){this.style.setProperty(t,n,e)}}function j(t,n,e){return function(){var r=n.apply(this,arguments);null==r?this.style.removeProperty(t):this.style.setProperty(t,r,e)}}function H(t){return function(){delete this[t]}}function X(t,n){return function(){this[t]=n}}function V(t,n){return function(){var e=n.apply(this,arguments);null==e?delete this[t]:this[t]=e}}function $(t){return t.trim().split(/^|\s+/)}function W(t){return t.classList||new Z(t)}function Z(t){this._node=t,this._names=$(t.getAttribute("class")||"")}function G(t,n){for(var e=W(t),r=-1,i=n.length;++r<i;)e.add(n[r])}function J(t,n){for(var e=W(t),r=-1,i=n.length;++r<i;)e.remove(n[r])}function Q(t){return function(){G(this,t)}}function K(t){return function(){J(this,t)}}function tt(t,n){return function(){(n.apply(this,arguments)?G:J)(this,t)}}function nt(){this.textContent=""}function et(t){return function(){this.textContent=t}}function rt(t){return function(){var n=t.apply(this,arguments);this.textContent=null==n?"":n}}function it(){this.innerHTML=""}function ot(t){return function(){this.innerHTML=t}}function ut(t){return function(){var n=t.apply(this,arguments);this.innerHTML=null==n?"":n}}function at(){this.nextSibling&&this.parentNode.appendChild(this)}function ct(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function st(){return null}function ft(){var t=this.parentNode;t&&t.removeChild(this)}function lt(t,n,e){var r=al(t),i=r.CustomEvent;i?i=new i(n,e):(i=r.document.createEvent("Event"),e?(i.initEvent(n,e.bubbles,e.cancelable),i.detail=e.detail):i.initEvent(n,!1,!1)),t.dispatchEvent(i)}function ht(t,n){return function(){return lt(this,t,n)}}function pt(t,n){return function(){return lt(this,t,n.apply(this,arguments))}}function dt(t,n){this._groups=t,this._parents=n}function vt(){return new dt([[document.documentElement]],xl)}function _t(){t.event.stopImmediatePropagation()}function gt(t,n){var e=t.document.documentElement,r=bl(t).on("dragstart.drag",null);n&&(r.on("click.drag",kl,!0),setTimeout(function(){r.on("click.drag",null)},0)),"onselectstart"in e?r.on("selectstart.drag",null):(e.style.MozUserSelect=e.__noselect,delete e.__noselect)}function yt(t,n,e,r,i,o,u,a,c,s){this.target=t,this.type=n,this.subject=e,this.identifier=r,this.active=i,this.x=o,this.y=u,this.dx=a,this.dy=c,this._=s}function mt(){return!t.event.button}function xt(){return this.parentNode}function bt(n){return null==n?{x:t.event.x,y:t.event.y}:n}function wt(t,n){var e=Object.create(t.prototype);for(var r in n)e[r]=n[r];return e}function Mt(){}function Tt(t){var n;return t=(t+"").trim().toLowerCase(),(n=Ll.exec(t))?(n=parseInt(n[1],16),new At(n>>8&15|n>>4&240,n>>4&15|240&n,(15&n)<<4|15&n,1)):(n=Rl.exec(t))?kt(parseInt(n[1],16)):(n=ql.exec(t))?new At(n[1],n[2],n[3],1):(n=Ul.exec(t))?new At(255*n[1]/100,255*n[2]/100,255*n[3]/100,1):(n=Dl.exec(t))?St(n[1],n[2],n[3],n[4]):(n=Ol.exec(t))?St(255*n[1]/100,255*n[2]/100,255*n[3]/100,n[4]):(n=Fl.exec(t))?Ct(n[1],n[2]/100,n[3]/100,1):(n=Il.exec(t))?Ct(n[1],n[2]/100,n[3]/100,n[4]):Yl.hasOwnProperty(t)?kt(Yl[t]):"transparent"===t?new At(NaN,NaN,NaN,0):null}function kt(t){return new At(t>>16&255,t>>8&255,255&t,1)}function St(t,n,e,r){return r<=0&&(t=n=e=NaN),new At(t,n,e,r)}function Nt(t){return t instanceof Mt||(t=Tt(t)),t?(t=t.rgb(),new At(t.r,t.g,t.b,t.opacity)):new At}function Et(t,n,e,r){return 1===arguments.length?Nt(t):new At(t,n,e,null==r?1:r)}function At(t,n,e,r){this.r=+t,this.g=+n,this.b=+e,this.opacity=+r}function Ct(t,n,e,r){return r<=0?t=n=e=NaN:e<=0||e>=1?t=n=NaN:n<=0&&(t=NaN),new Lt(t,n,e,r)}function zt(t){if(t instanceof Lt)return new Lt(t.h,t.s,t.l,t.opacity);if(t instanceof Mt||(t=Tt(t)),!t)return new Lt;if(t instanceof Lt)return t;t=t.rgb();var n=t.r/255,e=t.g/255,r=t.b/255,i=Math.min(n,e,r),o=Math.max(n,e,r),u=NaN,a=o-i,c=(o+i)/2;return a?(u=n===o?(e-r)/a+6*(e<r):e===o?(r-n)/a+2:(n-e)/a+4,a/=c<.5?o+i:2-o-i,u*=60):a=c>0&&c<1?0:u,new Lt(u,a,c,t.opacity)}function Pt(t,n,e,r){return 1===arguments.length?zt(t):new Lt(t,n,e,null==r?1:r)}function Lt(t,n,e,r){this.h=+t,this.s=+n,this.l=+e,this.opacity=+r}function Rt(t,n,e){return 255*(t<60?n+(e-n)*t/60:t<180?e:t<240?n+(e-n)*(240-t)/60:n)}function qt(t){if(t instanceof Dt)return new Dt(t.l,t.a,t.b,t.opacity);if(t instanceof Ht){var n=t.h*Bl;return new Dt(t.l,Math.cos(n)*t.c,Math.sin(n)*t.c,t.opacity)}t instanceof At||(t=Nt(t));var e=Yt(t.r),r=Yt(t.g),i=Yt(t.b),o=Ot((.4124564*e+.3575761*r+.1804375*i)/Hl),u=Ot((.2126729*e+.7151522*r+.072175*i)/Xl);return new Dt(116*u-16,500*(o-u),200*(u-Ot((.0193339*e+.119192*r+.9503041*i)/Vl)),t.opacity)}function Ut(t,n,e,r){return 1===arguments.length?qt(t):new Dt(t,n,e,null==r?1:r)}function Dt(t,n,e,r){this.l=+t,this.a=+n,this.b=+e,this.opacity=+r}function Ot(t){return t>Gl?Math.pow(t,1/3):t/Zl+$l}function Ft(t){return t>Wl?t*t*t:Zl*(t-$l)}function It(t){return 255*(t<=.0031308?12.92*t:1.055*Math.pow(t,1/2.4)-.055)}function Yt(t){return(t/=255)<=.04045?t/12.92:Math.pow((t+.055)/1.055,2.4)}function Bt(t){if(t instanceof Ht)return new Ht(t.h,t.c,t.l,t.opacity);t instanceof Dt||(t=qt(t));var n=Math.atan2(t.b,t.a)*jl;return new Ht(n<0?n+360:n,Math.sqrt(t.a*t.a+t.b*t.b),t.l,t.opacity)}function jt(t,n,e,r){return 1===arguments.length?Bt(t):new Ht(t,n,e,null==r?1:r)}function Ht(t,n,e,r){this.h=+t,this.c=+n,this.l=+e,this.opacity=+r}function Xt(t){if(t instanceof $t)return new $t(t.h,t.s,t.l,t.opacity);t instanceof At||(t=Nt(t));var n=t.r/255,e=t.g/255,r=t.b/255,i=(ih*r+eh*n-rh*e)/(ih+eh-rh),o=r-i,u=(nh*(e-i)-Kl*o)/th,a=Math.sqrt(u*u+o*o)/(nh*i*(1-i)),c=a?Math.atan2(u,o)*jl-120:NaN;return new $t(c<0?c+360:c,a,i,t.opacity)}function Vt(t,n,e,r){return 1===arguments.length?Xt(t):new $t(t,n,e,null==r?1:r)}function $t(t,n,e,r){this.h=+t,this.s=+n,this.l=+e,this.opacity=+r}function Wt(t,n,e,r,i){var o=t*t,u=o*t;return((1-3*t+3*o-u)*n+(4-6*o+3*u)*e+(1+3*t+3*o-3*u)*r+u*i)/6}function Zt(t,n){return function(e){return t+e*n}}function Gt(t,n,e){return t=Math.pow(t,e),n=Math.pow(n,e)-t,e=1/e,function(r){return Math.pow(t+r*n,e)}}function Jt(t,n){var e=n-t;return e?Zt(t,e>180||e<-180?e-360*Math.round(e/360):e):ph(isNaN(t)?n:t)}function Qt(t){return 1==(t=+t)?Kt:function(n,e){return e-n?Gt(n,e,t):ph(isNaN(n)?e:n)}}function Kt(t,n){var e=n-t;return e?Zt(t,e):ph(isNaN(t)?n:t)}function tn(t){return function(n){var e,r,i=n.length,o=new Array(i),u=new Array(i),a=new Array(i);for(e=0;e<i;++e)r=Et(n[e]),o[e]=r.r||0,u[e]=r.g||0,a[e]=r.b||0;return o=t(o),u=t(u),a=t(a),r.opacity=1,function(t){return r.r=o(t),r.g=u(t),r.b=a(t),r+""}}}function nn(t){return function(){return t}}function en(t){return function(n){return t(n)+""}}function rn(t){return"none"===t?Nh:(oh||(oh=document.createElement("DIV"),uh=document.documentElement,ah=document.defaultView),oh.style.transform=t,t=ah.getComputedStyle(uh.appendChild(oh),null).getPropertyValue("transform"),uh.removeChild(oh),t=t.slice(7,-1).split(","),Eh(+t[0],+t[1],+t[2],+t[3],+t[4],+t[5]))}function on(t){return null==t?Nh:(ch||(ch=document.createElementNS("http://www.w3.org/2000/svg","g")),ch.setAttribute("transform",t),(t=ch.transform.baseVal.consolidate())?(t=t.matrix,Eh(t.a,t.b,t.c,t.d,t.e,t.f)):Nh)}function un(t,n,e,r){function i(t){return t.length?t.pop()+" ":""}function o(t,r,i,o,u,a){if(t!==i||r!==o){var c=u.push("translate(",null,n,null,e);a.push({i:c-4,x:mh(t,i)},{i:c-2,x:mh(r,o)})}else(i||o)&&u.push("translate("+i+n+o+e)}function u(t,n,e,o){t!==n?(t-n>180?n+=360:n-t>180&&(t+=360),o.push({i:e.push(i(e)+"rotate(",null,r)-2,x:mh(t,n)})):n&&e.push(i(e)+"rotate("+n+r)}function a(t,n,e,o){t!==n?o.push({i:e.push(i(e)+"skewX(",null,r)-2,x:mh(t,n)}):n&&e.push(i(e)+"skewX("+n+r)}function c(t,n,e,r,o,u){if(t!==e||n!==r){var a=o.push(i(o)+"scale(",null,",",null,")");u.push({i:a-4,x:mh(t,e)},{i:a-2,x:mh(n,r)})}else 1===e&&1===r||o.push(i(o)+"scale("+e+","+r+")")}return function(n,e){var r=[],i=[];return n=t(n),e=t(e),o(n.translateX,n.translateY,e.translateX,e.translateY,r,i),u(n.rotate,e.rotate,r,i),a(n.skewX,e.skewX,r,i),c(n.scaleX,n.scaleY,e.scaleX,e.scaleY,r,i),n=e=null,function(t){for(var n,e=-1,o=i.length;++e<o;)r[(n=i[e]).i]=n.x(t);return r.join("")}}}function an(t){return((t=Math.exp(t))+1/t)/2}function cn(t){return((t=Math.exp(t))-1/t)/2}function sn(t){return((t=Math.exp(2*t))-1)/(t+1)}function fn(t){return function(n,e){var r=t((n=Pt(n)).h,(e=Pt(e)).h),i=Kt(n.s,e.s),o=Kt(n.l,e.l),u=Kt(n.opacity,e.opacity);return function(t){return n.h=r(t),n.s=i(t),n.l=o(t),n.opacity=u(t),n+""}}}function ln(t,n){var e=Kt((t=Ut(t)).l,(n=Ut(n)).l),r=Kt(t.a,n.a),i=Kt(t.b,n.b),o=Kt(t.opacity,n.opacity);return function(n){return t.l=e(n),t.a=r(n),t.b=i(n),t.opacity=o(n),t+""}}function hn(t){return function(n,e){var r=t((n=jt(n)).h,(e=jt(e)).h),i=Kt(n.c,e.c),o=Kt(n.l,e.l),u=Kt(n.opacity,e.opacity);return function(t){return n.h=r(t),n.c=i(t),n.l=o(t),n.opacity=u(t),n+""}}}function pn(t){return function n(e){function r(n,r){var i=t((n=Vt(n)).h,(r=Vt(r)).h),o=Kt(n.s,r.s),u=Kt(n.l,r.l),a=Kt(n.opacity,r.opacity);return function(t){return n.h=i(t),n.s=o(t),n.l=u(Math.pow(t,e)),n.opacity=a(t),n+""}}return e=+e,r.gamma=n,r}(1)}function dn(){return Xh||(Wh(vn),Xh=$h.now()+Vh)}function vn(){Xh=0}function _n(){this._call=this._time=this._next=null}function gn(t,n,e){var r=new _n;return r.restart(t,n,e),r}function yn(){dn(),++Ih;for(var t,n=sh;n;)(t=Xh-n._time)>=0&&n._call.call(null,t),n=n._next;--Ih}function mn(){Xh=(Hh=$h.now())+Vh,Ih=Yh=0;try{yn()}finally{Ih=0,bn(),Xh=0}}function xn(){var t=$h.now(),n=t-Hh;n>jh&&(Vh-=n,Hh=t)}function bn(){for(var t,n,e=sh,r=1/0;e;)e._call?(r>e._time&&(r=e._time),t=e,e=e._next):(n=e._next,e._next=null,e=t?t._next=n:sh=n);fh=t,wn(r)}function wn(t){if(!Ih){Yh&&(Yh=clearTimeout(Yh));var n=t-Xh;n>24?(t<1/0&&(Yh=setTimeout(mn,n)),Bh&&(Bh=clearInterval(Bh))):(Bh||(Hh=Xh,Bh=setInterval(xn,jh)),Ih=1,Wh(mn))}}function Mn(t,n){var e=t.__transition;if(!e||!(e=e[n])||e.state>Kh)throw new Error("too late");return e}function Tn(t,n){var e=t.__transition;if(!e||!(e=e[n])||e.state>np)throw new Error("too late");return e}function kn(t,n){var e=t.__transition;if(!e||!(e=e[n]))throw new Error("too late");return e}function Sn(t,n,e){function r(t){e.state=tp,e.timer.restart(i,e.delay,e.time),e.delay<=t&&i(t-e.delay)}function i(r){var s,f,l,h;if(e.state!==tp)return u();for(s in c)if(h=c[s],h.name===e.name){if(h.state===ep)return Zh(i);h.state===rp?(h.state=op,h.timer.stop(),h.on.call("interrupt",t,t.__data__,h.index,h.group),delete c[s]):+s<n&&(h.state=op,h.timer.stop(),delete c[s])}if(Zh(function(){e.state===ep&&(e.state=rp,e.timer.restart(o,e.delay,e.time),o(r))}),e.state=np,e.on.call("start",t,t.__data__,e.index,e.group),e.state===np){for(e.state=ep,a=new Array(l=e.tween.length),s=0,f=-1;s<l;++s)(h=e.tween[s].value.call(t,t.__data__,e.index,e.group))&&(a[++f]=h);a.length=f+1}}function o(n){for(var r=n<e.duration?e.ease.call(null,n/e.duration):(e.timer.restart(u),e.state=ip,1),i=-1,o=a.length;++i<o;)a[i].call(null,r);e.state===ip&&(e.on.call("end",t,t.__data__,e.index,e.group),u())}function u(){e.state=op,e.timer.stop(),delete c[n];for(var r in c)return;delete t.__transition}var a,c=t.__transition;c[n]=e,e.timer=gn(r,0,e.time)}function Nn(t,n){var e,r;return function(){var i=Tn(this,t),o=i.tween;if(o!==e){r=e=o;for(var u=0,a=r.length;u<a;++u)if(r[u].name===n){r=r.slice(),r.splice(u,1);break}}i.tween=r}}function En(t,n,e){var r,i;if("function"!=typeof e)throw new Error;return function(){var o=Tn(this,t),u=o.tween;if(u!==r){i=(r=u).slice();for(var a={name:n,value:e},c=0,s=i.length;c<s;++c)if(i[c].name===n){i[c]=a;break}c===s&&i.push(a)}o.tween=i}}function An(t,n,e){var r=t._id;return t.each(function(){var t=Tn(this,r);(t.value||(t.value={}))[n]=e.apply(this,arguments)}),function(t){return kn(t,r).value[n]}}function Cn(t){return function(){this.removeAttribute(t)}}function zn(t){return function(){this.removeAttributeNS(t.space,t.local)}}function Pn(t,n,e){var r,i;return function(){var o=this.getAttribute(t);return o===e?null:o===r?i:i=n(r=o,e)}}function Ln(t,n,e){var r,i;return function(){var o=this.getAttributeNS(t.space,t.local);return o===e?null:o===r?i:i=n(r=o,e)}}function Rn(t,n,e){var r,i,o;return function(){var u,a=e(this);return null==a?void this.removeAttribute(t):(u=this.getAttribute(t),u===a?null:u===r&&a===i?o:o=n(r=u,i=a))}}function qn(t,n,e){var r,i,o;return function(){var u,a=e(this);return null==a?void this.removeAttributeNS(t.space,t.local):(u=this.getAttributeNS(t.space,t.local),u===a?null:u===r&&a===i?o:o=n(r=u,i=a))}}function Un(t,n){function e(){var e=this,r=n.apply(e,arguments);return r&&function(n){e.setAttributeNS(t.space,t.local,r(n))}}return e._value=n,e}function Dn(t,n){function e(){var e=this,r=n.apply(e,arguments);return r&&function(n){e.setAttribute(t,r(n))}}return e._value=n,e}function On(t,n){return function(){Mn(this,t).delay=+n.apply(this,arguments)}}function Fn(t,n){return n=+n,function(){Mn(this,t).delay=n}}function In(t,n){return function(){Tn(this,t).duration=+n.apply(this,arguments)}}function Yn(t,n){return n=+n,function(){Tn(this,t).duration=n}}function Bn(t,n){if("function"!=typeof n)throw new Error;return function(){Tn(this,t).ease=n}}function jn(t){return(t+"").trim().split(/^|\s+/).every(function(t){var n=t.indexOf(".");return n>=0&&(t=t.slice(0,n)),!t||"start"===t})}function Hn(t,n,e){var r,i,o=jn(n)?Mn:Tn;return function(){var u=o(this,t),a=u.on;a!==r&&(i=(r=a).copy()).on(n,e),u.on=i}}function Xn(t){return function(){var n=this.parentNode;for(var e in this.__transition)if(+e!==t)return;n&&n.removeChild(this)}}function Vn(t,n){var e,r,i;return function(){var o=al(this).getComputedStyle(this,null),u=o.getPropertyValue(t),a=(this.style.removeProperty(t),o.getPropertyValue(t));return u===a?null:u===e&&a===r?i:i=n(e=u,r=a)}}function $n(t){return function(){this.style.removeProperty(t)}}function Wn(t,n,e){var r,i;return function(){var o=al(this).getComputedStyle(this,null).getPropertyValue(t);return o===e?null:o===r?i:i=n(r=o,e)}}function Zn(t,n,e){var r,i,o;return function(){var u=al(this).getComputedStyle(this,null),a=u.getPropertyValue(t),c=e(this);return null==c&&(this.style.removeProperty(t),c=u.getPropertyValue(t)),a===c?null:a===r&&c===i?o:o=n(r=a,i=c)}}function Gn(t,n,e){function r(){var r=this,i=n.apply(r,arguments);return i&&function(n){r.style.setProperty(t,i(n),e)}}return r._value=n,r}function Jn(t){return function(){this.textContent=t}}function Qn(t){return function(){var n=t(this);this.textContent=null==n?"":n}}function Kn(t,n,e,r){this._groups=t,this._parents=n,this._name=e,this._id=r}function te(t){return vt().transition(t)}function ne(){return++Ep}function ee(t){return+t}function re(t){return t*t}function ie(t){return t*(2-t)}function oe(t){return((t*=2)<=1?t*t:--t*(2-t)+1)/2}function ue(t){return t*t*t}function ae(t){return--t*t*t+1}function ce(t){return((t*=2)<=1?t*t*t:(t-=2)*t*t+2)/2}function se(t){return 1-Math.cos(t*Rp)}function fe(t){return Math.sin(t*Rp)}function le(t){return(1-Math.cos(Lp*t))/2}function he(t){return Math.pow(2,10*t-10)}function pe(t){return 1-Math.pow(2,-10*t)}function de(t){return((t*=2)<=1?Math.pow(2,10*t-10):2-Math.pow(2,10-10*t))/2}function ve(t){return 1-Math.sqrt(1-t*t)}function _e(t){return Math.sqrt(1- --t*t)}function ge(t){return((t*=2)<=1?1-Math.sqrt(1-t*t):Math.sqrt(1-(t-=2)*t)+1)/2}function ye(t){return 1-me(1-t)}function me(t){return(t=+t)<qp?Hp*t*t:t<Dp?Hp*(t-=Up)*t+Op:t<Ip?Hp*(t-=Fp)*t+Yp:Hp*(t-=Bp)*t+jp}function xe(t){return((t*=2)<=1?1-me(1-t):me(t-1)+1)/2}function be(t,n){for(var e;!(e=t.__transition)||!(e=e[n]);)if(!(t=t.parentNode))return Qp.time=dn(),Qp;return e}function we(){t.event.stopImmediatePropagation()}function Me(t){return{type:t}}function Te(){return!t.event.button}function ke(){var t=this.ownerSVGElement||this;return[[0,0],[t.width.baseVal.value,t.height.baseVal.value]]}function Se(t){for(;!t.__brush;)if(!(t=t.parentNode))return;return t.__brush}function Ne(t){return t[0][0]===t[1][0]||t[0][1]===t[1][1]}function Ee(t){var n=t.__brush;return n?n.dim.output(n.selection):null}function Ae(){return ze(sd)}function Ce(){return ze(fd)}function ze(n){function e(t){var e=t.property("__brush",a).selectAll(".overlay").data([Me("overlay")]);e.enter().append("rect").attr("class","overlay").attr("pointer-events","all").attr("cursor",hd.overlay).merge(e).each(function(){var t=Se(this).extent;bl(this).attr("x",t[0][0]).attr("y",t[0][1]).attr("width",t[1][0]-t[0][0]).attr("height",t[1][1]-t[0][1])}),t.selectAll(".selection").data([Me("selection")]).enter().append("rect").attr("class","selection").attr("cursor",hd.selection).attr("fill","#777").attr("fill-opacity",.3).attr("stroke","#fff").attr("shape-rendering","crispEdges");var i=t.selectAll(".handle").data(n.handles,function(t){return t.type});i.exit().remove(),i.enter().append("rect").attr("class",function(t){return"handle handle--"+t.type}).attr("cursor",function(t){return hd[t.type]}),t.each(r).attr("fill","none").attr("pointer-events","all").style("-webkit-tap-highlight-color","rgba(0,0,0,0)").on("mousedown.brush touchstart.brush",u)}function r(){var t=bl(this),n=Se(this).selection;n?(t.selectAll(".selection").style("display",null).attr("x",n[0][0]).attr("y",n[0][1]).attr("width",n[1][0]-n[0][0]).attr("height",n[1][1]-n[0][1]),t.selectAll(".handle").style("display",null).attr("x",function(t){return"e"===t.type[t.type.length-1]?n[1][0]-h/2:n[0][0]-h/2}).attr("y",function(t){return"s"===t.type[0]?n[1][1]-h/2:n[0][1]-h/2}).attr("width",function(t){return"n"===t.type||"s"===t.type?n[1][0]-n[0][0]+h:h}).attr("height",function(t){return"e"===t.type||"w"===t.type?n[1][1]-n[0][1]+h:h})):t.selectAll(".selection,.handle").style("display","none").attr("x",null).attr("y",null).attr("width",null).attr("height",null)}function i(t,n){return t.__brush.emitter||new o(t,n)}function o(t,n){this.that=t,this.args=n,this.state=t.__brush,this.active=0}function u(){function e(){var t=Ff(T);!U||w||M||(Math.abs(t[0]-O[0])>Math.abs(t[1]-O[1])?M=!0:w=!0),O=t,b=!0,id(),o()}function o(){var t;switch(m=O[0]-D[0],x=O[1]-D[1],S){case ud:case od:N&&(m=Math.max(P-l,Math.min(R-v,m)),h=l+m,_=v+m),E&&(x=Math.max(L-p,Math.min(q-g,x)),d=p+x,y=g+x);break;case ad:N<0?(m=Math.max(P-l,Math.min(R-l,m)),h=l+m,_=v):N>0&&(m=Math.max(P-v,Math.min(R-v,m)),h=l,_=v+m),E<0?(x=Math.max(L-p,Math.min(q-p,x)),d=p+x,y=g):E>0&&(x=Math.max(L-g,Math.min(q-g,x)),d=p,y=g+x);break;case cd:N&&(h=Math.max(P,Math.min(R,l-m*N)),_=Math.max(P,Math.min(R,v+m*N))),E&&(d=Math.max(L,Math.min(q,p-x*E)),y=Math.max(L,Math.min(q,g+x*E)))}_<h&&(N*=-1,t=l,l=v,v=t,t=h,h=_,_=t,k in pd&&Y.attr("cursor",hd[k=pd[k]])),y<d&&(E*=-1,t=p,p=g,g=t,t=d,d=y,y=t,k in dd&&Y.attr("cursor",hd[k=dd[k]])),A.selection&&(z=A.selection),w&&(h=z[0][0],_=z[1][0]),M&&(d=z[0][1],y=z[1][1]),z[0][0]===h&&z[0][1]===d&&z[1][0]===_&&z[1][1]===y||(A.selection=[[h,d],[_,y]],r.call(T),F.brush())}function u(){if(we(),t.event.touches){if(t.event.touches.length)return;c&&clearTimeout(c),c=setTimeout(function(){c=null},500),I.on("touchmove.brush touchend.brush touchcancel.brush",null)}else gt(t.event.view,b),B.on("keydown.brush keyup.brush mousemove.brush mouseup.brush",null);I.attr("pointer-events","all"),Y.attr("cursor",hd.overlay),A.selection&&(z=A.selection),Ne(z)&&(A.selection=null,r.call(T)),F.end()}function a(){switch(t.event.keyCode){case 16:U=N&&E;break;case 18:S===ad&&(N&&(v=_-m*N,l=h+m*N),E&&(g=y-x*E,p=d+x*E),S=cd,o());break;case 32:S!==ad&&S!==cd||(N<0?v=_-m:N>0&&(l=h-m),E<0?g=y-x:E>0&&(p=d-x),S=ud,Y.attr("cursor",hd.selection),o());break;default:return}id()}function s(){switch(t.event.keyCode){case 16:U&&(w=M=U=!1,o());break;case 18:S===cd&&(N<0?v=_:N>0&&(l=h),E<0?g=y:E>0&&(p=d),S=ad,o());break;case 32:S===ud&&(t.event.altKey?(N&&(v=_-m*N,l=h+m*N),E&&(g=y-x*E,p=d+x*E),S=cd):(N<0?v=_:N>0&&(l=h),E<0?g=y:E>0&&(p=d),S=ad),Y.attr("cursor",hd[k]),o());break;default:return}id()}if(t.event.touches){if(t.event.changedTouches.length<t.event.touches.length)return id()}else if(c)return;if(f.apply(this,arguments)){var l,h,p,d,v,_,g,y,m,x,b,w,M,T=this,k=t.event.target.__data__.type,S="selection"===(t.event.metaKey?k="overlay":k)?od:t.event.altKey?cd:ad,N=n===fd?null:vd[k],E=n===sd?null:_d[k],A=Se(T),C=A.extent,z=A.selection,P=C[0][0],L=C[0][1],R=C[1][0],q=C[1][1],U=N&&E&&t.event.shiftKey,D=Ff(T),O=D,F=i(T,arguments).beforestart();"overlay"===k?A.selection=z=[[l=n===fd?P:D[0],p=n===sd?L:D[1]],[v=n===fd?R:l,g=n===sd?q:p]]:(l=z[0][0],p=z[0][1],v=z[1][0],g=z[1][1]),h=l,d=p,_=v,y=g;var I=bl(T).attr("pointer-events","none"),Y=I.selectAll(".overlay").attr("cursor",hd[k]);if(t.event.touches)I.on("touchmove.brush",e,!0).on("touchend.brush touchcancel.brush",u,!0);else{var B=bl(t.event.view).on("keydown.brush",a,!0).on("keyup.brush",s,!0).on("mousemove.brush",e,!0).on("mouseup.brush",u,!0);Sl(t.event.view)}we(),ap(T),r.call(T),F.start()}}function a(){var t=this.__brush||{selection:null};return t.extent=s.apply(this,arguments),t.dim=n,t}var c,s=ke,f=Te,l=d(e,"start","brush","end"),h=6;return e.move=function(t,e){t.selection?t.on("start.brush",function(){i(this,arguments).beforestart().start()}).on("interrupt.brush end.brush",function(){i(this,arguments).end()}).tween("brush",function(){function t(t){u.selection=1===t&&Ne(s)?null:f(t),r.call(o),a.brush()}var o=this,u=o.__brush,a=i(o,arguments),c=u.selection,s=n.input("function"==typeof e?e.apply(this,arguments):e,u.extent),f=Th(c,s);return c&&s?t:t(1)}):t.each(function(){var t=this,o=arguments,u=t.__brush,a=n.input("function"==typeof e?e.apply(t,o):e,u.extent),c=i(t,o).beforestart();ap(t),u.selection=null==a||Ne(a)?null:a,r.call(t),c.start().brush().end()})},o.prototype={beforestart:function(){return 1==++this.active&&(this.state.emitter=this,this.starting=!0),this},start:function(){return this.starting&&(this.starting=!1,this.emit("start")),this},brush:function(){return this.emit("brush"),this},end:function(){return 0==--this.active&&(delete this.state.emitter,this.emit("end")),this},emit:function(t){E(new rd(e,t,n.output(this.state.selection)),l.apply,l,[t,this.that,this.args])}},e.extent=function(t){return arguments.length?(s="function"==typeof t?t:ed([[+t[0][0],+t[0][1]],[+t[1][0],+t[1][1]]]),e):s},e.filter=function(t){return arguments.length?(f="function"==typeof t?t:ed(!!t),e):f},e.handleSize=function(t){return arguments.length?(h=+t,e):h},e.on=function(){var t=l.on.apply(l,arguments);return t===l?e:t},e}function Pe(t){return function(n,e){return t(n.source.value+n.target.value,e.source.value+e.target.value)}}function Le(){this._x0=this._y0=this._x1=this._y1=null,this._=""}function Re(){return new Le}function qe(t){return t.source}function Ue(t){return t.target}function De(t){return t.radius}function Oe(t){return t.startAngle}function Fe(t){return t.endAngle}function Ie(){}function Ye(t,n){var e=new Ie;if(t instanceof Ie)t.each(function(t,n){e.set(n,t)});else if(Array.isArray(t)){var r,i=-1,o=t.length;if(null==n)for(;++i<o;)e.set(i,t[i]);else for(;++i<o;)e.set(n(r=t[i],i,t),r)}else if(t)for(var u in t)e.set(u,t[u]);return e}function Be(){return{}}function je(t,n,e){t[n]=e}function He(){return Ye()}function Xe(t,n,e){t.set(n,e)}function Ve(){}function $e(t,n){var e=new Ve;if(t instanceof Ve)t.each(function(t){e.add(t)});else if(t){var r=-1,i=t.length;if(null==n)for(;++r<i;)e.add(t[r]);else for(;++r<i;)e.add(n(t[r],r,t))}return e}function We(t){return new Function("d","return {"+t.map(function(t,n){return JSON.stringify(t)+": d["+n+"]"}).join(",")+"}")}function Ze(t,n){var e=We(t);return function(r,i){return n(e(r),i,t)}}function Ge(t){var n=Object.create(null),e=[];return t.forEach(function(t){for(var r in t)r in n||e.push(n[r]=r)}),e}function Je(t,n,e,r){if(isNaN(n)||isNaN(e))return t;var i,o,u,a,c,s,f,l,h,p=t._root,d={data:r},v=t._x0,_=t._y0,g=t._x1,y=t._y1;if(!p)return t._root=d,t;for(;p.length;)if((s=n>=(o=(v+g)/2))?v=o:g=o,(f=e>=(u=(_+y)/2))?_=u:y=u,i=p,!(p=p[l=f<<1|s]))return i[l]=d,t;if(a=+t._x.call(null,p.data),c=+t._y.call(null,p.data),n===a&&e===c)return d.next=p,i?i[l]=d:t._root=d,t;do{i=i?i[l]=new Array(4):t._root=new Array(4),(s=n>=(o=(v+g)/2))?v=o:g=o,(f=e>=(u=(_+y)/2))?_=u:y=u}while((l=f<<1|s)==(h=(c>=u)<<1|a>=o));return i[h]=p,i[l]=d,t}function Qe(t){var n,e,r,i,o=t.length,u=new Array(o),a=new Array(o),c=1/0,s=1/0,f=-(1/0),l=-(1/0);for(e=0;e<o;++e)isNaN(r=+this._x.call(null,n=t[e]))||isNaN(i=+this._y.call(null,n))||(u[e]=r,a[e]=i,r<c&&(c=r),r>f&&(f=r),i<s&&(s=i),i>l&&(l=i));for(f<c&&(c=this._x0,f=this._x1),l<s&&(s=this._y0,l=this._y1),this.cover(c,s).cover(f,l),e=0;e<o;++e)Je(this,u[e],a[e],t[e]);return this}function Ke(t){for(var n=0,e=t.length;n<e;++n)this.remove(t[n]);return this}function tr(t){return t[0]}function nr(t){return t[1]}function er(t,n,e){var r=new rr(null==n?tr:n,null==e?nr:e,NaN,NaN,NaN,NaN);return null==t?r:r.addAll(t)}function rr(t,n,e,r,i,o){this._x=t,this._y=n,this._x0=e,this._y0=r,this._x1=i,this._y1=o,this._root=void 0}function ir(t){for(var n={data:t.data},e=n;t=t.next;)e=e.next={data:t.data};return n}function or(t){return t.x+t.vx}function ur(t){return t.y+t.vy}function ar(t){return t.index}function cr(t,n){var e=t.get(n);if(!e)throw new Error("missing: "+n);return e}function sr(t){return t.x}function fr(t){return t.y}function lr(t){return new hr(t)}function hr(t){if(!(n=Nv.exec(t)))throw new Error("invalid format: "+t);var n,e=n[1]||" ",r=n[2]||">",i=n[3]||"-",o=n[4]||"",u=!!n[5],a=n[6]&&+n[6],c=!!n[7],s=n[8]&&+n[8].slice(1),f=n[9]||"";"n"===f?(c=!0,f="g"):Sv[f]||(f=""),(u||"0"===e&&"="===r)&&(u=!0,e="0",r="="),this.fill=e,this.align=r,this.sign=i,this.symbol=o,this.zero=u,this.width=a,this.comma=c,this.precision=s,this.type=f}function pr(n){
return Ev=zv(n),t.format=Ev.format,t.formatPrefix=Ev.formatPrefix,Ev}function dr(){this.reset()}function vr(t,n,e){var r=t.s=n+e,i=r-n,o=r-i;t.t=n-o+(e-i)}function _r(t){return t>1?0:t<-1?v_:Math.acos(t)}function gr(t){return t>1?__:t<-1?-__:Math.asin(t)}function yr(t){return(t=A_(t/2))*t}function mr(){}function xr(t,n){t&&R_.hasOwnProperty(t.type)&&R_[t.type](t,n)}function br(t,n,e){var r,i=-1,o=t.length-e;for(n.lineStart();++i<o;)r=t[i],n.point(r[0],r[1],r[2]);n.lineEnd()}function wr(t,n){var e=-1,r=t.length;for(n.polygonStart();++e<r;)br(t[e],n,1);n.polygonEnd()}function Mr(){O_.point=kr}function Tr(){Sr(Uv,Dv)}function kr(t,n){O_.point=Sr,Uv=t,Dv=n,t*=x_,n*=x_,Ov=t,Fv=T_(n=n/2+g_),Iv=A_(n)}function Sr(t,n){t*=x_,n*=x_,n=n/2+g_;var e=t-Ov,r=e>=0?1:-1,i=r*e,o=T_(n),u=A_(n),a=Iv*u,c=Fv*o+a*T_(i),s=a*r*A_(i);U_.add(M_(s,c)),Ov=t,Fv=o,Iv=u}function Nr(t){return[M_(t[1],t[0]),gr(t[2])]}function Er(t){var n=t[0],e=t[1],r=T_(e);return[r*T_(n),r*A_(n),A_(e)]}function Ar(t,n){return t[0]*n[0]+t[1]*n[1]+t[2]*n[2]}function Cr(t,n){return[t[1]*n[2]-t[2]*n[1],t[2]*n[0]-t[0]*n[2],t[0]*n[1]-t[1]*n[0]]}function zr(t,n){t[0]+=n[0],t[1]+=n[1],t[2]+=n[2]}function Pr(t,n){return[t[0]*n,t[1]*n,t[2]*n]}function Lr(t){var n=z_(t[0]*t[0]+t[1]*t[1]+t[2]*t[2]);t[0]/=n,t[1]/=n,t[2]/=n}function Rr(t,n){Zv.push(Gv=[Yv=t,jv=t]),n<Bv&&(Bv=n),n>Hv&&(Hv=n)}function qr(t,n){var e=Er([t*x_,n*x_]);if(Wv){var r=Cr(Wv,e),i=[r[1],-r[0],0],o=Cr(i,r);Lr(o),o=Nr(o);var u,a=t-Xv,c=a>0?1:-1,s=o[0]*m_*c,f=b_(a)>180;f^(c*Xv<s&&s<c*t)?(u=o[1]*m_)>Hv&&(Hv=u):(s=(s+360)%360-180,f^(c*Xv<s&&s<c*t)?(u=-o[1]*m_)<Bv&&(Bv=u):(n<Bv&&(Bv=n),n>Hv&&(Hv=n))),f?t<Xv?Yr(Yv,t)>Yr(Yv,jv)&&(jv=t):Yr(t,jv)>Yr(Yv,jv)&&(Yv=t):jv>=Yv?(t<Yv&&(Yv=t),t>jv&&(jv=t)):t>Xv?Yr(Yv,t)>Yr(Yv,jv)&&(jv=t):Yr(t,jv)>Yr(Yv,jv)&&(Yv=t)}else Zv.push(Gv=[Yv=t,jv=t]);n<Bv&&(Bv=n),n>Hv&&(Hv=n),Wv=e,Xv=t}function Ur(){Y_.point=qr}function Dr(){Gv[0]=Yv,Gv[1]=jv,Y_.point=Rr,Wv=null}function Or(t,n){if(Wv){var e=t-Xv;I_.add(b_(e)>180?e+(e>0?360:-360):e)}else Vv=t,$v=n;O_.point(t,n),qr(t,n)}function Fr(){O_.lineStart()}function Ir(){Or(Vv,$v),O_.lineEnd(),b_(I_)>d_&&(Yv=-(jv=180)),Gv[0]=Yv,Gv[1]=jv,Wv=null}function Yr(t,n){return(n-=t)<0?n+360:n}function Br(t,n){return t[0]-n[0]}function jr(t,n){return t[0]<=t[1]?t[0]<=n&&n<=t[1]:n<t[0]||t[1]<n}function Hr(t,n){t*=x_,n*=x_;var e=T_(n);Xr(e*T_(t),e*A_(t),A_(n))}function Xr(t,n,e){++Jv,Kv+=(t-Kv)/Jv,t_+=(n-t_)/Jv,n_+=(e-n_)/Jv}function Vr(){j_.point=$r}function $r(t,n){t*=x_,n*=x_;var e=T_(n);f_=e*T_(t),l_=e*A_(t),h_=A_(n),j_.point=Wr,Xr(f_,l_,h_)}function Wr(t,n){t*=x_,n*=x_;var e=T_(n),r=e*T_(t),i=e*A_(t),o=A_(n),u=M_(z_((u=l_*o-h_*i)*u+(u=h_*r-f_*o)*u+(u=f_*i-l_*r)*u),f_*r+l_*i+h_*o);Qv+=u,e_+=u*(f_+(f_=r)),r_+=u*(l_+(l_=i)),i_+=u*(h_+(h_=o)),Xr(f_,l_,h_)}function Zr(){j_.point=Hr}function Gr(){j_.point=Qr}function Jr(){Kr(c_,s_),j_.point=Hr}function Qr(t,n){c_=t,s_=n,t*=x_,n*=x_,j_.point=Kr;var e=T_(n);f_=e*T_(t),l_=e*A_(t),h_=A_(n),Xr(f_,l_,h_)}function Kr(t,n){t*=x_,n*=x_;var e=T_(n),r=e*T_(t),i=e*A_(t),o=A_(n),u=l_*o-h_*i,a=h_*r-f_*o,c=f_*i-l_*r,s=z_(u*u+a*a+c*c),f=gr(s),l=s&&-f/s;o_+=l*u,u_+=l*a,a_+=l*c,Qv+=f,e_+=f*(f_+(f_=r)),r_+=f*(l_+(l_=i)),i_+=f*(h_+(h_=o)),Xr(f_,l_,h_)}function ti(t,n){return[t>v_?t-y_:t<-v_?t+y_:t,n]}function ni(t,n,e){return(t%=y_)?n||e?V_(ri(t),ii(n,e)):ri(t):n||e?ii(n,e):ti}function ei(t){return function(n,e){return n+=t,[n>v_?n-y_:n<-v_?n+y_:n,e]}}function ri(t){var n=ei(t);return n.invert=ei(-t),n}function ii(t,n){function e(t,n){var e=T_(n),a=T_(t)*e,c=A_(t)*e,s=A_(n),f=s*r+a*i;return[M_(c*o-f*u,a*r-s*i),gr(f*o+c*u)]}var r=T_(t),i=A_(t),o=T_(n),u=A_(n);return e.invert=function(t,n){var e=T_(n),a=T_(t)*e,c=A_(t)*e,s=A_(n),f=s*o-c*u;return[M_(c*o+s*u,a*r+f*i),gr(f*r-a*i)]},e}function oi(t,n,e,r,i,o){if(e){var u=T_(n),a=A_(n),c=r*e;null==i?(i=n+r*y_,o=n-c/2):(i=ui(u,i),o=ui(u,o),(r>0?i<o:i>o)&&(i+=r*y_));for(var s,f=i;r>0?f>o:f<o;f-=c)s=Nr([u,-a*T_(f),-a*A_(f)]),t.point(s[0],s[1])}}function ui(t,n){n=Er(n),n[0]-=t,Lr(n);var e=_r(-n[1]);return((-n[2]<0?-e:e)+y_-d_)%y_}function ai(t,n,e,r){this.x=t,this.z=n,this.o=e,this.e=r,this.v=!1,this.n=this.p=null}function ci(t){if(n=t.length){for(var n,e,r=0,i=t[0];++r<n;)i.n=e=t[r],e.p=i,i=e;i.n=e=t[0],e.p=i}}function si(t,n,e,r){function i(i,o){return t<=i&&i<=e&&n<=o&&o<=r}function o(i,o,a,s){var f=0,l=0;if(null==i||(f=u(i,a))!==(l=u(o,a))||c(i,o)<0^a>0)do{s.point(0===f||3===f?t:e,f>1?r:n)}while((f=(f+a+4)%4)!==l);else s.point(o[0],o[1])}function u(r,i){return b_(r[0]-t)<d_?i>0?0:3:b_(r[0]-e)<d_?i>0?2:1:b_(r[1]-n)<d_?i>0?1:0:i>0?3:2}function a(t,n){return c(t.x,n.x)}function c(t,n){var e=u(t,1),r=u(n,1);return e!==r?e-r:0===e?n[1]-t[1]:1===e?t[0]-n[0]:2===e?t[1]-n[1]:n[0]-t[0]}return function(u){function c(t,n){i(t,n)&&S.point(t,n)}function s(){for(var n=0,e=0,i=_.length;e<i;++e)for(var o,u,a=_[e],c=1,s=a.length,f=a[0],l=f[0],h=f[1];c<s;++c)o=l,u=h,f=a[c],l=f[0],h=f[1],u<=r?h>r&&(l-o)*(r-u)>(h-u)*(t-o)&&++n:h<=r&&(l-o)*(r-u)<(h-u)*(t-o)&&--n;return n}function f(){S=N,v=[],_=[],k=!0}function l(){var t=s(),n=k&&t,e=(v=ff(v)).length;(n||e)&&(u.polygonStart(),n&&(u.lineStart(),o(null,null,1,u),u.lineEnd()),e&&sg(v,a,t,o,u),u.polygonEnd()),S=u,v=_=g=null}function h(){E.point=d,_&&_.push(g=[]),T=!0,M=!1,b=w=NaN}function p(){v&&(d(y,m),x&&M&&N.rejoin(),v.push(N.result())),E.point=c,M&&S.lineEnd()}function d(o,u){var a=i(o,u);if(_&&g.push([o,u]),T)y=o,m=u,x=a,T=!1,a&&(S.lineStart(),S.point(o,u));else if(a&&M)S.point(o,u);else{var c=[b=Math.max(lg,Math.min(fg,b)),w=Math.max(lg,Math.min(fg,w))],s=[o=Math.max(lg,Math.min(fg,o)),u=Math.max(lg,Math.min(fg,u))];ag(c,s,t,n,e,r)?(M||(S.lineStart(),S.point(c[0],c[1])),S.point(s[0],s[1]),a||S.lineEnd(),k=!1):a&&(S.lineStart(),S.point(o,u),k=!1)}b=o,w=u,M=a}var v,_,g,y,m,x,b,w,M,T,k,S=u,N=ug(),E={point:c,lineStart:h,lineEnd:p,polygonStart:f,polygonEnd:l};return E}}function fi(){_g.point=hi,_g.lineEnd=li}function li(){_g.point=_g.lineEnd=mr}function hi(t,n){t*=x_,n*=x_,$_=t,W_=A_(n),Z_=T_(n),_g.point=pi}function pi(t,n){t*=x_,n*=x_;var e=A_(n),r=T_(n),i=b_(t-$_),o=T_(i),u=A_(i),a=r*u,c=Z_*e-W_*r*o,s=W_*e+Z_*r*o;vg.add(M_(z_(a*a+c*c),s)),$_=t,W_=e,Z_=r}function di(t,n){return!(!t||!wg.hasOwnProperty(t.type))&&wg[t.type](t,n)}function vi(t,n){return 0===xg(t,n)}function _i(t,n){var e=xg(t[0],t[1]);return xg(t[0],n)+xg(n,t[1])<=e+d_}function gi(t,n){return!!dg(t.map(yi),mi(n))}function yi(t){return t=t.map(mi),t.pop(),t}function mi(t){return[t[0]*x_,t[1]*x_]}function xi(t,n,e){var r=Gs(t,n-d_,e).concat(n);return function(t){return r.map(function(n){return[t,n]})}}function bi(t,n,e){var r=Gs(t,n-d_,e).concat(n);return function(t){return r.map(function(n){return[n,t]})}}function wi(){function t(){return{type:"MultiLineString",coordinates:n()}}function n(){return Gs(k_(o/_)*_,i,_).map(h).concat(Gs(k_(s/g)*g,c,g).map(p)).concat(Gs(k_(r/d)*d,e,d).filter(function(t){return b_(t%_)>d_}).map(f)).concat(Gs(k_(a/v)*v,u,v).filter(function(t){return b_(t%g)>d_}).map(l))}var e,r,i,o,u,a,c,s,f,l,h,p,d=10,v=d,_=90,g=360,y=2.5;return t.lines=function(){return n().map(function(t){return{type:"LineString",coordinates:t}})},t.outline=function(){return{type:"Polygon",coordinates:[h(o).concat(p(c).slice(1),h(i).reverse().slice(1),p(s).reverse().slice(1))]}},t.extent=function(n){return arguments.length?t.extentMajor(n).extentMinor(n):t.extentMinor()},t.extentMajor=function(n){return arguments.length?(o=+n[0][0],i=+n[1][0],s=+n[0][1],c=+n[1][1],o>i&&(n=o,o=i,i=n),s>c&&(n=s,s=c,c=n),t.precision(y)):[[o,s],[i,c]]},t.extentMinor=function(n){return arguments.length?(r=+n[0][0],e=+n[1][0],a=+n[0][1],u=+n[1][1],r>e&&(n=r,r=e,e=n),a>u&&(n=a,a=u,u=n),t.precision(y)):[[r,a],[e,u]]},t.step=function(n){return arguments.length?t.stepMajor(n).stepMinor(n):t.stepMinor()},t.stepMajor=function(n){return arguments.length?(_=+n[0],g=+n[1],t):[_,g]},t.stepMinor=function(n){return arguments.length?(d=+n[0],v=+n[1],t):[d,v]},t.precision=function(n){return arguments.length?(y=+n,f=xi(a,u,90),l=bi(r,e,y),h=xi(s,c,90),p=bi(o,i,y),t):y},t.extentMajor([[-180,-90+d_],[180,90-d_]]).extentMinor([[-180,-80-d_],[180,80+d_]])}function Mi(){return wi()()}function Ti(){Eg.point=ki}function ki(t,n){Eg.point=Si,G_=Q_=t,J_=K_=n}function Si(t,n){Ng.add(K_*t-Q_*n),Q_=t,K_=n}function Ni(){Si(G_,J_)}function Ei(t,n){t<Ag&&(Ag=t),t>zg&&(zg=t),n<Cg&&(Cg=n),n>Pg&&(Pg=n)}function Ai(t,n){Rg+=t,qg+=n,++Ug}function Ci(){jg.point=zi}function zi(t,n){jg.point=Pi,Ai(eg=t,rg=n)}function Pi(t,n){var e=t-eg,r=n-rg,i=z_(e*e+r*r);Dg+=i*(eg+t)/2,Og+=i*(rg+n)/2,Fg+=i,Ai(eg=t,rg=n)}function Li(){jg.point=Ai}function Ri(){jg.point=Ui}function qi(){Di(tg,ng)}function Ui(t,n){jg.point=Di,Ai(tg=eg=t,ng=rg=n)}function Di(t,n){var e=t-eg,r=n-rg,i=z_(e*e+r*r);Dg+=i*(eg+t)/2,Og+=i*(rg+n)/2,Fg+=i,i=rg*t-eg*n,Ig+=i*(eg+t),Yg+=i*(rg+n),Bg+=3*i,Ai(eg=t,rg=n)}function Oi(t){this._context=t}function Fi(t,n){Gg.point=Ii,Xg=$g=t,Vg=Wg=n}function Ii(t,n){$g-=t,Wg-=n,Zg.add(z_($g*$g+Wg*Wg)),$g=t,Wg=n}function Yi(){this._string=[]}function Bi(t){return"m0,"+t+"a"+t+","+t+" 0 1,1 0,"+-2*t+"a"+t+","+t+" 0 1,1 0,"+2*t+"z"}function ji(t){return t.length>1}function Hi(t,n){return((t=t.x)[0]<0?t[1]-__-d_:__-t[1])-((n=n.x)[0]<0?n[1]-__-d_:__-n[1])}function Xi(t){var n,e=NaN,r=NaN,i=NaN;return{lineStart:function(){t.lineStart(),n=1},point:function(o,u){var a=o>0?v_:-v_,c=b_(o-e);b_(c-v_)<d_?(t.point(e,r=(r+u)/2>0?__:-__),t.point(i,r),t.lineEnd(),t.lineStart(),t.point(a,r),t.point(o,r),n=0):i!==a&&c>=v_&&(b_(e-i)<d_&&(e-=i*d_),b_(o-a)<d_&&(o-=a*d_),r=Vi(e,r,o,u),t.point(i,r),t.lineEnd(),t.lineStart(),t.point(a,r),n=0),t.point(e=o,r=u),i=a},lineEnd:function(){t.lineEnd(),e=r=NaN},clean:function(){return 2-n}}}function Vi(t,n,e,r){var i,o,u=A_(t-e);return b_(u)>d_?w_((A_(n)*(o=T_(r))*A_(e)-A_(r)*(i=T_(n))*A_(t))/(i*o*u)):(n+r)/2}function $i(t,n,e,r){var i;if(null==t)i=e*__,r.point(-v_,i),r.point(0,i),r.point(v_,i),r.point(v_,0),r.point(v_,-i),r.point(0,-i),r.point(-v_,-i),r.point(-v_,0),r.point(-v_,i);else if(b_(t[0]-n[0])>d_){var o=t[0]<n[0]?v_:-v_;i=e*o/2,r.point(-o,i),r.point(0,i),r.point(o,i)}else r.point(n[0],n[1])}function Wi(t){return function(n){var e=new Zi;for(var r in t)e[r]=t[r];return e.stream=n,e}}function Zi(){}function Gi(t,n,e){var r=n[1][0]-n[0][0],i=n[1][1]-n[0][1],o=t.clipExtent&&t.clipExtent();t.scale(150).translate([0,0]),null!=o&&t.clipExtent(null),q_(e,t.stream(Lg));var u=Lg.result(),a=Math.min(r/(u[1][0]-u[0][0]),i/(u[1][1]-u[0][1])),c=+n[0][0]+(r-a*(u[1][0]+u[0][0]))/2,s=+n[0][1]+(i-a*(u[1][1]+u[0][1]))/2;return null!=o&&t.clipExtent(o),t.scale(150*a).translate([c,s])}function Ji(t,n,e){return Gi(t,[[0,0],n],e)}function Qi(t){return Wi({point:function(n,e){n=t(n,e),this.stream.point(n[0],n[1])}})}function Ki(t,n){function e(r,i,o,u,a,c,s,f,l,h,p,d,v,_){var g=s-r,y=f-i,m=g*g+y*y;if(m>4*n&&v--){var x=u+h,b=a+p,w=c+d,M=z_(x*x+b*b+w*w),T=gr(w/=M),k=b_(b_(w)-1)<d_||b_(o-l)<d_?(o+l)/2:M_(b,x),S=t(k,T),N=S[0],E=S[1],A=N-r,C=E-i,z=y*A-g*C;(z*z/m>n||b_((g*A+y*C)/m-.5)>.3||u*h+a*p+c*d<ry)&&(e(r,i,o,u,a,c,N,E,k,x/=M,b/=M,w,v,_),_.point(N,E),e(N,E,k,x,b,w,s,f,l,h,p,d,v,_))}}return function(n){function r(e,r){e=t(e,r),n.point(e[0],e[1])}function i(){g=NaN,w.point=o,n.lineStart()}function o(r,i){var o=Er([r,i]),u=t(r,i);e(g,y,_,m,x,b,g=u[0],y=u[1],_=r,m=o[0],x=o[1],b=o[2],ey,n),n.point(g,y)}function u(){w.point=r,n.lineEnd()}function a(){i(),w.point=c,w.lineEnd=s}function c(t,n){o(f=t,n),l=g,h=y,p=m,d=x,v=b,w.point=o}function s(){e(g,y,_,m,x,b,l,h,f,p,d,v,ey,n),w.lineEnd=u,u()}var f,l,h,p,d,v,_,g,y,m,x,b,w={point:r,lineStart:i,lineEnd:u,polygonStart:function(){n.polygonStart(),w.lineStart=a},polygonEnd:function(){n.polygonEnd(),w.lineStart=i}};return w}}function to(t){return no(function(){return t})()}function no(t){function n(t){return t=f(t[0]*x_,t[1]*x_),[t[0]*_+a,c-t[1]*_]}function e(t){return(t=f.invert((t[0]-a)/_,(c-t[1])/_))&&[t[0]*m_,t[1]*m_]}function r(t,n){return t=u(t,n),[t[0]*_+a,c-t[1]*_]}function i(){f=V_(s=ni(b,w,M),u);var t=u(m,x);return a=g-t[0]*_,c=y+t[1]*_,o()}function o(){return d=v=null,n}var u,a,c,s,f,l,h,p,d,v,_=150,g=480,y=250,m=0,x=0,b=0,w=0,M=0,T=null,k=Kg,S=null,N=kg,E=.5,A=iy(r,E);return n.stream=function(t){return d&&v===t?d:d=oy(k(s,A(N(v=t))))},n.clipAngle=function(t){return arguments.length?(k=+t?ty(T=t*x_,6*x_):(T=null,Kg),o()):T*m_},n.clipExtent=function(t){return arguments.length?(N=null==t?(S=l=h=p=null,kg):si(S=+t[0][0],l=+t[0][1],h=+t[1][0],p=+t[1][1]),o()):null==S?null:[[S,l],[h,p]]},n.scale=function(t){return arguments.length?(_=+t,i()):_},n.translate=function(t){return arguments.length?(g=+t[0],y=+t[1],i()):[g,y]},n.center=function(t){return arguments.length?(m=t[0]%360*x_,x=t[1]%360*x_,i()):[m*m_,x*m_]},n.rotate=function(t){return arguments.length?(b=t[0]%360*x_,w=t[1]%360*x_,M=t.length>2?t[2]%360*x_:0,i()):[b*m_,w*m_,M*m_]},n.precision=function(t){return arguments.length?(A=iy(r,E=t*t),o()):z_(E)},n.fitExtent=function(t,e){return Gi(n,t,e)},n.fitSize=function(t,e){return Ji(n,t,e)},function(){return u=t.apply(this,arguments),n.invert=u.invert&&e,i()}}function eo(t){var n=0,e=v_/3,r=no(t),i=r(n,e);return i.parallels=function(t){return arguments.length?r(n=t[0]*x_,e=t[1]*x_):[n*m_,e*m_]},i}function ro(t){function n(t,n){return[t*e,A_(n)/e]}var e=T_(t);return n.invert=function(t,n){return[t/e,gr(n*e)]},n}function io(t,n){function e(t,n){var e=z_(o-2*i*A_(n))/i;return[e*A_(t*=i),u-e*T_(t)]}var r=A_(t),i=(r+A_(n))/2;if(b_(i)<d_)return ro(t);var o=1+r*(2*i-r),u=z_(o)/i;return e.invert=function(t,n){var e=u-n;return[M_(t,b_(e))/i*C_(e),gr((o-(t*t+e*e)*i*i)/(2*i))]},e}function oo(t){var n=t.length;return{point:function(e,r){for(var i=-1;++i<n;)t[i].point(e,r)},sphere:function(){for(var e=-1;++e<n;)t[e].sphere()},lineStart:function(){for(var e=-1;++e<n;)t[e].lineStart()},lineEnd:function(){for(var e=-1;++e<n;)t[e].lineEnd()},polygonStart:function(){for(var e=-1;++e<n;)t[e].polygonStart()},polygonEnd:function(){for(var e=-1;++e<n;)t[e].polygonEnd()}}}function uo(t){return function(n,e){var r=T_(n),i=T_(e),o=t(r*i);return[o*i*A_(n),o*A_(e)]}}function ao(t){return function(n,e){var r=z_(n*n+e*e),i=t(r),o=A_(i),u=T_(i);return[M_(n*o,r*u),gr(r&&e*o/r)]}}function co(t,n){return[t,N_(P_((__+n)/2))]}function so(t){function n(){var n=v_*a(),u=o(ig(o.rotate()).invert([0,0]));return s(null==f?[[u[0]-n,u[1]-n],[u[0]+n,u[1]+n]]:t===co?[[Math.max(u[0]-n,f),e],[Math.min(u[0]+n,r),i]]:[[f,Math.max(u[1]-n,e)],[r,Math.min(u[1]+n,i)]])}var e,r,i,o=to(t),u=o.center,a=o.scale,c=o.translate,s=o.clipExtent,f=null;return o.scale=function(t){return arguments.length?(a(t),n()):a()},o.translate=function(t){return arguments.length?(c(t),n()):c()},o.center=function(t){return arguments.length?(u(t),n()):u()},o.clipExtent=function(t){return arguments.length?(null==t?f=e=r=i=null:(f=+t[0][0],e=+t[0][1],r=+t[1][0],i=+t[1][1]),n()):null==f?null:[[f,e],[r,i]]},n()}function fo(t){return P_((__+t)/2)}function lo(t,n){function e(t,n){o>0?n<-__+d_&&(n=-__+d_):n>__-d_&&(n=__-d_);var e=o/E_(fo(n),i);return[e*A_(i*t),o-e*T_(i*t)]}var r=T_(t),i=t===n?A_(t):N_(r/T_(n))/N_(fo(n)/fo(t)),o=r*E_(fo(t),i)/i;return i?(e.invert=function(t,n){var e=o-n,r=C_(i)*z_(t*t+e*e);return[M_(t,b_(e))/i*C_(e),2*w_(E_(o/r,1/i))-__]},e):co}function ho(t,n){return[t,n]}function po(t,n){function e(t,n){var e=o-n,r=i*t;return[e*A_(r),o-e*T_(r)]}var r=T_(t),i=t===n?A_(t):(r-T_(n))/(n-t),o=r/i+t;return b_(i)<d_?ho:(e.invert=function(t,n){var e=o-n;return[M_(t,b_(e))/i*C_(e),o-C_(i)*z_(t*t+e*e)]},e)}function vo(t,n){var e=T_(n),r=T_(t)*e;return[e*A_(t)/r,A_(n)/r]}function _o(t,n,e,r){return 1===t&&1===n&&0===e&&0===r?kg:Wi({point:function(i,o){this.stream.point(i*t+e,o*n+r)}})}function go(t,n){return[T_(n)*A_(t),A_(n)]}function yo(t,n){var e=T_(n),r=1+T_(t)*e;return[e*A_(t)/r,A_(n)/r]}function mo(t,n){return[N_(P_((__+n)/2)),-t]}function xo(t,n){return t.parent===n.parent?1:2}function bo(t){return t.reduce(wo,0)/t.length}function wo(t,n){return t+n.x}function Mo(t){return 1+t.reduce(To,0)}function To(t,n){return Math.max(t,n.y)}function ko(t){for(var n;n=t.children;)t=n[0];return t}function So(t){for(var n;n=t.children;)t=n[n.length-1];return t}function No(t){var n=0,e=t.children,r=e&&e.length;if(r)for(;--r>=0;)n+=e[r].value;else n=1;t.value=n}function Eo(t,n){if(t===n)return t;var e=t.ancestors(),r=n.ancestors(),i=null;for(t=e.pop(),n=r.pop();t===n;)i=t,t=e.pop(),n=r.pop();return i}function Ao(t,n){var e,r,i,o,u,a=new Ro(t),c=+t.value&&(a.value=t.value),s=[a];for(null==n&&(n=zo);e=s.pop();)if(c&&(e.value=+e.data.value),(i=n(e.data))&&(u=i.length))for(e.children=new Array(u),o=u-1;o>=0;--o)s.push(r=e.children[o]=new Ro(i[o])),r.parent=e,r.depth=e.depth+1;return a.eachBefore(Lo)}function Co(){return Ao(this).eachBefore(Po)}function zo(t){return t.children}function Po(t){t.data=t.data.data}function Lo(t){var n=0;do{t.height=n}while((t=t.parent)&&t.height<++n)}function Ro(t){this.data=t,this.depth=this.height=0,this.parent=null}function qo(t){this._=t,this.next=null}function Uo(t,n){var e=n.x-t.x,r=n.y-t.y,i=t.r-n.r;return i*i+1e-6>e*e+r*r}function Do(t,n){var e,r,i,o=null,u=t.head;switch(n.length){case 1:e=Oo(n[0]);break;case 2:e=Fo(n[0],n[1]);break;case 3:e=Io(n[0],n[1],n[2])}for(;u;)i=u._,r=u.next,e&&Uo(e,i)?o=u:(o?(t.tail=o,o.next=null):t.head=t.tail=null,n.push(i),e=Do(t,n),n.pop(),t.head?(u.next=t.head,t.head=u):(u.next=null,t.head=t.tail=u),o=t.tail,o.next=r),u=r;return t.tail=o,e}function Oo(t){return{x:t.x,y:t.y,r:t.r}}function Fo(t,n){var e=t.x,r=t.y,i=t.r,o=n.x,u=n.y,a=n.r,c=o-e,s=u-r,f=a-i,l=Math.sqrt(c*c+s*s);return{x:(e+o+c/l*f)/2,y:(r+u+s/l*f)/2,r:(l+i+a)/2}}function Io(t,n,e){var r=t.x,i=t.y,o=t.r,u=n.x,a=n.y,c=n.r,s=e.x,f=e.y,l=e.r,h=2*(r-u),p=2*(i-a),d=2*(c-o),v=r*r+i*i-o*o-u*u-a*a+c*c,_=2*(r-s),g=2*(i-f),y=2*(l-o),m=r*r+i*i-o*o-s*s-f*f+l*l,x=_*p-h*g,b=(p*m-g*v)/x-r,w=(g*d-p*y)/x,M=(_*v-h*m)/x-i,T=(h*y-_*d)/x,k=w*w+T*T-1,S=2*(b*w+M*T+o),N=b*b+M*M-o*o,E=(-S-Math.sqrt(S*S-4*k*N))/(2*k);return{x:b+w*E+r,y:M+T*E+i,r:E}}function Yo(t,n,e){var r=t.x,i=t.y,o=n.r+e.r,u=t.r+e.r,a=n.x-r,c=n.y-i,s=a*a+c*c;if(s){var f=.5+((u*=u)-(o*=o))/(2*s),l=Math.sqrt(Math.max(0,2*o*(u+s)-(u-=s)*u-o*o))/(2*s);e.x=r+f*a+l*c,e.y=i+f*c-l*a}else e.x=r+u,e.y=i}function Bo(t,n){var e=n.x-t.x,r=n.y-t.y,i=t.r+n.r;return i*i-1e-6>e*e+r*r}function jo(t,n,e){var r=t._,i=t.next._,o=r.r+i.r,u=(r.x*i.r+i.x*r.r)/o-n,a=(r.y*i.r+i.y*r.r)/o-e;return u*u+a*a}function Ho(t){this._=t,this.next=null,this.previous=null}function Xo(t){if(!(i=t.length))return 0;var n,e,r,i;if(n=t[0],n.x=0,n.y=0,!(i>1))return n.r;if(e=t[1],n.x=-e.r,e.x=n.r,e.y=0,!(i>2))return n.r+e.r;Yo(e,n,r=t[2]);var o,u,a,c,s,f,l,h=n.r*n.r,p=e.r*e.r,d=r.r*r.r,v=h+p+d,_=h*n.x+p*e.x+d*r.x,g=h*n.y+p*e.y+d*r.y;n=new Ho(n),e=new Ho(e),r=new Ho(r),n.next=r.previous=e,e.next=n.previous=r,r.next=e.previous=n;t:for(a=3;a<i;++a){Yo(n._,e._,r=t[a]),r=new Ho(r),c=e.next,s=n.previous,f=e._.r,l=n._.r;do{if(f<=l){if(Bo(c._,r._)){e=c,n.next=e,e.previous=n,--a;continue t}f+=c._.r,c=c.next}else{if(Bo(s._,r._)){n=s,n.next=e,e.previous=n,--a;continue t}l+=s._.r,s=s.previous}}while(c!==s.next);for(r.previous=n,r.next=e,n.next=e.previous=e=r,v+=d=r._.r*r._.r,_+=d*r._.x,g+=d*r._.y,h=jo(n,o=_/v,u=g/v);(r=r.next)!==e;)(d=jo(r,o,u))<h&&(n=r,h=d);e=n.next}for(n=[e._],r=e;(r=r.next)!==e;)n.push(r._);for(r=qy(n),a=0;a<i;++a)n=t[a],n.x-=r.x,n.y-=r.y;return r.r}function Vo(t){return null==t?null:$o(t)}function $o(t){if("function"!=typeof t)throw new Error;return t}function Wo(){return 0}function Zo(t){return Math.sqrt(t.value)}function Go(t){return function(n){n.children||(n.r=Math.max(0,+t(n)||0))}}function Jo(t,n){return function(e){if(r=e.children){var r,i,o,u=r.length,a=t(e)*n||0;if(a)for(i=0;i<u;++i)r[i].r+=a;if(o=Xo(r),a)for(i=0;i<u;++i)r[i].r-=a;e.r=o+a}}}function Qo(t){return function(n){var e=n.parent;n.r*=t,e&&(n.x=e.x+t*n.x,n.y=e.y+t*n.y)}}function Ko(t){return t.id}function tu(t){return t.parentId}function nu(t,n){return t.parent===n.parent?1:2}function eu(t){var n=t.children;return n?n[0]:t.t}function ru(t){var n=t.children;return n?n[n.length-1]:t.t}function iu(t,n,e){var r=e/(n.i-t.i);n.c-=r,n.s+=e,t.c+=r,n.z+=e,n.m+=e}function ou(t){for(var n,e=0,r=0,i=t.children,o=i.length;--o>=0;)n=i[o],n.z+=e,n.m+=e,e+=n.s+(r+=n.c)}function uu(t,n,e){return t.a.parent===n.parent?t.a:e}function au(t,n){this._=t,this.parent=null,this.children=null,this.A=null,this.a=this,this.z=0,this.m=0,this.c=0,this.s=0,this.t=null,this.i=n}function cu(t){for(var n,e,r,i,o,u=new au(t,0),a=[u];n=a.pop();)if(r=n._.children)for(n.children=new Array(o=r.length),i=o-1;i>=0;--i)a.push(e=n.children[i]=new au(r[i],i)),e.parent=n;return(u.parent=new au(null,0)).children=[u],u}function su(t,n,e,r,i,o){for(var u,a,c,s,f,l,h,p,d,v,_,g=[],y=n.children,m=0,x=0,b=y.length,w=n.value;m<b;){c=i-e,s=o-r;do{f=y[x++].value}while(!f&&x<b);for(l=h=f,v=Math.max(s/c,c/s)/(w*t),_=f*f*v,d=Math.max(h/_,_/l);x<b;++x){if(f+=a=y[x].value,a<l&&(l=a),a>h&&(h=a),_=f*f*v,(p=Math.max(h/_,_/l))>d){f-=a;break}d=p}g.push(u={value:f,dice:c<s,children:y.slice(m,x)}),u.dice?Iy(u,e,r,i,w?r+=s*f/w:o):$y(u,e,r,w?e+=c*f/w:i,o),w-=f,m=x}return g}function fu(t,n){return t[0]-n[0]||t[1]-n[1]}function lu(t){for(var n=t.length,e=[0,1],r=2,i=2;i<n;++i){for(;r>1&&em(t[e[r-2]],t[e[r-1]],t[i])<=0;)--r;e[r++]=i}return e.slice(0,r)}function hu(t){if(!(t>=1))throw new Error;this._size=t,this._call=this._error=null,this._tasks=[],this._data=[],this._waiting=this._active=this._ended=this._start=0}function pu(t){if(!t._start)try{du(t)}catch(n){if(t._tasks[t._ended+t._active-1])_u(t,n);else if(!t._data)throw n}}function du(t){for(;t._start=t._waiting&&t._active<t._size;){var n=t._ended+t._active,e=t._tasks[n],r=e.length-1,i=e[r];e[r]=vu(t,n),--t._waiting,++t._active,e=i.apply(null,e),t._tasks[n]&&(t._tasks[n]=e||am)}}function vu(t,n){return function(e,r){t._tasks[n]&&(--t._active,++t._ended,t._tasks[n]=null,null==t._error&&(null!=e?_u(t,e):(t._data[n]=r,t._waiting?pu(t):gu(t))))}}function _u(t,n){var e,r=t._tasks.length;for(t._error=n,t._data=void 0,t._waiting=NaN;--r>=0;)if((e=t._tasks[r])&&(t._tasks[r]=null,e.abort))try{e.abort()}catch(t){}t._active=NaN,gu(t)}function gu(t){if(!t._active&&t._call){var n=t._data;t._data=void 0,t._call(t._error,n)}}function yu(t){return new hu(arguments.length?+t:1/0)}function mu(t){return function(n,e){t(null==n?e:null)}}function xu(t){var n=t.responseType;return n&&"text"!==n?t.response:t.responseText}function bu(t,n){return function(e){return t(e.responseText,n)}}function wu(t){function n(n){var o=n+"",u=e.get(o);if(!u){if(i!==Sm)return i;e.set(o,u=r.push(n))}return t[(u-1)%t.length]}var e=Ye(),r=[],i=Sm;return t=null==t?[]:km.call(t),n.domain=function(t){if(!arguments.length)return r.slice();r=[],e=Ye();for(var i,o,u=-1,a=t.length;++u<a;)e.has(o=(i=t[u])+"")||e.set(o,r.push(i));return n},n.range=function(e){return arguments.length?(t=km.call(e),n):t.slice()},n.unknown=function(t){return arguments.length?(i=t,n):i},n.copy=function(){return wu().domain(r).range(t).unknown(i)},n}function Mu(){function t(){var t=i().length,r=u[1]<u[0],l=u[r-0],h=u[1-r];n=(h-l)/Math.max(1,t-c+2*s),a&&(n=Math.floor(n)),l+=(h-l-n*(t-c))*f,e=n*(1-c),a&&(l=Math.round(l),e=Math.round(e));var p=Gs(t).map(function(t){return l+n*t});return o(r?p.reverse():p)}var n,e,r=wu().unknown(void 0),i=r.domain,o=r.range,u=[0,1],a=!1,c=0,s=0,f=.5;return delete r.unknown,r.domain=function(n){return arguments.length?(i(n),t()):i()},r.range=function(n){return arguments.length?(u=[+n[0],+n[1]],t()):u.slice()},r.rangeRound=function(n){return u=[+n[0],+n[1]],a=!0,t()},r.bandwidth=function(){return e},r.step=function(){return n},r.round=function(n){return arguments.length?(a=!!n,t()):a},r.padding=function(n){return arguments.length?(c=s=Math.max(0,Math.min(1,n)),t()):c},r.paddingInner=function(n){return arguments.length?(c=Math.max(0,Math.min(1,n)),t()):c},r.paddingOuter=function(n){return arguments.length?(s=Math.max(0,Math.min(1,n)),t()):s},r.align=function(n){return arguments.length?(f=Math.max(0,Math.min(1,n)),t()):f},r.copy=function(){return Mu().domain(i()).range(u).round(a).paddingInner(c).paddingOuter(s).align(f)},t()}function Tu(t){var n=t.copy;return t.padding=t.paddingOuter,delete t.paddingInner,delete t.paddingOuter,t.copy=function(){return Tu(n())},t}function ku(){return Tu(Mu().paddingInner(1))}function Su(t,n){return(n-=t=+t)?function(e){return(e-t)/n}:Nm(n)}function Nu(t){return function(n,e){var r=t(n=+n,e=+e);return function(t){return t<=n?0:t>=e?1:r(t)}}}function Eu(t){return function(n,e){var r=t(n=+n,e=+e);return function(t){return t<=0?n:t>=1?e:r(t)}}}function Au(t,n,e,r){var i=t[0],o=t[1],u=n[0],a=n[1];return o<i?(i=e(o,i),u=r(a,u)):(i=e(i,o),u=r(u,a)),function(t){return u(i(t))}}function Cu(t,n,e,r){var i=Math.min(t.length,n.length)-1,o=new Array(i),u=new Array(i),a=-1;for(t[i]<t[0]&&(t=t.slice().reverse(),n=n.slice().reverse());++a<i;)o[a]=e(t[a],t[a+1]),u[a]=r(n[a],n[a+1]);return function(n){var e=Us(t,n,1,i)-1;return u[e](o[e](n))}}function zu(t,n){return n.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp())}function Pu(t,n){function e(){return i=Math.min(a.length,c.length)>2?Cu:Au,o=u=null,r}function r(n){return(o||(o=i(a,c,f?Nu(t):t,s)))(+n)}var i,o,u,a=Am,c=Am,s=Th,f=!1;return r.invert=function(t){return(u||(u=i(c,a,Su,f?Eu(n):n)))(+t)},r.domain=function(t){return arguments.length?(a=Tm.call(t,Em),e()):a.slice()},r.range=function(t){return arguments.length?(c=km.call(t),e()):c.slice()},r.rangeRound=function(t){return c=km.call(t),s=kh,e()},r.clamp=function(t){return arguments.length?(f=!!t,e()):f},r.interpolate=function(t){return arguments.length?(s=t,e()):s},e()}function Lu(t){var n=t.domain;return t.ticks=function(t){var e=n();return tf(e[0],e[e.length-1],null==t?10:t)},t.tickFormat=function(t,e){return Cm(n(),t,e)},t.nice=function(e){var i=n(),o=i.length-1,u=null==e?10:e,a=i[0],c=i[o],s=r(a,c,u);return s&&(s=r(Math.floor(a/s)*s,Math.ceil(c/s)*s,u),i[0]=Math.floor(a/s)*s,i[o]=Math.ceil(c/s)*s,n(i)),t},t}function Ru(){var t=Pu(Su,mh);return t.copy=function(){return zu(t,Ru())},Lu(t)}function qu(){function t(t){return+t}var n=[0,1];return t.invert=t,t.domain=t.range=function(e){return arguments.length?(n=Tm.call(e,Em),t):n.slice()},t.copy=function(){return qu().domain(n)},Lu(t)}function Uu(t,n){return(n=Math.log(n/t))?function(e){return Math.log(e/t)/n}:Nm(n)}function Du(t,n){return t<0?function(e){return-Math.pow(-n,e)*Math.pow(-t,1-e)}:function(e){return Math.pow(n,e)*Math.pow(t,1-e)}}function Ou(t){return isFinite(t)?+("1e"+t):t<0?0:t}function Fu(t){return 10===t?Ou:t===Math.E?Math.exp:function(n){return Math.pow(t,n)}}function Iu(t){return t===Math.E?Math.log:10===t&&Math.log10||2===t&&Math.log2||(t=Math.log(t),function(n){return Math.log(n)/t})}function Yu(t){return function(n){return-t(-n)}}function Bu(){function n(){return o=Iu(i),u=Fu(i),r()[0]<0&&(o=Yu(o),u=Yu(u)),e}var e=Pu(Uu,Du).domain([1,10]),r=e.domain,i=10,o=Iu(10),u=Fu(10);return e.base=function(t){return arguments.length?(i=+t,n()):i},e.domain=function(t){return arguments.length?(r(t),n()):r()},e.ticks=function(t){var n,e=r(),a=e[0],c=e[e.length-1];(n=c<a)&&(h=a,a=c,c=h);var s,f,l,h=o(a),p=o(c),d=null==t?10:+t,v=[];if(!(i%1)&&p-h<d){if(h=Math.round(h)-1,p=Math.round(p)+1,a>0){for(;h<p;++h)for(f=1,s=u(h);f<i;++f)if(!((l=s*f)<a)){if(l>c)break;v.push(l)}}else for(;h<p;++h)for(f=i-1,s=u(h);f>=1;--f)if(!((l=s*f)<a)){if(l>c)break;v.push(l)}}else v=tf(h,p,Math.min(p-h,d)).map(u);return n?v.reverse():v},e.tickFormat=function(n,r){if(null==r&&(r=10===i?".0e":","),"function"!=typeof r&&(r=t.format(r)),n===1/0)return r;null==n&&(n=10);var a=Math.max(1,i*n/e.ticks().length);return function(t){var n=t/u(Math.round(o(t)));return n*i<i-.5&&(n*=i),n<=a?r(t):""}},e.nice=function(){return r(zm(r(),{floor:function(t){return u(Math.floor(o(t)))},ceil:function(t){return u(Math.ceil(o(t)))}}))},e.copy=function(){return zu(e,Bu().base(i))},e}function ju(t,n){return t<0?-Math.pow(-t,n):Math.pow(t,n)}function Hu(){function t(t,n){return(n=ju(n,e)-(t=ju(t,e)))?function(r){return(ju(r,e)-t)/n}:Nm(n)}function n(t,n){return n=ju(n,e)-(t=ju(t,e)),function(r){return ju(t+n*r,1/e)}}var e=1,r=Pu(t,n),i=r.domain;return r.exponent=function(t){return arguments.length?(e=+t,i(i())):e},r.copy=function(){return zu(r,Hu().exponent(e))},Lu(r)}function Xu(){return Hu().exponent(.5)}function Vu(){function t(){var t=0,o=Math.max(1,r.length);for(i=new Array(o-1);++t<o;)i[t-1]=rf(e,t/o);return n}function n(t){if(!isNaN(t=+t))return r[Us(i,t)]}var e=[],r=[],i=[];return n.invertExtent=function(t){var n=r.indexOf(t);return n<0?[NaN,NaN]:[n>0?i[n-1]:e[0],n<i.length?i[n]:e[e.length-1]]},n.domain=function(n){if(!arguments.length)return e.slice();e=[];for(var r,i=0,o=n.length;i<o;++i)null==(r=n[i])||isNaN(r=+r)||e.push(r);return e.sort(Ls),t()},n.range=function(n){return arguments.length?(r=km.call(n),t()):r.slice()},n.quantiles=function(){return i.slice()},n.copy=function(){return Vu().domain(e).range(r)},n}function $u(){function t(t){if(t<=t)return u[Us(o,t,0,i)]}function n(){var n=-1;for(o=new Array(i);++n<i;)o[n]=((n+1)*r-(n-i)*e)/(i+1);return t}var e=0,r=1,i=1,o=[.5],u=[0,1];return t.domain=function(t){return arguments.length?(e=+t[0],r=+t[1],n()):[e,r]},t.range=function(t){return arguments.length?(i=(u=km.call(t)).length-1,n()):u.slice()},t.invertExtent=function(t){var n=u.indexOf(t);return n<0?[NaN,NaN]:n<1?[e,o[0]]:n>=i?[o[i-1],r]:[o[n-1],o[n]]},t.copy=function(){return $u().domain([e,r]).range(u)},Lu(t)}function Wu(){function t(t){if(t<=t)return e[Us(n,t,0,r)]}var n=[.5],e=[0,1],r=1;return t.domain=function(i){return arguments.length?(n=km.call(i),r=Math.min(n.length,e.length-1),t):n.slice()},t.range=function(i){return arguments.length?(e=km.call(i),r=Math.min(n.length,e.length-1),t):e.slice()},t.invertExtent=function(t){var r=e.indexOf(t);return[n[r-1],n[r]]},t.copy=function(){return Wu().domain(n).range(e)},t}function Zu(t,n,e,r){function i(n){return t(n=new Date(+n)),n}return i.floor=i,i.ceil=function(e){return t(e=new Date(e-1)),n(e,1),t(e),e},i.round=function(t){var n=i(t),e=i.ceil(t);return t-n<e-t?n:e},i.offset=function(t,e){return n(t=new Date(+t),null==e?1:Math.floor(e)),t},i.range=function(e,r,o){var u=[];if(e=i.ceil(e),o=null==o?1:Math.floor(o),!(e<r&&o>0))return u;do{u.push(new Date(+e))}while(n(e,o),t(e),e<r);return u},i.filter=function(e){return Zu(function(n){if(n>=n)for(;t(n),!e(n);)n.setTime(n-1)},function(t,r){if(t>=t)for(;--r>=0;)for(;n(t,1),!e(t););})},e&&(i.count=function(n,r){return Pm.setTime(+n),Lm.setTime(+r),t(Pm),t(Lm),Math.floor(e(Pm,Lm))},i.every=function(t){return t=Math.floor(t),isFinite(t)&&t>0?t>1?i.filter(r?function(n){return r(n)%t==0}:function(n){return i.count(0,n)%t==0}):i:null}),i}function Gu(t){return Zu(function(n){n.setDate(n.getDate()-(n.getDay()+7-t)%7),n.setHours(0,0,0,0)},function(t,n){t.setDate(t.getDate()+7*n)},function(t,n){return(n-t-(n.getTimezoneOffset()-t.getTimezoneOffset())*Um)/Dm})}function Ju(t){return Zu(function(n){n.setUTCDate(n.getUTCDate()-(n.getUTCDay()+7-t)%7),n.setUTCHours(0,0,0,0)},function(t,n){t.setUTCDate(t.getUTCDate()+7*n)},function(t,n){return(n-t)/Dm})}function Qu(t){if(0<=t.y&&t.y<100){var n=new Date(-1,t.m,t.d,t.H,t.M,t.S,t.L);return n.setFullYear(t.y),n}return new Date(t.y,t.m,t.d,t.H,t.M,t.S,t.L)}function Ku(t){if(0<=t.y&&t.y<100){var n=new Date(Date.UTC(-1,t.m,t.d,t.H,t.M,t.S,t.L));return n.setUTCFullYear(t.y),n}return new Date(Date.UTC(t.y,t.m,t.d,t.H,t.M,t.S,t.L))}function ta(t){return{y:t,m:0,d:1,H:0,M:0,S:0,L:0}}function na(t){function n(t,n){return function(e){var r,i,o,u=[],a=-1,c=0,s=t.length;for(e instanceof Date||(e=new Date(+e));++a<s;)37===t.charCodeAt(a)&&(u.push(t.slice(c,a)),null!=(i=qx[r=t.charAt(++a)])?r=t.charAt(++a):i="e"===r?" ":"0",(o=n[r])&&(r=o(e,i)),u.push(r),c=a+1);return u.push(t.slice(c,a)),u.join("")}}function e(t,n){return function(e){var i=ta(1900);if(r(i,t,e+="",0)!=e.length)return null;if("p"in i&&(i.H=i.H%12+12*i.p),"W"in i||"U"in i){"w"in i||(i.w="W"in i?1:0);var o="Z"in i?Ku(ta(i.y)).getUTCDay():n(ta(i.y)).getDay();i.m=0,
i.d="W"in i?(i.w+6)%7+7*i.W-(o+5)%7:i.w+7*i.U-(o+6)%7}return"Z"in i?(i.H+=i.Z/100|0,i.M+=i.Z%100,Ku(i)):n(i)}}function r(t,n,e,r){for(var i,o,u=0,a=n.length,c=e.length;u<a;){if(r>=c)return-1;if(37===(i=n.charCodeAt(u++))){if(i=n.charAt(u++),!(o=B[i in qx?n.charAt(u++):i])||(r=o(t,e,r))<0)return-1}else if(i!=e.charCodeAt(r++))return-1}return r}function i(t,n,e){var r=C.exec(n.slice(e));return r?(t.p=z[r[0].toLowerCase()],e+r[0].length):-1}function o(t,n,e){var r=R.exec(n.slice(e));return r?(t.w=q[r[0].toLowerCase()],e+r[0].length):-1}function u(t,n,e){var r=P.exec(n.slice(e));return r?(t.w=L[r[0].toLowerCase()],e+r[0].length):-1}function a(t,n,e){var r=O.exec(n.slice(e));return r?(t.m=F[r[0].toLowerCase()],e+r[0].length):-1}function c(t,n,e){var r=U.exec(n.slice(e));return r?(t.m=D[r[0].toLowerCase()],e+r[0].length):-1}function s(t,n,e){return r(t,w,n,e)}function f(t,n,e){return r(t,M,n,e)}function l(t,n,e){return r(t,T,n,e)}function h(t){return N[t.getDay()]}function p(t){return S[t.getDay()]}function d(t){return A[t.getMonth()]}function v(t){return E[t.getMonth()]}function _(t){return k[+(t.getHours()>=12)]}function g(t){return N[t.getUTCDay()]}function y(t){return S[t.getUTCDay()]}function m(t){return A[t.getUTCMonth()]}function x(t){return E[t.getUTCMonth()]}function b(t){return k[+(t.getUTCHours()>=12)]}var w=t.dateTime,M=t.date,T=t.time,k=t.periods,S=t.days,N=t.shortDays,E=t.months,A=t.shortMonths,C=ia(k),z=oa(k),P=ia(S),L=oa(S),R=ia(N),q=oa(N),U=ia(E),D=oa(E),O=ia(A),F=oa(A),I={a:h,A:p,b:d,B:v,c:null,d:xa,e:xa,H:ba,I:wa,j:Ma,L:Ta,m:ka,M:Sa,p:_,S:Na,U:Ea,w:Aa,W:Ca,x:null,X:null,y:za,Y:Pa,Z:La,"%":Wa},Y={a:g,A:y,b:m,B:x,c:null,d:Ra,e:Ra,H:qa,I:Ua,j:Da,L:Oa,m:Fa,M:Ia,p:b,S:Ya,U:Ba,w:ja,W:Ha,x:null,X:null,y:Xa,Y:Va,Z:$a,"%":Wa},B={a:o,A:u,b:a,B:c,c:s,d:pa,e:pa,H:va,I:va,j:da,L:ya,m:ha,M:_a,p:i,S:ga,U:aa,w:ua,W:ca,x:f,X:l,y:fa,Y:sa,Z:la,"%":ma};return I.x=n(M,I),I.X=n(T,I),I.c=n(w,I),Y.x=n(M,Y),Y.X=n(T,Y),Y.c=n(w,Y),{format:function(t){var e=n(t+="",I);return e.toString=function(){return t},e},parse:function(t){var n=e(t+="",Qu);return n.toString=function(){return t},n},utcFormat:function(t){var e=n(t+="",Y);return e.toString=function(){return t},e},utcParse:function(t){var n=e(t,Ku);return n.toString=function(){return t},n}}}function ea(t,n,e){var r=t<0?"-":"",i=(r?-t:t)+"",o=i.length;return r+(o<e?new Array(e-o+1).join(n)+i:i)}function ra(t){return t.replace(Ox,"\\$&")}function ia(t){return new RegExp("^(?:"+t.map(ra).join("|")+")","i")}function oa(t){for(var n={},e=-1,r=t.length;++e<r;)n[t[e].toLowerCase()]=e;return n}function ua(t,n,e){var r=Ux.exec(n.slice(e,e+1));return r?(t.w=+r[0],e+r[0].length):-1}function aa(t,n,e){var r=Ux.exec(n.slice(e));return r?(t.U=+r[0],e+r[0].length):-1}function ca(t,n,e){var r=Ux.exec(n.slice(e));return r?(t.W=+r[0],e+r[0].length):-1}function sa(t,n,e){var r=Ux.exec(n.slice(e,e+4));return r?(t.y=+r[0],e+r[0].length):-1}function fa(t,n,e){var r=Ux.exec(n.slice(e,e+2));return r?(t.y=+r[0]+(+r[0]>68?1900:2e3),e+r[0].length):-1}function la(t,n,e){var r=/^(Z)|([+-]\d\d)(?:\:?(\d\d))?/.exec(n.slice(e,e+6));return r?(t.Z=r[1]?0:-(r[2]+(r[3]||"00")),e+r[0].length):-1}function ha(t,n,e){var r=Ux.exec(n.slice(e,e+2));return r?(t.m=r[0]-1,e+r[0].length):-1}function pa(t,n,e){var r=Ux.exec(n.slice(e,e+2));return r?(t.d=+r[0],e+r[0].length):-1}function da(t,n,e){var r=Ux.exec(n.slice(e,e+3));return r?(t.m=0,t.d=+r[0],e+r[0].length):-1}function va(t,n,e){var r=Ux.exec(n.slice(e,e+2));return r?(t.H=+r[0],e+r[0].length):-1}function _a(t,n,e){var r=Ux.exec(n.slice(e,e+2));return r?(t.M=+r[0],e+r[0].length):-1}function ga(t,n,e){var r=Ux.exec(n.slice(e,e+2));return r?(t.S=+r[0],e+r[0].length):-1}function ya(t,n,e){var r=Ux.exec(n.slice(e,e+3));return r?(t.L=+r[0],e+r[0].length):-1}function ma(t,n,e){var r=Dx.exec(n.slice(e,e+1));return r?e+r[0].length:-1}function xa(t,n){return ea(t.getDate(),n,2)}function ba(t,n){return ea(t.getHours(),n,2)}function wa(t,n){return ea(t.getHours()%12||12,n,2)}function Ma(t,n){return ea(1+Hm.count(cx(t),t),n,3)}function Ta(t,n){return ea(t.getMilliseconds(),n,3)}function ka(t,n){return ea(t.getMonth()+1,n,2)}function Sa(t,n){return ea(t.getMinutes(),n,2)}function Na(t,n){return ea(t.getSeconds(),n,2)}function Ea(t,n){return ea(Vm.count(cx(t),t),n,2)}function Aa(t){return t.getDay()}function Ca(t,n){return ea($m.count(cx(t),t),n,2)}function za(t,n){return ea(t.getFullYear()%100,n,2)}function Pa(t,n){return ea(t.getFullYear()%1e4,n,4)}function La(t){var n=t.getTimezoneOffset();return(n>0?"-":(n*=-1,"+"))+ea(n/60|0,"0",2)+ea(n%60,"0",2)}function Ra(t,n){return ea(t.getUTCDate(),n,2)}function qa(t,n){return ea(t.getUTCHours(),n,2)}function Ua(t,n){return ea(t.getUTCHours()%12||12,n,2)}function Da(t,n){return ea(1+dx.count(Px(t),t),n,3)}function Oa(t,n){return ea(t.getUTCMilliseconds(),n,3)}function Fa(t,n){return ea(t.getUTCMonth()+1,n,2)}function Ia(t,n){return ea(t.getUTCMinutes(),n,2)}function Ya(t,n){return ea(t.getUTCSeconds(),n,2)}function Ba(t,n){return ea(_x.count(Px(t),t),n,2)}function ja(t){return t.getUTCDay()}function Ha(t,n){return ea(gx.count(Px(t),t),n,2)}function Xa(t,n){return ea(t.getUTCFullYear()%100,n,2)}function Va(t,n){return ea(t.getUTCFullYear()%1e4,n,4)}function $a(){return"+0000"}function Wa(){return"%"}function Za(n){return Lx=na(n),t.timeFormat=Lx.format,t.timeParse=Lx.parse,t.utcFormat=Lx.utcFormat,t.utcParse=Lx.utcParse,Lx}function Ga(t){return t.toISOString()}function Ja(t){var n=new Date(t);return isNaN(n)?null:n}function Qa(t){return new Date(t)}function Ka(t){return t instanceof Date?+t:+new Date(+t)}function tc(t,n,e,i,o,u,a,c,s){function f(r){return(a(r)<r?v:u(r)<r?_:o(r)<r?g:i(r)<r?y:n(r)<r?e(r)<r?m:x:t(r)<r?b:w)(r)}function l(n,e,i,o){if(null==n&&(n=10),"number"==typeof n){var u=Math.abs(i-e)/n,a=Rs(function(t){return t[2]}).right(M,u);a===M.length?(o=r(e/$x,i/$x,n),n=t):a?(a=M[u/M[a-1][2]<M[a][2]/u?a-1:a],o=a[1],n=a[0]):(o=r(e,i,n),n=c)}return null==o?n:n.every(o)}var h=Pu(Su,mh),p=h.invert,d=h.domain,v=s(".%L"),_=s(":%S"),g=s("%I:%M"),y=s("%I %p"),m=s("%a %d"),x=s("%b %d"),b=s("%B"),w=s("%Y"),M=[[a,1,Yx],[a,5,5*Yx],[a,15,15*Yx],[a,30,30*Yx],[u,1,Bx],[u,5,5*Bx],[u,15,15*Bx],[u,30,30*Bx],[o,1,jx],[o,3,3*jx],[o,6,6*jx],[o,12,12*jx],[i,1,Hx],[i,2,2*Hx],[e,1,Xx],[n,1,Vx],[n,3,3*Vx],[t,1,$x]];return h.invert=function(t){return new Date(p(t))},h.domain=function(t){return arguments.length?d(Tm.call(t,Ka)):d().map(Qa)},h.ticks=function(t,n){var e,r=d(),i=r[0],o=r[r.length-1],u=o<i;return u&&(e=i,i=o,o=e),e=l(t,i,o,n),e=e?e.range(i,o+1):[],u?e.reverse():e},h.tickFormat=function(t,n){return null==n?f:s(n)},h.nice=function(t,n){var e=d();return(t=l(t,e[0],e[e.length-1],n))?d(zm(e,t)):h},h.copy=function(){return zu(h,tc(t,n,e,i,o,u,a,c,s))},h}function nc(t){var n=t.length;return function(e){return t[Math.max(0,Math.min(n-1,Math.floor(e*n)))]}}function ec(t){function n(n){var o=(n-e)/(r-e);return t(i?Math.max(0,Math.min(1,o)):o)}var e=0,r=1,i=!1;return n.domain=function(t){return arguments.length?(e=+t[0],r=+t[1],n):[e,r]},n.clamp=function(t){return arguments.length?(i=!!t,n):i},n.interpolator=function(e){return arguments.length?(t=e,n):t},n.copy=function(){return ec(t).domain([e,r]).clamp(i)},Lu(n)}function rc(t){return t>1?0:t<-1?mb:Math.acos(t)}function ic(t){return t>=1?xb:t<=-1?-xb:Math.asin(t)}function oc(t){return t.innerRadius}function uc(t){return t.outerRadius}function ac(t){return t.startAngle}function cc(t){return t.endAngle}function sc(t){return t&&t.padAngle}function fc(t,n,e,r,i,o,u,a){var c=e-t,s=r-n,f=u-i,l=a-o,h=(f*(n-o)-l*(t-i))/(l*c-f*s);return[t+h*c,n+h*s]}function lc(t,n,e,r,i,o,u){var a=t-e,c=n-r,s=(u?o:-o)/gb(a*a+c*c),f=s*c,l=-s*a,h=t+f,p=n+l,d=e+f,v=r+l,_=(h+d)/2,g=(p+v)/2,y=d-h,m=v-p,x=y*y+m*m,b=i-o,w=h*v-d*p,M=(m<0?-1:1)*gb(db(0,b*b*x-w*w)),T=(w*m-y*M)/x,k=(-w*y-m*M)/x,S=(w*m+y*M)/x,N=(-w*y+m*M)/x,E=T-_,A=k-g,C=S-_,z=N-g;return E*E+A*A>C*C+z*z&&(T=S,k=N),{cx:T,cy:k,x01:-f,y01:-l,x11:T*(i/b-1),y11:k*(i/b-1)}}function hc(t){this._context=t}function pc(t){return t[0]}function dc(t){return t[1]}function vc(t){this._curve=t}function _c(t){function n(n){return new vc(t(n))}return n._curve=t,n}function gc(t){var n=t.curve;return t.angle=t.x,delete t.x,t.radius=t.y,delete t.y,t.curve=function(t){return arguments.length?n(_c(t)):n()._curve},t}function yc(t,n,e){t._context.bezierCurveTo((2*t._x0+t._x1)/3,(2*t._y0+t._y1)/3,(t._x0+2*t._x1)/3,(t._y0+2*t._y1)/3,(t._x0+4*t._x1+n)/6,(t._y0+4*t._y1+e)/6)}function mc(t){this._context=t}function xc(t){this._context=t}function bc(t){this._context=t}function wc(t,n){this._basis=new mc(t),this._beta=n}function Mc(t,n,e){t._context.bezierCurveTo(t._x1+t._k*(t._x2-t._x0),t._y1+t._k*(t._y2-t._y0),t._x2+t._k*(t._x1-n),t._y2+t._k*(t._y1-e),t._x2,t._y2)}function Tc(t,n){this._context=t,this._k=(1-n)/6}function kc(t,n){this._context=t,this._k=(1-n)/6}function Sc(t,n){this._context=t,this._k=(1-n)/6}function Nc(t,n,e){var r=t._x1,i=t._y1,o=t._x2,u=t._y2;if(t._l01_a>yb){var a=2*t._l01_2a+3*t._l01_a*t._l12_a+t._l12_2a,c=3*t._l01_a*(t._l01_a+t._l12_a);r=(r*a-t._x0*t._l12_2a+t._x2*t._l01_2a)/c,i=(i*a-t._y0*t._l12_2a+t._y2*t._l01_2a)/c}if(t._l23_a>yb){var s=2*t._l23_2a+3*t._l23_a*t._l12_a+t._l12_2a,f=3*t._l23_a*(t._l23_a+t._l12_a);o=(o*s+t._x1*t._l23_2a-n*t._l12_2a)/f,u=(u*s+t._y1*t._l23_2a-e*t._l12_2a)/f}t._context.bezierCurveTo(r,i,o,u,t._x2,t._y2)}function Ec(t,n){this._context=t,this._alpha=n}function Ac(t,n){this._context=t,this._alpha=n}function Cc(t,n){this._context=t,this._alpha=n}function zc(t){this._context=t}function Pc(t){return t<0?-1:1}function Lc(t,n,e){var r=t._x1-t._x0,i=n-t._x1,o=(t._y1-t._y0)/(r||i<0&&-0),u=(e-t._y1)/(i||r<0&&-0),a=(o*i+u*r)/(r+i);return(Pc(o)+Pc(u))*Math.min(Math.abs(o),Math.abs(u),.5*Math.abs(a))||0}function Rc(t,n){var e=t._x1-t._x0;return e?(3*(t._y1-t._y0)/e-n)/2:n}function qc(t,n,e){var r=t._x0,i=t._y0,o=t._x1,u=t._y1,a=(o-r)/3;t._context.bezierCurveTo(r+a,i+a*n,o-a,u-a*e,o,u)}function Uc(t){this._context=t}function Dc(t){this._context=new Oc(t)}function Oc(t){this._context=t}function Fc(t){return new Uc(t)}function Ic(t){return new Dc(t)}function Yc(t){this._context=t}function Bc(t){var n,e,r=t.length-1,i=new Array(r),o=new Array(r),u=new Array(r);for(i[0]=0,o[0]=2,u[0]=t[0]+2*t[1],n=1;n<r-1;++n)i[n]=1,o[n]=4,u[n]=4*t[n]+2*t[n+1];for(i[r-1]=2,o[r-1]=7,u[r-1]=8*t[r-1]+t[r],n=1;n<r;++n)e=i[n]/o[n-1],o[n]-=e,u[n]-=e*u[n-1];for(i[r-1]=u[r-1]/o[r-1],n=r-2;n>=0;--n)i[n]=(u[n]-i[n+1])/o[n];for(o[r-1]=(t[r]+i[r-1])/2,n=0;n<r-1;++n)o[n]=2*t[n+1]-i[n+1];return[i,o]}function jc(t,n){this._context=t,this._t=n}function Hc(t){return new jc(t,0)}function Xc(t){return new jc(t,1)}function Vc(t,n){return t[n]}function $c(t){for(var n,e=0,r=-1,i=t.length;++r<i;)(n=+t[r][1])&&(e+=n);return e}function Wc(t){return t[0]}function Zc(t){return t[1]}function Gc(){this._=null}function Jc(t){t.U=t.C=t.L=t.R=t.P=t.N=null}function Qc(t,n){var e=n,r=n.R,i=e.U;i?i.L===e?i.L=r:i.R=r:t._=r,r.U=i,e.U=r,e.R=r.L,e.R&&(e.R.U=e),r.L=e}function Kc(t,n){var e=n,r=n.L,i=e.U;i?i.L===e?i.L=r:i.R=r:t._=r,r.U=i,e.U=r,e.L=r.R,e.L&&(e.L.U=e),r.R=e}function ts(t){for(;t.L;)t=t.L;return t}function ns(t,n,e,r){var i=[null,null],o=Nw.push(i)-1;return i.left=t,i.right=n,e&&rs(i,t,n,e),r&&rs(i,n,t,r),kw[t.index].halfedges.push(o),kw[n.index].halfedges.push(o),i}function es(t,n,e){var r=[n,e];return r.left=t,r}function rs(t,n,e,r){t[0]||t[1]?t.left===e?t[1]=r:t[0]=r:(t[0]=r,t.left=n,t.right=e)}function is(t,n,e,r,i){var o,u=t[0],a=t[1],c=u[0],s=u[1],f=a[0],l=a[1],h=0,p=1,d=f-c,v=l-s;if(o=n-c,d||!(o>0)){if(o/=d,d<0){if(o<h)return;o<p&&(p=o)}else if(d>0){if(o>p)return;o>h&&(h=o)}if(o=r-c,d||!(o<0)){if(o/=d,d<0){if(o>p)return;o>h&&(h=o)}else if(d>0){if(o<h)return;o<p&&(p=o)}if(o=e-s,v||!(o>0)){if(o/=v,v<0){if(o<h)return;o<p&&(p=o)}else if(v>0){if(o>p)return;o>h&&(h=o)}if(o=i-s,v||!(o<0)){if(o/=v,v<0){if(o>p)return;o>h&&(h=o)}else if(v>0){if(o<h)return;o<p&&(p=o)}return!(h>0||p<1)||(h>0&&(t[0]=[c+h*d,s+h*v]),p<1&&(t[1]=[c+p*d,s+p*v]),!0)}}}}}function os(t,n,e,r,i){var o=t[1];if(o)return!0;var u,a,c=t[0],s=t.left,f=t.right,l=s[0],h=s[1],p=f[0],d=f[1],v=(l+p)/2,_=(h+d)/2;if(d===h){if(v<n||v>=r)return;if(l>p){if(c){if(c[1]>=i)return}else c=[v,e];o=[v,i]}else{if(c){if(c[1]<e)return}else c=[v,i];o=[v,e]}}else if(u=(l-p)/(d-h),a=_-u*v,u<-1||u>1)if(l>p){if(c){if(c[1]>=i)return}else c=[(e-a)/u,e];o=[(i-a)/u,i]}else{if(c){if(c[1]<e)return}else c=[(i-a)/u,i];o=[(e-a)/u,e]}else if(h<d){if(c){if(c[0]>=r)return}else c=[n,u*n+a];o=[r,u*r+a]}else{if(c){if(c[0]<n)return}else c=[r,u*r+a];o=[n,u*n+a]}return t[0]=c,t[1]=o,!0}function us(t,n,e,r){for(var i,o=Nw.length;o--;)os(i=Nw[o],t,n,e,r)&&is(i,t,n,e,r)&&(Math.abs(i[0][0]-i[1][0])>Cw||Math.abs(i[0][1]-i[1][1])>Cw)||delete Nw[o]}function as(t){return kw[t.index]={site:t,halfedges:[]}}function cs(t,n){var e=t.site,r=n.left,i=n.right;return e===i&&(i=r,r=e),i?Math.atan2(i[1]-r[1],i[0]-r[0]):(e===r?(r=n[1],i=n[0]):(r=n[0],i=n[1]),Math.atan2(r[0]-i[0],i[1]-r[1]))}function ss(t,n){return n[+(n.left!==t.site)]}function fs(t,n){return n[+(n.left===t.site)]}function ls(){for(var t,n,e,r,i=0,o=kw.length;i<o;++i)if((t=kw[i])&&(r=(n=t.halfedges).length)){var u=new Array(r),a=new Array(r);for(e=0;e<r;++e)u[e]=e,a[e]=cs(t,Nw[n[e]]);for(u.sort(function(t,n){return a[n]-a[t]}),e=0;e<r;++e)a[e]=n[u[e]];for(e=0;e<r;++e)n[e]=a[e]}}function hs(t,n,e,r){var i,o,u,a,c,s,f,l,h,p,d,v,_=kw.length,g=!0;for(i=0;i<_;++i)if(o=kw[i]){for(u=o.site,c=o.halfedges,a=c.length;a--;)Nw[c[a]]||c.splice(a,1);for(a=0,s=c.length;a<s;)p=fs(o,Nw[c[a]]),d=p[0],v=p[1],f=ss(o,Nw[c[++a%s]]),l=f[0],h=f[1],(Math.abs(d-l)>Cw||Math.abs(v-h)>Cw)&&(c.splice(a,0,Nw.push(es(u,p,Math.abs(d-t)<Cw&&r-v>Cw?[t,Math.abs(l-t)<Cw?h:r]:Math.abs(v-r)<Cw&&e-d>Cw?[Math.abs(h-r)<Cw?l:e,r]:Math.abs(d-e)<Cw&&v-n>Cw?[e,Math.abs(l-e)<Cw?h:n]:Math.abs(v-n)<Cw&&d-t>Cw?[Math.abs(h-n)<Cw?l:t,n]:null))-1),++s);s&&(g=!1)}if(g){var y,m,x,b=1/0;for(i=0,g=null;i<_;++i)(o=kw[i])&&(u=o.site,y=u[0]-t,m=u[1]-n,(x=y*y+m*m)<b&&(b=x,g=o));if(g){var w=[t,n],M=[t,r],T=[e,r],k=[e,n];g.halfedges.push(Nw.push(es(u=g.site,w,M))-1,Nw.push(es(u,M,T))-1,Nw.push(es(u,T,k))-1,Nw.push(es(u,k,w))-1)}}for(i=0;i<_;++i)(o=kw[i])&&(o.halfedges.length||delete kw[i])}function ps(){Jc(this),this.x=this.y=this.arc=this.site=this.cy=null}function ds(t){var n=t.P,e=t.N;if(n&&e){var r=n.site,i=t.site,o=e.site;if(r!==o){var u=i[0],a=i[1],c=r[0]-u,s=r[1]-a,f=o[0]-u,l=o[1]-a,h=2*(c*l-s*f);if(!(h>=-zw)){var p=c*c+s*s,d=f*f+l*l,v=(l*p-s*d)/h,_=(c*d-f*p)/h,g=Ew.pop()||new ps;g.arc=t,g.site=i,g.x=v+u,g.y=(g.cy=_+a)+Math.sqrt(v*v+_*_),t.circle=g;for(var y=null,m=Sw._;m;)if(g.y<m.y||g.y===m.y&&g.x<=m.x){if(!m.L){y=m.P;break}m=m.L}else{if(!m.R){y=m;break}m=m.R}Sw.insert(y,g),y||(Mw=g)}}}}function vs(t){var n=t.circle;n&&(n.P||(Mw=n.N),Sw.remove(n),Ew.push(n),Jc(n),t.circle=null)}function _s(){Jc(this),this.edge=this.site=this.circle=null}function gs(t){var n=Aw.pop()||new _s;return n.site=t,n}function ys(t){vs(t),Tw.remove(t),Aw.push(t),Jc(t)}function ms(t){var n=t.circle,e=n.x,r=n.cy,i=[e,r],o=t.P,u=t.N,a=[t];ys(t);for(var c=o;c.circle&&Math.abs(e-c.circle.x)<Cw&&Math.abs(r-c.circle.cy)<Cw;)o=c.P,a.unshift(c),ys(c),c=o;a.unshift(c),vs(c);for(var s=u;s.circle&&Math.abs(e-s.circle.x)<Cw&&Math.abs(r-s.circle.cy)<Cw;)u=s.N,a.push(s),ys(s),s=u;a.push(s),vs(s);var f,l=a.length;for(f=1;f<l;++f)s=a[f],c=a[f-1],rs(s.edge,c.site,s.site,i);c=a[0],s=a[l-1],s.edge=ns(c.site,s.site,null,i),ds(c),ds(s)}function xs(t){for(var n,e,r,i,o=t[0],u=t[1],a=Tw._;a;)if((r=bs(a,u)-o)>Cw)a=a.L;else{if(!((i=o-ws(a,u))>Cw)){r>-Cw?(n=a.P,e=a):i>-Cw?(n=a,e=a.N):n=e=a;break}if(!a.R){n=a;break}a=a.R}as(t);var c=gs(t);if(Tw.insert(n,c),n||e){if(n===e)return vs(n),e=gs(n.site),Tw.insert(c,e),c.edge=e.edge=ns(n.site,c.site),ds(n),void ds(e);if(!e)return void(c.edge=ns(n.site,c.site));vs(n),vs(e);var s=n.site,f=s[0],l=s[1],h=t[0]-f,p=t[1]-l,d=e.site,v=d[0]-f,_=d[1]-l,g=2*(h*_-p*v),y=h*h+p*p,m=v*v+_*_,x=[(_*y-p*m)/g+f,(h*m-v*y)/g+l];rs(e.edge,s,d,x),c.edge=ns(s,t,null,x),e.edge=ns(t,d,null,x),ds(n),ds(e)}}function bs(t,n){var e=t.site,r=e[0],i=e[1],o=i-n;if(!o)return r;var u=t.P;if(!u)return-(1/0);e=u.site;var a=e[0],c=e[1],s=c-n;if(!s)return a;var f=a-r,l=1/o-1/s,h=f/s;return l?(-h+Math.sqrt(h*h-2*l*(f*f/(-2*s)-c+s/2+i-o/2)))/l+r:(r+a)/2}function ws(t,n){var e=t.N;if(e)return bs(e,n);var r=t.site;return r[1]===n?r[0]:1/0}function Ms(t,n,e){return(t[0]-e[0])*(n[1]-t[1])-(t[0]-n[0])*(e[1]-t[1])}function Ts(t,n){return n[1]-t[1]||n[0]-t[0]}function ks(t,n){var e,r,i,o=t.sort(Ts).pop();for(Nw=[],kw=new Array(t.length),Tw=new Gc,Sw=new Gc;;)if(i=Mw,o&&(!i||o[1]<i.y||o[1]===i.y&&o[0]<i.x))o[0]===e&&o[1]===r||(xs(o),e=o[0],r=o[1]),o=t.pop();else{if(!i)break;ms(i.arc)}if(ls(),n){var u=+n[0][0],a=+n[0][1],c=+n[1][0],s=+n[1][1];us(u,a,c,s),hs(u,a,c,s)}this.edges=Nw,this.cells=kw,Tw=Sw=Nw=kw=null}function Ss(t,n,e){this.target=t,this.type=n,this.transform=e}function Ns(t,n,e){this.k=t,this.x=n,this.y=e}function Es(t){return t.__zoom||Rw}function As(){t.event.stopImmediatePropagation()}function Cs(){return!t.event.button}function zs(){var t,n,e=this;return e instanceof SVGElement?(e=e.ownerSVGElement||e,t=e.width.baseVal.value,n=e.height.baseVal.value):(t=e.clientWidth,n=e.clientHeight),[[0,0],[t,n]]}function Ps(){return this.__zoom||Rw}var Ls=function(t,n){return t<n?-1:t>n?1:t>=n?0:NaN},Rs=function(t){return 1===t.length&&(t=n(t)),{left:function(n,e,r,i){for(null==r&&(r=0),null==i&&(i=n.length);r<i;){var o=r+i>>>1;t(n[o],e)<0?r=o+1:i=o}return r},right:function(n,e,r,i){for(null==r&&(r=0),null==i&&(i=n.length);r<i;){var o=r+i>>>1;t(n[o],e)>0?i=o:r=o+1}return r}}},qs=Rs(Ls),Us=qs.right,Ds=qs.left,Os=function(t,n){null==n&&(n=e);for(var r=0,i=t.length-1,o=t[0],u=new Array(i<0?0:i);r<i;)u[r]=n(o,o=t[++r]);return u},Fs=function(t,n,r){var i,o,u,a,c=t.length,s=n.length,f=new Array(c*s);for(null==r&&(r=e),i=u=0;i<c;++i)for(a=t[i],o=0;o<s;++o,++u)f[u]=r(a,n[o]);return f},Is=function(t,n){return n<t?-1:n>t?1:n>=t?0:NaN},Ys=function(t){return null===t?NaN:+t},Bs=function(t,n){var e,r,i=t.length,o=0,u=0,a=-1,c=0;if(null==n)for(;++a<i;)isNaN(e=Ys(t[a]))||(r=e-o,o+=r/++c,u+=r*(e-o));else for(;++a<i;)isNaN(e=Ys(n(t[a],a,t)))||(r=e-o,o+=r/++c,u+=r*(e-o));if(c>1)return u/(c-1)},js=function(t,n){var e=Bs(t,n);return e?Math.sqrt(e):e},Hs=function(t,n){var e,r,i,o=-1,u=t.length;if(null==n){for(;++o<u;)if(null!=(r=t[o])&&r>=r){e=i=r;break}for(;++o<u;)null!=(r=t[o])&&(e>r&&(e=r),i<r&&(i=r))}else{for(;++o<u;)if(null!=(r=n(t[o],o,t))&&r>=r){e=i=r;break}for(;++o<u;)null!=(r=n(t[o],o,t))&&(e>r&&(e=r),i<r&&(i=r))}return[e,i]},Xs=Array.prototype,Vs=Xs.slice,$s=Xs.map,Ws=function(t){return function(){return t}},Zs=function(t){return t},Gs=function(t,n,e){t=+t,n=+n,e=(i=arguments.length)<2?(n=t,t=0,1):i<3?1:+e;for(var r=-1,i=0|Math.max(0,Math.ceil((n-t)/e)),o=new Array(i);++r<i;)o[r]=t+r*e;return o},Js=Math.sqrt(50),Qs=Math.sqrt(10),Ks=Math.sqrt(2),tf=function(t,n,e){var i=r(t,n,e);return Gs(Math.ceil(t/i)*i,Math.floor(n/i)*i+i/2,i)},nf=function(t){return Math.ceil(Math.log(t.length)/Math.LN2)+1},ef=function(){function t(t){var i,o,u=t.length,a=new Array(u);for(i=0;i<u;++i)a[i]=n(t[i],i,t);var c=e(a),s=c[0],f=c[1],l=r(a,s,f);Array.isArray(l)||(l=tf(s,f,l));for(var h=l.length;l[0]<=s;)l.shift(),--h;for(;l[h-1]>=f;)l.pop(),--h;var p,d=new Array(h+1);for(i=0;i<=h;++i)p=d[i]=[],p.x0=i>0?l[i-1]:s,p.x1=i<h?l[i]:f;for(i=0;i<u;++i)o=a[i],s<=o&&o<=f&&d[Us(l,o,0,h)].push(t[i]);return d}var n=Zs,e=Hs,r=nf;return t.value=function(e){return arguments.length?(n="function"==typeof e?e:Ws(e),t):n},t.domain=function(n){return arguments.length?(e="function"==typeof n?n:Ws([n[0],n[1]]),t):e},t.thresholds=function(n){return arguments.length?(r="function"==typeof n?n:Ws(Array.isArray(n)?Vs.call(n):n),t):r},t},rf=function(t,n,e){if(null==e&&(e=Ys),r=t.length){if((n=+n)<=0||r<2)return+e(t[0],0,t);if(n>=1)return+e(t[r-1],r-1,t);var r,i=(r-1)*n,o=Math.floor(i),u=+e(t[o],o,t);return u+(+e(t[o+1],o+1,t)-u)*(i-o)}},of=function(t,n,e){return t=$s.call(t,Ys).sort(Ls),Math.ceil((e-n)/(2*(rf(t,.75)-rf(t,.25))*Math.pow(t.length,-1/3)))},uf=function(t,n,e){return Math.ceil((e-n)/(3.5*js(t)*Math.pow(t.length,-1/3)))},af=function(t,n){var e,r,i=-1,o=t.length;if(null==n){for(;++i<o;)if(null!=(r=t[i])&&r>=r){e=r;break}for(;++i<o;)null!=(r=t[i])&&r>e&&(e=r)}else{for(;++i<o;)if(null!=(r=n(t[i],i,t))&&r>=r){e=r;break}for(;++i<o;)null!=(r=n(t[i],i,t))&&r>e&&(e=r)}return e},cf=function(t,n){var e,r=0,i=t.length,o=-1,u=i;if(null==n)for(;++o<i;)isNaN(e=Ys(t[o]))?--u:r+=e;else for(;++o<i;)isNaN(e=Ys(n(t[o],o,t)))?--u:r+=e;if(u)return r/u},sf=function(t,n){var e,r=[],i=t.length,o=-1;if(null==n)for(;++o<i;)isNaN(e=Ys(t[o]))||r.push(e);else for(;++o<i;)isNaN(e=Ys(n(t[o],o,t)))||r.push(e);return rf(r.sort(Ls),.5)},ff=function(t){for(var n,e,r,i=t.length,o=-1,u=0;++o<i;)u+=t[o].length;for(e=new Array(u);--i>=0;)for(r=t[i],n=r.length;--n>=0;)e[--u]=r[n];return e},lf=function(t,n){var e,r,i=-1,o=t.length;if(null==n){for(;++i<o;)if(null!=(r=t[i])&&r>=r){e=r;break}for(;++i<o;)null!=(r=t[i])&&e>r&&(e=r)}else{for(;++i<o;)if(null!=(r=n(t[i],i,t))&&r>=r){e=r;break}for(;++i<o;)null!=(r=n(t[i],i,t))&&e>r&&(e=r)}return e},hf=function(t,n){for(var e=n.length,r=new Array(e);e--;)r[e]=t[n[e]];return r},pf=function(t,n){if(e=t.length){var e,r,i=0,o=0,u=t[o];for(n||(n=Ls);++i<e;)(n(r=t[i],u)<0||0!==n(u,u))&&(u=r,o=i);return 0===n(u,u)?o:void 0}},df=function(t,n,e){for(var r,i,o=(null==e?t.length:e)-(n=null==n?0:+n);o;)i=Math.random()*o--|0,r=t[o+n],t[o+n]=t[i+n],t[i+n]=r;return t},vf=function(t,n){var e,r=0,i=t.length,o=-1;if(null==n)for(;++o<i;)(e=+t[o])&&(r+=e);else for(;++o<i;)(e=+n(t[o],o,t))&&(r+=e);return r},_f=function(t){if(!(o=t.length))return[];for(var n=-1,e=lf(t,i),r=new Array(e);++n<e;)for(var o,u=-1,a=r[n]=new Array(o);++u<o;)a[u]=t[u][n];return r},gf=function(){return _f(arguments)},yf=Array.prototype.slice,mf=function(t){return t},xf=1,bf=2,wf=3,Mf=4,Tf=1e-6,kf={value:function(){}};v.prototype=d.prototype={constructor:v,on:function(t,n){var e,r=this._,i=_(t+"",r),o=-1,u=i.length;{if(!(arguments.length<2)){if(null!=n&&"function"!=typeof n)throw new Error("invalid callback: "+n);for(;++o<u;)if(e=(t=i[o]).type)r[e]=y(r[e],t.name,n);else if(null==n)for(e in r)r[e]=y(r[e],t.name,null);return this}for(;++o<u;)if((e=(t=i[o]).type)&&(e=g(r[e],t.name)))return e}},copy:function(){var t={},n=this._;for(var e in n)t[e]=n[e].slice();return new v(t)},call:function(t,n){if((e=arguments.length-2)>0)for(var e,r,i=new Array(e),o=0;o<e;++o)i[o]=arguments[o+2];if(!this._.hasOwnProperty(t))throw new Error("unknown type: "+t);for(r=this._[t],o=0,e=r.length;o<e;++o)r[o].value.apply(n,i)},apply:function(t,n,e){if(!this._.hasOwnProperty(t))throw new Error("unknown type: "+t);for(var r=this._[t],i=0,o=r.length;i<o;++i)r[i].value.apply(n,e)}};var Sf="http://www.w3.org/1999/xhtml",Nf={svg:"http://www.w3.org/2000/svg",xhtml:Sf,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"},Ef=function(t){var n=t+="",e=n.indexOf(":");return e>=0&&"xmlns"!==(n=t.slice(0,e))&&(t=t.slice(e+1)),Nf.hasOwnProperty(n)?{space:Nf[n],local:t}:t},Af=function(t){var n=Ef(t);return(n.local?x:m)(n)},Cf=0;w.prototype=b.prototype={constructor:w,get:function(t){for(var n=this._;!(n in t);)if(!(t=t.parentNode))return;return t[n]},set:function(t,n){return t[this._]=n},remove:function(t){return this._ in t&&delete t[this._]},toString:function(){return this._}};var zf=function(t){return function(){return this.matches(t)}};if("undefined"!=typeof document){var Pf=document.documentElement;if(!Pf.matches){var Lf=Pf.webkitMatchesSelector||Pf.msMatchesSelector||Pf.mozMatchesSelector||Pf.oMatchesSelector;zf=function(t){return function(){return Lf.call(this,t)}}}}var Rf=zf,qf={};if(t.event=null,"undefined"!=typeof document){"onmouseenter"in document.documentElement||(qf={mouseenter:"mouseover",mouseleave:"mouseout"})}var Uf=function(t,n,e){var r,i,o=k(t+""),u=o.length;{if(!(arguments.length<2)){for(a=n?N:S,null==e&&(e=!1),r=0;r<u;++r)this.each(a(o[r],n,e));return this}var a=this.node().__on;if(a)for(var c,s=0,f=a.length;s<f;++s)for(r=0,c=a[s];r<u;++r)if((i=o[r]).type===c.type&&i.name===c.name)return c.value}},Df=function(){for(var n,e=t.event;n=e.sourceEvent;)e=n;return e},Of=function(t,n){var e=t.ownerSVGElement||t;if(e.createSVGPoint){var r=e.createSVGPoint();return r.x=n.clientX,r.y=n.clientY,r=r.matrixTransform(t.getScreenCTM().inverse()),[r.x,r.y]}var i=t.getBoundingClientRect();return[n.clientX-i.left-t.clientLeft,n.clientY-i.top-t.clientTop]},Ff=function(t){var n=Df();return n.changedTouches&&(n=n.changedTouches[0]),Of(t,n)},If=function(t){return null==t?A:function(){return this.querySelector(t)}},Yf=function(t){"function"!=typeof t&&(t=If(t));for(var n=this._groups,e=n.length,r=new Array(e),i=0;i<e;++i)for(var o,u,a=n[i],c=a.length,s=r[i]=new Array(c),f=0;f<c;++f)(o=a[f])&&(u=t.call(o,o.__data__,f,a))&&("__data__"in o&&(u.__data__=o.__data__),s[f]=u);return new dt(r,this._parents)},Bf=function(t){return null==t?C:function(){return this.querySelectorAll(t)}},jf=function(t){"function"!=typeof t&&(t=Bf(t));for(var n=this._groups,e=n.length,r=[],i=[],o=0;o<e;++o)for(var u,a=n[o],c=a.length,s=0;s<c;++s)(u=a[s])&&(r.push(t.call(u,u.__data__,s,a)),i.push(u));return new dt(r,i)},Hf=function(t){"function"!=typeof t&&(t=Rf(t));for(var n=this._groups,e=n.length,r=new Array(e),i=0;i<e;++i)for(var o,u=n[i],a=u.length,c=r[i]=[],s=0;s<a;++s)(o=u[s])&&t.call(o,o.__data__,s,u)&&c.push(o);return new dt(r,this._parents)},Xf=function(t){return new Array(t.length)},Vf=function(){return new dt(this._enter||this._groups.map(Xf),this._parents)};z.prototype={constructor:z,appendChild:function(t){return this._parent.insertBefore(t,this._next)},insertBefore:function(t,n){return this._parent.insertBefore(t,n)},querySelector:function(t){return this._parent.querySelector(t)},querySelectorAll:function(t){return this._parent.querySelectorAll(t)}};var $f=function(t){return function(){return t}},Wf="$",Zf=function(t,n){if(!t)return p=new Array(this.size()),s=-1,this.each(function(t){p[++s]=t}),p;var e=n?L:P,r=this._parents,i=this._groups;"function"!=typeof t&&(t=$f(t));for(var o=i.length,u=new Array(o),a=new Array(o),c=new Array(o),s=0;s<o;++s){var f=r[s],l=i[s],h=l.length,p=t.call(f,f&&f.__data__,s,r),d=p.length,v=a[s]=new Array(d),_=u[s]=new Array(d);e(f,l,v,_,c[s]=new Array(h),p,n);for(var g,y,m=0,x=0;m<d;++m)if(g=v[m]){for(m>=x&&(x=m+1);!(y=_[x])&&++x<d;);g._next=y||null}}return u=new dt(u,r),u._enter=a,u._exit=c,u},Gf=function(){return new dt(this._exit||this._groups.map(Xf),this._parents)},Jf=function(t){for(var n=this._groups,e=t._groups,r=n.length,i=e.length,o=Math.min(r,i),u=new Array(r),a=0;a<o;++a)for(var c,s=n[a],f=e[a],l=s.length,h=u[a]=new Array(l),p=0;p<l;++p)(c=s[p]||f[p])&&(h[p]=c);for(;a<r;++a)u[a]=n[a];return new dt(u,this._parents)},Qf=function(){for(var t=this._groups,n=-1,e=t.length;++n<e;)for(var r,i=t[n],o=i.length-1,u=i[o];--o>=0;)(r=i[o])&&(u&&u!==r.nextSibling&&u.parentNode.insertBefore(r,u),u=r);return this},Kf=function(t){function n(n,e){return n&&e?t(n.__data__,e.__data__):!n-!e}t||(t=R);for(var e=this._groups,r=e.length,i=new Array(r),o=0;o<r;++o){for(var u,a=e[o],c=a.length,s=i[o]=new Array(c),f=0;f<c;++f)(u=a[f])&&(s[f]=u);s.sort(n)}return new dt(i,this._parents).order()},tl=function(){var t=arguments[0];return arguments[0]=this,t.apply(null,arguments),this},nl=function(){var t=new Array(this.size()),n=-1;return this.each(function(){t[++n]=this}),t},el=function(){for(var t=this._groups,n=0,e=t.length;n<e;++n)for(var r=t[n],i=0,o=r.length;i<o;++i){var u=r[i];if(u)return u}return null},rl=function(){var t=0;return this.each(function(){++t}),t},il=function(){return!this.node()},ol=function(t){for(var n=this._groups,e=0,r=n.length;e<r;++e)for(var i,o=n[e],u=0,a=o.length;u<a;++u)(i=o[u])&&t.call(i,i.__data__,u,o);return this},ul=function(t,n){var e=Ef(t);if(arguments.length<2){var r=this.node();return e.local?r.getAttributeNS(e.space,e.local):r.getAttribute(e)}return this.each((null==n?e.local?U:q:"function"==typeof n?e.local?I:F:e.local?O:D)(e,n))},al=function(t){return t.ownerDocument&&t.ownerDocument.defaultView||t.document&&t||t.defaultView},cl=function(t,n,e){var r;return arguments.length>1?this.each((null==n?Y:"function"==typeof n?j:B)(t,n,null==e?"":e)):al(r=this.node()).getComputedStyle(r,null).getPropertyValue(t)},sl=function(t,n){return arguments.length>1?this.each((null==n?H:"function"==typeof n?V:X)(t,n)):this.node()[t]};Z.prototype={add:function(t){this._names.indexOf(t)<0&&(this._names.push(t),this._node.setAttribute("class",this._names.join(" ")))},remove:function(t){var n=this._names.indexOf(t);n>=0&&(this._names.splice(n,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(t){return this._names.indexOf(t)>=0}};var fl=function(t,n){var e=$(t+"");if(arguments.length<2){for(var r=W(this.node()),i=-1,o=e.length;++i<o;)if(!r.contains(e[i]))return!1;return!0}return this.each(("function"==typeof n?tt:n?Q:K)(e,n))},ll=function(t){return arguments.length?this.each(null==t?nt:("function"==typeof t?rt:et)(t)):this.node().textContent},hl=function(t){return arguments.length?this.each(null==t?it:("function"==typeof t?ut:ot)(t)):this.node().innerHTML},pl=function(){return this.each(at)},dl=function(){return this.each(ct)},vl=function(t){var n="function"==typeof t?t:Af(t);return this.select(function(){return this.appendChild(n.apply(this,arguments))})},_l=function(t,n){var e="function"==typeof t?t:Af(t),r=null==n?st:"function"==typeof n?n:If(n);return this.select(function(){return this.insertBefore(e.apply(this,arguments),r.apply(this,arguments)||null)})},gl=function(){return this.each(ft)},yl=function(t){return arguments.length?this.property("__data__",t):this.node().__data__},ml=function(t,n){return this.each(("function"==typeof n?pt:ht)(t,n))},xl=[null];dt.prototype=vt.prototype={constructor:dt,select:Yf,selectAll:jf,filter:Hf,data:Zf,enter:Vf,exit:Gf,merge:Jf,order:Qf,sort:Kf,call:tl,nodes:nl,node:el,size:rl,empty:il,each:ol,attr:ul,style:cl,property:sl,classed:fl,text:ll,html:hl,raise:pl,lower:dl,append:vl,insert:_l,remove:gl,datum:yl,on:Uf,dispatch:ml};var bl=function(t){return"string"==typeof t?new dt([[document.querySelector(t)]],[document.documentElement]):new dt([[t]],xl)},wl=function(t){return"string"==typeof t?new dt([document.querySelectorAll(t)],[document.documentElement]):new dt([null==t?[]:t],xl)},Ml=function(t,n,e){arguments.length<3&&(e=n,n=Df().changedTouches);for(var r,i=0,o=n?n.length:0;i<o;++i)if((r=n[i]).identifier===e)return Of(t,r);return null},Tl=function(t,n){null==n&&(n=Df().touches);for(var e=0,r=n?n.length:0,i=new Array(r);e<r;++e)i[e]=Of(t,n[e]);return i},kl=function(){t.event.preventDefault(),t.event.stopImmediatePropagation()},Sl=function(t){var n=t.document.documentElement,e=bl(t).on("dragstart.drag",kl,!0);"onselectstart"in n?e.on("selectstart.drag",kl,!0):(n.__noselect=n.style.MozUserSelect,n.style.MozUserSelect="none")},Nl=function(t){return function(){return t}};yt.prototype.on=function(){var t=this._.on.apply(this._,arguments);return t===this._?this:t};var El=function(){function n(t){t.on("mousedown.drag",e).on("touchstart.drag",o).on("touchmove.drag",u).on("touchend.drag touchcancel.drag",a).style("-webkit-tap-highlight-color","rgba(0,0,0,0)")}function e(){if(!f&&l.apply(this,arguments)){var n=c("mouse",h.apply(this,arguments),Ff,this,arguments);n&&(bl(t.event.view).on("mousemove.drag",r,!0).on("mouseup.drag",i,!0),Sl(t.event.view),_t(),s=!1,n("start"))}}function r(){kl(),s=!0,v.mouse("drag")}function i(){bl(t.event.view).on("mousemove.drag mouseup.drag",null),gt(t.event.view,s),kl(),v.mouse("end")}function o(){if(l.apply(this,arguments)){var n,e,r=t.event.changedTouches,i=h.apply(this,arguments),o=r.length;for(n=0;n<o;++n)(e=c(r[n].identifier,i,Ml,this,arguments))&&(_t(),e("start"))}}function u(){var n,e,r=t.event.changedTouches,i=r.length;for(n=0;n<i;++n)(e=v[r[n].identifier])&&(kl(),e("drag"))}function a(){
var n,e,r=t.event.changedTouches,i=r.length;for(f&&clearTimeout(f),f=setTimeout(function(){f=null},500),n=0;n<i;++n)(e=v[r[n].identifier])&&(_t(),e("end"))}function c(e,r,i,o,u){var a,c,s,f=i(r,e),l=_.copy();if(E(new yt(n,"beforestart",a,e,g,f[0],f[1],0,0,l),function(){return null!=(t.event.subject=a=p.apply(o,u))&&(c=a.x-f[0]||0,s=a.y-f[1]||0,!0)}))return function t(h){var p,d=f;switch(h){case"start":v[e]=t,p=g++;break;case"end":delete v[e],--g;case"drag":f=i(r,e),p=g}E(new yt(n,h,a,e,p,f[0]+c,f[1]+s,f[0]-d[0],f[1]-d[1],l),l.apply,l,[h,o,u])}}var s,f,l=mt,h=xt,p=bt,v={},_=d("start","drag","end"),g=0;return n.filter=function(t){return arguments.length?(l="function"==typeof t?t:Nl(!!t),n):l},n.container=function(t){return arguments.length?(h="function"==typeof t?t:Nl(t),n):h},n.subject=function(t){return arguments.length?(p="function"==typeof t?t:Nl(t),n):p},n.on=function(){var t=_.on.apply(_,arguments);return t===_?n:t},n},Al=function(t,n,e){t.prototype=n.prototype=e,e.constructor=t},Cl="\\s*([+-]?\\d+)\\s*",zl="\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",Pl="\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",Ll=/^#([0-9a-f]{3})$/,Rl=/^#([0-9a-f]{6})$/,ql=new RegExp("^rgb\\("+[Cl,Cl,Cl]+"\\)$"),Ul=new RegExp("^rgb\\("+[Pl,Pl,Pl]+"\\)$"),Dl=new RegExp("^rgba\\("+[Cl,Cl,Cl,zl]+"\\)$"),Ol=new RegExp("^rgba\\("+[Pl,Pl,Pl,zl]+"\\)$"),Fl=new RegExp("^hsl\\("+[zl,Pl,Pl]+"\\)$"),Il=new RegExp("^hsla\\("+[zl,Pl,Pl,zl]+"\\)$"),Yl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};Al(Mt,Tt,{displayable:function(){return this.rgb().displayable()},toString:function(){return this.rgb()+""}}),Al(At,Et,wt(Mt,{brighter:function(t){return t=null==t?1/.7:Math.pow(1/.7,t),new At(this.r*t,this.g*t,this.b*t,this.opacity)},darker:function(t){return t=null==t?.7:Math.pow(.7,t),new At(this.r*t,this.g*t,this.b*t,this.opacity)},rgb:function(){return this},displayable:function(){return 0<=this.r&&this.r<=255&&0<=this.g&&this.g<=255&&0<=this.b&&this.b<=255&&0<=this.opacity&&this.opacity<=1},toString:function(){var t=this.opacity;return t=isNaN(t)?1:Math.max(0,Math.min(1,t)),(1===t?"rgb(":"rgba(")+Math.max(0,Math.min(255,Math.round(this.r)||0))+", "+Math.max(0,Math.min(255,Math.round(this.g)||0))+", "+Math.max(0,Math.min(255,Math.round(this.b)||0))+(1===t?")":", "+t+")")}})),Al(Lt,Pt,wt(Mt,{brighter:function(t){return t=null==t?1/.7:Math.pow(1/.7,t),new Lt(this.h,this.s,this.l*t,this.opacity)},darker:function(t){return t=null==t?.7:Math.pow(.7,t),new Lt(this.h,this.s,this.l*t,this.opacity)},rgb:function(){var t=this.h%360+360*(this.h<0),n=isNaN(t)||isNaN(this.s)?0:this.s,e=this.l,r=e+(e<.5?e:1-e)*n,i=2*e-r;return new At(Rt(t>=240?t-240:t+120,i,r),Rt(t,i,r),Rt(t<120?t+240:t-120,i,r),this.opacity)},displayable:function(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1}}));var Bl=Math.PI/180,jl=180/Math.PI,Hl=.95047,Xl=1,Vl=1.08883,$l=4/29,Wl=6/29,Zl=3*Wl*Wl,Gl=Wl*Wl*Wl;Al(Dt,Ut,wt(Mt,{brighter:function(t){return new Dt(this.l+18*(null==t?1:t),this.a,this.b,this.opacity)},darker:function(t){return new Dt(this.l-18*(null==t?1:t),this.a,this.b,this.opacity)},rgb:function(){var t=(this.l+16)/116,n=isNaN(this.a)?t:t+this.a/500,e=isNaN(this.b)?t:t-this.b/200;return t=Xl*Ft(t),n=Hl*Ft(n),e=Vl*Ft(e),new At(It(3.2404542*n-1.5371385*t-.4985314*e),It(-.969266*n+1.8760108*t+.041556*e),It(.0556434*n-.2040259*t+1.0572252*e),this.opacity)}})),Al(Ht,jt,wt(Mt,{brighter:function(t){return new Ht(this.h,this.c,this.l+18*(null==t?1:t),this.opacity)},darker:function(t){return new Ht(this.h,this.c,this.l-18*(null==t?1:t),this.opacity)},rgb:function(){return qt(this).rgb()}}));var Jl=-.14861,Ql=1.78277,Kl=-.29227,th=-.90649,nh=1.97294,eh=nh*th,rh=nh*Ql,ih=Ql*Kl-th*Jl;Al($t,Vt,wt(Mt,{brighter:function(t){return t=null==t?1/.7:Math.pow(1/.7,t),new $t(this.h,this.s,this.l*t,this.opacity)},darker:function(t){return t=null==t?.7:Math.pow(.7,t),new $t(this.h,this.s,this.l*t,this.opacity)},rgb:function(){var t=isNaN(this.h)?0:(this.h+120)*Bl,n=+this.l,e=isNaN(this.s)?0:this.s*n*(1-n),r=Math.cos(t),i=Math.sin(t);return new At(255*(n+e*(Jl*r+Ql*i)),255*(n+e*(Kl*r+th*i)),255*(n+e*(nh*r)),this.opacity)}}));var oh,uh,ah,ch,sh,fh,lh=function(t){var n=t.length-1;return function(e){var r=e<=0?e=0:e>=1?(e=1,n-1):Math.floor(e*n),i=t[r],o=t[r+1],u=r>0?t[r-1]:2*i-o,a=r<n-1?t[r+2]:2*o-i;return Wt((e-r/n)*n,u,i,o,a)}},hh=function(t){var n=t.length;return function(e){var r=Math.floor(((e%=1)<0?++e:e)*n),i=t[(r+n-1)%n],o=t[r%n],u=t[(r+1)%n],a=t[(r+2)%n];return Wt((e-r/n)*n,i,o,u,a)}},ph=function(t){return function(){return t}},dh=function t(n){function e(t,n){var e=r((t=Et(t)).r,(n=Et(n)).r),i=r(t.g,n.g),o=r(t.b,n.b),u=Kt(t.opacity,n.opacity);return function(n){return t.r=e(n),t.g=i(n),t.b=o(n),t.opacity=u(n),t+""}}var r=Qt(n);return e.gamma=t,e}(1),vh=tn(lh),_h=tn(hh),gh=function(t,n){var e,r=n?n.length:0,i=t?Math.min(r,t.length):0,o=new Array(r),u=new Array(r);for(e=0;e<i;++e)o[e]=Th(t[e],n[e]);for(;e<r;++e)u[e]=n[e];return function(t){for(e=0;e<i;++e)u[e]=o[e](t);return u}},yh=function(t,n){var e=new Date;return t=+t,n-=t,function(r){return e.setTime(t+n*r),e}},mh=function(t,n){return t=+t,n-=t,function(e){return t+n*e}},xh=function(t,n){var e,r={},i={};null!==t&&"object"==typeof t||(t={}),null!==n&&"object"==typeof n||(n={});for(e in n)e in t?r[e]=Th(t[e],n[e]):i[e]=n[e];return function(t){for(e in r)i[e]=r[e](t);return i}},bh=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,wh=new RegExp(bh.source,"g"),Mh=function(t,n){var e,r,i,o=bh.lastIndex=wh.lastIndex=0,u=-1,a=[],c=[];for(t+="",n+="";(e=bh.exec(t))&&(r=wh.exec(n));)(i=r.index)>o&&(i=n.slice(o,i),a[u]?a[u]+=i:a[++u]=i),(e=e[0])===(r=r[0])?a[u]?a[u]+=r:a[++u]=r:(a[++u]=null,c.push({i:u,x:mh(e,r)})),o=wh.lastIndex;return o<n.length&&(i=n.slice(o),a[u]?a[u]+=i:a[++u]=i),a.length<2?c[0]?en(c[0].x):nn(n):(n=c.length,function(t){for(var e,r=0;r<n;++r)a[(e=c[r]).i]=e.x(t);return a.join("")})},Th=function(t,n){var e,r=typeof n;return null==n||"boolean"===r?ph(n):("number"===r?mh:"string"===r?(e=Tt(n))?(n=e,dh):Mh:n instanceof Tt?dh:n instanceof Date?yh:Array.isArray(n)?gh:isNaN(n)?xh:mh)(t,n)},kh=function(t,n){return t=+t,n-=t,function(e){return Math.round(t+n*e)}},Sh=180/Math.PI,Nh={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1},Eh=function(t,n,e,r,i,o){var u,a,c;return(u=Math.sqrt(t*t+n*n))&&(t/=u,n/=u),(c=t*e+n*r)&&(e-=t*c,r-=n*c),(a=Math.sqrt(e*e+r*r))&&(e/=a,r/=a,c/=a),t*r<n*e&&(t=-t,n=-n,c=-c,u=-u),{translateX:i,translateY:o,rotate:Math.atan2(n,t)*Sh,skewX:Math.atan(c)*Sh,scaleX:u,scaleY:a}},Ah=un(rn,"px, ","px)","deg)"),Ch=un(on,", ",")",")"),zh=Math.SQRT2,Ph=function(t,n){var e,r,i=t[0],o=t[1],u=t[2],a=n[0],c=n[1],s=n[2],f=a-i,l=c-o,h=f*f+l*l;if(h<1e-12)r=Math.log(s/u)/zh,e=function(t){return[i+t*f,o+t*l,u*Math.exp(zh*t*r)]};else{var p=Math.sqrt(h),d=(s*s-u*u+4*h)/(2*u*2*p),v=(s*s-u*u-4*h)/(2*s*2*p),_=Math.log(Math.sqrt(d*d+1)-d),g=Math.log(Math.sqrt(v*v+1)-v);r=(g-_)/zh,e=function(t){var n=t*r,e=an(_),a=u/(2*p)*(e*sn(zh*n+_)-cn(_));return[i+a*f,o+a*l,u*e/an(zh*n+_)]}}return e.duration=1e3*r,e},Lh=fn(Jt),Rh=fn(Kt),qh=hn(Jt),Uh=hn(Kt),Dh=pn(Jt),Oh=pn(Kt),Fh=function(t,n){for(var e=new Array(n),r=0;r<n;++r)e[r]=t(r/(n-1));return e},Ih=0,Yh=0,Bh=0,jh=1e3,Hh=0,Xh=0,Vh=0,$h="object"==typeof performance&&performance.now?performance:Date,Wh="function"==typeof requestAnimationFrame?requestAnimationFrame:function(t){setTimeout(t,17)};_n.prototype=gn.prototype={constructor:_n,restart:function(t,n,e){if("function"!=typeof t)throw new TypeError("callback is not a function");e=(null==e?dn():+e)+(null==n?0:+n),this._next||fh===this||(fh?fh._next=this:sh=this,fh=this),this._call=t,this._time=e,wn()},stop:function(){this._call&&(this._call=null,this._time=1/0,wn())}};var Zh=function(t,n,e){var r=new _n;return n=null==n?0:+n,r.restart(function(e){r.stop(),t(e+n)},n,e),r},Gh=function(t,n,e){var r=new _n,i=n;return null==n?(r.restart(t,n,e),r):(n=+n,e=null==e?dn():+e,r.restart(function o(u){u+=i,r.restart(o,i+=n,e),t(u)},n,e),r)},Jh=d("start","end","interrupt"),Qh=[],Kh=0,tp=1,np=2,ep=3,rp=4,ip=5,op=6,up=function(t,n,e,r,i,o){var u=t.__transition;if(u){if(e in u)return}else t.__transition={};Sn(t,e,{name:n,index:r,group:i,on:Jh,tween:Qh,time:o.time,delay:o.delay,duration:o.duration,ease:o.ease,timer:null,state:Kh})},ap=function(t,n){var e,r,i,o=t.__transition,u=!0;if(o){n=null==n?null:n+"";for(i in o)(e=o[i]).name===n?(r=e.state>np&&e.state<ip,e.state=op,e.timer.stop(),r&&e.on.call("interrupt",t,t.__data__,e.index,e.group),delete o[i]):u=!1;u&&delete t.__transition}},cp=function(t){return this.each(function(){ap(this,t)})},sp=function(t,n){var e=this._id;if(t+="",arguments.length<2){for(var r,i=kn(this.node(),e).tween,o=0,u=i.length;o<u;++o)if((r=i[o]).name===t)return r.value;return null}return this.each((null==n?Nn:En)(e,t,n))},fp=function(t,n){var e;return("number"==typeof n?mh:n instanceof Tt?dh:(e=Tt(n))?(n=e,dh):Mh)(t,n)},lp=function(t,n){var e=Ef(t),r="transform"===e?Ch:fp;return this.attrTween(t,"function"==typeof n?(e.local?qn:Rn)(e,r,An(this,"attr."+t,n)):null==n?(e.local?zn:Cn)(e):(e.local?Ln:Pn)(e,r,n+""))},hp=function(t,n){var e="attr."+t;if(arguments.length<2)return(e=this.tween(e))&&e._value;if(null==n)return this.tween(e,null);if("function"!=typeof n)throw new Error;var r=Ef(t);return this.tween(e,(r.local?Un:Dn)(r,n))},pp=function(t){var n=this._id;return arguments.length?this.each(("function"==typeof t?On:Fn)(n,t)):kn(this.node(),n).delay},dp=function(t){var n=this._id;return arguments.length?this.each(("function"==typeof t?In:Yn)(n,t)):kn(this.node(),n).duration},vp=function(t){var n=this._id;return arguments.length?this.each(Bn(n,t)):kn(this.node(),n).ease},_p=function(t){"function"!=typeof t&&(t=Rf(t));for(var n=this._groups,e=n.length,r=new Array(e),i=0;i<e;++i)for(var o,u=n[i],a=u.length,c=r[i]=[],s=0;s<a;++s)(o=u[s])&&t.call(o,o.__data__,s,u)&&c.push(o);return new Kn(r,this._parents,this._name,this._id)},gp=function(t){if(t._id!==this._id)throw new Error;for(var n=this._groups,e=t._groups,r=n.length,i=e.length,o=Math.min(r,i),u=new Array(r),a=0;a<o;++a)for(var c,s=n[a],f=e[a],l=s.length,h=u[a]=new Array(l),p=0;p<l;++p)(c=s[p]||f[p])&&(h[p]=c);for(;a<r;++a)u[a]=n[a];return new Kn(u,this._parents,this._name,this._id)},yp=function(t,n){var e=this._id;return arguments.length<2?kn(this.node(),e).on.on(t):this.each(Hn(e,t,n))},mp=function(){return this.on("end.remove",Xn(this._id))},xp=function(t){var n=this._name,e=this._id;"function"!=typeof t&&(t=If(t));for(var r=this._groups,i=r.length,o=new Array(i),u=0;u<i;++u)for(var a,c,s=r[u],f=s.length,l=o[u]=new Array(f),h=0;h<f;++h)(a=s[h])&&(c=t.call(a,a.__data__,h,s))&&("__data__"in a&&(c.__data__=a.__data__),l[h]=c,up(l[h],n,e,h,l,kn(a,e)));return new Kn(o,this._parents,n,e)},bp=function(t){var n=this._name,e=this._id;"function"!=typeof t&&(t=Bf(t));for(var r=this._groups,i=r.length,o=[],u=[],a=0;a<i;++a)for(var c,s=r[a],f=s.length,l=0;l<f;++l)if(c=s[l]){for(var h,p=t.call(c,c.__data__,l,s),d=kn(c,e),v=0,_=p.length;v<_;++v)(h=p[v])&&up(h,n,e,v,p,d);o.push(p),u.push(c)}return new Kn(o,u,n,e)},wp=vt.prototype.constructor,Mp=function(){return new wp(this._groups,this._parents)},Tp=function(t,n,e){var r="transform"==(t+="")?Ah:fp;return null==n?this.styleTween(t,Vn(t,r)).on("end.style."+t,$n(t)):this.styleTween(t,"function"==typeof n?Zn(t,r,An(this,"style."+t,n)):Wn(t,r,n+""),e)},kp=function(t,n,e){var r="style."+(t+="");if(arguments.length<2)return(r=this.tween(r))&&r._value;if(null==n)return this.tween(r,null);if("function"!=typeof n)throw new Error;return this.tween(r,Gn(t,n,null==e?"":e))},Sp=function(t){return this.tween("text","function"==typeof t?Qn(An(this,"text",t)):Jn(null==t?"":t+""))},Np=function(){for(var t=this._name,n=this._id,e=ne(),r=this._groups,i=r.length,o=0;o<i;++o)for(var u,a=r[o],c=a.length,s=0;s<c;++s)if(u=a[s]){var f=kn(u,n);up(u,t,e,s,a,{time:f.time+f.delay+f.duration,delay:0,duration:f.duration,ease:f.ease})}return new Kn(r,this._parents,t,e)},Ep=0,Ap=vt.prototype;Kn.prototype=te.prototype={constructor:Kn,select:xp,selectAll:bp,filter:_p,merge:gp,selection:Mp,transition:Np,call:Ap.call,nodes:Ap.nodes,node:Ap.node,size:Ap.size,empty:Ap.empty,each:Ap.each,on:yp,attr:lp,attrTween:hp,style:Tp,styleTween:kp,text:Sp,remove:mp,tween:sp,delay:pp,duration:dp,ease:vp};var Cp=function t(n){function e(t){return Math.pow(t,n)}return n=+n,e.exponent=t,e}(3),zp=function t(n){function e(t){return 1-Math.pow(1-t,n)}return n=+n,e.exponent=t,e}(3),Pp=function t(n){function e(t){return((t*=2)<=1?Math.pow(t,n):2-Math.pow(2-t,n))/2}return n=+n,e.exponent=t,e}(3),Lp=Math.PI,Rp=Lp/2,qp=4/11,Up=6/11,Dp=8/11,Op=.75,Fp=9/11,Ip=10/11,Yp=.9375,Bp=21/22,jp=63/64,Hp=1/qp/qp,Xp=function t(n){function e(t){return t*t*((n+1)*t-n)}return n=+n,e.overshoot=t,e}(1.70158),Vp=function t(n){function e(t){return--t*t*((n+1)*t+n)+1}return n=+n,e.overshoot=t,e}(1.70158),$p=function t(n){function e(t){return((t*=2)<1?t*t*((n+1)*t-n):(t-=2)*t*((n+1)*t+n)+2)/2}return n=+n,e.overshoot=t,e}(1.70158),Wp=2*Math.PI,Zp=function t(n,e){function r(t){return n*Math.pow(2,10*--t)*Math.sin((i-t)/e)}var i=Math.asin(1/(n=Math.max(1,n)))*(e/=Wp);return r.amplitude=function(n){return t(n,e*Wp)},r.period=function(e){return t(n,e)},r}(1,.3),Gp=function t(n,e){function r(t){return 1-n*Math.pow(2,-10*(t=+t))*Math.sin((t+i)/e)}var i=Math.asin(1/(n=Math.max(1,n)))*(e/=Wp);return r.amplitude=function(n){return t(n,e*Wp)},r.period=function(e){return t(n,e)},r}(1,.3),Jp=function t(n,e){function r(t){return((t=2*t-1)<0?n*Math.pow(2,10*t)*Math.sin((i-t)/e):2-n*Math.pow(2,-10*t)*Math.sin((i+t)/e))/2}var i=Math.asin(1/(n=Math.max(1,n)))*(e/=Wp);return r.amplitude=function(n){return t(n,e*Wp)},r.period=function(e){return t(n,e)},r}(1,.3),Qp={time:null,delay:0,duration:250,ease:ce},Kp=function(t){var n,e;t instanceof Kn?(n=t._id,t=t._name):(n=ne(),(e=Qp).time=dn(),t=null==t?null:t+"");for(var r=this._groups,i=r.length,o=0;o<i;++o)for(var u,a=r[o],c=a.length,s=0;s<c;++s)(u=a[s])&&up(u,t,n,s,a,e||be(u,n));return new Kn(r,this._parents,t,n)};vt.prototype.interrupt=cp,vt.prototype.transition=Kp;var td=[null],nd=function(t,n){var e,r,i=t.__transition;if(i){n=null==n?null:n+"";for(r in i)if((e=i[r]).state>tp&&e.name===n)return new Kn([[t]],td,n,+r)}return null},ed=function(t){return function(){return t}},rd=function(t,n,e){this.target=t,this.type=n,this.selection=e},id=function(){t.event.preventDefault(),t.event.stopImmediatePropagation()},od={name:"drag"},ud={name:"space"},ad={name:"handle"},cd={name:"center"},sd={name:"x",handles:["e","w"].map(Me),input:function(t,n){return t&&[[t[0],n[0][1]],[t[1],n[1][1]]]},output:function(t){return t&&[t[0][0],t[1][0]]}},fd={name:"y",handles:["n","s"].map(Me),input:function(t,n){return t&&[[n[0][0],t[0]],[n[1][0],t[1]]]},output:function(t){return t&&[t[0][1],t[1][1]]}},ld={name:"xy",handles:["n","e","s","w","nw","ne","se","sw"].map(Me),input:function(t){return t},output:function(t){return t}},hd={overlay:"crosshair",selection:"move",n:"ns-resize",e:"ew-resize",s:"ns-resize",w:"ew-resize",nw:"nwse-resize",ne:"nesw-resize",se:"nwse-resize",sw:"nesw-resize"},pd={e:"w",w:"e",nw:"ne",ne:"nw",se:"sw",sw:"se"},dd={n:"s",s:"n",nw:"sw",ne:"se",se:"ne",sw:"nw"},vd={overlay:1,selection:1,n:null,e:1,s:null,w:-1,nw:-1,ne:1,se:1,sw:-1},_d={overlay:1,selection:1,n:-1,e:null,s:1,w:null,nw:-1,ne:-1,se:1,sw:1},gd=function(){return ze(ld)},yd=Math.cos,md=Math.sin,xd=Math.PI,bd=xd/2,wd=2*xd,Md=Math.max,Td=function(){function t(t){var o,u,a,c,s,f,l=t.length,h=[],p=Gs(l),d=[],v=[],_=v.groups=new Array(l),g=new Array(l*l);for(o=0,s=-1;++s<l;){for(u=0,f=-1;++f<l;)u+=t[s][f];h.push(u),d.push(Gs(l)),o+=u}for(e&&p.sort(function(t,n){return e(h[t],h[n])}),r&&d.forEach(function(n,e){n.sort(function(n,i){return r(t[e][n],t[e][i])})}),o=Md(0,wd-n*l)/o,c=o?n:wd/l,u=0,s=-1;++s<l;){for(a=u,f=-1;++f<l;){var y=p[s],m=d[y][f],x=t[y][m],b=u,w=u+=x*o;g[m*l+y]={index:y,subindex:m,startAngle:b,endAngle:w,value:x}}_[y]={index:y,startAngle:a,endAngle:u,value:h[y]},u+=c}for(s=-1;++s<l;)for(f=s-1;++f<l;){var M=g[f*l+s],T=g[s*l+f];(M.value||T.value)&&v.push(M.value<T.value?{source:T,target:M}:{source:M,target:T})}return i?v.sort(i):v}var n=0,e=null,r=null,i=null;return t.padAngle=function(e){return arguments.length?(n=Md(0,e),t):n},t.sortGroups=function(n){return arguments.length?(e=n,t):e},t.sortSubgroups=function(n){return arguments.length?(r=n,t):r},t.sortChords=function(n){return arguments.length?(null==n?i=null:(i=Pe(n))._=n,t):i&&i._},t},kd=Array.prototype.slice,Sd=function(t){return function(){return t}},Nd=Math.PI,Ed=2*Nd,Ad=Ed-1e-6;Le.prototype=Re.prototype={constructor:Le,moveTo:function(t,n){this._+="M"+(this._x0=this._x1=+t)+","+(this._y0=this._y1=+n)},closePath:function(){null!==this._x1&&(this._x1=this._x0,this._y1=this._y0,this._+="Z")},lineTo:function(t,n){this._+="L"+(this._x1=+t)+","+(this._y1=+n)},quadraticCurveTo:function(t,n,e,r){this._+="Q"+ +t+","+ +n+","+(this._x1=+e)+","+(this._y1=+r)},bezierCurveTo:function(t,n,e,r,i,o){this._+="C"+ +t+","+ +n+","+ +e+","+ +r+","+(this._x1=+i)+","+(this._y1=+o)},arcTo:function(t,n,e,r,i){t=+t,n=+n,e=+e,r=+r,i=+i;var o=this._x1,u=this._y1,a=e-t,c=r-n,s=o-t,f=u-n,l=s*s+f*f;if(i<0)throw new Error("negative radius: "+i);if(null===this._x1)this._+="M"+(this._x1=t)+","+(this._y1=n);else if(l>1e-6)if(Math.abs(f*a-c*s)>1e-6&&i){var h=e-o,p=r-u,d=a*a+c*c,v=h*h+p*p,_=Math.sqrt(d),g=Math.sqrt(l),y=i*Math.tan((Nd-Math.acos((d+l-v)/(2*_*g)))/2),m=y/g,x=y/_;Math.abs(m-1)>1e-6&&(this._+="L"+(t+m*s)+","+(n+m*f)),this._+="A"+i+","+i+",0,0,"+ +(f*h>s*p)+","+(this._x1=t+x*a)+","+(this._y1=n+x*c)}else this._+="L"+(this._x1=t)+","+(this._y1=n);else;},arc:function(t,n,e,r,i,o){t=+t,n=+n,e=+e;var u=e*Math.cos(r),a=e*Math.sin(r),c=t+u,s=n+a,f=1^o,l=o?r-i:i-r;if(e<0)throw new Error("negative radius: "+e);null===this._x1?this._+="M"+c+","+s:(Math.abs(this._x1-c)>1e-6||Math.abs(this._y1-s)>1e-6)&&(this._+="L"+c+","+s),e&&(l<0&&(l=l%Ed+Ed),l>Ad?this._+="A"+e+","+e+",0,1,"+f+","+(t-u)+","+(n-a)+"A"+e+","+e+",0,1,"+f+","+(this._x1=c)+","+(this._y1=s):l>1e-6&&(this._+="A"+e+","+e+",0,"+ +(l>=Nd)+","+f+","+(this._x1=t+e*Math.cos(i))+","+(this._y1=n+e*Math.sin(i))))},rect:function(t,n,e,r){this._+="M"+(this._x0=this._x1=+t)+","+(this._y0=this._y1=+n)+"h"+ +e+"v"+ +r+"h"+-e+"Z"},toString:function(){return this._}};var Cd=function(){function t(){var t,a=kd.call(arguments),c=n.apply(this,a),s=e.apply(this,a),f=+r.apply(this,(a[0]=c,a)),l=i.apply(this,a)-bd,h=o.apply(this,a)-bd,p=f*yd(l),d=f*md(l),v=+r.apply(this,(a[0]=s,a)),_=i.apply(this,a)-bd,g=o.apply(this,a)-bd;if(u||(u=t=Re()),u.moveTo(p,d),u.arc(0,0,f,l,h),l===_&&h===g||(u.quadraticCurveTo(0,0,v*yd(_),v*md(_)),u.arc(0,0,v,_,g)),u.quadraticCurveTo(0,0,p,d),u.closePath(),t)return u=null,t+""||null}var n=qe,e=Ue,r=De,i=Oe,o=Fe,u=null;return t.radius=function(n){return arguments.length?(r="function"==typeof n?n:Sd(+n),t):r},t.startAngle=function(n){return arguments.length?(i="function"==typeof n?n:Sd(+n),t):i},t.endAngle=function(n){return arguments.length?(o="function"==typeof n?n:Sd(+n),t):o},t.source=function(e){return arguments.length?(n=e,t):n},t.target=function(n){return arguments.length?(e=n,t):e},t.context=function(n){return arguments.length?(u=null==n?null:n,t):u},t};Ie.prototype=Ye.prototype={constructor:Ie,has:function(t){return"$"+t in this},get:function(t){return this["$"+t]},set:function(t,n){return this["$"+t]=n,this},remove:function(t){var n="$"+t;return n in this&&delete this[n]},clear:function(){for(var t in this)"$"===t[0]&&delete this[t]},keys:function(){var t=[];for(var n in this)"$"===n[0]&&t.push(n.slice(1));return t},values:function(){var t=[];for(var n in this)"$"===n[0]&&t.push(this[n]);return t},entries:function(){var t=[];for(var n in this)"$"===n[0]&&t.push({key:n.slice(1),value:this[n]});return t},size:function(){var t=0;for(var n in this)"$"===n[0]&&++t;return t},empty:function(){for(var t in this)if("$"===t[0])return!1;return!0},each:function(t){for(var n in this)"$"===n[0]&&t(this[n],n.slice(1),this)}};var zd=function(){function t(n,i,u,a){if(i>=o.length)return null!=r?r(n):null!=e?n.sort(e):n;for(var c,s,f,l=-1,h=n.length,p=o[i++],d=Ye(),v=u();++l<h;)(f=d.get(c=p(s=n[l])+""))?f.push(s):d.set(c,[s]);return d.each(function(n,e){a(v,e,t(n,i,u,a))}),v}function n(t,e){if(++e>o.length)return t;var i,a=u[e-1];return null!=r&&e>=o.length?i=t.entries():(i=[],t.each(function(t,r){i.push({key:r,values:n(t,e)})})),null!=a?i.sort(function(t,n){return a(t.key,n.key)}):i}var e,r,i,o=[],u=[];return i={object:function(n){return t(n,0,Be,je)},map:function(n){return t(n,0,He,Xe)},entries:function(e){return n(t(e,0,He,Xe),0)},key:function(t){return o.push(t),i},sortKeys:function(t){return u[o.length-1]=t,i},sortValues:function(t){return e=t,i},rollup:function(t){return r=t,i}}},Pd=Ye.prototype;Ve.prototype=$e.prototype={constructor:Ve,has:Pd.has,add:function(t){return t+="",this["$"+t]=t,this},remove:Pd.remove,clear:Pd.clear,values:Pd.keys,size:Pd.size,empty:Pd.empty,each:Pd.each};var Ld=function(t){var n=[];for(var e in t)n.push(e);return n},Rd=function(t){var n=[];for(var e in t)n.push(t[e]);return n},qd=function(t){var n=[];for(var e in t)n.push({key:e,value:t[e]});return n},Ud=function(t){function n(t,n){var r,i,o=e(t,function(t,e){if(r)return r(t,e-1);i=t,r=n?Ze(t,n):We(t)});return o.columns=i,o}function e(t,n){function e(){if(f>=s)return u;if(i)return i=!1,o;var n,e=f;if(34===t.charCodeAt(e)){for(var r=e;r++<s;)if(34===t.charCodeAt(r)){if(34!==t.charCodeAt(r+1))break;++r}return f=r+2,n=t.charCodeAt(r+1),13===n?(i=!0,10===t.charCodeAt(r+2)&&++f):10===n&&(i=!0),t.slice(e+1,r).replace(/""/g,'"')}for(;f<s;){var a=1;if(10===(n=t.charCodeAt(f++)))i=!0;else if(13===n)i=!0,10===t.charCodeAt(f)&&(++f,++a);else if(n!==c)continue;return t.slice(e,f-a)}return t.slice(e)}for(var r,i,o={},u={},a=[],s=t.length,f=0,l=0;(r=e())!==u;){for(var h=[];r!==o&&r!==u;)h.push(r),r=e();n&&null==(h=n(h,l++))||a.push(h)}return a}function r(n,e){return null==e&&(e=Ge(n)),[e.map(u).join(t)].concat(n.map(function(n){return e.map(function(t){return u(n[t])}).join(t)})).join("\n")}function i(t){return t.map(o).join("\n")}function o(n){return n.map(u).join(t)}function u(t){return null==t?"":a.test(t+="")?'"'+t.replace(/\"/g,'""')+'"':t}var a=new RegExp('["'+t+"\n\r]"),c=t.charCodeAt(0);return{parse:n,parseRows:e,format:r,formatRows:i}},Dd=Ud(","),Od=Dd.parse,Fd=Dd.parseRows,Id=Dd.format,Yd=Dd.formatRows,Bd=Ud("\t"),jd=Bd.parse,Hd=Bd.parseRows,Xd=Bd.format,Vd=Bd.formatRows,$d=function(t,n){function e(){var e,i,o=r.length,u=0,a=0;for(e=0;e<o;++e)i=r[e],u+=i.x,a+=i.y;for(u=u/o-t,a=a/o-n,e=0;e<o;++e)i=r[e],i.x-=u,i.y-=a}var r;return null==t&&(t=0),null==n&&(n=0),e.initialize=function(t){r=t},e.x=function(n){return arguments.length?(t=+n,e):t},e.y=function(t){return arguments.length?(n=+t,e):n},e},Wd=function(t){return function(){return t}},Zd=function(){return 1e-6*(Math.random()-.5)},Gd=function(t){var n=+this._x.call(null,t),e=+this._y.call(null,t);return Je(this.cover(n,e),n,e,t)},Jd=function(t,n){if(isNaN(t=+t)||isNaN(n=+n))return this;var e=this._x0,r=this._y0,i=this._x1,o=this._y1;if(isNaN(e))i=(e=Math.floor(t))+1,o=(r=Math.floor(n))+1;else{if(!(e>t||t>i||r>n||n>o))return this;var u,a,c=i-e,s=this._root;switch(a=(n<(r+o)/2)<<1|t<(e+i)/2){case 0:do{u=new Array(4),u[a]=s,s=u}while(c*=2,i=e+c,o=r+c,t>i||n>o);break;case 1:do{u=new Array(4),u[a]=s,s=u}while(c*=2,e=i-c,o=r+c,e>t||n>o);break;case 2:do{u=new Array(4),u[a]=s,s=u}while(c*=2,i=e+c,r=o-c,t>i||r>n);break;case 3:do{u=new Array(4),u[a]=s,s=u}while(c*=2,e=i-c,r=o-c,e>t||r>n)}this._root&&this._root.length&&(this._root=s)}return this._x0=e,this._y0=r,this._x1=i,this._y1=o,this},Qd=function(){var t=[];return this.visit(function(n){if(!n.length)do{t.push(n.data)}while(n=n.next)}),t},Kd=function(t){return arguments.length?this.cover(+t[0][0],+t[0][1]).cover(+t[1][0],+t[1][1]):isNaN(this._x0)?void 0:[[this._x0,this._y0],[this._x1,this._y1]]},tv=function(t,n,e,r,i){this.node=t,this.x0=n,this.y0=e,this.x1=r,this.y1=i},nv=function(t,n,e){var r,i,o,u,a,c,s,f=this._x0,l=this._y0,h=this._x1,p=this._y1,d=[],v=this._root;for(v&&d.push(new tv(v,f,l,h,p)),null==e?e=1/0:(f=t-e,l=n-e,h=t+e,p=n+e,e*=e);c=d.pop();)if(!(!(v=c.node)||(i=c.x0)>h||(o=c.y0)>p||(u=c.x1)<f||(a=c.y1)<l))if(v.length){var _=(i+u)/2,g=(o+a)/2;d.push(new tv(v[3],_,g,u,a),new tv(v[2],i,g,_,a),new tv(v[1],_,o,u,g),new tv(v[0],i,o,_,g)),(s=(n>=g)<<1|t>=_)&&(c=d[d.length-1],d[d.length-1]=d[d.length-1-s],d[d.length-1-s]=c)}else{var y=t-+this._x.call(null,v.data),m=n-+this._y.call(null,v.data),x=y*y+m*m;if(x<e){var b=Math.sqrt(e=x);f=t-b,l=n-b,h=t+b,p=n+b,r=v.data}}return r},ev=function(t){if(isNaN(o=+this._x.call(null,t))||isNaN(u=+this._y.call(null,t)))return this;var n,e,r,i,o,u,a,c,s,f,l,h,p=this._root,d=this._x0,v=this._y0,_=this._x1,g=this._y1;if(!p)return this;if(p.length)for(;;){if((s=o>=(a=(d+_)/2))?d=a:_=a,(f=u>=(c=(v+g)/2))?v=c:g=c,n=p,!(p=p[l=f<<1|s]))return this;if(!p.length)break;(n[l+1&3]||n[l+2&3]||n[l+3&3])&&(e=n,h=l)}for(;p.data!==t;)if(r=p,!(p=p.next))return this;return(i=p.next)&&delete p.next,r?(i?r.next=i:delete r.next,this):n?(i?n[l]=i:delete n[l],(p=n[0]||n[1]||n[2]||n[3])&&p===(n[3]||n[2]||n[1]||n[0])&&!p.length&&(e?e[h]=p:this._root=p),this):(this._root=i,this)},rv=function(){return this._root},iv=function(){var t=0;return this.visit(function(n){if(!n.length)do{++t}while(n=n.next)}),t},ov=function(t){var n,e,r,i,o,u,a=[],c=this._root;for(c&&a.push(new tv(c,this._x0,this._y0,this._x1,this._y1));n=a.pop();)if(!t(c=n.node,r=n.x0,i=n.y0,o=n.x1,u=n.y1)&&c.length){var s=(r+o)/2,f=(i+u)/2;(e=c[3])&&a.push(new tv(e,s,f,o,u)),(e=c[2])&&a.push(new tv(e,r,f,s,u)),(e=c[1])&&a.push(new tv(e,s,i,o,f)),(e=c[0])&&a.push(new tv(e,r,i,s,f))}return this},uv=function(t){var n,e=[],r=[];for(this._root&&e.push(new tv(this._root,this._x0,this._y0,this._x1,this._y1));n=e.pop();){var i=n.node;if(i.length){var o,u=n.x0,a=n.y0,c=n.x1,s=n.y1,f=(u+c)/2,l=(a+s)/2;(o=i[0])&&e.push(new tv(o,u,a,f,l)),(o=i[1])&&e.push(new tv(o,f,a,c,l)),(o=i[2])&&e.push(new tv(o,u,l,f,s)),(o=i[3])&&e.push(new tv(o,f,l,c,s))}r.push(n)}for(;n=r.pop();)t(n.node,n.x0,n.y0,n.x1,n.y1);return this},av=function(t){return arguments.length?(this._x=t,this):this._x},cv=function(t){return arguments.length?(this._y=t,this):this._y},sv=er.prototype=rr.prototype;sv.copy=function(){var t,n,e=new rr(this._x,this._y,this._x0,this._y0,this._x1,this._y1),r=this._root;if(!r)return e;if(!r.length)return e._root=ir(r),e;for(t=[{source:r,target:e._root=new Array(4)}];r=t.pop();)for(var i=0;i<4;++i)(n=r.source[i])&&(n.length?t.push({source:n,target:r.target[i]=new Array(4)}):r.target[i]=ir(n));return e},sv.add=Gd,sv.addAll=Qe,sv.cover=Jd,sv.data=Qd,sv.extent=Kd,sv.find=nv,sv.remove=ev,sv.removeAll=Ke,sv.root=rv,sv.size=iv,sv.visit=ov,sv.visitAfter=uv,sv.x=av,sv.y=cv;var fv,lv=function(t){function n(){function t(t,n,e,r,i){var o=t.data,a=t.r,p=l+a;{if(!o)return n>s+p||r<s-p||e>f+p||i<f-p;if(o.index>c.index){var d=s-o.x-o.vx,v=f-o.y-o.vy,_=d*d+v*v;_<p*p&&(0===d&&(d=Zd(),_+=d*d),0===v&&(v=Zd(),_+=v*v),_=(p-(_=Math.sqrt(_)))/_*u,c.vx+=(d*=_)*(p=(a*=a)/(h+a)),c.vy+=(v*=_)*p,o.vx-=d*(p=1-p),o.vy-=v*p)}}}for(var n,r,c,s,f,l,h,p=i.length,d=0;d<a;++d)for(r=er(i,or,ur).visitAfter(e),n=0;n<p;++n)c=i[n],l=o[c.index],h=l*l,s=c.x+c.vx,f=c.y+c.vy,r.visit(t)}function e(t){if(t.data)return t.r=o[t.data.index];for(var n=t.r=0;n<4;++n)t[n]&&t[n].r>t.r&&(t.r=t[n].r)}function r(){if(i){var n,e,r=i.length;for(o=new Array(r),n=0;n<r;++n)e=i[n],o[e.index]=+t(e,n,i)}}var i,o,u=1,a=1;return"function"!=typeof t&&(t=Wd(null==t?1:+t)),n.initialize=function(t){i=t,r()},n.iterations=function(t){return arguments.length?(a=+t,n):a},n.strength=function(t){return arguments.length?(u=+t,n):u},n.radius=function(e){return arguments.length?(t="function"==typeof e?e:Wd(+e),r(),n):t},n},hv=function(t){function n(t){return 1/Math.min(s[t.source.index],s[t.target.index])}function e(n){for(var e=0,r=t.length;e<d;++e)for(var i,o,c,s,l,h,p,v=0;v<r;++v)i=t[v],o=i.source,c=i.target,s=c.x+c.vx-o.x-o.vx||Zd(),l=c.y+c.vy-o.y-o.vy||Zd(),h=Math.sqrt(s*s+l*l),h=(h-a[v])/h*n*u[v],s*=h,l*=h,c.vx-=s*(p=f[v]),c.vy-=l*p,o.vx+=s*(p=1-p),o.vy+=l*p}function r(){if(c){var n,e,r=c.length,h=t.length,p=Ye(c,l);for(n=0,s=new Array(r);n<h;++n)e=t[n],e.index=n,"object"!=typeof e.source&&(e.source=cr(p,e.source)),"object"!=typeof e.target&&(e.target=cr(p,e.target)),s[e.source.index]=(s[e.source.index]||0)+1,s[e.target.index]=(s[e.target.index]||0)+1;for(n=0,f=new Array(h);n<h;++n)e=t[n],f[n]=s[e.source.index]/(s[e.source.index]+s[e.target.index]);u=new Array(h),i(),a=new Array(h),o()}}function i(){if(c)for(var n=0,e=t.length;n<e;++n)u[n]=+h(t[n],n,t)}function o(){if(c)for(var n=0,e=t.length;n<e;++n)a[n]=+p(t[n],n,t)}var u,a,c,s,f,l=ar,h=n,p=Wd(30),d=1;return null==t&&(t=[]),e.initialize=function(t){c=t,r()},e.links=function(n){return arguments.length?(t=n,r(),e):t},e.id=function(t){return arguments.length?(l=t,e):l},e.iterations=function(t){return arguments.length?(d=+t,e):d},e.strength=function(t){return arguments.length?(h="function"==typeof t?t:Wd(+t),i(),e):h},e.distance=function(t){return arguments.length?(p="function"==typeof t?t:Wd(+t),o(),e):p},e},pv=10,dv=Math.PI*(3-Math.sqrt(5)),vv=function(t){function n(){e(),p.call("tick",o),u<a&&(h.stop(),p.call("end",o))}function e(){var n,e,r=t.length;for(u+=(s-u)*c,
l.each(function(t){t(u)}),n=0;n<r;++n)e=t[n],null==e.fx?e.x+=e.vx*=f:(e.x=e.fx,e.vx=0),null==e.fy?e.y+=e.vy*=f:(e.y=e.fy,e.vy=0)}function r(){for(var n,e=0,r=t.length;e<r;++e){if(n=t[e],n.index=e,isNaN(n.x)||isNaN(n.y)){var i=pv*Math.sqrt(e),o=e*dv;n.x=i*Math.cos(o),n.y=i*Math.sin(o)}(isNaN(n.vx)||isNaN(n.vy))&&(n.vx=n.vy=0)}}function i(n){return n.initialize&&n.initialize(t),n}var o,u=1,a=.001,c=1-Math.pow(a,1/300),s=0,f=.6,l=Ye(),h=gn(n),p=d("tick","end");return null==t&&(t=[]),r(),o={tick:e,restart:function(){return h.restart(n),o},stop:function(){return h.stop(),o},nodes:function(n){return arguments.length?(t=n,r(),l.each(i),o):t},alpha:function(t){return arguments.length?(u=+t,o):u},alphaMin:function(t){return arguments.length?(a=+t,o):a},alphaDecay:function(t){return arguments.length?(c=+t,o):+c},alphaTarget:function(t){return arguments.length?(s=+t,o):s},velocityDecay:function(t){return arguments.length?(f=1-t,o):1-f},force:function(t,n){return arguments.length>1?(null==n?l.remove(t):l.set(t,i(n)),o):l.get(t)},find:function(n,e,r){var i,o,u,a,c,s=0,f=t.length;for(null==r?r=1/0:r*=r,s=0;s<f;++s)a=t[s],i=n-a.x,o=e-a.y,(u=i*i+o*o)<r&&(c=a,r=u);return c},on:function(t,n){return arguments.length>1?(p.on(t,n),o):p.on(t)}}},_v=function(){function t(t){var n,a=i.length,c=er(i,sr,fr).visitAfter(e);for(u=t,n=0;n<a;++n)o=i[n],c.visit(r)}function n(){if(i){var t,n,e=i.length;for(a=new Array(e),t=0;t<e;++t)n=i[t],a[n.index]=+c(n,t,i)}}function e(t){var n,e,r,i,o,u=0;if(t.length){for(r=i=o=0;o<4;++o)(n=t[o])&&(e=n.value)&&(u+=e,r+=e*n.x,i+=e*n.y);t.x=r/u,t.y=i/u}else{n=t,n.x=n.data.x,n.y=n.data.y;do{u+=a[n.data.index]}while(n=n.next)}t.value=u}function r(t,n,e,r){if(!t.value)return!0;var i=t.x-o.x,c=t.y-o.y,h=r-n,p=i*i+c*c;if(h*h/l<p)return p<f&&(0===i&&(i=Zd(),p+=i*i),0===c&&(c=Zd(),p+=c*c),p<s&&(p=Math.sqrt(s*p)),o.vx+=i*t.value*u/p,o.vy+=c*t.value*u/p),!0;if(!(t.length||p>=f)){(t.data!==o||t.next)&&(0===i&&(i=Zd(),p+=i*i),0===c&&(c=Zd(),p+=c*c),p<s&&(p=Math.sqrt(s*p)));do{t.data!==o&&(h=a[t.data.index]*u/p,o.vx+=i*h,o.vy+=c*h)}while(t=t.next)}}var i,o,u,a,c=Wd(-30),s=1,f=1/0,l=.81;return t.initialize=function(t){i=t,n()},t.strength=function(e){return arguments.length?(c="function"==typeof e?e:Wd(+e),n(),t):c},t.distanceMin=function(n){return arguments.length?(s=n*n,t):Math.sqrt(s)},t.distanceMax=function(n){return arguments.length?(f=n*n,t):Math.sqrt(f)},t.theta=function(n){return arguments.length?(l=n*n,t):Math.sqrt(l)},t},gv=function(t){function n(t){for(var n,e=0,u=r.length;e<u;++e)n=r[e],n.vx+=(o[e]-n.x)*i[e]*t}function e(){if(r){var n,e=r.length;for(i=new Array(e),o=new Array(e),n=0;n<e;++n)i[n]=isNaN(o[n]=+t(r[n],n,r))?0:+u(r[n],n,r)}}var r,i,o,u=Wd(.1);return"function"!=typeof t&&(t=Wd(null==t?0:+t)),n.initialize=function(t){r=t,e()},n.strength=function(t){return arguments.length?(u="function"==typeof t?t:Wd(+t),e(),n):u},n.x=function(r){return arguments.length?(t="function"==typeof r?r:Wd(+r),e(),n):t},n},yv=function(t){function n(t){for(var n,e=0,u=r.length;e<u;++e)n=r[e],n.vy+=(o[e]-n.y)*i[e]*t}function e(){if(r){var n,e=r.length;for(i=new Array(e),o=new Array(e),n=0;n<e;++n)i[n]=isNaN(o[n]=+t(r[n],n,r))?0:+u(r[n],n,r)}}var r,i,o,u=Wd(.1);return"function"!=typeof t&&(t=Wd(null==t?0:+t)),n.initialize=function(t){r=t,e()},n.strength=function(t){return arguments.length?(u="function"==typeof t?t:Wd(+t),e(),n):u},n.y=function(r){return arguments.length?(t="function"==typeof r?r:Wd(+r),e(),n):t},n},mv=function(t,n){if((e=(t=n?t.toExponential(n-1):t.toExponential()).indexOf("e"))<0)return null;var e,r=t.slice(0,e);return[r.length>1?r[0]+r.slice(2):r,+t.slice(e+1)]},xv=function(t){return t=mv(Math.abs(t)),t?t[1]:NaN},bv=function(t,n){return function(e,r){for(var i=e.length,o=[],u=0,a=t[0],c=0;i>0&&a>0&&(c+a+1>r&&(a=Math.max(1,r-c)),o.push(e.substring(i-=a,i+a)),!((c+=a+1)>r));)a=t[u=(u+1)%t.length];return o.reverse().join(n)}},wv=function(t){return function(n){return n.replace(/[0-9]/g,function(n){return t[+n]})}},Mv=function(t,n){t=t.toPrecision(n);t:for(var e,r=t.length,i=1,o=-1;i<r;++i)switch(t[i]){case".":o=e=i;break;case"0":0===o&&(o=i),e=i;break;case"e":break t;default:o>0&&(o=0)}return o>0?t.slice(0,o)+t.slice(e+1):t},Tv=function(t,n){var e=mv(t,n);if(!e)return t+"";var r=e[0],i=e[1],o=i-(fv=3*Math.max(-8,Math.min(8,Math.floor(i/3))))+1,u=r.length;return o===u?r:o>u?r+new Array(o-u+1).join("0"):o>0?r.slice(0,o)+"."+r.slice(o):"0."+new Array(1-o).join("0")+mv(t,Math.max(0,n+o-1))[0]},kv=function(t,n){var e=mv(t,n);if(!e)return t+"";var r=e[0],i=e[1];return i<0?"0."+new Array(-i).join("0")+r:r.length>i+1?r.slice(0,i+1)+"."+r.slice(i+1):r+new Array(i-r.length+2).join("0")},Sv={"":Mv,"%":function(t,n){return(100*t).toFixed(n)},b:function(t){return Math.round(t).toString(2)},c:function(t){return t+""},d:function(t){return Math.round(t).toString(10)},e:function(t,n){return t.toExponential(n)},f:function(t,n){return t.toFixed(n)},g:function(t,n){return t.toPrecision(n)},o:function(t){return Math.round(t).toString(8)},p:function(t,n){return kv(100*t,n)},r:kv,s:Tv,X:function(t){return Math.round(t).toString(16).toUpperCase()},x:function(t){return Math.round(t).toString(16)}},Nv=/^(?:(.)?([<>=^]))?([+\-\( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?([a-z%])?$/i;lr.prototype=hr.prototype,hr.prototype.toString=function(){return this.fill+this.align+this.sign+this.symbol+(this.zero?"0":"")+(null==this.width?"":Math.max(1,0|this.width))+(this.comma?",":"")+(null==this.precision?"":"."+Math.max(0,0|this.precision))+this.type};var Ev,Av=function(t){return t},Cv=["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"],zv=function(t){function n(t){function n(t){var n,i,s,m=v,x=_;if("c"===d)x=g(t)+x,t="";else{t=+t;var b=t<0;if(t=g(Math.abs(t),p),b&&0==+t&&(b=!1),m=(b?"("===c?c:"-":"-"===c||"("===c?"":c)+m,x=x+("s"===d?Cv[8+fv/3]:"")+(b&&"("===c?")":""),y)for(n=-1,i=t.length;++n<i;)if(48>(s=t.charCodeAt(n))||s>57){x=(46===s?o+t.slice(n+1):t.slice(n))+x,t=t.slice(0,n);break}}h&&!f&&(t=r(t,1/0));var w=m.length+t.length+x.length,M=w<l?new Array(l-w+1).join(e):"";switch(h&&f&&(t=r(M+t,M.length?l-x.length:1/0),M=""),a){case"<":t=m+t+x+M;break;case"=":t=m+M+t+x;break;case"^":t=M.slice(0,w=M.length>>1)+m+t+x+M.slice(w);break;default:t=M+m+t+x}return u(t)}t=lr(t);var e=t.fill,a=t.align,c=t.sign,s=t.symbol,f=t.zero,l=t.width,h=t.comma,p=t.precision,d=t.type,v="$"===s?i[0]:"#"===s&&/[boxX]/.test(d)?"0"+d.toLowerCase():"",_="$"===s?i[1]:/[%p]/.test(d)?"%":"",g=Sv[d],y=!d||/[defgprs%]/.test(d);return p=null==p?d?6:12:/[gprs]/.test(d)?Math.max(1,Math.min(21,p)):Math.max(0,Math.min(20,p)),n.toString=function(){return t+""},n}function e(t,e){var r=n((t=lr(t),t.type="f",t)),i=3*Math.max(-8,Math.min(8,Math.floor(xv(e)/3))),o=Math.pow(10,-i),u=Cv[8+i/3];return function(t){return r(o*t)+u}}var r=t.grouping&&t.thousands?bv(t.grouping,t.thousands):Av,i=t.currency,o=t.decimal,u=t.numerals?wv(t.numerals):Av;return{format:n,formatPrefix:e}};pr({decimal:".",thousands:",",grouping:[3],currency:["$",""]});var Pv=function(t){return Math.max(0,-xv(Math.abs(t)))},Lv=function(t,n){return Math.max(0,3*Math.max(-8,Math.min(8,Math.floor(xv(n)/3)))-xv(Math.abs(t)))},Rv=function(t,n){return t=Math.abs(t),n=Math.abs(n)-t,Math.max(0,xv(n)-xv(t))+1},qv=function(){return new dr};dr.prototype={constructor:dr,reset:function(){this.s=this.t=0},add:function(t){vr(p_,t,this.t),vr(this,p_.s,this.s),this.s?this.t+=p_.t:this.s=p_.t},valueOf:function(){return this.s}};var Uv,Dv,Ov,Fv,Iv,Yv,Bv,jv,Hv,Xv,Vv,$v,Wv,Zv,Gv,Jv,Qv,Kv,t_,n_,e_,r_,i_,o_,u_,a_,c_,s_,f_,l_,h_,p_=new dr,d_=1e-6,v_=Math.PI,__=v_/2,g_=v_/4,y_=2*v_,m_=180/v_,x_=v_/180,b_=Math.abs,w_=Math.atan,M_=Math.atan2,T_=Math.cos,k_=Math.ceil,S_=Math.exp,N_=Math.log,E_=Math.pow,A_=Math.sin,C_=Math.sign||function(t){return t>0?1:t<0?-1:0},z_=Math.sqrt,P_=Math.tan,L_={Feature:function(t,n){xr(t.geometry,n)},FeatureCollection:function(t,n){for(var e=t.features,r=-1,i=e.length;++r<i;)xr(e[r].geometry,n)}},R_={Sphere:function(t,n){n.sphere()},Point:function(t,n){t=t.coordinates,n.point(t[0],t[1],t[2])},MultiPoint:function(t,n){for(var e=t.coordinates,r=-1,i=e.length;++r<i;)t=e[r],n.point(t[0],t[1],t[2])},LineString:function(t,n){br(t.coordinates,n,0)},MultiLineString:function(t,n){for(var e=t.coordinates,r=-1,i=e.length;++r<i;)br(e[r],n,0)},Polygon:function(t,n){wr(t.coordinates,n)},MultiPolygon:function(t,n){for(var e=t.coordinates,r=-1,i=e.length;++r<i;)wr(e[r],n)},GeometryCollection:function(t,n){for(var e=t.geometries,r=-1,i=e.length;++r<i;)xr(e[r],n)}},q_=function(t,n){t&&L_.hasOwnProperty(t.type)?L_[t.type](t,n):xr(t,n)},U_=qv(),D_=qv(),O_={point:mr,lineStart:mr,lineEnd:mr,polygonStart:function(){U_.reset(),O_.lineStart=Mr,O_.lineEnd=Tr},polygonEnd:function(){var t=+U_;D_.add(t<0?y_+t:t),this.lineStart=this.lineEnd=this.point=mr},sphere:function(){D_.add(y_)}},F_=function(t){return D_.reset(),q_(t,O_),2*D_},I_=qv(),Y_={point:Rr,lineStart:Ur,lineEnd:Dr,polygonStart:function(){Y_.point=Or,Y_.lineStart=Fr,Y_.lineEnd=Ir,I_.reset(),O_.polygonStart()},polygonEnd:function(){O_.polygonEnd(),Y_.point=Rr,Y_.lineStart=Ur,Y_.lineEnd=Dr,U_<0?(Yv=-(jv=180),Bv=-(Hv=90)):I_>d_?Hv=90:I_<-d_&&(Bv=-90),Gv[0]=Yv,Gv[1]=jv}},B_=function(t){var n,e,r,i,o,u,a;if(Hv=jv=-(Yv=Bv=1/0),Zv=[],q_(t,Y_),e=Zv.length){for(Zv.sort(Br),n=1,r=Zv[0],o=[r];n<e;++n)i=Zv[n],jr(r,i[0])||jr(r,i[1])?(Yr(r[0],i[1])>Yr(r[0],r[1])&&(r[1]=i[1]),Yr(i[0],r[1])>Yr(r[0],r[1])&&(r[0]=i[0])):o.push(r=i);for(u=-(1/0),e=o.length-1,n=0,r=o[e];n<=e;r=i,++n)i=o[n],(a=Yr(r[1],i[0]))>u&&(u=a,Yv=i[0],jv=r[1])}return Zv=Gv=null,Yv===1/0||Bv===1/0?[[NaN,NaN],[NaN,NaN]]:[[Yv,Bv],[jv,Hv]]},j_={sphere:mr,point:Hr,lineStart:Vr,lineEnd:Zr,polygonStart:function(){j_.lineStart=Gr,j_.lineEnd=Jr},polygonEnd:function(){j_.lineStart=Vr,j_.lineEnd=Zr}},H_=function(t){Jv=Qv=Kv=t_=n_=e_=r_=i_=o_=u_=a_=0,q_(t,j_);var n=o_,e=u_,r=a_,i=n*n+e*e+r*r;return i<1e-12&&(n=e_,e=r_,r=i_,Qv<d_&&(n=Kv,e=t_,r=n_),(i=n*n+e*e+r*r)<1e-12)?[NaN,NaN]:[M_(e,n)*m_,gr(r/z_(i))*m_]},X_=function(t){return function(){return t}},V_=function(t,n){function e(e,r){return e=t(e,r),n(e[0],e[1])}return t.invert&&n.invert&&(e.invert=function(e,r){return(e=n.invert(e,r))&&t.invert(e[0],e[1])}),e};ti.invert=ti;var $_,W_,Z_,G_,J_,Q_,K_,tg,ng,eg,rg,ig=function(t){function n(n){return n=t(n[0]*x_,n[1]*x_),n[0]*=m_,n[1]*=m_,n}return t=ni(t[0]*x_,t[1]*x_,t.length>2?t[2]*x_:0),n.invert=function(n){return n=t.invert(n[0]*x_,n[1]*x_),n[0]*=m_,n[1]*=m_,n},n},og=function(){function t(t,n){e.push(t=r(t,n)),t[0]*=m_,t[1]*=m_}function n(){var t=i.apply(this,arguments),n=o.apply(this,arguments)*x_,c=u.apply(this,arguments)*x_;return e=[],r=ni(-t[0]*x_,-t[1]*x_,0).invert,oi(a,n,c,1),t={type:"Polygon",coordinates:[e]},e=r=null,t}var e,r,i=X_([0,0]),o=X_(90),u=X_(6),a={point:t};return n.center=function(t){return arguments.length?(i="function"==typeof t?t:X_([+t[0],+t[1]]),n):i},n.radius=function(t){return arguments.length?(o="function"==typeof t?t:X_(+t),n):o},n.precision=function(t){return arguments.length?(u="function"==typeof t?t:X_(+t),n):u},n},ug=function(){var t,n=[];return{point:function(n,e){t.push([n,e])},lineStart:function(){n.push(t=[])},lineEnd:mr,rejoin:function(){n.length>1&&n.push(n.pop().concat(n.shift()))},result:function(){var e=n;return n=[],t=null,e}}},ag=function(t,n,e,r,i,o){var u,a=t[0],c=t[1],s=n[0],f=n[1],l=0,h=1,p=s-a,d=f-c;if(u=e-a,p||!(u>0)){if(u/=p,p<0){if(u<l)return;u<h&&(h=u)}else if(p>0){if(u>h)return;u>l&&(l=u)}if(u=i-a,p||!(u<0)){if(u/=p,p<0){if(u>h)return;u>l&&(l=u)}else if(p>0){if(u<l)return;u<h&&(h=u)}if(u=r-c,d||!(u>0)){if(u/=d,d<0){if(u<l)return;u<h&&(h=u)}else if(d>0){if(u>h)return;u>l&&(l=u)}if(u=o-c,d||!(u<0)){if(u/=d,d<0){if(u>h)return;u>l&&(l=u)}else if(d>0){if(u<l)return;u<h&&(h=u)}return l>0&&(t[0]=a+l*p,t[1]=c+l*d),h<1&&(n[0]=a+h*p,n[1]=c+h*d),!0}}}}},cg=function(t,n){return b_(t[0]-n[0])<d_&&b_(t[1]-n[1])<d_},sg=function(t,n,e,r,i){var o,u,a=[],c=[];if(t.forEach(function(t){if(!((n=t.length-1)<=0)){var n,e,r=t[0],u=t[n];if(cg(r,u)){for(i.lineStart(),o=0;o<n;++o)i.point((r=t[o])[0],r[1]);return void i.lineEnd()}a.push(e=new ai(r,t,null,!0)),c.push(e.o=new ai(r,null,e,!1)),a.push(e=new ai(u,t,null,!1)),c.push(e.o=new ai(u,null,e,!0))}}),a.length){for(c.sort(n),ci(a),ci(c),o=0,u=c.length;o<u;++o)c[o].e=e=!e;for(var s,f,l=a[0];;){for(var h=l,p=!0;h.v;)if((h=h.n)===l)return;s=h.z,i.lineStart();do{if(h.v=h.o.v=!0,h.e){if(p)for(o=0,u=s.length;o<u;++o)i.point((f=s[o])[0],f[1]);else r(h.x,h.n.x,1,i);h=h.n}else{if(p)for(s=h.p.z,o=s.length-1;o>=0;--o)i.point((f=s[o])[0],f[1]);else r(h.x,h.p.x,-1,i);h=h.p}h=h.o,s=h.z,p=!p}while(!h.v);i.lineEnd()}}},fg=1e9,lg=-fg,hg=function(){var t,n,e,r=0,i=0,o=960,u=500;return e={stream:function(e){return t&&n===e?t:t=si(r,i,o,u)(n=e)},extent:function(a){return arguments.length?(r=+a[0][0],i=+a[0][1],o=+a[1][0],u=+a[1][1],t=n=null,e):[[r,i],[o,u]]}}},pg=qv(),dg=function(t,n){var e=n[0],r=n[1],i=[A_(e),-T_(e),0],o=0,u=0;pg.reset();for(var a=0,c=t.length;a<c;++a)if(f=(s=t[a]).length)for(var s,f,l=s[f-1],h=l[0],p=l[1]/2+g_,d=A_(p),v=T_(p),_=0;_<f;++_,h=y,d=x,v=b,l=g){var g=s[_],y=g[0],m=g[1]/2+g_,x=A_(m),b=T_(m),w=y-h,M=w>=0?1:-1,T=M*w,k=T>v_,S=d*x;if(pg.add(M_(S*M*A_(T),v*b+S*T_(T))),o+=k?w+M*y_:w,k^h>=e^y>=e){var N=Cr(Er(l),Er(g));Lr(N);var E=Cr(i,N);Lr(E);var A=(k^w>=0?-1:1)*gr(E[2]);(r>A||r===A&&(N[0]||N[1]))&&(u+=k^w>=0?1:-1)}}return(o<-d_||o<d_&&pg<-d_)^1&u},vg=qv(),_g={sphere:mr,point:mr,lineStart:fi,lineEnd:mr,polygonStart:mr,polygonEnd:mr},gg=function(t){return vg.reset(),q_(t,_g),+vg},yg=[null,null],mg={type:"LineString",coordinates:yg},xg=function(t,n){return yg[0]=t,yg[1]=n,gg(mg)},bg={Feature:function(t,n){return di(t.geometry,n)},FeatureCollection:function(t,n){for(var e=t.features,r=-1,i=e.length;++r<i;)if(di(e[r].geometry,n))return!0;return!1}},wg={Sphere:function(){return!0},Point:function(t,n){return vi(t.coordinates,n)},MultiPoint:function(t,n){for(var e=t.coordinates,r=-1,i=e.length;++r<i;)if(vi(e[r],n))return!0;return!1},LineString:function(t,n){return _i(t.coordinates,n)},MultiLineString:function(t,n){for(var e=t.coordinates,r=-1,i=e.length;++r<i;)if(_i(e[r],n))return!0;return!1},Polygon:function(t,n){return gi(t.coordinates,n)},MultiPolygon:function(t,n){for(var e=t.coordinates,r=-1,i=e.length;++r<i;)if(gi(e[r],n))return!0;return!1},GeometryCollection:function(t,n){for(var e=t.geometries,r=-1,i=e.length;++r<i;)if(di(e[r],n))return!0;return!1}},Mg=function(t,n){return(t&&bg.hasOwnProperty(t.type)?bg[t.type]:di)(t,n)},Tg=function(t,n){var e=t[0]*x_,r=t[1]*x_,i=n[0]*x_,o=n[1]*x_,u=T_(r),a=A_(r),c=T_(o),s=A_(o),f=u*T_(e),l=u*A_(e),h=c*T_(i),p=c*A_(i),d=2*gr(z_(yr(o-r)+u*c*yr(i-e))),v=A_(d),_=d?function(t){var n=A_(t*=d)/v,e=A_(d-t)/v,r=e*f+n*h,i=e*l+n*p,o=e*a+n*s;return[M_(i,r)*m_,M_(o,z_(r*r+i*i))*m_]}:function(){return[e*m_,r*m_]};return _.distance=d,_},kg=function(t){return t},Sg=qv(),Ng=qv(),Eg={point:mr,lineStart:mr,lineEnd:mr,polygonStart:function(){Eg.lineStart=Ti,Eg.lineEnd=Ni},polygonEnd:function(){Eg.lineStart=Eg.lineEnd=Eg.point=mr,Sg.add(b_(Ng)),Ng.reset()},result:function(){var t=Sg/2;return Sg.reset(),t}},Ag=1/0,Cg=Ag,zg=-Ag,Pg=zg,Lg={point:Ei,lineStart:mr,lineEnd:mr,polygonStart:mr,polygonEnd:mr,result:function(){var t=[[Ag,Cg],[zg,Pg]];return zg=Pg=-(Cg=Ag=1/0),t}},Rg=0,qg=0,Ug=0,Dg=0,Og=0,Fg=0,Ig=0,Yg=0,Bg=0,jg={point:Ai,lineStart:Ci,lineEnd:Li,polygonStart:function(){jg.lineStart=Ri,jg.lineEnd=qi},polygonEnd:function(){jg.point=Ai,jg.lineStart=Ci,jg.lineEnd=Li},result:function(){var t=Bg?[Ig/Bg,Yg/Bg]:Fg?[Dg/Fg,Og/Fg]:Ug?[Rg/Ug,qg/Ug]:[NaN,NaN];return Rg=qg=Ug=Dg=Og=Fg=Ig=Yg=Bg=0,t}};Oi.prototype={_radius:4.5,pointRadius:function(t){return this._radius=t,this},polygonStart:function(){this._line=0},polygonEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){0===this._line&&this._context.closePath(),this._point=NaN},point:function(t,n){switch(this._point){case 0:this._context.moveTo(t,n),this._point=1;break;case 1:this._context.lineTo(t,n);break;default:this._context.moveTo(t+this._radius,n),this._context.arc(t,n,this._radius,0,y_)}},result:mr};var Hg,Xg,Vg,$g,Wg,Zg=qv(),Gg={point:mr,lineStart:function(){Gg.point=Fi},lineEnd:function(){Hg&&Ii(Xg,Vg),Gg.point=mr},polygonStart:function(){Hg=!0},polygonEnd:function(){Hg=null},result:function(){var t=+Zg;return Zg.reset(),t}};Yi.prototype={_circle:Bi(4.5),pointRadius:function(t){return this._circle=Bi(t),this},polygonStart:function(){this._line=0},polygonEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){0===this._line&&this._string.push("Z"),this._point=NaN},point:function(t,n){switch(this._point){case 0:this._string.push("M",t,",",n),this._point=1;break;case 1:this._string.push("L",t,",",n);break;default:this._string.push("M",t,",",n,this._circle)}},result:function(){if(this._string.length){var t=this._string.join("");return this._string=[],t}}};var Jg=function(t,n){function e(t){return t&&("function"==typeof o&&i.pointRadius(+o.apply(this,arguments)),q_(t,r(i))),i.result()}var r,i,o=4.5;return e.area=function(t){return q_(t,r(Eg)),Eg.result()},e.measure=function(t){return q_(t,r(Gg)),Gg.result()},e.bounds=function(t){return q_(t,r(Lg)),Lg.result()},e.centroid=function(t){return q_(t,r(jg)),jg.result()},e.projection=function(n){return arguments.length?(r=null==n?(t=null,kg):(t=n).stream,e):t},e.context=function(t){return arguments.length?(i=null==t?(n=null,new Yi):new Oi(n=t),"function"!=typeof o&&i.pointRadius(o),e):n},e.pointRadius=function(t){return arguments.length?(o="function"==typeof t?t:(i.pointRadius(+t),+t),e):o},e.projection(t).context(n)},Qg=function(t,n,e,r){return function(i,o){function u(n,e){var r=i(n,e);t(n=r[0],e=r[1])&&o.point(n,e)}function a(t,n){var e=i(t,n);_.point(e[0],e[1])}function c(){b.point=a,_.lineStart()}function s(){b.point=u,_.lineEnd()}function f(t,n){v.push([t,n]);var e=i(t,n);m.point(e[0],e[1])}function l(){m.lineStart(),v=[]}function h(){f(v[0][0],v[0][1]),m.lineEnd();var t,n,e,r,i=m.clean(),u=y.result(),a=u.length;if(v.pop(),p.push(v),v=null,a)if(1&i){if(e=u[0],(n=e.length-1)>0){for(x||(o.polygonStart(),x=!0),o.lineStart(),t=0;t<n;++t)o.point((r=e[t])[0],r[1]);o.lineEnd()}}else a>1&&2&i&&u.push(u.pop().concat(u.shift())),d.push(u.filter(ji))}var p,d,v,_=n(o),g=i.invert(r[0],r[1]),y=ug(),m=n(y),x=!1,b={point:u,lineStart:c,lineEnd:s,polygonStart:function(){b.point=f,b.lineStart=l,b.lineEnd=h,d=[],p=[]},polygonEnd:function(){b.point=u,b.lineStart=c,b.lineEnd=s,d=ff(d);var t=dg(p,g);d.length?(x||(o.polygonStart(),x=!0),sg(d,Hi,t,e,o)):t&&(x||(o.polygonStart(),x=!0),o.lineStart(),e(null,null,1,o),o.lineEnd()),x&&(o.polygonEnd(),x=!1),d=p=null},sphere:function(){o.polygonStart(),o.lineStart(),e(null,null,1,o),o.lineEnd(),o.polygonEnd()}};return b}},Kg=Qg(function(){return!0},Xi,$i,[-v_,-__]),ty=function(t,n){function e(e,r,i,o){oi(o,t,n,i,e,r)}function r(t,n){return T_(t)*T_(n)>a}function i(t){var n,e,i,a,f;return{lineStart:function(){a=i=!1,f=1},point:function(l,h){var p,d=[l,h],v=r(l,h),_=c?v?0:u(l,h):v?u(l+(l<0?v_:-v_),h):0;if(!n&&(a=i=v)&&t.lineStart(),v!==i&&(p=o(n,d),(cg(n,p)||cg(d,p))&&(d[0]+=d_,d[1]+=d_,v=r(d[0],d[1]))),v!==i)f=0,v?(t.lineStart(),p=o(d,n),t.point(p[0],p[1])):(p=o(n,d),t.point(p[0],p[1]),t.lineEnd()),n=p;else if(s&&n&&c^v){var g;_&e||!(g=o(d,n,!0))||(f=0,c?(t.lineStart(),t.point(g[0][0],g[0][1]),t.point(g[1][0],g[1][1]),t.lineEnd()):(t.point(g[1][0],g[1][1]),t.lineEnd(),t.lineStart(),t.point(g[0][0],g[0][1])))}!v||n&&cg(n,d)||t.point(d[0],d[1]),n=d,i=v,e=_},lineEnd:function(){i&&t.lineEnd(),n=null},clean:function(){return f|(a&&i)<<1}}}function o(t,n,e){var r=Er(t),i=Er(n),o=[1,0,0],u=Cr(r,i),c=Ar(u,u),s=u[0],f=c-s*s;if(!f)return!e&&t;var l=a*c/f,h=-a*s/f,p=Cr(o,u),d=Pr(o,l);zr(d,Pr(u,h));var v=p,_=Ar(d,v),g=Ar(v,v),y=_*_-g*(Ar(d,d)-1);if(!(y<0)){var m=z_(y),x=Pr(v,(-_-m)/g);if(zr(x,d),x=Nr(x),!e)return x;var b,w=t[0],M=n[0],T=t[1],k=n[1];M<w&&(b=w,w=M,M=b);var S=M-w,N=b_(S-v_)<d_,E=N||S<d_;if(!N&&k<T&&(b=T,T=k,k=b),E?N?T+k>0^x[1]<(b_(x[0]-w)<d_?T:k):T<=x[1]&&x[1]<=k:S>v_^(w<=x[0]&&x[0]<=M)){var A=Pr(v,(-_+m)/g);return zr(A,d),[x,Nr(A)]}}}function u(n,e){var r=c?t:v_-t,i=0;return n<-r?i|=1:n>r&&(i|=2),e<-r?i|=4:e>r&&(i|=8),i}var a=T_(t),c=a>0,s=b_(a)>d_;return Qg(r,i,e,c?[0,-t]:[-v_,t-v_])},ny=function(t){return{stream:Wi(t)}};Zi.prototype={constructor:Zi,point:function(t,n){this.stream.point(t,n)},sphere:function(){this.stream.sphere()},lineStart:function(){this.stream.lineStart()},lineEnd:function(){this.stream.lineEnd()},polygonStart:function(){this.stream.polygonStart()},polygonEnd:function(){this.stream.polygonEnd()}};var ey=16,ry=T_(30*x_),iy=function(t,n){return+n?Ki(t,n):Qi(t)},oy=Wi({point:function(t,n){this.stream.point(t*x_,n*x_)}}),uy=function(){return eo(io).scale(155.424).center([0,33.6442])},ay=function(){return uy().parallels([29.5,45.5]).scale(1070).translate([480,250]).rotate([96,0]).center([-.6,38.7])},cy=function(){function t(t){var n=t[0],e=t[1];return a=null,i.point(n,e),a||(o.point(n,e),a)||(u.point(n,e),a)}function n(){return e=r=null,t}var e,r,i,o,u,a,c=ay(),s=uy().rotate([154,0]).center([-2,58.5]).parallels([55,65]),f=uy().rotate([157,0]).center([-3,19.9]).parallels([8,18]),l={point:function(t,n){a=[t,n]}};return t.invert=function(t){var n=c.scale(),e=c.translate(),r=(t[0]-e[0])/n,i=(t[1]-e[1])/n;return(i>=.12&&i<.234&&r>=-.425&&r<-.214?s:i>=.166&&i<.234&&r>=-.214&&r<-.115?f:c).invert(t)},t.stream=function(t){return e&&r===t?e:e=oo([c.stream(r=t),s.stream(t),f.stream(t)])},t.precision=function(t){return arguments.length?(c.precision(t),s.precision(t),f.precision(t),n()):c.precision()},t.scale=function(n){return arguments.length?(c.scale(n),s.scale(.35*n),f.scale(n),t.translate(c.translate())):c.scale()},t.translate=function(t){if(!arguments.length)return c.translate();var e=c.scale(),r=+t[0],a=+t[1];return i=c.translate(t).clipExtent([[r-.455*e,a-.238*e],[r+.455*e,a+.238*e]]).stream(l),o=s.translate([r-.307*e,a+.201*e]).clipExtent([[r-.425*e+d_,a+.12*e+d_],[r-.214*e-d_,a+.234*e-d_]]).stream(l),u=f.translate([r-.205*e,a+.212*e]).clipExtent([[r-.214*e+d_,a+.166*e+d_],[r-.115*e-d_,a+.234*e-d_]]).stream(l),n()},t.fitExtent=function(n,e){return Gi(t,n,e)},t.fitSize=function(n,e){return Ji(t,n,e)},t.scale(1070)},sy=uo(function(t){return z_(2/(1+t))});sy.invert=ao(function(t){return 2*gr(t/2)});var fy=function(){return to(sy).scale(124.75).clipAngle(179.999)},ly=uo(function(t){return(t=_r(t))&&t/A_(t)});ly.invert=ao(function(t){return t});var hy=function(){return to(ly).scale(79.4188).clipAngle(179.999)};co.invert=function(t,n){return[t,2*w_(S_(n))-__]};var py=function(){return so(co).scale(961/y_)},dy=function(){return eo(lo).scale(109.5).parallels([30,30])};ho.invert=ho;var vy=function(){return to(ho).scale(152.63)},_y=function(){return eo(po).scale(131.154).center([0,13.9389])};vo.invert=ao(w_);var gy=function(){return to(vo).scale(144.049).clipAngle(60)},yy=function(){function t(){return i=o=null,u}var n,e,r,i,o,u,a=1,c=0,s=0,f=1,l=1,h=kg,p=null,d=kg;return u={stream:function(t){return i&&o===t?i:i=h(d(o=t))},clipExtent:function(i){return arguments.length?(d=null==i?(p=n=e=r=null,kg):si(p=+i[0][0],n=+i[0][1],e=+i[1][0],r=+i[1][1]),t()):null==p?null:[[p,n],[e,r]]},scale:function(n){return arguments.length?(h=_o((a=+n)*f,a*l,c,s),t()):a},translate:function(n){return arguments.length?(h=_o(a*f,a*l,c=+n[0],s=+n[1]),t()):[c,s]},reflectX:function(n){return arguments.length?(h=_o(a*(f=n?-1:1),a*l,c,s),t()):f<0},reflectY:function(n){return arguments.length?(h=_o(a*f,a*(l=n?-1:1),c,s),t()):l<0},fitExtent:function(t,n){return Gi(u,t,n)},fitSize:function(t,n){return Ji(u,t,n)}}};go.invert=ao(gr);var my=function(){return to(go).scale(249.5).clipAngle(90+d_)};yo.invert=ao(function(t){return 2*w_(t)});var xy=function(){return to(yo).scale(250).clipAngle(142)};mo.invert=function(t,n){return[-n,2*w_(S_(t))-__]};var by=function(){var t=so(mo),n=t.center,e=t.rotate;return t.center=function(t){return arguments.length?n([-t[1],t[0]]):(t=n(),[t[1],-t[0]])},t.rotate=function(t){return arguments.length?e([t[0],t[1],t.length>2?t[2]+90:90]):(t=e(),[t[0],t[1],t[2]-90])},e([0,0,90]).scale(159.155)},wy=function(){function t(t){var o,u=0;t.eachAfter(function(t){var e=t.children;e?(t.x=bo(e),t.y=Mo(e)):(t.x=o?u+=n(t,o):0,t.y=0,o=t)});var a=ko(t),c=So(t),s=a.x-n(a,c)/2,f=c.x+n(c,a)/2;return t.eachAfter(i?function(n){n.x=(n.x-t.x)*e,n.y=(t.y-n.y)*r}:function(n){n.x=(n.x-s)/(f-s)*e,n.y=(1-(t.y?n.y/t.y:1))*r})}var n=xo,e=1,r=1,i=!1;return t.separation=function(e){return arguments.length?(n=e,t):n},t.size=function(n){return arguments.length?(i=!1,e=+n[0],r=+n[1],t):i?null:[e,r]},t.nodeSize=function(n){return arguments.length?(i=!0,e=+n[0],r=+n[1],t):i?[e,r]:null},t},My=function(){return this.eachAfter(No)},Ty=function(t){var n,e,r,i,o=this,u=[o];do{for(n=u.reverse(),u=[];o=n.pop();)if(t(o),e=o.children)for(r=0,i=e.length;r<i;++r)u.push(e[r])}while(u.length);return this},ky=function(t){for(var n,e,r=this,i=[r];r=i.pop();)if(t(r),n=r.children)for(e=n.length-1;e>=0;--e)i.push(n[e]);return this},Sy=function(t){for(var n,e,r,i=this,o=[i],u=[];i=o.pop();)if(u.push(i),n=i.children)for(e=0,r=n.length;e<r;++e)o.push(n[e]);for(;i=u.pop();)t(i);return this},Ny=function(t){return this.eachAfter(function(n){for(var e=+t(n.data)||0,r=n.children,i=r&&r.length;--i>=0;)e+=r[i].value;n.value=e})},Ey=function(t){return this.eachBefore(function(n){n.children&&n.children.sort(t)})},Ay=function(t){for(var n=this,e=Eo(n,t),r=[n];n!==e;)n=n.parent,r.push(n);for(var i=r.length;t!==e;)r.splice(i,0,t),t=t.parent;return r},Cy=function(){for(var t=this,n=[t];t=t.parent;)n.push(t);return n},zy=function(){var t=[];return this.each(function(n){t.push(n)}),t},Py=function(){var t=[];return this.eachBefore(function(n){n.children||t.push(n)}),t},Ly=function(){var t=this,n=[];return t.each(function(e){e!==t&&n.push({source:e.parent,target:e})}),n};Ro.prototype=Ao.prototype={constructor:Ro,count:My,each:Ty,eachAfter:Sy,eachBefore:ky,sum:Ny,sort:Ey,path:Ay,ancestors:Cy,descendants:zy,leaves:Py,links:Ly,copy:Co};var Ry=function(t){for(var n=(t=t.slice()).length,e=null,r=e;n;){var i=new qo(t[n-1]);r=r?r.next=i:e=i,t[void 0]=t[--n]}return{head:e,tail:r}},qy=function(t){return Do(Ry(t),[])},Uy=function(t){return Xo(t),t},Dy=function(t){return function(){return t}},Oy=function(){function t(t){return t.x=e/2,t.y=r/2,n?t.eachBefore(Go(n)).eachAfter(Jo(i,.5)).eachBefore(Qo(1)):t.eachBefore(Go(Zo)).eachAfter(Jo(Wo,1)).eachAfter(Jo(i,t.r/Math.min(e,r))).eachBefore(Qo(Math.min(e,r)/(2*t.r))),t}var n=null,e=1,r=1,i=Wo;return t.radius=function(e){return arguments.length?(n=Vo(e),t):n},t.size=function(n){return arguments.length?(e=+n[0],r=+n[1],t):[e,r]},t.padding=function(n){return arguments.length?(i="function"==typeof n?n:Dy(+n),t):i},t},Fy=function(t){t.x0=Math.round(t.x0),t.y0=Math.round(t.y0),t.x1=Math.round(t.x1),t.y1=Math.round(t.y1)},Iy=function(t,n,e,r,i){for(var o,u=t.children,a=-1,c=u.length,s=t.value&&(r-n)/t.value;++a<c;)o=u[a],o.y0=e,o.y1=i,o.x0=n,o.x1=n+=o.value*s},Yy=function(){function t(t){var u=t.height+1;return t.x0=t.y0=i,t.x1=e,t.y1=r/u,t.eachBefore(n(r,u)),o&&t.eachBefore(Fy),t}function n(t,n){return function(e){e.children&&Iy(e,e.x0,t*(e.depth+1)/n,e.x1,t*(e.depth+2)/n);var r=e.x0,o=e.y0,u=e.x1-i,a=e.y1-i;u<r&&(r=u=(r+u)/2),a<o&&(o=a=(o+a)/2),e.x0=r,e.y0=o,e.x1=u,e.y1=a}}var e=1,r=1,i=0,o=!1;return t.round=function(n){return arguments.length?(o=!!n,t):o},t.size=function(n){return arguments.length?(e=+n[0],r=+n[1],t):[e,r]},t.padding=function(n){return arguments.length?(i=+n,t):i},t},By="$",jy={depth:-1},Hy={},Xy=function(){function t(t){var r,i,o,u,a,c,s,f=t.length,l=new Array(f),h={};for(i=0;i<f;++i)r=t[i],a=l[i]=new Ro(r),null!=(c=n(r,i,t))&&(c+="")&&(s=By+(a.id=c),h[s]=s in h?Hy:a);for(i=0;i<f;++i)if(a=l[i],null!=(c=e(t[i],i,t))&&(c+="")){if(!(u=h[By+c]))throw new Error("missing: "+c);if(u===Hy)throw new Error("ambiguous: "+c);u.children?u.children.push(a):u.children=[a],a.parent=u}else{if(o)throw new Error("multiple roots");o=a}if(!o)throw new Error("no root");if(o.parent=jy,o.eachBefore(function(t){t.depth=t.parent.depth+1,--f}).eachBefore(Lo),o.parent=null,f>0)throw new Error("cycle");return o}var n=Ko,e=tu;return t.id=function(e){return arguments.length?(n=$o(e),t):n},t.parentId=function(n){return arguments.length?(e=$o(n),t):e},t};au.prototype=Object.create(Ro.prototype);var Vy=function(){function t(t){var r=cu(t);if(r.eachAfter(n),r.parent.m=-r.z,r.eachBefore(e),c)t.eachBefore(i);else{var s=t,f=t,l=t;t.eachBefore(function(t){t.x<s.x&&(s=t),t.x>f.x&&(f=t),t.depth>l.depth&&(l=t)});var h=s===f?1:o(s,f)/2,p=h-s.x,d=u/(f.x+h+p),v=a/(l.depth||1);t.eachBefore(function(t){t.x=(t.x+p)*d,t.y=t.depth*v})}return t}function n(t){var n=t.children,e=t.parent.children,i=t.i?e[t.i-1]:null;if(n){ou(t);var u=(n[0].z+n[n.length-1].z)/2;i?(t.z=i.z+o(t._,i._),t.m=t.z-u):t.z=u}else i&&(t.z=i.z+o(t._,i._));t.parent.A=r(t,i,t.parent.A||e[0])}function e(t){t._.x=t.z+t.parent.m,t.m+=t.parent.m}function r(t,n,e){if(n){for(var r,i=t,u=t,a=n,c=i.parent.children[0],s=i.m,f=u.m,l=a.m,h=c.m;a=ru(a),i=eu(i),a&&i;)c=eu(c),u=ru(u),u.a=t,r=a.z+l-i.z-s+o(a._,i._),r>0&&(iu(uu(a,t,e),t,r),s+=r,f+=r),l+=a.m,s+=i.m,h+=c.m,f+=u.m;a&&!ru(u)&&(u.t=a,u.m+=l-f),i&&!eu(c)&&(c.t=i,c.m+=s-h,e=t)}return e}function i(t){t.x*=u,t.y=t.depth*a}var o=nu,u=1,a=1,c=null;return t.separation=function(n){return arguments.length?(o=n,t):o},t.size=function(n){return arguments.length?(c=!1,u=+n[0],a=+n[1],t):c?null:[u,a]},t.nodeSize=function(n){return arguments.length?(c=!0,u=+n[0],a=+n[1],t):c?[u,a]:null},t},$y=function(t,n,e,r,i){for(var o,u=t.children,a=-1,c=u.length,s=t.value&&(i-e)/t.value;++a<c;)o=u[a],o.x0=n,o.x1=r,o.y0=e,o.y1=e+=o.value*s},Wy=(1+Math.sqrt(5))/2,Zy=function t(n){function e(t,e,r,i,o){su(n,t,e,r,i,o)}return e.ratio=function(n){return t((n=+n)>1?n:1)},e}(Wy),Gy=function(){function t(t){return t.x0=t.y0=0,t.x1=i,t.y1=o,t.eachBefore(n),u=[0],r&&t.eachBefore(Fy),t}function n(t){var n=u[t.depth],r=t.x0+n,i=t.y0+n,o=t.x1-n,h=t.y1-n;o<r&&(r=o=(r+o)/2),h<i&&(i=h=(i+h)/2),t.x0=r,t.y0=i,t.x1=o,t.y1=h,t.children&&(n=u[t.depth+1]=a(t)/2,r+=l(t)-n,i+=c(t)-n,o-=s(t)-n,h-=f(t)-n,o<r&&(r=o=(r+o)/2),h<i&&(i=h=(i+h)/2),e(t,r,i,o,h))}var e=Zy,r=!1,i=1,o=1,u=[0],a=Wo,c=Wo,s=Wo,f=Wo,l=Wo;return t.round=function(n){return arguments.length?(r=!!n,t):r},t.size=function(n){return arguments.length?(i=+n[0],o=+n[1],t):[i,o]},t.tile=function(n){return arguments.length?(e=$o(n),t):e},t.padding=function(n){return arguments.length?t.paddingInner(n).paddingOuter(n):t.paddingInner()},t.paddingInner=function(n){return arguments.length?(a="function"==typeof n?n:Dy(+n),t):a},t.paddingOuter=function(n){return arguments.length?t.paddingTop(n).paddingRight(n).paddingBottom(n).paddingLeft(n):t.paddingTop()},t.paddingTop=function(n){return arguments.length?(c="function"==typeof n?n:Dy(+n),t):c},t.paddingRight=function(n){return arguments.length?(s="function"==typeof n?n:Dy(+n),t):s},t.paddingBottom=function(n){return arguments.length?(f="function"==typeof n?n:Dy(+n),t):f},t.paddingLeft=function(n){return arguments.length?(l="function"==typeof n?n:Dy(+n),t):l},t},Jy=function(t,n,e,r,i){function o(t,n,e,r,i,u,a){if(t>=n-1){var s=c[t];return s.x0=r,s.y0=i,s.x1=u,s.y1=a,void 0}for(var l=f[t],h=e/2+l,p=t+1,d=n-1;p<d;){var v=p+d>>>1;f[v]<h?p=v+1:d=v}h-f[p-1]<f[p]-h&&t+1<p&&--p;var _=f[p]-l,g=e-_;if(u-r>a-i){var y=(r*g+u*_)/e;o(t,p,_,r,i,y,a),o(p,n,g,y,i,u,a)}else{var m=(i*g+a*_)/e;o(t,p,_,r,i,u,m),o(p,n,g,r,m,u,a)}}var u,a,c=t.children,s=c.length,f=new Array(s+1);for(f[0]=a=u=0;u<s;++u)f[u+1]=a+=c[u].value;o(0,s,t.value,n,e,r,i)},Qy=function(t,n,e,r,i){(1&t.depth?$y:Iy)(t,n,e,r,i)},Ky=function t(n){function e(t,e,r,i,o){if((u=t._squarify)&&u.ratio===n)for(var u,a,c,s,f,l=-1,h=u.length,p=t.value;++l<h;){for(a=u[l],c=a.children,s=a.value=0,f=c.length;s<f;++s)a.value+=c[s].value;a.dice?Iy(a,e,r,i,r+=(o-r)*a.value/p):$y(a,e,r,e+=(i-e)*a.value/p,o),p-=a.value}else t._squarify=u=su(n,t,e,r,i,o),u.ratio=n}return e.ratio=function(n){return t((n=+n)>1?n:1)},e
}(Wy),tm=function(t){for(var n,e=-1,r=t.length,i=t[r-1],o=0;++e<r;)n=i,i=t[e],o+=n[1]*i[0]-n[0]*i[1];return o/2},nm=function(t){for(var n,e,r=-1,i=t.length,o=0,u=0,a=t[i-1],c=0;++r<i;)n=a,a=t[r],c+=e=n[0]*a[1]-a[0]*n[1],o+=(n[0]+a[0])*e,u+=(n[1]+a[1])*e;return c*=3,[o/c,u/c]},em=function(t,n,e){return(n[0]-t[0])*(e[1]-t[1])-(n[1]-t[1])*(e[0]-t[0])},rm=function(t){if((e=t.length)<3)return null;var n,e,r=new Array(e),i=new Array(e);for(n=0;n<e;++n)r[n]=[+t[n][0],+t[n][1],n];for(r.sort(fu),n=0;n<e;++n)i[n]=[r[n][0],-r[n][1]];var o=lu(r),u=lu(i),a=u[0]===o[0],c=u[u.length-1]===o[o.length-1],s=[];for(n=o.length-1;n>=0;--n)s.push(t[r[o[n]][2]]);for(n=+a;n<u.length-c;++n)s.push(t[r[u[n]][2]]);return s},im=function(t,n){for(var e,r,i=t.length,o=t[i-1],u=n[0],a=n[1],c=o[0],s=o[1],f=!1,l=0;l<i;++l)o=t[l],e=o[0],r=o[1],r>a!=s>a&&u<(c-e)*(a-r)/(s-r)+e&&(f=!f),c=e,s=r;return f},om=function(t){for(var n,e,r=-1,i=t.length,o=t[i-1],u=o[0],a=o[1],c=0;++r<i;)n=u,e=a,o=t[r],u=o[0],a=o[1],n-=u,e-=a,c+=Math.sqrt(n*n+e*e);return c},um=[].slice,am={};hu.prototype=yu.prototype={constructor:hu,defer:function(t){if("function"!=typeof t||this._call)throw new Error;if(null!=this._error)return this;var n=um.call(arguments,1);return n.push(t),++this._waiting,this._tasks.push(n),pu(this),this},abort:function(){return null==this._error&&_u(this,new Error("abort")),this},await:function(t){if("function"!=typeof t||this._call)throw new Error;return this._call=function(n,e){t.apply(null,[n].concat(e))},gu(this),this},awaitAll:function(t){if("function"!=typeof t||this._call)throw new Error;return this._call=t,gu(this),this}};var cm=function(t,n){return t=null==t?0:+t,n=null==n?1:+n,1===arguments.length?(n=t,t=0):n-=t,function(){return Math.random()*n+t}},sm=function(t,n){var e,r;return t=null==t?0:+t,n=null==n?1:+n,function(){var i;if(null!=e)i=e,e=null;else do{e=2*Math.random()-1,i=2*Math.random()-1,r=e*e+i*i}while(!r||r>1);return t+n*i*Math.sqrt(-2*Math.log(r)/r)}},fm=function(){var t=sm.apply(this,arguments);return function(){return Math.exp(t())}},lm=function(t){return function(){for(var n=0,e=0;e<t;++e)n+=Math.random();return n}},hm=function(t){var n=lm(t);return function(){return n()/t}},pm=function(t){return function(){return-Math.log(1-Math.random())/t}},dm=function(t,n){function e(t){var n,e=s.status;if(!e&&xu(s)||e>=200&&e<300||304===e){if(o)try{n=o.call(r,s)}catch(t){return void a.call("error",r,t)}else n=s;a.call("load",r,n)}else a.call("error",r,t)}var r,i,o,u,a=d("beforesend","progress","load","error"),c=Ye(),s=new XMLHttpRequest,f=null,l=null,h=0;if("undefined"==typeof XDomainRequest||"withCredentials"in s||!/^(http(s)?:)?\/\//.test(t)||(s=new XDomainRequest),"onload"in s?s.onload=s.onerror=s.ontimeout=e:s.onreadystatechange=function(t){s.readyState>3&&e(t)},s.onprogress=function(t){a.call("progress",r,t)},r={header:function(t,n){return t=(t+"").toLowerCase(),arguments.length<2?c.get(t):(null==n?c.remove(t):c.set(t,n+""),r)},mimeType:function(t){return arguments.length?(i=null==t?null:t+"",r):i},responseType:function(t){return arguments.length?(u=t,r):u},timeout:function(t){return arguments.length?(h=+t,r):h},user:function(t){return arguments.length<1?f:(f=null==t?null:t+"",r)},password:function(t){return arguments.length<1?l:(l=null==t?null:t+"",r)},response:function(t){return o=t,r},get:function(t,n){return r.send("GET",t,n)},post:function(t,n){return r.send("POST",t,n)},send:function(n,e,o){return s.open(n,t,!0,f,l),null==i||c.has("accept")||c.set("accept",i+",*/*"),s.setRequestHeader&&c.each(function(t,n){s.setRequestHeader(n,t)}),null!=i&&s.overrideMimeType&&s.overrideMimeType(i),null!=u&&(s.responseType=u),h>0&&(s.timeout=h),null==o&&"function"==typeof e&&(o=e,e=null),null!=o&&1===o.length&&(o=mu(o)),null!=o&&r.on("error",o).on("load",function(t){o(null,t)}),a.call("beforesend",r,s),s.send(null==e?null:e),r},abort:function(){return s.abort(),r},on:function(){var t=a.on.apply(a,arguments);return t===a?r:t}},null!=n){if("function"!=typeof n)throw new Error("invalid callback: "+n);return r.get(n)}return r},vm=function(t,n){return function(e,r){var i=dm(e).mimeType(t).response(n);if(null!=r){if("function"!=typeof r)throw new Error("invalid callback: "+r);return i.get(r)}return i}},_m=vm("text/html",function(t){return document.createRange().createContextualFragment(t.responseText)}),gm=vm("application/json",function(t){return JSON.parse(t.responseText)}),ym=vm("text/plain",function(t){return t.responseText}),mm=vm("application/xml",function(t){var n=t.responseXML;if(!n)throw new Error("parse error");return n}),xm=function(t,n){return function(e,r,i){arguments.length<3&&(i=r,r=null);var o=dm(e).mimeType(t);return o.row=function(t){return arguments.length?o.response(bu(n,r=t)):r},o.row(r),i?o.get(i):o}},bm=xm("text/csv",Od),wm=xm("text/tab-separated-values",jd),Mm=Array.prototype,Tm=Mm.map,km=Mm.slice,Sm={name:"implicit"},Nm=function(t){return function(){return t}},Em=function(t){return+t},Am=[0,1],Cm=function(n,e,i){var o,u=n[0],a=n[n.length-1],c=r(u,a,null==e?10:e);switch(i=lr(null==i?",f":i),i.type){case"s":var s=Math.max(Math.abs(u),Math.abs(a));return null!=i.precision||isNaN(o=Lv(c,s))||(i.precision=o),t.formatPrefix(i,s);case"":case"e":case"g":case"p":case"r":null!=i.precision||isNaN(o=Rv(c,Math.max(Math.abs(u),Math.abs(a))))||(i.precision=o-("e"===i.type));break;case"f":case"%":null!=i.precision||isNaN(o=Pv(c))||(i.precision=o-2*("%"===i.type))}return t.format(i)},zm=function(t,n){t=t.slice();var e,r=0,i=t.length-1,o=t[r],u=t[i];return u<o&&(e=r,r=i,i=e,e=o,o=u,u=e),t[r]=n.floor(o),t[i]=n.ceil(u),t},Pm=new Date,Lm=new Date,Rm=Zu(function(){},function(t,n){t.setTime(+t+n)},function(t,n){return n-t});Rm.every=function(t){return t=Math.floor(t),isFinite(t)&&t>0?t>1?Zu(function(n){n.setTime(Math.floor(n/t)*t)},function(n,e){n.setTime(+n+e*t)},function(n,e){return(e-n)/t}):Rm:null};var qm=Rm.range,Um=6e4,Dm=6048e5,Om=Zu(function(t){t.setTime(1e3*Math.floor(t/1e3))},function(t,n){t.setTime(+t+1e3*n)},function(t,n){return(n-t)/1e3},function(t){return t.getUTCSeconds()}),Fm=Om.range,Im=Zu(function(t){t.setTime(Math.floor(t/Um)*Um)},function(t,n){t.setTime(+t+n*Um)},function(t,n){return(n-t)/Um},function(t){return t.getMinutes()}),Ym=Im.range,Bm=Zu(function(t){var n=t.getTimezoneOffset()*Um%36e5;n<0&&(n+=36e5),t.setTime(36e5*Math.floor((+t-n)/36e5)+n)},function(t,n){t.setTime(+t+36e5*n)},function(t,n){return(n-t)/36e5},function(t){return t.getHours()}),jm=Bm.range,Hm=Zu(function(t){t.setHours(0,0,0,0)},function(t,n){t.setDate(t.getDate()+n)},function(t,n){return(n-t-(n.getTimezoneOffset()-t.getTimezoneOffset())*Um)/864e5},function(t){return t.getDate()-1}),Xm=Hm.range,Vm=Gu(0),$m=Gu(1),Wm=Gu(2),Zm=Gu(3),Gm=Gu(4),Jm=Gu(5),Qm=Gu(6),Km=Vm.range,tx=$m.range,nx=Wm.range,ex=Zm.range,rx=Gm.range,ix=Jm.range,ox=Qm.range,ux=Zu(function(t){t.setDate(1),t.setHours(0,0,0,0)},function(t,n){t.setMonth(t.getMonth()+n)},function(t,n){return n.getMonth()-t.getMonth()+12*(n.getFullYear()-t.getFullYear())},function(t){return t.getMonth()}),ax=ux.range,cx=Zu(function(t){t.setMonth(0,1),t.setHours(0,0,0,0)},function(t,n){t.setFullYear(t.getFullYear()+n)},function(t,n){return n.getFullYear()-t.getFullYear()},function(t){return t.getFullYear()});cx.every=function(t){return isFinite(t=Math.floor(t))&&t>0?Zu(function(n){n.setFullYear(Math.floor(n.getFullYear()/t)*t),n.setMonth(0,1),n.setHours(0,0,0,0)},function(n,e){n.setFullYear(n.getFullYear()+e*t)}):null};var sx=cx.range,fx=Zu(function(t){t.setUTCSeconds(0,0)},function(t,n){t.setTime(+t+n*Um)},function(t,n){return(n-t)/Um},function(t){return t.getUTCMinutes()}),lx=fx.range,hx=Zu(function(t){t.setUTCMinutes(0,0,0)},function(t,n){t.setTime(+t+36e5*n)},function(t,n){return(n-t)/36e5},function(t){return t.getUTCHours()}),px=hx.range,dx=Zu(function(t){t.setUTCHours(0,0,0,0)},function(t,n){t.setUTCDate(t.getUTCDate()+n)},function(t,n){return(n-t)/864e5},function(t){return t.getUTCDate()-1}),vx=dx.range,_x=Ju(0),gx=Ju(1),yx=Ju(2),mx=Ju(3),xx=Ju(4),bx=Ju(5),wx=Ju(6),Mx=_x.range,Tx=gx.range,kx=yx.range,Sx=mx.range,Nx=xx.range,Ex=bx.range,Ax=wx.range,Cx=Zu(function(t){t.setUTCDate(1),t.setUTCHours(0,0,0,0)},function(t,n){t.setUTCMonth(t.getUTCMonth()+n)},function(t,n){return n.getUTCMonth()-t.getUTCMonth()+12*(n.getUTCFullYear()-t.getUTCFullYear())},function(t){return t.getUTCMonth()}),zx=Cx.range,Px=Zu(function(t){t.setUTCMonth(0,1),t.setUTCHours(0,0,0,0)},function(t,n){t.setUTCFullYear(t.getUTCFullYear()+n)},function(t,n){return n.getUTCFullYear()-t.getUTCFullYear()},function(t){return t.getUTCFullYear()});Px.every=function(t){return isFinite(t=Math.floor(t))&&t>0?Zu(function(n){n.setUTCFullYear(Math.floor(n.getUTCFullYear()/t)*t),n.setUTCMonth(0,1),n.setUTCHours(0,0,0,0)},function(n,e){n.setUTCFullYear(n.getUTCFullYear()+e*t)}):null};var Lx,Rx=Px.range,qx={"-":"",_:" ",0:"0"},Ux=/^\s*\d+/,Dx=/^%/,Ox=/[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;Za({dateTime:"%x, %X",date:"%-m/%-d/%Y",time:"%-I:%M:%S %p",periods:["AM","PM"],days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]});var Fx=Date.prototype.toISOString?Ga:t.utcFormat("%Y-%m-%dT%H:%M:%S.%LZ"),Ix=+new Date("2000-01-01T00:00:00.000Z")?Ja:t.utcParse("%Y-%m-%dT%H:%M:%S.%LZ"),Yx=1e3,Bx=60*Yx,jx=60*Bx,Hx=24*jx,Xx=7*Hx,Vx=30*Hx,$x=365*Hx,Wx=function(){return tc(cx,ux,Vm,Hm,Bm,Im,Om,Rm,t.timeFormat).domain([new Date(2e3,0,1),new Date(2e3,0,2)])},Zx=function(){return tc(Px,Cx,_x,dx,hx,fx,Om,Rm,t.utcFormat).domain([Date.UTC(2e3,0,1),Date.UTC(2e3,0,2)])},Gx=function(t){return t.match(/.{6}/g).map(function(t){return"#"+t})},Jx=Gx("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf"),Qx=Gx("393b795254a36b6ecf9c9ede6379398ca252b5cf6bcedb9c8c6d31bd9e39e7ba52e7cb94843c39ad494ad6616be7969c7b4173a55194ce6dbdde9ed6"),Kx=Gx("3182bd6baed69ecae1c6dbefe6550dfd8d3cfdae6bfdd0a231a35474c476a1d99bc7e9c0756bb19e9ac8bcbddcdadaeb636363969696bdbdbdd9d9d9"),tb=Gx("1f77b4aec7e8ff7f0effbb782ca02c98df8ad62728ff98969467bdc5b0d58c564bc49c94e377c2f7b6d27f7f7fc7c7c7bcbd22dbdb8d17becf9edae5"),nb=Oh(Vt(300,.5,0),Vt(-240,.5,1)),eb=Oh(Vt(-100,.75,.35),Vt(80,1.5,.8)),rb=Oh(Vt(260,.75,.35),Vt(80,1.5,.8)),ib=Vt(),ob=function(t){(t<0||t>1)&&(t-=Math.floor(t));var n=Math.abs(t-.5);return ib.h=360*t-100,ib.s=1.5-1.5*n,ib.l=.8-.9*n,ib+""},ub=nc(Gx("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725")),ab=nc(Gx("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf")),cb=nc(Gx("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4")),sb=nc(Gx("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921")),fb=function(t){return function(){return t}},lb=Math.abs,hb=Math.atan2,pb=Math.cos,db=Math.max,vb=Math.min,_b=Math.sin,gb=Math.sqrt,yb=1e-12,mb=Math.PI,xb=mb/2,bb=2*mb,wb=function(){function t(){var t,s,f=+n.apply(this,arguments),l=+e.apply(this,arguments),h=o.apply(this,arguments)-xb,p=u.apply(this,arguments)-xb,d=lb(p-h),v=p>h;if(c||(c=t=Re()),l<f&&(s=l,l=f,f=s),l>yb)if(d>bb-yb)c.moveTo(l*pb(h),l*_b(h)),c.arc(0,0,l,h,p,!v),f>yb&&(c.moveTo(f*pb(p),f*_b(p)),c.arc(0,0,f,p,h,v));else{var _,g,y=h,m=p,x=h,b=p,w=d,M=d,T=a.apply(this,arguments)/2,k=T>yb&&(i?+i.apply(this,arguments):gb(f*f+l*l)),S=vb(lb(l-f)/2,+r.apply(this,arguments)),N=S,E=S;if(k>yb){var A=ic(k/f*_b(T)),C=ic(k/l*_b(T));(w-=2*A)>yb?(A*=v?1:-1,x+=A,b-=A):(w=0,x=b=(h+p)/2),(M-=2*C)>yb?(C*=v?1:-1,y+=C,m-=C):(M=0,y=m=(h+p)/2)}var z=l*pb(y),P=l*_b(y),L=f*pb(b),R=f*_b(b);if(S>yb){var q=l*pb(m),U=l*_b(m),D=f*pb(x),O=f*_b(x);if(d<mb){var F=w>yb?fc(z,P,D,O,q,U,L,R):[L,R],I=z-F[0],Y=P-F[1],B=q-F[0],j=U-F[1],H=1/_b(rc((I*B+Y*j)/(gb(I*I+Y*Y)*gb(B*B+j*j)))/2),X=gb(F[0]*F[0]+F[1]*F[1]);N=vb(S,(f-X)/(H-1)),E=vb(S,(l-X)/(H+1))}}M>yb?E>yb?(_=lc(D,O,z,P,l,E,v),g=lc(q,U,L,R,l,E,v),c.moveTo(_.cx+_.x01,_.cy+_.y01),E<S?c.arc(_.cx,_.cy,E,hb(_.y01,_.x01),hb(g.y01,g.x01),!v):(c.arc(_.cx,_.cy,E,hb(_.y01,_.x01),hb(_.y11,_.x11),!v),c.arc(0,0,l,hb(_.cy+_.y11,_.cx+_.x11),hb(g.cy+g.y11,g.cx+g.x11),!v),c.arc(g.cx,g.cy,E,hb(g.y11,g.x11),hb(g.y01,g.x01),!v))):(c.moveTo(z,P),c.arc(0,0,l,y,m,!v)):c.moveTo(z,P),f>yb&&w>yb?N>yb?(_=lc(L,R,q,U,f,-N,v),g=lc(z,P,D,O,f,-N,v),c.lineTo(_.cx+_.x01,_.cy+_.y01),N<S?c.arc(_.cx,_.cy,N,hb(_.y01,_.x01),hb(g.y01,g.x01),!v):(c.arc(_.cx,_.cy,N,hb(_.y01,_.x01),hb(_.y11,_.x11),!v),c.arc(0,0,f,hb(_.cy+_.y11,_.cx+_.x11),hb(g.cy+g.y11,g.cx+g.x11),v),c.arc(g.cx,g.cy,N,hb(g.y11,g.x11),hb(g.y01,g.x01),!v))):c.arc(0,0,f,b,x,v):c.lineTo(L,R)}else c.moveTo(0,0);if(c.closePath(),t)return c=null,t+""||null}var n=oc,e=uc,r=fb(0),i=null,o=ac,u=cc,a=sc,c=null;return t.centroid=function(){var t=(+n.apply(this,arguments)+ +e.apply(this,arguments))/2,r=(+o.apply(this,arguments)+ +u.apply(this,arguments))/2-mb/2;return[pb(r)*t,_b(r)*t]},t.innerRadius=function(e){return arguments.length?(n="function"==typeof e?e:fb(+e),t):n},t.outerRadius=function(n){return arguments.length?(e="function"==typeof n?n:fb(+n),t):e},t.cornerRadius=function(n){return arguments.length?(r="function"==typeof n?n:fb(+n),t):r},t.padRadius=function(n){return arguments.length?(i=null==n?null:"function"==typeof n?n:fb(+n),t):i},t.startAngle=function(n){return arguments.length?(o="function"==typeof n?n:fb(+n),t):o},t.endAngle=function(n){return arguments.length?(u="function"==typeof n?n:fb(+n),t):u},t.padAngle=function(n){return arguments.length?(a="function"==typeof n?n:fb(+n),t):a},t.context=function(n){return arguments.length?(c=null==n?null:n,t):c},t};hc.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2;default:this._context.lineTo(t,n)}}};var Mb=function(t){return new hc(t)},Tb=function(){function t(t){var a,c,s,f=t.length,l=!1;for(null==i&&(u=o(s=Re())),a=0;a<=f;++a)!(a<f&&r(c=t[a],a,t))===l&&((l=!l)?u.lineStart():u.lineEnd()),l&&u.point(+n(c,a,t),+e(c,a,t));if(s)return u=null,s+""||null}var n=pc,e=dc,r=fb(!0),i=null,o=Mb,u=null;return t.x=function(e){return arguments.length?(n="function"==typeof e?e:fb(+e),t):n},t.y=function(n){return arguments.length?(e="function"==typeof n?n:fb(+n),t):e},t.defined=function(n){return arguments.length?(r="function"==typeof n?n:fb(!!n),t):r},t.curve=function(n){return arguments.length?(o=n,null!=i&&(u=o(i)),t):o},t.context=function(n){return arguments.length?(null==n?i=u=null:u=o(i=n),t):i},t},kb=function(){function t(t){var n,f,l,h,p,d=t.length,v=!1,_=new Array(d),g=new Array(d);for(null==a&&(s=c(p=Re())),n=0;n<=d;++n){if(!(n<d&&u(h=t[n],n,t))===v)if(v=!v)f=n,s.areaStart(),s.lineStart();else{for(s.lineEnd(),s.lineStart(),l=n-1;l>=f;--l)s.point(_[l],g[l]);s.lineEnd(),s.areaEnd()}v&&(_[n]=+e(h,n,t),g[n]=+i(h,n,t),s.point(r?+r(h,n,t):_[n],o?+o(h,n,t):g[n]))}if(p)return s=null,p+""||null}function n(){return Tb().defined(u).curve(c).context(a)}var e=pc,r=null,i=fb(0),o=dc,u=fb(!0),a=null,c=Mb,s=null;return t.x=function(n){return arguments.length?(e="function"==typeof n?n:fb(+n),r=null,t):e},t.x0=function(n){return arguments.length?(e="function"==typeof n?n:fb(+n),t):e},t.x1=function(n){return arguments.length?(r=null==n?null:"function"==typeof n?n:fb(+n),t):r},t.y=function(n){return arguments.length?(i="function"==typeof n?n:fb(+n),o=null,t):i},t.y0=function(n){return arguments.length?(i="function"==typeof n?n:fb(+n),t):i},t.y1=function(n){return arguments.length?(o=null==n?null:"function"==typeof n?n:fb(+n),t):o},t.lineX0=t.lineY0=function(){return n().x(e).y(i)},t.lineY1=function(){return n().x(e).y(o)},t.lineX1=function(){return n().x(r).y(i)},t.defined=function(n){return arguments.length?(u="function"==typeof n?n:fb(!!n),t):u},t.curve=function(n){return arguments.length?(c=n,null!=a&&(s=c(a)),t):c},t.context=function(n){return arguments.length?(null==n?a=s=null:s=c(a=n),t):a},t},Sb=function(t,n){return n<t?-1:n>t?1:n>=t?0:NaN},Nb=function(t){return t},Eb=function(){function t(t){var a,c,s,f,l,h=t.length,p=0,d=new Array(h),v=new Array(h),_=+i.apply(this,arguments),g=Math.min(bb,Math.max(-bb,o.apply(this,arguments)-_)),y=Math.min(Math.abs(g)/h,u.apply(this,arguments)),m=y*(g<0?-1:1);for(a=0;a<h;++a)(l=v[d[a]=a]=+n(t[a],a,t))>0&&(p+=l);for(null!=e?d.sort(function(t,n){return e(v[t],v[n])}):null!=r&&d.sort(function(n,e){return r(t[n],t[e])}),a=0,s=p?(g-h*m)/p:0;a<h;++a,_=f)c=d[a],l=v[c],f=_+(l>0?l*s:0)+m,v[c]={data:t[c],index:a,value:l,startAngle:_,endAngle:f,padAngle:y};return v}var n=Nb,e=Sb,r=null,i=fb(0),o=fb(bb),u=fb(0);return t.value=function(e){return arguments.length?(n="function"==typeof e?e:fb(+e),t):n},t.sortValues=function(n){return arguments.length?(e=n,r=null,t):e},t.sort=function(n){return arguments.length?(r=n,e=null,t):r},t.startAngle=function(n){return arguments.length?(i="function"==typeof n?n:fb(+n),t):i},t.endAngle=function(n){return arguments.length?(o="function"==typeof n?n:fb(+n),t):o},t.padAngle=function(n){return arguments.length?(u="function"==typeof n?n:fb(+n),t):u},t},Ab=_c(Mb);vc.prototype={areaStart:function(){this._curve.areaStart()},areaEnd:function(){this._curve.areaEnd()},lineStart:function(){this._curve.lineStart()},lineEnd:function(){this._curve.lineEnd()},point:function(t,n){this._curve.point(n*Math.sin(t),n*-Math.cos(t))}};var Cb=function(){return gc(Tb().curve(Ab))},zb=function(){var t=kb().curve(Ab),n=t.curve,e=t.lineX0,r=t.lineX1,i=t.lineY0,o=t.lineY1;return t.angle=t.x,delete t.x,t.startAngle=t.x0,delete t.x0,t.endAngle=t.x1,delete t.x1,t.radius=t.y,delete t.y,t.innerRadius=t.y0,delete t.y0,t.outerRadius=t.y1,delete t.y1,t.lineStartAngle=function(){return gc(e())},delete t.lineX0,t.lineEndAngle=function(){return gc(r())},delete t.lineX1,t.lineInnerRadius=function(){return gc(i())},delete t.lineY0,t.lineOuterRadius=function(){return gc(o())},delete t.lineY1,t.curve=function(t){return arguments.length?n(_c(t)):n()._curve},t},Pb={draw:function(t,n){var e=Math.sqrt(n/mb);t.moveTo(e,0),t.arc(0,0,e,0,bb)}},Lb={draw:function(t,n){var e=Math.sqrt(n/5)/2;t.moveTo(-3*e,-e),t.lineTo(-e,-e),t.lineTo(-e,-3*e),t.lineTo(e,-3*e),t.lineTo(e,-e),t.lineTo(3*e,-e),t.lineTo(3*e,e),t.lineTo(e,e),t.lineTo(e,3*e),t.lineTo(-e,3*e),t.lineTo(-e,e),t.lineTo(-3*e,e),t.closePath()}},Rb=Math.sqrt(1/3),qb=2*Rb,Ub={draw:function(t,n){var e=Math.sqrt(n/qb),r=e*Rb;t.moveTo(0,-e),t.lineTo(r,0),t.lineTo(0,e),t.lineTo(-r,0),t.closePath()}},Db=Math.sin(mb/10)/Math.sin(7*mb/10),Ob=Math.sin(bb/10)*Db,Fb=-Math.cos(bb/10)*Db,Ib={draw:function(t,n){var e=Math.sqrt(.8908130915292852*n),r=Ob*e,i=Fb*e;t.moveTo(0,-e),t.lineTo(r,i);for(var o=1;o<5;++o){var u=bb*o/5,a=Math.cos(u),c=Math.sin(u);t.lineTo(c*e,-a*e),t.lineTo(a*r-c*i,c*r+a*i)}t.closePath()}},Yb={draw:function(t,n){var e=Math.sqrt(n),r=-e/2;t.rect(r,r,e,e)}},Bb=Math.sqrt(3),jb={draw:function(t,n){var e=-Math.sqrt(n/(3*Bb));t.moveTo(0,2*e),t.lineTo(-Bb*e,-e),t.lineTo(Bb*e,-e),t.closePath()}},Hb=-.5,Xb=Math.sqrt(3)/2,Vb=1/Math.sqrt(12),$b=3*(Vb/2+1),Wb={draw:function(t,n){var e=Math.sqrt(n/$b),r=e/2,i=e*Vb,o=r,u=e*Vb+e,a=-o,c=u;t.moveTo(r,i),t.lineTo(o,u),t.lineTo(a,c),t.lineTo(Hb*r-Xb*i,Xb*r+Hb*i),t.lineTo(Hb*o-Xb*u,Xb*o+Hb*u),t.lineTo(Hb*a-Xb*c,Xb*a+Hb*c),t.lineTo(Hb*r+Xb*i,Hb*i-Xb*r),t.lineTo(Hb*o+Xb*u,Hb*u-Xb*o),t.lineTo(Hb*a+Xb*c,Hb*c-Xb*a),t.closePath()}},Zb=[Pb,Lb,Ub,Yb,Ib,jb,Wb],Gb=function(){function t(){var t;if(r||(r=t=Re()),n.apply(this,arguments).draw(r,+e.apply(this,arguments)),t)return r=null,t+""||null}var n=fb(Pb),e=fb(64),r=null;return t.type=function(e){return arguments.length?(n="function"==typeof e?e:fb(e),t):n},t.size=function(n){return arguments.length?(e="function"==typeof n?n:fb(+n),t):e},t.context=function(n){return arguments.length?(r=null==n?null:n,t):r},t},Jb=function(){};mc.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._y0=this._y1=NaN,this._point=0},lineEnd:function(){switch(this._point){case 3:yc(this,this._x1,this._y1);case 2:this._context.lineTo(this._x1,this._y1)}(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2;break;case 2:this._point=3,this._context.lineTo((5*this._x0+this._x1)/6,(5*this._y0+this._y1)/6);default:yc(this,t,n)}this._x0=this._x1,this._x1=t,this._y0=this._y1,this._y1=n}};var Qb=function(t){return new mc(t)};xc.prototype={areaStart:Jb,areaEnd:Jb,lineStart:function(){this._x0=this._x1=this._x2=this._x3=this._x4=this._y0=this._y1=this._y2=this._y3=this._y4=NaN,this._point=0},lineEnd:function(){switch(this._point){case 1:this._context.moveTo(this._x2,this._y2),this._context.closePath();break;case 2:this._context.moveTo((this._x2+2*this._x3)/3,(this._y2+2*this._y3)/3),this._context.lineTo((this._x3+2*this._x2)/3,(this._y3+2*this._y2)/3),this._context.closePath();break;case 3:this.point(this._x2,this._y2),this.point(this._x3,this._y3),this.point(this._x4,this._y4)}},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1,this._x2=t,this._y2=n;break;case 1:this._point=2,this._x3=t,this._y3=n;break;case 2:this._point=3,this._x4=t,this._y4=n,this._context.moveTo((this._x0+4*this._x1+t)/6,(this._y0+4*this._y1+n)/6);break;default:yc(this,t,n)}this._x0=this._x1,this._x1=t,this._y0=this._y1,this._y1=n}};var Kb=function(t){return new xc(t)};bc.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._y0=this._y1=NaN,this._point=0},lineEnd:function(){(this._line||0!==this._line&&3===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1;break;case 1:this._point=2;break;case 2:this._point=3;var e=(this._x0+4*this._x1+t)/6,r=(this._y0+4*this._y1+n)/6;this._line?this._context.lineTo(e,r):this._context.moveTo(e,r);break;case 3:this._point=4;default:yc(this,t,n)}this._x0=this._x1,this._x1=t,this._y0=this._y1,this._y1=n}};var tw=function(t){return new bc(t)};wc.prototype={lineStart:function(){this._x=[],this._y=[],this._basis.lineStart()},lineEnd:function(){var t=this._x,n=this._y,e=t.length-1;if(e>0)for(var r,i=t[0],o=n[0],u=t[e]-i,a=n[e]-o,c=-1;++c<=e;)r=c/e,this._basis.point(this._beta*t[c]+(1-this._beta)*(i+r*u),this._beta*n[c]+(1-this._beta)*(o+r*a));this._x=this._y=null,this._basis.lineEnd()},point:function(t,n){this._x.push(+t),this._y.push(+n)}};var nw=function t(n){function e(t){return 1===n?new mc(t):new wc(t,n)}return e.beta=function(n){return t(+n)},e}(.85);Tc.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x2,this._y2);break;case 3:Mc(this,this._x1,this._y1)}(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2,this._x1=t,this._y1=n;break;case 2:this._point=3;default:Mc(this,t,n)}this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}};var ew=function t(n){function e(t){return new Tc(t,n)}return e.tension=function(n){return t(+n)},e}(0);kc.prototype={areaStart:Jb,areaEnd:Jb,lineStart:function(){this._x0=this._x1=this._x2=this._x3=this._x4=this._x5=this._y0=this._y1=this._y2=this._y3=this._y4=this._y5=NaN,this._point=0},lineEnd:function(){switch(this._point){case 1:this._context.moveTo(this._x3,this._y3),this._context.closePath();break;case 2:this._context.lineTo(this._x3,this._y3),this._context.closePath();break;case 3:this.point(this._x3,this._y3),this.point(this._x4,this._y4),this.point(this._x5,this._y5)}},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1,this._x3=t,this._y3=n;break;case 1:this._point=2,this._context.moveTo(this._x4=t,this._y4=n);break;case 2:this._point=3,this._x5=t,this._y5=n;break;default:Mc(this,t,n)}this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}};var rw=function t(n){function e(t){return new kc(t,n)}return e.tension=function(n){return t(+n)},e}(0);Sc.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._point=0},lineEnd:function(){(this._line||0!==this._line&&3===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1;break;case 1:this._point=2;break;case 2:this._point=3,this._line?this._context.lineTo(this._x2,this._y2):this._context.moveTo(this._x2,this._y2);break;case 3:this._point=4;default:Mc(this,t,n)}this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}};var iw=function t(n){function e(t){return new Sc(t,n)}return e.tension=function(n){return t(+n)},e}(0);Ec.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._l01_a=this._l12_a=this._l23_a=this._l01_2a=this._l12_2a=this._l23_2a=this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x2,this._y2);break;case 3:this.point(this._x2,this._y2)}(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){if(t=+t,n=+n,this._point){var e=this._x2-t,r=this._y2-n;this._l23_a=Math.sqrt(this._l23_2a=Math.pow(e*e+r*r,this._alpha))}switch(this._point){case 0:
this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2;break;case 2:this._point=3;default:Nc(this,t,n)}this._l01_a=this._l12_a,this._l12_a=this._l23_a,this._l01_2a=this._l12_2a,this._l12_2a=this._l23_2a,this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}};var ow=function t(n){function e(t){return n?new Ec(t,n):new Tc(t,0)}return e.alpha=function(n){return t(+n)},e}(.5);Ac.prototype={areaStart:Jb,areaEnd:Jb,lineStart:function(){this._x0=this._x1=this._x2=this._x3=this._x4=this._x5=this._y0=this._y1=this._y2=this._y3=this._y4=this._y5=NaN,this._l01_a=this._l12_a=this._l23_a=this._l01_2a=this._l12_2a=this._l23_2a=this._point=0},lineEnd:function(){switch(this._point){case 1:this._context.moveTo(this._x3,this._y3),this._context.closePath();break;case 2:this._context.lineTo(this._x3,this._y3),this._context.closePath();break;case 3:this.point(this._x3,this._y3),this.point(this._x4,this._y4),this.point(this._x5,this._y5)}},point:function(t,n){if(t=+t,n=+n,this._point){var e=this._x2-t,r=this._y2-n;this._l23_a=Math.sqrt(this._l23_2a=Math.pow(e*e+r*r,this._alpha))}switch(this._point){case 0:this._point=1,this._x3=t,this._y3=n;break;case 1:this._point=2,this._context.moveTo(this._x4=t,this._y4=n);break;case 2:this._point=3,this._x5=t,this._y5=n;break;default:Nc(this,t,n)}this._l01_a=this._l12_a,this._l12_a=this._l23_a,this._l01_2a=this._l12_2a,this._l12_2a=this._l23_2a,this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}};var uw=function t(n){function e(t){return n?new Ac(t,n):new kc(t,0)}return e.alpha=function(n){return t(+n)},e}(.5);Cc.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._l01_a=this._l12_a=this._l23_a=this._l01_2a=this._l12_2a=this._l23_2a=this._point=0},lineEnd:function(){(this._line||0!==this._line&&3===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){if(t=+t,n=+n,this._point){var e=this._x2-t,r=this._y2-n;this._l23_a=Math.sqrt(this._l23_2a=Math.pow(e*e+r*r,this._alpha))}switch(this._point){case 0:this._point=1;break;case 1:this._point=2;break;case 2:this._point=3,this._line?this._context.lineTo(this._x2,this._y2):this._context.moveTo(this._x2,this._y2);break;case 3:this._point=4;default:Nc(this,t,n)}this._l01_a=this._l12_a,this._l12_a=this._l23_a,this._l01_2a=this._l12_2a,this._l12_2a=this._l23_2a,this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}};var aw=function t(n){function e(t){return n?new Cc(t,n):new Sc(t,0)}return e.alpha=function(n){return t(+n)},e}(.5);zc.prototype={areaStart:Jb,areaEnd:Jb,lineStart:function(){this._point=0},lineEnd:function(){this._point&&this._context.closePath()},point:function(t,n){t=+t,n=+n,this._point?this._context.lineTo(t,n):(this._point=1,this._context.moveTo(t,n))}};var cw=function(t){return new zc(t)};Uc.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._y0=this._y1=this._t0=NaN,this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x1,this._y1);break;case 3:qc(this,this._t0,Rc(this,this._t0))}(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){var e=NaN;if(t=+t,n=+n,t!==this._x1||n!==this._y1){switch(this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2;break;case 2:this._point=3,qc(this,Rc(this,e=Lc(this,t,n)),e);break;default:qc(this,this._t0,e=Lc(this,t,n))}this._x0=this._x1,this._x1=t,this._y0=this._y1,this._y1=n,this._t0=e}}},(Dc.prototype=Object.create(Uc.prototype)).point=function(t,n){Uc.prototype.point.call(this,n,t)},Oc.prototype={moveTo:function(t,n){this._context.moveTo(n,t)},closePath:function(){this._context.closePath()},lineTo:function(t,n){this._context.lineTo(n,t)},bezierCurveTo:function(t,n,e,r,i,o){this._context.bezierCurveTo(n,t,r,e,o,i)}},Yc.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x=[],this._y=[]},lineEnd:function(){var t=this._x,n=this._y,e=t.length;if(e)if(this._line?this._context.lineTo(t[0],n[0]):this._context.moveTo(t[0],n[0]),2===e)this._context.lineTo(t[1],n[1]);else for(var r=Bc(t),i=Bc(n),o=0,u=1;u<e;++o,++u)this._context.bezierCurveTo(r[0][o],i[0][o],r[1][o],i[1][o],t[u],n[u]);(this._line||0!==this._line&&1===e)&&this._context.closePath(),this._line=1-this._line,this._x=this._y=null},point:function(t,n){this._x.push(+t),this._y.push(+n)}};var sw=function(t){return new Yc(t)};jc.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x=this._y=NaN,this._point=0},lineEnd:function(){0<this._t&&this._t<1&&2===this._point&&this._context.lineTo(this._x,this._y),(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line>=0&&(this._t=1-this._t,this._line=1-this._line)},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2;default:if(this._t<=0)this._context.lineTo(this._x,n),this._context.lineTo(t,n);else{var e=this._x*(1-this._t)+t*this._t;this._context.lineTo(e,this._y),this._context.lineTo(e,n)}}this._x=t,this._y=n}};var fw=function(t){return new jc(t,.5)},lw=Array.prototype.slice,hw=function(t,n){if((r=t.length)>1)for(var e,r,i=1,o=t[n[0]],u=o.length;i<r;++i){e=o,o=t[n[i]];for(var a=0;a<u;++a)o[a][1]+=o[a][0]=isNaN(e[a][1])?e[a][0]:e[a][1]}},pw=function(t){for(var n=t.length,e=new Array(n);--n>=0;)e[n]=n;return e},dw=function(){function t(t){var o,u,a=n.apply(this,arguments),c=t.length,s=a.length,f=new Array(s);for(o=0;o<s;++o){for(var l,h=a[o],p=f[o]=new Array(c),d=0;d<c;++d)p[d]=l=[0,+i(t[d],h,d,t)],l.data=t[d];p.key=h}for(o=0,u=e(f);o<s;++o)f[u[o]].index=o;return r(f,u),f}var n=fb([]),e=pw,r=hw,i=Vc;return t.keys=function(e){return arguments.length?(n="function"==typeof e?e:fb(lw.call(e)),t):n},t.value=function(n){return arguments.length?(i="function"==typeof n?n:fb(+n),t):i},t.order=function(n){return arguments.length?(e=null==n?pw:"function"==typeof n?n:fb(lw.call(n)),t):e},t.offset=function(n){return arguments.length?(r=null==n?hw:n,t):r},t},vw=function(t,n){if((r=t.length)>0){for(var e,r,i,o=0,u=t[0].length;o<u;++o){for(i=e=0;e<r;++e)i+=t[e][o][1]||0;if(i)for(e=0;e<r;++e)t[e][o][1]/=i}hw(t,n)}},_w=function(t,n){if((e=t.length)>0){for(var e,r=0,i=t[n[0]],o=i.length;r<o;++r){for(var u=0,a=0;u<e;++u)a+=t[u][r][1]||0;i[r][1]+=i[r][0]=-a/2}hw(t,n)}},gw=function(t,n){if((i=t.length)>0&&(r=(e=t[n[0]]).length)>0){for(var e,r,i,o=0,u=1;u<r;++u){for(var a=0,c=0,s=0;a<i;++a){for(var f=t[n[a]],l=f[u][1]||0,h=f[u-1][1]||0,p=(l-h)/2,d=0;d<a;++d){var v=t[n[d]];p+=(v[u][1]||0)-(v[u-1][1]||0)}c+=l,s+=p*l}e[u-1][1]+=e[u-1][0]=o,c&&(o-=s/c)}e[u-1][1]+=e[u-1][0]=o,hw(t,n)}},yw=function(t){var n=t.map($c);return pw(t).sort(function(t,e){return n[t]-n[e]})},mw=function(t){return yw(t).reverse()},xw=function(t){var n,e,r=t.length,i=t.map($c),o=pw(t).sort(function(t,n){return i[n]-i[t]}),u=0,a=0,c=[],s=[];for(n=0;n<r;++n)e=o[n],u<a?(u+=i[e],c.push(e)):(a+=i[e],s.push(e));return s.reverse().concat(c)},bw=function(t){return pw(t).reverse()},ww=function(t){return function(){return t}};Gc.prototype={constructor:Gc,insert:function(t,n){var e,r,i;if(t){if(n.P=t,n.N=t.N,t.N&&(t.N.P=n),t.N=n,t.R){for(t=t.R;t.L;)t=t.L;t.L=n}else t.R=n;e=t}else this._?(t=ts(this._),n.P=null,n.N=t,t.P=t.L=n,e=t):(n.P=n.N=null,this._=n,e=null);for(n.L=n.R=null,n.U=e,n.C=!0,t=n;e&&e.C;)r=e.U,e===r.L?(i=r.R,i&&i.C?(e.C=i.C=!1,r.C=!0,t=r):(t===e.R&&(Qc(this,e),t=e,e=t.U),e.C=!1,r.C=!0,Kc(this,r))):(i=r.L,i&&i.C?(e.C=i.C=!1,r.C=!0,t=r):(t===e.L&&(Kc(this,e),t=e,e=t.U),e.C=!1,r.C=!0,Qc(this,r))),e=t.U;this._.C=!1},remove:function(t){t.N&&(t.N.P=t.P),t.P&&(t.P.N=t.N),t.N=t.P=null;var n,e,r,i=t.U,o=t.L,u=t.R;if(e=o?u?ts(u):o:u,i?i.L===t?i.L=e:i.R=e:this._=e,o&&u?(r=e.C,e.C=t.C,e.L=o,o.U=e,e!==u?(i=e.U,e.U=t.U,t=e.R,i.L=t,e.R=u,u.U=e):(e.U=i,i=e,t=e.R)):(r=t.C,t=e),t&&(t.U=i),!r){if(t&&t.C)return void(t.C=!1);do{if(t===this._)break;if(t===i.L){if(n=i.R,n.C&&(n.C=!1,i.C=!0,Qc(this,i),n=i.R),n.L&&n.L.C||n.R&&n.R.C){n.R&&n.R.C||(n.L.C=!1,n.C=!0,Kc(this,n),n=i.R),n.C=i.C,i.C=n.R.C=!1,Qc(this,i),t=this._;break}}else if(n=i.L,n.C&&(n.C=!1,i.C=!0,Kc(this,i),n=i.L),n.L&&n.L.C||n.R&&n.R.C){n.L&&n.L.C||(n.R.C=!1,n.C=!0,Qc(this,n),n=i.L),n.C=i.C,i.C=n.L.C=!1,Kc(this,i),t=this._;break}n.C=!0,t=i,i=i.U}while(!t.C);t&&(t.C=!1)}}};var Mw,Tw,kw,Sw,Nw,Ew=[],Aw=[],Cw=1e-6,zw=1e-12;ks.prototype={constructor:ks,polygons:function(){var t=this.edges;return this.cells.map(function(n){var e=n.halfedges.map(function(e){return ss(n,t[e])});return e.data=n.site.data,e})},triangles:function(){var t=[],n=this.edges;return this.cells.forEach(function(e,r){if(o=(i=e.halfedges).length)for(var i,o,u,a=e.site,c=-1,s=n[i[o-1]],f=s.left===a?s.right:s.left;++c<o;)u=f,s=n[i[c]],f=s.left===a?s.right:s.left,u&&f&&r<u.index&&r<f.index&&Ms(a,u,f)<0&&t.push([a.data,u.data,f.data])}),t},links:function(){return this.edges.filter(function(t){return t.right}).map(function(t){return{source:t.left.data,target:t.right.data}})},find:function(t,n,e){for(var r,i,o=this,u=o._found||0,a=o.cells.length;!(i=o.cells[u]);)if(++u>=a)return null;var c=t-i.site[0],s=n-i.site[1],f=c*c+s*s;do{i=o.cells[r=u],u=null,i.halfedges.forEach(function(e){var r=o.edges[e],a=r.left;if(a!==i.site&&a||(a=r.right)){var c=t-a[0],s=n-a[1],l=c*c+s*s;l<f&&(f=l,u=a.index)}})}while(null!==u);return o._found=r,null==e||f<=e*e?i.site:null}};var Pw=function(){function t(t){return new ks(t.map(function(r,i){var o=[Math.round(n(r,i,t)/Cw)*Cw,Math.round(e(r,i,t)/Cw)*Cw];return o.index=i,o.data=r,o}),r)}var n=Wc,e=Zc,r=null;return t.polygons=function(n){return t(n).polygons()},t.links=function(n){return t(n).links()},t.triangles=function(n){return t(n).triangles()},t.x=function(e){return arguments.length?(n="function"==typeof e?e:ww(+e),t):n},t.y=function(n){return arguments.length?(e="function"==typeof n?n:ww(+n),t):e},t.extent=function(n){return arguments.length?(r=null==n?null:[[+n[0][0],+n[0][1]],[+n[1][0],+n[1][1]]],t):r&&[[r[0][0],r[0][1]],[r[1][0],r[1][1]]]},t.size=function(n){return arguments.length?(r=null==n?null:[[0,0],[+n[0],+n[1]]],t):r&&[r[1][0]-r[0][0],r[1][1]-r[0][1]]},t},Lw=function(t){return function(){return t}};Ns.prototype={constructor:Ns,scale:function(t){return 1===t?this:new Ns(this.k*t,this.x,this.y)},translate:function(t,n){return 0===t&0===n?this:new Ns(this.k,this.x+this.k*t,this.y+this.k*n)},apply:function(t){return[t[0]*this.k+this.x,t[1]*this.k+this.y]},applyX:function(t){return t*this.k+this.x},applyY:function(t){return t*this.k+this.y},invert:function(t){return[(t[0]-this.x)/this.k,(t[1]-this.y)/this.k]},invertX:function(t){return(t-this.x)/this.k},invertY:function(t){return(t-this.y)/this.k},rescaleX:function(t){return t.copy().domain(t.range().map(this.invertX,this).map(t.invert,t))},rescaleY:function(t){return t.copy().domain(t.range().map(this.invertY,this).map(t.invert,t))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};var Rw=new Ns(1,0,0);Es.prototype=Ns.prototype;var qw=function(){t.event.preventDefault(),t.event.stopImmediatePropagation()},Uw=function(){function n(t){t.on("wheel.zoom",s).on("mousedown.zoom",f).on("dblclick.zoom",l).on("touchstart.zoom",h).on("touchmove.zoom",p).on("touchend.zoom touchcancel.zoom",v).style("-webkit-tap-highlight-color","rgba(0,0,0,0)").property("__zoom",Ps)}function e(t,n){return n=Math.max(x,Math.min(b,n)),n===t.k?t:new Ns(n,t.x,t.y)}function r(t,n,e){var r=n[0]-e[0]*t.k,i=n[1]-e[1]*t.k;return r===t.x&&i===t.y?t:new Ns(t.k,r,i)}function i(t,n){var e=t.invertX(n[0][0])-w,r=t.invertX(n[1][0])-M,i=t.invertY(n[0][1])-T,o=t.invertY(n[1][1])-k;return t.translate(r>e?(e+r)/2:Math.min(0,e)||Math.max(0,r),o>i?(i+o)/2:Math.min(0,i)||Math.max(0,o))}function o(t){return[(+t[0][0]+ +t[1][0])/2,(+t[0][1]+ +t[1][1])/2]}function u(t,n,e){t.on("start.zoom",function(){a(this,arguments).start()}).on("interrupt.zoom end.zoom",function(){a(this,arguments).end()}).tween("zoom",function(){var t=this,r=arguments,i=a(t,r),u=m.apply(t,r),c=e||o(u),s=Math.max(u[1][0]-u[0][0],u[1][1]-u[0][1]),f=t.__zoom,l="function"==typeof n?n.apply(t,r):n,h=N(f.invert(c).concat(s/f.k),l.invert(c).concat(s/l.k));return function(t){if(1===t)t=l;else{var n=h(t),e=s/n[2];t=new Ns(e,c[0]-n[0]*e,c[1]-n[1]*e)}i.zoom(null,t)}})}function a(t,n){for(var e,r=0,i=A.length;r<i;++r)if((e=A[r]).that===t)return e;return new c(t,n)}function c(t,n){this.that=t,this.args=n,this.index=-1,this.active=0,this.extent=m.apply(t,n)}function s(){function n(){o.wheel=null,o.end()}if(y.apply(this,arguments)){var o=a(this,arguments),u=this.__zoom,c=Math.max(x,Math.min(b,u.k*Math.pow(2,-t.event.deltaY*(t.event.deltaMode?120:1)/500))),s=Ff(this);if(o.wheel)o.mouse[0][0]===s[0]&&o.mouse[0][1]===s[1]||(o.mouse[1]=u.invert(o.mouse[0]=s)),clearTimeout(o.wheel);else{if(u.k===c)return;o.mouse=[s,u.invert(s)],ap(this),o.start()}qw(),o.wheel=setTimeout(n,P),o.zoom("mouse",i(r(e(u,c),o.mouse[0],o.mouse[1]),o.extent))}}function f(){function n(){qw(),o.moved=!0,o.zoom("mouse",i(r(o.that.__zoom,o.mouse[0]=Ff(o.that),o.mouse[1]),o.extent))}function e(){u.on("mousemove.zoom mouseup.zoom",null),gt(t.event.view,o.moved),qw(),o.end()}if(!g&&y.apply(this,arguments)){var o=a(this,arguments),u=bl(t.event.view).on("mousemove.zoom",n,!0).on("mouseup.zoom",e,!0),c=Ff(this);Sl(t.event.view),As(),o.mouse=[c,this.__zoom.invert(c)],ap(this),o.start()}}function l(){if(y.apply(this,arguments)){var o=this.__zoom,a=Ff(this),c=o.invert(a),s=o.k*(t.event.shiftKey?.5:2),f=i(r(e(o,s),a,c),m.apply(this,arguments));qw(),S>0?bl(this).transition().duration(S).call(u,f,a):bl(this).call(n.transform,f)}}function h(){if(y.apply(this,arguments)){var n,e,r,i,o=a(this,arguments),u=t.event.changedTouches,c=u.length;for(As(),e=0;e<c;++e)r=u[e],i=Ml(this,u,r.identifier),i=[i,this.__zoom.invert(i),r.identifier],o.touch0?o.touch1||(o.touch1=i):(o.touch0=i,n=!0);if(_&&(_=clearTimeout(_),!o.touch1))return o.end(),void((i=bl(this).on("dblclick.zoom"))&&i.apply(this,arguments));n&&(_=setTimeout(function(){_=null},z),ap(this),o.start())}}function p(){var n,o,u,c,s=a(this,arguments),f=t.event.changedTouches,l=f.length;for(qw(),_&&(_=clearTimeout(_)),n=0;n<l;++n)o=f[n],u=Ml(this,f,o.identifier),s.touch0&&s.touch0[2]===o.identifier?s.touch0[0]=u:s.touch1&&s.touch1[2]===o.identifier&&(s.touch1[0]=u);if(o=s.that.__zoom,s.touch1){var h=s.touch0[0],p=s.touch0[1],d=s.touch1[0],v=s.touch1[1],g=(g=d[0]-h[0])*g+(g=d[1]-h[1])*g,y=(y=v[0]-p[0])*y+(y=v[1]-p[1])*y;o=e(o,Math.sqrt(g/y)),u=[(h[0]+d[0])/2,(h[1]+d[1])/2],c=[(p[0]+v[0])/2,(p[1]+v[1])/2]}else{if(!s.touch0)return;u=s.touch0[0],c=s.touch0[1]}s.zoom("touch",i(r(o,u,c),s.extent))}function v(){var n,e,r=a(this,arguments),i=t.event.changedTouches,o=i.length;for(As(),g&&clearTimeout(g),g=setTimeout(function(){g=null},z),n=0;n<o;++n)e=i[n],r.touch0&&r.touch0[2]===e.identifier?delete r.touch0:r.touch1&&r.touch1[2]===e.identifier&&delete r.touch1;r.touch1&&!r.touch0&&(r.touch0=r.touch1,delete r.touch1),r.touch0?r.touch0[1]=this.__zoom.invert(r.touch0[0]):r.end()}var _,g,y=Cs,m=zs,x=0,b=1/0,w=-b,M=b,T=w,k=M,S=250,N=Ph,A=[],C=d("start","zoom","end"),z=500,P=150;return n.transform=function(t,n){var e=t.selection?t.selection():t;e.property("__zoom",Ps),t!==e?u(t,n):e.interrupt().each(function(){a(this,arguments).start().zoom(null,"function"==typeof n?n.apply(this,arguments):n).end()})},n.scaleBy=function(t,e){n.scaleTo(t,function(){return this.__zoom.k*("function"==typeof e?e.apply(this,arguments):e)})},n.scaleTo=function(t,u){n.transform(t,function(){var t=m.apply(this,arguments),n=this.__zoom,a=o(t),c=n.invert(a);return i(r(e(n,"function"==typeof u?u.apply(this,arguments):u),a,c),t)})},n.translateBy=function(t,e,r){n.transform(t,function(){return i(this.__zoom.translate("function"==typeof e?e.apply(this,arguments):e,"function"==typeof r?r.apply(this,arguments):r),m.apply(this,arguments))})},c.prototype={start:function(){return 1==++this.active&&(this.index=A.push(this)-1,this.emit("start")),this},zoom:function(t,n){return this.mouse&&"mouse"!==t&&(this.mouse[1]=n.invert(this.mouse[0])),this.touch0&&"touch"!==t&&(this.touch0[1]=n.invert(this.touch0[0])),this.touch1&&"touch"!==t&&(this.touch1[1]=n.invert(this.touch1[0])),this.that.__zoom=n,this.emit("zoom"),this},end:function(){return 0==--this.active&&(A.splice(this.index,1),this.index=-1,this.emit("end")),this},emit:function(t){E(new Ss(n,t,this.that.__zoom),C.apply,C,[t,this.that,this.args])}},n.filter=function(t){return arguments.length?(y="function"==typeof t?t:Lw(!!t),n):y},n.extent=function(t){return arguments.length?(m="function"==typeof t?t:Lw([[+t[0][0],+t[0][1]],[+t[1][0],+t[1][1]]]),n):m},n.scaleExtent=function(t){return arguments.length?(x=+t[0],b=+t[1],n):[x,b]},n.translateExtent=function(t){return arguments.length?(w=+t[0][0],M=+t[1][0],T=+t[0][1],k=+t[1][1],n):[[w,T],[M,k]]},n.duration=function(t){return arguments.length?(S=+t,n):S},n.interpolate=function(t){return arguments.length?(N=t,n):N},n.on=function(){var t=C.on.apply(C,arguments);return t===C?n:t},n};t.version="4.7.4",t.bisect=Us,t.bisectRight=Us,t.bisectLeft=Ds,t.ascending=Ls,t.bisector=Rs,t.cross=Fs,t.descending=Is,t.deviation=js,t.extent=Hs,t.histogram=ef,t.thresholdFreedmanDiaconis=of,t.thresholdScott=uf,t.thresholdSturges=nf,t.max=af,t.mean=cf,t.median=sf,t.merge=ff,t.min=lf,t.pairs=Os,t.permute=hf,t.quantile=rf,t.range=Gs,t.scan=pf,t.shuffle=df,t.sum=vf,t.ticks=tf,t.tickStep=r,t.transpose=_f,t.variance=Bs,t.zip=gf,t.axisTop=f,t.axisRight=l,t.axisBottom=h,t.axisLeft=p,t.brush=gd,t.brushX=Ae,t.brushY=Ce,t.brushSelection=Ee,t.chord=Td,t.ribbon=Cd,t.nest=zd,t.set=$e,t.map=Ye,t.keys=Ld,t.values=Rd,t.entries=qd,t.color=Tt,t.rgb=Et,t.hsl=Pt,t.lab=Ut,t.hcl=jt,t.cubehelix=Vt,t.dispatch=d,t.drag=El,t.dragDisable=Sl,t.dragEnable=gt,t.dsvFormat=Ud,t.csvParse=Od,t.csvParseRows=Fd,t.csvFormat=Id,t.csvFormatRows=Yd,t.tsvParse=jd,t.tsvParseRows=Hd,t.tsvFormat=Xd,t.tsvFormatRows=Vd,t.easeLinear=ee,t.easeQuad=oe,t.easeQuadIn=re,t.easeQuadOut=ie,t.easeQuadInOut=oe,t.easeCubic=ce,t.easeCubicIn=ue,t.easeCubicOut=ae,t.easeCubicInOut=ce,t.easePoly=Pp,t.easePolyIn=Cp,t.easePolyOut=zp,t.easePolyInOut=Pp,t.easeSin=le,t.easeSinIn=se,t.easeSinOut=fe,t.easeSinInOut=le,t.easeExp=de,t.easeExpIn=he,t.easeExpOut=pe,t.easeExpInOut=de,t.easeCircle=ge,t.easeCircleIn=ve,t.easeCircleOut=_e,t.easeCircleInOut=ge,t.easeBounce=me,t.easeBounceIn=ye,t.easeBounceOut=me,t.easeBounceInOut=xe,t.easeBack=$p,t.easeBackIn=Xp,t.easeBackOut=Vp,t.easeBackInOut=$p,t.easeElastic=Gp,t.easeElasticIn=Zp,t.easeElasticOut=Gp,t.easeElasticInOut=Jp,t.forceCenter=$d,t.forceCollide=lv,t.forceLink=hv,t.forceManyBody=_v,t.forceSimulation=vv,t.forceX=gv,t.forceY=yv,t.formatDefaultLocale=pr,t.formatLocale=zv,t.formatSpecifier=lr,t.precisionFixed=Pv,t.precisionPrefix=Lv,t.precisionRound=Rv,t.geoArea=F_,t.geoBounds=B_,t.geoCentroid=H_,t.geoCircle=og,t.geoClipExtent=hg,t.geoContains=Mg,t.geoDistance=xg,t.geoGraticule=wi,t.geoGraticule10=Mi,t.geoInterpolate=Tg,t.geoLength=gg,t.geoPath=Jg,t.geoAlbers=ay,t.geoAlbersUsa=cy,t.geoAzimuthalEqualArea=fy,t.geoAzimuthalEqualAreaRaw=sy,t.geoAzimuthalEquidistant=hy,t.geoAzimuthalEquidistantRaw=ly,t.geoConicConformal=dy,t.geoConicConformalRaw=lo,t.geoConicEqualArea=uy,t.geoConicEqualAreaRaw=io,t.geoConicEquidistant=_y,t.geoConicEquidistantRaw=po,t.geoEquirectangular=vy,t.geoEquirectangularRaw=ho,t.geoGnomonic=gy,t.geoGnomonicRaw=vo,t.geoIdentity=yy,t.geoProjection=to,t.geoProjectionMutator=no,t.geoMercator=py,t.geoMercatorRaw=co,t.geoOrthographic=my,t.geoOrthographicRaw=go,t.geoStereographic=xy,t.geoStereographicRaw=yo,t.geoTransverseMercator=by,t.geoTransverseMercatorRaw=mo,t.geoRotation=ig,t.geoStream=q_,t.geoTransform=ny,t.cluster=wy,t.hierarchy=Ao,t.pack=Oy,t.packSiblings=Uy,t.packEnclose=qy,t.partition=Yy,t.stratify=Xy,t.tree=Vy,t.treemap=Gy,t.treemapBinary=Jy,t.treemapDice=Iy,t.treemapSlice=$y,t.treemapSliceDice=Qy,t.treemapSquarify=Zy,t.treemapResquarify=Ky,t.interpolate=Th,t.interpolateArray=gh,t.interpolateBasis=lh,t.interpolateBasisClosed=hh,t.interpolateDate=yh,t.interpolateNumber=mh,t.interpolateObject=xh,t.interpolateRound=kh,t.interpolateString=Mh,t.interpolateTransformCss=Ah,t.interpolateTransformSvg=Ch,t.interpolateZoom=Ph,t.interpolateRgb=dh,t.interpolateRgbBasis=vh,t.interpolateRgbBasisClosed=_h,t.interpolateHsl=Lh,t.interpolateHslLong=Rh,t.interpolateLab=ln,t.interpolateHcl=qh,t.interpolateHclLong=Uh,t.interpolateCubehelix=Dh,t.interpolateCubehelixLong=Oh,t.quantize=Fh,t.path=Re,t.polygonArea=tm,t.polygonCentroid=nm,t.polygonHull=rm;t.polygonContains=im,t.polygonLength=om,t.quadtree=er,t.queue=yu,t.randomUniform=cm,t.randomNormal=sm,t.randomLogNormal=fm,t.randomBates=hm,t.randomIrwinHall=lm,t.randomExponential=pm,t.request=dm,t.html=_m,t.json=gm,t.text=ym,t.xml=mm,t.csv=bm,t.tsv=wm,t.scaleBand=Mu,t.scalePoint=ku,t.scaleIdentity=qu,t.scaleLinear=Ru,t.scaleLog=Bu,t.scaleOrdinal=wu,t.scaleImplicit=Sm,t.scalePow=Hu,t.scaleSqrt=Xu,t.scaleQuantile=Vu,t.scaleQuantize=$u,t.scaleThreshold=Wu,t.scaleTime=Wx,t.scaleUtc=Zx,t.schemeCategory10=Jx,t.schemeCategory20b=Qx,t.schemeCategory20c=Kx,t.schemeCategory20=tb,t.interpolateCubehelixDefault=nb,t.interpolateRainbow=ob,t.interpolateWarm=eb,t.interpolateCool=rb,t.interpolateViridis=ub,t.interpolateMagma=ab,t.interpolateInferno=cb,t.interpolatePlasma=sb,t.scaleSequential=ec,t.creator=Af,t.local=b,t.matcher=Rf,t.mouse=Ff,t.namespace=Ef,t.namespaces=Nf,t.select=bl,t.selectAll=wl,t.selection=vt,t.selector=If,t.selectorAll=Bf,t.touch=Ml,t.touches=Tl,t.window=al,t.customEvent=E,t.arc=wb,t.area=kb,t.line=Tb,t.pie=Eb,t.radialArea=zb,t.radialLine=Cb,t.symbol=Gb,t.symbols=Zb,t.symbolCircle=Pb,t.symbolCross=Lb,t.symbolDiamond=Ub,t.symbolSquare=Yb,t.symbolStar=Ib,t.symbolTriangle=jb,t.symbolWye=Wb,t.curveBasisClosed=Kb,t.curveBasisOpen=tw,t.curveBasis=Qb,t.curveBundle=nw,t.curveCardinalClosed=rw,t.curveCardinalOpen=iw,t.curveCardinal=ew,t.curveCatmullRomClosed=uw,t.curveCatmullRomOpen=aw,t.curveCatmullRom=ow,t.curveLinearClosed=cw,t.curveLinear=Mb,t.curveMonotoneX=Fc,t.curveMonotoneY=Ic,t.curveNatural=sw,t.curveStep=fw,t.curveStepAfter=Xc,t.curveStepBefore=Hc,t.stack=dw,t.stackOffsetExpand=vw,t.stackOffsetNone=hw,t.stackOffsetSilhouette=_w,t.stackOffsetWiggle=gw,t.stackOrderAscending=yw,t.stackOrderDescending=mw,t.stackOrderInsideOut=xw,t.stackOrderNone=pw,t.stackOrderReverse=bw,t.timeInterval=Zu,t.timeMillisecond=Rm,t.timeMilliseconds=qm,t.utcMillisecond=Rm,t.utcMilliseconds=qm,t.timeSecond=Om,t.timeSeconds=Fm,t.utcSecond=Om,t.utcSeconds=Fm,t.timeMinute=Im,t.timeMinutes=Ym,t.timeHour=Bm,t.timeHours=jm,t.timeDay=Hm,t.timeDays=Xm,t.timeWeek=Vm,t.timeWeeks=Km,t.timeSunday=Vm,t.timeSundays=Km,t.timeMonday=$m,t.timeMondays=tx,t.timeTuesday=Wm,t.timeTuesdays=nx,t.timeWednesday=Zm,t.timeWednesdays=ex,t.timeThursday=Gm,t.timeThursdays=rx,t.timeFriday=Jm,t.timeFridays=ix,t.timeSaturday=Qm,t.timeSaturdays=ox,t.timeMonth=ux,t.timeMonths=ax,t.timeYear=cx,t.timeYears=sx,t.utcMinute=fx,t.utcMinutes=lx,t.utcHour=hx,t.utcHours=px,t.utcDay=dx,t.utcDays=vx,t.utcWeek=_x,t.utcWeeks=Mx,t.utcSunday=_x,t.utcSundays=Mx,t.utcMonday=gx,t.utcMondays=Tx,t.utcTuesday=yx,t.utcTuesdays=kx,t.utcWednesday=mx,t.utcWednesdays=Sx,t.utcThursday=xx,t.utcThursdays=Nx,t.utcFriday=bx,t.utcFridays=Ex,t.utcSaturday=wx,t.utcSaturdays=Ax,t.utcMonth=Cx,t.utcMonths=zx,t.utcYear=Px,t.utcYears=Rx,t.timeFormatDefaultLocale=Za,t.timeFormatLocale=na,t.isoFormat=Fx,t.isoParse=Ix,t.now=dn,t.timer=gn,t.timerFlush=yn,t.timeout=Zh,t.interval=Gh,t.transition=te,t.active=nd,t.interrupt=ap,t.voronoi=Pw,t.zoom=Uw,t.zoomTransform=Es,t.zoomIdentity=Rw,Object.defineProperty(t,"__esModule",{value:!0})});
0
;
!function(a,b){"use strict";if("object"==typeof exports)module.exports=b(require("d3"));else if("function"==typeof define&&define.amd)define(["d3"],function(c){return a.dimple=b(c),a.dimple});else if(a.d3)a.dimple=b(a.d3);else{if(!console||!console.warn)throw"dimple requires d3 to run.  Are you missing a reference to the d3 library?";console.warn("dimple requires d3 to run.  Are you missing a reference to the d3 library?")}}(this,function(a){"use strict";var b={version:"2.2.0",plot:{},aggregateMethod:{}};return b.axis=function(c,d,e,f,g,h){this.chart=c,this.position=d,this.categoryFields=null===g||void 0===g?e:[].concat(g),this.measure=f,this.timeField=g,this.floatingBarWidth=5,this.hidden=!1,this.showPercent=!1,this.colors=null,this.overrideMin=null,this.overrideMax=null,this.shapes=null,this.showGridlines=null,this.gridlineShapes=null,this.titleShape=null,this.dateParseFormat=null,this.tickFormat=null,this.timePeriod=null,this.timeInterval=1,this.useLog=!1,this.logBase=10,this.title=void 0,this.clamp=!0,this.ticks=null,this.fontSize="10px",this.fontFamily="sans-serif",this.autoRotateLabel=null===h||void 0===h||h,this._slaves=[],this._scale=null,this._min=0,this._max=0,this._previousOrigin=null,this._origin=null,this._orderRules=[],this._groupOrderRules=[],this._draw=null,this._getAxisData=function(){var a,b,c=[],d=!1;if(this.chart&&this.chart.series){for(a=0;a<this.chart.series.length;a+=1)b=this.chart.series[a],b[this.position]===this&&(b.data&&b.data.length>0?c=c.concat(b.data):d=!0);d&&this.chart.data&&(c=c.concat(this.chart.data))}return c},this._getFontSize=function(){var a;return a=this.fontSize&&"auto"!==this.fontSize.toString().toLowerCase()?isNaN(this.fontSize)?this.fontSize:this.fontSize+"px":(this.chart._heightPixels()/35>10?this.chart._heightPixels()/35:10)+"px"},this._getFormat=function(){var b,c,d,e,f,g,h;return null!==this.tickFormat&&void 0!==this.tickFormat?b=this._hasTimeField()?a.timeFormat(this.tickFormat):a.format(this.tickFormat):this.showPercent?b=a.format(".0%"):this.useLog&&null!==this.measure?b=function(b){var c=Math.floor(Math.abs(b),0).toString().length,d=Math.min(Math.floor((c-1)/3),4),e="kmBT".substring(d-1,d),f="0"===Math.round(b/Math.pow(1e3,d)*10).toString().slice(-1)?0:1;return 0===b?0:a.format(",."+f+"f")(b/Math.pow(1e3,d))+e}:null!==this.measure?(c=Math.floor(Math.abs(this._max),0).toString(),d=Math.floor(Math.abs(this._min),0).toString(),e=Math.max(d.length,c.length),e>3?(f=Math.min(Math.floor((e-1)/3),4),g="kmBT".substring(f-1,f),h=e-3*f<=1?1:0,b=function(b){return 0===b?0:a.format(",."+h+"f")(b/Math.pow(1e3,f))+g}):(h=Math.max(-(this._tick_step?Math.floor(Math.log(this._tick_step)/Math.LN10):0),0),b=a.format(",."+h+"f"))):b=function(a){return a},b},this._getTimePeriod=function(){var b=this.timePeriod,c=30,d=this._max-this._min;return this._hasTimeField()&&!this.timePeriod&&(b=d/1e3<=c?a.timeSecond:d/6e4<=c?a.timeMinute:d/36e5<=c?a.timeHour:d/864e5<=c?a.timeHay:d/6048e5<=c?a.timeWeek:d/26298e5<=c?a.timeMonth:a.timeYear),b},this._getTooltipText=function(b,c){if(this._hasTimeField())c[this.position+"Field"][0]&&b.push(this.timeField+": "+this._getFormat()(c[this.position+"Field"][0]));else if(this._hasCategories())this.categoryFields.forEach(function(a,d){null!==a&&void 0!==a&&c[this.position+"Field"][d]&&b.push(a+(c[this.position+"Field"][d]!==a?": "+c[this.position+"Field"][d]:""))},this);else if(this._hasMeasure())switch(this.position){case"x":b.push(this.measure+": "+this._getFormat()(c.width));break;case"y":b.push(this.measure+": "+this._getFormat()(c.height));break;case"p":b.push(this.measure+": "+this._getFormat()(c.angle)+" ("+a.format(".0%")(c.piePct)+")");break;default:b.push(this.measure+": "+this._getFormat()(c[this.position+"Value"]))}},this._getTopMaster=function(){var a=this;return null!==this.master&&void 0!==this.master&&(a=this.master._getTopMaster()),a},this._hasCategories=function(){return null!==this.categoryFields&&void 0!==this.categoryFields&&this.categoryFields.length>0},this._hasMeasure=function(){return null!==this.measure&&void 0!==this.measure},this._hasTimeField=function(){return null!==this.timeField&&void 0!==this.timeField},this._parseDate=function(b){var c;return c=null===this.dateParseFormat||void 0===this.dateParseFormat?isNaN(b)?Date.parse(b):new Date(b):a.timeParse(this.dateParseFormat)(b)},this._update=function(c){var d,e,f,g,h=[],i=this.ticks||10,j=function(a,c,d){var e,f,g=a.categoryFields[0],h=a._getAxisData(),i=g,j=!1,k=!0,l=null;for(e=0;e<h.length;e+=1)if(l=a._parseDate(h[e][g]),null!==l&&void 0!==l&&isNaN(l)){k=!1;break}return k||a.chart.series.forEach(function(b){b[c]===a&&b[d]._hasMeasure()&&(i=b[d].measure,j=!0)},this),f=a._orderRules.concat({ordering:i,desc:j}),b._getOrderedList(h,g,f)};if(this._min=this.showPercent&&this._min<-1?-1:this._min,this._max=this.showPercent&&this._max>1?1:this._max,this._min=null!==this.overrideMin?this.overrideMin:this._min,this._max=null!==this.overrideMax?this.overrideMax:this._max,"x"!==this.position||null!==this._scale&&!c){if("y"!==this.position||null!==this._scale&&!c)this.position.length>0&&"z"===this.position[0]&&null===this._scale?this.useLog?this._scale=a.scaleLog().range([this.chart._heightPixels()/300,this.chart._heightPixels()/10]).domain([0===this._min?Math.pow(this.logBase,-1):this._min,0===this._max?-1*Math.pow(this.logBase,-1):this._max]).clamp(this.clamp).base(this.logBase):this._scale=a.scaleLinear().range([1,this.chart._heightPixels()/10]).domain([this._min,this._max]).clamp(this.clamp):this.position.length>0&&"p"===this.position[0]&&null===this._scale?this.useLog?this._scale=a.scaleLog().range([0,360]).domain([0===this._min?Math.pow(this.logBase,-1):this._min,0===this._max?-1*Math.pow(this.logBase,-1):this._max]).clamp(this.clamp).base(this.logBase):this._scale=a.scaleLinear().range([0,360]).domain([this._min,this._max]).clamp(this.clamp):this.position.length>0&&"c"===this.position[0]&&null===this._scale&&(this._scale=a.scaleLinear().range([0,null===this.colors||1===this.colors.length?1:this.colors.length-1]).domain([this._min,this._max]).clamp(this.clamp));else if(this._hasTimeField()?this._scale=a.scaleTime().range([this.chart._yPixels()+this.chart._heightPixels(),this.chart._yPixels()]).domain([this._min,this._max]).clamp(this.clamp):this.useLog?this._scale=a.scaleLog().range([this.chart._yPixels()+this.chart._heightPixels(),this.chart._yPixels()]).domain([0===this._min?Math.pow(this.logBase,-1):this._min,0===this._max?-1*Math.pow(this.logBase,-1):this._max]).clamp(this.clamp).base(this.logBase).nice():null===this.measure||void 0===this.measure?(h=j(this,"y","x"),null!==this._slaves&&void 0!==this._slaves&&this._slaves.forEach(function(a){h=h.concat(j(a,"y","x"))},this),this._scale=a.scalePoint().range([this.chart._yPixels()+this.chart._heightPixels(),this.chart._yPixels()]).domain(h.concat([""]))):this._scale=a.scaleLinear().range([this.chart._yPixels()+this.chart._heightPixels(),this.chart._yPixels()]).domain([this._min,this._max]).clamp(this.clamp).nice(),!this.hidden)switch(this.chart._axisIndex(this,"y")){case 0:this._draw=a.axisLeft().scale(this._scale),this.ticks&&this._draw.ticks(i);break;case 1:this._draw=a.axisRight().scale(this._scale),this.ticks&&this._draw.ticks(i)}}else if(this._hasTimeField()?this._scale=a.scaleTime().range([this.chart._xPixels(),this.chart._xPixels()+this.chart._widthPixels()]).domain([this._min,this._max]).clamp(this.clamp):this.useLog?this._scale=a.scaleLog().range([this.chart._xPixels(),this.chart._xPixels()+this.chart._widthPixels()]).domain([0===this._min?Math.pow(this.logBase,-1):this._min,0===this._max?-1*Math.pow(this.logBase,-1):this._max]).clamp(this.clamp).base(this.logBase).nice():null===this.measure||void 0===this.measure?(h=j(this,"x","y"),null!==this._slaves&&void 0!==this._slaves&&this._slaves.forEach(function(a){h=h.concat(j(a,"x","y"))},this),this._scale=a.scalePoint().range([this.chart._xPixels(),this.chart._xPixels()+this.chart._widthPixels()]).domain(h.concat([""]))):this._scale=a.scaleLinear().range([this.chart._xPixels(),this.chart._xPixels()+this.chart._widthPixels()]).domain([this._min,this._max]).clamp(this.clamp).nice(),!this.hidden)switch(this.chart._axisIndex(this,"x")){case 0:this._draw=a.axisBottom().scale(this._scale),this.ticks&&this._draw.ticks(i);break;case 1:this._draw=a.axisTop().scale(this._scale),this.ticks&&this._draw.ticks(i)}return null!==this._slaves&&void 0!==this._slaves&&this._slaves.length>0&&this._slaves.forEach(function(a){a._scale=this._scale},this),null!==c&&void 0!==c&&c!==!1||this._hasTimeField()||null===this._scale||null===this._scale.ticks||void 0===this._scale.ticks||!(this._scale.ticks(i).length>0)||"x"!==this.position&&"y"!==this.position||(d=this._scale.ticks(i),e=d[1]-d[0],f=((this._max-this._min)%e).toFixed(0),this._tick_step=e,0!==f&&(this._max=Math.ceil(this._max/e)*e,this._min=Math.floor(this._min/e)*e,this._update(!0))),g=null!==h&&void 0!==h&&h.length>0?this._scale.copy()(h[0]):this._min>0?this._scale.copy()(this._min):this._max<0?this._scale.copy()(this._max):this._scale.copy()(0),this._origin!==g&&(this._previousOrigin=null===this._origin?g:this._origin,this._origin=g),this},this.addGroupOrderRule=function(a,b){this._groupOrderRules.push({ordering:a,desc:b})},this.addOrderRule=function(a,b){this._orderRules.push({ordering:a,desc:b})}},b.chart=function(c,d){this.svg=c,this.x="10%",this.y="10%",this.width="80%",this.height="80%",this.data=d,this.noFormats=!1,this.axes=[],this.series=[],this.legends=[],this.storyboard=null,this.titleShape=null,this.shapes=null,this.ease=a.easeCubicInOut,this.staggerDraw=!1,this.transition={},this._group=c.append("g"),this._group.attr("class","dimple-chart"),this._gridlines_group=this._group.insert("g"),this._gridlines_group.attr("class","dimple-gridlines-group"),this._axis_group=this._group.insert("g"),this._axis_group.attr("class","dimple-axis-group"),this._tooltipGroup=null,this._assignedColors={},this._assignedClasses={},this._nextColor=0,this._nextClass=0,this._axisIndex=function(a,b){var c=0,d=0,e=-1;for(c=0;c<this.axes.length;c+=1){if(this.axes[c]===a){e=d;break}null!==b&&void 0!==b&&b[0]!==this.axes[c].position[0]||(d+=1)}return e},this._getAllData=function(){var a=[];return null!==this.data&&void 0!==this.data&&this.data.length>0&&(a=a.concat(this.data)),null!==this.series&&void 0!==this.series&&this.series.length>0&&this.series.forEach(function(b){null!==b.data&&void 0!==b.data&&b.data.length>0&&(a=a.concat(b.data))}),a},this._getData=function(c,d,e,f,g,h,i,j,k,l){var m,n,o=[],p=function(a,b){var c=[];return null!==a&&(a._hasTimeField()?c.push(a._parseDate(b[a.timeField])):a._hasCategories()&&a.categoryFields.forEach(function(a){c.push(b[a])},this)),c},q={x:!1,y:!1,z:!1,p:!1,c:!1},r={x:[],y:[]},s={x:[],y:[],z:[],p:[]},t={min:null,max:null},u={x:[],y:[],z:[],p:[]},v=[],w={},x={x:0,y:0,z:0,p:0},y="",z=[],A=[],B=[],C="",D=[],E="",F=[],G="",H=[],I=[],J=c,K=[];this.storyboard&&this.storyboard.categoryFields.length>0&&(y=this.storyboard.categoryFields[0],z=b._getOrderedList(J,y,this.storyboard._orderRules)),h&&h._hasCategories()&&h._hasMeasure()&&(C=h.categoryFields[0],D=b._getOrderedList(J,C,h._orderRules.concat([{ordering:h.measure,desc:!0}]))),i&&i._hasCategories()&&i._hasMeasure()&&(E=i.categoryFields[0],F=b._getOrderedList(J,E,i._orderRules.concat([{ordering:i.measure,desc:!0}]))),k&&k._hasCategories()&&k._hasMeasure()&&(G=k.categoryFields[0],H=b._getOrderedList(J,G,k._orderRules.concat([{ordering:k.measure,desc:!0}]))),J.length>0&&d&&d.length>0&&(I=[].concat(f),A=[],d.forEach(function(a){void 0!==J[0][a]&&A.push(a)},this),k&&k._hasMeasure()?I.push({ordering:k.measure,desc:!0}):l&&l._hasMeasure()?I.push({ordering:l.measure,desc:!0}):j&&j._hasMeasure()?I.push({ordering:j.measure,desc:!0}):h&&h._hasMeasure()?I.push({ordering:h.measure,desc:!0}):i&&i._hasMeasure()&&I.push({ordering:i.measure,desc:!0}),B=b._getOrderedList(J,A,I)),J.sort(function(a,b){var c,d,e,f,g,h,i=0;if(""!==y&&(i=z.indexOf(a[y])-z.indexOf(b[y])),""!==C&&0===i&&(i=D.indexOf(a[C])-D.indexOf(b[C])),""!==E&&0===i&&(i=F.indexOf(a[E])-F.indexOf(b[E])),""!==G&&0===i&&(i=H.indexOf(a[G])-F.indexOf(b[G])),A&&A.length>0&&0===i)for(c=[].concat(A),i=0,e=0;e<B.length;e+=1){for(d=[].concat(B[e]),g=!0,h=!0,f=0;f<c.length;f+=1)g=g&&a[c[f]]===d[f],h=h&&b[c[f]]===d[f];if(g||h){i=g&&h?0:g?-1:1;break}}return i}),J.forEach(function(a){var b,c,f,g,m,n=-1,r=p(h,a),s=p(i,a),t=p(j,a),u=p(k,a),v=[];if(d&&0!==d.length)for(f=0;f<d.length;f+=1)void 0===a[d[f]]?v.push(d[f]):v.push(a[d[f]]);else v=["All"];for(b=v.join("/")+"_"+r.join("/")+"_"+s.join("/")+"_"+u.join("/")+"_"+t.join("/"),c=0;c<o.length;c+=1)if(o[c].key===b){n=c;break}n===-1&&(g={key:b,aggField:v,xField:r,xValue:null,xCount:0,yField:s,yValue:null,yCount:0,pField:u,pValue:null,pCount:0,zField:t,zValue:null,zCount:0,cValue:0,cCount:0,x:0,y:0,xOffset:0,yOffset:0,width:0,height:0,cx:0,cy:0,xBound:0,yBound:0,xValueList:[],yValueList:[],zValueList:[],pValueList:[],cValueList:[],fill:{},stroke:{}},o.push(g),n=o.length-1),m=function(b,c){var d,f,g=!0,h={value:0,count:1},i={value:0,count:1},j="";null!==c&&(d=c.getFrameValue(),c.categoryFields.forEach(function(b,c){c>0&&(j+="/"),j+=a[b],g=j===d},this)),null!==b&&void 0!==b&&g&&(f=o[n],b._hasMeasure()&&null!==a[b.measure]&&void 0!==a[b.measure]&&(f[b.position+"ValueList"].indexOf(a[b.measure])===-1&&f[b.position+"ValueList"].push(a[b.measure]),isNaN(parseFloat(a[b.measure]))&&(q[b.position]=!0),h.value=f[b.position+"Value"],h.count=f[b.position+"Count"],i.value=a[b.measure],f[b.position+"Value"]=e(h,i),f[b.position+"Count"]+=1))},m(h,this.storyboard),m(i,this.storyboard),m(j,this.storyboard),m(k,this.storyboard),m(l,this.storyboard)},this),h&&h._hasCategories()&&h.categoryFields.length>1&&void 0!==r.x&&(K=[],i._hasMeasure()&&K.push({ordering:i.measure,desc:!0}),r.x=b._getOrderedList(J,h.categoryFields[1],h._groupOrderRules.concat(K))),i&&i._hasCategories()&&i.categoryFields.length>1&&void 0!==r.y&&(K=[],h._hasMeasure()&&K.push({ordering:h.measure,desc:!0}),r.y=b._getOrderedList(J,i.categoryFields[1],i._groupOrderRules.concat(K)),r.y.reverse()),o.forEach(function(a){null!==h&&(q.x===!0&&(a.xValue=a.xValueList.length),m=h._hasMeasure()&&h._hasCategories()?(s.x[a.xField.join("/")]||0)+(h._hasMeasure()?Math.abs(a.xValue):0):(s.x[a.xField.join("/")]||0)+(i._hasMeasure()?Math.abs(a.yValue):0),s.x[a.xField.join("/")]=m),null!==i&&(q.y===!0&&(a.yValue=a.yValueList.length),m=i._hasMeasure()&&i._hasCategories()?(s.y[a.yField.join("/")]||0)+(i._hasMeasure()?Math.abs(a.yValue):0):(s.y[a.yField.join("/")]||0)+(h._hasMeasure()?Math.abs(a.xValue):0),s.y[a.yField.join("/")]=m),null!==k&&(q.p===!0&&(a.pValue=a.pValueList.length),m=(s.p[a.pField.join("/")]||0)+(k._hasMeasure()?Math.abs(a.pValue):0),s.p[a.pField.join("/")]=m),null!==j&&(q.z===!0&&(a.zValue=a.zValueList.length),m=(s.z[a.zField.join("/")]||0)+(j._hasMeasure()?Math.abs(a.zValue):0),s.z[a.zField.join("/")]=m),null!==l&&((null===t.min||a.cValue<t.min)&&(t.min=a.cValue),(null===t.max||a.cValue>t.max)&&(t.max=a.cValue))},this);for(n in s.x)s.x.hasOwnProperty(n)&&(x.x+=s.x[n]);for(n in s.y)s.y.hasOwnProperty(n)&&(x.y+=s.y[n]);for(n in s.p)s.p.hasOwnProperty(n)&&(x.p+=s.p[n]);for(n in s.z)s.z.hasOwnProperty(n)&&(x.z+=s.z[n]);return o.forEach(function(b){var c,d,e,f,m,n=function(a,c,d){var e,f,h,i,j;null!==a&&void 0!==a&&(i=a.position,a._hasCategories()?a._hasMeasure()?(e=b[a.position+"Field"].join("/"),f=a.showPercent?s[a.position][e]/x[a.position]:s[a.position][e],v.indexOf(e)===-1&&(w[e]=f+(v.length>0?w[v[v.length-1]]:0),v.push(e)),h=b[i+"Bound"]=b["c"+i]="x"!==i&&"y"!==i||!g?f:w[e],b[d]=f,b[i]=h-("x"===i&&f>=0||"y"===i&&f<=0?f:0)):(b[i]=b["c"+i]=b[i+"Field"][0],b[d]=1,void 0!==r[i]&&null!==r[i]&&r[i].length>=2&&(b[i+"Offset"]=r[i].indexOf(b[i+"Field"][1]),b[d]=1/r[i].length)):(f=a.showPercent?b[i+"Value"]/s[c][b[c+"Field"].join("/")]:b[i+"Value"],e=b[c+"Field"].join("/")+(b[i+"Value"]>=0),j=u[i][e]=(null===u[i][e]||void 0===u[i][e]||"z"===i||"p"===i?0:u[i][e])+f,h=b[i+"Bound"]=b["c"+i]="x"!==i&&"y"!==i||!g?f:j,b[d]=f,b[i]=h-("x"===i&&f>=0||"y"===i&&f<=0?f:0)))};n(h,"y","width"),n(i,"x","height"),n(j,"z","r"),n(k,"p","angle"),null!==l&&null!==t.min&&null!==t.max&&(t.min===t.max&&(t.min-=.5,t.max+=.5),t.min=l.overrideMin||t.min,t.max=l.overrideMax||t.max,b.cValue=b.cValue>t.max?t.max:b.cValue<t.min?t.min:b.cValue,e=a.scaleLinear().range([0,null===l.colors||1===l.colors.length?1:l.colors.length-1]).domain([t.min,t.max]),f=e(b.cValue),m=f-Math.floor(f),b.cValue===t.max&&(m=1),l.colors&&1===l.colors.length?(c=a.rgb(l.colors[0]),d=a.rgb(this.getColor(b.aggField.slice(-1)[0]).fill)):l.colors&&l.colors.length>1?(c=a.rgb(l.colors[Math.floor(f)]),d=a.rgb(l.colors[Math.ceil(f)])):(c=a.rgb("white"),d=a.rgb(this.getColor(b.aggField.slice(-1)[0]).fill)),c.r=Math.floor(c.r+(d.r-c.r)*m),c.g=Math.floor(c.g+(d.g-c.g)*m),c.b=Math.floor(c.b+(d.b-c.b)*m),b.fill=c.toString(),b.stroke=c.darker(.5).toString())},this),o},this._getDelay=function(a,c,d){return function(e){var f=0;return d&&c.staggerDraw&&(d.x._hasCategories()?f=b._helpers.cx(e,c,d)/c._widthPixels()*a:d.y._hasCategories()&&(f=(1-b._helpers.cy(e,c,d)/c._heightPixels())*a)),f}},this._getSeriesData=function(){null!==this.series&&void 0!==this.series&&this.series.forEach(function(a){var b,c,d,e,f,g,h=a.data||this.data||[],i=[].concat(a.categoryFields||"All"),j=this._getData(h,i,a.aggregate,a._orderRules,a._isStacked(),a.x,a.y,a.z,a.p,a.c),k=[],l={},m=a.startAngle*(Math.PI/180)||0,n=(a.endAngle||360)*(Math.PI/180);if(m>n&&(m-=2*Math.PI),a.p&&i.length>0){if(a.x&&a.y){for(i.pop(),k=this._getData(h,["__dimple_placeholder__"].concat(i),a.aggregate,a._orderRules,a._isStacked(),a.x,a.y,a.z,a.p,a.c),b=0;b<j.length;b+=1)for(d=["__dimple_placeholder__"].concat(j[b].aggField),d.pop(),a.x&&a.x._hasCategories()&&(d=d.concat(j[b].xField)),a.y&&a.y._hasCategories()&&(d=d.concat(j[b].yField)),e=d.join("|"),c=0;c<k.length;c+=1)if(f=[].concat(k[c].aggField),a.x&&a.x._hasCategories()&&(f=f.concat(k[c].xField)),a.y&&a.y._hasCategories()&&(f=f.concat(k[c].yField)),g=f.join("|"),e===g){j[b].xField=k[c].xField,j[b].xValue=k[c].xValue,j[b].xCount=k[c].xCount,j[b].yField=k[c].yField,j[b].yValue=k[c].yValue,j[b].yCount=k[c].yCount,j[b].zField=k[c].zField,j[b].zValue=k[c].zValue,j[b].zCount=k[c].zCount,j[b].x=k[c].x,j[b].y=k[c].y,j[b].r=k[c].r,j[b].xOffset=k[c].xOffset,j[b].yOffset=k[c].yOffset,j[b].width=k[c].width,j[b].height=k[c].height,j[b].cx=k[c].cx,j[b].cy=k[c].cy,j[b].xBound=k[c].xBound,j[b].yBound=k[c].yBound,j[b].xValueList=k[c].xValueList,j[b].yValueList=k[c].yValueList,j[b].zValueList=k[c].zValueList,j[b].cValueList=k[c].cValueList,j[b].pieKey=k[c].key,j[b].value=j.pValue,l[k[c].key]||(l[k[c].key]={total:0,angle:m}),l[k[c].key].total+=j[b].pValue;break}}else for(b=0;b<j.length;b+=1)j[b].pieKey="All",j[b].value=j.pValue,l[j[b].pieKey]||(l[j[b].pieKey]={total:0,angle:m}),l[j[b].pieKey].total+=j[b].pValue;for(b=0;b<j.length;b+=1)0===l[j[b].pieKey].total?j[b].piePct=0:j[b].piePct=j[b].pValue/l[j[b].pieKey].total,j[b].startAngle=l[j[b].pieKey].angle,j[b].endAngle=j[b].startAngle+j[b].piePct*(n-m),l[j[b].pieKey].angle=j[b].endAngle}a._positionData=j},this)},this._handleTransition=function(a,c,d,e){var f=null;return 0===c?f=a:(f=a.transition().duration(c).delay(d._getDelay(c,d,e)),b._ease(f,d.ease)),f},this._heightPixels=function(){return b._parseYPosition(this.height,this.svg.node())},this._registerEventHandlers=function(c){null!==c._eventHandlers&&c._eventHandlers.length>0&&c._eventHandlers.forEach(function(d){var e,f=function(e){var f=new b.eventArgs;null!==c.chart.storyboard&&(f.frameValue=c.chart.storyboard.getFrameValue()),f.seriesValue=e.aggField,f.xValue=e.x,f.yValue=e.y,f.zValue=e.z,f.pValue=e.p,f.colorValue=e.cValue,f.seriesShapes=c.shapes,f.selectedShape=a.select(this),d.handler(f)};if(null!==d.handler&&"function"==typeof d.handler)if(null!==c._markers&&void 0!==c._markers)for(e in c._markers)c._markers.hasOwnProperty(e)&&c._markers[e].on(d.event,f);else c.shapes.on(d.event,f)},this)},this._widthPixels=function(){return b._parseXPosition(this.width,this.svg.node())},this._xPixels=function(){return b._parseXPosition(this.x,this.svg.node())},this._yPixels=function(){return b._parseYPosition(this.y,this.svg.node())},this.addAxis=function(a,c,d,e){var f,g=null,h=null;if(null!==c&&void 0!==c&&(c=[].concat(c)),"string"==typeof a||a instanceof String)g=new b.axis(this,a,c,d,e),this.axes.push(g);else{if(h=a,g=new b.axis(this,h.position,c,d,e),g._hasMeasure()!==h._hasMeasure()?f="You have specified a composite axis where some but not all axes have a measure - this is not supported, all axes must be of the same type.":g._hasTimeField()!==h._hasTimeField()?f="You have specified a composite axis where some but not all axes have a time field - this is not supported, all axes must be of the same type.":(null===g.categoryFields||void 0===g.categoryFields?0:g.categoryFields.length)!==(null===h.categoryFields||void 0===h.categoryFields?0:h.categoryFields.length)&&(f="You have specified a composite axis where axes have differing numbers of category fields - this is not supported, all axes must be of the same type."),f)throw f;h._slaves.push(g)}return g},this.addCategoryAxis=function(a,b){return this.addAxis(a,b,null)},this.addColorAxis=function(a,b){var c=this.addAxis("c",null,a);return c.colors=null===b||void 0===b?null:[].concat(b),c},this.addLegend=function(a,c,d,e,f,g){g=null===g||void 0===g?this.series:[].concat(g),f=null===f||void 0===f?"left":f;var h=new b.legend(this,a,c,d,e,f,g);return this.legends.push(h),h},this.addLogAxis=function(a,b,c){var d=this.addAxis(a,null,b,null);return null!==c&&void 0!==c&&(d.logBase=c),d.useLog=!0,d},this.addMeasureAxis=function(a,b){return this.addAxis(a,null,b)},this.addPctAxis=function(a,b,c){var d=null;return d=null!==c&&void 0!==c?this.addAxis(a,c,b):this.addMeasureAxis(a,b),d.showPercent=!0,d},this.addSeries=function(a,c,d){null!==d&&void 0!==d||(d=this.axes),null!==c&&void 0!==c||(c=b.plot.bubble);var e,f=null,g=null,h=null,i=null,j=null;return d.forEach(function(a){null!==a&&c.supportedAxes.indexOf(a.position)>-1&&(null===f&&"x"===a.position[0]?f=a:null===g&&"y"===a.position[0]?g=a:null===h&&"z"===a.position[0]?h=a:null===i&&"c"===a.position[0]?i=a:null===i&&"p"===a.position[0]&&(j=a))},this),a&&(a=[].concat(a)),e=new b.series(this,a,f,g,h,i,j,c,b.aggregateMethod.sum,c.stacked),this.series.push(e),e},this.addTimeAxis=function(a,b,c,d){var e=this.addAxis(a,null,null,b);return e.tickFormat=d,e.dateParseFormat=c,e},this.assignClass=function(a,b){return this._assignedClasses[a]=b,this._assignedClasses[a]},this.assignColor=function(a,c,d,e){return this._assignedColors[a]=new b.color(c,d,e),this._assignedColors[a]},this.customClassList={axisLine:"dimple-custom-axis-line",axisLabel:"dimple-custom-axis-label",axisTitle:"dimple-custom-axis-title",tooltipBox:"dimple-custom-tooltip-box",tooltipLabel:"dimple-custom-tooltip-label",tooltipDropLine:"dimple-custom-tooltip-dropline",lineMarker:"dimple-custom-line-marker",lineMarkerCircle:"dimple-custom-line-marker-circle",legendLabel:"dimple-custom-legend-label",legendKey:"dimple-custom-legend-key",areaSeries:"dimple-custom-series-area",barSeries:"dimple-custom-series-bar",bubbleSeries:"dimple-custom-series-bubble",lineSeries:"dimple-custom-series-line",pieSeries:"dimple-custom-series-pie",gridline:"dimple-custom-gridline",colorClasses:["dimple-custom-format-1","dimple-custom-format-2","dimple-custom-format-3","dimple-custom-format-4","dimple-custom-format-5","dimple-custom-format-6","dimple-custom-format-7","dimple-custom-format-8","dimple-custom-format-9","dimple-custom-format-10"]},this.defaultColors=[new b.color("#80B1D3"),new b.color("#FB8072"),new b.color("#FDB462"),new b.color("#B3DE69"),new b.color("#FFED6F"),new b.color("#BC80BD"),new b.color("#8DD3C7"),new b.color("#CCEBC5"),new b.color("#FFFFB3"),new b.color("#BEBADA"),new b.color("#FCCDE5"),new b.color("#D9D9D9")],this.draw=function(b,c){b=b||0;var d,e,f=null,g=null,h=!1,i=!1,j=this._xPixels(),k=this._yPixels(),l=this._widthPixels(),m=this._heightPixels();return void 0!==c&&null!==c&&c!==!1||this._getSeriesData(),this.axes.forEach(function(a){a._scale=null},this),this.axes.forEach(function(a){if(a._min=0,a._max=0,e=[],a._hasMeasure()){var b=!1;this.series.forEach(function(c){if(c._deepMatch(a)){var d=c._axisBounds(a.position);a._min>d.min&&(a._min=d.min),a._max<d.max&&(a._max=d.max),b=!0}},this),b||this._getAllData().forEach(function(b){a._min>b[a.measure]&&(a._min=b[a.measure]),a._max<b[a.measure]&&(a._max=b[a.measure])},this)}else a._hasTimeField()?(a._min=null,a._max=null,this.series.forEach(function(b){b._deepMatch(a)&&null!==b[a.position].timeField&&void 0!==b[a.position].timeField&&e.indexOf(b[a.position].timeField)===-1&&e.push(b[a.position].timeField)},this),a._getAxisData().forEach(function(b){e.forEach(function(c){var d=a._parseDate(b[c]);(null===a._min||d<a._min)&&(a._min=d),(null===a._max||d>a._max)&&(a._max=d)},this)},this)):a._hasCategories()&&(a._min=0,d=[],this.series.forEach(function(b){b._deepMatch(a)&&null!==b[a.position].categoryFields[0]&&void 0!==b[a.position].categoryFields[0]&&e.indexOf(b[a.position].categoryFields[0])===-1&&e.push(b[a.position].categoryFields[0])},this),a._getAxisData().forEach(function(a){e.forEach(function(b){d.indexOf(a[b])===-1&&d.push(a[b])},this)},this),a._max=d.length);null!==a._slaves&&void 0!==a._slaves&&a._slaves.length>0&&a._slaves.forEach(function(b){b._min=a._min,b._max=a._max},this),a._update(),null===f&&"x"===a.position?f=a:null===g&&"y"===a.position&&(g=a)},this),this.axes.forEach(function(c){var d=!1,e=null,n=0,o=null,p=!1,q=0,r={l:null,t:null,r:null,b:null},s=0,t=0,u="",v=this,w=function(a){var c;return c=null===e||0===b||d?a:v._handleTransition(a,b,v)},x=function(){var b=a.select(this).selectAll("text");return!c.measure&&c._max>0&&("x"===c.position?b.attr("x",l/c._max/2):"y"===c.position&&b.attr("y",-1*(m/c._max)/2)),c.categoryFields&&c.categoryFields.length>0&&(c!==f||null!==g.categoryFields&&0!==g.categoryFields.length||b.attr("y",k+m-g._scale(0)+9),c!==g||null!==f.categoryFields&&0!==f.categoryFields.length||b.attr("x",-1*(f._scale(0)-j)-9)),this},y=function(b){return function(){var c=a.select(this).attr("class")||"";return c.indexOf(b)===-1&&(c+=" "+b),c.trim()}};null===c.gridlineShapes?(c.showGridlines||null===c.showGridlines&&!c._hasCategories()&&(!h&&"x"===c.position||!i&&"y"===c.position))&&(c.gridlineShapes=this._gridlines_group.append("g").attr("class","dimple-gridline"),"x"===c.position?h=!0:i=!0):"x"===c.position?h=!0:i=!0,null===c.shapes&&(c.shapes=this._axis_group.append("g").attr("class","dimple-axis dimple-axis-"+c.position).each(function(){v.noFormats||a.select(this).style("font-family",c.fontFamily).style("font-size",c._getFontSize())}),d=!0),c===f&&null!==g?(e="translate(0, "+(null===g.categoryFields||0===g.categoryFields.length?g._scale(0):k+m)+")",o="translate(0, "+(c===f?k+m:k)+")",n=-m):c===g&&null!==f?(e="translate("+(null===f.categoryFields||0===f.categoryFields.length?f._scale(0):j)+", 0)",o="translate("+(c===g?j:j+l)+", 0)",n=-l):"x"===c.position?(o=e="translate(0, "+(c===f?k+m:k)+")",n=-m):"y"===c.position&&(o=e="translate("+(c===g?j:j+l)+", 0)",n=-l),null!==e&&null!==c._draw&&(c._hasTimeField()?w(c.shapes).call(c._draw.ticks(c._getTimePeriod(),c.timeInterval).tickFormat(c._getFormat())).attr("transform",e).each(x):c.useLog?w(c.shapes).call(c._draw.ticks(4,c._getFormat())).attr("transform",e).each(x):w(c.shapes).call(c._draw.tickFormat(c._getFormat())).attr("transform",e).each(x),null!==c.gridlineShapes&&w(c.gridlineShapes).call(c._draw.tickSize(n,0,0).tickFormat("")).attr("transform",o)),w(c.shapes.selectAll("text")).attr("class",y(v.customClassList.axisLabel)).call(function(a){v.noFormats||a.style("font-family",c.fontFamily).style("font-size",c._getFontSize())}),w(c.shapes.selectAll("path, line")).attr("class",y(v.customClassList.axisLine)).call(function(a){v.noFormats||a.style("fill","none").style("stroke","black").style("shape-rendering","crispEdges")}),null!==c.gridlineShapes&&(c.gridlineShapes.selectAll("path").remove(),w(c.gridlineShapes.selectAll("line")).attr("class",y(v.customClassList.gridline)).call(function(a){v.noFormats||a.style("fill","none").style("stroke","lightgray").style("opacity",.8)})),null!==c.measure&&void 0!==c.measure||(c.autoRotateLabel?c===f?(q=0,c.shapes.selectAll("text").each(function(){var a=this.getComputedTextLength();q=a>q?a:q}),q>l/c.shapes.selectAll("text").nodes().length?(p=!0,c.shapes.selectAll("text").style("text-anchor","start").each(function(){var b=this.getBBox();a.select(this).attr("transform","rotate(90,"+b.x+","+(b.y+b.height/2)+") translate(-5, 0)")})):(p=!1,c.shapes.selectAll("text").style("text-anchor","middle").attr("transform",""))):"x"===c.position&&(q=0,c.shapes.selectAll("text").each(function(){var a=this.getComputedTextLength();q=a>q?a:q}),q>l/c.shapes.selectAll("text").nodes().length?(p=!0,c.shapes.selectAll("text").style("text-anchor","end").each(function(){var b=this.getBBox();a.select(this).attr("transform","rotate(90,"+(b.x+b.width)+","+(b.y+b.height/2)+") translate(5, 0)")})):(p=!1,c.shapes.selectAll("text").style("text-anchor","middle").attr("transform",""))):(p=!1,c.shapes.selectAll("text").style("text-anchor","middle").attr("transform",""))),null!==c.titleShape&&void 0!==c.titleShape&&c.titleShape.remove(),c.shapes.selectAll("text").each(function(){var a=this.getBBox();(null===r.l||-9-a.width<r.l)&&(r.l=-9-a.width),(null===r.r||a.x+a.width>r.r)&&(r.r=a.x+a.width),p?((null===r.t||a.y+a.height-a.width<r.t)&&(r.t=a.y+a.height-a.width),(null===r.b||a.height+a.width>r.b)&&(r.b=a.height+a.width)):((null===r.t||a.y<r.t)&&(r.t=a.y),(null===r.b||9+a.height>r.b)&&(r.b=9+a.height))}),"x"===c.position?(t=c===f?k+m+r.b+5:k+r.t-10,s=j+l/2):"y"===c.position&&(s=c===g?j+r.l-10:j+l+r.r+20,t=k+m/2,u="rotate(270, "+s+", "+t+")"),c.hidden||"x"!==c.position&&"y"!==c.position||null===c.title||(c.titleShape=this._axis_group.append("text").attr("class","dimple-axis dimple-title "+v.customClassList.axisTitle+" dimple-axis-"+c.position),c.titleShape.attr("x",s).attr("y",t).attr("text-anchor","middle").attr("transform",u).text(void 0!==c.title?c.title:null===c.categoryFields||void 0===c.categoryFields||0===c.categoryFields.length?c.measure:c.categoryFields.join("/")).each(function(){v.noFormats||a.select(this).style("font-family",c.fontFamily).style("font-size",c._getFontSize())}),c===f?c.titleShape.each(function(){a.select(this).attr("y",t+this.getBBox().height/1.65)}):c===g&&c.titleShape.each(function(){a.select(this).attr("x",s+this.getBBox().height/1.65)}))},this),this.series.forEach(function(a){a.plot.draw(this,a,b),this._registerEventHandlers(a)},this),this.legends.forEach(function(a){a._draw()},this),this.storyboard&&(this.storyboard._drawText(),this.storyboard.autoplay&&this.storyboard.startAnimation()),this},this.getClass=function(a){return this._assignedClasses[a]||(this._assignedClasses[a]=this.customClassList.colorClasses[this._nextClass],this._nextClass=(this._nextClass+1)%this.customClassList.colorClasses.length),this._assignedClasses[a]},this.getColor=function(a){return null!==this._assignedColors[a]&&void 0!==this._assignedColors[a]||(this._assignedColors[a]=this.defaultColors[this._nextColor],this._nextColor=(this._nextColor+1)%this.defaultColors.length),this._assignedColors[a]},this.setBounds=function(a,c,d,e){return this.x=a,this.y=c,this.width=d,this.height=e,this._xPixels=function(){return b._parseXPosition(this.x,this.svg.node())},this.draw(0,!0),this._yPixels=function(){return b._parseYPosition(this.y,this.svg.node())},this._widthPixels=function(){return b._parseXPosition(this.width,this.svg.node())},this._heightPixels=function(){return b._parseYPosition(this.height,this.svg.node())},this},this.setMargins=function(a,c,d,e){return this.x=a,this.y=c,this.width=0,this.height=0,this._xPixels=function(){return b._parseXPosition(this.x,this.svg.node());
},this._yPixels=function(){return b._parseYPosition(this.y,this.svg.node())},this._widthPixels=function(){return b._parentWidth(this.svg.node())-this._xPixels()-b._parseXPosition(d,this.svg.node())},this._heightPixels=function(){return b._parentHeight(this.svg.node())-this._yPixels()-b._parseYPosition(e,this.svg.node())},this},this.setStoryboard=function(a,c){return this.storyboard=new b.storyboard(this,a),null!==c&&void 0!==c&&(this.storyboard.onTick=c),this.storyboard}},b.color=function(b,c,d){this.fill=b,this.stroke=null===c||void 0===c?a.rgb(b).darker(.5).toString():c,this.opacity=null===d||void 0===d?.8:d},b.eventArgs=function(){this.seriesValue=null,this.xValue=null,this.yValue=null,this.zValue=null,this.pValue=null,this.colorValue=null,this.frameValue=null,this.seriesShapes=null,this.selectedShape=null},b.legend=function(c,d,e,f,g,h,i){this.chart=c,this.series=i,this.x=d,this.y=e,this.width=f,this.height=g,this.horizontalAlign=h,this.shapes=null,this.fontSize="10px",this.fontFamily="sans-serif",this._draw=function(){var c,d=this._getEntries(),e=0,f=0,g=0,h=0,i=15,j=9,k=5,l=this;this.shapes&&this.shapes.remove(),c=this.chart._group.selectAll(".dimple-dont-select-any").data(d).enter().append("g").attr("class",function(a){return"dimple-legend "+b._createClass(a.aggField)}).attr("opacity",1),c.append("text").attr("class",function(a){return"dimple-legend dimple-legend-text "+b._createClass(a.aggField)+" "+l.chart.customClassList.legendLabel}).text(function(a){return a.key}).call(function(a){l.chart.noFormats||a.style("font-family",l.fontFamily).style("font-size",l._getFontSize()).style("shape-rendering","crispEdges")}).each(function(){var a=this.getBBox();a.width>e&&(e=a.width),a.height>f&&(f=a.height)}),c.append("rect").attr("class",function(a){return"dimple-legend dimple-legend-key "+b._createClass(a.aggField)}).attr("height",j).attr("width",i),f=(f<j?j:f)+l._getVerticalPadding(),e+=i+l._getHorizontalPadding(),c.each(function(c){g+e>l._widthPixels()&&(g=0,h+=f),h>l._heightPixels()?a.select(this).remove():(a.select(this).select("text").attr("x","left"===l.horizontalAlign?l._xPixels()+i+k+g:l._xPixels()+(l._widthPixels()-g-e)+i+k).attr("y",function(){return l._yPixels()+h+this.getBBox().height/1.65}).attr("width",l._widthPixels()).attr("height",l._heightPixels()),a.select(this).select("rect").attr("class",function(a){return"dimple-legend dimple-legend-key "+b._createClass(a.aggField)+" "+l.chart.customClassList.legendKey+" "+a.css}).attr("x","left"===l.horizontalAlign?l._xPixels()+g:l._xPixels()+(l._widthPixels()-g-e)).attr("y",l._yPixels()+h).attr("height",j).attr("width",i).call(function(a){l.chart.noFormats||a.style("fill",c.fill).style("stroke",c.stroke).style("opacity",c.opacity).style("shape-rendering","crispEdges")}),g+=e)}),this.shapes=c},this._getEntries=function(){var a=[];return this.series&&this.series.forEach(function(b){var c=b._positionData;c.forEach(function(c){var d,e=-1,f=b.plot.grouped&&!b.x._hasCategories()&&!b.y._hasCategories()&&c.aggField.length<2?"All":c.aggField.slice(-1)[0];for(d=0;d<a.length;d+=1)if(a[d].key===f){e=d;break}e===-1&&b.chart._assignedColors[f]&&(a.push({key:f,fill:b.chart._assignedColors[f].fill,stroke:b.chart._assignedColors[f].stroke,opacity:b.chart._assignedColors[f].opacity,css:b.chart._assignedClasses[f],series:b,aggField:c.aggField}),e=a.length-1)})},this),a},this._getFontSize=function(){var a;return a=this.fontSize&&"auto"!==this.fontSize.toString().toLowerCase()?isNaN(this.fontSize)?this.fontSize:this.fontSize+"px":(this.chart._heightPixels()/35>10?this.chart._heightPixels()/35:10)+"px"},this._getHorizontalPadding=function(){var a;return a=isNaN(this.horizontalPadding)?20:this.horizontalPadding},this._getVerticalPadding=function(){var a;return a=isNaN(this.verticalPadding)?2:this.verticalPadding},this._heightPixels=function(){return b._parseYPosition(this.height,this.chart.svg.node())},this._widthPixels=function(){return b._parseXPosition(this.width,this.chart.svg.node())},this._xPixels=function(){return b._parseXPosition(this.x,this.chart.svg.node())},this._yPixels=function(){return b._parseYPosition(this.y,this.chart.svg.node())}},b.series=function(a,b,c,d,e,f,g,h,i,j){this.chart=a,this.x=c,this.y=d,this.z=e,this.c=f,this.p=g,this.plot=h,this.categoryFields=b,this.aggregate=i,this.stacked=j,this.barGap=.2,this.clusterBarGap=.1,this.lineWeight=2,this.lineMarkers=!1,this.afterDraw=null,this.interpolation="linear",this.tooltipFontSize="10px",this.tooltipFontFamily="sans-serif",this.radius="auto",this._group=a._group.append("g"),this._group.attr("class","dimple-series-group-"+a.series.length),this._eventHandlers=[],this._positionData=[],this._orderRules=[],this._axisBounds=function(a){var b,c,d,e={min:0,max:0},f=null,g=null,h=[],i=0,j=this._positionData;return"x"===a?(f=this.x,g=this.y):"y"===a?(f=this.y,g=this.x):"z"===a?f=this.z:"p"===a?f=this.p:"c"===a&&(f=this.c),f.showPercent?j.forEach(function(a){a[f.position+"Bound"]<e.min&&(e.min=a[f.position+"Bound"]),a[f.position+"Bound"]>e.max&&(e.max=a[f.position+"Bound"])},this):null===g||null===g.categoryFields||0===g.categoryFields.length?j.forEach(function(a){!this._isStacked()||"x"!==f.position&&"y"!==f.position?(a[f.position+"Value"]<e.min&&(e.min=a[f.position+"Value"]),a[f.position+"Value"]>e.max&&(e.max=a[f.position+"Value"])):a[f.position+"Value"]<0?e.min=e.min+a[f.position+"Value"]:e.max=e.max+a[f.position+"Value"]},this):(b=f.position+"Value",c=g.position+"Field",d=[],j.forEach(function(a){var e=a[c].join("/"),f=d.indexOf(e);f===-1&&(d.push(e),f=d.length-1),void 0===h[f]&&(h[f]={min:0,max:0},f>=i&&(i=f+1)),this.stacked?a[b]<0?h[f].min=h[f].min+a[b]:h[f].max=h[f].max+a[b]:(a[b]<h[f].min&&(h[f].min=a[b]),a[b]>h[f].max&&(h[f].max=a[b]))},this),h.forEach(function(a){void 0!==a&&(a.min<e.min&&(e.min=a.min),a.max>e.max&&(e.max=a.max))},this)),e},this._deepMatch=function(a){var b=!1;return this[a.position]===a?b=!0:void 0!==a._slaves&&null!==a._slaves&&a._slaves.length>0&&a._slaves.forEach(function(a){b=b||this._deepMatch(a)},this),b},this._dropLineOrigin=function(){var a=0,b=0,c={x:null,y:null},d={x:null,y:null};return this.chart.axes.forEach(function(a){"x"===a.position&&null===d.x?a._hasTimeField()?d.x=this.chart._xPixels():d.x=a._origin:"y"===a.position&&null===d.y&&(a._hasTimeField()?d.y=this.chart._yPixels()+this.chart._heightPixels():d.y=a._origin)},this),this.chart.axes.forEach(function(e){"x"!==e.position||this.x.hidden?"y"!==e.position||this.y.hidden||(this._deepMatch(e)&&(0===b?c.x=d.x:1===b&&(c.x=this.chart._xPixels()+this.chart._widthPixels())),b+=1):(this._deepMatch(e)&&(0===a?c.y=d.y:1===a&&(c.y=this.chart._yPixels())),a+=1)},this),c},this._getTooltipFontSize=function(){var a;return a=this.tooltipFontSize&&"auto"!==this.tooltipFontSize.toString().toLowerCase()?isNaN(this.tooltipFontSize)?this.tooltipFontSize:this.tooltipFontSize+"px":(this.chart._heightPixels()/35>10?this.chart._heightPixels()/35:10)+"px"},this._isStacked=function(){return this.stacked&&(this.x._hasCategories()||this.y._hasCategories())},this.addEventHandler=function(a,b){this._eventHandlers.push({event:a,handler:b})},this.addOrderRule=function(a,b){this._orderRules.push({ordering:a,desc:b})},this.getTooltipText=function(a){var b=[];return null!==this.categoryFields&&void 0!==this.categoryFields&&this.categoryFields.length>0&&this.categoryFields.forEach(function(c,d){null!==c&&void 0!==c&&null!==a.aggField[d]&&void 0!==a.aggField[d]&&b.push(c+(a.aggField[d]!==c?": "+a.aggField[d]:""))},this),this.p?(this.x&&this.x._hasCategories()&&this.x._getTooltipText(b,a),this.y&&this.y._hasCategories()&&this.y._getTooltipText(b,a),this.z&&this.z._hasCategories()&&this.z._getTooltipText(b,a),this.p._getTooltipText(b,a)):(this.x&&this.x._getTooltipText(b,a),this.y&&this.y._getTooltipText(b,a),this.z&&this.z._getTooltipText(b,a)),this.c&&this.c._getTooltipText(b,a),b.filter(function(a,c){return b.indexOf(a)===c})}},b.storyboard=function(a,b){null!==b&&void 0!==b&&(b=[].concat(b)),this.chart=a,this.categoryFields=b,this.autoplay=!0,this.frameDuration=3e3,this.storyLabel=null,this.onTick=null,this.fontSize="10px",this.fontFamily="sans-serif",this._frame=0,this._animationTimer=null,this._categories=[],this._cachedCategoryFields=[],this._orderRules=[],this._drawText=function(){var b=this,c=0;b.storyLabel||(b.chart.axes.forEach(function(a){"x"===a.position&&(c+=1)},b),b.storyLabel=b.chart._group.append("text").attr("class","dimple-storyboard-label").attr("opacity",1).attr("x",b.chart._xPixels()+.01*b.chart._widthPixels()).attr("y",b.chart._yPixels()+(b.chart._heightPixels()/35>10?b.chart._heightPixels()/35:10)*(c>1?1.25:-1)).call(function(c){a.noFormats||c.style("font-family",b.fontFamily).style("font-size",b._getFontSize())})),b.storyLabel.text(b.categoryFields.join("\\")+": "+b.getFrameValue())},this._getCategories=function(){return this._categoryFields!==this._cachedCategoryFields&&(this._categories=[],this.chart._getAllData().forEach(function(a){var b=-1,c="";null!==this.categoryFields&&(this.categoryFields.forEach(function(b,d){d>0&&(c+="/"),c+=a[b]},this),b=this._categories.indexOf(c),b===-1&&(this._categories.push(c),b=this._categories.length-1))},this),this._cachedCategoryFields=this._categoryFields),this._categories},this._getFontSize=function(){var a;return a=this.fontSize&&"auto"!==this.fontSize.toString().toLowerCase()?isNaN(this.fontSize)?this.fontSize:this.fontSize+"px":(this.chart._heightPixels()/35>10?this.chart._heightPixels()/35:10)+"px"},this._goToFrameIndex=function(a){this._frame=a%this._getCategories().length,this.chart.draw(this.frameDuration/2)},this.addOrderRule=function(a,b){this._orderRules.push({ordering:a,desc:b})},this.getFrameValue=function(){var a=null;return this._frame>=0&&this._getCategories().length>this._frame&&(a=this._getCategories()[this._frame]),a},this.goToFrame=function(a){if(this._getCategories().length>0){var b=this._getCategories().indexOf(a);this._goToFrameIndex(b)}},this.pauseAnimation=function(){null!==this._animationTimer&&(window.clearInterval(this._animationTimer),this._animationTimer=null)},this.startAnimation=function(){null===this._animationTimer&&(null!==this.onTick&&this.onTick(this.getFrameValue()),this._animationTimer=window.setInterval(function(a){return function(){a._goToFrameIndex(a._frame+1),null!==a.onTick&&a.onTick(a.getFrameValue()),a._drawText(a.frameDuration/2)}}(this),this.frameDuration))},this.stopAnimation=function(){null!==this._animationTimer&&(window.clearInterval(this._animationTimer),this._animationTimer=null,this._frame=0)}},b.aggregateMethod.avg=function(a,b){return a.value=null===a.value||void 0===a.value?0:parseFloat(a.value),a.count=null===a.count||void 0===a.count?1:parseFloat(a.count),b.value=null===b.value||void 0===b.value?0:parseFloat(b.value),b.count=null===b.count||void 0===b.count?1:parseFloat(b.count),(a.value*a.count+b.value*b.count)/(a.count+b.count)},b.aggregateMethod.count=function(a,b){return a.count=null===a.count||void 0===a.count?0:parseFloat(a.count),b.count=null===b.count||void 0===b.count?0:parseFloat(b.count),a.count+b.count},b.aggregateMethod.max=function(a,b){return a.value=null===a.value||void 0===a.value?0:parseFloat(a.value),b.value=null===b.value||void 0===b.value?0:parseFloat(b.value),a.value>b.value?a.value:b.value},b.aggregateMethod.min=function(a,b){return null===a.value?parseFloat(b.value):parseFloat(a.value)<parseFloat(b.value)?parseFloat(a.value):parseFloat(b.value)},b.aggregateMethod.sum=function(a,b){return a.value=null===a.value||void 0===a.value?0:parseFloat(a.value),b.value=null===b.value||void 0===b.value?0:parseFloat(b.value),a.value+b.value},b.plot.area={stacked:!0,grouped:!0,supportedAxes:["x","y","c"],draw:function(c,d,e){var f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D=d._positionData,E=[],F=null,G="dimple-series-"+c.series.indexOf(d),H=d.x._hasCategories()||d.y._hasCategories()?0:1,I=!1,J={},K=[],L=[],M=function(){return function(c,d,e,f){a.select(d).style("opacity",1),b._showPointTooltip(c,d,e,f)}},N=function(c){return function(d,e,f,g){a.select(e).style("opacity",g.lineMarkers||c.data.length<2?b._helpers.opacity(d,f,g):0),b._removeTooltip(d,e,f,g)}},O=function(a,f){b._drawMarkers(a,c,d,e,G,I,M(a),N(a),f)},P=function(a,e){var f;return"step"===d.interpolation&&d[a]._hasCategories()?(f=b._helpers[a](e,c,d)+("y"===a?b._helpers.height(e,c,d):0),d[a].categoryFields.length<2&&(f+=("y"===a?1:-1)*b._helpers[a+"Gap"](c,d))):f=b._helpers["c"+a](e,c,d),parseFloat(f)},Q=function(c,e){var f=a.line().x(function(a){return d.x._hasCategories()||!e?a.x:d.x[e]}).y(function(a){return d.y._hasCategories()||!e?a.y:d.y[e]});return b._interpolate(f,c),f},R=function(a,b){return parseFloat(a)-parseFloat(b)},S=function(a,b){return parseFloat(a.x)-parseFloat(b.x)},T=function(a,b,c){var d,e,f=b[b.length-1],g=9999,h=f;for(d=0;d<a.length;d+=1)a[d].x===f.x&&a[d].y===f.y||(e=180-Math.atan2(a[d].x-f.x,a[d].y-f.y)*(180/Math.PI),e>c&&e<g&&(h=a[d],g=e));return b.push(h),g};for(f="step"===d.interpolation?"step-after":d.interpolation,p=b._getSeriesOrder(d.data||c.data,d),d.c&&(d.x._hasCategories()&&d.y._hasMeasure()||d.y._hasCategories()&&d.x._hasMeasure())&&(I=!0),d.x._hasCategories()?(B="x",C="y"):d.y._hasCategories()&&(B="y",C="x"),g=0;g<D.length;g+=1){for(j=[],l=-1,i=H;i<D[g].aggField.length;i+=1)j.push(D[g].aggField[i]);for(k=b._createClass(j),i=0;i<E.length;i+=1)if(E[i].keyString===k){l=i;break}l===-1&&(l=E.length,E.push({key:j,keyString:k,color:"white",data:[],points:[],area:{},entry:{},exit:{},group:B&&D[g][B+"Field"]&&D[g][B+"Field"].length>=2?D[g][B+"Field"][0]:"All"})),E[l].data.push(D[g])}for(p&&E.sort(function(a,c){return b._arrayIndexCompare(p,a.key,c.key)}),g=0;g<E.length;g+=1){for(E[g].data.sort(b._getSeriesSortPredicate(c,d,p)),h=0;h<E[g].data.length;h+=1)E[g].points.push({x:P("x",E[g].data[h]),y:P("y",E[g].data[h])}),B&&(J[E[g].group]||(J[E[g].group]={}),J[E[g].group][E[g].points[E[g].points.length-1][B]]=d[C]._origin);q=E[g].points,"step"===d.interpolation&&q.length>1&&B&&(d.x._hasCategories()?(q.push({x:2*q[q.length-1].x-q[q.length-2].x,y:q[q.length-1].y}),J[E[g].group][q[q.length-1][B]]=d[C]._origin):d.y._hasCategories()&&(q=[{x:q[0].x,y:2*q[0].y-q[1].y}].concat(q),J[E[g].group][q[0][B]]=d[C]._origin,E[g].points=q))}for(t in J)if(J.hasOwnProperty(t)){K[t]=[];for(u in J[t])J[t].hasOwnProperty(u)&&K[t].push(parseFloat(u));K[t].sort(R)}for(g=0;g<E.length;g+=1){if(q=E[g].points,v=E[g].group,r=[],L=[],I&&b._addGradient(E[g].key,"fill-area-gradient-"+E[g].keyString,d.x._hasCategories()?d.x:d.y,D,c,e,"fill"),K[v]&&K[v].length>0)for(h=0,i=0;h<K[v].length;h+=1)K[v][h]>=q[0][B]&&K[v][h]<=q[q.length-1][B]&&(s={},s[B]=K[v][h],s[C]=J[v][K[v][h]],r.push(s),q[i][B]>K[v][h]?L.push(s):(L.push(q[i]),J[E[g].group][K[v][h]]=q[i][C],i+=1));else if(d._orderRules&&d._orderRules.length>0)L=q.concat(q[0]);else{q=q.sort(S),L.push(q[0]),A=0;do A=T(q,L,A);while(L.length<=q.length&&(L[0].x!==L[L.length-1].x||L[0].y!==L[L.length-1].y))}r=r.reverse(),w=Q(f,"_previousOrigin")(L),x=Q("step-after"===f?"step-before":"step-before"===f?"step-after":f,"_previousOrigin")(r),y=Q("linear","_previousOrigin")(L),z=y.indexOf("L")===-1?void 0:y.indexOf("L"),E[g].entry=w+(x&&x.length>0?"L"+x.substring(1):"")+(y&&y.length>0?"L"+y.substring(1,z):0),w=Q(f)(L),x=Q("step-after"===f?"step-before":"step-before"===f?"step-after":f)(r),y=Q("linear")(L),z=y.indexOf("L")===-1?void 0:y.indexOf("L"),E[g].update=w+(x&&x.length>0?"L"+x.substring(1):"")+(y&&y.length>0?"L"+y.substring(1,z):0),w=Q(f,"_origin")(L),x=Q("step-after"===f?"step-before":"step-before"===f?"step-after":f,"_origin")(r),y=Q("linear","_origin")(L),z=y.indexOf("L")===-1?void 0:y.indexOf("L"),E[g].exit=w+(x&&x.length>0?"L"+x.substring(1):"")+(y&&y.length>0?"L"+y.substring(1,z):0),E[g].color=c.getColor(E[g].key.length>0?E[g].key[E[g].key.length-1]:"All"),E[g].css=c.getClass(E[g].key.length>0?E[g].key[E[g].key.length-1]:"All")}c._tooltipGroup&&c._tooltipGroup.remove(),F=d.shapes?d.shapes.data(E,function(a){return a.key}):d._group.selectAll("."+G).data(E,function(a){return a.key}),m=F.enter().append("path").attr("id",function(a){return b._createClass([a.key])}).attr("class",function(a){return G+" dimple-line "+a.keyString+" "+c.customClassList.areaSeries+" "+a.css}).attr("d",function(a){return a.entry}).call(function(a){c.noFormats||a.attr("opacity",function(a){return I?1:a.color.opacity}).style("fill",function(a){return I?"url(#"+b._createClass(["fill-area-gradient-"+a.keyString])+")":a.color.fill}).style("stroke",function(a){return I?"url(#"+b._createClass(["stroke-area-gradient-"+a.keyString])+")":a.color.stroke}).style("stroke-width",d.lineWeight)}).each(function(a){a.markerData=a.data,O(a,this)}),n=c._handleTransition(F.merge(m),e,c).attr("d",function(a){return a.update}).each(function(a){a.markerData=a.data,O(a,this)}),o=c._handleTransition(F.exit(),e,c).attr("d",function(a){return a.exit}).each(function(a){a.markerData=[],O(a,this)}),b._postDrawHandling(d,n,o,e),d.shapes=d._group.selectAll("."+G)}},b.plot.bar={stacked:!0,grouped:!1,supportedAxes:["x","y","c"],draw:function(a,c,d){var e,f,g,h=c._positionData,i=null,j=["dimple-series-"+a.series.indexOf(c),"dimple-bar"],k=!c._isStacked()&&c.x._hasMeasure(),l=!c._isStacked()&&c.y._hasMeasure(),m="none";c.x._hasCategories()&&c.y._hasCategories()?m="both":c.x._hasCategories()?m="x":c.y._hasCategories()&&(m="y"),a._tooltipGroup&&a._tooltipGroup.remove(),i=c.shapes?c.shapes.data(h,function(a){return a.key}):c._group.selectAll("."+j.join(".")).data(h,function(a){return a.key}),e=i.enter().append("rect").attr("id",function(a){return b._createClass([a.key])}).attr("class",function(c){var d=[];return d=d.concat(c.aggField),d=d.concat(c.xField),d=d.concat(c.yField),j.join(" ")+" "+b._createClass(d)+" "+a.customClassList.barSeries+" "+b._helpers.css(c,a)}).attr("x",function(d){var e=c.x._previousOrigin;return"x"===m?e=b._helpers.x(d,a,c):"both"===m&&(e=b._helpers.cx(d,a,c)),e}).attr("y",function(d){var e=c.y._previousOrigin;return"y"===m?e=b._helpers.y(d,a,c):"both"===m&&(e=b._helpers.cy(d,a,c)),e}).attr("width",function(d){return"x"===m?b._helpers.width(d,a,c):0}).attr("height",function(d){return"y"===m?b._helpers.height(d,a,c):0}).on("mouseover",function(d){b._showBarTooltip(d,this,a,c)}).on("mouseleave",function(d){b._removeTooltip(d,this,a,c)}).call(function(d){a.noFormats||d.attr("opacity",function(d){return b._helpers.opacity(d,a,c)}).style("fill",function(d){return b._helpers.fill(d,a,c)}).style("stroke",function(d){return b._helpers.stroke(d,a,c)})}),f=a._handleTransition(i.merge(e),d,a,c).attr("x",function(d){return k?b._helpers.cx(d,a,c)-c.x.floatingBarWidth/2:b._helpers.x(d,a,c)}).attr("y",function(d){return l?b._helpers.cy(d,a,c)-c.y.floatingBarWidth/2:b._helpers.y(d,a,c)}).attr("width",function(d){return k?c.x.floatingBarWidth:b._helpers.width(d,a,c)}).attr("height",function(d){return l?c.y.floatingBarWidth:b._helpers.height(d,a,c)}).call(function(d){a.noFormats||d.attr("fill",function(d){return b._helpers.fill(d,a,c)}).attr("stroke",function(d){return b._helpers.stroke(d,a,c)})}),g=a._handleTransition(i.exit(),d,a,c).attr("x",function(d){var e=c.x._origin;return"x"===m?e=b._helpers.x(d,a,c):"both"===m&&(e=b._helpers.cx(d,a,c)),e}).attr("y",function(d){var e=c.y._origin;return"y"===m?e=b._helpers.y(d,a,c):"both"===m&&(e=b._helpers.cy(d,a,c)),e}).attr("width",function(d){return"x"===m?b._helpers.width(d,a,c):0}).attr("height",function(d){return"y"===m?b._helpers.height(d,a,c):0}),b._postDrawHandling(c,f,g,d),c.shapes=c._group.selectAll("."+j.join("."))}},b.plot.bubble={stacked:!1,grouped:!1,supportedAxes:["x","y","z","c"],draw:function(a,c,d){var e,f,g,h=c._positionData,i=null,j=["dimple-series-"+a.series.indexOf(c),"dimple-bubble"];a._tooltipGroup&&a._tooltipGroup.remove(),i=c.shapes?c.shapes.data(h,function(a){return a.key}):c._group.selectAll("."+j.join(".")).data(h,function(a){return a.key}),e=i.enter().append("circle").attr("id",function(a){return b._createClass([a.key])}).attr("class",function(c){var d=[];return d=d.concat(c.aggField),d=d.concat(c.xField),d=d.concat(c.yField),d=d.concat(c.zField),j.join(" ")+" "+b._createClass(d)+" "+a.customClassList.bubbleSeries+" "+b._helpers.css(c,a)}).attr("cx",function(d){return c.x._hasCategories()?b._helpers.cx(d,a,c):c.x._previousOrigin}).attr("cy",function(d){return c.y._hasCategories()?b._helpers.cy(d,a,c):c.y._previousOrigin}).attr("r",0).on("mouseover",function(d){b._showPointTooltip(d,this,a,c)}).on("mouseleave",function(d){b._removeTooltip(d,this,a,c)}).call(function(d){a.noFormats||d.attr("opacity",function(d){return b._helpers.opacity(d,a,c)}).style("fill",function(d){return b._helpers.fill(d,a,c)}).style("stroke",function(d){return b._helpers.stroke(d,a,c)})}),f=a._handleTransition(i.merge(e),d,a,c).attr("cx",function(d){return b._helpers.cx(d,a,c)}).attr("cy",function(d){return b._helpers.cy(d,a,c)}).attr("r",function(d){return b._helpers.r(d,a,c)}).call(function(d){a.noFormats||d.attr("fill",function(d){return b._helpers.fill(d,a,c)}).attr("stroke",function(d){return b._helpers.stroke(d,a,c)})}),g=a._handleTransition(i.exit(),d,a,c).attr("r",0).attr("cx",function(d){return c.x._hasCategories()?b._helpers.cx(d,a,c):c.x._origin}).attr("cy",function(d){return c.y._hasCategories()?b._helpers.cy(d,a,c):c.y._origin}),b._postDrawHandling(c,f,g,d),c.shapes=c._group.selectAll("."+j.join("."))}},b.plot.line={stacked:!1,grouped:!0,supportedAxes:["x","y","c"],draw:function(c,d,e){var f,g,h,i,j,k,l,m,n,o,p,q=d._positionData,r=[],s=null,t="dimple-series-"+c.series.indexOf(d),u=d.x._hasCategories()||d.y._hasCategories()?0:1,v=!1,w=function(){return function(c,d,e,f){a.select(d).style("opacity",1),b._showPointTooltip(c,d,e,f)}},x=function(c){return function(d,e,f,g){a.select(e).style("opacity",g.lineMarkers||c.data.length<2?b._helpers.opacity(d,f,g):0),b._removeTooltip(d,e,f,g)}},y=function(a,f){b._drawMarkers(a,c,d,e,t,v,w(a),x(a),f)},z=function(a,e){var f;return"step"===d.interpolation&&d[a]._hasCategories()?(d.barGap=0,d.clusterBarGap=0,f=b._helpers[a](e,c,d)+("y"===a?b._helpers.height(e,c,d):0)):f=b._helpers["c"+a](e,c,d),parseFloat(f.toFixed(1))},A=function(c,e){var f=a.line().x(function(a){return d.x._hasCategories()||!e?a.x:d.x[e]}).y(function(a){return d.y._hasCategories()||!e?a.y:d.y[e]});return b._interpolate(f,c),f};for(f="step"===d.interpolation?"step-after":d.interpolation,p=b._getSeriesOrder(d.data||c.data,d),d.c&&(d.x._hasCategories()&&d.y._hasMeasure()||d.y._hasCategories()&&d.x._hasMeasure())&&(v=!0),g=0;g<q.length;g+=1){for(j=[],l=-1,i=u;i<q[g].aggField.length;i+=1)j.push(q[g].aggField[i]);for(k=b._createClass(j),i=0;i<r.length;i+=1)if(r[i].keyString===k){l=i;break}l===-1&&(l=r.length,r.push({key:j,keyString:k,color:"white",data:[],markerData:[],points:[],line:{},entry:{},exit:{}})),r[l].data.push(q[g])}for(p&&r.sort(function(a,c){return b._arrayIndexCompare(p,a.key,c.key)}),g=0;g<r.length;g+=1){for(r[g].data.sort(b._getSeriesSortPredicate(c,d,p)),v&&b._addGradient(r[g].key,"fill-line-gradient-"+r[g].keyString,d.x._hasCategories()?d.x:d.y,q,c,e,"fill"),h=0;h<r[g].data.length;h+=1)r[g].points.push({x:z("x",r[g].data[h]),y:z("y",r[g].data[h])});"step"===d.interpolation&&r[g].points.length>1&&(d.x._hasCategories()?r[g].points.push({x:2*r[g].points[r[g].points.length-1].x-r[g].points[r[g].points.length-2].x,y:r[g].points[r[g].points.length-1].y}):d.y._hasCategories()&&(r[g].points=[{x:r[g].points[0].x,y:2*r[g].points[0].y-r[g].points[1].y}].concat(r[g].points))),r&&r[g]&&r[g].points&&1===r[g].points.length&&r[g].points.push({x:r[g].points[0].x,y:r[g].points[0].y}),r[g].entry=A(f,"_previousOrigin")(r[g].points),r[g].update=A(f)(r[g].points),r[g].exit=A(f,"_origin")(r[g].points),r[g].color=c.getColor(r[g].key.length>0?r[g].key[r[g].key.length-1]:"All"),r[g].css=c.getClass(r[g].key.length>0?r[g].key[r[g].key.length-1]:"All")}c._tooltipGroup&&c._tooltipGroup.remove(),s=d.shapes?d.shapes.data(r,function(a){return a.key}):d._group.selectAll("."+t).data(r,function(a){return a.key}),m=s.enter().append("path").attr("id",function(a){return b._createClass([a.key])}).attr("class",function(a){return t+" dimple-line "+a.keyString+" "+c.customClassList.lineSeries+" "+a.css}).attr("d",function(a){return a.entry}).call(function(a){c.noFormats||a.attr("opacity",function(a){return v?1:a.color.opacity}).style("fill","none").style("stroke",function(a){return v?"url(#"+b._createClass(["fill-line-gradient-"+a.keyString])+")":a.color.stroke}).style("stroke-width",d.lineWeight)}).each(function(a){a.markerData=a.data,y(a,this)}),n=c._handleTransition(s.merge(m),e,c).attr("d",function(a){return a.update}).each(function(a){a.markerData=a.data,y(a,this)}),o=c._handleTransition(s.exit(),e,c).attr("d",function(a){return a.exit}).each(function(a){a.markerData=[],y(a,this)}),b._postDrawHandling(d,n,o,e),d.shapes=d._group.selectAll("."+t)}},b.plot.pie={stacked:!1,grouped:!1,supportedAxes:["x","y","c","z","p"],draw:function(c,d,e){var f,g,h,i=d._positionData,j=null,k=["dimple-series-"+c.series.indexOf(d),"dimple-pie"],l=function(a){var e;return e=d.x&&d.y?b._helpers.r(a,c,d):c._widthPixels()<c._heightPixels()?c._widthPixels()/2:c._heightPixels()/2},m=function(a){var c=l(a);return d.outerRadius&&(c=b._parsePosition(d.outerRadius,c)),Math.max(c,0)},n=function(a){var c=0;return d.innerRadius&&(c=b._parsePosition(d.innerRadius,l(a))),Math.max(c,0)},o=function(b){var c;return(c=a.arc().innerRadius(n(b)).outerRadius(m(b)))(b)},p=function(b){b.innerRadius=n(b),b.outerRadius=m(b);var c,d=a.interpolate(this._current,b);return c=a.arc().innerRadius(function(a){return a.innerRadius}).outerRadius(function(a){return a.outerRadius}),this._current=d(0),function(a){return c(d(a))}},q=function(a){return function(e){var f,g;return d.x&&d.y?(f=!a||d.x._hasCategories()?b._helpers.cx(e,c,d):d.x._previousOrigin,g=!a||d.y._hasCategories()?b._helpers.cy(e,c,d):d.y._previousOrigin):(f=c._xPixels()+c._widthPixels()/2,g=c._yPixels()+c._heightPixels()/2),"translate("+f+","+g+")"}};c._tooltipGroup&&c._tooltipGroup.remove(),j=d.shapes?d.shapes.data(i,function(a){return a.key}):d._group.selectAll("."+k.join(".")).data(i,function(a){return a.key}),f=j.enter().append("path").attr("id",function(a){return b._createClass([a.key])}).attr("class",function(a){var d=[];return d=d.concat(a.aggField),d=d.concat(a.pField),k.join(" ")+" "+b._createClass(d)+" "+c.customClassList.pieSeries+" "+b._helpers.css(a,c)}).attr("d",o).on("mouseover",function(a){b._showBarTooltip(a,this,c,d)}).on("mouseleave",function(a){b._removeTooltip(a,this,c,d)}).call(function(a){c.noFormats||a.attr("opacity",function(a){return b._helpers.opacity(a,c,d)}).style("fill",function(a){return b._helpers.fill(a,c,d)}).style("stroke",function(a){return b._helpers.stroke(a,c,d)})}).attr("transform",q(!0)).each(function(a){this._current=a,a.innerRadius=n(a),a.outerRadius=m(a)}),g=c._handleTransition(j.merge(f),e,c,d).call(function(a){e&&e>0?a.attrTween("d",p):a.attr("d",o),c.noFormats||a.attr("fill",function(a){return b._helpers.fill(a,c,d)}).attr("stroke",function(a){return b._helpers.stroke(a,c,d)})}).attr("transform",q(!1)),h=c._handleTransition(j.exit(),e,c,d).attr("transform",q(!0)).attr("d",o),b._postDrawHandling(d,g,h,e),d.shapes=d._group.selectAll("."+k.join("."))}},b._addGradient=function(a,c,d,e,f,g,h){var i=[].concat(a),j=f.svg.select("#"+b._createClass([c])),k=[],l=d.position+"Field",m=!0,n=[];e.forEach(function(a){k.indexOf(a[l])===-1&&a.aggField.join("_")===i.join("_")&&k.push(a[l])},this),k=k.sort(function(a,b){return d._scale(a)-d._scale(b)}),null===j.node()&&(m=!1,j=f.svg.append("defs").append("linearGradient").attr("id",b._createClass([c])).attr("gradientUnits","userSpaceOnUse").attr("x1","x"===d.position?d._scale(k[0])+f._widthPixels()/k.length/2:0).attr("y1","y"===d.position?d._scale(k[0])-f._heightPixels()/k.length/2:0).attr("x2","x"===d.position?d._scale(k[k.length-1])+f._widthPixels()/k.length/2:0).attr("y2","y"===d.position?d._scale(k[k.length-1])-f._heightPixels()/k.length/2:0)),k.forEach(function(a,b){var c={},d=0;for(d=0;d<e.length;d+=1)if(e[d].aggField.join("_")===i.join("_")&&e[d][l].join("_")===a.join("_")){c=e[d];break}n.push({offset:Math.round(b/(k.length-1)*100)+"%",color:c[h]})},this),m?f._handleTransition(j.selectAll("stop").data(n),g,f).attr("offset",function(a){return a.offset}).attr("stop-color",function(a){return a.color}):j.selectAll("stop").data(n).enter().append("stop").attr("offset",function(a){return a.offset}).attr("stop-color",function(a){return a.color})},b._arrayIndexCompare=function(a,b,c){var d,e,f,g,h,i;for(e=0;e<a.length;e+=1){for(g=!0,h=!0,i=[].concat(a[e]),f=0;f<b.length;f+=1)g=g&&b[f]===i[f];for(f=0;f<c.length;f+=1)h=h&&c[f]===i[f];if(g||h){d=g&&h?0:g?-1:1;break}}return d},b._createClass=function(a){var b,c,d=[];if(c=function(a){var b=a.charCodeAt(0),c="-";return b>=65&&b<=90&&(c=a.toLowerCase()),c},a.length>0)for(b=0;b<a.length;b+=1)a[b]&&d.push("dimple-"+a[b].toString().replace(/[^a-z0-9]/g,c));else d=["dimple-all"];return d.join(" ")},b._drawMarkerBacks=function(c,d,e,f,g,h){var i,j,k,l=["dimple-marker-back",g,c.keyString];e.lineMarkers&&(i=null===e._markerBacks||void 0===e._markerBacks||void 0===e._markerBacks[c.keyString]?e._group.selectAll("."+l.join(".")).data(c.markerData):e._markerBacks[c.keyString].data(c.markerData,function(a){return a.key}),k=h.nextSibling&&h.nextSibling.id?i.enter().insert("circle","#"+h.nextSibling.id):i.enter().append("circle"),k.attr("id",function(a){return b._createClass([a.key+" Marker Back"])}).attr("class",function(a){var c=[];return e.x._hasCategories()&&(c=c.concat(a.xField)),e.y._hasCategories()&&(c=c.concat(a.yField)),b._createClass(c)+" "+l.join(" ")}).attr("cx",function(a){return e.x._hasCategories()?b._helpers.cx(a,d,e):e.x._previousOrigin}).attr("cy",function(a){return e.y._hasCategories()?b._helpers.cy(a,d,e):e.y._previousOrigin}).attr("r",0).attr("fill","white").attr("stroke","none"),d._handleTransition(i.merge(k),f,d).attr("cx",function(a){return b._helpers.cx(a,d,e)}).attr("cy",function(a){return b._helpers.cy(a,d,e)}).attr("r",2+e.lineWeight),j=d._handleTransition(i.exit(),f,d).attr("cx",function(a){return e.x._hasCategories()?b._helpers.cx(a,d,e):e.x._origin}).attr("cy",function(a){return e.y._hasCategories()?b._helpers.cy(a,d,e):e.y._origin}).attr("r",0),0===f?j.remove():j.each("end",function(){a.select(this).remove()}),void 0!==e._markerBacks&&null!==e._markerBacks||(e._markerBacks={}),e._markerBacks[c.keyString]=i)},b._drawMarkers=function(c,d,e,f,g,h,i,j,k){var l,m,n,o=["dimple-marker",g,c.keyString];l=null===e._markers||void 0===e._markers||void 0===e._markers[c.keyString]?e._group.selectAll("."+o.join(".")).data(c.markerData):e._markers[c.keyString].data(c.markerData,function(a){return a.key}),n=k.nextSibling&&k.nextSibling.id?l.enter().insert("circle","#"+k.nextSibling.id):l.enter().append("circle"),n.attr("id",function(a){return b._createClass([a.key+" Marker"])}).attr("class",function(a){var c=[],f=d.getClass(a.aggField.length>0?a.aggField[a.aggField.length-1]:"All");return e.x._hasCategories()&&(c=c.concat(a.xField)),e.y._hasCategories()&&(c=c.concat(a.yField)),b._createClass(c)+" "+o.join(" ")+" "+d.customClassList.lineMarker+" "+f}).on("mouseover",function(a){i(a,this,d,e)}).on("mouseleave",function(a){j(a,this,d,e)}).attr("cx",function(a){return e.x._hasCategories()?b._helpers.cx(a,d,e):e.x._previousOrigin}).attr("cy",function(a){return e.y._hasCategories()?b._helpers.cy(a,d,e):e.y._previousOrigin}).attr("r",0).attr("opacity",e.lineMarkers||c.data.length<2?c.color.opacity:0).call(function(a){d.noFormats||a.attr("fill","white").style("stroke-width",e.lineWeight).attr("stroke",function(a){return h?b._helpers.fill(a,d,e):c.color.stroke})}),d._handleTransition(l.merge(n),f,d).attr("cx",function(a){return b._helpers.cx(a,d,e)}).attr("cy",function(a){return b._helpers.cy(a,d,e)}).attr("r",2+e.lineWeight).attr("opacity",e.lineMarkers||c.data.length<2?c.color.opacity:0).call(function(a){d.noFormats||a.attr("fill","white").style("stroke-width",e.lineWeight).attr("stroke",function(a){
return h?b._helpers.fill(a,d,e):c.color.stroke})}),m=d._handleTransition(l.exit(),f,d).attr("cx",function(a){return e.x._hasCategories()?b._helpers.cx(a,d,e):e.x._origin}).attr("cy",function(a){return e.y._hasCategories()?b._helpers.cy(a,d,e):e.y._origin}).attr("r",0),0===f?m.remove():m.each("end",function(){a.select(this).remove()}),void 0!==e._markers&&null!==e._markers||(e._markers={}),e._markers[c.keyString]=l,b._drawMarkerBacks(c,d,e,f,g,k)},b._ease=function(b,c){if(b&&c&&"[object String]"===Object.prototype.toString.call(c)){switch(c){case"linear":c=a.easeLinear;break;case"poly":c=a.easePoly;break;case"quad":c=a.easeQuad;break;case"cubic":c=a.easeCubic;break;case"sin":c=a.easeSin;break;case"exp":c=a.easeExp;break;case"circle":c=a.easeCircle;break;case"elastic":c=a.easeElastic;break;case"back":c=a.easeBack;break;case"bounce":c=a.easeBounce}b.ease(c)}},b._getOrderedList=function(a,c,d){var e,f=[],g=[],h=[].concat(c),i=[].concat(c),j=[];return null!==d&&void 0!==d&&(j=j.concat(d)),j=j.concat({ordering:h,desc:!1}),j.forEach(function(b){var c,d=[],e=[];if("function"==typeof b.ordering){if(a&&a.length>0)for(c in a[0])a[0].hasOwnProperty(c)&&i.indexOf(c)===-1&&i.push(c)}else if(b.ordering instanceof Array){for(c=0;c<b.ordering.length;c+=1)a&&a.length>0&&a[0].hasOwnProperty(b.ordering[c])&&e.push(b.ordering[c]),d.push(b.ordering[c]);e.length>d.length/2?i.concat(e):b.values=d}else i.push(b.ordering)},this),e=b._rollUp(a,h,i),j.length>=1&&(j.forEach(function(a){var b=null!==a.desc&&void 0!==a.desc&&a.desc,c=a.ordering,d=[],e=function(a){var b,c=0;for(b=0;b<a.length;b+=1){if(isNaN(a[b])){c=void 0;break}c+=parseFloat(a[b])}return c},g=function(a,b){var c=0,d=e(a),f=e(b);return isNaN(d)||isNaN(f)?isNaN(Date.parse(a[0]))||isNaN(Date.parse(b[0]))?a[0]<b[0]?c=-1:a[0]>b[0]&&(c=1):c=Date.parse(a[0])-Date.parse(b[0]):c=parseFloat(d)-parseFloat(f),c};"function"==typeof c?f.push(function(a,d){return(b?-1:1)*c(a,d)}):a.values&&a.values.length>0?(a.values.forEach(function(a){d.push([].concat(a).join("|"))},this),f.push(function(a,c){var e,f,g,i="",j="";for(g=0;g<h.length;g+=1)g>0&&(i+="|",j+="|"),i+=a[h[g]],j+=c[h[g]];return e=d.indexOf(i),f=d.indexOf(j),e=e<0?b?-1:d.length:e,f=f<0?b?-1:d.length:f,(b?-1:1)*(e-f)})):[].concat(a.ordering).forEach(function(a){f.push(function(c,d){var e=0;return void 0!==c[a]&&void 0!==d[a]&&(e=g([].concat(c[a]),[].concat(d[a]))),(b?-1:1)*e})})}),e.sort(function(a,b){for(var c=0,d=0;c<f.length&&0===d;)d=f[c](a,b),c+=1;return d}),e.forEach(function(a){var b,c=[];if(1===h.length)g.push(a[h[0]]);else{for(b=0;b<h.length;b+=1)c.push(a[h[b]]);g.push(c)}},this)),g},b._getSeriesOrder=function(a,c){var d=[].concat(c._orderRules),e=c.categoryFields,f=[];return null!==e&&void 0!==e&&e.length>0&&(null!==c.c&&void 0!==c.c&&c.c._hasMeasure()&&d.push({ordering:c.c.measure,desc:!0}),c.x._hasMeasure()&&d.push({ordering:c.x.measure,desc:!0}),c.y._hasMeasure()&&d.push({ordering:c.y.measure,desc:!0}),f=b._getOrderedList(a,e,d)),f},b._getSeriesSortPredicate=function(a,c,d){return function(e,f){var g=0;return c.x._hasCategories()&&(g=b._helpers.cx(e,a,c)-b._helpers.cx(f,a,c)),0===g&&c.y._hasCategories()&&(g=b._helpers.cy(e,a,c)-b._helpers.cy(f,a,c)),0===g&&d&&(g=b._arrayIndexCompare(d,e.aggField,f.aggField)),g}},b._helpers={cx:function(a,c,d){var e=0;return e=null!==d.x.measure&&void 0!==d.x.measure?d.x._scale(a.cx):d.x._hasCategories()&&d.x.categoryFields.length>=2?d.x._scale(a.cx)+b._helpers.xGap(c,d)+(a.xOffset+.5)*((c._widthPixels()/d.x._max-2*b._helpers.xGap(c,d))*a.width):d.x._scale(a.cx)+c._widthPixels()/d.x._max/2},cy:function(a,c,d){var e=0;return e=null!==d.y.measure&&void 0!==d.y.measure?d.y._scale(a.cy):null!==d.y.categoryFields&&void 0!==d.y.categoryFields&&d.y.categoryFields.length>=2?d.y._scale(a.cy)-c._heightPixels()/d.y._max+b._helpers.yGap(c,d)+(a.yOffset+.5)*((c._heightPixels()/d.y._max-2*b._helpers.yGap(c,d))*a.height):d.y._scale(a.cy)-c._heightPixels()/d.y._max/2},r:function(a,b,c){var d=0,e=1;return null===c.z||void 0===c.z?d=c.radius&&"auto"!==c.radius?c.radius:5:(c.radius&&"auto"!==c.radius&&c.radius>1&&(e=c.radius/c.z._scale(c.z._max)),d=c.z._hasMeasure()?c.z._scale(a.r)*e:c.z._scale(b._heightPixels()/100)*e),d},xGap:function(a,b){var c=0;return(null===b.x.measure||void 0===b.x.measure)&&b.barGap>0&&(c=a._widthPixels()/b.x._max*(b.barGap>.99?.99:b.barGap)/2),c},xClusterGap:function(a,c,d){var e=0;return null!==d.x.categoryFields&&void 0!==d.x.categoryFields&&d.x.categoryFields.length>=2&&d.clusterBarGap>0&&!d.x._hasMeasure()&&(e=a.width*(c._widthPixels()/d.x._max-2*b._helpers.xGap(c,d))*(d.clusterBarGap>.99?.99:d.clusterBarGap)/2),e},yGap:function(a,b){var c=0;return(null===b.y.measure||void 0===b.y.measure)&&b.barGap>0&&(c=a._heightPixels()/b.y._max*(b.barGap>.99?.99:b.barGap)/2),c},yClusterGap:function(a,c,d){var e=0;return null!==d.y.categoryFields&&void 0!==d.y.categoryFields&&d.y.categoryFields.length>=2&&d.clusterBarGap>0&&!d.y._hasMeasure()&&(e=a.height*(c._heightPixels()/d.y._max-2*b._helpers.yGap(c,d))*(d.clusterBarGap>.99?.99:d.clusterBarGap)/2),e},x:function(a,c,d){var e=0;return e=d.x._hasTimeField()?d.x._scale(a.x)-b._helpers.width(a,c,d)/2:null!==d.x.measure&&void 0!==d.x.measure?d.x._scale(a.x):d.x._scale(a.x)+b._helpers.xGap(c,d)+a.xOffset*(b._helpers.width(a,c,d)+2*b._helpers.xClusterGap(a,c,d))+b._helpers.xClusterGap(a,c,d)},y:function(a,c,d){var e=0;return e=d.y._hasTimeField()?d.y._scale(a.y)-b._helpers.height(a,c,d)/2:null!==d.y.measure&&void 0!==d.y.measure?d.y._scale(a.y):d.y._scale(a.y)-c._heightPixels()/d.y._max+b._helpers.yGap(c,d)+a.yOffset*(b._helpers.height(a,c,d)+2*b._helpers.yClusterGap(a,c,d))+b._helpers.yClusterGap(a,c,d)},width:function(a,c,d){var e=0;return e=null!==d.x.measure&&void 0!==d.x.measure?Math.abs(d.x._scale(a.x<0?a.x-a.width:a.x+a.width)-d.x._scale(a.x)):d.x._hasTimeField()?d.x.floatingBarWidth:a.width*(c._widthPixels()/d.x._max-2*b._helpers.xGap(c,d))-2*b._helpers.xClusterGap(a,c,d)},height:function(a,c,d){var e=0;return e=d.y._hasTimeField()?d.y.floatingBarWidth:null!==d.y.measure&&void 0!==d.y.measure?Math.abs(d.y._scale(a.y)-d.y._scale(a.y<=0?a.y+a.height:a.y-a.height)):a.height*(c._heightPixels()/d.y._max-2*b._helpers.yGap(c,d))-2*b._helpers.yClusterGap(a,c,d)},opacity:function(a,b,c){var d=0;return d=null!==c.c&&void 0!==c.c?a.opacity:b.getColor(a.aggField.slice(-1)[0]).opacity},fill:function(a,b,c){var d=0;return d=null!==c.c&&void 0!==c.c?a.fill:b.getColor(a.aggField.slice(-1)[0]).fill},stroke:function(a,b,c){var d=0;return d=null!==c.c&&void 0!==c.c?a.stroke:b.getColor(a.aggField.slice(-1)[0]).stroke},css:function(a,b){return b.getClass(a.aggField.slice(-1)[0])}},b._interpolate=function(b,c){if(b&&c){if("[object String]"===Object.prototype.toString.call(c))switch(c){case"linear":c=a.curveLinear;break;case"linear-closed":c=a.curveLinearClosed;break;case"step":c=a.curveStep;break;case"step-before":c=a.curveStepBefore;break;case"step-after":c=a.curveStepAfter;break;case"basis":c=a.curveBasis;break;case"basis-open":c=a.curveBasisOpen;break;case"basis-closed":c=a.curveBasisClosed;break;case"bundle":c=a.curveBundle;break;case"cardinal":c=a.curveCardinal;break;case"cardinal-open":c=a.curveCardinalOpen;break;case"cardinal-closed":c=a.curveCardinalClosed;break;case"monotone":c=a.curveMonotoneX}b.curve(c)}},b._parentHeight=function(a){var b=a.getBoundingClientRect().height;return(!b||b<0)&&(b=a.clientHeight),b},b._parentWidth=function(a){var b=a.getBoundingClientRect().width;return(!b||b<0)&&(b=a.clientWidth),b},b._parsePosition=function(a,b){var c,d=0;return a&&(c=a.toString().split(","),c.forEach(function(c){c&&(isNaN(c)?"%"===c.slice(-1)?d+=b*(parseFloat(c.slice(0,c.length-1))/100):"px"===c.slice(-2)?d+=parseFloat(c.slice(0,c.length-2)):d=a:d+=parseFloat(c))},this)),d<0&&(d=b+d),d},b._parseXPosition=function(a,c){return b._parsePosition(a,b._parentWidth(c))},b._parseYPosition=function(a,c){return b._parsePosition(a,b._parentHeight(c))},b._postDrawHandling=function(a,b,c,d){0===d?(b.each(function(b,c){a.afterDraw&&a.afterDraw(this,b,c)}),c.remove()):(b.on("end",function(b,c){a.afterDraw&&a.afterDraw(this,b,c)}),c.call(function(){a.shapes&&a.shapes.exit().remove()}))},b._removeTooltip=function(a,b,c,d){c._tooltipGroup&&c._tooltipGroup.remove()},b._rollUp=function(a,b,c){var d=[];return b=null!==b&&void 0!==b?[].concat(b):[],a.forEach(function(a){var e=-1,f={},g=!0;d.forEach(function(c,d){e===-1&&(g=!0,b.forEach(function(b){g=g&&a[b]===c[b]},this),g&&(e=d))},this),e!==-1?f=d[e]:(b.forEach(function(b){f[b]=a[b]},this),d.push(f),e=d.length-1),c.forEach(function(c){b.indexOf(c)===-1&&(void 0===f[c]&&(f[c]=[]),f[c]=f[c].concat(a[c]))},this),d[e]=f},this),d},b._showBarTooltip=function(b,c,d,e){var f,g,h,i,j,k,l=5,m=10,n=750,o=a.select(c),p=o.node().getBBox().x,q=o.node().getBBox().y,r=o.node().getBBox().width,s=o.node().getBBox().height,t=o.attr("opacity"),u=o.attr("fill"),v=e._dropLineOrigin(),w=a.rgb(a.rgb(u).r+.6*(255-a.rgb(u).r),a.rgb(u).g+.6*(255-a.rgb(u).g),a.rgb(u).b+.6*(255-a.rgb(u).b)),x=a.rgb(a.rgb(u).r+.8*(255-a.rgb(u).r),a.rgb(u).g+.8*(255-a.rgb(u).g),a.rgb(u).b+.8*(255-a.rgb(u).b)),y=e.getTooltipText(b),z=0,A=0,B=0,C=function(a,b){var c=o.node().getCTM(),e=d.svg.node().createSVGPoint();return e.x=a||0,e.y=b||0,e.matrixTransform(c)};null!==d._tooltipGroup&&void 0!==d._tooltipGroup&&d._tooltipGroup.remove(),d._tooltipGroup=d.svg.append("g"),e.p||(k=e._isStacked()?1:r/2,e.x._hasCategories()||null===v.y||d._tooltipGroup.append("line").attr("class","dimple-tooltip-dropline "+d.customClassList.tooltipDropLine).attr("x1",p<e.x._origin?p+k:p+r-k).attr("y1",q<v.y?q+s:q).attr("x2",p<e.x._origin?p+k:p+r-k).attr("y2",q<v.y?q+s:q).call(function(a){d.noFormats||a.style("fill","none").style("stroke",u).style("stroke-width",2).style("stroke-dasharray","3, 3").style("opacity",t)}).transition().delay(n/2).duration(n/2).ease(a.easeLinear).attr("y2",q<v.y?v.y-1:v.y+1),k=e._isStacked()?1:s/2,e.y._hasCategories()||null===v.x||d._tooltipGroup.append("line").attr("class","dimple-tooltip-dropline "+d.customClassList.tooltipDropLine).attr("x1",p<v.x?p+r:p).attr("y1",q<e.y._origin?q+k:q+s-k).attr("x2",p<v.x?p+r:p).attr("y2",q<e.y._origin?q+k:q+s-k).call(function(a){d.noFormats||a.style("fill","none").style("stroke",u).style("stroke-width",2).style("stroke-dasharray","3, 3").style("opacity",t)}).transition().delay(n/2).duration(n/2).ease(a.easeLinear).attr("x2",p<v.x?v.x-1:v.x+1)),f=d._tooltipGroup.append("g"),g=f.append("rect").attr("class","dimple-tooltip "+d.customClassList.tooltipBox),f.selectAll(".dimple-dont-select-any").data(y).enter().append("text").attr("class","dimple-tooltip "+d.customClassList.tooltipLabel).text(function(a){return a}).call(function(a){d.noFormats||a.style("font-family",e.tooltipFontFamily).style("font-size",e._getTooltipFontSize())}),f.each(function(){A=this.getBBox().width>A?this.getBBox().width:A,B=this.getBBox().width>B?this.getBBox().height:B}),f.selectAll("text").attr("x",0).attr("y",function(){return z+=this.getBBox().height,z-this.getBBox().height/2}),g.attr("x",-l).attr("y",-l).attr("height",Math.floor(z+l)-.5).attr("width",A+2*l).attr("rx",5).attr("ry",5).call(function(a){d.noFormats||a.style("fill",x).style("stroke",w).style("stroke-width",2).style("opacity",.95)}),C(p+r+l+m+A).x<parseFloat(d.svg.node().getBBox().width)?(h=p+r+l+m,i=q+s/2-(z-(B-l))/2):C(p-(l+m+A)).x>0?(h=p-(l+m+A),i=q+s/2-(z-(B-l))/2):C(0,q+s+z+m+l).y<parseFloat(d.svg.node().getBBox().height)?(h=p+r/2-(2*l+A)/2,h=h>0?h:m,h=h+A<parseFloat(d.svg.node().getBBox().width)?h:parseFloat(d.svg.node().getBBox().width)-A-m,i=q+s+2*l):(h=p+r/2-(2*l+A)/2,h=h>0?h:m,h=h+A<parseFloat(d.svg.node().getBBox().width)?h:parseFloat(d.svg.node().getBBox().width)-A-m,i=q-z-(B-l)),j=C(h,i),f.attr("transform","translate("+j.x+" , "+j.y+")")},b._showPointTooltip=function(c,d,e,f){var g,h,i,j,k=5,l=10,m=750,n=a.select(d),o=parseFloat(n.attr("cx")),p=parseFloat(n.attr("cy")),q=parseFloat(n.attr("r")),r=b._helpers.opacity(c,e,f),s=n.attr("stroke"),t=f._dropLineOrigin(),u=a.rgb(a.rgb(s).r+.6*(255-a.rgb(s).r),a.rgb(s).g+.6*(255-a.rgb(s).g),a.rgb(s).b+.6*(255-a.rgb(s).b)),v=a.rgb(a.rgb(s).r+.8*(255-a.rgb(s).r),a.rgb(s).g+.8*(255-a.rgb(s).g),a.rgb(s).b+.8*(255-a.rgb(s).b)),w=0,x=0,y=0,z=f.getTooltipText(c);null!==e._tooltipGroup&&void 0!==e._tooltipGroup&&e._tooltipGroup.remove(),e._tooltipGroup=e.svg.append("g"),e._tooltipGroup.append("circle").attr("class","dimple-line-marker-circle "+e.customClassList.lineMarkerCircle).attr("cx",o).attr("cy",p).attr("r",q).call(function(a){e.noFormats||a.attr("opacity",0).style("fill","none").style("stroke",s).style("stroke-width",1)}).transition().duration(m/2).ease(a.easeLinear).attr("r",q+f.lineWeight+2).call(function(a){e.noFormats||a.attr("opacity",1).style("stroke-width",2)}),null!==t.y&&e._tooltipGroup.append("line").attr("class","dimple-tooltip-dropline "+e.customClassList.tooltipDropLine).attr("x1",o).attr("y1",p<t.y?p+q+f.lineWeight+2:p-q-f.lineWeight-2).attr("x2",o).attr("y2",p<t.y?p+q+f.lineWeight+2:p-q-f.lineWeight-2).call(function(a){e.noFormats||a.style("fill","none").style("stroke",s).style("stroke-width",2).style("stroke-dasharray","3, 3").style("opacity",r)}).transition().delay(m/2).duration(m/2).ease(a.easeLinear).attr("y2",p<t.y?t.y-1:t.y+1),null!==t.x&&e._tooltipGroup.append("line").attr("class","dimple-tooltip-dropline "+e.customClassList.tooltipDropLine).attr("x1",o<t.x?o+q+f.lineWeight+2:o-q-f.lineWeight-2).attr("y1",p).attr("x2",o<t.x?o+q+f.lineWeight+2:o-q-f.lineWeight-2).attr("y2",p).call(function(a){e.noFormats||a.style("fill","none").style("stroke",s).style("stroke-width",2).style("stroke-dasharray","3, 3").style("opacity",r)}).transition().delay(m/2).duration(m/2).ease(a.easeLinear).attr("x2",o<t.x?t.x-1:t.x+1),g=e._tooltipGroup.append("g"),h=g.append("rect").attr("class","dimple-tooltip "+e.customClassList.tooltipBox),g.selectAll(".dont-select-any").data(z).enter().append("text").attr("class","dimple-tooltip "+e.customClassList.tooltipLabel).text(function(a){return a}).call(function(a){e.noFormats||a.style("font-family",f.tooltipFontFamily).style("font-size",f._getTooltipFontSize())}),g.each(function(){x=this.getBBox().width>x?this.getBBox().width:x,y=this.getBBox().width>y?this.getBBox().height:y}),g.selectAll("text").attr("x",0).attr("y",function(){return w+=this.getBBox().height,w-this.getBBox().height/2}),h.attr("x",-k).attr("y",-k).attr("height",Math.floor(w+k)-.5).attr("width",x+2*k).attr("rx",5).attr("ry",5).call(function(a){e.noFormats||a.style("fill",v).style("stroke",u).style("stroke-width",2).style("opacity",.95)}),o+q+k+l+x<parseFloat(e.svg.node().getBBox().width)?(i=o+q+k+l,j=p-(w-(y-k))/2):o-q-(k+l+x)>0?(i=o-q-(k+l+x),j=p-(w-(y-k))/2):p+q+w+l+k<parseFloat(e.svg.node().getBBox().height)?(i=o-(2*k+x)/2,i=i>0?i:l,i=i+x<parseFloat(e.svg.node().getBBox().width)?i:parseFloat(e.svg.node().getBBox().width)-x-l,j=p+q+2*k):(i=o-(2*k+x)/2,i=i>0?i:l,i=i+x<parseFloat(e.svg.node().getBBox().width)?i:parseFloat(e.svg.node().getBBox().width)-x-l,j=p-w-(y-k)),g.attr("transform","translate("+i+" , "+j+")")},b.filterData=function(a,b,c){var d=a;return null!==b&&null!==c&&(null!==c&&void 0!==c&&(c=[].concat(c)),d=[],a.forEach(function(a){null===a[b]?d.push(a):c.indexOf([].concat(a[b]).join("/"))>-1&&d.push(a)},this)),d},b.getUniqueValues=function(a,b){var c=[];return null!==b&&void 0!==b&&(b=[].concat(b),a.forEach(function(a){var d="";b.forEach(function(b,c){c>0&&(d+="/"),d+=a[b]},this),c.indexOf(d)===-1&&c.push(d)},this)),c},b.newSvg=function(b,c,d){var e=null;if(null!==b&&void 0!==b||(b="body"),e=a.select(b),e.empty())throw"The '"+b+"' selector did not match any elements.  Please prefix with '#' to select by id or '.' to select by class";return e.append("svg").attr("width",c).attr("height",d)},b});
0
;
if (document.getElementById("chartContainer")) {
var svg = dimple.newSvg("#chartContainer", 700, 630);

    var myChart = new dimple.chart(svg, data );
    myChart.setBounds(200, 50, 500, 500)
    myChart.addCategoryAxis("x", "country");
    myChart.addCategoryAxis("y", "category");
    var z = myChart.addMeasureAxis("z", "value");
    // var s = myChart.addSeries("Euros");
    var c = myChart.addSeries("category", dimple.plot.bubble);
    // s.aggregate = dimple.aggregateMethod.max;
    // z.overrideMax = 20;
    // myChart.addLegend(240, 10, 330, 20, "right");
    myChart.ease = "bounce";
    // myChart.noFormats = true;
    myChart.defaultColors = [
        new dimple.color("#bdbdbd", "#bdbdbd", 1)
    ];
    myChart.draw();
  }
;
// https://github.com/topojson/topojson-client Version 1.8.0. Copyright 2016 Mike Bostock.
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.topojson = global.topojson || {})));
}(this, (function (exports) { 'use strict';

var noop = function() {};

function absolute(transform) {
  if (!transform) return noop;
  var x0,
      y0,
      kx = transform.scale[0],
      ky = transform.scale[1],
      dx = transform.translate[0],
      dy = transform.translate[1];
  return function(point, i) {
    if (!i) x0 = y0 = 0;
    point[0] = (x0 += point[0]) * kx + dx;
    point[1] = (y0 += point[1]) * ky + dy;
  };
}

function relative(transform) {
  if (!transform) return noop;
  var x0,
      y0,
      kx = transform.scale[0],
      ky = transform.scale[1],
      dx = transform.translate[0],
      dy = transform.translate[1];
  return function(point, i) {
    if (!i) x0 = y0 = 0;
    var x1 = Math.round((point[0] - dx) / kx),
        y1 = Math.round((point[1] - dy) / ky);
    point[0] = x1 - x0;
    point[1] = y1 - y0;
    x0 = x1;
    y0 = y1;
  };
}

function reverse(array, n) {
  var t, j = array.length, i = j - n;
  while (i < --j) t = array[i], array[i++] = array[j], array[j] = t;
}

function bisect(a, x) {
  var lo = 0, hi = a.length;
  while (lo < hi) {
    var mid = lo + hi >>> 1;
    if (a[mid] < x) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

var feature = function(topology, o) {
  return o.type === "GeometryCollection" ? {
    type: "FeatureCollection",
    features: o.geometries.map(function(o) { return feature$1(topology, o); })
  } : feature$1(topology, o);
};

function feature$1(topology, o) {
  var f = {
    type: "Feature",
    id: o.id,
    properties: o.properties || {},
    geometry: object(topology, o)
  };
  if (o.id == null) delete f.id;
  return f;
}

function object(topology, o) {
  var absolute$$1 = absolute(topology.transform),
      arcs = topology.arcs;

  function arc(i, points) {
    if (points.length) points.pop();
    for (var a = arcs[i < 0 ? ~i : i], k = 0, n = a.length, p; k < n; ++k) {
      points.push(p = a[k].slice());
      absolute$$1(p, k);
    }
    if (i < 0) reverse(points, n);
  }

  function point(p) {
    p = p.slice();
    absolute$$1(p, 0);
    return p;
  }

  function line(arcs) {
    var points = [];
    for (var i = 0, n = arcs.length; i < n; ++i) arc(arcs[i], points);
    if (points.length < 2) points.push(points[0].slice());
    return points;
  }

  function ring(arcs) {
    var points = line(arcs);
    while (points.length < 4) points.push(points[0].slice());
    return points;
  }

  function polygon(arcs) {
    return arcs.map(ring);
  }

  function geometry(o) {
    var t = o.type;
    return t === "GeometryCollection" ? {type: t, geometries: o.geometries.map(geometry)}
        : t in geometryType ? {type: t, coordinates: geometryType[t](o)}
        : null;
  }

  var geometryType = {
    Point: function(o) { return point(o.coordinates); },
    MultiPoint: function(o) { return o.coordinates.map(point); },
    LineString: function(o) { return line(o.arcs); },
    MultiLineString: function(o) { return o.arcs.map(line); },
    Polygon: function(o) { return polygon(o.arcs); },
    MultiPolygon: function(o) { return o.arcs.map(polygon); }
  };

  return geometry(o);
}

var stitchArcs = function(topology, arcs) {
  var stitchedArcs = {},
      fragmentByStart = {},
      fragmentByEnd = {},
      fragments = [],
      emptyIndex = -1;

  // Stitch empty arcs first, since they may be subsumed by other arcs.
  arcs.forEach(function(i, j) {
    var arc = topology.arcs[i < 0 ? ~i : i], t;
    if (arc.length < 3 && !arc[1][0] && !arc[1][1]) {
      t = arcs[++emptyIndex], arcs[emptyIndex] = i, arcs[j] = t;
    }
  });

  arcs.forEach(function(i) {
    var e = ends(i),
        start = e[0],
        end = e[1],
        f, g;

    if (f = fragmentByEnd[start]) {
      delete fragmentByEnd[f.end];
      f.push(i);
      f.end = end;
      if (g = fragmentByStart[end]) {
        delete fragmentByStart[g.start];
        var fg = g === f ? f : f.concat(g);
        fragmentByStart[fg.start = f.start] = fragmentByEnd[fg.end = g.end] = fg;
      } else {
        fragmentByStart[f.start] = fragmentByEnd[f.end] = f;
      }
    } else if (f = fragmentByStart[end]) {
      delete fragmentByStart[f.start];
      f.unshift(i);
      f.start = start;
      if (g = fragmentByEnd[start]) {
        delete fragmentByEnd[g.end];
        var gf = g === f ? f : g.concat(f);
        fragmentByStart[gf.start = g.start] = fragmentByEnd[gf.end = f.end] = gf;
      } else {
        fragmentByStart[f.start] = fragmentByEnd[f.end] = f;
      }
    } else {
      f = [i];
      fragmentByStart[f.start = start] = fragmentByEnd[f.end = end] = f;
    }
  });

  function ends(i) {
    var arc = topology.arcs[i < 0 ? ~i : i], p0 = arc[0], p1;
    if (topology.transform) p1 = [0, 0], arc.forEach(function(dp) { p1[0] += dp[0], p1[1] += dp[1]; });
    else p1 = arc[arc.length - 1];
    return i < 0 ? [p1, p0] : [p0, p1];
  }

  function flush(fragmentByEnd, fragmentByStart) {
    for (var k in fragmentByEnd) {
      var f = fragmentByEnd[k];
      delete fragmentByStart[f.start];
      delete f.start;
      delete f.end;
      f.forEach(function(i) { stitchedArcs[i < 0 ? ~i : i] = 1; });
      fragments.push(f);
    }
  }

  flush(fragmentByEnd, fragmentByStart);
  flush(fragmentByStart, fragmentByEnd);
  arcs.forEach(function(i) { if (!stitchedArcs[i < 0 ? ~i : i]) fragments.push([i]); });

  return fragments;
};

var mesh = function(topology) {
  return object(topology, meshArcs.apply(this, arguments));
};

function meshArcs(topology, o, filter) {
  var arcs = [];

  function arc(i) {
    var j = i < 0 ? ~i : i;
    (geomsByArc[j] || (geomsByArc[j] = [])).push({i: i, g: geom});
  }

  function line(arcs) {
    arcs.forEach(arc);
  }

  function polygon(arcs) {
    arcs.forEach(line);
  }

  function geometry(o) {
    if (o.type === "GeometryCollection") o.geometries.forEach(geometry);
    else if (o.type in geometryType) geom = o, geometryType[o.type](o.arcs);
  }

  if (arguments.length > 1) {
    var geomsByArc = [],
        geom;

    var geometryType = {
      LineString: line,
      MultiLineString: polygon,
      Polygon: polygon,
      MultiPolygon: function(arcs) { arcs.forEach(polygon); }
    };

    geometry(o);

    geomsByArc.forEach(arguments.length < 3
        ? function(geoms) { arcs.push(geoms[0].i); }
        : function(geoms) { if (filter(geoms[0].g, geoms[geoms.length - 1].g)) arcs.push(geoms[0].i); });
  } else {
    for (var i = 0, n = topology.arcs.length; i < n; ++i) arcs.push(i);
  }

  return {type: "MultiLineString", arcs: stitchArcs(topology, arcs)};
}

function triangleArea(triangle) {
  var a = triangle[0], b = triangle[1], c = triangle[2];
  return Math.abs((a[0] - c[0]) * (b[1] - a[1]) - (a[0] - b[0]) * (c[1] - a[1]));
}

function ringArea(ring) {
  var i = -1,
      n = ring.length,
      a,
      b = ring[n - 1],
      area = 0;

  while (++i < n) {
    a = b;
    b = ring[i];
    area += a[0] * b[1] - a[1] * b[0];
  }

  return area / 2;
}

var merge = function(topology) {
  return object(topology, mergeArcs.apply(this, arguments));
};

function mergeArcs(topology, objects) {
  var polygonsByArc = {},
      polygons = [],
      components = [];

  objects.forEach(function(o) {
    if (o.type === "Polygon") register(o.arcs);
    else if (o.type === "MultiPolygon") o.arcs.forEach(register);
  });

  function register(polygon) {
    polygon.forEach(function(ring) {
      ring.forEach(function(arc) {
        (polygonsByArc[arc = arc < 0 ? ~arc : arc] || (polygonsByArc[arc] = [])).push(polygon);
      });
    });
    polygons.push(polygon);
  }

  function area(ring) {
    return Math.abs(ringArea(object(topology, {type: "Polygon", arcs: [ring]}).coordinates[0]));
  }

  polygons.forEach(function(polygon) {
    if (!polygon._) {
      var component = [],
          neighbors = [polygon];
      polygon._ = 1;
      components.push(component);
      while (polygon = neighbors.pop()) {
        component.push(polygon);
        polygon.forEach(function(ring) {
          ring.forEach(function(arc) {
            polygonsByArc[arc < 0 ? ~arc : arc].forEach(function(polygon) {
              if (!polygon._) {
                polygon._ = 1;
                neighbors.push(polygon);
              }
            });
          });
        });
      }
    }
  });

  polygons.forEach(function(polygon) {
    delete polygon._;
  });

  return {
    type: "MultiPolygon",
    arcs: components.map(function(polygons) {
      var arcs = [], n;

      // Extract the exterior (unique) arcs.
      polygons.forEach(function(polygon) {
        polygon.forEach(function(ring) {
          ring.forEach(function(arc) {
            if (polygonsByArc[arc < 0 ? ~arc : arc].length < 2) {
              arcs.push(arc);
            }
          });
        });
      });

      // Stitch the arcs into one or more rings.
      arcs = stitchArcs(topology, arcs);

      // If more than one ring is returned,
      // at most one of these rings can be the exterior;
      // choose the one with the greatest absolute area.
      if ((n = arcs.length) > 1) {
        for (var i = 1, k = area(arcs[0]), ki, t; i < n; ++i) {
          if ((ki = area(arcs[i])) > k) {
            t = arcs[0], arcs[0] = arcs[i], arcs[i] = t, k = ki;
          }
        }
      }

      return arcs;
    })
  };
}

var neighbors = function(objects) {
  var indexesByArc = {}, // arc index -> array of object indexes
      neighbors = objects.map(function() { return []; });

  function line(arcs, i) {
    arcs.forEach(function(a) {
      if (a < 0) a = ~a;
      var o = indexesByArc[a];
      if (o) o.push(i);
      else indexesByArc[a] = [i];
    });
  }

  function polygon(arcs, i) {
    arcs.forEach(function(arc) { line(arc, i); });
  }

  function geometry(o, i) {
    if (o.type === "GeometryCollection") o.geometries.forEach(function(o) { geometry(o, i); });
    else if (o.type in geometryType) geometryType[o.type](o.arcs, i);
  }

  var geometryType = {
    LineString: line,
    MultiLineString: polygon,
    Polygon: polygon,
    MultiPolygon: function(arcs, i) { arcs.forEach(function(arc) { polygon(arc, i); }); }
  };

  objects.forEach(geometry);

  for (var i in indexesByArc) {
    for (var indexes = indexesByArc[i], m = indexes.length, j = 0; j < m; ++j) {
      for (var k = j + 1; k < m; ++k) {
        var ij = indexes[j], ik = indexes[k], n;
        if ((n = neighbors[ij])[i = bisect(n, ik)] !== ik) n.splice(i, 0, ik);
        if ((n = neighbors[ik])[i = bisect(n, ij)] !== ij) n.splice(i, 0, ij);
      }
    }
  }

  return neighbors;
};

function compare(a, b) {
  return a[1][2] - b[1][2];
}

var minHeap = function() {
  var heap = {},
      array = [],
      size = 0;

  heap.push = function(object) {
    up(array[object._ = size] = object, size++);
    return size;
  };

  heap.pop = function() {
    if (size <= 0) return;
    var removed = array[0], object;
    if (--size > 0) object = array[size], down(array[object._ = 0] = object, 0);
    return removed;
  };

  heap.remove = function(removed) {
    var i = removed._, object;
    if (array[i] !== removed) return; // invalid request
    if (i !== --size) object = array[size], (compare(object, removed) < 0 ? up : down)(array[object._ = i] = object, i);
    return i;
  };

  function up(object, i) {
    while (i > 0) {
      var j = ((i + 1) >> 1) - 1,
          parent = array[j];
      if (compare(object, parent) >= 0) break;
      array[parent._ = i] = parent;
      array[object._ = i = j] = object;
    }
  }

  function down(object, i) {
    while (true) {
      var r = (i + 1) << 1,
          l = r - 1,
          j = i,
          child = array[j];
      if (l < size && compare(array[l], child) < 0) child = array[j = l];
      if (r < size && compare(array[r], child) < 0) child = array[j = r];
      if (j === i) break;
      array[child._ = i] = child;
      array[object._ = i = j] = object;
    }
  }

  return heap;
};

var presimplify = function(topology, triangleArea$$1) {
  var absolute$$1 = absolute(topology.transform),
      relative$$1 = relative(topology.transform),
      heap = minHeap();

  if (triangleArea$$1 == null) triangleArea$$1 = triangleArea;

  topology.arcs.forEach(function(arc) {
    var triangles = [],
        maxArea = 0,
        triangle,
        i,
        n,
        p;

    // To store each point’s area, we create a new array rather than extending
    // the passed-in point to workaround a Chrome/V8 bug (getting stuck in smi
    // mode). For midpoints, the initial area of Infinity will be computed in
    // the next step.
    for (i = 0, n = arc.length; i < n; ++i) {
      p = arc[i];
      absolute$$1(arc[i] = [p[0], p[1], Infinity], i);
    }

    for (i = 1, n = arc.length - 1; i < n; ++i) {
      triangle = arc.slice(i - 1, i + 2);
      triangle[1][2] = triangleArea$$1(triangle);
      triangles.push(triangle);
      heap.push(triangle);
    }

    for (i = 0, n = triangles.length; i < n; ++i) {
      triangle = triangles[i];
      triangle.previous = triangles[i - 1];
      triangle.next = triangles[i + 1];
    }

    while (triangle = heap.pop()) {
      var previous = triangle.previous,
          next = triangle.next;

      // If the area of the current point is less than that of the previous
      // point to be eliminated, use the latter’s area instead. This ensures
      // that the current point cannot be eliminated without eliminating
      // previously-eliminated points.
      if (triangle[1][2] < maxArea) triangle[1][2] = maxArea;
      else maxArea = triangle[1][2];

      if (previous) {
        previous.next = next;
        previous[2] = triangle[2];
        update(previous);
      }

      if (next) {
        next.previous = previous;
        next[0] = triangle[0];
        update(next);
      }
    }

    arc.forEach(relative$$1);
  });

  function update(triangle) {
    heap.remove(triangle);
    triangle[1][2] = triangleArea$$1(triangle);
    heap.push(triangle);
  }

  return topology;
};

exports.mesh = mesh;
exports.meshArcs = meshArcs;
exports.merge = merge;
exports.mergeArcs = mergeArcs;
exports.feature = feature;
exports.neighbors = neighbors;
exports.presimplify = presimplify;

Object.defineProperty(exports, '__esModule', { value: true });

})));
// We define a variable holding the current key to visualize on the map.
if (document.getElementById("map")) {
var currentKey = 'category';
var countryName = 'country';
// Listen to changes of the dropdown to select the key to visualize on
// the map.
d3.select('#select-key').on('change', function(a) {
  // Change the current key and call the function to update the colors.
  currentKey = d3.select(this).property('value');
  updateMapColors();
});
// We add a listener to the browser window, calling updateLegend when
// the window is resized.
window.onresize = updateLegend;
var countryCodes = {
  "Austria": 1,
  "Belgium": 2,
  "Bulgaria": 3,
  "Croatia": 4,
  "Cyprus": 5,
  "Czech Republic": 6,
  "Denmark": 7,
  "Estonia": 8,
  "Finland": 9,
  "France": 10,
  "Germany": 11,
  "Greece": 12,
  "Hungary": 13,
  "Iceland": 14,
  "Ireland": 15,
  "Italy": 16,
  "Latvia": 17,
  "Lithuania": 18,
  "Luxembourg": 19,
  "Malta": 20,
  "Netherlands": 21,
  "Norway": 22,
  "Poland": 23,
  "Portugal": 24,
  "Romania": 25,
  "Slovakia": 26,
  "Slovenia": 27,
  "Spain": 28,
  "Sweden": 29,
  "Switzerland": 30,
  "United Kingdom": 31
}
// We specify the dimensions for the map container. We use the same
// width and height as specified in the CSS.
var width = 700,
    height = 500;
// We define a variable to later hold the data of the CSV.
var mapData;
// We create a SVG element in the map container and give it some
// dimensions.
var svg = d3.select('#map').append('svg')
  .attr('width', width)
  .attr('height', height);
// We add a <g> element to the SVG element and give it a class to
// style. We also add a class name for Colorbrewer.
var mapFeatures = svg.append('g')
  .attr('class', 'features YlGnBu');
// We add a <div> container for the tooltip, which is hidden by default.
var tooltip = d3.select("#map")
  .append("div")
  .attr("class", "tooltip hidden");
// We define a geographical projection
//     https://github.com/mbostock/d3/wiki/Geo-Projections
// and set the initial zoom to show the features.
var projection = d3.geoMercator()
  // The approximate scale factor was found through try and error
  .center([ 17, 55 ])
  .translate([ width/2, height/2 ])
  .scale([ width/1.4 ]);
// We prepare a path object and apply the projection to it.
var path = d3.geoPath()
  .projection(projection);
// We prepare an object to later have easier access to the data.
var dataById = d3.map();
// We create a quantize scale to categorize the values in 9 groups.
// The domain is static and has a maximum of 100 (based on the
// assumption that no value can be larger than 100%).
// The scale returns text values which can be used for the color CSS
// classes (q0-9, q1-9 ... q8-9)
var quantize = d3.scaleQuantize()
    .range(d3.range(5).map(function(i) { return 'q' + i + '-5'; }));
//Legend stuff
  // We prepare a number format which will always return 2 decimal places.
var formatNumber = d3.format('.1f');
  // For the legend, we prepare a very simple linear scale. Domain and
  // range will be set later as they depend on the data currently shown.
var legendX = d3.scaleLinear();
  // We use the scale to define an axis. The tickvalues will be set later
  // as they also depend on the data.
var legendXAxis = d3.axisBottom()
  .scale(legendX)
  .tickSize(13)
  .tickFormat(function(d) {
    return formatNumber(d);
  });
  // We create an SVG element in the legend container and give it some
  // dimensions.
var legendSvg = d3.select('#legend').append('svg')
  .attr('width', '100%')
  .attr('height', '44');
  // To this SVG element, we add a <g> element which will hold all of our
  // legend entries.
var g = legendSvg.append('g')
    .attr("class", "legend-key YlGnBu")
    .attr("transform", "translate(" + 20 + "," + 20 + ")");
  // We add a <rect> element for each quantize category. The width and
  // color of the rectangles will be set later.
g.selectAll("rect")
    .data(quantize.range().map(function(d) {
      return quantize.invertExtent(d);
    }))
  .enter().append("rect");
  // We add a <text> element acting as the caption of the legend. The text
  // will be set later.
g.append("text")
    .attr("class", "caption")
    .attr("y", -6)
  /**
   * Function to update the legend.
   * Somewhat based on http://bl.ocks.org/mbostock/4573883
   */
function updateLegend() {
    // We determine the width of the legend. It is based on the width of
    // the map minus some spacing left and right.
  var legendWidth = d3.select('#map').node().getBoundingClientRect().width - 50;
    // We determine the domain of the quantize scale which will be used as
    // tick values. We cannot directly use the scale via quantize.scale()
    // as this returns only the minimum and maximum values but we need all
    // the steps of the scale. The range() function returns all categories
    // and we need to map the category values (q0-9, ..., q8-9) to the
    // number values. To do this, we can use invertExtent().
  var legendDomain = quantize.range().map(function(d) {
    var r = quantize.invertExtent(d);
    return r[1];
  });
    // Since we always only took the upper limit of the category, we also
    // need to add the lower limit of the very first category to the top
    // of the domain.
  legendDomain.unshift(quantize.domain()[0]);
    // On smaller screens, there is not enough room to show all 10
    // category values. In this case, we add a filter leaving only every
    // third value of the domain.
  if (legendWidth < 400) {
    legendDomain = legendDomain.filter(function(d, i) {
      return i % 3 == 0;
    });
  }
    // We set the domain and range for the x scale of the legend. The
    // domain is the same as for the quantize scale and the range takes up
    // all the space available to draw the legend.
  legendX
    .domain(quantize.domain())
    .range([0, legendWidth]);
    // We update the rectangles by (re)defining their position and width
    // (both based on the legend scale) and setting the correct class.
  g.selectAll("rect")
    .data(quantize.range().map(function(d) {
      return quantize.invertExtent(d);
    }))
    .attr("height", 8)
    .attr("x", function(d) { return legendX(d[0]); })
    .attr("width", function(d) { return legendX(d[1]) - legendX(d[0]); })
    .attr('class', function(d, i) {
      return quantize.range()[i];
    });
    // We update the legend caption. To do this, we take the text of the
    // currently selected dropdown option.
    // We set the calculated domain as tickValues for the legend axis.
  legendXAxis
    .tickValues(legendDomain)
    // We call the axis to draw the axis.
  g.call(legendXAxis);
}
//Load the features from the TopoJSON.
d3.json('/test.json', function(error, features) {
  // Read the data for the cartogram
    // We store the data object in the variable which is accessible from
    // outside of this function.
    mapData = NEW_DATA;
    dataByCountry = d3.nest()
      .key(function(d) { return d.country; })
      .rollup(function(d) { return d[0]; })
      .object(mapData);
      // We add the features to the <g> element created before.
      // D3 wants us to select the (non-existing) path objects first ...
    mapFeatures.selectAll('path')
      // ... and then enter the data. For each feature, a <path>
      // element is added.
      .data(features.features)
    .enter().append('path')
      // .attr('class', function(d) {
      // })
      // As "d" attribute, we set the path of the feature.
      .attr('d', path)
      // When the mouse moves over a feature, show the tooltip.
      .on('mousemove', showTooltip)
      .on('mouseout', removeTooltip);
    // Call the function to update the map colors.
    updateMapColors();
});
/**
 * Update the colors of the features on the map. Each feature is given a
 * CSS class based on its value.
 */
function updateMapColors() {
  // Set the domain of the values (the minimum and maximum values of
  // all values of the current key) to the quantize scale.
  quantize.domain([
    d3.min(mapData, function(d) { return getValueOfData(d); }),
    d3.max(mapData, function(d) { return getValueOfData(d); })
  ]);
  // Update the class (determining the color) of the features.
  mapFeatures.selectAll('path')
    .attr('class', function(f) {
        // Use the quantized value for the class.
        if(countryCodes.hasOwnProperty(f.properties.name)){
          return quantize(dataByCountry[f.properties.name].category);
        }
        else{
          return "empty"
        }
    });
  // We call the function to update the legend.
  updateLegend();
}
/**
 * Show a tooltip with the name of the feature.
 *
 * @param {object} f - A GeoJSON Feature object.
 */
function showTooltip(d) {
  if(countryCodes.hasOwnProperty(d.properties.name)){
  var data = dataByCountry[d.properties.name];
  var dataCurrentKey = data[currentKey]
  var mouse = d3.mouse(d3.select('#map').node()).map(
    function(d) { return parseInt(d); }
  );
  var left = Math.min(width - 4 * data.country.length, mouse[0] + 5);
  var top = mouse[1] + 25;
  tooltip.classed('hidden', false)
    .attr("style", "left:" + left + "px; top:" + top + "px")
    .html("<div><p>"+ data.country + ": " + dataCurrentKey +"</p></div>");
  }
}
function removeTooltip(){
    tooltip.classed('hidden', true);
}
/**
 * Helper function to access the (current) value of a data object.
 *
 * Use "+" to convert text values to numbers.
 *
 * @param {object} d - A data object representing an entry (one line) of
 * the data CSV.
 */
function getValueOfData(d) {
  return +d[currentKey];
}
function getValueOfCountry(d) {
  return +d[countryName];
}
/**
 * Helper function to retrieve the ID of a feature. The ID is found in
 * the properties of the feature.
 *
 * @param {object} f - A GeoJSON Feature object.
 */
function getIdOfFeature(f) {
  return countryCodes[f.properties.name];
}
}
;
$(document).ready(function() {
// if (document.getElementById("hex-container")) {

    /* Check the location of each desired element */
    $('#hex4').each( function(i){

        var bottom_of_object = $(this).offset().top + $(this).outerHeight();
        var bottom_of_window = $(window).scrollTop() + $(window).height();

        $(this).animate({'opacity':'1'},2000);

    });



    $('#hex7').each( function(i){

        var bottom_of_object = $(this).offset().top + $(this).outerHeight();
        var bottom_of_window = $(window).scrollTop() + $(window).height();

        $(this).animate({'opacity':'1'},2500);

    });


    $('#hex6').each( function(i){

        var bottom_of_object = $(this).offset().top + $(this).outerHeight();
        var bottom_of_window = $(window).scrollTop() + $(window).height();

        $(this).animate({'opacity':'1'},1500);

    });

    $('#hex5').each( function(i){

        var bottom_of_object = $(this).offset().top + $(this).outerHeight();
        var bottom_of_window = $(window).scrollTop() + $(window).height();

        $(this).animate({'opacity':'1'},3000);

    });

    $('#hex3').each( function(i){

        var bottom_of_object = $(this).offset().top + $(this).outerHeight();
        var bottom_of_window = $(window).scrollTop() + $(window).height();

        $(this).animate({'opacity':'1'},1000);

    });
// }
});

$('.hexagon-in2').mouseover(function() {
    $('.graph-title').removeClass('hidden-title');
});
if (document.getElementById("tree_graph")) {
var treeData = NEW_DATA;

// var treeData = {
//   "YEAR" : "2015",
//   "children" : [
//     {
//       "CATEGORY_CODE" : "GF01",
//       "CATEGORY" : "General public services",
//       "VALUE" : 6.9,
//       "children" : [

//         {
//           "CATEGORY_CODE" : "GF0101",
//           "CATEGORY" : "Executive and legislative organs",
//           "VALUE" : 2.4
//         },
//         {
//           "CATEGORY_CODE" : "GF0102",
//           "CATEGORY" : "Foreign economic aid",
//           "VALUE" : 0.1
//         },
//         {
//           "CATEGORY_CODE" : "GF0103",
//           "CATEGORY" : "General services",
//           "VALUE" : 1.2
//         },
//         {
//           "CATEGORY_CODE" : "GF0104",
//           "CATEGORY" : "Basic research",
//           "VALUE" : 0.5
//         },
//         {
//           "CATEGORY_CODE" : "GF0105",
//           "CATEGORY" : "R&D General public services",
//           "VALUE" : 0
//         },
//         {
//           "CATEGORY_CODE" : "GF0106",
//           "CATEGORY" : "General public services n.e.c.",
//           "VALUE" : 0
//         },
//         {
//           "CATEGORY_CODE" : "GF0107",
//           "CATEGORY" : "Public debt transactions",
//           "VALUE" : 2.6
//         },
//         {
//           "CATEGORY_CODE" : "GF0108",
//           "CATEGORY" : "Transfers of a general character between different levels of government",
//           "VALUE" : 0.1
//         }

//       ]
//     },
//     {
//       "CATEGORY_CODE" : "GF02",
//       "CATEGORY" : "Defence",
//       "VALUE" : 0.6,
//       "children" : [
//         {
//           "CATEGORY_CODE" : "GF0201",
//           "CATEGORY" : "Military defence",
//           "VALUE" : 0.5
//         },
//         {
//           "CATEGORY_CODE" : "GF0202",
//           "CATEGORY" : "Civil defence",
//           "VALUE" : 0.0
//         },
//         {
//           "CATEGORY_CODE" : "GF0203",
//           "CATEGORY" : "Foreign military aid",
//           "VALUE" : 0.0
//         },
//         {
//           "CATEGORY_CODE" : "GF0204",
//           "CATEGORY" : "R&D Defence",
//           "VALUE" : 0.0
//         },
//         {
//           "CATEGORY_CODE" : "GF0205",
//           "CATEGORY" : "Defence n.e.c.",
//           "VALUE" : 0.1
//         }

//       ]
//     },
//     {
//       "CATEGORY_CODE" : "GF03",
//       "CATEGORY" : "Public order and safety",
//       "VALUE" : 1.4,
//       "children" : [
//         {
//           "CATEGORY_CODE" : "GF0301",
//           "CATEGORY" : "Police services",
//           "VALUE" : 0.8
//         },
//         {
//           "CATEGORY_CODE" : "GF0302",
//           "CATEGORY" : "Fire-protection services",
//           "VALUE" : 0.2
//         },
//         {
//           "CATEGORY_CODE" : "GF0303",
//           "CATEGORY" : "Law courts",
//           "VALUE" : 0.3
//         },
//         {
//           "CATEGORY_CODE" : "GF0304",
//           "CATEGORY" : "Prisons",
//           "VALUE" : 0.1
//         },
//         {
//           "CATEGORY_CODE" : "GF0305",
//           "CATEGORY" : "R&D Public order and safety",
//           "VALUE" : 0.0
//         },
//         {
//           "CATEGORY_CODE" : "GF0306",
//           "CATEGORY" : "Public order and safety n.e.c.",
//           "VALUE" : 0.0
//         }
//       ]
//     },
//     {
//       "CATEGORY_CODE" : "GF04",
//       "CATEGORY" : "Economic affairs",
//       "VALUE" : 6.2,
//       "children" : [

//         {
//           "CATEGORY_CODE" : "GF0401",
//           "CATEGORY" : "General economic, commercial and labour affairs",
//           "VALUE" : 1.9
//         },
//         {
//           "CATEGORY_CODE" : "GF0402",
//           "CATEGORY" : "Agriculture, forestry, fishing and hunting",
//           "VALUE" : 0.4
//         },
//         {
//           "CATEGORY_CODE" : "GF0403",
//           "CATEGORY" : "Fuel and energy",
//           "VALUE" : 0.0
//         },
//         {
//           "CATEGORY_CODE" : "GF0404",
//           "CATEGORY" : "Mining, manufacturing and construction",
//           "VALUE" : 0.0
//         },
//         {
//           "CATEGORY_CODE" : "GF0405",
//           "CATEGORY" : "Transport",
//           "VALUE" : 2.9
//         },
//         {
//           "CATEGORY_CODE" : "GF0406",
//           "CATEGORY" : "Communication",
//           "VALUE" : 0.0
//         },
//         {
//           "CATEGORY_CODE" : "GF0407",
//           "CATEGORY" : "Other industries",
//           "VALUE" : 0.2
//         },
//         {
//           "CATEGORY_CODE" : "GF0408",
//           "CATEGORY" : "R&D Economic affairs",
//           "VALUE" : 0.8
//         },
//         {
//           "CATEGORY_CODE" : "GF0408",
//           "CATEGORY" : "Economic affairs n.e.c.",
//           "VALUE" : 0.0
//         }
//       ]
//     },
//     {
//       "CATEGORY_CODE" : "GF05",
//       "CATEGORY" : "Environment protection",
//       "VALUE" : 0.4,
//       "children" : [

//         {
//           "CATEGORY_CODE" : "GF0501",
//           "CATEGORY" : "Waste management",
//           "VALUE" : 0.1
//         },
//         {
//           "CATEGORY_CODE" : "GF0502",
//           "CATEGORY" : "Waste water management",
//           "VALUE" : 0.1
//         },
//         {
//           "CATEGORY_CODE" : "GF0503",
//           "CATEGORY" : "Pollution abatement",
//           "VALUE" : 0.2
//         },
//         {
//           "CATEGORY_CODE" : "GF05",
//           "CATEGORY" : "Protection of biodiversity and landscape",
//           "VALUE" : 0.0
//         },
//         {
//           "CATEGORY_CODE" : "GF0505",
//           "CATEGORY" : "R&D Environmental protection",
//           "VALUE" : 0.0
//         },
//         {
//           "CATEGORY_CODE" : "GF0506",
//           "CATEGORY" : "Environmental protection n.e.c.",
//           "VALUE" : 0.1
//         }
//       ]
//     },
//     {
//       "CATEGORY_CODE" : "GF06",
//       "CATEGORY" : "Housing and community amenities",
//       "VALUE" : 0.4,
//       "children" : [

//         {
//           "CATEGORY_CODE" : "GF0601",
//           "CATEGORY" : "Housing developmentt",
//           "VALUE" : 0.2
//         },
//         {
//           "CATEGORY_CODE" : "GF0602",
//           "CATEGORY" : "Community development",
//           "VALUE" : 0.1
//         },
//         {
//           "CATEGORY_CODE" : "GF0603",
//           "CATEGORY" : "Water supply",
//           "VALUE" : 0.0
//         },
//         {
//           "CATEGORY_CODE" : "GF05",
//           "CATEGORY" : "Street lighting",
//           "VALUE" : 0.1
//         },
//         {
//           "CATEGORY_CODE" : "GF0605",
//           "CATEGORY" : "R&D Housing and community amenities",
//           "VALUE" : 0.0
//         },
//         {
//           "CATEGORY_CODE" : "GF0606",
//           "CATEGORY" : "Housing and community amenities n.e.c.",
//           "VALUE" : 0.0
//         }
//       ]
//     },
//     {
//       "CATEGORY_CODE" : "GF07",
//       "CATEGORY" : "Health",
//       "VALUE" : 8.0,
//       "children" : [

//         {
//           "CATEGORY_CODE" : "GF0701",
//           "CATEGORY" : "Medical products, appliances and equipment",
//           "VALUE" : 1.1
//         },
//         {
//           "CATEGORY_CODE" : "GF0702",
//           "CATEGORY" : "Outpatient services",
//           "VALUE" : 1.5
//         },
//         {
//           "CATEGORY_CODE" : "GF0703",
//           "CATEGORY" : "Hospital services",
//           "VALUE" : 4.5
//         },
//         {
//           "CATEGORY_CODE" : "GF0704",
//           "CATEGORY" : "Public health services",
//           "VALUE" : 0.2
//         },
//         {
//           "CATEGORY_CODE" : "GF0705",
//           "CATEGORY" : "R&D Health",
//           "VALUE" : 0.5
//         },
//         {
//           "CATEGORY_CODE" : "GF0706",
//           "CATEGORY" : "Health n.e.c.",
//           "VALUE" : 0.3
//         }
//       ]
//     },
//     {
//       "CATEGORY_CODE" : "GF08",
//       "CATEGORY" : "Recreation, culture and religion",
//       "VALUE" : 1.2,
//       "children" : [

//         {
//           "CATEGORY_CODE" : "GF0801",
//           "CATEGORY" : "Recreational and sporting services",
//           "VALUE" : 0.3
//         },
//         {
//           "CATEGORY_CODE" : "GF0802",
//           "CATEGORY" : "Cultural services",
//           "VALUE" : 0.5
//         },
//         {
//           "CATEGORY_CODE" : "GF0803",
//           "CATEGORY" : "Broadcasting and publishing services",
//           "VALUE" : 0.3
//         },
//         {
//           "CATEGORY_CODE" : "GF0804",
//           "CATEGORY" : "Religious and other community services",
//           "VALUE" : 0.0
//         },
//         {
//           "CATEGORY_CODE" : "GF0805",
//           "CATEGORY" : "R&D Recreation, culture and religion",
//           "VALUE" : 0.0
//         },
//         {
//           "CATEGORY_CODE" : "GF0806",
//           "CATEGORY" : "Recreation, culture and religion n.e.c.",
//           "VALUE" : 0.0
//         }
//       ]
//     },
//     {
//       "CATEGORY_CODE" : "GF09",
//       "CATEGORY" : "Education",
//       "VALUE" : 5.0,
//       "children" : [

//         {
//           "CATEGORY_CODE" : "GF0901",
//           "CATEGORY" : "Pre-primary and primary education",
//           "VALUE" : 1.4
//         },
//         {
//           "CATEGORY_CODE" : "GF0902",
//           "CATEGORY" : "Secondary education",
//           "VALUE" : 2.2
//         },
//         {
//           "CATEGORY_CODE" : "GF0903",
//           "CATEGORY" : "Post-secondary non-tertiary education",
//           "VALUE" : 0.0
//         },
//         {
//           "CATEGORY_CODE" : "GF0904",
//           "CATEGORY" : "Tertiary education",
//           "VALUE" : 0.8
//         },
//         {
//           "CATEGORY_CODE" : "GF0905",
//           "CATEGORY" : "Education not definable by level",
//           "VALUE" : 0.2
//         },
//         {
//           "CATEGORY_CODE" : "GF0906",
//           "CATEGORY" : "Subsidiary services to education",
//           "VALUE" : 0.2
//         },
//         {
//           "CATEGORY_CODE" : "GF0907",
//           "CATEGORY" : "R&D Education",
//           "VALUE" : 0.0
//         },
//         {
//           "CATEGORY_CODE" : "GF0908",
//           "CATEGORY" : "Education n.e.c.",
//           "VALUE" : 0.1
//         }
//       ]
//     },
//     {
//       "CATEGORY_CODE" : "GF10",
//       "CATEGORY" : "Social protection",
//       "VALUE" : 21.7,
//       "children" : [

//         {
//           "CATEGORY_CODE" : "GF1001",
//           "CATEGORY" : "Sickness and disability",
//           "VALUE" : 1.9
//         },
//         {
//           "CATEGORY_CODE" : "GF1002",
//           "CATEGORY" : "Old age",
//           "VALUE" : 13.1
//         },
//         {
//           "CATEGORY_CODE" : "GF1003",
//           "CATEGORY" : "Survivors",
//           "VALUE" : 1.5
//         },
//         {
//           "CATEGORY_CODE" : "GF1004",
//           "CATEGORY" : "Family and children",
//           "VALUE" : 2.3
//         },
//         {
//           "CATEGORY_CODE" : "GF1005",
//           "CATEGORY" : "Unemployment",
//           "VALUE" : 1.5
//         },
//         {
//           "CATEGORY_CODE" : "GF1006",
//           "CATEGORY" : "Housing",
//           "VALUE" : 0.1
//         },
//         {
//           "CATEGORY_CODE" : "GF1007",
//           "CATEGORY" : "Social exclusion n.e.c.",
//           "VALUE" : 1.0
//         },
//         {
//           "CATEGORY_CODE" : "GF1008",
//           "CATEGORY" : "R&D Social protection",
//           "VALUE" : 0.0
//         },
//         {
//           "CATEGORY_CODE" : "GF1009",
//           "CATEGORY" : "Social protection n.e.c.",
//           "VALUE" : 0.2
//         }
//       ]
//     }
//   ],
//   "CATEGORY" : "Austria",
//   "VALUE" : 57.7
// };

// Set the dimensions and margins of the diagram
var margin = {top: 20, right: 90, bottom: 30, left: 90},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("#tree_graph").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate("
          + margin.left + "," + margin.top + ")");

var i = 0,
    duration = 750,
    root;

// declares a tree layout and assigns the size
var treemap = d3.tree().size([height, width]);

// Assigns parent, children, height, depth
root = d3.hierarchy(treeData, function(d) { return d.children; });
root.x0 = height / 2;
root.y0 = 0;

// Collapse after the second level
root.children.forEach(collapse);

update(root);

// Collapse the node and all it's children
function collapse(d) {
  if(d.children) {
    d._children = d.children
    d._children.forEach(collapse)
    d.children = null
  }
}

function update(source) {

  // Assigns the x and y position for the nodes
  var treeData = treemap(root);

  // Compute the new tree layout.
  var nodes = treeData.descendants(),
      links = treeData.descendants().slice(1);

  // Normalize for fixed-depth.
  nodes.forEach(function(d){ d.y = d.depth * 210});

  // ****************** Nodes section ***************************

  // Update the nodes...
  var node = svg.selectAll('g.node')
      .data(nodes, function(d) {return d.id || (d.id = ++i); });

  // Enter any new modes at the parent's previous position.
  var nodeEnter = node.enter().append('g')
      .attr('class', 'node')
      .attr("transform", function(d) {
        return "translate(" + source.y0 + "," + source.x0 + ")";
    })
    .on('click', click);

  // Add Circle for the nodes
  nodeEnter.append('circle')
      .attr('class', 'node')
      .attr('r', 1e-6)
      .style("fill", function(d) {
          return d._children ? "lightsteelblue" : "#fff";
      });

  // Add labels for the nodes
  nodeEnter.append('text')
      .attr("dy", ".35em")
      .attr("x", function(d) {
          return d.children || d._children ? 25 : 20;
      })
      .attr("text-anchor", function(d) {
          return d.children || d._children ? "start" : "start";
      })
      .text(function(d) { return d.data.CATEGORY; });

  // UPDATE
  var nodeUpdate = nodeEnter.merge(node);

  // Transition to the proper position for the node
  nodeUpdate.transition()
    .duration(duration)
    .attr("transform", function(d) {
        return "translate(" + d.y + "," + d.x + ")";
     });

  // Update the node attributes and style
  nodeUpdate.select('circle.node')
    .attr('r', function(d) { return d.data.VALUE; })
    .style("fill", function(d) {
        return d._children ? "lightsteelblue" : "#fff";
    })
    .attr('cursor', 'pointer');


  // Remove any exiting nodes
  var nodeExit = node.exit().transition()
      .duration(duration)
      .attr("transform", function(d) {
          return "translate(" + source.y + "," + source.x + ")";
      })
      .remove();

  // On exit reduce the node circles size to 0
  nodeExit.select('circle')
    .attr('r', 1e-6);

  // On exit reduce the opacity of text labels
  nodeExit.select('text')
    .style('fill-opacity', 1e-6);

  // ****************** links section ***************************

  // Update the links...
  var link = svg.selectAll('path.link')
      .data(links, function(d) { return d.id; });

  // Enter any new links at the parent's previous position.
  var linkEnter = link.enter().insert('path', "g")
      .attr("class", "link")
      .style("stroke-width", function (d) {return (d.data.VALUE)*2})
      .attr('d', function(d){
        var o = {x: source.x0, y: source.y0}
        return diagonal(o, o)
      });

  // UPDATE
  var linkUpdate = linkEnter.merge(link);

  // Transition back to the parent element position
  linkUpdate.transition()
      .duration(duration)
      .attr('d', function(d){ return diagonal(d, d.parent) });

  // Remove any exiting links
  var linkExit = link.exit().transition()
      .duration(duration)
      .attr('d', function(d) {
        var o = {x: source.x, y: source.y}
        return diagonal(o, o)
      })
      .remove();

  // Store the old positions for transition.
  nodes.forEach(function(d){
    d.x0 = d.x;
    d.y0 = d.y;
  });

  // Creates a curved (diagonal) path from parent to the child nodes

  // Toggle children on click.
  function click(d) {
    if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
    update(d);
  }
}
};













// re: ActiveAdmin:
// In your application.js, require_tree will also ActiveAdmin JS for your entire website.
// Switch to using specifics require for each file.

$('#category-select .checkbox label').on('click', function(){
	$('#summary-category').text("");
	$('#category-select .checkbox label').each(function(i, item) {
		if ($('input', item).is(":checked")) {
			$('#summary-category').append('<li>' + $(this).text() + '</li>')
		}
	});
})

$('#country-select .checkbox label').on('click', function(){
	$('#summary-country').text("");
	$('#country-select .checkbox label').each(function(i, item) {
		if ($('input', item).is(":checked")) {
			$('#summary-country').append('<li>' + $(this).text() + '</li>')
		}
	});
})

$(document).ready(function(){
	$('.dimple-bubble').css('opacity', 1);
  $('#map').css('opacity', 1);
  $('#map').css('filter', 'none');
})
;
