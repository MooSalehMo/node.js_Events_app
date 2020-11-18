deleteEvent = () => {
  let btn = document.querySelector('#eventBtn')
  let id = btn.getAttribute('data-id')
  axios.delete('/events/delete/' + id).then( res => {
    console.log(res.data);
    alert('event was deleted')
    window.location.href = "/events"
  }).catch(err => {
    console.log(err);
  })
}

// upload 
readURL = (input) => {
  if (input.files && input.files[0]) {
    var reader = new FileReader()
    reader.onload = (e) => {
      let image = document.getElementById("imagePlaceholder")
      image.style.display = "block"
      image.src = e.target.result
    }
    reader.readAsDataURL(input.files[0])
  }
  
}

let inputFile = document.getElementById('avatar')
let btnUpload = document.getElementById('btnUpload')
btnUpload.style.display = "none"
inputFile.onclick = () => btnUpload.style.display = "inline-block"