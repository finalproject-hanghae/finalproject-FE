import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React from "react";
import styled from "styled-components";
import { devices } from "../../../device";
import { RowFlexDiv } from "../../../style/styled";
import { useParams } from "react-router-dom";
import { loadDrugDataMW } from "../../../redux/modules/drugs";
import { drugApi } from "../../../api/basicAPI";

const SingleDrugLine = ({ val, idx }) => {
  const username = useParams().username;
  const dispatch = useDispatch();

  const clickToCheckDrug = () => {
    const data = {
      productName: val.productName,
      usedAt: new Date().toISOString(),
      done: true,
    }
    drugApi.apiDrugCheck(data)
    .then((res) => dispatch(loadDrugDataMW(username)));
  }

  return (
    <SingleDrugLineBox style={{ backgroundColor: val.done ? "none" : "none" }}>
      <ColorAndDrugName>
        <div
          style={{
            backgroundColor: val.customColor,
          }}
        />
        <span>
          {val.productName.length > 13
            ? val.productName.substring(0, 11) + "..."
            : val.productName}
        </span>
      </ColorAndDrugName>
      <label htmlFor={"didEat" + idx}>
        {val.done ? (
          <FontAwesomeIcon icon={faCheck} size={"1x"} color={"#f98532"} />
        ) : null}
        <input
          id={"didEat" + idx}
          type={"checkbox"}
          defaultChecked={val.done ? true : false}
          disabled={val.done ? true : false}
          onClick={clickToCheckDrug}
        />
      </label>
    </SingleDrugLineBox>
  );
};

const ColorAndDrugName = styled(RowFlexDiv)`
  div {
    width: 29px;
    height: 29px;
    border-radius: 100%;
    margin-right: 10px;
  }
  span {
    font-size: 20px;
    margin-right: 10px;
  }
`;
const SingleDrugLineBox = styled(RowFlexDiv)`
  justify-content: space-between;
  align-items: center;
  width: 50%;
  margin: 5px 0px;
  padding: 5px;
  label {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 20px;
    height: 20px;
    background-color: #fff;
    border: solid 1px #f98532;
    border-radius: 4px;
    cursor: pointer;
  }
  input {
    display: none;
  }
  @media ${devices.mobileL} {
    min-width: 240px;
  }
`;

export default SingleDrugLine;
