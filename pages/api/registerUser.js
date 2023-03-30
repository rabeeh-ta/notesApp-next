import { prisma } from '@/db/client';
import bcrypt from 'bcrypt';

export default function registerUser(req, res) {
  const { method } = req;
  const { name, email, password } = req.body;
  const saltRounds = 10;

  // only allow POST requests to this route
  if (method != 'POST')
    return res.status(405).end(`Method ${method} Not Allowed`);

  bcrypt.hash(password, saltRounds, async (err, hash) => {
    try {
      const user = await prisma.user.create({
        data: {
          name: name,
          email: email,
          passwordHash: hash,
        },
      });

      delete user.passwordHash; // don't send the hashed password back.
      return res.status(200).end(JSON.stringify(user));
    } catch (e) {
      console.log(e.code);
      return res
        .status(501)
        .end(JSON.stringify({ error: 'email not unique', code: e.code }));
    }
  });
}
