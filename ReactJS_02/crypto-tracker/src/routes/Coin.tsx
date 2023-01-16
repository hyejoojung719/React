// import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Switch, Route, useLocation, useParams, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import Chart from "./Chart";
import Price from "./Price";
import { Helmet } from "react-helmet";

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`n
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

// 검정 박스
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;

// 검정박스 안에 있는 item
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 33%;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

// 설명글
const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) => (props.isActive ? props.theme.accentColor : props.theme.textColor)};
  a {
    padding: 7px 0px;
    display: block;
  }
`;

// 타입을 알려줌
interface RouteParams {
  coinId: string;
}

interface RouteState {
  name: string;
}

// temp1에서 keys만 갖고 오기 => Object.keys(temp1)
// 객체가 key:value 형태이니까
// Object.keys(temp1).join()
// Object.values(temp1).map(v=>typeof v).join() => 타입 값 가져오기
// 단축키 : Ctrl(Command)+D: 같은 문자열 선택  / 전체 드래그후 alt + shift + i  : 선택한 모든 문자열에 가장 우측 끝으로 포커싱

// 얘도 temp1에서 정보 얻음
// interface ITag {
//   coin_counter: number;
//   ico_counter: number;
//   id: string;
//   name: string;
// }

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  // typescript에 url에 어떤 파라미터가 있는지 알려줘야함
  // 1. interface를 쓰거나 2. 직접  {coinId: string}이라고 넣어주거나
  const { coinId } = useParams<RouteParams>();

  // 역시나 typescript에 타입을 알려줘야 함 => 인터페이스 쓰기
  const { state } = useLocation<RouteState>();
  // console.log(state.name);

  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");
  // 유저가 "url"에 있는 걸 알려줌

  // react router dom이 보내주는 location object에 접근
  const location = useLocation();
  console.log(location);

  //모든 query는 고유의 id를 가져야함
  //React query가 query를 array로 보고 있음
  // isLoading 이름 지정, data 이름 지정
  // interface로 타입 알려주기 <>
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(["info", coinId], () => fetchCoinInfo(coinId));
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId!),
    {
      refetchInterval: 5000,
    }
  );
  /* reactquery 사용하면서 생략
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState<InfoData>();
  const [priceInfo, setPriceInfo] = useState<PriceData>();

  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      console.log("코인", coinId);
      console.log("info", infoData);
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      console.log("priceInfo", priceData);

      setInfo(infoData);
      setPriceInfo(priceData);
      setLoading(false); //얘를 안해주면 계속 Loading 상태로 남는다.
    })();
  }, [coinId]); // [coinId] => coinId가 변하면 위 useEffect안의 코드가 다시 실행된다.
*/

  // state?.name으로 하는 이유
  // state가 생성되려면 Home화면을 먼저 열어야 하는데,
  // 그렇지 않고 직접 url을 치고 들어가면 state.name이 undefined 되면서 에러가 뜬다.
  // {state?.name || "Loading..."} => state가 존재하면 name을 가져오고 아니면 Loading 띄우기

  // loading은 infoLoading이나 tickersLoading이 될 수 있다.
  const loading = infoLoading || tickersLoading;
  return (
    <Container>
      <Helmet>
        <title>{state?.name ? state.name : loading ? "Loading..." : infoData?.name}</title>
      </Helmet>
      <Header>
        {/* loading ? "Loading..." : info?.name => 별도의 URL로 접속한 경우 */}
        <Title>{state?.name ? state.name : loading ? "Loading..." : infoData?.name}</Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              {/* <span>Open Source:</span>
              <span>{infoData?.open_source ? "Yes" : "No"}</span> */}
              <span>Price:</span>
              <span>${tickersData?.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
              {/* priceInfo가 존재할 경우에만 max_supply를 찾음 */}
            </OverviewItem>
          </Overview>

          <Tabs>
            {/* isActive prop 보내기 => 현재 해당 url에 없다면 */}
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>

          <Switch>
            <Route path={`/:coinId/price`}>
              <Price />
            </Route>
            <Route path={`/:coinId/chart`}>
              <Chart coinId={coinId} />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
}
export default Coin;
