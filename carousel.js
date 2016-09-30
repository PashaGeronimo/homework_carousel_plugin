(function ($) {

    $.fn.carousel = function (opt) {

        var options = $.extend({
            container: '#slider_container',
            slides: '.slides',
            next: '#prevSlide',
            prev: '#nextSlide',

        }, opt);
        var make = function () {
            
            var w = $(options.container).width();
            $(options.slides + '>li').width(w);
            $(options.slides).width(w * $(options.slides + '>li').length);

            $(options.slides + '>li:last-child').prependTo(options.slides);

            $(options.slides).css('left', -w);

            function next() {
                $(options.slides).animate({
                    'margin-left': -w
                }, 400, function () {
                    $(options.slides + '>li:first-child').appendTo(options.slides);
                    $(options.slides).css('margin-left', 0);
                });
            }

            $(options.next).click(next);

            function prev() {
                $(options.slides).animate({
                    'margin-left': w
                }, 400, function () {
                    $(options.slides + '>li:last-child').prependTo(options.slides);
                    $(options.slides).css('margin-left', 0);
                });
            }

            $(options.prev).click(prev);

            if (options.autoscroll != undefined) {
                setInterval(next, options.autoscroll);
            };

        }

        return this.each(make) // this - возвращает то, к чему применяется функция testPlug ( см. index.html )
    }

} (jQuery))