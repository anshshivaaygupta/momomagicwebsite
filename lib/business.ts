export const BUSINESS = {
  name: 'Momos Magic', phone: '+91 9955955191', whatsapp: '919955955191',
  address: 'Naya Bazar, Near Post Office, Sherghati, Bihar 824211',
  email: 'momosmagic.info@gmail.com',
  maps: 'https://www.google.com/maps/search/?api=1&query=Momos%20Magic%20Naya%20Bazar%20Sherghati',
  embed: 'https://maps.google.com/maps?q=Momos%20Magic%20Naya%20Bazar%20Sherghati&output=embed',
};
export function whatsappUrl(title: string, details: Record<string, unknown>) {
  const lines=Object.entries(details).filter(([,v])=>v!=='' && v!==null && v!==undefined).map(([k,v])=>`${k}: ${v}`);
  return `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(`${title}\n\n${lines.join('\n')}\n\nPlease confirm availability and the final price.`)}`;
}
export function openWhatsApp(title: string, details: Record<string, unknown>) { window.location.assign(whatsappUrl(title,details)); }
