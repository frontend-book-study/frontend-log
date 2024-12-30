// scripts/generateDiscussionPages.ts
import fs from 'fs'
import path from 'path'
import 'dotenv/config' // 먼저 이걸 추가

async function fetchDiscussions(owner: string, repo: string, token: string) {
  const query = `
    query {
      repository(owner: "${owner}", name: "${repo}") {
        discussions(first: 100) {
          nodes {
            title
            createdAt
            number
          }
        }
      }
    }
  `

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
  })

  const data = await response.json()
  return data.data.repository.discussions.nodes
}

async function generateMarkdownFiles() {
  const GITHUB_TOKEN = process.env.VITE_GITHUB_TOKEN
  if (!GITHUB_TOKEN) {
    throw new Error('GitHub token is required')
  }

  try {
    const discussions = await fetchDiscussions('frontend-book-study', 'refactoring-2', GITHUB_TOKEN)

    // 각 discussion에 대해 마크다운 파일 생성
    discussions.forEach(discussion => {
      const { title, createdAt, number } = discussion

      // 디렉토리 생성
      const dirPath = path.join(process.cwd(), 'urara', 'article', 'refactoring-2', number.toString())
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true })
      }
      // frontmatter 생성
      const content = `---
title: '${title.replace(/'/g, "''")}'
created: ${new Date(createdAt).toISOString().split('T')[0]}
tags:
- '리팩터링2판'
---`

      // 파일 저장
      const filePath = path.join(dirPath, `+page.md`)
      fs.writeFileSync(filePath, content, 'utf-8')

      console.log(`Generated: ${filePath}`)
    })
  } catch (error) {
    console.error('Error generating markdown files:', error)
    process.exit(1)
  }
}

generateMarkdownFiles()
