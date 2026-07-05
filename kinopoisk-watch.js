/* global Lampa, $, window */

(function () {
    
    console.log('Kinopoisk', 'PLUGIN LOADED');
    
    'use strict';

    const WORKER_URL = 'https://kinopoisk-watch-api.samotxave.workers.dev';
    const DEVICE_ID = '01b66544-35c7-4515-ac06-0d1b90574608';

    function load(oncomplete) {

   console.log('Kinopoisk', 'LOAD STARTED');

   alert('LOAD STARTED');
		
        fetch(
            `${WORKER_URL}/watchlist?device_id=${DEVICE_ID}`
        )
        .then(r => r.json())
        .then(data => {

            const results = [{
    id: 76479,
    media_type: 'tv',
    source: 'tmdb',
    name: 'Пацаны',
    original_name: 'The Boys',
    poster_path: '/n6vVs6z8obNbExdD3QHTr4Utu1Z.jpg'
}];

            console.log('Kinopoisk', 'RESULTS COUNT:', results.length);
            console.log('Kinopoisk', results);
            
Lampa.Storage.set(
    'kinopoisk_movies',
    results
);

oncomplete({
    secuses: true,
    page: 1,
    results: Lampa.Storage.get(
        'kinopoisk_movies',
        []
    )
});
        })
        .catch(() => {
            oncomplete({
                secuses: true,
                page: 1,
                results: []
            });
        });

			function clear() {}

var Api = {
    full: function(params, oncomplete, onerror) {
        load(oncomplete);
    },
    clear: clear
};

    }

    function component(object) {

	console.log('Kinopoisk', 'COMPONENT CREATED');

    alert('COMPONENT CREATED');

        const comp = new Lampa.InteractionCategory(object);

comp.create = function() {

    console.log('Kinopoisk', 'CREATE CALLED');

    this.build({
        page: 1,
        results: [{
            id: 76479,
            media_type: 'tv',
            source: 'tmdb',
            name: 'Пацаны',
            original_name: 'The Boys',
            poster_path: '/n6vVs6z8obNbExdD3QHTr4Utu1Z.jpg'
        }]
    });
};

comp.nextPageReuest = function(
    object,
    resolve,
    reject
) {
    Api.full(
        object,
        resolve.bind(comp),
        reject.bind(comp)
    );
};

        return comp;
    }

    function start() {

var manifest = {
    type: 'video',
    version: '1.0.0',
    name: 'Кинопоиск',
    description: '',
    component: 'kinopoisk_watch'
};

Lampa.Manifest.plugins = manifest;
        
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

