(function () {

    Lampa.Noty.show('TEST PLUGIN LOADED');

    console.log('TEST PLUGIN LOADED');

    Lampa.Component.add('test_plugin', {
        render: function () {
            this.activity.loader(false);
            this.activity.empty('Плагин работает!');
        }
    });

    var button = $(
        '<li class="menu__item selector">' +
            '<div class="menu__ico">🧪</div>' +
            '<div class="menu__text">Тест плагина</div>' +
        '</li>'
    );

    button.on('hover:enter', function () {
        Lampa.Activity.push({
            url: '',
            title: 'Тест',
            component: 'test_plugin'
        });
    });

    $('.menu .menu__list').eq(0).append(button);

})();