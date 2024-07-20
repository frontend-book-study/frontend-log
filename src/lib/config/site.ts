import type { SiteConfig } from '$lib/types/site'

export const site: SiteConfig = {
  protocol: import.meta.env.URARA_SITE_PROTOCOL ?? import.meta.env.DEV ?? 'https://',
  domain: import.meta.env.URARA_SITE_DOMAIN ?? 'urara-demo.netlify.app',
  title: 'Frontend Log',
  subtitle: '프론트엔드 책 공부하는 블로그',
  lang: 'ko-KR',
  description: 'Powered by SvelteKit/Urara',
  author: {
    avatar: '/assets/maskable@512.png',
    name: 'FE Developer',
    status: '🌸',
    bio: '프론트엔드 개발과 관련한 스터디를 진행하고 기록하는 공간입니다.'
  },
  themeColor: '#3D4451'
}
