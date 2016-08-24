angular.module('app')

.service('Language', function() {
    var _language = localStorage.ew_language || 'en';
    return function(language) {
      if(!language) {
        return _language;
      }
      _language = language.toLowerCase();
      localStorage.ew_language = _language;
    }
});
