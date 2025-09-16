# Set Up

### Terminal
`npm create vite@latest book-tracker`
- react
- javascript

`cd book-tracker`

`npm install lucide-react`

`npm install recharts`

`npm install tailwindcss @tailwindcss/vite` 
- Configure the Vite plugin: 
**vite.config.ts**
```js
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
```
- Import Tailwind CSS in your css file:
```css
@import "tailwindcss";
```
Start your build process
`npm run dev`

`npm install @supabase/supabase-js`

`npm install react-router-dom`

### Supabase 
In Supabase SQL Editor:
```sql
-- Enable auth schema
create extension if not exists "uuid-ossp";

-- Books table
create table if not exists books (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  title text not null,
  author text not null,
  pages int,
  shelf text check (shelf in ('to-read', 'reading', 'read')),
  inserted_at timestamp default now()
);

-- Row-Level Security
alter table books enable row level security;

-- Policy: users can only see their own books
create policy "Users can view own books"
  on books for select
  using (auth.uid() = user_id);

-- Policy: users can insert their own books
create policy "Users can insert own books"
  on books for insert
  with check (auth.uid() = user_id);

-- Policy: users can update their own books
create policy "Users can update own books"
  on books for update
  using (auth.uid() = user_id);

-- Policy: users can delete their own books
create policy "Users can delete own books"
  on books for delete
  using (auth.uid() = user_id);
```

## 📬 Contact

Have questions or suggestions?

Email: sharon.dang.ncg@gmail.com

GitHub: https://github.com/Shar23D