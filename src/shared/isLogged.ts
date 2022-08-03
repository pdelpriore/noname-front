import { makeVar } from "@apollo/client";

export interface ILogged {
  isUserLogged: boolean;
}

const isLogged = makeVar(
  JSON.parse(localStorage.getItem("isLogged") as string)
);

export default isLogged;
