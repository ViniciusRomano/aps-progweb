loadImages = {
    init: function () {
        loadImages.load();
        loadImages.setButtons();
    },
    load: function () {
        $.ajax({
            type: "GET",
            url: '/images',
            success: function (result) {
                console.log(result)
                loadImages.printResult(result);
            },
        });
    },
    searchImages: function () {
        var nickname = $("#nickname_image").val();
        $.ajax({
            type: 'GET',
            url: '/images/regex/' + nickname,
            success: function (result) {
                loadImages.printResult(result);
            }
        });
    },
    setButtons: function () {

        $("#search_button").on('click', function () {
            loadImages.searchImages();
        });

        $("#search_button_flickr").on('click', function () {
            $('#status_image_flickr').text("Status: Getting JSONP...");
            tag = $("#flickr_image").val();
            $.ajax({
                url: 'https://api.flickr.com/services/feeds/photos_public.gne',
                dataType: 'jsonp',
                data: {
                    "tags": tag,
                    "format": "json"
                },
            });
        });

    },
    printResult: function (result) {
        var str = [];
        for (var i = 0; i < result.length; i++) {
            console.log(result[i]);
            str.push("<div class=\"square\" style=\"background-image: url('../uploads/" + result[i].filename + "\');\">");
            str.push('<div class="overlay">')
            str.push('<div class="text">Created by:' + result[i].username + '</div>')
            str.push('<p class="link" href=""><span style="align=center;">' + result[i].image_nickname + '</span></p>');
            str.push('</div>')
            str.push('</div>')
        }
        $("#content_images").empty().html(str.join(''));
    },
    printFlickrResult: function (result) {
        if (result.length < 5) {
            $('#status_image_flickr').text("Status: Invalid tag!");
        } else {
            var str = [];
            for (var i = 0; i < 5; i++) {
                console.log(result[i]);
                str.push("<div class=\"square\" style=\"background-image: url('" + result[i].media.m + "\');\">");
                str.push('<div class="overlay">')
                str.push('<div class="text">' + result[i].title + '</div>')
                str.push('<p class="link" href=""><span style="align=center;"></span></p>');
                str.push('</div>')
                str.push('</div>')
            }
            $("#content_images_flickr").empty().html(str.join(''));
            $('#status_image_flickr').text("Status: Success!");
        }

    }
};

uploadImage = {
    init: function () {
        uploadImage.submitEvent();
    },
    submitEvent: function () {
        $('#add_image_form').submit(function (e) {
            $('#status_image').text("Status: Uploading...");
            e.preventDefault();
            var fd = new FormData($(this)[0]);
            $.ajax({
                type: 'POST',
                url: '/create/image',
                data: fd,
                processData: false,
                contentType: false,
                success: function (result) {
                    console.log(result)
                    $('#status_image').text("Status: Image Uploaded!");
                    loadImages.init();
                },
                error: function (result) {
                    console.log(result)
                    $('#status_image').text("Status:Error!");
                }
            });
        })
    }
};

idleClient = {
    init: function () {
        idleClient.onInactive();
    },
    onInactive: function (ms, cb) {
        var wait = setTimeout(cb, ms);

        document.onmousemove = document.mousedown = document.mouseup = document.onkeydown = document.onkeyup = document.focus = function () {
            clearTimeout(wait);
            wait = setTimeout(cb, ms);

        };
    }
}

idleClient = {
    onInactive: function (ms, cb) {
        wait = setTimeout(cb, ms);
        $('#nickname_image').keypress(function () {
            clearTimeout(wait);
            wait = setTimeout(cb, ms);
        });
    }
}

idleClient.onInactive(400, function () {
    var field_nickname = $("#nickname_image");
    if (field_nickname.is(':focus') && field_nickname.val() != '') {
        $("datalist").empty();
        $.ajax({
            type: 'GET',
            url: '/images/regex/' + field_nickname.val(),
            success: function (result) {
                console.log(result)
                for (var i = 0; i < result.length; i++) {
                    $("datalist").append("<option value='" + result[i].image_nickname + "'>");
                }
            }
        });

    }
    // clean search field
    if (field_nickname.val() == '') {
        $("datalist").empty();
    }
});
// function called by "search button flickr"
function jsonFlickrFeed(json) {
    console.log(json.items);
    loadImages.printFlickrResult(json.items)

};

$(document).ready(function () {
    loadImages.init();
    uploadImage.init();
    idleClient.onInactive();
});