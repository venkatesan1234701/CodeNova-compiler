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

// const runJS = require("../engines/javascript/run")
// const runPython = require("../engines/python/run")

// const app = express()

// app.use(cors())
// app.use(express.json())

// app.get("/",(req,res)=>{
// res.send("CodeNova backend running 🚀")
// })

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

// serve frontend
app.use(express.static(path.join(__dirname,"../frontend")))

// home page
app.get("/",(req,res)=>{
res.sendFile(path.join(__dirname,"../frontend/index.html"))
})

// run code API
app.post("/run",(req,res)=>{

const { language, code } = req.body

if(!language || !code){
return res.json({
error:"Language or code missing"
})
}

try{

if(language==="javascript"){
runJS(code,res)
}

else if(language==="python"){
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

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
console.log("🚀 Server running on port " + PORT)
})





