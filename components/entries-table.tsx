"use client"

import { useState } from "react"

export default function EntriesTable(props) {
    const [selected, setSelected] = useState("");
    const { entries, members } = props;


    console.log(entries)
    console.log(members)
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Feilsnakk</th>
                        <th>Skulle si</th>
                        <th>Kontekst</th>
                    </tr>

                </thead>
                <tbody>
                    {entries && entries.map((entry) => (
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