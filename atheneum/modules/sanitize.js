/**********************
 * Sanitize functions *
 *********************/
function cleanFileName(file) {
  file = file.replace(/\s/g, '.');
  // console.log('cleanFileName : ' + file);
  return removeWebsite(file);
}

function removeWebsite(file) {
  file = file.replace(/.*(\[.?)?w{3}\..+\.[com]+(.?\])?.-./ig, '');
  // console.log('removeWebsite : ' + file);
  return cleanIdentifier(file);
}

function cleanIdentifier(file) {
  var tmp = file.split('.');
  tmp.forEach(function(item, idx) {
    if (item.match(/[Ss]\d{2}[Ee]\d{2}([Ee]\d{2})?/g)) {
      // Found identifier, cleanse with transformations
      tmp[idx] = item.toUpperCase().replace(/-/g, '');
    }
  });
  return tmp.join('.');
}

module.exports.cleanIdentifier = cleanIdentifier;
module.exports.cleanFileName = cleanFileName;
