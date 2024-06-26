"use client";
import React from "react";
import FormField from "./formField";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { DatePickerWithRange } from "@/components/dateRangePicker";
import DragImageArea from "@/components/dragImageArea";
import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";

interface PageProps {
  // Add any props you need for your page here
}

type State = {
  selectedFile: any;
  dragging: boolean;
};

type Action =
  | { type: "SET_FILE"; file: any }
  | { type: "START_DRAG" }
  | { type: "STOP_DRAG" };

const Page: React.FC<PageProps> = () => {
  const [projectName, setProjectName] = React.useState("");
  const [projectOverview, setProjectOverview] = React.useState("");
  const [projectDescription, setProjectDescription] = React.useState("");
  const [youtubeLink, setYoutubeLink] = React.useState("");
  const [date, setDate] = React.useState<DateRange>({
    from: new Date(),
    to: addDays(new Date(), 20),
  });
  const [state, dispatch] = React.useReducer(reducer, {
    selectedFile: null,
    dragging: false,
  });

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: projectName,
          overview: projectOverview,
          youtubeLink,
          description: projectDescription,
          date,
          imageFile: state.selectedFile,
        }),
      });

      if (res.ok) {
        console.log("Project submitted successfully!");
        console.log(res);
        //empty the form
        setProjectName("");
        setProjectOverview("");
        setProjectDescription("");
        setYoutubeLink("");
        setDate({ from: new Date(), to: addDays(new Date(), 20) });
        dispatch({ type: "SET_FILE", file: null });
      } else {
        throw new Error("Failed to submit project. Please try again later.");
      }
    } catch (error) {
      console.error("2 An error occurred while submitting the project:", error);
    }
  };
  return (
    <>
      <div className="p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <div className="bg-gray-50 rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600 flex flex-col justify-between">
                  <div>
                    <p className="font-medium text-lg">Project Details</p>
                    <p>Please fill out all the fields.</p>
                  </div>
                  <button
                    className="bg-green-900 hover:bg-green-700 text-center text-white font-bold py-2 px-4 rounded w-1/2"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>

                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-3 text-sm grid-cols-1 md:grid-cols-5">
                    <FormField
                      label="Project Name"
                      name="full_name"
                      placeholder="Project Name"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                    />
                    <FormField
                      label="Project Overview"
                      name="email"
                      placeholder="Overview"
                      value={projectOverview}
                      onChange={(e) => setProjectOverview(e.target.value)}
                    />
                    <FormField
                      label="Youtube Link"
                      name="address"
                      placeholder="Youtube Link"
                      value={youtubeLink}
                      onChange={(e) => setYoutubeLink(e.target.value)}
                    />

                    <div className="md:col-span-5">
                      <Label htmlFor="textarea">Project Description</Label>
                      <Textarea
                        name="textarea"
                        value={projectDescription}
                        onChange={(e) => setProjectDescription(e.target.value)}
                        id="textarea"
                        rows={5}
                        placeholder="Project Description"
                      />
                    </div>

                    <div className="md:col-span-5">
                      <Label htmlFor="file-upload">Project Image</Label>
                      <DragImageArea state={state} dispatch={dispatch} />
                    </div>

                    <div className="md:col-span-2 mt-7">
                      <Label htmlFor="date">Date From - To</Label>
                      <div className="md:col-span-5">
                        <DatePickerWithRange value={date} onChange={setDate} />
                      </div>
                    </div>
                    {/* add submit button */}
                    {/* <div className="md:col-span-5 flex justify-center">
                      <button className="bg-green-900 hover:bg-green-700 text-right text-white font-bold py-2 px-4 rounded">
                        Submit
                      </button>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;

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
