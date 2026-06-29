<template>
  <div class="max-w-[800px] mx-auto py-[24px] animate-fade-up">
    
    <div class="bg-design-card border border-design-border rounded-[12px] p-[32px] sm:p-[48px] shadow-none">
      <div class="mb-[40px]">
        <h1 class="text-[24px] sm:text-[32px] font-[700] text-design-white m-0 mb-[12px] tracking-tight">
          Mint New NFT
        </h1>
        <p class="text-[16px] text-design-neutral m-0 leading-[1.5]">
          Create your digital collectible by pinning metadata to IPFS and committing it to the blockchain.
        </p>
      </div>

      <!-- Disconnected Alert -->
      <div v-if="!account" class="p-[32px] bg-design-base border border-design-border rounded-[12px] flex flex-col items-center gap-[20px] text-center">
        <div class="text-design-cyan">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[40px] h-[40px]">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
          </svg>
        </div>
        <div>
          <h3 class="font-[600] text-[18px] text-design-white m-0 mb-[8px]">Wallet Disconnected</h3>
          <p class="text-[14px] text-design-neutral m-0">Please connect MetaMask to mint NFTs on the Sepolia network.</p>
        </div>
        <button 
          @click="connectWallet" 
          :disabled="connecting"
          class="mt-[8px] min-h-[44px] px-[32px] bg-design-cyan hover:bg-design-cyanHover active:bg-design-cyan text-white text-[14px] font-[500] rounded-[8px] transition-colors flex items-center gap-[8px]"
        >
          {{ connecting ? 'Connecting...' : 'Connect Wallet' }}
        </button>
      </div>

      <div v-else class="space-y-[40px]">
        <!-- Image Upload Area -->
        <div>
          <label class="block text-[14px] font-[500] text-design-neutral mb-[8px]">Artwork Image</label>
          <div 
            class="border border-dashed rounded-[6px] p-[40px] text-center cursor-pointer transition-colors duration-200" 
            :class="previewUrl ? 'bg-design-base border-design-cyan' : 'bg-design-input border-design-border hover:border-design-cyan hover:bg-design-base'"
            @click="!previewUrl && fileInput.click()"
          >
            <div v-if="!previewUrl" class="space-y-[16px]">
              <input ref="fileInput" type="file" accept="image/*" @change="onFileChange" class="hidden" />
              <div class="mx-auto w-[40px] h-[40px] text-design-cyan flex items-center justify-center bg-design-ghostHover rounded-[50%]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-[20px] h-[20px]">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 7.5 7.5M12 3v13.5" />
                </svg>
              </div>
              <div>
                <p class="text-[16px] font-[500] text-design-cyan m-0">Click to select an image</p>
                <p class="text-[14px] text-design-slate m-0 mt-[4px]">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
            <div v-else class="flex flex-col items-center gap-[20px]">
              <div class="relative group rounded-[6px] overflow-hidden border border-design-border max-h-[300px]">
                <img :src="previewUrl" class="max-h-[300px] object-contain rounded-[6px] bg-design-base" />
                <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <p class="text-[14px] font-[500] text-design-white">Selected File</p>
                </div>
              </div>
              <button 
                @click.stop="removeFile" 
                class="min-h-[36px] px-[16px] bg-transparent border border-design-slate text-design-neutral hover:bg-design-ghostHover hover:text-design-white hover:border-design-white rounded-[8px] text-[14px] font-[500] transition-colors"
              >
                Remove Image
              </button>
            </div>
          </div>
        </div>

        <!-- Details Form -->
        <div class="space-y-[24px]">
          <div>
            <label class="block text-[14px] font-[500] text-design-neutral mb-[8px]">NFT Name</label>
            <input 
              v-model="nftName" 
              type="text" 
              class="w-full bg-design-input text-design-white border border-design-border focus:border-design-cyan focus:outline-none rounded-[6px] h-[44px] px-[16px] placeholder-design-slate transition-all shadow-none focus:shadow-design-input-focus text-[16px]" 
              placeholder="e.g. Neon Horizon" 
            />
          </div>
          
          <div>
            <label class="block text-[14px] font-[500] text-design-neutral mb-[8px]">Description</label>
            <textarea 
              v-model="nftDescription" 
              rows="4" 
              class="w-full bg-design-input text-design-white border border-design-border focus:border-design-cyan focus:outline-none rounded-[6px] min-h-[120px] px-[16px] py-[12px] placeholder-design-slate transition-all shadow-none focus:shadow-design-input-focus resize-y text-[16px]" 
              placeholder="Describe the style, story, or utility of this artwork..."
            ></textarea>
          </div>
        </div>

        <!-- Action & Loading Stepper -->
        <div class="pt-[32px] border-t border-design-border space-y-[24px]">
          <!-- Mint Stepper Indicator -->
          <div v-if="minting" class="p-[24px] bg-design-base border border-design-border rounded-[12px] space-y-[24px]">
            <p class="text-[16px] font-[500] text-design-cyan m-0 flex items-center justify-center gap-[12px]">
              <svg class="animate-spin h-[20px] w-[20px] text-design-cyan" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ statusText }}
            </p>
            
            <!-- Interactive visual steps -->
            <div class="flex items-center justify-between text-[14px] text-design-slate pt-[24px] border-t border-design-border">
              <div class="flex items-center gap-[8px]" :class="{'text-design-cyan font-[500]': currentStep === 1, 'text-design-lime font-[500]': currentStep > 1}">
                <span class="w-[24px] h-[24px] rounded-full border-2 border-current flex items-center justify-center text-[12px]">
                  {{ currentStep > 1 ? '✓' : '1' }}
                </span>
                <span class="hidden sm:inline">Upload Image</span>
              </div>
              <div class="h-[2px] flex-grow bg-design-border mx-[16px]"></div>
              <div class="flex items-center gap-[8px]" :class="{'text-design-cyan font-[500]': currentStep === 2, 'text-design-lime font-[500]': currentStep > 2, 'opacity-50': currentStep < 2}">
                <span class="w-[24px] h-[24px] rounded-full border-2 border-current flex items-center justify-center text-[12px]">
                  {{ currentStep > 2 ? '✓' : '2' }}
                </span>
                <span class="hidden sm:inline">Pin Metadata</span>
              </div>
              <div class="h-[2px] flex-grow bg-design-border mx-[16px]"></div>
              <div class="flex items-center gap-[8px]" :class="{'text-design-cyan font-[500]': currentStep === 3, 'opacity-50': currentStep < 3}">
                <span class="w-[24px] h-[24px] rounded-full border-2 border-current flex items-center justify-center text-[12px]">3</span>
                <span class="hidden sm:inline">Blockchain Mint</span>
              </div>
            </div>
          </div>

          <button 
            v-else
            @click="createNFT" 
            :disabled="!canMint || minting"
            class="w-full min-h-[44px] bg-design-cyan hover:bg-design-cyanHover active:bg-design-cyan text-white font-[500] text-[16px] rounded-[8px] transition-colors disabled:bg-design-slate disabled:text-design-neutral disabled:cursor-not-allowed"
          >
            Mint NFT Item
          </button>
        </div>

        <!-- Success Card -->
        <div v-if="successMsg" class="p-[24px] bg-design-base border border-design-lime/50 rounded-[12px] space-y-[20px] animate-fade-up">
          <div class="flex items-center gap-[16px]">
            <div class="w-[40px] h-[40px] rounded-full bg-design-lime/20 border border-design-lime flex items-center justify-center text-design-lime">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-[20px] h-[20px]">
                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            </div>
            <div>
              <h3 class="font-[600] text-[18px] text-design-lime m-0">Minting Successful!</h3>
              <p class="text-[14px] text-design-neutral m-0 mt-[4px]">Your artwork is now fully committed to the blockchain.</p>
            </div>
          </div>
          <div class="flex flex-col sm:flex-row items-center gap-[12px] pt-[20px] border-t border-design-border">
            <a :href="ipfsUrl" target="_blank" class="w-full sm:w-auto min-h-[44px] px-[24px] bg-transparent hover:bg-design-ghostHover border-2 border-design-slate text-design-white rounded-[8px] transition-colors no-underline inline-flex items-center justify-center gap-[8px] font-[500] hover:border-design-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-[16px] h-[16px]">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
              </svg>
              IPFS Metadata
            </a>
            <RouterLink to="/get" class="w-full sm:w-auto min-h-[44px] px-[24px] bg-design-cyan hover:bg-design-cyanHover text-white rounded-[8px] font-[500] transition-colors no-underline inline-flex items-center justify-center gap-[8px]">
              View Gallery
            </RouterLink>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="errorMsg" class="p-[16px] bg-design-error/10 border border-design-error/50 text-design-error rounded-[8px] text-[14px] flex items-start gap-[12px]">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-[20px] h-[20px] flex-shrink-0">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
          </svg>
          <span class="mt-[2px] font-[500]">{{ errorMsg }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { RouterLink } from 'vue-router';
import Web3 from 'web3';
import abi from '@/libs/MyNFT.json';
import { pinJSONToIPFS, pinFileToIPFS } from '@/libs/pinata.js';
import { useWallet } from '@/libs/wallet';

const { account, connecting, connectWallet } = useWallet();

const selectedFile = ref(null);
const previewUrl = ref(null);
const ipfsUrl = ref(null);
const nftName = ref('');
const nftDescription = ref('');
const minting = ref(false);
const statusText = ref('');
const currentStep = ref(0);
const successMsg = ref(false);
const errorMsg = ref('');
const fileInput = ref(null);

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

const canMint = computed(() => account.value && selectedFile.value && nftName.value && nftDescription.value);

const onFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    selectedFile.value = file;
    previewUrl.value = URL.createObjectURL(file);
  }
};

