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