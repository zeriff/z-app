var masonry = {
    bind: function(className, selector) {
        var cName = '.' + className;
        var sel = '.' + selector
        $(cName).imagesLoaded(function() {
            $(cName).masonry({
                isAnimated: true,
                animationOptions: {
                    duration: 500,
                    easing: 'linear',
                    queue: false
                },
                itemSelector: sel,
                isFitWidth: true
            });
        });
        $(cName).masonry({
            isAnimated: true,
            animationOptions: {
                duration: 500,
                easing: 'linear',
                queue: false
            },
            itemSelector: sel,
            isFitWidth: true
        });
    },
    reload: function(className) {
        var cName = "." + className;
        $(cName).imagesLoaded(function() {
            $(cName).masonry('reloadItems');
        });
    }
}

var Loader = {
    setLoading: function() {
        $.blockUI({message: '<div class="ui active dimmer"><div class="ui loader"></div></div>'});
    },
    done: function() {
        $.unblockUI();
    }
}
