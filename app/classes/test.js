
let timer = function(din,time){
    return new Promise(function(resolve){
      setTimeout(function(){
        resolve(din)
      },time)  
    })
}


async function run1 () {
    return await timer(1,1500)
}

async function run2 () {
    return await timer(2,500)
}

run1()
.then(function(poop){
    console.log(poop)
    let poop2 = run2()
    console.log(poop2)
})