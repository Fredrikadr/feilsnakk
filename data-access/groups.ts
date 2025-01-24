import { createClient } from "@/utils/supabase/server";

interface GroupInterface {
    name: string;
    created_by: string;
    description: string | undefined;
    is_public: boolean;
    show_pending: boolean;
    auto_approve: boolean;
}

export async function createGroup(formData: GroupInterface) {
    const supabase = await createClient();

    try {
        const { data, error } = await supabase
            .from("groups")
            .insert([
                {
                    created_by: formData.created_by,
                    name: formData.name,
                    description: formData.description,
                    is_public: formData.is_public,
                    auto_approve: formData.auto_approve,
                    show_pending: formData.show_pending,
                },
            ])
            .select()
        if (error) {
            throw error;
        }

        return data;
    } catch (error: any) {
        console.error("Error creating group.", error.message);
    }


}


export async function getGroup(groupid: string) {
    const supabase = await createClient();
    try {
        const { data: groups, error } = await supabase
            .from('groups')
            .select('*')
            .eq("id", groupid)

        if (error) {
            throw error;
        }

        return groups[0];
    } catch (error: any) {
        console.error("Error fetching group.", error.message)
    }
}

// get groups where logged in user is a member
export async function getUserGroups(userId: string) {
    const supabase = await createClient();
    try {
        const { data: groups, error } = await supabase
            .from("group_members")
            .select("groups(id, name, description)")
            .eq("user_id", userId);

        if (error) {
            throw error;
        }
        console.log(groups)
        return groups;
    } catch (error: any) {
        console.error("Error fetching users groups.", error.message)
    }
}

export async function checkUserMembership(groupid: string) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return false;
    }
    try {
        const { data, error } = await supabase
            .from("group_members")
            .select("*")
            .eq("group_id", groupid)
            .eq("user_id", user.id);

        const member = data?.[0]
        if (!member) {
            return false
        }
        if (error) {
            throw error;

        } else return true

    } catch (error: any) {
        console.error("Error checking membership in group.", error.message)
    }


}

export async function getGroupMembers(groupId: string) {
    const supabase = await createClient();
    try {
        const { data: members, error } = await supabase
            .from("group_members")
            .select("name, id")
            .eq("group_id", groupId);

        if (error) {
            throw error;
        }
        return members;
    } catch (error: any) {
        console.error("Error getting group members.", error.message)
    }
}


export async function getEntries(memberIds: number[], showPending: boolean) {
    const supabase = await createClient();

    try {

        if (showPending) {
            const { data: entries, error } = await supabase
                .from("entries")
                .select("*")
                .in("member_id", memberIds);
            if (error) {
                throw error;
            }
            return entries;
        } else {
            const { data: entries, error } = await supabase
                .from("entries")
                .select("*")
                .eq("approved", true)
                .in("member_id", memberIds);
            if (error) {
                throw error;
            }
            return entries;
        }


    } catch (error: any) {
        console.error("Error getting entries members.", error.message)
    }
}


export const addMemberToGroup = async (name: string, groupId: string) => {
    const supabase = await createClient();
    const nameCheck = await isNameAvailable(name, groupId)
    try {
        if (!nameCheck) {
            throw new Error("Name is already in use.");
        }
        const { data, error } = await supabase
            .from('group_members')
            .insert([
                {
                    name,
                    role: "member",
                    group_id: groupId,
                },
            ])
            .select()
        if (error) {
            throw error;
        }
        return data[0];
    } catch (error: any) {
        console.error("Error creating new member.", error.message)
    }
}

export const isNameAvailable = async (name: string, groupId: string) => {
    const supabase = await createClient();
    try {
        const { data, error } = await supabase
            .from("group_members")
            .select("id")
            .eq("group_id", groupId)
            .eq("name", name.toLowerCase());

        if (error) {
            throw error;
        }
        console.log(data)
        return data?.length === 0;
    } catch (error: any) {
        console.error("Error checking name availability:", error.message);
        return false;
    }
}

interface EntryInterface {
    said: string;
    meant: string;
    context: string | undefined;
    member_id: string;

}

export const addEntry = async (formData: EntryInterface) => {
    const supabase = await createClient();
    const { said, meant, context, member_id } = formData;

    try {
        const { data, error } = await supabase
            .from("entries")
            .insert([
                {
                    said,
                    meant,
                    context,
                    member_id,
                },
            ])
            .select()
        if (error) {
            throw error;
        }

        return data[0];
    } catch (error: any) {
        console.error("Error adding entry.", error.message);
    }
}