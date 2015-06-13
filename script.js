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
            "nameLowerCase": "edit: copy items/tracks/envelope points (depending on focus) ignoring time selection",
            "code": 40057,
        },
        {
            "name": "Edit: Copy items/tracks/envelope points (depending on focus) within time selection, if any (smart copy)",
            "nameLowerCase": "edit: copy items/tracks/envelope points (depending on focus) within time selection, if any (smart copy)",
            "code": 41383
        },
        {
            "name": "Edit: Cut items",
            "nameLowerCase": "edit: cut items",
            "code": 40699
        },
        {
            "name": "Edit: Cut items/tracks/envelope points (depending on focus) ignoring time selection",
            "nameLowerCase": "edit: cut items/tracks/envelope points (depending on focus) ignoring time selection",
            "code": 40059
        },
        {
            "name": "Cut items/tracks/envelope points (depending on focus) ignoring time selection edit",
            "nameLowerCase": "cut items/tracks/envelope points (depending on focus) ignoring time selection edit",
            "code": 66666
        },
        {
            "name": "Edit: Cut items/tracks/envelope points (depending on focus) within time selection, if any (smart cut)",
            "nameLowerCase": "edit: cut items/tracks/envelope points (depending on focus) within time selection, if any (smart cut)",
            "code": 41384
        },
        {
            "name": "Edit: Redo",
            "nameLowerCase": "edit: redo",
            "code": 40030
        },
        {
            "name": "Edit: Undo",
            "nameLowerCase": "edit: undo",
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
        searchWords = searchInput.toLowerCase().split(' ').filter(function (searchWord) {
            return '' !== searchWord;
        });

        // Find all actions that have all words in the search input
        for (var i = 0; i < actions.length; i++) {
            var actionName,
                currentAction,
                isMatch;

            currentAction = actions[i];
            actionName = currentAction.nameLowerCase;
            isMatch = true;

            for (var j = 0; j < searchWords.length; j++) {
                var currentSearchWord;

                currentSearchWord = searchWords[j];

                if (-1 === actionName.indexOf(currentSearchWord)) {
                    isMatch = false;
                    break;
                }
            }
            if (isMatch) {
                matches.push(currentAction);
            }
        }

        // Order actions by the occurrence of the first search word
        matches.sort(function (a, b) {
            return a.nameLowerCase.indexOf(searchWords[0]) - b.nameLowerCase.indexOf(searchWords[0]);
        });

        return matches;
    };
})(window);
