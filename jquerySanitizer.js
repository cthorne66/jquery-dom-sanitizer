(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

	// our custom purifier
	var purifyHTML = function (html) {

		var html = $(html.bold());
		html.find('script').remove();

		return html.html();
	};

	// store references to original methods
	var original = {
		html: $.fn.html,
		before: $.fn.before,
		after: $.fn.after,
		append: $.fn.append,
		prepend: $.fn.prepend
	};

	/**
	 * Purifies each item in an array. Any array item that is a string is
	 * purified and all others are passed through as-is. If an array item
	 * is an array, then recursively purify that too.
	 * @param {Array} values The values to check.
	 * @return {Array} A new array with purified strings.
	 */
	var purifyArray = function (values) {

		var purified = [];

		for (var i = 0, len = values.length; i < len; i++) {

			// if it is an array, check the array items
			if ($.isArray(values[i])) {
				purified.push(purifyArray(values[i]));
			} else {
				// if the argument is a string, purify it
				purified.push(
					(typeof values[i] === 'string') ? purifyHTML(values[i]) : values[i]
				);
			}

		}

		return purified;
	};

	/**
	 * Creates a function that purifies any string elements and then calls the
	 * original method.
	 * @private
	 * @param {String} originalName The original method name to call.
	 * @return {Function} The function to take the original's place.
	 */
	var createPurifiedFunction = function (originalName) {
		return function () {
			return original[originalName].apply(this, purifyArray(arguments));
		};
	};

	// purified versions of native jQuery methods
	$.fn.extend({
		html: createPurifiedFunction('html'),
		before: createPurifiedFunction('before'),
		after: createPurifiedFunction('after'),
		append: createPurifiedFunction('append'),
		prepend: createPurifiedFunction('prepend')
	});

}));
