import { NextResponse } from "next/server";
import { setStatusActive } from "./set-status-activate/set-status-activate.action";
import { setStatusInActive } from "./set-status-deactivate/set-status-deactivate.action";
import { AxiosError } from "axios";
import { responseCodes } from "@/app/lib/common/response-code.global";

export const PATCH = async (request: Request, context: any) => {
  try {
    const body = await request.json();
    const uuid = context.params.uuid;
    let response: any;
    if (body.is_active === true) {
      response = await setStatusActive(uuid);
    } else if (body.is_active === false) {
      response = await setStatusInActive(uuid);
    }
    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    const err = error as AxiosError;
    return new Response(err?.message ?? "Something went wrong", {
      status: err?.response?.status ?? responseCodes.INTERNAL_SERVER_ERROR,
    });
  }
};
