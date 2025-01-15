import { getGroup } from "@/data-access/groups";

export default async function groupDashboard({ params }: { params: Promise<{ groupid: string }> }) {
    const groupid = (await params).groupid;
    console.log(groupid)

    console.log(await getGroup(groupid))
    return (
        <>
            <h1>hello world</h1>
        </>
    )
}