(function () {
    
    console.log('KINOPOISK PLUGIN LOADED');
    
    'use strict';

    const WORKER_URL = 'https://kinopoisk-watch-api.samotxave.workers.dev';
    const DEVICE_ID = '01b66544-35c7-4515-ac06-0d1b90574608';

    function load(oncomplete) {
    
    console.log('LOAD STARTED');

        fetch(
            `${WORKER_URL}/watchlist?device_id=${DEVICE_ID}`
        )
        .then(r => r.json())
        .then(data => {

            const results = data.items
                .filter(item => item.tmdb_full)
                .map(item => item.tmdb_full);
            
            oncomplete({
                page: 1,
                results: results
            });
        })
        .catch(() => {
            oncomplete({
                page: 1,
                results: []
            });
        });
    }

    function component(object) {

	console.log('COMPONENT CREATED');

        const comp = new Lampa.InteractionCategory(object);

        comp.create = function () {
            load(this.build.bind(this));
        };

        comp.nextPageRequest = function (object, resolve) {
            load(resolve.bind(comp));
        };

        return comp;
    }

    function start() {

        Lampa.Component.add(
            'kinopoisk_watch',
            component
        );

        const button = $(`
            <li class="menu__item selector">
                <div class="menu__text">
                    Кинопоиск
                </div>
            </li>
        `);

        button.on('hover:enter', function () {
            Lampa.Activity.push({
                url: '',
                title: 'Кинопоиск',
                component: 'kinopoisk_watch',
                page: 1
            });
        });

        $('.menu .menu__list')
            .eq(0)
            .append(button);
    }

    if (window.appready) start();
    else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type === 'ready') start();
        });
    }

})();

