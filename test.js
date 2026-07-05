function startPlugin() {
    console.log('TEST PLUGIN STARTED');
    Lampa.Noty.show('TEST PLUGIN STARTED');

    Lampa.Listener.follow('full', function (e) {
        if (e.type === 'complite') {

            var button = $(
                '<li class="menu__item selector">' +
                    '<div class="menu__ico">🧪</div>' +
                    '<div class="menu__text">АРМАГЕДДОН 999</div>' +
                '</li>'
            );

            button.on('hover:enter', function () {
                Lampa.Noty.show('BUTTON WORKS');
            });

            $('.menu .menu__list').eq(0).append(button);

            console.log('BUTTON ADDED');
            Lampa.Noty.show('BUTTON ADDED');
        }
    });
}

if (window.appready) {
    startPlugin();
} else {
    Lampa.Listener.follow('app', function (e) {
        if (e.type === 'ready') {
            startPlugin();
        }
    });
}
