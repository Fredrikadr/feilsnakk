import { SubmitButton } from "@/components/submit-button";
import FetchDataSteps from "@/components/tutorial/fetch-data-steps";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createGroup } from "../data-access/groups";
import { createGroupAction } from "../actions/groupActions";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
          <InfoIcon size="16" strokeWidth={2} />
          This is a protected page that you can only see as an authenticated
          user
        </div>
      </div>
      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-2xl mb-4">Your user details</h2>
        <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
      <div>
        <h2 className="font-bold text-2xl mb-4">Next steps</h2>
        <FetchDataSteps />
      </div>
      <form className="flex flex-col min-w-64 max-w-64 mx-auto">
        <h1 className="text-2xl font-medium">Sign up</h1>
        <p className="text-sm text text-foreground">
          Opprett Feilsnakk-gruppe
        </p>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="name">Gruppenavn*</Label>
          <Input name="name" placeholder="" required />
          <Label htmlFor="description">Gruppebeskrivelse</Label>
          <textarea rows={4} name="description" placeholder="Beskriv gruppen" />
          <Label htmlFor="public">Gruppevisning</Label>
          <select defaultValue={"true"} name={"public"}>
            <option value={"true"}>Offentlig</option>
            <option value={"false"}>Privat</option>
          </select>
          <Label htmlFor="public">Godkjenn feilsnakk automatisk</Label>
          <select defaultValue={"true"} name={"auto_approve"}>
            <option value={"true"}>Ja</option>
            <option value={"false"}>Nei</option>
          </select> 
          <Label htmlFor="public">Vis feilsnakk som venter på godkjenning</Label>
          <select defaultValue={"true"} name={"show_pending"}>
            <option value={"true"}>Ja</option>
            <option value={"false"}>Nei</option>
          </select>
          
          <SubmitButton formAction={createGroupAction} pendingText="Oppretter gruppe...">
            Opprett gruppe
          </SubmitButton>

        </div>
      </form>
    </div>
  );
}
