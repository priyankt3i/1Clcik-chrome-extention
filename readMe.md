# 1 Click Chrome Extension - Kumar Priyank

## Overview
The **1 Click** Chrome extension is designed to streamline the process of capturing form data from a specific page and transferring it to another page with just a click of a button. The extension works by:
- Extracting form data from one page (using content scripts).
- Storing the data in Chrome's local storage.
- Pasting the data into a specific field of another page using the extension popup.

## Features
- Automatically captures data from form fields on a specific page.
- Stores the captured data in Chrome's local storage.
- Opens a new tab with a target page and pastes the captured data into the corresponding input fields.
- Simple interface with a button to trigger the data transfer.

---

## Installation

1. Clone or download this repository to your local machine.
2. Open `chrome://extensions/` in your Chrome browser.
3. Enable **Developer Mode** (toggle in the top right).
4. Click **Load unpacked** and select the folder where you saved the extension.

---

## Files Overview

- **`manifest.json`**: Defines the extension's metadata, permissions, and settings for background scripts and content scripts.
- **`content.js`**: A content script that runs on the target page and extracts form data.
- **`popup.js`**: The popup script that manages the interface, handles the button click, and pastes the captured data into a new tab.
- **`popup.html`**: The HTML file that defines the popup interface with a button for initiating the data transfer.

---

## Permissions

The extension requires the following permissions to function:
- **`activeTab`**: To interact with the currently active tab.
- **`storage`**: To store and retrieve form data.
- **`scripting`**: To inject scripts into newly created tabs.
- **`host_permissions`**: To allow access to specific websites (e.g., `https://plymouth.ppmpro.com/*` and `https://practice.expandtesting.com/*`).

---

## Usage

1. **Capture Data**:
   - The extension will automatically extract form data from the page matching the URL pattern (`https://plymouth.ppmpro.com/*`).
   - Data is stored in Chrome's local storage after being captured.

2. **Transfer Data**:
   - In the extension popup, click the "Transfer Data" button.
   - This will open a new tab with the target URL (`https://practice.expandtesting.com/inputs`), and the captured data will be pasted into the corresponding input fields (e.g., `#input-text`).

---

## Development

To contribute or modify the extension:
1. Clone the repository.
2. Modify the relevant files (`content.js`, `popup.js`, etc.) to suit your needs.
3. Reload the extension from `chrome://extensions/` after making changes.

---

## Troubleshooting

- **The data isn't being pasted**: Make sure the target input fields exist and the selector (`#input-text`) is correct. Adjust the `popup.js` code to target the appropriate element.
- **Form data isn't being captured**: Check the content script (`content.js`) and ensure the page you're targeting matches the URL pattern. Ensure the form fields have correct IDs.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Contact

If you have any issues or suggestions, feel free to open an issue or contact the project maintainers.

---

### Enjoy using **1 Click**! 🎉

---

Let me know if you'd like any changes or additions!