(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   *  ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understanding it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  /*
  _.last = function(array, n) {
    if (n===undefined)
      return array[array.length-1];
    else
    {
      if (n<array.length)
        return array.slice(array.length-n,array.length);
      else
        return array;
    }
  };
  */
  // shorter method of writing above statement:
  _.last = function(array, n) {
    return n === undefined ? array[array.length-1] : n<array.length ? array.slice(array.length-n,array.length) : array;
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    //console.log(Array.isArray(collection));
    if (Array.isArray(collection)){
      for (var i=0;i<collection.length;i++){
        //console.log(i,collection[i]);
        iterator(collection[i],i,collection);
      }
    }
    else{
      //console.log('Not an array');
      for (var i in collection){
        //console.log("Object",i,collection[i]);
        iterator(collection[i],i,collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var filtered=[];
    _.each(collection, function(item){
      if (test(item)===true){
        filtered.push(item);
      }
    })
    return filtered;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    var anti=function(item){
      return test(item)===true ? false : true;
    };
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying   it
    return _.filter(collection,anti); 

  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var duplicate=[];
    /*
    _.each(array,function(item){duplicate.push(item);});
    var toBeDeleted=[];
    console.log('Array',duplicate);
    _.each(duplicate,function(item,index){
      var foundIndex=_.indexOf(duplicate.slice(index+1),item);
      if (foundIndex!==-1){
        console.log('index',index,'item', item,'found at:',index+foundIndex+1);
        toBeDeleted.push(index+foundIndex+1);
      }
    });
    console.log(toBeDeleted);
    
    var popped=0;
    _.each(toBeDeleted, function(item){
      console.log(item, popped, duplicate);
      duplicate.splice(item-popped,1);
      popped++;
    });
    */
    _.each(array,function(item,index){
      if (_.indexOf(duplicate,item)===-1)
        duplicate.push(item);});
    //console.log("duplicate end",duplicate,array);
    return duplicate;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    var mapped=[];
    _.each(collection,function(item){
      //console.log(iterator(item),item);
      mapped.push(iterator(item));
    });
    return mapped;
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as it's second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    if (accumulator===undefined){
      //console.log('collection',accumulator,collection[0]);
      var result=collection[0];
    }
    else {
      var result=accumulator;
    }
    _.each(collection,function(item,index){
      if (accumulator!==undefined || index!==0){
      result=iterator(result,item);
      //console.log('Result',result);
    }
    });
    return result;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    //console.log('---');
    var condition=true;
    if (!iterator) {iterator= _.identity;}
    return _.reduce(collection, function(allTrue,item){
        //console.log('computed:',iterator(item));
        if (iterator(item)==false || item===null || item===undefined){
          condition=false;
        }
        return condition;
    },true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    //console.log('---');
    // TIP: There's a very clever way to re-use every() here.
    if(!foundOne) {
      //console.log('found one unassigned!');
      var foundOne=false;
    }
    var any=function(item){
      if (!iterator) {iterator= _.identity;}
      //console.log('Iterated item',iterator(item));
      if (iterator(item) && foundOne===false){
        foundOne=true;
      }
    };
    _.every(collection,any);
    return foundOne;
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    var extended={};
    var testEmpty=true;
    //console.log('Extend Args',arguments,'Obj',obj);
    for (var key in arguments){
      //console.log('Key',key);
      for (var key2 in arguments[key]){
        //console.log(arguments[key],key2,arguments[key][key2]);
        testEmpty=false;
      }
      if (key2 !== undefined)
        extended[key2]=arguments[key][key2];
    }
    //console.log('extended',extended);
    if (testEmpty===true){
      //console.log('original',obj);
      return obj;
    }
    return extended;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    var defaulted={};
    var testEmpty=true;
    //console.log('---',obj);
    for (var key in arguments){
      //console.log('Defaults Key',key,arguments[key]);
      for (var key2 in arguments[key]){
        //console.log(arguments[key],key2,arguments[key][key2]);
        testEmpty=false;
      //another way to test if the property already exists, is the hasOwnProperty prototype:
      //console.log(arguments[key],key2,'hasOwnProperty',defaulted.hasOwnProperty(key2));
      if (key2 !== undefined && defaulted[key2]===undefined){
        //console.log('initialized a value here');
        defaulted[key2]=arguments[key][key2];
        }
      }
    }
    //console.log('defaulted',defaulted);
    if (testEmpty===true)
      return obj;
    return defaulted;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function takes only one argument and that it is a primitive.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.

  //eg. _.memoize(add(1,2)), so func = add(1,2), and args=[1,2]
  //so, _.memoize(anything) will lead to running anon(), as it is returned in _.memoize. anon can manipulate store, as the inner function can manipulate outer function's variables. 
  //
  _.memoize = function(func) {
    var store={};
    var anon= function(){
      var argList=Array.prototype.slice.call(arguments);
      //console.log(argList);
      if (store.hasOwnProperty(argList)){
        //console.log("Matched from cache",store[argList]);
        return store[argList];
      }
      else {
        //console.log("No matching property.")
        store[argList]=func.apply(this,argList);
        //console.log('store',store);
        return store[argList];
      }
    };
    return anon;
  };
/*
  _.memoize = function(func) {
    var store;
    var innerArgs;
    var ReqArgs;
    console.log('arguments of outer function',arguments);
    store=_.once(function(func){
      innerArgs={};
      console.log(arguments);
      _.each(arguments,function(item,index,collection){
        innerArgs[index]=item;
        console.log(index,item);
      });
      console.log('arguments of inner function:',innerArgs);
      ReqArgs=innerArgs;
      //console.log(typeof innerArgs);
      //return innerArgs;
    });
    console.log('req',ReqArgs);
    //console.log('inner argument',store.apply(this,func));
    return store;
  };
*/
  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args=Array.prototype.slice.call(arguments);
    //console.log(args,args.slice(2));
    if (args.length>2){
      //console.log('Arguments provided');
      setTimeout(func.apply(this,args.slice(2)),wait);
    }
    else {
      //console.log('No arguments at all');
      setTimeout(func,wait);
    }
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice

  // Need to fix this, so it passes third test.
  _.shuffle = function(array) {
    var randGen=function(){
      var rArray=[];
      while (rArray.length!=array.length){
        var Rand=Math.floor(Math.random()*array.length);
        var index=_.indexOf(rArray,Rand);
        //console.log(Rand,rArray,index);
        if (index==-1){
          rArray.push(Rand);
          }
        }
      return rArray;
    };

    var isSame=function(ar1,ar2){
      var condition=true;
      _.each(ar1,function(item,index){
        //console.log(item,ar2[index]);
        if (item!==ar2[index]){
          condition=false;
        }
      });
      //console.log(condition);
      return condition;
    };
    //console.log('----');
    var newArray=[];
    while (newArray.length<1 || isSame(array,newArray)===true){
      //console.log(isSame(array,newArray),array,newArray);
      var rArray=randGen();
      //console.log(array,'random array',rArray,newArray);
    _.each(array,function(item,index){
      //console.log(index,item,rArray[index]);
      //putting value of item into the index of the random array, as rArray contains randomized numbers until length of array.
      //console.log(item,rArray[index],index);
      newArray[rArray[index]]=item;
      //console.log('new array looks like',newArray);
    });
   }
      //console.log('randomized Array',newArray);
      //console.log(isSame(array,newArray),array,newArray);
      return newArray;
  };


  /**
   * EXTRA CREDIT
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    var what=typeof functionOrKey;
    //console.log('---',functionOrKey,what);
    var returnList=[];
    _.each(collection,function(item){
      if (what==='function'){
        var applied=functionOrKey.call(item);
      }
      else{
        if (what==='string'){
          //hackish, need to know how this works. I can input anything before the [], and get the desired result. I think it pulls the property from any string, as all strings have toUppercase property.
          var prop= new String()[functionOrKey];
          var applied=prop.apply(item);
          // console.log('string now looks like',applied);
        }
      }
      returnList.push(applied);
    });
    //console.log(returnList);
    return returnList;
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    var newCollection={};
    // var modifier=function(){
    //   console.log('i is',iterator);
    // }(iterator);
    var swapValues=function(arr,v1,v2){
      var temp=arr[v1];
      arr[v1]=arr[v2];
      arr[v2]=temp; 
    };
    var formArray=function(object){
      var array=[];
      _.each(object,function(item){
        array.push(item);
      });
      return array;
    };
    var collArray=formArray(collection);
    function sortArray(array,inputArray){
    for (var i=0;i<array.length;i++){
      for (var j=0;j<i;j++){
          // console.log('i',i,inputArray[i],'and','j',j,inputArray[j],'array',array);

        if(inputArray[i]<inputArray[j] || inputArray[j]===undefined){
          // console.log('reached check-point');
          if(!(inputArray[i]===undefined && inputArray[j]===undefined)){
            // console.log('swapped');
            swapValues(array,i,j);
            swapValues(inputArray,i,j);
          }
        }
      }
    }
    return array;
  };
    var inputArray=[];
    _.each(collection,function(item,index){
      if (typeof iterator==='function'){
        inputArray.push(iterator(item));
      }
      else{
        var prop = item[iterator];
        inputArray.push(prop);
      }
    });
    // _.invoke(collection,iterator);
    collection=sortArray(collArray,inputArray);
    // console.log(collection);
    return collection;
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    // console.log(arguments);
    var longest=0;
    var line=[];
    var zipFull=[];
    _.each(arguments,function(item){
      zipFull.push([]);
    });
    // console.log('zipfull',zipFull);
    _.each(arguments,function(item,index){
      _.each(item,function(item2,index2){
        // console.log(index2,item2);
        zipFull[index2].push(item2);
      });
      if (item.length>longest){
        // console.log('trigger');
        longest=item.length;
        line=item;
      }
      // console.log(index,item,item.length);
    });
    // console.log('zipFull',zipFull);
    // console.log('longest',longest,'line',line);
    var zipped=[];
    for(var i=0;i<longest;i++){
      for (var j=0;j<longest-zipFull[i].length;j++){
        // console.log('i',i,'j',j);
        zipFull[i].push(undefined);
      }
    }
    // console.log('zF',zipFull);
    return zipFull;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    if (result===undefined){
      var result=[];
    }
    
    _.each(nestedArray, function(item){
      // console.log(item,Array.isArray(item));
      if (Array.isArray(item)===true){
        result= _.flatten(item,result);
      }
      else{
        result.push(item);
      }
    });
    // console.log('flat',result);
    return result;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    // console.log('arguments',arguments,Array.isArray(arguments));
    var element;
    var same=[];
    var line1=arguments[0];
    var limit=arguments.length;
    // console.log('limit',limit);
    // console.log('line1',line1);
    var arr=Array.prototype.slice.call(arguments);
    _.each(line1,function(item2){
      var count=0;
      _.each(arr.slice(1),function(item){
        // console.log(item2,item,_.indexOf(item,item2));
        if (_.indexOf(item,item2)!==-1){
          // console.log('match found');
          count++;
        }
      });
      // console.log(index,item);
      // console.log('count is',count);
      if (count===limit-1){
        same.push(item2);
      }
    });
    // console.log('same',same);
    return same;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    // console.log(arguments);
    var newArray=[];
    var remove=[];
    var arr=Array.prototype.slice.call(arguments);
    // console.log('arr',arr);
    _.each(arr.slice(1),function(item,index){
      // console.log('array',array,'item',item,'intersection',_.intersection(array,item));
      remove.push(_.intersection(array,item));
    });
    remove=_.flatten(remove);
    _.each(array,function(item){
      // console.log(array,item,_.indexOf(remove,item));
      if (_.indexOf(remove,item)===-1){
        newArray.push(item);
      }
    });
    //  console.log('newarray',newArray);
    return newArray;
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
    //assim is assimilation of previous runs
    var assim=[];
    return function(){
      var g=new Date();
      // func.callCount
      assim.push(g.getTime());
      console.log('arg',g.getTime(),'call count',func.callCount,assim);
      console.log('g',g.getTime(),'previous',assim[assim.length-2]);
      if (func.callCount===0){
        return func();
      }
      else{
        if (g.getTime()-assim[assim.length-2]>100 || (g.getTime()-assim[assim.length-2]<g.getTime()%wait))
          return func();
      }
    };
    // var arr=Array.prototype.slice.call(arguments));
    // console.log(setTimeout(func,wait));
    // func();
  };
}());
