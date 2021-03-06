var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var view = require("ui/core/view");
var dependencyObservable = require("ui/core/dependency-observable");
var proxy = require("ui/core/proxy");
var knownEvents;
(function (knownEvents) {
    knownEvents.finished = "finished";
    knownEvents.loadStarted = "loadStarted";
})(knownEvents = exports.knownEvents || (exports.knownEvents = {}));
exports.urlProperty = new dependencyObservable.Property("url", "WebView", new proxy.PropertyMetadata(""));
function onUrlPropertyChanged(data) {
    var webView = data.object;
    if (webView._suspendLoading) {
        return;
    }
    webView._loadUrl(data.newValue);
}
exports.urlProperty.metadata.onSetNativeValue = onUrlPropertyChanged;
var WebView = (function (_super) {
    __extends(WebView, _super);
    function WebView() {
        _super.call(this);
    }
    Object.defineProperty(WebView.prototype, "url", {
        get: function () {
            return this._getValue(exports.urlProperty);
        },
        set: function (value) {
            this._setValue(exports.urlProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    WebView.prototype._onFinished = function (url, error) {
        this._suspendLoading = true;
        this.url = url;
        this._suspendLoading = false;
        var args = {
            eventName: knownEvents.finished,
            object: this,
            url: url,
            error: error
        };
        this.notify(args);
    };
    WebView.prototype._onLoadStarted = function (url, error) {
        this._suspendLoading = true;
        this.url = url;
        this._suspendLoading = false;
        var args = {
            eventName: knownEvents.loadStarted,
            object: this,
            url: url,
            error: error
        };
        this.notify(args);
    };
    WebView.prototype._loadUrl = function (url) {
        throw new Error("This member is abstract.");
    };
    Object.defineProperty(WebView.prototype, "canGoBack", {
        get: function () {
            throw new Error("This member is abstract.");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebView.prototype, "canGoForward", {
        get: function () {
            throw new Error("This member is abstract.");
        },
        enumerable: true,
        configurable: true
    });
    WebView.prototype.goBack = function () {
        throw new Error("This member is abstract.");
    };
    WebView.prototype.goForward = function () {
        throw new Error("This member is abstract.");
    };
    WebView.prototype.reload = function () {
        throw new Error("This member is abstract.");
    };
    return WebView;
})(view.View);
exports.WebView = WebView;
