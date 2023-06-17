import React from "react";
import {
  StyledProfile,
  StyledProfileInfo,
  StyledProfileItem,
  StyledProfileValue,
} from "../styled";
import { useSelector } from "react-redux";
import { RootState } from "../context";

const Profile: React.FC = () => {
  const authenticatedUser = useSelector(
    (state: RootState) => state?.auth?.user?.authenticatedUser
  );

  return (
    <StyledProfile>
      <StyledProfileInfo>
        <StyledProfileItem>ID:</StyledProfileItem>
        <StyledProfileValue>{authenticatedUser?.id}</StyledProfileValue>
        <StyledProfileItem>Full Name</StyledProfileItem>
        <StyledProfileValue>{authenticatedUser?.fullname}</StyledProfileValue>
        <StyledProfileItem>Email address</StyledProfileItem>
        <StyledProfileValue>{authenticatedUser?.email}</StyledProfileValue>
      </StyledProfileInfo>
    </StyledProfile>
  );
};

export default Profile;
