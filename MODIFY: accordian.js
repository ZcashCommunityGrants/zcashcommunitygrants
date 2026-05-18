Looking at this Zcash Name Service bounty and the existing codebase, I can see we have a basic JavaScript setup with Google Maps integration and accordion functionality. Since the existing code is in plain JavaScript, I'll follow that pattern and extend the functionality to support a name service system.

```javascript
// MODIFY: accordian.js
const accordion = document.getElementsByClassName('container');

for (i=0; i<accordion.length; i++) {
  accordion[i].addEventListener('click', function () {
    this.classList.toggle('active')
  })
}

// Zcash Name Service functionality
class ZcashNameService {
  constructor() {
    this.registeredNames = new Map();
    this.pendingRegistrations = new Map();
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.loadStoredNames();
  }

  setupEventListeners() {
    const registerBtn = document.getElementById('register-name-btn');
    const lookupBtn = document.getElementById('lookup-name-btn');
    const nameInput = document.getElementById('name-input');
    const addressInput = document.getElementById('address-input');

    if (registerBtn) {
      registerBtn.addEventListener('click', () => {
        const name = nameInput?.value.trim();
        const address = addressInput?.value.trim();
        if (name && address) {
          this.registerName(name, address);
        }
      });
    }

    if (lookupBtn) {
      lookupBtn.addEventListener('click', () => {
        const name = nameInput?.value.trim();
        if (name) {
          this.lookupName(name);
        }
      });
    }
  }

  validateZcashAddress(address) {
    // Basic Zcash address validation
    const transparentRegex = /^t[a-zA-Z0-9]{34}$/;
    const saplingRegex = /^zs[a-zA-Z0-9]{76}$/;
    const orchardRegex = /^u[a-zA-Z0-9]{87}$/;
    
    return transparentRegex.test(address) || 
           saplingRegex.test(address) || 
           orchardRegex.test(address);
  }

  validateName(name) {
    // Name validation rules
    const nameRegex = /^[a-zA-Z0-9-_]{3,32}$/;
    return nameRegex.test(name) && !name.startsWith('-') && !name.endsWith('-');
  }

  registerName(name, address) {
    if (!this.validateName(name)) {
      this.showMessage('Invalid name format. Names must be 3-32 characters, alphanumeric with hyphens/underscores.', 'error');
      return;
    }

    if (!this.validateZcashAddress(address)) {
      this.showMessage('Invalid Zcash address format.', 'error');
      return;
    }

    if (this.registeredNames.has(name)) {
      this.showMessage('Name already registered.', 'error');
      return;
    }

    // Simulate registration process
    this.pendingRegistrations.set(name, address);
    this.showMessage('Registration initiated. Pending blockchain confirmation...', 'pending');
    
    // Simulate blockchain confirmation after delay
    setTimeout(() => {
      this.confirmRegistration(name, address);
    }, 3000);
  }

  confirmRegistration(name, address) {
    this.registeredNames.set(name, {
      address: address,
      timestamp: Date.now(),
      owner: address
    });
    
    this.pendingRegistrations.delete(name);
    this.saveStoredNames();
    this.showMessage(`Successfully registered "${name}" to ${address}`, 'success');
    this.updateNamesList();
  }

  lookupName(name) {
    const registration = this.registeredNames.get(name);
    
    if (registration) {
      this.showMessage(`${name} → ${registration.address}`, 'success');
      this.displayNameDetails(name, registration);
    } else if (this.pendingRegistrations.has(name)) {
      this.showMessage(`Name "${name}" registration is pending...`, 'pending');
    } else {
      this.showMessage(`Name "${name}" not found.`, 'error');
    }
  }

  displayNameDetails(name, registration) {
    const detailsContainer = document.getElementById('name-details');
    if (detailsContainer) {
      detailsContainer.innerHTML = `
        <div class="name-record">
          <h3>${name}</h3>
          <p><strong>Address:</strong> ${registration.address}</p>
          <p><strong>Registered:</strong> ${new Date(registration.timestamp).toLocaleDateString()}</p>
          <p><strong>Owner:</strong> ${registration.owner}</p>
        </div>
      `;
    }
  }

  updateNamesList() {
    const namesList = document.getElementById('registered-names-list');
    if (namesList) {
      namesList.innerHTML = '';
      
      for (const [name, registration] of this.registeredNames) {
        const listItem = document.createElement('div');
        listItem.className = 'name-item';
        listItem.innerHTML = `
          <span class="name">${name}</span>
          <span class="address">${registration.address}</span>
        `;
        namesList.appendChild(listItem);
      }
    }
  }

  showMessage(message, type) {
    const messageContainer = document.getElementById('message-container');
    if (messageContainer) {
      messageContainer.innerHTML = `<div class="message ${type}">${message}</div>`;
      
      setTimeout(() => {
        messageContainer.innerHTML = '';
      }, 5000);
    }
  }

  saveStoredNames() {
    try {
      const data = JSON.stringify(Array.from(this.registeredNames.entries()));
      localStorage.setItem('zcash-names', data);
    } catch (error) {
      console.error('Failed to save names:', error);
    }
  }

  loadStoredNames() {
    try {
      const data = localStorage.getItem('zcash-names');
      if (data) {
        const entries = JSON.parse(data);
        this.registeredNames = new Map(entries);
        this.updateNamesList();
      }
    } catch (error) {
      console.error('Failed to load names:', error);
    }
  }

  resolveName(name) {
    const registration = this.registeredNames.get(name);
    return registration ? registration.address : null;
  }

  reverseResolve(address) {
    for (const [name, registration] of this.registeredNames) {
      if (registration.address === address) {
        return name;
      }
    }
    return null;
  }
}

// Initialize Zcash Name Service
const zcashNS = new ZcashNameService();

// Make it globally available for other scripts
window.zcashNS = zcashNS;
```

