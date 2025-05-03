
import React from "react";


import {
  Typography,
  Card,
  CardBody,
} from "@material-tailwind/react";

const AnalyticsCard = ({
    title,
    count
  }) => {
    return (
      <Card className="shadow-sm border border-gray-200 !rounded-lg">
        <CardBody className="p-4">
          <div className="flex justify-between items-center">
            <Typography
              className="!font-medium !text-xs text-gray-600"
            >
              {title}
            </Typography>
          </div>
          <Typography
            color="blue-gray"
            className="mt-1 font-bold text-2xl"
          >
            {count}
          </Typography>
        </CardBody>
      </Card>
    );
  }
  
  export default AnalyticsCard;