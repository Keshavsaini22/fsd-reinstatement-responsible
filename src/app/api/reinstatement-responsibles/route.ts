import { NextResponse } from "next/server";
import { getReinstatementResponsibles } from "./get-reinstatement-responsibles/get-reinstatement-responsibles.action";
import { newReinstatementResponsibles } from "./create-reinstatement-responsible/create-reinstatement-responsible.action";
import { AxiosError } from "axios";
import { responseCodes } from "@/app/lib/common/response-code.global";
import getErrorResponse from "@/app/lib/common/get-error-responce";

export const GET = async (request: Request) => {
  try {
    const url = new URL(request.url);
    const response = await getReinstatementResponsibles(url.search);

    if (response.status === responseCodes.NO_CONTENT) {
      return new NextResponse(null, { status: responseCodes.NO_CONTENT });
    }

    if (!response.ok) {
      return getErrorResponse(response.status, response.statusText, null);
    }
    const data = await response.json();
    return NextResponse.json(data, { status: responseCodes.SUCCESS });
  } catch (error) {
    const err = error as AxiosError;
    console.log("error: ", err);
    return getErrorResponse(responseCodes.INTERNAL_SERVER_ERROR, "Internal Server Error", null);
  }
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const response = await newReinstatementResponsibles(body);
    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    const err = error as AxiosError;
    return new Response(err?.message ?? "Something went wrong", {
      status: err?.response?.status ?? responseCodes.INTERNAL_SERVER_ERROR,
    });
  }
};
