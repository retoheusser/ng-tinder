# Tinder API implementiation for Angular

## Installation
`bower install ng-tinder`

## Configure your tinder proxy url
It's not possible to directly communicate with Tinder API from within the browser due to CORS restrictions. You must setup a simple server which can act as a proxy and simply forwards the requests to `https://api.gotinder.com/`.
The path of the proxy url should match the path of the Tinder API, for POST requests, the body should be forwarded and the proxy should forward the `Authorization` header with the token in it.
The proxy can be set using the `$tinderProvider`:

```js
yourApp.config(function ($tinderProvider) {
  $tinderProvider.useProxy("https://your-proxy-url.com/")
});
```
