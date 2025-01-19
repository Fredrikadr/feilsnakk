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
    if(!member) {
        return false
    } 
    if (error) {
        throw error;

    } else return true

    } catch(error: any) {
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

        if(error) {
            throw error;
        }
        return members;
    } catch(error: any) {
        console.error("Error getting group members.", error.message)
    }
}

