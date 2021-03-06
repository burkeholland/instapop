var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var common = require("ui/web-view/web-view-common");
var trace = require("trace");
require("utils/module-merge").merge(common, exports);
var UIWebViewDelegateImpl = (function (_super) {
    __extends(UIWebViewDelegateImpl, _super);
    function UIWebViewDelegateImpl() {
        _super.apply(this, arguments);
    }
    UIWebViewDelegateImpl.new = function () {
        return _super.new.call(this);
    };
    UIWebViewDelegateImpl.prototype.initWithOwner = function (owner) {
        this._owner = owner;
        return this;
    };
    UIWebViewDelegateImpl.prototype.webViewDidStartLoad = function (webView) {
        trace.write("UIWebViewDelegateClass.webViewDidStartLoad()", trace.categories.Debug);
    };
    UIWebViewDelegateImpl.prototype.webViewShouldStartLoadWithRequestNavigationType = function(webView, request, navigationType) {
        if (request.URL) {
            trace.write("UIWebViewDelegateClass.webViewShouldStartLoadWithRequest()", trace.categories.Debug);
            this._owner._onLoadStarted(request.URL.absoluteString);
        }
        return true;
    };
    UIWebViewDelegateImpl.prototype.webViewDidFinishLoad = function (webView) {
        trace.write("UIWebViewDelegateClass.webViewDidFinishLoad(" + webView.request.URL + ")", trace.categories.Debug);
        this._owner._onFinished(webView.request.URL.absoluteString);
        return true;
    };
    UIWebViewDelegateImpl.prototype.webViewDidFailLoadWithError = function (webView, error) {
        var url = this._owner.url;
        if (webView.request && webView.request.URL) {
            url = webView.request.URL.absoluteString;
        }
        trace.write("UIWebViewDelegateClass.webViewDidFailLoadWithError(" + error.localizedDescription + ")", trace.categories.Debug);
        this._owner._onFinished(url, error.localizedDescription);
    };
    UIWebViewDelegateImpl.ObjCProtocols = [UIWebViewDelegate];
    return UIWebViewDelegateImpl;
})(NSObject);
var WebView = (function (_super) {
    __extends(WebView, _super);
    function WebView() {
        _super.call(this);
        this._ios = new UIWebView();
        this._delegate = UIWebViewDelegateImpl.new().initWithOwner(this);
        this._ios.delegate = this._delegate;
    }
    Object.defineProperty(WebView.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    WebView.prototype._loadUrl = function (url) {
        trace.write("WebView._loadUrl(" + url + ")", trace.categories.Debug);
        if (this._ios.loading) {
            this._ios.stopLoading();
        }
        this._ios.loadRequest(NSURLRequest.requestWithURL(NSURL.URLWithString(url)));
    };
    Object.defineProperty(WebView.prototype, "canGoBack", {
        get: function () {
            return this._ios.canGoBack;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebView.prototype, "canGoForward", {
        get: function () {
            return this._ios.canGoForward;
        },
        enumerable: true,
        configurable: true
    });
    WebView.prototype.goBack = function () {
        this._ios.goBack();
    };
    WebView.prototype.goForward = function () {
        this._ios.goForward();
    };
    WebView.prototype.reload = function () {
        this._ios.reload();
    };
    return WebView;
})(common.WebView);
exports.WebView = WebView;
