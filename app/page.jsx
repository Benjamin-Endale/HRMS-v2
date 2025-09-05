// app/page.js (server component by default)
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/Dashboard');
}
