import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 타입을 알려
interface RouteParams {
  coinId: string;
}

interface RouteState {
  name: string;
}

function Coin() {
  const [loading, setLoading] = useState(true);

  // typescript에 url에 어떤 파라미터가 있는지 알려줘야함
  // 1. interface를 쓰거나 2. 직접  {coinId: string}이라고 넣어주거나
  const { coinId } = useParams<RouteParams>();

  // react router dom이 보내주는 location object에 접근
  const location = useLocation();
  console.log(location);

  // 역시나 typescript에 타입을 알려줘야 함 => 인터페이스 쓰기
  const { state } = useLocation<RouteState>();
  // console.log(state.name);

  const [info, setInfo] = useState({});
  const [priceInfo, setPriceInfo] = useState({});

  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();

      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();

      setInfo(infoData);
      setPriceInfo(priceData);
    })();
  }, []);

  // state?.name으로 하는 이유
  // state가 생성되려면 Home화면을 먼저 열어야 하는데,
  // 그렇지 않고 직접 url을 치고 들어가면 state.name이 undefined 되면서 에러가 뜬다.
  // {state?.name || "Loading..."} => state가 존재하면 name을 가져오고 아니면 Loading 띄우기
  return (
    <Container>
      <Header>
        <Title>{state?.name || "Loading..."}</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : null}
    </Container>
  );
}
export default Coin;
