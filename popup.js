// // Get DOM elements
const toggleButton = document.getElementById('toggleButton');

//set spotlight radius button

toggleButton.addEventListener('click', function() {
 
 
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'togglePopupVisibility',popupEnabled:true });
  });
});






const darkModeSwitch = document.getElementById('darkModeSwitch');
let overlayOn = false;







function updateButton1(){

chrome.storage.sync.get('overlayState', function(data) {
    if (data.overlayState !== undefined) {
        overlayOn = data.overlayState;
        
        darkModeSwitch.checked=overlayOn;

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.tabs.sendMessage(tabs[0].id, { action: 'overlay',overlayOn });
        });
        
    }
    else{
      
     
    overlayOn = false;
    
    darkModeSwitch.checked=overlayOn;

      
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'overlay',overlayOn });
      });
    }
});
  

}


darkModeSwitch.addEventListener('change', function() {
  
    if (this.checked) {
     
      overlayOn=true;
      
      chrome.storage.sync.set({ 'overlayState': overlayOn });
      
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'overlay',overlayOn });
  });
    } else {
      
      overlayOn=false;
      
      chrome.storage.sync.set({ 'overlayState': overlayOn });
       
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'overlay',overlayOn });
  });
    }


});

updateButton1();



//---------------------------------------------------
const readibility = document.getElementById('readibility');
let read = false;







function readbutton(){

chrome.storage.sync.get('read', function(data) {
    if (data.read !== undefined) {
      read = data.read;
       
        readibility.checked=read;

        // chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        //   chrome.tabs.sendMessage(tabs[0].id, { action: 'read',read });
        // });
        
    }
    else{
     
      read = false;
      readibility.checked=read;

    }
});
  

}


readibility.addEventListener('change', function() {
    if (this.checked) {
      read=true;
      chrome.storage.sync.set({ 'read': read });
      
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'read',read });
  });
    } else {
      read=false;
      chrome.storage.sync.set({ 'read': read });
       
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'read',read });
  });
    }


});

readbutton();


