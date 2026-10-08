
'use client';
import Link from 'next/link';
import {useMenu} from '@/lib/useMenu';
export default function Dashboard(){const items=useMenu();return <div className="space-y-8"><h1 className="text-3xl font-bold">Momo Magic dashboard</h1><p>Manage website content and menu. Booking and order confirmations are handled in business WhatsApp.</p><p>Available menu items: {items.length}</p><div className="grid sm:grid-cols-2 gap-4">{['hero','menu','gallery','combos','catering','media','orders','backup'].map(name=><Link key={name} href={'/admin/dashboard/'+name} className="bg-charcoal border border-gray-700 rounded-xl p-6 capitalize">{name} →</Link>)}</div><p className="text-gray-400">Analytics and payment status require connected providers; no sample sales or reviews are displayed.</p></div>;}
