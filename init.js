window.z= ( a, ...o )=> (console.log( a, ...o, ) , a);
window.v= ( a, ...o )=> (console.log( a.valueOf?a.valueOf():a, ...o.map( x=> x.valueOf?x.valueOf():x, ), ) , a);

window.timeout= ( time, value, )=> new Promise( ( resolve, reject, )=> setTimeout( ()=> resolve( value, ), time, ), );
window.nextFrame= value=> new Promise( ( resolve, reject, )=> requestAnimationFrame( ()=> resolve( value, ), ), );
