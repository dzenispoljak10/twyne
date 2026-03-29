export const FIRMA = {
  name: 'Twyne',
  zusatz: 'c/o Visiosign Poljak',
  strasse: 'Galliweg 3',
  plz: '4852',
  ort: 'Rothrist',
  land: 'Schweiz',
  uid: 'CHE-330.376.032',
  hr: 'CH-400.1.609.239-1',
  web: 'twyne.ch',
  email: 'info@twyne.ch',
} as const

export const FIRMA_ADRESSE = `${FIRMA.strasse}\n${FIRMA.plz} ${FIRMA.ort}\n${FIRMA.land}`

export const FIRMA_FUSSZEILE =
  `${FIRMA.name} (${FIRMA.zusatz}) · ${FIRMA.strasse} · ${FIRMA.plz} ${FIRMA.ort} · ${FIRMA.land} · UID: ${FIRMA.uid} · HR: ${FIRMA.hr} · ${FIRMA.web}`
