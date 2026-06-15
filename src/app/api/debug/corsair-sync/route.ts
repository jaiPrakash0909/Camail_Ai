// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// import { corsair } from "@/lib/corsair";

// export async function GET() {
//   const userId = "cmqcrr8oy0000q0dk6hunmqxp"; // current user id

//     const account = await prisma.account.findFirst({
//     where: {
//         userId,
//         provider: "google"
//     }
//     });

//     if (!account) {
//     return NextResponse.json({ error: "No Google account found" });
//     }

//     await corsair.keys.gmail.set_client_id(
//     process.env.GOOGLE_CLIENT_ID!
//     );

//     await corsair.keys.gmail.set_client_secret(
//     process.env.GOOGLE_CLIENT_SECRET!
//     );

//     await corsair
//     .withTenant(userId)
//     .gmail
//     .keys
//     .set_access_token(account.access_token!);

//     await corsair
//     .withTenant(userId)
//     .gmail
//     .keys
//     .set_refresh_token(account.refresh_token!);

// // calander


// await corsair.keys.googlecalendar.set_client_id(
//   process.env.GOOGLE_CLIENT_ID!
// );

// await corsair.keys.googlecalendar.set_client_secret(
//   process.env.GOOGLE_CLIENT_SECRET!
// );

// await corsair
//   .withTenant(userId)
//   .googlecalendar
//   .keys
//   .set_access_token(account.access_token!);

// await corsair
//   .withTenant(userId)
//   .googlecalendar
//   .keys
//   .set_refresh_token(account.refresh_token!);




//     return NextResponse.json({
//     success: true
//     });
// }