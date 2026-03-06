// const { spawn } = require("child_process")

// function runPython(code, callback){

//     const child = spawn("python", ["../engines/python/run.py"])

//     let output = ""
//     let error = ""

//     // send code to python
//     child.stdin.write(code)
//     child.stdin.end()

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

// }

// module.exports = runPython



// const { spawn } = require("child_process")

// function runPython(code, res){

// const child = spawn("python", ["-u", "../engines/python/run.py"])

// res.writeHead(200,{
// "Content-Type":"text/plain",
// "Transfer-Encoding":"chunked"
// })

// // send code
// child.stdin.write(code)
// child.stdin.end()

// child.stdout.on("data",(data)=>{
// res.write(data.toString())
// })

// child.stderr.on("data",(data)=>{
// res.write(data.toString())
// })

// child.on("close",()=>{
// res.end()
// })

// setTimeout(()=>{
// child.kill("SIGKILL")
// res.end("\n⚠ Execution stopped (Time limit exceeded)")
// },15000)

// }

// module.exports = runPython

const { spawn } = require("child_process")
const path = require("path")

function runPython(code,res){

const pythonFile = path.join(__dirname,"run.py")

const child = spawn("python",["-u",pythonFile])

let finished = false

// OUTPUT LIMITS
let outputSize = 0
let lineCount = 0

const MAX_OUTPUT = 10000
const MAX_LINES = 100

res.writeHead(200,{
"Content-Type":"text/plain",
"Transfer-Encoding":"chunked"
})

// send code
child.stdin.write(code)
child.stdin.end()

child.stdout.on("data",(data)=>{

if(finished) return

outputSize += data.length
lineCount++

if(outputSize > MAX_OUTPUT || lineCount > MAX_LINES){

finished = true
child.kill("SIGKILL")

return res.end("\n⚠ Output limit exceeded")

}

res.write(data.toString())

})

child.stderr.on("data",(data)=>{

if(finished) return

res.write(data.toString())

})

child.on("close",()=>{

if(!finished){
finished = true
res.end()
}

})

// TIMEOUT
setTimeout(()=>{

if(!finished){

finished = true
child.kill("SIGKILL")

res.end("\n⚠ Execution stopped (Time limit exceeded)")

}

},5000)

}

module.exports = runPython