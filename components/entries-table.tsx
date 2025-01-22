"use client"

import { useEffect, useState } from "react"

export default function EntriesTable(props) {
    const [selected, setSelected] = useState("");
    const { entries, members } = props;
    const [filteredEntries, setFilteredEntries] = useState("")

    useEffect(() => {
        if(!selected) {
            setSelected(members[0])
        }

        const newEntries = entries.filter((entry) => entry.member_id === selected.id)
        setFilteredEntries(newEntries)

    }, [selected])

   
    console.log(filteredEntries, "filtered entries")
    console.log(entries)

    return (
        <>
            <div>
                {members && members.map((member) => (
                    <button key={member.id} onClick={() => setSelected(member)}>{member.name}</button>
                ))}
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Feilsnakk</th>
                        <th>Skulle si</th>
                        <th>Kontekst</th>
                    </tr>

                </thead>
                <tbody>
                    {filteredEntries && filteredEntries.map((entry) => (
                        <tr key={entry.id}>
                            <td>{entry.said}</td>
                            <td>{entry.meant}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}