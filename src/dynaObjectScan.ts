export const dynaObjectScan = (
  obj: any,
  cb: (args: {
    value: any;
    parent: any;
    propertyName?: string;
    path?: string;
    skip: () => void;
  }) => void,
  _parent?: any,
  _propertyName?: string,
  _path: string = '',
  _scanned: any = [],
): void => {
  if (typeof obj === 'object' && obj !== null && _scanned.indexOf(obj) > -1) return;
  _scanned.push(obj);

  let skip = false;

  cb({
    value: obj,
    parent: _parent,
    propertyName: _propertyName,
    path: _path,
    skip: () => skip = true,
  });

  if (skip) return;

  if (typeof obj === "object" && obj !== null) {
    if (Array.isArray(obj)) {
      obj
        .forEach((itemValue, index) => dynaObjectScan(
          itemValue,
          cb,
          obj,
          index.toString(),
          `${_path}[${index.toString()}]`,
          _scanned,
        ));
    }
    else {
      Object.keys(obj)
        .forEach(propertyName => dynaObjectScan(
          obj[propertyName],
          cb,
          obj,
          propertyName,
          `${_path}.${propertyName}`,
          _scanned,
        ));
    }
  }
};

