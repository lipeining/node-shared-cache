// create cache instance
var cache = require('./index.js');
var obj = new cache.Cache("test", 557056);

// setting property
obj.foo = "bar";

// getting property
console.log("obj.foo", obj.foo);

// enumerating properties
for(var k in obj);
Object.keys(obj);
console.log("Object.keys(obj)", Object.keys(obj));

// deleting property
delete obj.foo;
console.log("delete obj.foo", obj.foo, obj);

// writing objects is also supported
obj.foo = {'foo': 'bar'};
// but original object reference is not saved
var test = obj.foo = {'foo': 'bar'};
console.log("test === obj.foo", test === obj.foo); // false

// circular reference is supported.
test.self = test;
obj.foo = test;
// and saved result is also circular
test = obj.foo;
console.log("test.self === test", test.self === test); // true

// increase a key
cache.increase(obj, "foo");
cache.increase(obj, "foo", 3);
console.log("obj.increase obj.foo", obj); // 

// exchange current key with new value, the old value is returned
// cache.set(obj, "foo", 123);
cache.exchange(obj, "foo", 456); // 123
obj.foo; // 456
console.log("obj.exchange obj.foo", obj); // 

// dump current cache
var values = cache.dump(obj);
console.log("dump", values);
// dump current cache by key prefix
values = cache.dump(obj, "foo");
console.log("dump foo", values);


// release memory region
cache.release("test");
console.log("release test", obj); // 
values = cache.dump(obj, "foo");
console.log("dump foo", values);