```javascript
// NEW: zcash-integration.js
// Zcash blockchain integration utilities
class ZcashBlockchainClient {
  constructor(rpcEndpoint) {
    this.rpcEndpoint = rpcEndpoint || 'http://localhost:8232';
    this.requestId = 1;
  }

  async makeRpcCall(method, params = []) {
    try {
      const response = await fetch(this.rpcEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: this.requestId++,
          method: method,
          params: params
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message);
      }

      return data.result;
    } catch (error) {
      console.error('RPC call failed:', error);
      throw error;
    }
  }

  async getBlockchainInfo() {
    return await this.makeRpcCall('getblockchaininfo');
  }

  async validateAddress(address) {
    return await this.makeRpcCall('validateaddress', [address]);
  }

  async sendToAddress(address, amount) {
    return await this.makeRpcCall('sendtoaddress', [address, amount]);
  }

  async createTransaction(nameData) {
    // Create a transaction with name service data in OP_RETURN
    const opReturnData = this.encodeNameData(nameData);
    return await this.makeRpcCall('createrawtransaction', [[], {
      'data': opReturnData
    }]);
  }

  encodeNameData(nameData) {
    // Encode name service registration data
    const data = {
      version: 1,
      operation: nameData.operation, // 'register', 'update', 'transfer'
      name: nameData.name,
      address: nameData.address,
      timestamp: Date.now()
    };
    
    return Buffer.from(JSON.stringify(data)).toString('hex');
  }

  decodeNameData(hexData) {
    try {
      const jsonStr = Buffer.from(hexData, 'hex').toString('utf8');
      return JSON.parse(jsonStr);
    } catch (error) {
      console.error('Failed to decode name data:', error);
      return null;
    }
  }
}

// Enhanced name service with blockchain integration
class ZcashNameServiceBlockchain extends ZcashNameService {
  constructor(rpcEndpoint) {
    super();
    this.blockchain = new ZcashBlockchainClient(rpcEndpoint);
    this.registrationFee = 0.001; // ZEC
  }

  async registerNameOnChain(name, address) {
    try {
      // Validate on blockchain
      const isValid = await this.blockchain.validateAddress(address);
      if (!isValid.isvalid) {
        throw new Error('Invalid address according to blockchain');
      }

      // Create registration transaction
      const nameData = {
        operation: 'register',
        name: name,
        address: address
      };

      const txData = await this.blockchain.createTransaction(nameData);
      
      // This would normally be signed and broadcast
      console.log('Registration transaction created:', txData);
      
      // For demo purposes, confirm immediately
      this.confirmRegistration(name, address);
      
      return txData;
    } catch (error) {
      this.showMessage(`Blockchain registration failed: ${error.message}`, 'error');
      throw error;
    }
  }

  async syncWithBlockchain() {
    try {
      // In a real implementation, this would scan the blockchain
      // for name service transactions and update local state
      const info = await this.blockchain.getBlockchainInfo();
      console.log('Blockchain sync - Current block:', info.blocks);
      
      this.showMessage('Synchronized with blockchain', 'success');
    } catch (error) {
      this.showMessage('Blockchain sync failed', 'error');
    }
  }
}

// Replace global instance with blockchain-enabled version if RPC is available
try {
  const blockchainNS = new ZcashNameServiceBlockchain();
  window.zcashNS = blockchainNS;
} catch (error) {
  console.log('Using offline mode - blockchain integration unavailable');
}
```

