String.prototype.replaceAt = function(index, replacement) {
  return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

const idToUUid = (id) => {
  let tempId = id.toString();
  let format = '00000000-0000-0000-0000-000000000000'
  let length = format.length;
  let start = length - tempId.length;
  for(let i = start; i < length; i++) {
    format = format.replaceAt(i, tempId[i - start]);
  }
  return format;
}

module.exports = idToUUid;