let btn = document.getElementById("shorten");

btn.addEventListener('click', short);


async function short(){
    let longURL = document.getElementById("longurl").value;
    // Get all the child sections with class "urlitem" within it
    var urlitemSections = urllistSection.querySelectorAll('section.urlitem');

    // Get the count of child sections with class "urlitem"
    var sectionCount = urlitemSections.length;
    console.log("section",sectionCount);
    if(longURL.length>0){
        if(sectionCount==3){
          // Remove the first <section> element with class "urlitem"
          const urllistSection = document.querySelector(".urllist");
          const lastUrlItem = urllistSection.querySelector(".urlitem:last-child");

          if (lastUrlItem) {
              urllistSection.removeChild(lastUrlItem);
          }

        }
        const urllistSection = document.querySelector(".urllist");
          const newSection = document.createElement("section");
          newSection.className = "urlitem";
          if(sectionCount!=0){
            newSection.classList.add("second");
          }
          const firsturllist = document.createElement("section");
          firsturllist.className = "firsturllist";
      
          var h1Element = document.createElement("h1");
      
          h1Element.textContent = longURL;
      
          firsturllist.appendChild(h1Element);
      
          newSection.appendChild(firsturllist);
      
          const secondurllist = document.createElement("section");
          secondurllist.className = "secondurllist";
      
          let shortURL = "";
      
          const result = await fetch(`https://api.shrtco.de/v2/shorten?url=${longURL}`);
          const data = await result.json();
      
          shortURL = data.result.short_link2;
      
          var h1Element2 = document.createElement("h1");
      
          h1Element2.textContent = shortURL;
      
          var button = document.createElement("button");
      
          button.textContent = "Copy";
  
          button.className = "copybtn";
      
          secondurllist.appendChild(h1Element2);
      
          secondurllist.appendChild(button);
      
          newSection.appendChild(secondurllist);
      
          urllistSection.append(newSection);
        
    }
    else{
        
        var errorsection = document.querySelector(".errorsection");
        var computedStyle = window.getComputedStyle(errorsection);


        if (computedStyle.getPropertyValue('display') === "none") {
            errorsection.style.display = "block";
            errorsection.style.fontStyle = "italic";
        } else {
            errorsection.style.display = "none";
        }

        var urlfield = document.querySelector(".urlfield");
        if (urlfield.style.border === "2px solid var(--Red)") {
            urlfield.style.border = "none";
            urlfield.classList.toggle('redcolor');
        } else {
            urlfield.style.border = "2px solid var(--Red)";
            urlfield.classList.toggle('redcolor');
        }

       
    }

    
}

const urllistSection = document.querySelector(".urllist");

urllistSection.addEventListener('click', function(event) {
  if (event.target.classList.contains('copybtn')) {
    // Handle the click event for the "Copy" button
    const h1Text = event.target.previousElementSibling.textContent;

    // Copy the text to the clipboard
    navigator.clipboard.writeText(h1Text)
      .then(() => {
        alert('Copied to clipboard');
      })
      .catch(error => {
        console.error('Failed to copy: ', error);
      });
  }
});





