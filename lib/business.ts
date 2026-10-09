export const BUSINESS = {
  name: 'Momos Magic', phone: '+91 9955955191', whatsapp: '919955955191',
  address: 'Naya Bazar, Near Post Office, Sherghati, Bihar 824211',
  email: 'momosmagic.info@gmail.com',
  maps: 'https://www.google.com/maps/place/Momo+Magic/@24.568549,84.7986165,17z/data=!4m6!3m5!1s0x398ccf6fffd9c02d:0xb7bbecfa49d30772!8m2!3d24.568549!4d84.8011914!16s%2Fg%2F11xd3p161h?entry=ttu&g_ep=EgoyMDI2MTAwNi4wIKXMDSoASAFQAw%3D%3D',
  embed: 'https://maps.google.com/maps?q=Momos%20Magic%20Naya%20Bazar%20Sherghati&output=embed',
};
export function whatsappUrl(title: string, details: Record<string, unknown>) {
  const lines=Object.entries(details).filter(([,v])=>v!=='' && v!==null && v!==undefined).map(([k,v])=>`${k}: ${v}`);
  return `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(`${title}\n\n${lines.join('\n')}\n\nPlease confirm availability and the final price.`)}`;
}
export function openWhatsApp(title: string, details: Record<string, unknown>) { window.location.assign(whatsappUrl(title,details)); }
