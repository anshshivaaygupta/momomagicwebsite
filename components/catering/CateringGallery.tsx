import Link from 'next/link';
import { BUSINESS } from '@/lib/business';
export function CateringGallery() {
  const photos = [
    {src: '/images/stock/platter.jpg', title: 'Made for sharing'},
    {src: '/images/stock/steamed.jpg', title: 'Steamed favourites'},
    {src: '/images/stock/fusion.jpg', title: 'Momos and dipping sauces'},
  ];
  return <section className="py-16"><div className="container mx-auto px-4">
    <h3 className="text-3xl md:text-4xl text-center font-bold text-premium-orange mb-4">Food for your next gathering</h3>
    <p className="text-center text-foreground/70 mb-8">Representative stock photography. Ask us on WhatsApp about your event, menu and serving arrangements.</p>
    <div className="grid sm:grid-cols-3 gap-6">{photos.map(photo=><figure key={photo.src} className="bg-deep-space rounded-xl overflow-hidden border border-charcoal"><img src={photo.src} alt={photo.title+' — stock photograph'} loading="lazy" className="w-full h-64 object-cover"/><figcaption className="p-4 font-semibold text-golden-glow">{photo.title}</figcaption></figure>)}</div>
    <Link href="/gallery" className="block text-center text-golden-glow mt-5">View gallery and photo credits →</Link>
    <div className="mt-10 text-center"><h4 className="text-2xl font-bold mb-5">Plan your event with us</h4><div className="flex flex-wrap justify-center gap-4"><a href={'tel:'+BUSINESS.phone.replace(/\s/g,'')} className="px-6 py-3 bg-premium-orange text-black rounded-lg font-bold">Call {BUSINESS.phone}</a><a href={'https://wa.me/'+BUSINESS.whatsapp} className="px-6 py-3 border border-premium-orange rounded-lg font-bold">Chat on WhatsApp</a></div></div>
  </div></section>;
}
