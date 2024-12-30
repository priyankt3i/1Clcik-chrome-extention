document.addEventListener('DOMContentLoaded', () => {
    console.log('Popup DOM fully loaded and parsed');

    // Store sample formData for testing
    chrome.storage.local.set({
        formData: {
            field1: 'Sample Data 1',
            field2: 'Sample Data 2',
            field3: 'Sample Data 3',
            field4: 'Sample Data 4'
        }
    }, () => {
        console.log('Sample formData stored');
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
                            document.querySelector('#targetField1').value = formData.field1;
                            document.querySelector('#targetField2').value = formData.field2;
                            document.querySelector('#targetField3').value = formData.field3;
                            document.querySelector('#targetField4').value = formData.field4;
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