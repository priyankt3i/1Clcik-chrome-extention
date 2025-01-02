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
                            // Function to set field value
                            const setFieldValue = () => {
                                const inputElement = document.querySelector('#input-text');
                                if (inputElement) {
                                    inputElement.value = formData.field1 || '';
                                    console.log('Input value set to:', formData.field1);
                                } else {
                                    console.error('Input element not found');
                                }
                            };

                            // Wait for the page to load
                            if (document.readyState === 'loading') {
                                document.addEventListener('DOMContentLoaded', setFieldValue);
                            } else {
                                setFieldValue();
                            }
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
