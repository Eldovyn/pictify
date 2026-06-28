<template>
  <div class="flex flex-col items-center justify-center min-h-[60vh] py-[40px] animate-fade-up">
    <div class="w-full max-w-[800px] mx-auto text-center flex flex-col items-center gap-[48px]">
      
      <!-- Disconnected State: Hero CTA -->
      <div v-if="!account" class="flex flex-col items-center gap-[32px]">
        <div class="inline-flex items-center gap-[8px] px-[16px] py-[8px] border border-idrx-border-soft rounded-[4px] text-[14px] text-idrx-text-secondary bg-white shadow-sm">
          <span class="w-[8px] h-[8px] rounded-full bg-[#10B981]"></span>
          <span>Web3 Ready</span>
        </div>

        <h1 class="text-[36px] sm:text-[48px] font-[700] leading-[1.2] text-idrx-text-primary m-0 tracking-tight">
          Unleash Your Images as <br/>
          <span class="text-idrx-brand-primary">Verifiable Digital Art</span>
        </h1>

        <p class="text-[18px] leading-[28px] text-idrx-text-secondary max-w-[600px] m-0">
          Pictify is a modern decentralized application to upload, pin your metadata to IPFS, and mint custom NFTs onto the blockchain in seconds.
        </p>

        <div class="pt-[16px]">
          <button 
            @click="connectWallet" 
            :disabled="connecting"
            class="min-h-[44px] px-[32px] bg-idrx-brand-primary hover:bg-idrx-brand-hover active:bg-idrx-brand-active text-white text-[14px] font-[600] rounded-[24px] transition-colors disabled:bg-idrx-surface-400 disabled:text-idrx-text-muted flex items-center justify-center gap-[8px] shadow-sm"
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
          <h2 class="text-[28px] sm:text-[36px] font-[700] text-idrx-text-primary m-0 tracking-tight">
            Welcome back to Pictify
          </h2>
          <p class="text-[18px] text-idrx-text-secondary m-0">Your Web3 command center for image minting and management.</p>
        </div>

        <!-- Connection card (Standard Card) -->
        <div class="w-full bg-white border border-idrx-border-light rounded-[8px] p-[24px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[24px] shadow-idrx-base">
          <div class="flex items-center gap-[20px]">
            <div class="w-[56px] h-[56px] rounded-[50%] bg-idrx-surface-100 border border-idrx-border-soft flex items-center justify-center text-idrx-brand-primary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[28px] h-[28px]">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
              </svg>
            </div>
            <div class="text-left">
              <p class="text-[14px] text-idrx-text-secondary font-[600] uppercase tracking-wide m-0 mb-[4px]">Connected Wallet</p>
              <p class="text-[16px] font-mono text-idrx-text-primary font-[600] m-0 break-all">{{ account }}</p>
            </div>
          </div>
          <button 
            @click="disconnectWallet" 
            class="min-h-[44px] px-[24px] bg-idrx-surface-200 hover:bg-idrx-surface-300 active:bg-idrx-surface-400 border border-idrx-border-light text-idrx-text-primary rounded-[24px] text-[14px] font-[600] transition-colors"
          >
            Disconnect
          </button>
        </div>

        <!-- Navigation Cards (Feature Cards) -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-[24px] w-full text-left">
          <RouterLink to="/upload" class="group bg-idrx-surface-100 border border-idrx-border-soft hover:bg-white hover:border-idrx-brand-primary p-[32px_24px] rounded-[12px] flex flex-col gap-[20px] transition-all no-underline hover:shadow-idrx-elevated">
            <div class="w-[40px] h-[40px] text-idrx-brand-primary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-full h-full">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <div>
              <h3 class="text-[20px] font-[700] text-idrx-text-primary group-hover:text-idrx-brand-primary transition-colors m-0 mb-[8px]">Mint New NFT</h3>
              <p class="text-[16px] text-idrx-text-secondary leading-[24px] m-0">Upload your digital creations, fill in the metadata, and write them onto the blockchain permanently.</p>
            </div>
          </RouterLink>

          <RouterLink to="/get" class="group bg-idrx-surface-100 border border-idrx-border-soft hover:bg-white hover:border-idrx-brand-primary p-[32px_24px] rounded-[12px] flex flex-col gap-[20px] transition-all no-underline hover:shadow-idrx-elevated">
            <div class="w-[40px] h-[40px] text-idrx-brand-primary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-full h-full">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6a2.25 2.25 0 0 1 2.25-2.25m13.5 0v3a2.25 2.25 0 0 1-2.25 2.25H8.25A2.25 2.25 0 0 1 6 15v-3M9 9h.008v.008H9V9Zm.008 6h.008v.008H9.008V15Zm3-3h.008v.008h-.008V12Zm3-3h.008v.008H15V9Zm0 6h.008v.008H15V15Z" />
              </svg>
            </div>
            <div>
              <h3 class="text-[20px] font-[700] text-idrx-text-primary group-hover:text-idrx-brand-primary transition-colors m-0 mb-[8px]">My NFT Gallery</h3>
              <p class="text-[16px] text-idrx-text-secondary leading-[24px] m-0">Browse the NFTs you currently own, retrieve their decentralized metadata files, and view transaction records.</p>
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

