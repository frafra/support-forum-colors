var forums = {
    fluxbb:{
        detect:() => {
            var element = document.querySelector('#poweredby > a');
            if (element) return element.innerText === 'FluxBB';
        },
        getRows:() => { return document.querySelectorAll('.rowodd, .roweven') },
        getUsers:(row) => { return row.querySelectorAll('.byuser') },
        getTitle:(row) => { return row.querySelector('a').innerText },
        getElements:(row) => { return row.querySelectorAll('td') }
    },
    phpbb:{
        detect:() => { return document.body.id == 'phpbb' },
        getRows:() => { return document.querySelectorAll('.bg1, .bg2') },
        getUsers:(row) => { return [...row.querySelectorAll('a')].slice(1, 3) },
        getTitle:(row) => { return row.querySelector('.topictitle').innerText },
        getElements:(row) => { return [row] }
    },
    vbulletin:{
        detect:() => { return document.documentElement.id === 'vbulletin_html' },
        getRows:() => { return document.querySelectorAll('#threads > li > div') },
        getUsers:(row) => { return row.querySelectorAll('.username') },
        getTitle:(row) => { return row.querySelector('.threadtitle').innerText },
        getElements:(row) => { return [row] }
    }
}

var regexes = {
    'it':new RegExp(/^\s*[\[(]?risolt[oa][\])]?/, 'i'),
    'en':new RegExp(/^\s*[\[(]?solved[\])]?/, 'i')
}

var forum = null;
if (forums.fluxbb.detect()) forum = forums.fluxbb;
else if (forums.phpbb.detect()) forum = forums.phpbb;
else if (forums.vbulletin.detect()) forum = forums.vbulletin;

var language = document.getElementsByTagName('html')[0].getAttribute('lang');
if (!language) language = 'en';
var regex = regexes[language];

if (forum !== null) {
    var rows = forum.getRows();
    for (var i=0; i<rows.length; i++) {
        var users = forum.getUsers(rows[i]);
        var title = forum.getTitle(rows[i]);
        var color = null;
        if (regex.exec(title)) {
            color = '#c4ffc4';
        } else if (users[0].innerText == users[1].innerText) {
            color = '#ffc4c4';
        }
        if (color) {
            var elements = forum.getElements(rows[i]);
            for (var j=0; j<elements.length; j++) {
                elements[j].style.transition = 'background-color 500ms linear';
                elements[j].style.backgroundColor = color;
            }
        }
    }
}
