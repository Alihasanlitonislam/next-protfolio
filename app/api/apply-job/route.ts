import { NextResponse } from "next/server";
import getClientPromise from "@/utils/mongodb";
import { ObjectId } from "mongodb";
import { EditApplicationSchema, JopApplySchema } from "@/schema/JopApply";


const databaseName = process.env.MONGODB_DB || "portfolio";
const collectionName = "job_applications";


export async function GET() {
  try {

    const client = await getClientPromise();
    const collection = client.db(databaseName).collection(collectionName);

    const data = await collection.find({}).sort({ created_at: -1 }).toArray();

    return NextResponse.json(
      data.map((item) => ({
        id: item._id.toString(),
        position: item.position,
        company_name: item.company_name,
        company_link: item.company_link,
        source_link: item.source_link,
        location: item.location,
        post_source: item.post_source,
        interview_status: item.interview_status,
        status: item.status,
        created_at: item.created_at,
      })),
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch job data.";

    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {

    const body = await req.json();
    const validation = JopApplySchema().safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          message: "Invalid application data.",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const client = await getClientPromise();
    const collection = client.db(databaseName).collection(collectionName);

    const payload = {
      ...validation.data,
      created_at: new Date().toISOString(),
    };

    const result = await collection.insertOne(payload);

    return NextResponse.json(
      {
        message: "Application submitted successfully.",
        data: {
          id: result.insertedId.toString(),
          ...payload,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to submit application.";

    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "A valid application id is required." },
        { status: 400 },
      );
    }

    const client = await getClientPromise();
    const collection = client.db(databaseName).collection(collectionName);
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (!result.deletedCount) {
      return NextResponse.json(
        { message: "Application not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      message: "Application deleted successfully.",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to delete application.";

    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "A valid application id is required." },
        { status: 400 },
      );
    }

    const body = await req.json();
    const validation = EditApplicationSchema().safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          message: "Invalid application data.",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const client = await getClientPromise();
    const collection = client.db(databaseName).collection(collectionName);
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...validation.data,
          updated_at: new Date().toISOString(),
        },
      },
    );

    if (!result.matchedCount) {
      return NextResponse.json(
        { message: "Application not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      message: "Application updated successfully.",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update application.";

    return NextResponse.json({ message }, { status: 500 });
  }
}
