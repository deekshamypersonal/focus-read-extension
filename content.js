document.addEventListener('click', closePopupOutside);
function closePopupOutside(event) {
  const isClickInsidePopup = popup.contains(event.target);
  if (!isClickInsidePopup) {
      // popup.style.display = 'none';
      
      const over = document.getElementById('radiusPopup');
  if (over) {
    
    document.body.removeChild(over);
  }
     
      
  }
}






// Create the overlay element
const overlay = document.createElement('div');
overlay.id = 'dimOverlay';
overlay.style.position = 'fixed';
overlay.style.top = '0';
overlay.style.left = '0';
overlay.style.width = '100%';
overlay.style.height = '100%';
overlay.style.pointerEvents = 'none';
overlay.style.zIndex = '10000'; // Make sure it's on top of everything
overlay.style.background = 'rgba(0, 0, 0, 0.9)';
// document.body.appendChild(overlay);


// Create popup for radius adjustment
const popup = document.createElement('div');
popup.id = 'radiusPopup';
popup.style.position = 'fixed';
popup.style.position = 'fixed';
popup.style.background = '#f0be01';

popup.style.color = 'black';
popup.style.top = '10%';
popup.style.left = '50%';
popup.style.transform = 'translate(-50%, -10%)';
popup.style.zIndex = '10001';
popup.style.padding = '20px';
popup.style.backgroundColor = '#f0be01';
popup.style.border = '1px solid #ccc';
popup.style.borderRadius = '5px';
// document.body.appendChild(popup);

// Create slider input for radius
const slider = document.createElement('input');
slider.type = 'range';
slider.min = '50';
slider.max = '200';
slider.value = '80'; // Default radius value
slider.style.width = '100%';

// Create label to display slider value
// const label1 = document.createElement('div');
const label = document.createElement('div');
//label.textContent = 'Radius: 80px';
label.style.marginTop = '10px';
label.style.textAlign = 'center';

const radiusMessage = document.createElement('div');
radiusMessage.textContent = 'Radius: 80px';
label.appendChild(radiusMessage);

// Add the second message to the same label div
const secondMessage = document.createElement('div');
secondMessage.textContent = '(Click outside to close.)';
secondMessage.style.fontSize = '10px';

label.appendChild(secondMessage);



// Append slider and label to popup
popup.appendChild(slider);
popup.appendChild(label);

// Update radius value based on slider
let radius = slider.value;

slider.oninput = function() {
  radius = this.value;
  radiusMessage.textContent = `Radius: ${radius}px`;
};

// Function to toggle the visibility of the popup based on popupEnabled state
function togglePopupVisibility(popupEnabled) {
  if (popupEnabled) {
      // Show the popup if popupEnabled is true
      // popup.style.display = 'block';

      const over = document.getElementById('radiusPopup');
  if (over) {
    
    document.body.removeChild(over);
  }
  
      document.body.appendChild(popup);

   } 
   else{
    
   }

}



// Mouse move event listener with dynamic radius
document.addEventListener('mousemove', function(e) {
    const x = e.clientX;
    const y = e.clientY;
    
    
    const gradient = `radial-gradient(circle at ${x}px ${y}px, transparent, transparent ${radius}px, rgba(0, 0, 0, 0.9) ${parseInt(radius) + 1}px)`;
    
    overlay.style.background = gradient;
});


