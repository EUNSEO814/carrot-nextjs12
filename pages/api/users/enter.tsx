import { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import smtpTransport from "@libs/server/email";

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { phone, email } = req.body;
  const user = phone ? { phone } : email ? { email } : null;
  if (!user) return res.status(400).json({ ok: false });
  const payload = Math.floor(100000 + Math.random() * 900000) + "";

  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "Anonymous",
            ...user,
          },
        },
      },
    },
  });
  // console.log(token);

  if (phone) {
    /*     const message = await twilioClient.messages.create({
      messagingServiceSid: process.env.TWILIO_MSID,
      // 원래는 req.body에서 받아오는 phone에 문자를 보내는게 맞음.
      // to:phone
      to: process.env.MY_PHONE!,
      body: `Your login token is ${payload}.`,
    });
    console.log(message); */
  } else if (email) {
    /*     const mailOptions = {
      from: process.env.MAIL_ID,
      to: email,
      subject: "Nomad Carrot Authentication Email",
      text: `Authentication Code : ${payload}`,
    };
    const result = await smtpTransport.sendMail(
      mailOptions,
      (error, responses) => {
        if (error) {
          console.log(error);
          return null;
        } else {
          console.log(responses);
          return null;
        }
      }
    );
    smtpTransport.close();
    console.log(result); */
  }

  return res.json({
    ok: true,
  });
}

export default withHandler("POST", handler);

// option 3
// -----------

// const user = await client.user.upsert({
//   where: {
//     ...(phone && { phone: +phone }),
//     ...(email && { email }),
//   },
//   create: {
//     name: "Anonymous",
//     ...(phone ? { phone: +phone } : {}),
//     ...(email ? { email } : {}),
//   },
//   update: {},
// });

// option 2
//  -------------------------------
// let user;
// if (phone) {
//   user = await client.user.upsert({
//     where: {
//       phone: +phone,
//     },
//     create: {
//       name: "Anonymous",
//       phone: +phone,
//     },
//     update: {},
//   });
// }
//  else if (email) {
//   user = await client.user.upsert({
//     where: {
//       email,
//     },
//     create: {
//       name: "Anonymous",
//       email,
//     },
//     update: {},
//   });
// }

// option 1.
// -------------
// if (email) {
//   user = await client.user.findUnique({
//     where: {
//       email,
//     },
//   });
//   if (user) console.log("found it");
//   if (!user) {
//     console.log("Did not find user. will create");
//     user = await client.user.create({
//       data: {
//         name: "Anonymous",
//         email,
//       },
//     });
//   }
//   console.log(user);
// }
// if (phone) {
//   user = await client.user.findUnique({
//     where: {
//       phone: +phone,
//     },
//   });
//   if (user) console.log("found it");
//   if (!user) {
//     console.log("Did not find user. will create");
//     user = await client.user.create({
//       data: {
//         name: "Anonymous",
//         phone: +phone,
//       },
//     });
//   }
//   console.log(user);
// }
