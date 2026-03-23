import { getLeaderboardFromSentio, LeaderboardType } from "../../src/api/sentio";

const startTs = 1773889200;
const endTs = 1774234800;

getLeaderboardFromSentio(startTs, endTs, LeaderboardType.CRYPTO).then((x) => console.log(x, x.length));