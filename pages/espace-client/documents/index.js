import { useEffect, useState } from "react";
import { DownloadIcon, Loader2Icon, PaperclipIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import EspaceClientLayout from "@/components/EspaceClientLayout";
import { downloadMyDocument, getMyDocuments } from "@/lib/accounts";

function formatFileSize(bytes) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} Ko`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

function DocumentsList() {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState("");
  const [downloadingId, setDownloadingId] = useState(null);

  useEffect(() => {
    getMyDocuments()
      .then(setDocuments)
      .catch(() => setError("Impossible de charger vos documents."));
  }, []);

  async function handleDownload(doc) {
    setDownloadingId(doc.id);
    try {
      await downloadMyDocument(doc.id, doc.original_filename);
    } catch {
      setError("Le téléchargement a échoué, merci de réessayer.");
    } finally {
      setDownloadingId(null);
    }
  }

  return (
    <Card>
      <CardContent className="p-6 sm:p-8 flex flex-col gap-5">
        <h2 className="text-lg font-bold text-[var(--color-text)]">Mes documents</h2>

        {error && <p className="text-sm text-red-600">{error}</p>}

        {documents && documents.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-10 text-center">
            <PaperclipIcon size={28} strokeWidth={1.2} className="text-gray-300" />
            <p className="text-sm text-gray-500">Aucun document pour le moment.</p>
          </div>
        )}

        {documents && documents.length > 0 && (
          <div className="flex flex-col divide-y divide-gray-100">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center gap-3 py-4">
                <PaperclipIcon size={16} className="shrink-0 text-gray-400" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--color-text)] truncate">{doc.original_filename}</p>
                  <p className="text-xs text-gray-400">
                    {doc.document_label} · {formatFileSize(doc.size_bytes)} · {formatDate(doc.created_at)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleDownload(doc)}
                  disabled={downloadingId === doc.id}
                  className="flex shrink-0 items-center gap-1.5 text-sm font-medium text-[var(--color-brand)] hover:underline disabled:opacity-50"
                >
                  {downloadingId === doc.id ? <Loader2Icon size={14} className="animate-spin" /> : <DownloadIcon size={14} />}
                  Télécharger
                </button>
              </div>
            ))}
          </div>
        )}

        {!documents && !error && (
          <div className="flex justify-center py-10">
            <Spinner className="size-5 text-[var(--color-brand)]" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function EspaceClientDocuments() {
  return (
    <EspaceClientLayout title="Mes documents — Espace client">
      {() => <DocumentsList />}
    </EspaceClientLayout>
  );
}
