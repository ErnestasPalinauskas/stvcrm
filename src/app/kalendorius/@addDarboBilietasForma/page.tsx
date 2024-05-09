// Dare Ernestas Palinauskas
// Duomenų suvedimas į duomenų bazę
"use client";

import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dbConnection from "@/app/db";
import axios from "axios";

const AddDarboBilietasForm = () => {
  const { register, handleSubmit, control } = useForm();

  const formatDateToMySQL = (date: any) => {
    date.setHours(12, 0, 0, 0);
    return date.toISOString().slice(0, 19).replace("T", " ");
  };

  const onSubmit = async (data: any) => {
    const newData = {
      ...data,
      Nuo: new Date(data.Nuo.setHours(12, 0, 0, 0)).toISOString().slice(0, 19).replace("T", " "),
      Iki: new Date(data.Iki.setHours(12, 0, 0, 0)).toISOString().slice(0, 19).replace("T", " "),
    };

    const postData = { SukureID: userData.id, ...newData };
    console.log(postData);

    try {
      const response = await axios.post("/api/darbobilietas", postData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const [userData, setUserData] = useState({
    id: "",
    userName: "",
    email: "",
    Role: "",
  });

  const UpdateUserData = async () => {
    const res = await axios.get("api/users/data");
    setUserData(res.data.data);
  };

  useEffect(() => {
    UpdateUserData();
  }, []);

  const [selectedFrom, setSelectedFrom] = React.useState<Date | null>(null);
  const [selectedTo, setSelectedTo] = React.useState<Date | null>(null);

  return (
    <div className="border-2 border-black rounded-lg p-4 bg-white text-black mt-72 mr-5">
      <div className="w-full flex flex-col">
        <h2 className="text-3xl font-bold">Pridėti darbo bilietą</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <label>Pavadinimas</label>
            <input className="border-2 border-black rounded-lg" type="text" {...register("Pavadinimas", { required: true })} />
          </div>
          <div className="flex flex-col">
            <label>Aprašymas</label>
            <input className="border-2 border-black rounded-lg" type="text" {...register("Aprasymas", { required: true })} />
          </div>
          <div className="flex flex-col ">
            <label>Nuo</label>
            <Controller
              control={control}
              name="Nuo"
              render={({ field }) => <DatePicker selected={field.value} onChange={(date) => field.onChange(date)} />}
            />
          </div>
          <div className="flex flex-col">
            <label>Iki</label>
            <Controller
              control={control}
              name="Iki"
              render={({ field }) => <DatePicker selected={field.value} onChange={(date) => field.onChange(date)} />}
            />
          </div>
          <button
            type="submit"
            style={{ backgroundColor: "rgb(34, 58, 134)" }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10"
          >
            Pridėti
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDarboBilietasForm;
