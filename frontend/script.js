let editor;
let currentLanguage = "javascript";

require.config({
paths:{vs:'https://unpkg.com/monaco-editor@0.34.1/min/vs'}
});

require(["vs/editor/editor.main"], function () {

editor = monaco.editor.create(
document.getElementById("editor"),
{
value:`console.log("Hello Rocky 🚀")`,
language:"javascript",
theme:"vs-dark",
fontSize:14,
automaticLayout:true
}
);

// default mode
changeMode("active")

});

function setLanguage(lang){

currentLanguage = lang;

monaco.editor.setModelLanguage(
editor.getModel(),
lang
);

if(lang === "javascript"){
editor.setValue(`console.log("JavaScript running 🚀")`);
}

if(lang === "python"){
editor.setValue(`print("Python running 🚀")`);
}

}



function runCode(){

const code = editor.getValue()

const output = document.getElementById("output")

const runBtn = document.getElementById("runBtn")
const jsBtn = document.getElementById("jsBtn")
const pyBtn = document.getElementById("pyBtn")

let hasError = false
let firstOutput = true

const startTime = performance.now()

output.textContent = "▶ Running...\n\n"

runBtn.disabled = true
jsBtn.disabled = true
pyBtn.disabled = true

runBtn.innerText = "Running..."

editor.updateOptions({
readOnly:true
})

fetch("https://codenova-compiler-1.onrender.com/run",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
language:currentLanguage,
code:code
})

})
.then(response=>{

const reader = response.body.getReader()
const decoder = new TextDecoder()

function read(){

reader.read().then(({done,value})=>{

if(done){

const endTime = performance.now()
const execTime = ((endTime-startTime)/1000).toFixed(4)

output.textContent += "\n-------------------------\n"

output.textContent += `⏱ Execution Time: ${execTime}s\n`
output.textContent += `💾 Memory Usage: ~5 MB\n`

if(hasError){
output.textContent += "❌ Execution Error"
}
else{
output.textContent += "✅ Execution Completed"
}

runBtn.disabled = false
jsBtn.disabled = false
pyBtn.disabled = false

runBtn.innerText = "Run Code"

editor.updateOptions({
readOnly:false
})

return
}

const text = decoder.decode(value)

if(firstOutput){
output.textContent=""
firstOutput=false
}

if(
text.includes("Error") ||
text.includes("ReferenceError") ||
text.includes("SyntaxError") ||
text.includes("Traceback")
){
hasError=true
}

output.textContent += text

read()

})

}

read()

})
.catch(()=>{

output.textContent="❌ Server Error"

runBtn.disabled=false
jsBtn.disabled=false
pyBtn.disabled=false

runBtn.innerText="Run Code"

editor.updateOptions({
readOnly:false
})

})

}

function changeTheme(theme){

const root = document.documentElement

if(theme === "dark"){

root.style.setProperty("--bg","#0f0c1a")
root.style.setProperty("--panel","#111827")
root.style.setProperty("--output","#22c55e")

}

else if(theme === "light"){

root.style.setProperty("--bg","#f5f5f5")
root.style.setProperty("--panel","#ffffff")
root.style.setProperty("--output","#000")

}

else if(theme === "midnight"){

root.style.setProperty("--bg","#020617")
root.style.setProperty("--panel","#0f172a")
root.style.setProperty("--output","#38bdf8")

}

else if(theme === "yellow"){

root.style.setProperty("--bg","#fff8dc")
root.style.setProperty("--panel","#fff1a8")
root.style.setProperty("--output","#000")

}

}

function changeMode(mode){

if(mode === "active"){

editor.updateOptions({

quickSuggestions:true,
suggestOnTriggerCharacters:true,
acceptSuggestionOnEnter:"on",
tabCompletion:"on",
wordBasedSuggestions:true,
autoClosingBrackets:"always",
autoClosingQuotes:"always",
autoIndent:"full"

})

}

else if(mode === "disable"){

editor.updateOptions({

quickSuggestions:false,
suggestOnTriggerCharacters:false,
acceptSuggestionOnEnter:"off",
tabCompletion:"off",
wordBasedSuggestions:false,
autoClosingBrackets:"always",
autoClosingQuotes:"always"

})

}

else if(mode === "notepad"){

editor.updateOptions({

quickSuggestions:false,
suggestOnTriggerCharacters:false,
acceptSuggestionOnEnter:"off",
tabCompletion:"off",
wordBasedSuggestions:false,
autoClosingBrackets:"never",
autoClosingQuotes:"never",
autoIndent:"none"

})

}

}












