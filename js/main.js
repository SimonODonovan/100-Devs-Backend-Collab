document.querySelector('#clickMe').addEventListener('click', makeReq)

async function makeReq(){

  const userQuestion = document.querySelector("#question").value;
  const res = await fetch(`/api?question=${userQuestion}`)
  const data = await res.json()
  

  console.log(data.question);
  document.querySelector("#questionHighlight").textContent = data.question
  document.querySelector("#answer").textContent = data.answer
}