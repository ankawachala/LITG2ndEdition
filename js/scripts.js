var posts = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "posts.json",
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
})();
var tmpl = $.templates("#post_template");
var overlay = $.templates("#overlay");


function loadPosts(posts, from, to) {
    for (var i = from; i <= to; i++) {
        if (posts['posts'][i]) {
            $("#panels_section").append(tmpl.render(posts['posts'][i]));
            $('#more').data('next-post-id', i + 1);
        }
        else {
            $('#more').remove();
            continue;
        }
    }
}

function showOverlay(posts, id) {
    var post = search(id, posts['posts']);
    console.log(post)
    $('#overlayContent').html(overlay.render(post));
    $('.overlay').addClass('show');
}


function hideOverlay() {
    $('.overlay').removeClass('show');
}

function search(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].id === nameKey) {
            return myArray[i];
        }
    }
}



$().ready(function () {
    loadPosts(posts, 0, 5);
    $('#more').click(function () {
        loadPosts(posts, $('#more').data('next-post-id'), $('#more').data('next-post-id') + 2);
        return false;
    })
    $('body').on('click', '.panel-heading a', function () {
        showOverlay(posts, $(this).data('id'));
        return false;
    })
    $('body').on('click', '.close-overlay', function () {
        hideOverlay();
        return false;
    })

    $('.navbar-nav a').on('click', function () {
        console.log($(this).data('section'));
        $.smoothScroll({
//            scrollElement: $('div.scrollme'),
            scrollTarget: $(this).data('section')
        });
        return false;
    });

});