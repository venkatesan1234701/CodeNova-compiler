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

function runPython(code,res){

const child = spawn("python", ["-c", code], {
stdio:["pipe","pipe","pipe"]
})

res.writeHead(200,{
"Content-Type":"text/plain",
"Transfer-Encoding":"chunked"
})

let finished=false

const timer=setTimeout(()=>{
if(!finished){
child.kill("SIGKILL")
res.write("\n⚠ Execution stopped (Time limit exceeded)")
res.end()
finished=true
}
},15000)

child.stdout.on("data",(data)=>{
res.write(data.toString())
})

child.stderr.on("data",(data)=>{
res.write(data.toString())
})

child.on("close",()=>{
if(!finished){
clearTimeout(timer)
res.end()
finished=true
}
})

}

module.exports = runPython