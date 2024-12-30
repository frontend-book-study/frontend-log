<script lang="ts">
    import { onMount } from 'svelte';

    type Theme = 'light' | 'light_high_contrast' | 'light_protanopia' |
        'dark' | 'dark_high_contrast' | 'dark_protanopia' |
        'dark_dimmed' | 'transparent_dark' | 'preferred_color_scheme';

    type Language = 'ko' | 'en' | 'ja' | 'zh-CN' | 'zh-TW';

    type Mapping = 'pathname' | 'url' | 'title' | 'og:title' | 'specific' | 'number';

    interface GiscusProps {
        repo: string;            // username/repo-name 형식
        repoId: string;         // GitHub에서 제공하는 repo ID
        category?: string;      // 디스커션 카테고리
        categoryId: string;     // GitHub에서 제공하는 category ID
        mapping?: Mapping;      // 매핑 방식
        term?: string;         // mapping이 'specific'일 때 사용할 특정 용어
        theme?: Theme;         // 테마 설정
        lang?: Language;       // 언어 설정
        loading?: 'lazy' | 'eager'; // 로딩 방식
        reactionsEnabled?: boolean; // 반응 활성화 여부
        emitMetadata?: boolean;    // 메타데이터 방출 여부
        inputPosition?: 'top' | 'bottom'; // 입력창 위치
    }

    export let repo: GiscusProps['repo'];
    export let repoId: GiscusProps['repoId'];
    export let category: GiscusProps['category'] = 'General';
    export let categoryId: GiscusProps['categoryId'];
    export let mapping: GiscusProps['mapping'] = 'pathname';
    export let term: GiscusProps['term'] = '';
    export let theme: GiscusProps['theme'] = 'light';
    export let lang: GiscusProps['lang'] = 'ko';
    export let loading: GiscusProps['loading'] = 'lazy';
    export let reactionsEnabled: GiscusProps['reactionsEnabled'] = true;
    export let emitMetadata: GiscusProps['emitMetadata'] = false;
    export let inputPosition: GiscusProps['inputPosition'] = 'bottom';

    let giscusContainer: HTMLDivElement;

    const getGiscusTheme = (theme: Theme): string => {
        if (theme.startsWith('http')) return theme;
        return `https://giscus.app/themes/${theme}.css`;
    };

    onMount(() => {
        // 이미 존재하는 giscus 스크립트 제거 (hot reload 대응)
        const existingScript = document.querySelector('script[src*="giscus"]');
        if (existingScript) {
            existingScript.remove();
        }

        const script = document.createElement('script');
        script.src = 'https://giscus.app/client.js';

        // required attributes
        script.setAttribute('data-repo', repo);
        script.setAttribute('data-repo-id', repoId);
        script.setAttribute('data-category', category ?? '');
        script.setAttribute('data-category-id', categoryId);

        // optional attributes
        script.setAttribute('data-mapping', mapping ?? '');
        if (term) {
            script.setAttribute('data-term', term);
        }
        script.setAttribute('data-strict', '0');
        script.setAttribute('data-reactions-enabled', (reactionsEnabled ?? '').toString());
        script.setAttribute('data-emit-metadata', (emitMetadata ?? '').toString());
        script.setAttribute('data-input-position', inputPosition ?? '');
        script.setAttribute('data-theme', getGiscusTheme(theme ?? 'light'));
        script.setAttribute('data-lang', lang ?? 'ko');
        script.setAttribute('data-loading', loading ?? 'lazy');

        script.crossOrigin = 'anonymous';
        script.async = true;

        giscusContainer.appendChild(script);

        return () => {
            // cleanup on component unmount
            script.remove();
        };
    });
</script>

<div bind:this={giscusContainer} class="giscus-container"></div>

<style>
    .giscus-container {
        width: 100%;
        margin-top: 2rem;
        min-height: 150px;
    }
</style>