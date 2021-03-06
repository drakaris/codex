var exp = class TVshows {
  constructor(file) {
    this.file = file;
    this.process();
  }

  process() {
    this.getSeason();
    this.getName();
    this.getDest();
  }

  getName() {
    // Split filename for name generation
    var linchpin = this.file.match(/[Ss]\d{2}[Ee]\d{2}([Ee]\d{2})?/g)[0];
    this.buffer = this.file.split('.');
    this.name = '';
    for (var i = 0; i < this.buffer.indexOf(linchpin); i++) {
      this.name = this.name + this.buffer[i] + ' ';
    }
    // Trim name
    this.name = this.name.trim();
    // Store location update for later use
    this.update = this.file + ' -> ' + '/TV/' + this.name + '/' + this.season;
  }

  getSeason() {
    // Store season
    this.season = this.file.match(/[Ss]\d{2}/g)[0];
    this.season = 'Season ' + parseInt(this.season.split('S')[1], 10);
  }

  getDest() {
    // Generate destination
    this.oldPath = process.cwd() + '/' + this.file;
    this.newPath = process.cwd() + '/TV/' + this.name + '/' + this.season;
    this.dest = this.newPath + '/' + this.file;
  }

  display() {
    console.log(`NAME : ${this.name}\nSEASON : ${this.season}\nLOCATION : ${this.update}`);
  }
}

// Class export logic
if (module.parent) {
  module.exports = exp;
} else {
  var test = new exp('Arrow.S05E05.HDTV.x264-LOL[ettv]');
  test.display();
}
