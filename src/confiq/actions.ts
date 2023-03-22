import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosInstance } from "./axiosConfig";

export const fetchUsers: any = createAsyncThunk(
  "users/fetchByIdStatus",
  async () => {
    const response = await axiosInstance.get("user");
    return response.data;
  }
);

export const fetchApplications:any = createAsyncThunk(
  "users/fetchApplications",
  async () => {
    const resp = await axiosInstance.get("/user/applications");
    return resp
  }
)

export const fetchOfferLists:any = createAsyncThunk(
  "users/fetchOfferLists",
  async (url:string) => {
    return {
      data: [
        {
          "bank": "Axis",
          "bank_logo": "https://upload.wikimedia.org/wikipedia/commons/1/1a/Axis_Bank_logo.svg",
          "interest_rate": 10,
          "tenure": 20
        },
        {
          "bank": "Bandhan",
          "bank_logo": "https://upload.wikimedia.org/wikipedia/commons/a/a0/Bandhan_Bank_Svg_Logo.svg",
          "interest_rate": 11.5,
          "tenure": 15
        },
        {
          "bank": "ICICI",
          "bank_logo": "https://upload.wikimedia.org/wikipedia/commons/1/12/ICICI_Bank_Logo.svg",
          "interest_rate": 13.25,
          "tenure": 17.5
        },
        {
          "bank": "SBI",
          "bank_logo": "https://upload.wikimedia.org/wikipedia/commons/c/cc/SBI-logo.svg",
          "interest_rate": 11.15,
          "tenure": 22
        },
        {
          "bank": "HDFC",
          "bank_logo": "https://upload.wikimedia.org/wikipedia/commons/2/28/HDFC_Bank_Logo.svg",
          "interest_rate": 10.925,
          "tenure": 18
        }
      ]
    }}
)
