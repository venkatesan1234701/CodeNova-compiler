// const { spawn } = require("child_process")

// function runJS(code, callback){

//     const child = spawn("node", ["-e", code])

//     let output = ""
//     let error = ""

//     child.stdout.on("data",(data)=>{
//         output += data.toString()
//     })

//     child.stderr.on("data",(data)=>{
//         error += data.toString()
//     })

//     child.on("close",()=>{
//         if(error){
//             callback(error)
//         }else{
//             callback(output)
//         }
//     })

//     // infinite loop protection
//     setTimeout(()=>{
//         child.kill()
//     },5000)

// }

// module.exports = runJS




///////////////    cut



// const { spawn } = require("child_process")

// function runJS(code, callback){

// const child = spawn("node", ["-e", code])

// let output = ""
// let error = ""
// let finished = false

// child.stdout.on("data",(data)=>{
// output += data.toString()
// })

// child.stderr.on("data",(data)=>{
// error += data.toString()
// })

// child.on("close",()=>{

// if(finished) return
// finished = true

// if(error){
// return callback(error)
// }

// return callback(output)

// })

// // timeout protection
// setTimeout(()=>{

// if(!finished){

// finished = true
// child.kill()

// callback("⚠ Execution stopped (Time limit exceeded)")

// }

// },2000)

// }

// module.exports = runJS




// const { spawn } = require("child_process")

// function runJS(code, callback){

// const child = spawn("node", ["-e", code])

// let output = ""
// let error = ""
// let finished = false

// child.stdout.on("data",(data)=>{
// output += data.toString()
// })

// child.stderr.on("data",(data)=>{
// error += data.toString()
// })

// child.on("close",()=>{

// if(finished) return

// finished = true

// if(error){
// return callback(error)
// }

// return callback(output || "No output")

// })

// setTimeout(()=>{

// if(!finished){

// finished = true
// child.kill("SIGKILL")

// callback(output + "\n⚠ Execution stopped (Time limit exceeded)")

// }

// },7000)

// }

// module.exports = runJS


const { spawn } = require("child_process")

function runJS(code, res){

const child = spawn("node", ["-e", code])

res.writeHead(200,{
"Content-Type":"text/plain",
"Transfer-Encoding":"chunked"
})

child.stdout.on("data",(data)=>{
res.write(data.toString())
})

child.stderr.on("data",(data)=>{
res.write(data.toString())
})

child.on("close",()=>{
res.end()
})

setTimeout(()=>{
child.kill("SIGKILL")
res.end("\n⚠ Execution stopped (Time limit exceeded)")
},15000)

}

module.exports = runJS


