import { ref, readonly } from 'vue'

const account = ref<string | null>(null)
const connecting = ref(false)

const setAccount = (acc: string | null) => {
  account.value = acc
  if (acc) {
    localStorage.setItem('wasConnected', 'true')
  } else {
    localStorage.setItem('wasConnected', 'false')
  }
}

const connectWallet = async () => {
  const eth = (window as any).ethereum
  if (!eth) {
    alert('MetaMask is not installed.')
    return
  }
  connecting.value = true
  try {
    const accounts = await eth.request({ method: 'eth_requestAccounts' })
    setAccount(accounts[0])
  } catch (err) {
    console.error(err)
    alert('Failed to connect MetaMask')
  } finally {
    connecting.value = false
  }
}

const disconnectWallet = () => {
  setAccount(null)
}

const checkConnection = async () => {
  const wasConnected = localStorage.getItem('wasConnected')
  if (wasConnected === 'false') return // User manually disconnected, don't auto-reconnect

  const eth = (window as any).ethereum
  if (eth) {
    try {
      const accs = await eth.request({ method: 'eth_accounts' })
      if (accs.length > 0) {
        setAccount(accs[0])
      } else {
        setAccount(null)
      }
    } catch (err) {
      console.error('Error checking connections:', err)
    }
  }
}

// Setup global listener for changes
if (typeof window !== 'undefined' && (window as any).ethereum) {
  (window as any).ethereum.on('accountsChanged', (accs: string[]) => {
    setAccount(accs[0] || null)
  })
}

export const useWallet = () => {
  return {
    account: readonly(account),
    connecting: readonly(connecting),
    connectWallet,
    disconnectWallet,
    checkConnection,
    setAccount,
  }
}
