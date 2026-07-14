import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request) {

    const token = request.cookies.get("token")?.value;

    const pathname = request.nextUrl.pathname;

    if (
        pathname.startsWith("/login")
    ) {

        if(token){

            try{

                const decoded = jwt.verify(
                    token,
                    process.env.JWT_SECRET
                );

                return NextResponse.redirect(
                    new URL(
                        `/dashboard/${decoded.role.toLowerCase().replace("_","-")}`,
                        request.url
                    )
                );

            }catch{}
        }

        return NextResponse.next();
    }

    if(pathname.startsWith("/dashboard")){

        if(!token){

            return NextResponse.redirect(
                new URL("/login",request.url)
            );

        }

        try{

            jwt.verify(
                token,
                process.env.JWT_SECRET
            );

            return NextResponse.next();

        }catch{

            return NextResponse.redirect(
                new URL("/login",request.url)
            );

        }

    }

    return NextResponse.next();

}

export const config = {
    matcher:[
        "/login",
        "/dashboard/:path*"
    ]
}