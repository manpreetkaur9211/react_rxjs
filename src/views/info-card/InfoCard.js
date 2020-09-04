import React from "react";
import "./InfoCard.css";
import PropTypes from "prop-types";

const InfoCard = ({label, value})=><div className="card"><h4>{label}</h4><p>{value}</p></div>;
InfoCard.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
};
export default InfoCard;