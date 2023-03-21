import { prisma } from "../../db/client"

export default async function postNote(req, res){
    const allNotes = await prisma.note.findMany();
     return res.status(200).json(allNotes);
}