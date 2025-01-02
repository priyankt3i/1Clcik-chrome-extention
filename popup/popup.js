document.addEventListener('DOMContentLoaded', () => {
    console.log('Popup DOM fully loaded and parsed');

    // Retrieve and log formData
    chrome.storage.local.get('formData', (data) => {
        if (chrome.runtime.lastError) {
            console.error('Error retrieving formData:', chrome.runtime.lastError);
            return;
        }
        if (data.formData) {
            console.log('Retrieved formData:', data.formData);
        } else {
            console.warn('No formData found in storage');
        }
    });

    document.getElementById('transferData').addEventListener('click', () => {
        console.log('Button clicked');
        chrome.storage.local.get('formData', (data) => {
            if (chrome.runtime.lastError) {
                console.error('Error retrieving formData:', chrome.runtime.lastError);
                return;
            }
            if (data.formData) {
                chrome.tabs.create({ url: 'https://practice.expandtesting.com/inputs' }, (newTab) => {
                    if (chrome.runtime.lastError) {
                        console.error('Error creating new tab:', chrome.runtime.lastError);
                        return;
                    }
                    chrome.scripting.executeScript({
                        target: { tabId: newTab.id },
                        func: (formData) => {
                            document.querySelector('#input-text').value = formData.field1;
                            // Add a delay to keep the console open
                            setTimeout(() => {
                                console.log('Delay to keep the console open');
                            }, 5000);
                        },
                        args: [data.formData]
                    }, () => {
                        if (chrome.runtime.lastError) {
                            console.error('Error executing script:', chrome.runtime.lastError);
                        } else {
                            console.log('Script executed successfully');
                        }
                    });
                });
            } else {
                console.warn('No formData found in storage');
            }
        });
    });
});