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
const fs = require("fs")

function runPython(code,res){

fs.writeFileSync("temp.py",code)

const child = spawn("python3",["temp.py"])

res.writeHead(200,{
"Content-Type":"text/plain"
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

}

module.exports = runPython