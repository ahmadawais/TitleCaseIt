/**
 * Title Case Conversions
 *
 * @author Ahmad Awais
 */
String.prototype.toTitleCase = function(){
  var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;

  return this.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function(match, index, title){
    if (index > 0 && index + match.length !== title.length &&
      match.search(smallWords) > -1 && title.charAt(index - 2) !== ":" &&
      (title.charAt(index + match.length) !== '-' || title.charAt(index - 1) === '-') &&
      title.charAt(index - 1).search(/[^\s-]/) < 0) {
      return match.toLowerCase();
    }

    if (match.substr(1).search(/[A-Z]|\../) > -1) {
      return match;
    }

    return match.charAt(0).toUpperCase() + match.substr(1);
  });
};

/**
 * Live input to p title change
 *
 * @author Ahmad Awais
 */

$(document).ready(function() {
    $(".aa_case__untitled").focus();
    $(".aa_case__untitled").bind('input change paste keyup mouseup', function(event) {
        var _this = this;
 // Short pause to wait for paste to complete
        setTimeout( function() {
            var text = $(_this).val();
						var tcase = text.toTitleCase();
            $(".aa_case__display").html(tcase);
        }, 100);
    });
});
