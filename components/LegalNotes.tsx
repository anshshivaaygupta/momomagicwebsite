
'use client';
import {useContent} from '@/lib/useContent';
export function LegalNotes({slug}:{slug:string}){const {pages}=useContent<{pages:Record<string,string>}>('legal',{pages:{}});return pages?.[slug]?<section className="max-w-4xl mx-auto px-4 py-8"><h2 className="text-2xl text-premium-orange mb-4">Additional policy notes</h2><p className="whitespace-pre-wrap">{pages[slug]}</p></section>:null;}
