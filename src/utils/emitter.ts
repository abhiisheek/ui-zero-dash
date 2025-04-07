import { ObjectType } from "@/types";
import mitt, { Emitter } from "mitt";

const emitter: Emitter<any> = mitt();

export const emit = (event: string, data: ObjectType) => emitter.emit(event, data);

export const on = (event: string, handler: (data: ObjectType) => void) =>
  emitter.on(event, handler);
