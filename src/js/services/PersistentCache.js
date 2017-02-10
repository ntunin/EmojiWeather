angular.module('app')

.service('PersistentCache', function($cordovaSQLite, config, $ionicPlatform) {
  var db;
  if(typeof cordova == "undefined") {
    return createFakeCache();
  }

  $ionicPlatform.ready(openWhenReady);

  this.open = function () {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        if(!db) reject("Could not open cache")
      }, 10 * 1000);
      openWhenReady();
      resolve();
    });
  }

  this.reset = reset;

  function reset() {
    angular.forEach([
      "get-bought-icon-packs",
      "get-bought-background-packs"], drop);
      createTables();
  }

  function drop(table) {
    query("DROP TABLE \"" + table + "\"");
  }

  function openWhenReady() {
    if(db) return;
    try {
      createDB();
      createTables();
    } catch(err) {
      console.log("OPEN :: " + JSON.stringify(err));
    }
  }

  function createDB() {
    if($ionicPlatform.is("android")) {
      db = $cordovaSQLite.openDB({ name: config.cacheDBName, location:'default'});
    } else {
      db = $cordovaSQLite.openDB({ name: config.cacheDBName, iosDatabaseLocation:'default'});
    }
  }

  function createTables() {
    createTable("packs", {"id": "integer primary key", "name": "text", "picture": "text", "cost": "text", "scu": "text"});
    createTable("emojy", {"id": "integer primary key autoincrement", "pack": "integer", "condition": "text", "src": "text", "time" : "text"});
    createTable("backgrounds", {"id": "integer primary key autoincrement", "pack": "integer", "src": "text", "time" : "text"});
  }


  function createTable(name, fields) {
      var createTable = "CREATE TABLE IF NOT EXISTS " + name + " (";
      var begin = "";
      for (var fieldName in fields) {
        createTable += begin + fieldName + " " + fields[fieldName];
        begin = ", ";
      }
      createTable += ")";
      return new Promise(function(resolve, reject) {
        query(createTable).then(function(r) {
          resolve(r);
        }, function(err) {
          reject("Could not execute " + createTable);
        });
      });
  }

  this.packs = function(type, value) {
    if(value) {
      return setPacks(type, value);
    } else {
      return getPacks(type);
    }
  }

  function getPacks(type) {
    return new Promise(function(resolve, reject) {
      createPackTableForType(type).then(function(result){
        var joinPackWithType = "SELECT * FROM \""+ type +"\" JOIN packs USING (id)";
        query(joinPackWithType).then(function(res) {
          var arr = resultToArr(res);
          resolve(arr);
        }, function(err) {
          console.log(JSON.stringify(err));
          resolve(null);
        })
      }, function(err) {
        console.log("CREATE " + type + " ERROR: ", err);
        resolve(null);
      });
    });
  }

  function alertResult(tag, res) {
      alert(tag + " <<<<< " + JSON.stringify(resultToArr(res)));
  }

  function resultToArr(result) {
    var res = [];
    for(var i = 0; i < result.rows.length; i++) {
      res.push(result.rows.item(i));
    }
    return res;
  }

  function createPackTableForType(type) {
    return new Promise(function(resolve, reject) {
      createTable("\"" + type + "\"", {"id" : "integer primary key"}).then(function(r) {
        resolve(r);
      }, function(err) {
        reject(err);
      });
    });
  }

  function setPacks(type, value) {
    var list = value;
    for(var i = 0; i < list.length; i++) {
      var pack = list[i];
      insertPack(type, pack);
    }
  }

  function insertPack(type, value) {
    createPackTableForType(type).then(function() {

      insertIntoPacks(value).then(function(result){}, function(err) {
        alert(insert + " <<<<<< err: " + JSON.stringify(err));
      });
      insertIntoAffectedPacks(type, value).then(function() {}, function (err) {
        alert(insert + " <<<<<< err: " + JSON.stringify(err));
      })

    }, function(err) {
      alert("CREATE " + type + " <<<<<< err: " + JSON.stringify(err));
    })
  }

  function insertIntoPacks(value) {
    var values = value.id + ", \"" + value.name + "\", \"" + value.picture + "\"";
    var insert = "INSERT OR IGNORE INTO packs (id, name, picture) VALUES("+ values +")";
    return query(insert)
  }

  function insertIntoAffectedPacks(type, value) {
    insert = "INSERT OR IGNORE INTO \`" + type + "\` (id) VALUES("+value.id+")";
    return query(insert);
  }

  this.emojy = function (pack, condition, time, value) {
    time = time.toLowerCase();
    if(value) {
      return setEmojy(pack, condition, time, value);
    } else {
      return getEmojy(pack, condition, time);
    }
  }

  function getEmojy(pack, condition, time) {
    return new Promise(function(resolve, reject) {
      var selectSrc = "SELECT src FROM emojy WHERE condition = \"" + condition + "\" AND pack = \"" + pack + "\" AND time = \"" + time + "\"";
      query(selectSrc).then(function(response) {
        var arr = resultToArr(response);
        resolve(arr);
      })
    });
  }

  function setEmojy(pack, condition, time, value) {
    return new Promise(function(resolve, reject) {
      getEmojy(pack, condition, time).then(function(result) {
        if(result && result.length > 0) return resolve();
        var values = pack + ", \"" + condition + "\", \"" + value + "\", \"" + time + "\"";
        var insert = "INSERT OR IGNORE INTO emojy (pack, condition, src, time) VALUES("+ values +")";
        return query(insert);
      });
    });
  }

  this.background = function(pack, time, value) {
    if(value) {
      return setBackground(pack, time, value);
    } else {
      return getBackground(pack, time);
    }
  }

  function getBackground(pack, time) {
    return new Promise(function(resolve, reject) {
      var selectSrc = "SELECT src FROM backgrounds WHERE pack = \"" + pack + "\" AND time = \"" + time + "\"";
      query(selectSrc).then(function(response) {
        var arr = resultToArr(response);
        resolve(arr);
      })
    });
  }

  function setBackground(pack, time, value) {
    return new Promise(function(resolve, reject) {
      return getBackground(pack, time).then(function(result) {
        if(result && result.length > 0) return resolve();
        var values = pack + ", \"" + value + "\", \"" + time + "\"";
        var insert = "INSERT OR IGNORE INTO backgrounds (pack, src, time) VALUES("+ values +")";
        return query(insert);
      });
    });
  }

  function query(q, args) {
    if(!db) openWhenReady();
    return $cordovaSQLite.execute(db, q, args);
  }



  function createFakeCache() {
    console.log("Created dummy for persistent cache");
    return {
      open: dummy,
      reset: dummy,
      packs: dummy,
      emojy: dummy,
      background: dummy
    }

    function dummy() {
      return new Promise(function(resolve, reject) {
        resolve(null);
      });
    }
  }
});
