(function($) {

    $.fn.carousel = function(opt) {

        var options = $.extend({
            container: '#slider_container',
            slides: '.slides',
            next: '#prevSlide',
            prev: '#nextSlide',
            circles: '.dots',


        }, opt);
        var make = function() {

            var w = $(options.container).width();
            $(options.slides + '>li').width(w);
            $(options.slides).width(w * $(options.slides + '>li').length);
            $(options.slides + '>li:last-child').prependTo(options.slides);
            $(options.slides).css('left', -w);

            //массив количества точек и присвоение классов 
            var ArrDots = [];
            $(options.circles + ' div').each(function(e) {
                $(this).addClass('' + (+e + 1));
                ArrDots.push(e + 1);
            });

            // нажатие на точки
            var numbotcur = 1;
            $(options.circles + ' div').click(function() {
                stop(); //остановка автоскролла
                var numbdot = $(this).attr('class'); // на какую точку кликнул
                if (numbdot > ArrDots[0]) {
                    numbotcur = ArrDots[0];
                    for (var i = numbotcur; i < numbdot; i++) {
                        next();
                    };
                } else if (numbdot < ArrDots[0]) {
                    numbotcur = ArrDots[0];
                    for (var i = numbotcur; i > numbdot; i--) { prev(); };
                }
                numbotcur = numbdot;
            });


            function prev() {
                numbotcur = ArrDots[1];
                $(options.slides).animate({
                    'margin-left': -w
                }, 400, function() {
                    $(options.slides + '>li:first-child').appendTo(options.slides);
                    $(options.slides).css('margin-left', 0);
                    // раскрашивание точек
                    $(options.circles + ' div').css({ 'background-color': 'gray', });
                    ArrDots.unshift(ArrDots.pop());
                    $('.' + ArrDots[0]).css({ 'background-color': 'red', });


                });
            }

            function next() {
                numbotcur = ArrDots[1];
                $(options.slides).animate({
                    'margin-left': w
                }, 400, function() {
                    $(options.slides + '>li:last-child').prependTo(options.slides);
                    $(options.slides).css('margin-left', 0);
                    // раскрашивание точек
                    $(options.circles + ' div').css({ 'background-color': 'gray', });
                    ArrDots.push(ArrDots.shift());
                    $('.' + ArrDots[0]).css({ 'background-color': 'red', });

                });
            }

            $(options.next).click(stop).click(next);
            $(options.prev).click(stop).click(prev);

            // autoscroll
            var intervalID;

            function autoscroll() {
                if (options.autoscroll != undefined) {
                    intervalID = setInterval(next, options.autoscroll);
                };
            };
            autoscroll()

            var s = 1; // не позволяет заупуститься повторно функции
            function stop() { //остановка автоскролла при нажатии на кнопку
                if (s == 1) {
                    s = 0;

                    function timeout() {
                        autoscroll();
                        s = 1;
                    };
                    clearInterval(intervalID);
                    setTimeout(timeout, 3000);
                };
            };

        }
        return this.each(make) // this - возвращает то, к чему применяется функция testPlug ( см. index.html )
    }

}(jQuery))