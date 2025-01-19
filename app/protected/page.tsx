import { getUserGroups } from "@/data-access/groups"
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";


export default async function userDashboard() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/sign-in");
    }

    const groups = await getUserGroups(user.id)
    console.log(groups)

    return (
        <>
            <h1>Dashboard</h1>
            <div className="flex">
                {groups?.map((group, index) => (
                    <div className="p-4" key={index}>
                        <Link href={`/protected/groups/${group.groups.id}`}><p key={index}>{group.groups.name}</p></Link>
                    </div>
                ))}
            </div>

        </>

    )
}