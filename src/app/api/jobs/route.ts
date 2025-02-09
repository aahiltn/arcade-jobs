import { NextResponse } from "next/server";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { startOfDay, endOfDay } from "date-fns";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const docClient = DynamoDBDocumentClient.from(client);

export async function GET(req: Request) {
  try {
    // Extract userId from query parameters
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    // Get today's date range in ISO format
    const todayStart = startOfDay(new Date()).toISOString();
    const todayEnd = endOfDay(new Date()).toISOString();

    const command = new QueryCommand({
      TableName: "EmailSessionData",
      KeyConditionExpression:
        "userId = :userId AND #ts BETWEEN :start AND :end",
      ExpressionAttributeNames: {
        "#ts": "timestamp",
      },
      ExpressionAttributeValues: {
        ":userId": userId,
        ":start": todayStart,
        ":end": todayEnd,
      },
    });

    const { Items: todaysEmails = [] } = await docClient.send(command);
    const todaysEmailCount = todaysEmails.length;

    // Query all emails sorted by recency
    const allEmailsCommand = new QueryCommand({
      TableName: "EmailSessionData",
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": userId,
      },
      ScanIndexForward: false, // Sort by timestamp DESC (most recent first)
    });

    const { Items: allEmails } = await docClient.send(allEmailsCommand);

    return NextResponse.json({
      emails: allEmails,
      todaysEmailCount,
    });
  } catch (error) {
    console.error("Error fetching email session data:", error);
    return NextResponse.json(
      { error: "Failed to fetch email session data" },
      { status: 500 }
    );
  }
}
