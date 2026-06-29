<template>
  <div class="flex flex-col items-center justify-center min-h-[60vh] py-[40px] animate-fade-up">
    <div class="w-full max-w-[800px] mx-auto text-center flex flex-col items-center gap-[48px]">
      
      <!-- Disconnected State: Hero CTA -->
      <div v-if="!account" class="flex flex-col items-center gap-[32px]">
        <div class="inline-flex items-center gap-[8px] px-[16px] py-[8px] border border-design-border rounded-[8px] text-[14px] text-design-neutral bg-design-card">
          <span class="w-[8px] h-[8px] rounded-full bg-design-lime"></span>
          <span class="font-mono">Web3 Ready</span>
        </div>

        <h1 class="text-[32px] sm:text-[48px] font-[700] leading-[1.2] text-design-white m-0 tracking-tight">
          Unleash Your Images as <br/>
          <span class="text-design-cyan">Verifiable Digital Art</span>
        </h1>

        <p class="text-[16px] sm:text-[20px] leading-[1.5] text-design-neutral max-w-[600px] m-0">
          Pictify is a modern decentralized application to upload, pin your metadata to IPFS, and mint custom NFTs onto the blockchain in seconds.
        </p>

        <div class="pt-[16px]">
          <button 
            @click="connectWallet" 
            :disabled="connecting"
            class="min-h-[44px] px-[24px] bg-design-cyan hover:bg-design-cyanHover active:bg-design-cyan text-white text-[14px] font-[500] rounded-[8px] transition-colors disabled:bg-design-slate disabled:text-design-neutral disabled:cursor-not-allowed flex items-center justify-center gap-[8px]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-[18px] h-[18px]">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6A2.25 2.25 0 0 1 18.75 20.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18-3a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6" />
            </svg>
            {{ connecting ? 'Connecting to MetaMask...' : 'Connect MetaMask Wallet' }}
          </button>
        </div>
      </div>

      <!-- Connected State: Web3 Dashboard -->
      <div v-else class="w-full space-y-[48px]">
        <div class="text-center space-y-[12px]">
          <h2 class="text-[24px] sm:text-[32px] font-[700] text-design-white m-0 tracking-tight">
            Welcome back to Pictify
          </h2>
          <p class="text-[16px] sm:text-[20px] text-design-neutral m-0">Your Web3 command center for image minting and management.</p>
        </div>

        <!-- Connection card -->
        <div class="w-full bg-design-card border border-design-border rounded-[12px] p-[24px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[24px] shadow-none hover:shadow-design-raised hover:bg-design-cardHover hover:border-design-borderHover transition-all">
          <div class="flex items-center gap-[20px]">
            <div class="w-[56px] h-[56px] rounded-[50%] bg-design-ghostHover border border-design-border flex items-center justify-center text-design-cyan">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[28px] h-[28px]">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
              </svg>
            </div>
            <div class="text-left">
              <p class="text-[12px] text-design-slate font-[400] uppercase tracking-wide m-0 mb-[4px]">Connected Wallet</p>
              <p class="text-[16px] font-mono text-design-white font-[500] m-0 break-all">{{ account }}</p>
            </div>
          </div>
          <button 
            @click="disconnectWallet" 
            class="min-h-[44px] px-[24px] bg-transparent hover:bg-design-ghostHover border-2 border-design-slate text-design-white rounded-[8px] text-[14px] font-[500] transition-colors hover:border-design-white"
          >
            Disconnect
          </button>
        </div>

        <!-- Navigation Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-[24px] w-full text-left">
          <RouterLink to="/upload" class="group bg-design-card border border-design-border hover:bg-design-cardHover hover:border-design-cyan p-[24px] rounded-[12px] flex flex-col gap-[20px] transition-all no-underline">
            <div class="w-[40px] h-[40px] text-design-cyan">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-full h-full">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <div>
              <h3 class="text-[20px] font-[600] text-design-white group-hover:text-design-cyan transition-colors m-0 mb-[8px]">Mint New NFT</h3>
              <p class="text-[16px] text-design-neutral leading-[1.5] m-0">Upload your digital creations, fill in the metadata, and write them onto the blockchain permanently.</p>
            </div>
          </RouterLink>

          <RouterLink to="/get" class="group bg-design-card border border-design-border hover:bg-design-cardHover hover:border-design-magenta p-[24px] rounded-[12px] flex flex-col gap-[20px] transition-all no-underline">
            <div class="w-[40px] h-[40px] text-design-magenta">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-full h-full">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6a2.25 2.25 0 0 1 2.25-2.25m13.5 0v3a2.25 2.25 0 0 1-2.25 2.25H8.25A2.25 2.25 0 0 1 6 15v-3M9 9h.008v.008H9V9Zm.008 6h.008v.008H9.008V15Zm3-3h.008v.008h-.008V12Zm3-3h.008v.008H15V9Zm0 6h.008v.008H15V15Z" />
              </svg>
            </div>
            <div>
              <h3 class="text-[20px] font-[600] text-design-white group-hover:text-design-magenta transition-colors m-0 mb-[8px]">My NFT Gallery</h3>
              <p class="text-[16px] text-design-neutral leading-[1.5] m-0">Browse the NFTs you currently own, retrieve their decentralized metadata files, and view transaction records.</p>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { useWallet } from '@/libs/wallet';

const { account, connecting, connectWallet, disconnectWallet } = useWallet();
</script>