const removeFile = () => {
  selectedFile.value = null;
  previewUrl.value = null;
};

const createNFT = async () => {
  if (!canMint.value) return;
  minting.value = true;
  successMsg.value = false;
  errorMsg.value = '';
  currentStep.value = 1;
  
  try {
    statusText.value = 'Uploading image to IPFS...';
    const imageHash = await pinFileToIPFS(selectedFile.value, { name: nftName.value + ' Image' });
    const imageUrl = `https://gateway.pinata.cloud/ipfs/${imageHash}`;

    statusText.value = 'Uploading metadata to IPFS...';
    currentStep.value = 2;
    const metadata = { name: nftName.value, description: nftDescription.value, image: imageUrl };
    const metaHash = await pinJSONToIPFS(metadata, { name: `${nftName.value} Metadata` });
    ipfsUrl.value = `https://gateway.pinata.cloud/ipfs/${metaHash}`;

    statusText.value = 'Confirm transaction in MetaMask...';
    currentStep.value = 3;
    
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);
    contract.transactionBlockTimeout = 250;
    contract.transactionPollingTimeout = 3600000;
    
    await new Promise((resolve, reject) => {
      contract.methods.mintMyNFT(ipfsUrl.value)
        .send({ from: account.value })
        .on('transactionHash', () => { statusText.value = 'Transaction pending on Ethereum...'; })
        .on('receipt', receipt => resolve(receipt))
        .on('error', error => reject(error));
    });

    successMsg.value = true;
    nftName.value = '';
    nftDescription.value = '';
    removeFile();
  } catch (err) {
    console.error(err);
    errorMsg.value = err.message || 'Failed to mint NFT';
  } finally {
    minting.value = false;
    currentStep.value = 0;
    statusText.value = '';
  }
};
</script>
