var _activeActivity;

var _activitycount = 0;

function generate_name ()
{
    _activitycount++;
    
    return "activity-" + _activitycount;
}

function on_open (w) 
{
    var name = w.context_id;
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
    win.context_id = generate_name ();
    win.addEventListener ('open', function (e) { on_open (win); });
    win.addEventListener ('close', function (e) { on_close (win); });
};

module.exports = Context;
