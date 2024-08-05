export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'Ivan & Joanna',
  description: 'Boda Ivan & Joanna 2025',
  navItems: [
    {
      label: 'Historia',
      href: '/historia',
    },
    {
      label: 'Detalles del Evento',
      href: '/evento',
    },
    {
      label: 'Galeria',
      href: '/galeria',
    },
    {
      label: 'RSVP',
      href: '/rsvp',
    },
    {
      label: 'Lista de Regalos',
      href: '/regalos',
    },
    {
      label: 'Contacto',
      href: '/contacto',
    },
  ],
};
