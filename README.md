AndroidContext
==============

Titanium Classic code to fire paused/resumed events in Android.

## How to use

Put Context.js in your `Resources` folder. *Every time you open a new window*, you must call `Context.track(win)`.

```
var Context = require ('/Context');

function SimpleWindow ()
{
    var _self;
    
    _self = Ti.UI.createWindow ({
        backgroundColor: '#fff'
    });
    
    Context.track (_self);

    var b = Ti.UI.createButton ({
        color: '#000',
        title: 'click me'
    });
    
    _self.add (b);
    
    b.addEventListener ('click', function (e) {
        var w = new SimpleWindow ();
        w.open ();
    });
        
    return _self;
}


Ti.App.addEventListener ('paused', function (e) {
    Ti.API.debug ('app paused');
});

Ti.App.addEventListener ('resumed', function (e) {
    Ti.API.debug ('app resumed');
});

var w = new SimpleWindow ();
w.open ();

```

Android Context will keep track of which Activity is currently active and will fire the `paused` and `resumed` events appropriately, when the app goes into the background / comes into foreground.  Unlike some other solutions out there, it will fire these events when the screen is turned off and on.