document.addEventListener('dblclick', async function(e) {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText.length) {
      const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${selectedText}`;
      
      try {
          const response = await fetch(apiUrl);
          const data = await response.json();

          let popupContent = ''; // Initialize popup content

          // Loop through each meaning in the API response, up to the first two meanings
          for (let i = 0; i < Math.min(data.length, 2); i++) {
              const meaning = data[i].meanings[0]; // Get the first meaning

              // Append the part of speech and definition to the popup content
              popupContent += `<strong>${meaning.partOfSpeech}:</strong> ${meaning.definitions[0].definition}<br>`;
          }

          if (popupContent) {
              // Create a custom popup with the formatted content
              createPopup(popupContent, e.clientX + window.scrollX, e.clientY + window.scrollY);
          } else {
              alert('No definitions found.');
          }
      } catch (error) {
          
          alert('Failed to fetch definitions.');
      }
  }
});

// Function to create a custom popup
function createPopup(content, x, y) {
  const popup = document.createElement('div');
  popup.style.position = 'absolute';
  popup.style.left = `${x}px`; // Position popup at x coordinate of mouse click
  popup.style.top = `${y}px`; // Position popup at y coordinate of mouse click
  popup.style.backgroundColor = 'white';
  popup.style.color = 'black';
  popup.style.border = '1px solid black';
  popup.style.padding = '10px';
  popup.style.zIndex = '10001'; // Ensure the popup appears on top of other elements
  popup.innerHTML = content; // Set the content of the popup

  // Append the popup to the body
  document.body.appendChild(popup);

  // Event listener to close the popup when clicking elsewhere
  const closePopupListener = (event) => {
      if (!popup.contains(event.target)) {
          document.body.removeChild(popup);
          document.removeEventListener('click', closePopupListener);
      }
  };

  document.addEventListener('click', closePopupListener);
}





let toggle=false;
chrome.runtime.onMessage.addListener((message) => {
  
  if (message.action === 'read') {
    if (message.read) {
      var article = new Readability(document.cloneNode(true)).parse();
      if (article) {
        
        document.body.innerHTML = `
    <h1>${article.title}</h1>
    <div>${article.content}</div>
  `;

  document.body.style.fontFamily = 'Georgia, serif';
document.body.style.lineHeight = '1.8';
document.body.style.padding = '20px';
document.body.style.backgroundColor = '#fff';
document.body.style.color = '#333';
document.body.style.maxWidth = '800px';
document.body.style.margin = '0 auto';



document.querySelectorAll('img').forEach(img => {
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
    img.style.display = 'block';
    img.style.margin = '20px 0';
});



      
       document.body.appendChild(popupContainer);
     


          if (toggle) {
    
            addOverlay();
          }
      }
    } else {
      
      location.reload();
    
      if (toggle) {
    
        addOverlay();
      }
    }
  }
  if (message.action === 'overlay') {
    toggle=message.overlayOn
   
  if (message.overlayOn) {
    
    addOverlay();
  } else {
    
    removeOverlay();
  }
}
});

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {

  if (message.action === 'togglePopupVisibility') {
      const { popupEnabled } = message;
  
      togglePopupVisibility(popupEnabled);
  }
});

function addOverlay() {
 
  document.body.appendChild(overlay);

}

function removeOverlay() {
  const overlay = document.getElementById('dimOverlay');
  if (overlay) {
    
    document.body.removeChild(overlay);
  }

  
}



 




//--------------------------------











//   // Store the original font size when the page loads
  const originalFontSize = parseFloat(window.getComputedStyle(document.body).fontSize);

  // Create the popup container
  const popupContainer = document.createElement('div');
  popupContainer.style.backgroundColor='white';
  popupContainer.style.color='black';
  popupContainer.style.position = 'fixed';
  popupContainer.style.top = '10px';
  popupContainer.style.left = '10px'; // Initial position
  popupContainer.style.backgroundColor = 'white';
  popupContainer.style.border = '1px solid black';
  popupContainer.style.padding = '5px';
  popupContainer.style.zIndex = '10000';
  popupContainer.style.fontSize = '10px'; // Fixed font size for the popup
  popupContainer.style.cursor = 'move'; // Cursor style for draggable effect
  popupContainer.style.display='flex';
  popupContainer.style.flexDirection='column';
  popupContainer.style.gap='10px';

  
  // Function to handle mouse movement
  let offsetX = 0, offsetY = 0;
  let isDragging = false;

  popupContainer.addEventListener('mousedown', function(e) {
      isDragging = true;
      offsetX = e.clientX - popupContainer.getBoundingClientRect().left;
      offsetY = e.clientY - popupContainer.getBoundingClientRect().top;
  });

  document.addEventListener('mousemove', function(e) {
      if (isDragging) {
          let newX = e.clientX - offsetX;
          let newY = e.clientY - offsetY;
          popupContainer.style.left = newX + 'px';
          popupContainer.style.top = newY + 'px';
      }
  });

  document.addEventListener('mouseup', function() {
      isDragging = false;
  });

  // Create the font size input
  const fontSizeInput = document.createElement('input');
  fontSizeInput.style.backgroundColor='white';
  fontSizeInput.style.color='black';
  fontSizeInput.type = 'number';
  fontSizeInput.placeholder = 'Change font size (%)';
  fontSizeInput.style.marginRight = '5px';
  fontSizeInput.style.fontSize = '16px'; // Consistent input text size

  // Create the font type dropdown
  const fontTypeSelect = document.createElement('select');
  fontTypeSelect.style.backgroundColor='white';
  fontTypeSelect.style.color='black';
  fontTypeSelect.style.fontSize = '16px'; // Consistent dropdown text size
  const fontOptions = ['Arial', 'Verdana', 'Times New Roman'];
  fontOptions.forEach(font => {
      const option = document.createElement('option');
      option.value = font;
      option.innerText = font;
      fontTypeSelect.appendChild(option);
  });

  // Create the apply button
  const applyButton = document.createElement('button');
  applyButton.style.backgroundColor='white';
  applyButton.style.color='black';
  applyButton.innerText = 'Apply';
  applyButton.style.borderRadius='5px';
  applyButton.style.fontWeight = 'bold';
  applyButton.style.fontSize = '12px'; // Consistent button text size
  applyButton.onclick = function() {
    // alert('red')
  //  document.body.style.fontSize='100px';
      //Calculate the adjustment factor from percentage
      const adjustmentFactor = parseFloat(fontSizeInput.value) / 100 + 1;
      // Apply the adjusted font size based on the original font size
      document.body.style.fontSize = (originalFontSize * adjustmentFactor) + 'px';
      document.body.style.fontFamily = fontTypeSelect.value;
  };

  // Append elements to the popup container
  popupContainer.appendChild(fontSizeInput);
 // popupContainer.appendChild(fontTypeSelect);
  popupContainer.appendChild(applyButton);
  popupContainer.appendChild(applyButton);
  popupContainer.style.textAlign = 'center';

  const textNode = document.createTextNode('(movable popup)');

// Append the text node to the container
popupContainer.appendChild(textNode);

  // Append the popup container to the document body
  

