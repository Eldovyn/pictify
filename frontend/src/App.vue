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
  <div class="min-h-screen flex flex-col bg-design-bg font-sans text-design-white selection:bg-design-cyan selection:text-white">
    <!-- Navbar -->
    <header class="sticky top-0 z-50 bg-design-nav backdrop-blur-md border-b border-design-border w-full">
      <div class="max-w-[1180px] mx-auto px-[16px] md:px-[40px] flex items-center justify-between min-h-[76px]">
        <div class="flex items-center gap-[40px]">
          <RouterLink to="/" class="flex items-center gap-[12px] no-underline hover:opacity-80 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-[28px] h-[28px] text-design-cyan">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            <span class="font-[700] text-[20px] text-design-white tracking-tight">Pictify</span>
          </RouterLink>

          <!-- Main Nav Links -->
          <nav class="hidden md:flex items-center gap-[12px] h-[76px]">
            <RouterLink
              v-for="item in navItems"
              :key="item.to"
              :to="item.to"
              :class="[
                'text-[14px] font-[500] h-full flex items-center px-[8px] transition-colors no-underline border-b-2',
                route.path === item.to 
                  ? 'text-design-white border-design-cyan' 
                  : 'text-design-neutral border-transparent hover:text-design-white hover:border-design-cyan'
              ]"
            >
              {{ item.label }}
            </RouterLink>
          </nav>
        </div>

        <!-- Right Nav & Wallet -->
        <div class="flex items-center gap-[16px]">
          <div v-if="account" class="flex items-center gap-[8px] min-h-[44px] px-[16px] bg-design-card border border-design-border rounded-[8px] text-[14px] font-[500] text-design-white shadow-design-raised">
            <span class="w-[8px] h-[8px] rounded-full bg-design-lime"></span>
            <span class="font-mono">{{ account.slice(0, 6) }}...{{ account.slice(-4) }}</span>
          </div>
          
          <button 
            v-else 
            @click="connectWallet" 
            :disabled="connecting"
            class="min-h-[44px] px-[24px] bg-design-cyan hover:bg-design-cyanHover active:bg-design-cyan text-white text-[14px] font-[500] rounded-[8px] transition-colors disabled:bg-design-slate disabled:text-design-neutral disabled:cursor-not-allowed flex items-center gap-[8px]"
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
    <div class="md:hidden w-full bg-design-base border-b border-design-border px-[16px] py-[12px] flex items-center gap-[8px] overflow-x-auto">
      <RouterLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        :class="[
          'text-[14px] min-h-[40px] px-[16px] whitespace-nowrap flex items-center transition-colors rounded-[8px] no-underline border',
          route.path === item.to 
            ? 'bg-design-cyan/10 border-design-cyan text-design-cyan font-[500]' 
            : 'text-design-neutral border-transparent hover:text-design-white hover:bg-design-ghostHover'
        ]"
      >
        {{ item.label }}
      </RouterLink>
    </div>

    <!-- Main Content -->
    <main class="flex-grow w-full max-w-[1180px] mx-auto px-[16px] md:px-[40px] py-[40px] md:py-[64px]">
      <RouterView />
    </main>

    <!-- Footer -->
    <footer class="py-[24px] border-t border-design-border mt-auto">
      <div class="max-w-[1180px] mx-auto px-[16px] md:px-[40px] flex flex-col md:flex-row items-center justify-between gap-[24px] text-[14px] text-design-slate">
        <div class="flex items-center gap-[12px]">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-[20px] h-[20px] text-design-slate">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          <span class="font-[400] text-design-neutral">&copy; 2026 Pictify</span>
        </div>
        <div class="flex flex-wrap justify-center items-center gap-[24px]">
          <a href="#" class="hover:text-design-cyan transition-colors no-underline text-inherit">Terms</a>
          <a href="#" class="hover:text-design-cyan transition-colors no-underline text-inherit">Privacy</a>
          <a href="#" class="hover:text-design-cyan transition-colors no-underline text-inherit">Security</a>
          <a href="#" class="hover:text-design-cyan transition-colors no-underline text-inherit">Status</a>
        </div>
      </div>
    </footer>
  </div>
</template>


