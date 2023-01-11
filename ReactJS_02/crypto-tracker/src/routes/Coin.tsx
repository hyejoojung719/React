import { useParams } from "react-router";

// 타입응ㄹ 알려
interface RouteParams {
  coinId: string;
}

function Coin() {
  // typescript에 url에 어떤 파라미터가 있는지 알려줘야함
  // 1. interface를 쓰거나 2. 직접  {coinId: string}이라고 넣어주거나
  const { coinId } = useParams<RouteParams>();
  return <h1>Coin: {coinId}</h1>;
}
export default Coin;
