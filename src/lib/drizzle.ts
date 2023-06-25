// to implement table creation logic here
import {serial,varchar,timestamp,date,pgTable,integer, boolean, text} from 'drizzle-orm/pg-core';

import {sql} from '@vercel/postgres';
import {drizzle} from 'drizzle-orm/vercel-postgres'

export const myuser = pgTable('my_users',{
    user_id: serial('user_id').primaryKey(),
    user_name: varchar('user_name',{
        length: 200
    }),
    email: varchar('email',{
        length: 500
    }),
    gender: varchar('gender',{
        length: 20
    }),
    contact_no: varchar('contact_no',{
        length: 200
    }),
    address: varchar('address',{
        length: 1000
    }),
    profile_image_name: varchar('profile_image_url',{
        length: 200
    }),
    city_id: integer('city_id'),
    dob: date('dob',{mode: 'string'}),
    skills: text('skills').array()
});

export const db = drizzle(sql);