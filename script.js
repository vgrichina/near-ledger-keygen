import 'regenerator-runtime'

import { createLedgerU2FClient } from './ledger.js'
import { encode } from 'bs58'

async function generate() {
  try {
    const numKeys = document.querySelector('#numKeys').value;
    const client = await createLedgerU2FClient()
    const outputTable = document.querySelector('#output-table')
    outputTable.innerHTML = ''
    for (let i = 0; i < numKeys; i++) {
      const hdKey = `44'/397'/0'/0'/${i + 2}'`;
      const publicKey= await client.getPublicKey(hdKey)
      outputTable.innerHTML +=
        `<tr><td>${hdKey}<td>${Buffer.from(publicKey).toString('hex')}<td>${encode(Buffer.from(publicKey))}</tr>`

    }

    //window.client = client
  } catch(e) {
    console.error(e);
    alert('Error when connecting to Ledger: ' + e);
  }
}

window.generate = generate