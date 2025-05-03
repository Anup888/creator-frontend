import React from "react";
// import dynamic from "next/dynamic";



// @material-tailwind/react
import {
  Button,
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Input,
} from "@material-tailwind/react";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  DocumentMagnifyingGlassIcon,
  FlagIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";


const TABLE_HEAD = [
  {
    head: "Full Name",
    customeStyle: "!text-left",
  },
  {
    head: "Credits",
    customeStyle: "text-right",
  },
  {
    head: "Post Shared",
    customeStyle: "text-right",
  },
  {
    head: "Post Reported",
    customeStyle: "text-right",
  },
  {
    head: "Post Saved",
    customeStyle: "text-right",
  },
  {
    head: "Total Activities",
    customeStyle: "text-right",
  },
];

const TableCard =({userData})=> {

  return (
    <section className="m-10">
      <Card className="h-full w-full">
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none flex flex-wrap gap-4 justify-between mb-4"
        >
          <div>
            <Typography variant="h6" color="blue-gray">
              User Overview
            </Typography>
            <Typography
              variant="small"
              className="text-gray-600 font-normal mt-1"
            >
              View user based different Activities performed.
            </Typography>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll !px-0 py-2">
          <table className="w-full min-w-max table-auto">
            <thead>
              <tr>
                {TABLE_HEAD.map(({ head, customeStyle }) => (
                  <th
                    key={head}
                    className={`border-b border-gray-300 !p-4 pb-8 ${customeStyle}`}
                  >
                    <Typography
                      color="blue-gray"
                      variant="small"
                      className="!font-bold"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {userData.map(
                (
                  {
                    img,
                    fullName,
                    email,
                    credits,
                    postShared,
                    postReported,
                    postSaved,
                    totalActivities,
                  },
                  index
                ) => {
                  const isLast = index === userData.length - 1;
                  const classes = isLast
                    ? "!p-4"
                    : "!p-4 border-b border-gray-300";
                  return (
                    <tr key={fullName}>
                      <td className={classes}>
                        <div className="flex items-center gap-4 text-left">
                          <img
                            src={img}
                            alt={fullName}
                            className="border rounded-md p-1 h-10 w-10"
                          />
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="!font-semibold"
                            >
                              {fullName}
                            </Typography>
                            <Typography
                              variant="small"
                              className="!font-normal text-gray-600"
                            >
                              {email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="!font-normal text-gray-600 text-right"
                        >
                          {credits}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                        //   color={color}
                          className="!font-bold text-right"
                        >
                          {postShared}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="!font-normal text-gray-600 text-right"
                        >
                          {postReported}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="!font-normal text-gray-600 text-right"
                        >
                          {postSaved}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="!font-normal text-gray-600 text-right"
                        >
                          {totalActivities}
                        </Typography>
                      </td>
                      {/* <td className={classes}>
                        <div className="flex justify-end gap-4">
                          <IconButton variant="text" size="sm">
                            <DocumentMagnifyingGlassIcon className="h-5 w-5 text-gray-900" />
                          </IconButton>
                          <IconButton variant="text" size="sm">
                            <FlagIcon className="h-5 w-5 text-gray-900" />
                          </IconButton>
                        </div>
                      </td> */}
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </section>
  );
}

export default TableCard;
