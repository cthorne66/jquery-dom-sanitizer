# jquery-dom-sanitizer
A simple addition to jQuery to prevent typical vulnerabilities


Taken from a post from Nicholas C. Zakas (@slicknet) at https://www.box.com/blog/securing-jquery-against-unintended-xss, this is an easy way to extend the following jQuery methods to remove possibly injected scripts

```javascript
$('selector').html();
$('selector').before();
$('selector').after();
$('selector').append();
$('selector').prepend();
$('selector').appendTo();
$('selector').prependTo();

```

### Steps
1. Include jQuery in your page
2. Include jQuerySanitizer.js in your page