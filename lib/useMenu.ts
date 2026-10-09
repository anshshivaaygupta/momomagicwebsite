'use client';
import { isAvailableItem } from '@/lib/catalog';
import { useEffect, useState } from 'react';
import { menuItems, type MenuItem } from '@/data/menu';
export function useMenu(){
 const [items,setItems]=useState<MenuItem[]>(menuItems);
 useEffect(()=>{let active=true;fetch('/api/content?section=menu').then(r=>r.ok?r.json():null).then(data=>{
  if(active && Array.isArray(data?.items))setItems(data.items.filter(isAvailableItem).map((i:any)=>({...i,price:i.price?.full??i.price10pc??i.price,halfPrice:i.price?.half??i.price5pc??i.halfPrice,popular:i.isPopular??i.isFeatured??i.popular,new:i.isNew??i.new,type:i.type||'veg',spiceLevel:(i.spiceLevel||'medium').toLowerCase()})));
 }).catch(()=>{});return()=>{active=false;};},[]);
 return items;
}
