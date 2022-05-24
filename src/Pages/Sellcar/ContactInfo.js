import styled from "styled-components";
import { useEffect, useState } from "react";
import MapInfo from "./MapInfo";
import DaumPostcode from "react-daum-postcode";

function ContactInfo() {
  const [phone, setPhone] = useState();
  const [isModal, setModal] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [addr, setAddr] = useState();
  const [postcodeAddr, setPostcodeAddr] = useState();
  const [isFindAddr, setFindAddr] = useState(false);

  const handleInput = (text) => {
    let regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    if (regPhone.test(text) === true) {
      setPhone(text);
      localStorage.setItem("contact", text);
    } else {
      if (phone) setPhone();
    }
  };
  const onChange = (e) => {
    localStorage.setItem("detailAddress", e.target.value);
  };

  useEffect(() => {
    if (
      localStorage.getItem("address") === undefined ||
      localStorage.getItem("address") === null ||
      localStorage.getItem("address") === "undefined"
    ) {
      console.log("test", addr);
      localStorage.setItem("address", addr);
    } else if (postcodeAddr !== "undefined" && postcodeAddr !== undefined) {
      localStorage.setItem("address", postcodeAddr);
      setAddr(postcodeAddr);
    } else {
      if (
        localStorage.getItem("address") !== undefined &&
        localStorage.getItem("address") !== "undefined"
      ) {
        console.log("aavb", localStorage.getItem("address"));
        setAddr(localStorage.getItem("address"));
        setPostcodeAddr(localStorage.getItem("address"));
      } else {
        console.log("hey");
      }
    }
  }, [postcodeAddr, addr]);
  console.log("111 , ", addr);
  return (
    <Box>
      <P>딜러의 방문상담을 위해</P>
      <P>연락처와 지역을 확인해 주세요.</P>
      <Contact>
        <Text>연락처</Text>
        <Input
          active={phone ? true : false}
          placeholder="010-0000-0000"
          onChange={(e) => {
            handleInput(e.target.value);
          }}
          value={localStorage.getItem("contact")}
        ></Input>
      </Contact>
      <Location>
        <Text>지역</Text>
        <FindBtn
          onClick={() => {
            setModal(true);
            setShowMap(!showMap);
          }}
        >
          주소 찾기
        </FindBtn>
      </Location>
      {showMap ? (
        <>
          <MapInfo addr={addr} setAddr={setAddr} postcodeAddr={postcodeAddr} />
          <Address>
            <Text>주소</Text>
            <AddrText>{addr}</AddrText>

            <Text>상세주소</Text>
            <AddrInput
              onChange={onChange}
              value={localStorage.getItem("detailAddress")}
            />
            {!isFindAddr ? (
              <FindBtn
                onClick={() => {
                  setFindAddr(!isFindAddr);
                }}
              >
                주소검색
              </FindBtn>
            ) : null}
            {isFindAddr ? (
              <Postcode setAddr={setAddr} setPostcodeAddr={setPostcodeAddr} />
            ) : null}
          </Address>
        </>
      ) : null}
    </Box>
  );
}
const Postcode = ({ setAddr, setPostcodeAddr }) => {
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";
    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setAddr(fullAddress);
    setPostcodeAddr(fullAddress);
  };

  return <DaumPostcode onComplete={handleComplete} />;
};

const AddrText = styled.p`
  margin-right: 1.4em;
  letter-spacing: 0.7px;
  text-align: left;
  margin-right: 50px;
  margin-bottom: 20px;
`;
const Address = styled.div`
  align-items: center;
  margin-top: 20px;
`;
const AddrInput = styled.input`
  padding: 0px;
  font-size: 1.3em;
  height: 1.3em;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  border: 0px;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom: 1px;
  border-bottom-style: solid;
  border-color: black;
  &:focus {
    outline: none;
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
    border-bottom: 1px;
    border-bottom-style: solid;
    border-color: red;
  }
`;
const FindBtn = styled.button`
  font-size: 1em;
  font-weight: 600;
  box-shadow: 5px 5px 10px #d8d8d8;
  border: 0px;
  background-color: white;
  border-radius: 20px;
  text-align: center;
  padding: 15px;
  margin: 5px;
  margin-bottom: 20px;
  font-size: 1em;
  cursor: pointer;
  &:hover {
    background-color: #5c1049;
    color: white;
  }
`;

const Location = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const Input = styled.input`
  padding: 0px;
  margin: 0px;
  font-size: 1em;
  height: 1.3em;
  width: 110px;
  border: 0px;
  &:focus {
    outline: none;
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
    border-bottom: 2px;
    border-bottom-style: solid;
    border-color: ${(props) => (props.active === true ? "green" : "red")};
  }
`;
const Contact = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: 1.4em 0;
`;
const Text = styled.p`
  margin-right: 1.4em;
  letter-spacing: 0.7px;
  text-align: left;
`;
const P = styled.p`
  font-size: 1.2em;
  font-weight: 800;
  letter-spacing: 1px;
  line-height: 25px;

  text-align: left;
`;

const Box = styled.div`
  width: 640px;
  box-sizing: border-box;
  margin: 0px auto;
  margin-top: 40px;
  text-align: center;
  @media only screen and (max-width: 640px) {
    width: 90%;
    padding: 0px;
    margin: 0px auto;
    margin-top: 40px;
    justfiy-content: center;
  }
`;
export default ContactInfo;
