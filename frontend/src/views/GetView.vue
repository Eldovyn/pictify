<template>
  <div class="space-y-[40px] animate-fade-up max-w-[1180px] mx-auto py-[24px]">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-[24px] pb-[24px] border-b border-design-border">
      <div>
        <h1 class="text-[24px] sm:text-[32px] font-[700] text-design-white m-0 tracking-tight">
          My Gallery
        </h1>
        <p class="text-design-neutral text-[16px] m-0 mt-[8px]">Explore and manage digital art items owned by your connected address.</p>
      </div>
      <button 
        v-if="account" 
        @click="getAllNFTs" 
        :disabled="loading" 
        class="min-h-[44px] px-[24px] bg-transparent hover:bg-design-ghostHover active:bg-design-ghostHover border-2 border-design-slate text-design-white rounded-[8px] text-[14px] font-[500] transition-colors hover:border-design-white disabled:opacity-50 inline-flex items-center gap-[8px]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-[18px] h-[18px]" :class="{'animate-spin': loading}">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
        {{ loading ? 'Syncing...' : 'Refresh Gallery' }}
      </button>
    </div>

    <!-- Disconnected Alert -->
    <div v-if="!account" class="p-[32px] bg-design-base border border-design-border rounded-[12px] flex flex-col items-center gap-[20px] text-center max-w-[600px] mx-auto">
      <div class="text-design-cyan">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[40px] h-[40px]">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>
      </div>
      <div>
        <h3 class="font-[600] text-[18px] text-design-white m-0 mb-[8px]">Wallet Disconnected</h3>
        <p class="text-[14px] text-design-neutral m-0">Connect your Web3 wallet to retrieve owned items from Ethereum.</p>
      </div>
      <button 
        @click="connectWallet" 
        :disabled="connecting"
        class="mt-[8px] min-h-[44px] px-[32px] bg-design-cyan hover:bg-design-cyanHover active:bg-design-cyan text-white text-[14px] font-[500] rounded-[8px] transition-colors flex items-center gap-[8px]"
      >
        {{ connecting ? 'Connecting...' : 'Connect Wallet' }}
      </button>
    </div>

    <div v-else>
      <!-- Error Message -->
      <div v-if="errorMsg" class="p-[16px] bg-design-error/10 border border-design-error/50 text-design-error rounded-[8px] text-[14px] flex items-start gap-[12px] mb-[32px]">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-[20px] h-[20px] flex-shrink-0">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
        </svg>
        <span class="mt-[2px] font-[500]">{{ errorMsg }}</span>
      </div>

      <!-- Loading Skeletons -->
      <div v-if="loading && nfts.length === 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[16px]">
        <div v-for="i in 5" :key="i" class="bg-design-card border border-design-border rounded-[12px] overflow-hidden animate-pulse">
          <div class="w-full h-[200px] bg-design-input"></div>
          <div class="p-[20px] space-y-[16px]">
            <div class="h-[18px] bg-design-input rounded-[4px] w-1/2"></div>
            <div class="space-y-[8px]">
              <div class="h-[14px] bg-design-input rounded-[4px] w-full"></div>
              <div class="h-[14px] bg-design-input rounded-[4px] w-4/5"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- NFT Grid -->
      <div v-else-if="nfts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[16px]">
        <div 
          v-for="(nft, index) in nfts" 
          :key="index" 
          class="group bg-design-card border border-design-border hover:border-design-magenta hover:bg-design-cardHover rounded-[12px] overflow-hidden transition-all flex flex-col shadow-none"
        >
          <!-- Image frame -->
          <div class="relative h-[200px] bg-design-base flex items-center justify-center border-b border-design-border overflow-hidden">
            <img 
              :src="nft.image" 
              :alt="nft.name" 
              class="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500 ease-in-out" 
              @error="e => e.target.style.display='none'" 
            />
            <span class="absolute top-[12px] left-[12px] px-[12px] py-[4px] bg-design-base/80 backdrop-blur-sm border border-design-border rounded-[6px] text-[12px] font-[500] font-mono text-design-white">
              ID: #{{ nft.tokenId }}
            </span>
          </div>

          <!-- Description -->
          <div class="p-[20px] flex-grow flex flex-col justify-between gap-[20px]">
            <div>
              <h3 class="font-[600] text-[18px] text-design-white group-hover:text-design-magenta transition-colors m-0 mb-[8px]">
                {{ nft.name || 'Unnamed' }}
              </h3>
              <p class="text-[14px] text-design-neutral leading-[1.5] line-clamp-3 m-0">
                {{ nft.description || 'No description provided' }}
              </p>
            </div>
            
            <a 
              v-if="nft.ipfsUrl" 
              :href="nft.ipfsUrl" 
              target="_blank" 
              class="inline-flex items-center gap-[6px] text-[14px] font-[500] text-design-cyan no-underline hover:text-design-cyanHover transition-all mt-[auto]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-[16px] h-[16px]">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
              </svg>
              View IPFS Metadata
            </a>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="!loading" class="text-center py-[80px] px-[24px] bg-design-base border border-dashed border-design-border rounded-[12px] max-w-[600px] mx-auto flex flex-col items-center gap-[24px]">
        <div class="text-design-cyan">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[48px] h-[48px]">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.008 1.24l.885 1.77a2.25 2.25 0 0 0 2.007 1.24h1.98a2.25 2.25 0 0 0 2.007-1.24l.885-1.77a2.25 2.25 0 0 1 2.007-1.24h3.86m-18 0h18a2.25 2.25 0 0 1 2.25 2.25v4.25A2.25 2.25 0 0 1 18.75 21H5.25A2.25 2.25 0 0 1 3 18.75V15.75a2.25 2.25 0 0 1 2.25-2.25ZM2.25 13.5v-3a2.25 2.25 0 0 1 2.25-2.25h15A2.25 2.25 0 0 1 21 10.5v3m-18 0h18M12 7.5v-3m-3 3h6" />
          </svg>
        </div>
        <div>
          <h3 class="font-[600] text-[20px] text-design-white m-0 mb-[8px]">No Collectibles Found</h3>
          <p class="text-[14px] text-design-neutral m-0 max-w-[400px]">This address does not own any Pictify tokens on the current network yet.</p>
        </div>
        <RouterLink to="/upload" class="mt-[16px] min-h-[44px] px-[32px] bg-design-cyan hover:bg-design-cyanHover active:bg-design-cyan text-white font-[500] text-[14px] rounded-[8px] transition-colors no-underline inline-flex items-center justify-center">
          Mint Your First NFT
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { RouterLink } from 'vue-router';
import Web3 from 'web3';
import abi from '@/libs/MyNFT.json';
import { useWallet } from '@/libs/wallet';

