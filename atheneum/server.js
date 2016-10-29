#! /usr/bin/env node

/**********************
 * Essential Includes *
 *********************/
var fs = require('fs');
var async = require('async');
var mkdirp = require('mkdirp');

/********************
 * Custom Functions *
 *******************/
var scan = require('./modules/scan');

/******************
 * Custom Classes *
 *****************/
var TVshows = require('./classes/TVshows');
var Logger = require('./classes/Logger');

/********************
 * Custom Variables *
 ********************/
var count = 0;
var logger = new Logger();

/*****************
 * Custom Queues *
 ****************/
var sanitizeQueue = async.queue(function(task, callback) {
  // console.log('Sanitizing: ' + task);
  var oldPath = process.cwd() + '/' + task;
  var newFileName = task.replace(/\s/g, '.');
  var newPath = process.cwd() + '/' + newFileName;
  fs.renameSync(oldPath, newPath);
  return callback(null, task, newFileName);
});

var processQueue = async.queue(function(task, callback) {
  // console.log('Processing: ' + task.file);
  // console.log('DEST: ' + task.newPath);

  fs.stat(task.newPath, function(err, stats) {
    if (err) {
      mkdirp(task.newPath, function(err) {
        if (err) {
          return callback(err);
        } else {
          fs.renameSync(task.oldPath, task.dest);
          count = count + 1;
          return callback(null, task.update);
        }
      });
    } else {
      fs.renameSync(task.oldPath, task.dest);
      count = count + 1;
      return callback(null, task.update);
    }
  });
});

processQueue.drain = function() {
  logger.log('All queue items have been processed');
  logger.info(`Processed ${count} items`);
};

/****************
 * Main Program *
 ***************/
logger.log(`Scanning ${process.cwd()}`);
var contents = scan.scanDir(process.cwd());
logger.info(`Scanned ${contents.length} objects`);

// Check if 'TV' folder exists, if not create
var dir = process.cwd() + '/TV';
if (contents.length && !fs.existsSync(dir)) {
  fs.mkdirSync(dir, 0744);
  logger.info(`Created ${dir}`);
}

contents.forEach(function(item) {
  if (item.match(/[Ss]\d{2}[Ee]\d{2}/g)) {
    if (item.match(/\s/g)) {
      sanitizeQueue.push(item, function(err, oldName, newName) {
        if (err) throw err;
        logger.warn('Sanitized: ' + oldName + ' -> ' + newName);
        processQueue.push(new TVshows(newName), function(err, tag) {
          if (err) throw err;
          logger.log('Moved ' + tag);
        });
      });
    } else {
      processQueue.push(new TVshows(item), function(err, tag) {
        if (err) throw err;
        logger.log('Moved ' + tag);
      });
    }
  }
});
