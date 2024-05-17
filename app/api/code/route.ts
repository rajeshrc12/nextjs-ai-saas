import { auth } from "@clerk/nextjs/server";
import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { CreateChatCompletionRequestMessage } from "openai/resources/index.mjs";
import { checkSubscription } from "@/lib/subscription";

const openai = new OpenAI();

const instructionMessage: CreateChatCompletionRequestMessage = {
  role: "system",
  content:
    "You are a code generator. You must answer only in markdown code snippets. Use code comments for explainations.",
};

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    const body = await request.json();
    const { messages } = body;
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!process.env.OPENAI_API_KEY) {
      return new NextResponse("API key is required", { status: 500 });
    }
    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }
    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse("Free trial expired", { status: 403 });
    }
    const completion = await openai.chat.completions.create({
      messages: [instructionMessage, ...messages],
      model: "gpt-3.5-turbo",
    });
    if (!isPro) await increaseApiLimit();
    return NextResponse.json(completion.choices[0].message);
  } catch (error) {
    console.log("[CODE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
