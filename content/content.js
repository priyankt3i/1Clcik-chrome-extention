console.log('Content script loaded');

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event fired');

    const observer = new MutationObserver(() => {
        const field1Element = document.querySelector('#displayfield-1119-inputEl');
        const field2Element = document.querySelector('#displayfield-1120-inputEl');
        const field3Element = document.querySelector('#displayfield-1121-inputEl');
        const field4Element = document.querySelector('#displayfield-1122-inputEl');

        console.log('Elements:', field1Element, field2Element, field3Element, field4Element);

        if (field1Element && field2Element && field3Element && field4Element) {
            observer.disconnect(); // Stop observing once all elements are found.

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
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
});
