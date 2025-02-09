import { NextResponse } from "next/server";
import { saveUserToDynamoDB } from "@/app/api/dynamo/client";

export async function POST(req) {
  try {
    const data = await req.json();
    console.log("Webhook Data:", data); // Debug log

    const { username, email } = data;
    if (!username || !email) {
      console.error("Missing required fields");
      return NextResponse.json(
        { error: "Username and email are required" },
        { status: 400 }
      );
    }

    console.log(`Saving to DynamoDB: ${username} - ${email}`);
    await saveUserToDynamoDB(username, email);
    console.log("DynamoDB update successful");

    return NextResponse.json(
      { message: "User stored", username, email },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
