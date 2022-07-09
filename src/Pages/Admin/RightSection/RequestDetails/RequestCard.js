import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components/macro';
import {
  selectIdState,
  selectModalIdState,
  setSelectDealer,
  setSelectProgress,
} from '../../adminAtoms';

const RequestCard = ({
  estimate_id,
  onwer,
  phone_number,
  car_number,
  manufacture,
  trim,
  model_year,
  estimate_request_date,
  name,
  dealer,
  quote_requested,
  onClick,
}) => {
  const getProgress = useRecoilValue(setSelectProgress);
  const currentId = useRecoilValue(selectIdState);
  const getModalId = useRecoilValue(selectModalIdState);
  const getDealer = useRecoilValue(setSelectDealer);
  const [textState, setTextState] = useState(false);
  const onClickText = () => {
    // console.log(`여기는? 뭐들어옴? ${id}`);
    setTextState(!textState);
  };

  return (
    <RequestCardContainer onClick={() => onClick(estimate_id)}>
      <RequestCardList>{estimate_id}</RequestCardList>
      <RequestCardList>{onwer}</RequestCardList>
      <RequestCardList>{phone_number}</RequestCardList>
      <RequestCardList>{car_number}</RequestCardList>
      <RequestCardList>{manufacture}</RequestCardList>
      <RequestCardList>{trim}</RequestCardList>
      <RequestCardList>{model_year}</RequestCardList>
      <RequestCardList>{estimate_request_date}</RequestCardList>
      <RequestCardList>{name}</RequestCardList>
      <RequestCardList>{getDealer}</RequestCardList>
      {currentId === getModalId ? (
        <RequestCardList onClick={() => onClickText}>
          {getProgress}
        </RequestCardList>
      ) : (
        <RequestCardList onClick={() => onClickText}>대기</RequestCardList>
      )}
      <RequestCardList>{quote_requested}</RequestCardList>
    </RequestCardContainer>
  );
};

const RequestCardContainer = styled.ul`
  ${props => props.theme.flex.flexBox('row', 'center', 'space-between')};
  padding: 0 20px 0 30px;
  width: 90.188rem;
  height: 2.375rem;
  border: 1px solid #eaebec;
  &:hover {
    cursor: pointer;
    background-color: rgba(10, 10, 10, 0.05);
  }
`;

const RequestCardList = styled.li`
  list-style: none;
  font-size: ${props => props.theme.fontSizes.base};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

export default RequestCard;