const { account, connecting, connectWallet } = useWallet();
const nfts = ref([]);
const loading = ref(false);
const errorMsg = ref('');

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

const fetchMetadata = async (uri) => {
  try {
    const res = await fetch(uri);
    const data = await res.json();
    if (data.image?.startsWith('ipfs://')) {
      data.image = data.image.replace(/^ipfs:\/\//, 'https://gateway.pinata.cloud/ipfs/');
    }
    return data;
  } catch { return {}; }
};

const getAllNFTs = async () => {
  if (!account.value) return;
  loading.value = true;
  errorMsg.value = '';
  nfts.value = [];
  
  try {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);
    const incoming = await contract.getPastEvents('Transfer', { filter: { to: account.value }, fromBlock: 0, toBlock: 'latest' });
    const outgoing = await contract.getPastEvents('Transfer', { filter: { from: account.value }, fromBlock: 0, toBlock: 'latest' });
    
    const receivedIds = incoming.map(e => e.returnValues.tokenId);
    const sentIds = outgoing.map(e => e.returnValues.tokenId);
    const ownedIds = receivedIds.filter(id => !sentIds.includes(id));
    
    for (const tokenId of ownedIds) {
      const tokenURI = await contract.methods.tokenURI(tokenId).call();
      const metadata = await fetchMetadata(tokenURI);
      nfts.value.push({ tokenId, ipfsUrl: tokenURI, ...metadata });
    }
  } catch (err) {
    console.error(err);
    errorMsg.value = 'Failed to load NFTs from network.';
  } finally {
    loading.value = false;
  }
};

// Sync on wallet status change
watch(account, (newVal) => {
  if (newVal) {
    getAllNFTs();
  } else {
    nfts.value = [];
  }
});

onMounted(() => {
  if (account.value) {
    getAllNFTs();
  }
});
</script>