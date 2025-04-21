
import {
  isArray,
  isDate,
  isEmpty,
  isFunction,
  isNil,
  isObject,
  isString,
  keys,
  map,
  omitBy,
  reduce,
  reject,
  trim,
} from 'lodash';

export const trimObjectValues = (values: any, { omitEmpty } = { omitEmpty: false }) => {
  try {
    JSON.parse(JSON.stringify(values));

    const isRemove = (val: any) =>
      isObject(val) && !isFunction(val) && !isDate(val)
        ? isEmpty(val)
        : isString(val)
          ? !val
          : isNil(val);

    // @ts-ignore
    const trims = (val: any) => {
      if (isString(val)) return trim(val);

      if (isFunction(val) || isDate(val) || !isObject(val)) return val;

      if (isArray(val)) {
        // @ts-ignore
        const results = map(val, (value) => trims(value));
        return omitEmpty ? reject(results, (val) => isRemove(val)) : results;
      }

      const results: any = reduce(
        keys(val),
        // @ts-ignore
        (prev, key) => ({ ...prev, [key]: trims(val[key]) }),
        {},
      );

      return omitEmpty ? omitBy(results, (val) => isRemove(val)) : results;
    };

    return trims(values);
  } catch (error) {
    return values;
  }
};

/**
 * @param { Promise } promise
 * @param { Object= } errorExt
 * @return { Promise }
 */
export function to<T, U = Error>(
  promise: Promise<T>,
  errorExt?: object,
): Promise<[U, undefined] | [null, T]> {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[U, undefined]>((err: U) => {
      if (errorExt) {
        const parsedError = Object.assign({}, err, errorExt);
        return [parsedError, undefined];
      }

      return [err, undefined];
    });
}


