import type { SiteConfig } from '$lib/types/site'

export const site: SiteConfig = {
  protocol: import.meta.env.URARA_SITE_PROTOCOL ?? import.meta.env.DEV ? 'http://' : 'https://',
  domain: import.meta.env.URARA_SITE_DOMAIN ?? 'urara-demo.netlify.app',
  title: 'Frontend Log',
  subtitle: '프론트엔드 책 공부하는 블로그',
  lang: 'ko-KR',
  description: 'Powered by SvelteKit/Urara',
  author: {
    avatar: '/assets/maskable@512.png',
    name: 'FE Developer',
    status: '🌸',
    bio: ''
  },
  themeColor: '#3D4451'
}
