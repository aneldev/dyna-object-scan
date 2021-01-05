"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dynaObjectScan = void 0;
exports.dynaObjectScan = function (obj, cb, _parent, _propertyName, _path, _scanned) {
    if (_path === void 0) { _path = ''; }
    if (_scanned === void 0) { _scanned = []; }
    if (typeof obj === 'object' && obj !== null && _scanned.indexOf(obj) > -1)
        return;
    _scanned.push(obj);
    var skip = false;
    cb({
        value: obj,
        parent: _parent,
        propertyName: _propertyName,
        path: _path,
        skip: function () { return skip = true; },
    });
    if (skip)
        return;
    if (typeof obj === "object" && obj !== null) {
        if (Array.isArray(obj)) {
            obj
                .forEach(function (itemValue, index) { return exports.dynaObjectScan(itemValue, cb, obj, index.toString(), _path + "[" + index.toString() + "]", _scanned); });
        }
        else {
            Object.keys(obj)
                .forEach(function (propertyName) { return exports.dynaObjectScan(obj[propertyName], cb, obj, propertyName, _path + "." + propertyName, _scanned); });
        }
    }
};
//# sourceMappingURL=dynaObjectScan.js.map