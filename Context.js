var _activeActivity;

function generate_guid ()
{
    var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
    
    return guid;
}

function on_open (w) 
{
    var name = w.context_guid;
    var activity = w.activity;
    
    activity.onStart = function() {
        if (_activeActivity == name) {
            Ti.App.fireEvent('resumed');
        }

        _activeActivity = name;
    };

    activity.onStop = function() {
        if (_activeActivity == name) {
            Ti.App.fireEvent('paused');
        }
    };
}

function on_close (w) 
{
    var activity = w.activity;

    activity.onStart = null;
    activity.onStop = null;
}

function Context ()
{
}

Context.track = function (win) {
    win.context_guid = generate_guid ();
    win.addEventListener ('open', function (e) { on_open (win); });
    win.addEventListener ('close', function (e) { on_close (win); });
};

module.exports = Context;
