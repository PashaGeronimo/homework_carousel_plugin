Втянул готовый слайдер в плагин.
Добавил точки и рекцию на нажатие.
При автоскролле срабатывает остановка если пользователь кликнет на кружок или NEXT/PREV, затем возобновляется.
Задаются следующие параметры
```
             container:'#slider_container',
             slides:'.slides',
             next:'#prevSlide',
             prev: '#nextSlide',
             circles: '.dots',
             autoscroll: 700,
```
Вызывается 
```
$(document).carousel();
```


[Запустить выполнение:](https://cdn.rawgit.com/PashaGeronimo/homework_carousel_plugin/master/carousel.html)

