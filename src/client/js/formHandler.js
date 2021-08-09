async function handleSubmit(event){
    event.preventDefault()
    let inputUrl = document.getElementById('name').value;
    const validUrl = Client.validateURL(inputUrl);
    console.log("::: Form Submitted :::");

    if(!validUrl){
      alert("Invalid URL. Please enter valid URL");
      return;
    }
    console.log("URL is valid");

    await fetch ('http://localhost:5000/results', {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({url:inputUrl})
      })
      .then(response => response.json()) 
      .then(function(response){
        document.getElementById('results').classList.remove('dissapear');
        document.getElementById('error').textContent = "";
        document.getElementById('polarity').textContent = `Polarity : ${response.polarity}`;
        document.getElementById('subjectivity').textContent = `Subjectivity : ${response.subjectivity}`;
        document.getElementById('polarity-confidence').textContent = `Polarity Confidence : ${response.polarity_confidence.toFixed(2)}`;
        document.getElementById('subject-confidence').textContent = `Subjectivity Confidence : ${response.subjectivity_confidence.toFixed(2)}`;
        document.getElementById('text').textContent = `Text: ${response.text.substr(0,100)}....`;
      }).catch((error)=> {
        console.log(error);
      });
    }

export{ handleSubmit };