/**
 * 判断是否是外链
 * @param {string} path
 * @returns {Boolean}
 * @author LiQingSong
 */
export const isExternal = (path: string): boolean => {
  return /^(https?:|mailto:|tel:)/.test(path);
};

/**
 * 验证页码（或id）大于0的数字
 * @param {Number} val
 * @author LiQingSong
 */
export const isPageId = (val: number): boolean => {
  if (!val) { return false }
  if (val < 1) { return false }
  return /^\d+$/.test(val.toString())
}