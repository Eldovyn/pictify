<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { useWallet } from '@/libs/wallet'

const route = useRoute()
const { account, connecting, connectWallet, checkConnection } = useWallet()

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/upload', label: 'Mint NFT' },
  { to: '/get', label: 'My NFTs' },
]

onMounted(() => {
  checkConnection()
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-idrx-surface-50 font-sans text-idrx-text-primary">
    <!-- Navbar -->
    <header class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-idrx-border-soft w-full">
      <div class="max-w-[1440px] mx-auto px-[24px] lg:px-[40px] flex items-center justify-between min-h-[76px]">
        <div class="flex items-center gap-[40px]">
          <RouterLink to="/" class="flex items-center gap-[12px] no-underline hover:opacity-80 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-[28px] h-[28px] text-idrx-brand-primary">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            <span class="font-[700] text-[20px] text-idrx-text-primary tracking-tight">Pictify</span>
          </RouterLink>

          <!-- Main Nav Links -->
          <nav class="hidden md:flex items-center gap-[8px]">
            <RouterLink
              v-for="item in navItems"
              :key="item.to"
              :to="item.to"
              :class="[
                'text-[16px] min-h-[44px] px-[16px] flex items-center transition-colors rounded-[8px] no-underline',
                route.path === item.to 
                  ? 'text-idrx-brand-primary font-[600] bg-idrx-brand-ghostHover' 
                  : 'text-idrx-text-primary font-[400] hover:text-idrx-brand-primary hover:bg-idrx-brand-ghostHover'
              ]"
            >
              {{ item.label }}
            </RouterLink>
          </nav>
        </div>

        <!-- Right Nav & Wallet -->
        <div class="flex items-center gap-[16px]">
          <div v-if="account" class="flex items-center gap-[8px] min-h-[44px] px-[16px] bg-idrx-surface-white border border-idrx-border-light rounded-[24px] text-[14px] font-[600] text-idrx-text-primary shadow-idrx-base">
            <span class="w-[8px] h-[8px] rounded-full bg-[#10B981]"></span>
            <span>{{ account.slice(0, 6) }}...{{ account.slice(-4) }}</span>
          </div>
          
          <button 
            v-else 
            @click="connectWallet" 
            :disabled="connecting"
            class="min-h-[44px] px-[24px] bg-idrx-brand-primary hover:bg-idrx-brand-hover active:bg-idrx-brand-active text-white text-[14px] font-[600] rounded-[24px] transition-colors disabled:bg-idrx-surface-400 disabled:text-idrx-text-muted disabled:cursor-not-allowed flex items-center gap-[8px]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-[18px] h-[18px]">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6A2.25 2.25 0 0 1 18.75 20.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18-3a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6" />
            </svg>
            {{ connecting ? 'Connecting...' : 'Connect' }}
          </button>
        </div>
      </div>
    </header>

    <!-- Mobile Nav Bar (fallback for small screens) -->
    <div class="md:hidden w-full bg-white border-b border-idrx-border-soft px-[24px] py-[12px] flex items-center gap-[8px] overflow-x-auto shadow-sm">
      <RouterLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        :class="[
          'text-[14px] min-h-[44px] px-[16px] whitespace-nowrap flex items-center transition-colors rounded-[24px] no-underline',
          route.path === item.to 
            ? 'bg-idrx-brand-primary text-white font-[600]' 
            : 'text-idrx-text-primary font-[500] bg-idrx-surface-100 hover:text-idrx-brand-primary'
        ]"
      >
        {{ item.label }}
      </RouterLink>
    </div>

    <!-- Main Content -->
    <main class="flex-grow w-full max-w-[1440px] mx-auto px-[24px] lg:px-[40px] py-[48px]">
      <RouterView />
    </main>

    <!-- Footer -->
    <footer class="py-[48px] bg-white border-t border-idrx-border-soft mt-auto">
      <div class="max-w-[1440px] mx-auto px-[24px] lg:px-[40px] flex flex-col md:flex-row items-center justify-between gap-[24px] text-[14px] text-idrx-text-secondary">
        <div class="flex items-center gap-[12px]">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-[20px] h-[20px] text-idrx-brand-primary">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          <span class="font-[500]">&copy; 2026 Pictify</span>
        </div>
        <div class="flex flex-wrap justify-center items-center gap-[24px]">
          <a href="#" class="hover:text-idrx-brand-primary transition-colors no-underline text-inherit font-[500]">Terms</a>
          <a href="#" class="hover:text-idrx-brand-primary transition-colors no-underline text-inherit font-[500]">Privacy</a>
          <a href="#" class="hover:text-idrx-brand-primary transition-colors no-underline text-inherit font-[500]">Security</a>
          <a href="#" class="hover:text-idrx-brand-primary transition-colors no-underline text-inherit font-[500]">Status</a>
        </div>
      </div>
    </footer>
  </div>
</template>


