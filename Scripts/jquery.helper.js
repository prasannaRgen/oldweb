//* simple modal plugin
jQuery.fn.showModal = function (options) {
    return this.each(function () {
        var modalDiv = $('#modal');
        if (modalDiv.length == 0)
            modalDiv = $('<div id="modal" class="modalDiv"></div>').appendTo(document.body);

        //* you can remove this if you don't have to support IE6
        if ($.browser.msie && $.browser.version == "6.0") {
            $('select').hide();
            modalDiv.css({ 'position': 'absolute', 'height': $(document).height() - 5, 'width': $(window).width() }).show();
        }
        else
            modalDiv.css({ 'position': 'fixed' }).show();

        var x = $(window).width() / 2 - $(this).outerWidth() / 2;
        var y = $(window).height() / 2 - $(this).outerHeight() / 2;
        $(this).css({ 'position': 'absolute', 'left': x + $(window).scrollLeft(), 'top': y + $(window).scrollTop(), 'z-index': '10001' }).focus().slideDown(400);
    });
};


jQuery.fn.hideModal = function (options) {
    return this.each(function () {
        //* you can remove this if you don't have to support IE6
        if ($.browser.msie && $.browser.version == '6.0')
            $('select').show();
        $(this).slideUp(400);
        $(this).slideUp(function () {
            $('#modal').hide();

        });

    });
};


jQuery.fn.PageScrollHeight = function (options) {
    return this.each(function () {
        var fixedContentHeight = $(window).height() - 15;
        $(this).height(fixedContentHeight);
        $(this).css({ 'overflow': 'auto' });
        if ($(this).attr("scrollHeight") > fixedContentHeight) {
            $.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase());
            $.browser.safari = /safari/.test(navigator.userAgent.toLowerCase());
            if ($.browser.chrome || $.browser.safari) {
                $(this).css({ 'min-height': 'auto !important' });
                $(this).css({ 'height': '' });
            }
            else {
                $(this).css({ 'height': $(this).innerHeight() });
            }

        }
        else {
            var chk = document.body.scrollHeight - $(window).height();
            $(this).height(fixedContentHeight);
            $('body,html').css('overflow', 'hidden');
        }
        $("#tabs").tabs();
    });
};


jQuery.fn.PageProfitScrollHeight = function (options) {
    return this.each(function () {
        var fixedContentHeight = $(window).height() - 15;
        $(this).height(fixedContentHeight);
        $(this).css({ 'overflow': 'auto' });
        if ($(this).attr("scrollHeight") > fixedContentHeight) {
            $.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase());
            $.browser.safari = /safari/.test(navigator.userAgent.toLowerCase());
            if ($.browser.chrome || $.browser.safari) {
                $(this).css({ 'min-height': 'auto !important' });
                $(this).css({ 'height': '' });
            }
            else {
                $(this).css({ 'height': $(this).innerHeight() });
            }

        }
        else {
            var chk = document.body.scrollHeight - $(window).height();
            $(this).height(fixedContentHeight);
            $('body,html').css('overflow', 'hidden');
        }
        $("#tabs").tabs();
    });
};
