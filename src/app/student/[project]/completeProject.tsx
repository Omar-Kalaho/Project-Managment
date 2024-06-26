"use client";
import DragImageArea from "@/components/dragImageArea";
import React, { useState } from "react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Dialog } from "@radix-ui/react-dialog";

type State = {
  selectedFile: any;
  dragging: boolean;
};

type Action =
  | { type: "SET_FILE"; file: any }
  | { type: "START_DRAG" }
  | { type: "STOP_DRAG" };

const CompleteProject = () => {
  const [state, dispatch] = React.useReducer(reducer, {
    selectedFile: null,
    dragging: false,
  });

  const [state2, dispatch2] = React.useReducer(reducer2, {
    selectedFile: null,
    dragging: false,
  });

return(
  <Drawer>
    <DrawerTrigger asChild>
      <button className=" bg-green-950 bg-opacity-90 text-white px-4 py-4 rounded-lg hover:bg-opacity-70 transition-colors duration-200 w-full ">
        {" "}
        Complete My Project
      </button>
    </DrawerTrigger>
    <DrawerContent>
      <DrawerClose asChild>
        <button className="absolute top-7 right-2 text-red-700">Close</button>
      </DrawerClose>
      <DrawerHeader>
        <DrawerTitle className="text-green-900 text-xl">
          Complete Your Project
        </DrawerTitle>
      </DrawerHeader>
      <div className="flex gap-5 px-2 h-[40vh]">
        <div className="basis-1/2 h-4/5 ">
          <DrawerDescription>Upload photos of your project</DrawerDescription>
          <DragImageArea state={state} dispatch={dispatch} />
        </div>
        <div className="basis-1/2  h-4/5">
          <DrawerDescription>Upload file of the results of your project</DrawerDescription>
          <DragImageArea state={state2} dispatch={dispatch2} />
        </div>
      </div>

      <DrawerFooter>
        <button className="bg-green-900 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors duration-200 w-1/3 m-auto">
          Submit
        </button>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
);
};
export default CompleteProject;

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_FILE":
      return { ...state, selectedFile: action.file };
    case "START_DRAG":
      return { ...state, dragging: true };
    case "STOP_DRAG":
      return { ...state, dragging: false };
    default:
      return state;
  }
}

function reducer2(state2: State, action: Action): State {
    switch (action.type) {
      case "SET_FILE":
        return { ...state2, selectedFile: action.file };
      case "START_DRAG":
        return { ...state2, dragging: true };
      case "STOP_DRAG":
        return { ...state2, dragging: false };
      default:
        return state2;
    }
  }
