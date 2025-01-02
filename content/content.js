console.log('Content script loaded');

// Function to check and capture data
const captureFields = () => {
    const field1Element = document.querySelector('#displayfield-1119-inputEl');
    const field2Element = document.querySelector('#displayfield-1120-inputEl');
    const field3Element = document.querySelector('#displayfield-1121-inputEl');
    const field4Element = document.querySelector('#displayfield-1122-inputEl');

    console.log('Checking for elements...');
    console.log('Elements:', field1Element, field2Element, field3Element, field4Element);

    if (field1Element && field2Element && field3Element && field4Element) {
        console.log('All elements found. Capturing data...');
        const data = {
            field1: field1Element.value || 'N/A', // Innotas ID
            field2: field2Element.value || 'N/A', // Project Number
            field3: field3Element.value || 'N/A', // Title
            field4: field4Element.value || 'N/A'  // Project Manager (Owner)
        };

        console.log('Captured data:', data);

        chrome.storage.local.set({ formData: data }, () => {
            console.log('Form data stored:', data);
        });

        return true; // Stop observing once all elements are found and data is captured
    }

    return false; // Keep waiting for elements
};

// Monitor DOM changes to detect dynamically loaded content
const observer = new MutationObserver(() => {
    if (captureFields()) {
        observer.disconnect(); // Stop observing when data is captured
    }
});

// Start observing DOM changes
observer.observe(document.body, { childList: true, subtree: true });

console.log('Observer set up. Monitoring DOM for changes...');
