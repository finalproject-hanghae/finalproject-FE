import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { loadFriendDataMW } from "../redux/modules/friends";
import { useCatPageData } from "../hooks/useCatPageData";
import { useUserData } from "../hooks/useUserData";
import Modals from "../components/layout/modal/modalList";
import SelectBox from "../components/layout/SelectBox";
import ExpBar from "../components/purpose/cat/level/ExpBar";
import CatLevelCenter from "../components/purpose/cat/level/CatLevelCenter";
import CatLevelLeft from "../components/purpose/cat/level/CatLevelLeft";
import CatLevelRight from "../components/purpose/cat/level/CatLevelRight";
import ShopBtn from "../components/layout/button/ShopBtn";
import styled from "styled-components";
import { ColumnFlexDiv, LinkC, PageSection, RowFlexDiv } from "../style/styled";
import background from "../assets/images/cats/cat_bg.png";

const CatPage = () => {
  const dispatch = useDispatch();
  const friendList = useSelector((state) => state.friends.friends);
  // const [FriendId, setFriendId] = React.useState();
  // const User = useUserData();
  const Data = useCatPageData();
  useEffect(() => {
    dispatch(loadFriendDataMW());
  }, []);

  return (
    <PageSection>
      <Bg>
        {/* 고양이가 존재하지 않으면 잘못된 접근 추후 백엔드 처리 */}
        {!Data.level && Modals.NotFound}
        <FullPage>
          <ColumnFlexDiv>
            <CatImage>
              {/* 나의 고먐미 ~ 친구네 고먐미 셀렉창 */}
              <SelectBox friendList={friendList} />

              {/* 고먐 이미지 */}
              <div>
                <img src={Data?.catImg} alt="cat_Img" />
              </div>
            </CatImage>

            {/* 경험치 표시바 */}
            <ExCard>{/* <p>exp</p> <ExpBar /> */}</ExCard>

            {/* 고양이 레벨표시 구역 Start */}
            <CatLevelCard>
              <CatLevelLeft />
              <CatLevelCenter level={Data?.level} />
              <CatLevelRight />
            </CatLevelCard>
            {/* 고양이 레벨표시 구역 End */}

            {/* 상점 Btn */}
            <ShopBtn />
          </ColumnFlexDiv>
        </FullPage>
      </Bg>
    </PageSection>
  );
};

// Style
const Bg = styled.div`
  background-image: url(${background});
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: 100%;
  position: relative;
  width: 100%;
  height: 100%;
`;
const FullPage = styled.div`
  height: 80%;
  width: 100%;
  position: absolute;
  bottom: 10%;
`;
const CatImage = styled(ColumnFlexDiv)`
  align-items: center;
  div {
    &:last-child {
      width: 350px;
      height: 300px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  img {
    width: 269px;
  }
`;
const ExCard = styled(RowFlexDiv)`
  width: 50%;
  height: 50px;
  margin: auto;
  margin-bottom: 30px;
  justify-content: space-between;
  align-items: center;
  p {
    font-weight: 670;
    font-size: 16px;
  }
`;
const CatLevelCard = styled(RowFlexDiv)`
  width: fit-content;
  margin: 0px auto;
`;

export default CatPage;
