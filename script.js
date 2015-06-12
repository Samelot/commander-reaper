(function (window) {
    var actions,
        autocomplete,
        onload,
        search,
        $searchBox;

    onload = window.document.onload;
    window.onload = function () {
        if (onload) onload();
        $searchBox = window.document.getElementById('search-box');
        $searchBox.addEventListener('keyup', function (e) {
            var part;
            part = $searchBox.value;
            autocomplete(part);
        });
    };

    actions = [
        {
            "name": "Edit: Copy items/tracks/envelope points (depending on focus) ignoring time selection",
            "code": 40057,
        },
        {
            "name": "Edit: Copy items/tracks/envelope points (depending on focus) within time selection, if any (smart copy)",
            "code": 41383
        },
        {
            "name": "Edit: Cut items",
            "code": 40699
        },
        {
            "name": "Edit: Cut items/tracks/envelope points (depending on focus) ignoring time selection",
            "code": 40059
        },
        {
            "name": "Edit: Cut items/tracks/envelope points (depending on focus) within time selection, if any (smart cut)",
            "code": 41384
        },
        {
            "name": "Edit: Redo",
            "code": 40030
        },
        {
            "name": "Edit: Undo",
            "code": 40029
        }
    ];


    autocomplete = function (part) {
        var matches,
            $results;

        $results = window.document.getElementsByClassName('results')[0];
        $results.innerHTML = '';

        if (!part) return;

        matches = search(part);
        for (var i = 0; i < matches.length; i++) {
            var $match;
            $match = window.document.createElement('li');
            $match.innerHTML = matches[i].name;
            $results.appendChild($match);
        }
    };

    search = function (searchInput) {
        var matches,
            searchWords;

        matches = [];

        // Split search input into non-empty words
        searchWords = searchInput.toUpperCase().split(' ').filter(function (searchWord) {
            return '' !== searchWord;
        });

        for (var i = 0; i < actions.length; i++) {
            var action,
                actionNameUpperCase,
                isMatch;

            action = actions[i];
            actionNameUpperCase = action.name.toUpperCase();
            isMatch = true;

            for (var j = 0; j < searchWords.length; j++) {
                var searchWord;

                searchWord = searchWords[j];

                if (-1 === actionNameUpperCase.indexOf(searchWord)) {
                    isMatch = false;
                    break;
                }
            }
            if (isMatch) {
                matches.push(action);
            }
        }
        return matches;
    };
})(window);
