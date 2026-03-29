export default function EinstellungenPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#111111]" style={{ letterSpacing: '-0.5px' }}>Einstellungen</h1>
        <p className="text-sm text-[#6B7280] mt-1">System-Konfiguration</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-[#E8E8ED] p-6">
          <h2 className="text-base font-bold text-[#111111] mb-4">Allgemein</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-[#E8E8ED]">
              <span className="text-[#6B7280]">Agentur</span>
              <span className="font-medium text-[#111111]">Twyne</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#E8E8ED]">
              <span className="text-[#6B7280]">Website</span>
              <span className="font-medium text-[#111111]">twyne.ch</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#E8E8ED]">
              <span className="text-[#6B7280]">E-Mail</span>
              <span className="font-medium text-[#111111]">info@twyne.ch</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-[#6B7280]">Sprache</span>
              <span className="font-medium text-[#111111]">Deutsch (DE)</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E8E8ED] p-6">
          <h2 className="text-base font-bold text-[#111111] mb-4">Umgebung</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-[#E8E8ED]">
              <span className="text-[#6B7280]">NODE_ENV</span>
              <span className="font-mono font-medium text-[#111111]">{process.env.NODE_ENV}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#E8E8ED]">
              <span className="text-[#6B7280]">Datenbank</span>
              <span className="font-medium text-green-600">
                {process.env.DATABASE_URL ? '✓ Verbunden' : '✗ Nicht konfiguriert'}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#E8E8ED]">
              <span className="text-[#6B7280]">E-Mail (Resend)</span>
              <span className="font-medium text-green-600">
                {process.env.RESEND_API_KEY ? '✓ Konfiguriert' : '✗ Nicht konfiguriert'}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-[#6B7280]">NextAuth</span>
              <span className="font-medium text-green-600">
                {process.env.NEXTAUTH_SECRET ? '✓ Konfiguriert' : '✗ Nicht konfiguriert'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
