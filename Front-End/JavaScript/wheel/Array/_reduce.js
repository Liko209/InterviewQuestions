export default function applyCustomReduce() {
  Array.prototype._reduce = function (callback, initialValue) {
    const caller = this;

    const argLen = arguments.length;

    if (!caller.length) return initialValue;

    let res = argLen === 2 ? initialValue : caller[0];

    for (let i = argLen === 2 ? 0 : 1; i < caller.length; i++) {
      res = callback(res, caller[i], i, caller);
    }

    return res;
  };
}
