import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

function InfoBox({ title, cases, total, active, isRed, ...props }) {
  console.log(title, active);
  return (
    <Card className="infoBox">
      <CardContent>
        {/* Title i.e Coronavirus cases */}
        <Typography
          className="infoBox__title"
          color="textSecondary"
          gutterBottom
        >
          {title}
        </Typography>

        {/* +120k number ok cases */}
        <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>
          {cases}
        </h2>
        {/* 1.2M Total */}
        <Typography className="infoBox__total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