// let editor;
// let currentLanguage = "javascript";
// let darkTheme = true;

// require.config({
//  paths:{vs:'https://unpkg.com/monaco-editor@0.34.1/min/vs'}
// });

// require(["vs/editor/editor.main"],function(){

// editor = monaco.editor.create(
// document.getElementById("editor"),
// {
// value:`console.log("Hello Rocky 🚀")`,
// language:"javascript",
// theme:"vs-dark",
// fontSize:14,
// automaticLayout:true
// }
// );

// });

// function setLanguage(lang){

// currentLanguage = lang;

// monaco.editor.setModelLanguage(
// editor.getModel(),
// lang
// );

// if(lang==="javascript"){
// editor.setValue(`console.log("JavaScript running 🚀")`);
// }

// if(lang==="python"){
// editor.setValue(`print("Python running 🚀")`);
// }

// }

// function toggleTheme(){

// darkTheme=!darkTheme;

// monaco.editor.setTheme(
// darkTheme?"vs-dark":"vs"
// );

// document.body.style.background=
// darkTheme?"#1e1e1e":"#f5f5f5";

// document.body.style.color=
// darkTheme?"white":"black";

// }

// // function runCode(){

// // const code=editor.getValue();

// // document.getElementById("output")
// // .textContent="Running...\n";

// // fetch("http://localhost:5000/run",{

// // method:"POST",

// // headers:{
// // "Content-Type":"application/json"
// // },

// // body:JSON.stringify({
// // language:currentLanguage,
// // code:code
// // })

// // })

// // .then(res=>res.json())

// // .then(data=>{

// // if(data.output){

// // document.getElementById("output")
// // .textContent=data.output;

// // }else{

// // document.getElementById("output")
// // .textContent=data.error;

// // }

// // })

// // .catch(()=>{

// // document.getElementById("output")
// // .textContent="Server error";

// // });

// // }

// function runCode(){

// const code = editor.getValue()

// const output = document.getElementById("output")

// output.textContent = "Running...\n"

// fetch("http://localhost:5000/run",{
// method:"POST",
// headers:{
// "Content-Type":"application/json"
// },
// body:JSON.stringify({
// language:currentLanguage,
// code:code
// })
// })
// .then(response=>{

// const reader = response.body.getReader()
// const decoder = new TextDecoder()

// function read(){
// reader.read().then(({done,value})=>{

// if(done) return

// const text = decoder.decode(value)

// output.textContent += text

// read()

// })
// }

// read()

// })
// .catch(()=>{
// output.textContent="Server error"
// })

// }

// function changeTheme(theme){

// const output = document.getElementById("output")

// if(theme === "dark"){

// monaco.editor.setTheme("vs-dark")

// document.body.style.background="#1e1e1e"
// document.body.style.color="white"

// output.style.background="black"
// output.style.color="#00ff88"

// }

// else if(theme === "light"){

// monaco.editor.setTheme("vs")

// document.body.style.background="#f5f5f5"
// document.body.style.color="black"

// output.style.background="#ffffff"
// output.style.color="black"

// }

// else if(theme === "midnight"){

// monaco.editor.setTheme("vs-dark")

// document.body.style.background="#0f172a"
// document.body.style.color="#e2e8f0"

// output.style.background="#020617"
// output.style.color="#38bdf8"

// }

// else if(theme === "blue"){

// monaco.editor.setTheme("vs-dark")

// document.body.style.background="#0b132b"
// document.body.style.color="#e0fbfc"

// output.style.background="#1c2541"
// output.style.color="#5bc0be"

// }

// }