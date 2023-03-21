import { prisma } from "../../db/client"

export default async function postNote(req, res){
    const {method} = req;
    const {title, content} = req.body
    if(method != 'POST')
       return  res.status(405).end(`Method ${method} Not Allowed`);

    const note = await prisma.note.create({
        data:{
            title: title,
            note: content
        }
    })
    
     // send the post object back to the client
     return res.status(201).json(note);
    
}