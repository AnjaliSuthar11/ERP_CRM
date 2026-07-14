import {NextResponse} from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req){
    try{
        await connectDB();

        const body = await req.json();

        const {
            firstName,lastName,email,password,phone
        } = body;

        if(!firstName || !lastName || !email || !password)
            {
            return NextResponse.json({
                success:false,
                message:"All fields are required"
            },{
                status:400,
            }
        )
        }

        const exists = await User.findOne({
            email,
        });

        if(exists){
            return NextResponse.json({
                success:false,
                message:"user already exists"
            },
        {
            status:400
        }
    );
        }
        const hashedPassowrd = await bcrypt.hash(password,10);
    }
}