```javascript
const ReactCurrentDispatcher =
    React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
        .ReactCurrentDispatcher;

function readContext(Context, observedBits) {
    const dispatcher = ReactCurrentDispatcher.current;
    if (dispatcher === null) {
        throw new Error(
            "react-cache: read and preload may only be called from within a " +
                "component's render. They are not supported in event handlers or " +
                "lifecycle methods."
        );
    }
    return dispatcher.readContext(Context, observedBits);
}
```
