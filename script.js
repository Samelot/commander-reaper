(function (window) {
    var autocomplete,
        commands,
        onload,
        search,
        $searchBox;

    onload = window.document.onload;
    window.onload = function () {
        if (onload) onload();
        $searchBox = window.document.getElementById('search-box');
        console.log($searchBox);

        $searchBox.addEventListener('keydown', function (e) {
            var part,
                result,
                results;

            part = $searchBox.value;
            console.log(part);

            autocomplete(part);

            result = window.document.createElement('div')
            result.classList.add('some-class');
            results = window.document.getElementsByClassName('results')[0];
            results.appendChild(result);
            result.innerHTML = 'foodog';
        });
    };
    
    autocomplete = function (part) {
        var matches;

        matches = search(part);

        console.log(matches);
        return "t";
    };

    commands = [
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

    search = function (part) {
        var i,
            matches;

        matches = [];
        for (i = 0; i < commands.length; i++) {
            if (-1 < commands[i].name.indexOf(part)) {
                matches.push(commands[i]);
            }
        }
        return matches;
    };
})(window);
