"use server";

import { createClient } from "@/utils/supabase/server";
import { addEntry, addMemberToGroup, createGroup } from "../../data-access/groups";
import { redirect } from "next/navigation";

export const createGroupAction = async (formData: FormData) => {
    // check auth
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/sign-in");
    }

    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const is_public = formData.get("public") === "true";
    const auto_approve = formData.get("auto_approve") === "true"
    const show_pending = formData.get("show_pending") === "true"
    const created_by = user?.id;
    console.log(formData, "formdata")
    if (!name) {
        throw new Error("Name is required.");
    }

    const groupData = {
        name,
        description,
        is_public,
        auto_approve,
        show_pending,
        created_by,
    }
    console.log(groupData)

    try {
        const newGroup = await createGroup(groupData)
        console.log("group created")

    } catch (error: any) {
        console.error("Failed to create group.", error.message);
        throw new Error("Could not create group. Please try again later.");
    }

}

export const addEntryAction = async (formData: FormData, groupId: string) => {
    // check auth
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/sign-in");
    }

    const said = formData.get("said")?.toString();
    const meant = formData.get("meant")?.toString();
    const context = formData.get("context")?.toString();
    const member = formData.get("member")?.toString();

    let newMember;

    if (!member || !said || !meant) {
        throw new Error("Some required fields are missing.")
    }
    // if new member, add member to group first
    if (member == "newMember") {

        const name = formData.get("name")?.toString().toLowerCase();
        if (!name) {
            throw new Error("Name is required.")
        }
        newMember = await addMemberToGroup(name, groupId);
    }

    try {
        const newEntry = await addEntry({
            said,
            meant,
            context,
            member_id: newMember ? newMember.id : member

        })

        return newEntry[0];

    } catch (error: any) {
        console.error("Error adding new entry.", error.message);
    }
}

