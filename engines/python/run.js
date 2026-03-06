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



const { spawn } = require("child_process")

function runPython(code, res){

const child = spawn("python", ["-u", "../engines/python/run.py"])

res.writeHead(200,{
"Content-Type":"text/plain",
"Transfer-Encoding":"chunked"
})

// send code
child.stdin.write(code)
child.stdin.end()

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

module.exports = runPython