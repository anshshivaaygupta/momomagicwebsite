'use client';
import { useEffect,useState } from 'react';
import Link from 'next/link';
import { type CartItem } from '@/data/orderData';
import { whatsappUrl } from '@/lib/business';
export default function Checkout(){
 const [cart,setCart]=useState<CartItem[]>([]),[name,setName]=useState(''),[phone,setPhone]=useState(''),[ready,setReady]=useState(false),[notes,setNotes]=useState('');
 useEffect(()=>{try{setCart(JSON.parse(sessionStorage.getItem('cart')||'[]'));}catch{}setReady(true);fetch('/api/order/auth').then(r=>r.json()).then(d=>{if(d.success){setName(d.user.name);setPhone(d.user.phone.replace(/^\+?91/,''));}}).catch(()=>{});},[]);
 const total=cart.reduce((sum,i)=>sum+i.subtotal,0);
 function submit(e:React.FormEvent){e.preventDefault();const valid=cart.length>0&&name.trim().length>=2&&/^[6-9]\d{9}$/.test(phone);if(!valid)return;
  const text=cart.map(i=>`${i.menuItem.name} — ${i.quantity} pieces, ${i.spiceLevel} — ₹${i.subtotal}${i.specialInstructions?' ('+i.specialInstructions+')':''}`).join('\n');
  window.location.assign(whatsappUrl('Takeaway order request',{'Name':name,'Phone':phone,'Items':text,'Menu total':`₹${total}`,'Collection':'Takeaway — please confirm pickup time','Notes':notes}));
 }
 if(!ready)return <div className="py-28 text-center">Loading your cart…</div>;
 return <div className="min-h-screen py-24 px-4"><div className="max-w-2xl mx-auto"><h1 className="text-4xl text-premium-orange font-bold mb-4">Complete your order</h1><p className="text-gray-300 mb-7">Your request opens in WhatsApp. Tap Send; the business confirms availability, pickup time and the final price. Pay directly to the business after confirmation.</p>{!cart.length?<><p>Your cart is empty.</p><Link className="text-golden-glow" href="/order/menu">Browse menu →</Link></>:<><div className="bg-deep-space p-5 rounded-xl mb-6">{cart.map((i,n)=><div key={n} className="flex justify-between gap-4 border-b border-charcoal py-3"><span>{i.menuItem.name} · {i.quantity} pieces</span><strong>₹{i.subtotal}</strong></div>)}<p className="text-xl mt-5">Menu total: <strong className="text-golden-glow">₹{total}</strong></p></div><form onSubmit={submit}><label htmlFor="checkout-name" className="block mb-2">Your name</label><input id="checkout-name" value={name} onChange={e=>setName(e.target.value)} required minLength={2} autoComplete="name" className="w-full bg-charcoal rounded-lg p-3 mb-5"/><label htmlFor="checkout-phone" className="block mb-2">Mobile number</label><input id="checkout-phone" value={phone} onChange={e=>setPhone(e.target.value.replace(/\D/g,'').slice(0,10))} type="tel" pattern="[6-9][0-9]{9}" required autoComplete="tel-national" className="w-full bg-charcoal rounded-lg p-3 mb-5"/><label htmlFor="checkout-notes" className="block mb-2">Special requests</label><textarea id="checkout-notes" value={notes} onChange={e=>setNotes(e.target.value)} maxLength={1000} className="w-full bg-charcoal rounded-lg p-3 mb-5"/><button className="w-full bg-premium-orange text-black rounded-lg font-bold p-4">Continue to WhatsApp →</button><Link href="/order/cart" className="block text-center text-golden-glow mt-5">Edit cart</Link></form></>}</div></div>;
}
