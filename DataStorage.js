;(function(_g){

  function DataStorage(_args){
    _args=_args||{};

    if( typeof JSON ==='undefined'){
      throw new Error('JSON object is not supported');
    }

    if( typeof localStorage === 'undefined'){
      throw new Error('localStorage object is not supported');
    }

    this.autogeneratedPrefix = typeof _args.prefix==='undefined'||false;
    if( _args.prefix===false ){
      this.prefix = '';
    }else{
      this.prefix = _args.prefix || Math.random().toString(36).substr(2, 5);
      this.prefix += '.';
    }

    this.prefixes=[];
    try{
      this.prefixes = JSON.parse(localStorage.DataStoragePrefix);
    }catch(e){
    }

    var _addedFlag = false;
    for( var i=0, l=this.prefixes.length ; i < l ; i++){
      if( this.prefixes[i] === this.prefix){
        _addedFlag = true;
        break;
      }
    }
    if( !_addedFlag ){
      this.prefixes.push(this.prefix);
      localStorage.DataStoragePrefix = JSON.stringify(this.prefixes);
    }

  }

  DataStorage.prototype.setItem = function(_key,_value) {
    localStorage.setItem(this.prefix+_key,_value);
    return this;
  };

  DataStorage.prototype.getItem = function(_key) {
    return localStorage.getItem(this.prefix+_key);
  };
  
  DataStorage.prototype.clear = function(_args) {
    _args = _args||{};
    
    if(typeof _args.key==='undefined'){
      var _regex = new RegExp( "^" + this.prefix );
      for( var _k in localStorage){
        var _match = _k.match(_regex);
        if( _match!==null ){
          localStorage.removeItem(_match.input);
        }
      }
    }else{
      localStorage.removeItem(this.prefix+_args.key);
    }
  };

  DataStorage.prototype.clearLocalStorage = function() {
    localStorage.clear();
  };

  _g.DataStorage = DataStorage;

})(window);
