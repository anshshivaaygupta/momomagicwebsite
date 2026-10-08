'use client';
import {useEffect,useState} from 'react';
export function useContent<T>(section:string,fallback:T):T{const [content,setContent]=useState(fallback);useEffect(()=>{let active=true;fetch('/api/content?section='+section).then(r=>r.ok?r.json():null).then(data=>{if(active&&data&&!data.error)setContent(data);}).catch(()=>{});return()=>{active=false;};},[section]);return content;}
