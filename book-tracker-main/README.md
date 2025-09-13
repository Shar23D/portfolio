## Set Up

`npm create vite@latest book-tracker`
- react
- javascript

`cd book-tracker`

`npm install lucide-react`

`npm install recharts`

`npm install tailwindcss @tailwindcss/vite` 
- Configure the Vite plugin: 
<i>vite.config.ts</i>
```
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
```

- Import Tailwind CSS in your css file:
`@import "tailwindcss";`

Start your build process
`npm run dev`