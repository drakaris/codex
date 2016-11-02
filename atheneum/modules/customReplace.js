// Contains functions that perform custom array searches

function cleanIdentifier(string) {
  var tmp = string.split('.');
  tmp.forEach(function(item, idx) {
    if (item.match(/[Ss]\d{2}[Ee]\d{2}([Ee]\d{2})?/g)) {
      // Found identifier, cleanse with transformations
      tmp[idx] = item.toUpperCase().replace(/-/g, '');
    }
  });
  console.log(tmp.join('.'));
  return tmp.join('.');
}

module.exports.cleanIdentifier = cleanIdentifier;
