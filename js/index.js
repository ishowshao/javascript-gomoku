/**
 * Created with JetBrains PhpStorm.
 * User: ishowshao
 * Date: 12-9-5
 * Time: 下午10:42
 */
if (typeof console == 'undefined') {
    console = {};
    console.log = function () {};
}

if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (callback, thisObject) {
        for (var i = 0; i < this.length; i++) {
            callback.call(thisObject || null, this[i], i);
        }
    };
}

if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement, fromIndex) {
        var findIndex = -1;
        for (var i = fromIndex || 0; i < this.length; i++) {
            if (this[i] === searchElement) {
                findIndex = i;
                break;
            }
        }
        return findIndex;
    };
}

jQuery(function () {

    jQuery('#play').click(function (e) {
        e.preventDefault();
        jQuery(this).hide();
        jQuery('#replay').show();

        if (jQuery('#mode').val() == 1) {
            window.gomoku = new Gomoku();
            gomoku.play(jQuery('input[name="black-or-white"]:checked').val());
        } else {
            var code = jQuery('#code').val();
            window.gomoku = new Gomoku(Gomoku.getChallenger(code));
            gomoku.play(jQuery('input[name="black-or-white"]:checked').val());
        }
    });

    jQuery('#replay').click(function (e) {
        e.preventDefault();
        gomoku.replay(jQuery('input[name="black-or-white"]:checked').val());
    });

    jQuery('#mode').change(function () {
        if (jQuery(this).val() == 1) {
            jQuery('label[for=code]').hide();
        } else {
            jQuery('label[for=code]').show();
        }
    }).change();
});