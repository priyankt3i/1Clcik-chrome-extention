const data = {
    field1: document.querySelector('#displayfield-1119-inputEl').value, //Innotas ID
    field2: document.querySelector('#displayfield-1120-inputEl').value, //Project Number
    field3: document.querySelector('#displayfield-1121-inputEl').value, //Title
    field4: document.querySelector('#displayfield-1122-inputEl').value //Project Manager (Owner)
  };
  
  chrome.storage.local.set({ formData: data });
  