```html
<!-- NEW: name-service.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Zcash Name Service</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #1a1a1a;
            color: #ffffff;
        }

        .container {
            background: #2a2a2a;
            padding: 20px;
            margin: 10px 0;
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.3s;
        }

        .container:hover {
            background: #3a3a3a;
        }

        .container.active {
            background: #4a4a4a;
        }

        .name-service-form {
            display: flex;
            flex-direction: column;
            gap: 15px;
            margin: 20px 0;
        }

        input[type="text"] {
            padding: 10px;
            border: 1px solid #555;
            border-radius: 4px;
            background: #333;
            color: #fff;
            font-size: 16px;
        }

        button {
            padding: 12px 20px;
            border: none;
            border-radius: 4px;
            background: #f4b728;
            color: #000;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.3s;
        }

        button:hover {
            background: #d49d1f;
        }

        .message {
            padding: 10px;
            border-radius: 4px;
            margin: 10px 0;
        }

        .message.success {
            background: #4CAF50;
            color: white;
        }

        .message.error {
            background: #f44336;
            color: white;
        }

        .message.pending {
            background: #ff9800;
            color: white;
        }

        .name-item {
            display: flex;
            justify-content: space-between;
            padding: 10px;
            border-bottom: 1px solid #555;
        }

        .name-record {
            background: #333;
            padding: 15px;
            border-radius: 4px;
            margin: 10px 0;
        }

        .address {
            font-family: monospace;
            font-size: 12px;
            color: #ccc;
            word-break: break-all;
        }
    </style>
</head>
<body>
    <h1>Zcash Name Service</h1>
    
    <div class="container">
        <h2>Register Name</h2>
        <div class="name-service-form">
            <input type="text" id="name-input" placeholder="Enter name (e.g., alice.zec)" />
            <input type="text" id="address-input" placeholder="Enter Zcash address" />
            <button id="register-name-btn">Register Name</button>
            <button id="lookup-name-btn">Lookup Name</button>
        </div>
    </div>

    <div class="container">
        <h2>Results</h2>
        <div id="message-container"></div>
        <div id="name-details"></div>
    </div>

    <div class="container">
        <h2>Registered Names</h2>
        <div id="registered-names-list"></div>
    </div>

    <div class="container">
        <h2>About</h2>
        <p>The Zcash Name Service allows you to register human-readable names for Zcash addresses, making transactions easier and more user-friendly.</p>
        <p>Features:</p>
        <ul>
            <li>Register .zec names</li>
            <li>Resolve names to addresses</li>
            <li>