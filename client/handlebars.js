status_array = [
    {id: "running", st: "Running"},
    {id: "waiting", st: "Waiting"},
    {id: "tosee", st: "To See"},
    {id: "finished", st: "Finished"}
];

UI.registerHelper('showFinished', function (st) {
    if (st === status_array[3].st && Session.get('showFinished') === false) {
        return 'display: none;';
    } else {
        return '';
    }
});

UI.registerHelper('state', function () {
    return status_array;
});

UI.registerHelper('glyphicon', function (status) {
    if (status === status_array[2].st)
        return '<i class="glyphicon glyphicon-asterisk blue"></i>';
    else if (status === status_array[0].st)
        return '<i class="glyphicon glyphicon-dashboard purple"></i>';
    else if (status === status_array[1].st)
        return '<i class="glyphicon glyphicon-calendar grey"></i>';
    else if (status === status_array[3].st)
        return '<i class="glyphicon glyphicon-ok green"></i>';
    else
        return '';
});

UI.registerHelper('select_status', function (status) {
    var str = '';
    status_array.forEach(function (elem, index, array) {
        str += '<option value="' + elem.st + '" ' + (elem.st === status ? 'selected' : '') + '>' + elem.st + '</option>';
    });
    return str;
});

UI.registerHelper('same', function (v1, v2) {
    if (v1 === v2)
        return true;
    else
        return false;
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
            return '<i class="glyphicon glyphicon-sort-by-alphabet"></i>';
        } else {
            return '<i class="glyphicon glyphicon-sort-by-alphabet-alt"></i>';
        }
    }
});

UI.registerHelper('sort_date', function (o) {
    if (o === "class") {
        return (Session.get('sortBy') === 'updatedAt' ? 'active' : '');
    } else if (o === "glyph") {
        if (Session.get('sortOrder') === 1) {
            return '<i class="glyphicon glyphicon-sort-by-order"></i>';
        } else {
            return '<i class="glyphicon glyphicon-sort-by-order-alt"></i>';
        }
    }
});
