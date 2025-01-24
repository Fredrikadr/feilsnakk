import { addEntryAction } from "@/app/__actions/groupActions";
import AddEntryForm from "@/components/add-entry-form";
import EntriesTable from "@/components/entries-table";
import { DropdownMenu, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addMemberToGroup, checkUserMembership, getEntries, getGroup, getGroupMembers, getUserGroups, isNameAvailable } from "@/data-access/groups";
import { Item } from "@radix-ui/react-dropdown-menu";

export default async function groupDashboard({ params }: { params: Promise<{ groupid: string }> }) {
    const groupId = (await params).groupid;
    const isMember = await checkUserMembership(groupId);
    if (!isMember) {
        return (
            <h2>You're not a member of this group.</h2>
        )
    }
    const group = await getGroup(groupId)
    const { show_pending } = group;

    const members = await getGroupMembers(groupId);

    const memberIds: number[] = members?.map((member) => member.id) || []
    const entries = show_pending ? await getEntries(memberIds, true) : await getEntries(memberIds, false);
    // console.log(group)
    // console.log(show_pending)
    // console.log(members)
    console.log(entries)

    return (
        <>

            <h1>{group.name}</h1>
            <AddEntryForm members={members} groupId={groupId} />
            <EntriesTable entries={entries} members={members} />
        </>
    )
}