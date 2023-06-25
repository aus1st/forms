import { NextRequest, NextResponse } from "next/server";
import fs from 'fs'
import formidable from 'formidable';
import { db, myuser } from "@/src/lib/drizzle";
import { user } from "@/src/models/user";
import { error } from "console";

export async function POST(request: NextRequest) {
    try {
        console.log('request received at api');
        const req = await request.json();

        const {
            user_id,
            user_name,
            email,
            gender,
            contact_no,
            address,
            profile_image_name,
            city_id,
            dob,
            skills}: user = req;
            console.log('dob at api', dob)
        // console.log('saving file')    
        // const form = new formidable.IncomingForm()

        // form.parse(req, (err, fields, files)=>{
        // console.log(fields)
        // console.log(files);
        //     saveFile(files.file);
        // })
        console.log('sending rqst to db');
        const res = await db.insert(myuser).values({
            user_id: user_id,
            user_name: user_name,
            email: email,
            gender: gender,
            contact_no: contact_no,
            address: address,
            profile_image_name: profile_image_name,
            city_id: city_id,
            dob: dob,
            skills: skills
            // user_name: user_name,
            // email: email,
            // gender: gender,
            // contact_no: contact_no,
            // ADDRESS: address,
            // profile_image_name: profile_image_name,
            // city_id: city_id,
            // dob: dob,
            // skills: skills.map(s=>(s+','))
        }).returning();
        console.log('response', res)
        return NextResponse.json(res);

    } catch (error) {
        
    } return NextResponse.json({Error: 'something went wrong'})
}

const saveFile = async (file: any)=>{
    console.log('in saveFile')
    const data =  fs.readFileSync(file.path);
    fs.writeFileSync(`./public/images/${file.name}`,data);
    fs.unlinkSync(file.path);
}