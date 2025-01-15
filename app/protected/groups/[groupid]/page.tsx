import { checkUserMembership, getGroup } from "@/data-access/groups";

export default async function groupDashboard({ params }: { params: Promise<{ groupid: string }> }) {
    const groupId = (await params).groupid;
    const isMember = await checkUserMembership(groupId);
    
    if (!isMember) {
        return (
            <h2>You're not a member of this group.</h2>
        )
    }
    const groupInfo = await getGroup(groupId)


    return (
        <>
            <h1>hello world</h1>
        </>
    )
}