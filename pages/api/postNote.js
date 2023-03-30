import { authOptions } from './auth/[...nextauth]';
import { getServerSession } from 'next-auth/next';
import { prisma } from '../../db/client';

export default async function postNote(req, res) {
  const { method } = req;
  const { title, content, author } = req.body;

  const session = await getServerSession(req, res, authOptions);
  console.log(session);

  if (method != 'POST')
    return res.status(405).end(`Method ${method} Not Allowed.`);

  if (!session) return res.status(401).end(`Unauthorized Route.`);

  const note = await prisma.note.create({
    data: {
      title: title,
      note: content,
      author: author,
      userId: session.user.uuid,
    },
  });

  // send the post object back to the client
  return res.status(201).json(note);
}
