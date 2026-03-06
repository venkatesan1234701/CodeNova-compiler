// const express = require("express")
// const cors = require("cors")

// const runJS = require("./engines/javascript/run")
// const runPython = require("./engines/python/run")

// const app = express()

// app.use(cors())
// app.use(express.json())

// app.post("/run",(req,res)=>{

// const { language, code } = req.body

// console.log("Language:", language)
// console.log("Code received:", code)

// if(!language || !code){
// return res.json({
// error:"Language or code missing"
// })
// }

// try{

// if(language === "javascript"){

// console.log("Running JavaScript engine")

// runJS(code,(output)=>{

// console.log("JS Output:", output)

// res.json({
// output: output
// })

// })

// }

// else if(language === "python"){

// console.log("Running Python engine")

// runPython(code,(output)=>{

// console.log("Python Output:", output)

// res.json({
// output: output
// })

// })

// }

// else{

// res.json({
// error:"Language not supported"
// })

// }

// }catch(err){

// console.error("Server Error:", err)

// res.json({
// error:"Server error"
// })

// }

// })

// app.listen(5000,()=>{
// console.log("🚀 Server running on port 5000")
// })


// const express = require("express")
// const cors = require("cors")
// const path = require("path")

// const runJS = require("../engines/javascript/run")
// const runPython = require("../engines/python/run")

// const app = express()

// app.use(cors())
// app.use(express.json())

// // serve frontend files
// // app.use(express.static(path.join(__dirname,"../public")))
// app.use(express.static(path.join(__dirname,"public")))

// // GET route -> open index.html
// app.get("/",(req,res)=>{
// // res.sendFile(path.join(__dirname,"../public/index.html"))
// res.sendFile(path.join(__dirname,"public/index.html"))
// })

// // compiler API
// app.post("/run",(req,res)=>{

// const { language, code } = req.body

// if(!language || !code){
// return res.json({
// error:"Language or code missing"
// })
// }

// try{

// if(language==="javascript"){
// runJS(code,res)
// }

// else if(language==="python"){
// runPython(code,res)
// }

// else{
// res.json({
// error:"Language not supported"
// })
// }

// }catch(err){

// console.error(err)

// res.json({
// error:"Server error"
// })

// }

// })

// const PORT = process.env.PORT || 5000

// app.listen(PORT,()=>{
// console.log("🚀 Server running on port " + PORT)
// })

const express = require("express")
const cors = require("cors")
const path = require("path")

const runJS = require("../engines/javascript/run")
const runPython = require("../engines/python/run")

const app = express()

app.use(cors())
app.use(express.json())

// ---------------- SECURITY CHECK ----------------

function isUnsafeCode(code){

const blockedPatterns = [
"while(true)",
"for(;;)",
"process.exit",
"require('fs')",
'require("fs")',
"child_process",
"cluster",
"worker_threads",
"setInterval(",
"setTimeout("
]

for(let word of blockedPatterns){
if(code.includes(word)){
return true
}
}

return false
}

// detect possible infinite loop
function hasInfiniteLoop(code){

if(code.includes("while(") && !code.includes("break")){
return true
}

return false
}

// ---------------- SERVE FRONTEND ----------------

app.use(express.static(path.join(__dirname,"public")))

app.get("/",(req,res)=>{
res.sendFile(path.join(__dirname,"public/index.html"))
})

// ---------------- COMPILER API ----------------

app.post("/run",(req,res)=>{

const { language, code } = req.body

if(!language || !code){
return res.json({
error:"Language or code missing"
})
}

// code size protection
if(code.length > 5000){
return res.json({
error:"❌ Code too large"
})
}

// unsafe code protection
if(isUnsafeCode(code)){
return res.json({
error:"❌ Unsafe code detected"
})
}

// infinite loop protection
if(hasInfiniteLoop(code)){
return res.json({
error:"⚠ Possible infinite loop detected"
})
}

try{

if(language === "javascript"){
runJS(code,res)
}

else if(language === "python"){
runPython(code,res)
}

else{
res.json({
error:"Language not supported"
})
}

}catch(err){

console.error(err)

res.json({
error:"Server error"
})

}

})

// ---------------- SERVER ----------------

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
console.log("🚀 Server running on port " + PORT)
})