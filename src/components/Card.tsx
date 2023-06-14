"use client";
import * as React from "react";
import { Button } from "../components/ui/button";
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

type city = {
  city_id: number;
  city_name: string;
};

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
  return (
    <div className="flex items-center p-10 justify-center mt-5 ">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create User</CardTitle>
          <CardDescription>
            input all details to create user
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="user_name">User Name</Label>
                <Input id="user_name" placeholder="input your User Name" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="input your email" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="contact_no">Contact No.</Label>
                <Input id="contact_no" placeholder="input your Contact No." />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" placeholder="input your Address" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="city_id">City</Label>
                <Select>
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
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="ghost">Cancel</Button>
          <Button>Submit</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
