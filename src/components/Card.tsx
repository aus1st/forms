"use client";
import * as React from "react";
import { Button } from "../components/ui/button";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "../lib/utils";
import { Calendar } from "../components/ui/calendar";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Textarea } from "./ui/textarea";
import { SubmitHandler, useForm, useController } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { user } from "../models/user";

import { useState } from "react";

type city = {
  city_id: number;
  city_name: string;
};

const skills = [
  { skillId: "NextJs", skillName: "NextJs" },
  { skillId: "TypeScript", skillName: "TypeScript" },
  { skillId: "TailwindCss", skillName: "TailwindCss" },
  { skillId: "SQL", skillName: "SQL" },
] as const;

const cities: city[] = [
  {
    city_id: 1,
    city_name: "Karachi",
  },
  {
    city_id: 2,
    city_name: "Lahore",
  },
  {
    city_id: 3,
    city_name: "Islamabad",
  },
  {
    city_id: 4,
    city_name: "Peshawar",
  },
  {
    city_id: 5,
    city_name: "Karachi",
  },
];

export function CardForm() {
  const [image, setImage] = useState<File|null>(null);
  const [createObjectURL, setCreateObjectURL] = useState<string|null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm<user>();
  const { field: select } = useController({ name: "city_id", control });
  const { field: radio } = useController({ name: "gender", control });
  const { field: calender } = useController({ name: "dob", control });
  const { field: cbx } = useController({ name: "skills", control });
//console.log(watch("profile_image_name"));

  const onSubmit: SubmitHandler<user> = async (data) => {
    console.log(data);
    //  const body = new FormData();
    //  body.append('file',image as Blob);
    //  body.append('myUser',JSON.stringify(data));
    //console.log(body)
    const response = await fetch('api/user',{
      method: 'POST',
    //   headers: {
    //     "content-type": "multipart/form-data"
    // },
      body: JSON.stringify(data)
    });

  console.log(response);
return response;
  }
  //console.log(watch("city_id"))
  //console.log(cbx);

const handleChange = (e: React.ChangeEvent<HTMLInputElement> )=>{
  e.preventDefault();
  console.log(e.target.files==null?'':e.target.files[0])
  const i = e.target.files==null?undefined:e.target.files[0];
  if(i==null) {

  } else {
   setImage(i)
    setCreateObjectURL(URL.createObjectURL(i))
  }
  
}


  return (
    <div className="flex items-center p-10 justify-center mt-5 ">
      <form onSubmit={handleSubmit(onSubmit)} className="sm:w-1/2 w-[350px]">
        <Card>
          <CardHeader>
            <CardTitle>Create User</CardTitle>
            <CardDescription>input all details to create user</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full sm:grid-cols-2 grid-cols-1 items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="user_name">User Name</Label>
                <Input
                  {...register("user_name", {
                    required: "User name is Rquired",
                  })}
                  id="user_name"
                  placeholder="input your User Name"
                />
                <p>{errors.user_name?.message}</p>
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register("email", { required: "Email is required" })}
                  placeholder="input your email"
                />
                <p>{errors.email?.message}</p>
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="contact_no">Contact No.</Label>
                <Input
                  {...register("contact_no")}
                  placeholder="input your Contact No."
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="city_id">City</Label>
                <Select onValueChange={select.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                    <SelectContent position="popper">
                      {cities.map((c) => (
                        <SelectItem
                          value={c.city_id.toString()}
                          key={c.city_id}
                        >
                          {c.city_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectTrigger>
                </Select>
              </div>

              <div>
                <RadioGroup onValueChange={radio.onChange} defaultValue="male">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="contact_no">Date of Birth</Label>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !calender.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {calender.value ? (
                        format(calender.value, "yyyy-MM-dd")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={calender.value}
                      onSelect={calender.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="sm:col-span-2 mt-5">
                <div className="flex sm:flex-row sm:items-center flex-col">
                  <Label htmlFor="contact_no" className="font-bold text-md">
                    Skills
                  </Label>
                  {skills.map((c) => (
                    <Label
                      key={c.skillId}
                      htmlFor="skills"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 mr-2 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        {...register("skills")}
                        value={c.skillId}
                      />
                      {c.skillName}
                    </Label>
                  ))}
                </div>
              </div>


              <div className="sm:col-span-2 mt-5">
               <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="address">Upload Profile Image</Label>
                  <Input {...register('profile_image_name')} onChange={(e)=>handleChange(e)} type="file" />
                </div>
                </div> 


              <div className="sm:col-span-2">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    {...register("address")}
                    id="address"
                    placeholder="input your Address"
                  />
                </div>
              </div>
            
                  

            </div>
          </CardContent>
          <CardFooter className="flex sm:justify-end justify-around">
            <Button variant="ghost">Cancel</Button>
            <Button type="submit">Submit</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
