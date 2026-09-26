import { useEffect, useState } from "react";
import { FileTextIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import EspaceClientLayout from "@/components/EspaceClientLayout";
import { getMyLeads } from "@/lib/accounts";

const STATUS_LABELS = {
  new: "Nouveau",
  contacted: "Contacté",
  qualified: "Qualifié",
  converted: "Converti",
  lost: "Perdu",
};

const STATUS_BADGE_CLASS = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-amber-100 text-amber-700",
  qualified: "bg-purple-100 text-purple-700",
  converted: "bg-green-100 text-green-700",
  lost: "bg-gray-100 text-gray-500",
};

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

function DevisList() {
  const [leads, setLeads] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getMyLeads()
      .then(setLeads)
      .catch(() => setError("Impossible de charger vos demandes de devis."));
  }, []);

  return (
    <Card>
      <CardContent className="p-6 sm:p-8 flex flex-col gap-5">
        <h2 className="text-lg font-bold text-[var(--color-text)]">Mes demandes de devis</h2>

        {error && <p className="text-sm text-red-600">{error}</p>}

        {leads && leads.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-10 text-center">
            <FileTextIcon size={28} strokeWidth={1.2} className="text-gray-300" />
            <p className="text-sm text-gray-500">Aucune demande de devis pour le moment.</p>
            <a href="/devis/" className="text-sm font-semibold text-[var(--color-brand)] hover:underline">
              Obtenir un devis
            </a>
          </div>
        )}

        {leads && leads.length > 0 && (
          <div className="flex flex-col divide-y divide-gray-100">
            {leads.map((lead) => (
              <div key={lead.id} className="flex items-center justify-between gap-4 py-4">
                <div>
                  <p className="font-medium text-[var(--color-text)]">{lead.type}</p>
                  <p className="text-xs text-gray-400">Envoyée le {formatDate(lead.created_at)}</p>
                </div>
                <Badge className={`border-transparent ${STATUS_BADGE_CLASS[lead.status] || "bg-gray-100 text-gray-600"}`}>
                  {STATUS_LABELS[lead.status] || lead.status}
                </Badge>
              </div>
            ))}
          </div>
        )}

        {!leads && !error && (
          <div className="flex justify-center py-10">
            <Spinner className="size-5 text-[var(--color-brand)]" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function EspaceClient() {
  return (
    <EspaceClientLayout title="Espace client">
      {() => <DevisList />}
    </EspaceClientLayout>
  );
}
