const required = [
  'DATABASE_URL',
  'NEXTAUTH_SECRET',
  'NEXTAUTH_URL',
  'RESEND_API_KEY',
  'ADMIN_EMAIL',
  'ADMIN_PASSWORD',
]

required.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Fehlende ENV-Variable: ${key}`)
  }
})
