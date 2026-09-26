import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupInput, InputGroupAddon, InputGroupButton } from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import EspaceClientLayout from "@/components/EspaceClientLayout";
import { changePassword, updateAccount } from "@/lib/accounts";

function ProfileForm({ account, setAccount }) {
  const [name, setName] = useState(account.name);
  const [email, setEmail] = useState(account.email);
  const [currentPassword, setCurrentPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  // Changing the email is as sensitive as changing the password (it's
  // where "mot de passe oublié" sends the reset link) — the backend
  // requires the current password to confirm it's really the account
  // owner, so this field only shows up once it's actually needed.
  const emailChanging = email.trim().toLowerCase() !== account.email.toLowerCase();

  async function handleSubmit(e) {
    e.preventDefault();
    if (saving) return;
    setError("");
    setSaved(false);
    setSaving(true);
    try {
      const updated = await updateAccount({ name, email, currentPassword: emailChanging ? currentPassword : undefined });
      setAccount(updated);
      setCurrentPassword("");
      setSaved(true);
    } catch (err) {
      setError(err.message || "Une erreur est survenue.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Card>
      <CardContent className="p-6 sm:p-8 flex flex-col gap-5">
        <h2 className="text-lg font-bold text-[var(--color-text)]">Informations du compte</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-sm">
          <Field>
            <FieldLabel htmlFor="name">Nom et prénom</FieldLabel>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </Field>

          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Field>

          {emailChanging && (
            <Field>
              <FieldLabel htmlFor="confirm-password">Mot de passe actuel</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="confirm-password"
                  type={showCurrentPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Requis pour confirmer le changement d'email"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton type="button" onClick={() => setShowCurrentPassword((v) => !v)}>
                    {showCurrentPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </Field>
          )}

          {error && <p className="text-sm text-red-600">{error}</p>}
          {saved && <p className="text-sm text-green-600">Modifications enregistrées.</p>}

          <Button type="submit" disabled={saving} className="w-fit text-white">
            {saving ? "Enregistrement…" : "Enregistrer"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

function PasswordForm({ account }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  // An OAuth-only account (signed up via Google/Apple/Facebook) has no
  // password to change — see account.password_hash being null on the
  // backend. AccountOut doesn't expose that field directly, so this card
  // just always renders; the backend rejects the change with a clear
  // message if there's nothing to compare against, surfaced as `error`.

  async function handleSubmit(e) {
    e.preventDefault();
    if (saving) return;
    setError("");
    setSaved(false);
    setSaving(true);
    try {
      await changePassword({ currentPassword, newPassword });
      setCurrentPassword("");
      setNewPassword("");
      setSaved(true);
    } catch (err) {
      setError(err.message || "Une erreur est survenue.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Card>
      <CardContent className="p-6 sm:p-8 flex flex-col gap-5">
        <h2 className="text-lg font-bold text-[var(--color-text)]">Mot de passe</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-sm">
          <Field>
            <FieldLabel htmlFor="current-password">Mot de passe actuel</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="current-password"
                type={showCurrent ? "text" : "password"}
                autoComplete="current-password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton type="button" onClick={() => setShowCurrent((v) => !v)}>
                  {showCurrent ? <EyeOff size={15} /> : <Eye size={15} />}
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </Field>

          <Field>
            <FieldLabel htmlFor="new-password">Nouveau mot de passe</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="new-password"
                type={showNew ? "text" : "password"}
                autoComplete="new-password"
                minLength={8}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton type="button" onClick={() => setShowNew((v) => !v)}>
                  {showNew ? <EyeOff size={15} /> : <Eye size={15} />}
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </Field>

          {error && <p className="text-sm text-red-600">{error}</p>}
          {saved && <p className="text-sm text-green-600">Mot de passe mis à jour.</p>}

          <Button type="submit" disabled={saving} className="w-fit text-white">
            {saving ? "Mise à jour…" : "Changer le mot de passe"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default function EspaceClientProfil() {
  return (
    <EspaceClientLayout title="Mon profil — Espace client">
      {(account, setAccount) => (
        <>
          <ProfileForm account={account} setAccount={setAccount} />
          <PasswordForm account={account} />
        </>
      )}
    </EspaceClientLayout>
  );
}
