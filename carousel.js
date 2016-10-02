(function ($) {

    $.fn.carousel = function (opt) {

        var options = $.extend({
            container: '#slider_container',
            slides: '.slides',
            next: '#prevSlide',
            prev: '#nextSlide',
            circles: '.dots',


        }, opt);
        var make = function () {

            var w = $(options.container).width();
            $(options.slides + '>li').width(w);
            $(options.slides).width(w * $(options.slides + '>li').length);

            $(options.slides + '>li:last-child').prependTo(options.slides);

            $(options.slides).css('left', -w);


            //массив количества точек и присвоение классов 
            var ArrDots = [];
            $(options.circles + ' div').each(function (e) {
                $(this).addClass('' + (+e + 1));
                ArrDots.push(e + 1);

            });

            // нажатие на точки
            var numbotcur = 1;
            $(options.circles + ' div').click(function () {
                var numbdot = $(this).attr('class');
                if (numbdot > numbotcur) {
                    for (var i = numbotcur; i < numbdot; i++) {
                        next();
                    };

                } else if (numbdot < numbotcur) {
                    for (var i = numbotcur; i > numbdot; i--) {
                        prev();
                    };
                }
                numbotcur = numbdot;
            });


            function prev() { //prev

                $(options.slides).animate({
                    'margin-left': -w
                }, 400, function () {
                    $(options.slides + '>li:first-child').appendTo(options.slides);
                    $(options.slides).css('margin-left', 0);

                    $(options.circles + ' div').css({ 'background-color': 'gray', });
                    ArrDots.unshift(ArrDots.pop());
                    $(options.circles + ' div:nth-child(' + ArrDots[0] + ')').css({
                        'background-color': 'red',
                    });
                });

            }

            $(options.next).click(next);

            function next() {
                $(options.slides).animate({
                    'margin-left': w
                }, 400, function () {

                    $(options.slides + '>li:last-child').prependTo(options.slides);
                    $(options.slides).css('margin-left', 0);

                    $(options.circles + ' div').css({ 'background-color': 'gray', });
                    ArrDots.push(ArrDots.shift());
                    $(options.circles + ' div:nth-child(' + ArrDots[0] + ')').css({
                        'background-color': 'red',
                    });
                });



            }

            $(options.prev).click(prev);

            // autoscroll
            var intervalID;
            if (options.autoscroll != undefined) {
                intervalID = setInterval(next, options.autoscroll);
            };


            function stop() {
                clearInterval(intervalID);
                function timout() {
                 intervalID = setInterval(next, options.autoscroll);
                };
                setTimeout( timout, 2000 );
                console.log(options.autoscroll);
            };

             $(options.next).click(stop);









        }

        return this.each(make) // this - возвращает то, к чему применяется функция testPlug ( см. index.html )
    }

} (jQuery))