status_array = [
    {id: "running", st: "Running"},
    {id: "waiting", st: "Waiting"},
    {id: "tosee", st: "To See"},
    {id: "finished", st: "Finished"}
];

var selectOptionsStr = '';
status_array.forEach(function (elem, index, array) {
    selectOptionsStr += '<option value="' + elem.st + '" ' + (elem.st === status ? 'selected' : '') + '>' + elem.st + '</option>';
});

UI.registerHelper('showFinished', function (st) {
    if (st === status_array[3].st) {
        if (Session.get('showFinished') === false)
            return 'display: none;';
    } else {
        return '';
    }
});

UI.registerHelper('state', function () {
    return status_array;
});

UI.registerHelper('glyphicon', function (status) {
    if (status === status_array[0].st)
        return '<i class="fa fa-bolt purple"></i>';
    else if (status === status_array[1].st)
        return '<i class="fa fa-thumb-tack grey"></i>';
    else if (status === status_array[2].st)
        return '<i class="fa fa-gg blue"></i>';
    else if (status === status_array[3].st)
        return '<i class="fa fa-check green"></i>';
    else
        return '<i class="fa fa-exclamation-triangle fa-lg red"></i>';
});

UI.registerHelper('select_status', function (status) {
    return selectOptionsStr;
});

UI.registerHelper('same', function (v1, v2) {
    return v1 === v2;
});

UI.registerHelper('show_cat', function () {
    return (Session.get('showCat') ? 'active' : '');
});

UI.registerHelper('show_finished', function () {
    return (Session.get('showFinished') ? 'active' : '');
});

UI.registerHelper('sort_alpha', function (o) {
    if (o === "class") {
        return (Session.get('sortBy') === 'name' ? 'active' : '');
    } else if (o === "glyph") {
        if (Session.get('sortOrder') === 1) {
            return '<i class="fa fa-sort-alpha-asc"></i>';
        } else {
            return '<i class="fa fa-sort-alpha-desc"></i>';
        }
    }
});

UI.registerHelper('sort_date', function (o) {
    if (o === "class") {
        return (Session.get('sortBy') === 'updatedAt' ? 'active' : '');
    } else if (o === "glyph") {
        if (Session.get('sortOrder') === 1) {
            return '<i class="fa fa-sort-numeric-asc"></i>';
        } else {
            return '<i class="fa fa-sort-numeric-desc"></i>';
        }
    }
});