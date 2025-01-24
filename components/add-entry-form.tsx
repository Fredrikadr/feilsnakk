"use client"
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState } from "react";
import { SubmitButton } from "./submit-button";
import { addEntryAction } from "@/app/__actions/groupActions";

export default function AddEntryForm(props) {
    const [selected, setSelected] = useState("")
    const { members, groupId } = props;

    const handleSelected = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelected(event.target.value)
    }

    return (
        <form className="flex flex-col gap-2">
            <Label htmlFor="said">Feilsnakk*</Label>
            <Input name="said" placeholder="" required />
            <Label htmlFor="meant">Skulle si</Label>
            <Input name="meant" placeholder="" />
            <Label htmlFor="context">Kontekst</Label>
            <Input name="context" placeholder="" />
            <Label htmlFor="member">Hvem sa det?*</Label>
            <select required onChange={handleSelected} name="member">
                <option value="" >Velg</option>
                <option value="newMember" >Nytt medlem</option>
                {members && members.map((member) => (
                    <option key={member.id} value={member.id}>{member.name}</option>
                ))}
            </select>
            {selected == "newMember" && 
            <>
            <Label htmlFor="name">Navn*</Label>
            <Input name="name"></Input>
            </>
            }
            <SubmitButton formAction={(formData) => addEntryAction(formData, groupId)}>Send inn</SubmitButton>
        </form>
    )
}