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
