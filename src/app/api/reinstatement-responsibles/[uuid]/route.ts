import { NextResponse } from "next/server";
import { deleteReinstatementResponsibles } from "./delete-reinstatement-responsible/delete-reinstatement-responsible.action";
import { editReinstatementResponsibles } from "./edit-reinstatement-responsible/edit-reinstatement-responsible.action";
import { AxiosError } from "axios";
import { responseCodes } from "@/app/lib/common/response-code.global";

export const PUT = async (request: Request, context: { params: { uuid: string } }) => {
  try {
    const body = await request.json();
    const uuid = context.params.uuid;
    const response = await editReinstatementResponsibles(uuid, body);
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const err = error as AxiosError;
    return new Response(err?.message ?? "Something went wrong", {
      status: err?.response?.status ?? responseCodes.INTERNAL_SERVER_ERROR,
    });
  }
};

export const DELETE = async (request: Request, context: { params: { uuid: string } }) => {
  try {
    const uuid = context.params.uuid;
    const response = await deleteReinstatementResponsibles(uuid);
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const err = error as AxiosError;
    return new Response(err?.message ?? "Something went wrong", {
      status: err?.response?.status ?? responseCodes.INTERNAL_SERVER_ERROR,
    });
  }
};
