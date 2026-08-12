// Endpoint público de Formspree para el formulario de contacto.
// Se envía con FormData; Formspree responde JSON si se manda el header
// `Accept: application/json`. Se consume desde features/contact-form
// cuando se extraiga el formulario.
export const CONTACT_FORM_ENDPOINT = 'https://formspree.io/f/xrpzqvzv'